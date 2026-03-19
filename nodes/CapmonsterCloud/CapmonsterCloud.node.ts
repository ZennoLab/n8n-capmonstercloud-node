import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeOperationError,
	IDataObject,
} from 'n8n-workflow';

import { request, waitForResult } from './transport/request';
import { TaskType } from './types';
import { softId } from './const';
import { taskBuilders } from './taskBuilder';
import { allFields } from './fields';

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
		defaults: { name: 'CapMonster Cloud' },
		inputs: ['main'],
		outputs: ['main'],
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
				const credentials = await this.getCredentials('capmonsterCloudApi');
				const apiKey = credentials.apiKey as string;

				const taskType = this.getNodeParameter('taskType', i) as TaskType;

				let task: IDataObject;

				if (taskType === 'json') {
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
					const builder = taskBuilders[taskType];

					if (!builder) {
						throw new NodeOperationError(this.getNode(), `Unsupported task type: ${taskType}`, {
							itemIndex: i,
						});
					}

					task = builder.call(this, i);
				}

				task = Object.fromEntries(
					Object.entries(task).filter(([, v]) => v !== undefined && v !== ''),
				);

				const createTask = (await request(this, 'https://api.capmonster.cloud/createTask', {
					clientKey: apiKey,
					task,
					softId,
				})) as CreateTaskResponse;

				if (createTask.errorId !== 0) {
					throw new NodeOperationError(
						this.getNode(),
						createTask.errorDescription || 'CreateTask failed',
						{ itemIndex: i },
					);
				}

				const solution = await waitForResult(this, apiKey, createTask.taskId);

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

				throw new NodeOperationError(this.getNode(), error as Error, {
					itemIndex: i,
				});
			}
		}

		return [returnData];
	}
}
