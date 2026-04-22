import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeOperationError,
	IDataObject,
	NodeApiError,
	JsonObject,
	NodeConnectionTypes,
} from 'n8n-workflow';

import { request, waitForResult } from './transport/request';
import { TaskType } from './types';
import { taskBuilders } from './taskBuilder';
import { allFields } from './fields';
import { formatCapmonsterError } from './utils';

type CapmonsterResponse = {
	errorId: number;
	errorDescription?: string;
};

type CreateTaskResponse = CapmonsterResponse & {
	taskId: number;
};


export class CapmonsterCloud implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'CapMonster Cloud',
		name: 'capmonsterCloud',
		icon: 'file:favicon.svg',
		group: ['transform'],
		version: 1,
		description: 'Node for solving CAPTCHAs via CapMonsterCloud service.',
		subtitle: '={{$parameter["operation"]}}',
		defaults: { name: 'CapMonster Cloud' },
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [
			{
				name: 'capmonsterCloudApi',
				required: true,
			},
		],
		properties: allFields,
		usableAsTool: true,
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		for (let i = 0; i < items.length; i++) {
			try {
				const operation = this.getNodeParameter('operation', i) as TaskType;

				let task: IDataObject;

				if (operation === 'json') {
					const raw = this.getNodeParameter('taskJson', i) as string;

					try {
						task = JSON.parse(raw) as IDataObject;

						if (!task.type) {
							throw new NodeOperationError(this.getNode(), 'Missing "type" field');
						}
					} catch (error) {
						throw new NodeOperationError(
							this.getNode(),
							`Invalid JSON: ${(error as Error).message}`,
							{ itemIndex: i },
						);
					}
				} else {
					const builder = taskBuilders[operation];

					if (!builder) {
						throw new NodeOperationError(this.getNode(), `Unsupported task type: ${operation}`, {
							itemIndex: i,
						});
					}

					task = builder.call(this, i);
				}

				task = Object.fromEntries(
					Object.entries(task).filter(([, v]) => v !== undefined && v !== ''),
				);

				const createTask = (await request(this, 'https://api.capmonster.cloud/createTask', {
					task,
				})) as CreateTaskResponse;

				if (createTask.errorId !== 0) {
					throw new NodeOperationError(
						this.getNode(),
						formatCapmonsterError('CreateTask', createTask),
						{ itemIndex: i },
					);
				}

				const solution = await waitForResult(this, createTask.taskId);

				returnData.push({
					json: solution,
					pairedItem: i,
				});
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({
						json: { error: (error as Error).message },
						pairedItem: i,
					});
					continue;
				}

				throw new NodeApiError(this.getNode(), error as JsonObject, {
					itemIndex: i,
				});
			}
		}

		return [returnData];
	}
}
