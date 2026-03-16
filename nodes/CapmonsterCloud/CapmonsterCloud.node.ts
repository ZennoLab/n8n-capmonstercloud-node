import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeOperationError,
	IDataObject,
} from 'n8n-workflow';


type CapmonsterResponse = {
	errorId: number;
	errorDescription?: string;
};

type CreateTaskResponse = CapmonsterResponse & {
	taskId: number;
};

type TaskResultResponse = CapmonsterResponse & {
	status: 'processing' | 'ready';
	solution?: IDataObject;
};

const request = async (context: IExecuteFunctions, url: string, body: Record<string, unknown>) => {
	return context.helpers.httpRequest({
		method: 'POST',
		url,
		body,
		json: true,
	});
};

const waitForResult = async (
	context: IExecuteFunctions,
	apiKey: string,
	taskId: number,
	maxAttempts = 30,
	delay = 1000,
): Promise<IDataObject> => {
	for (let attempt = 1; attempt <= maxAttempts; attempt++) {
		const result = (await request(context, 'https://api.capmonster.cloud/getTaskResult', {
			clientKey: apiKey,
			taskId,
		})) as TaskResultResponse;

		if (result.errorId !== 0) {
			throw new Error(result.errorDescription || 'CapMonster error');
		}

		if (result.status === 'ready') {
			return result.solution ?? {};
		}

		await new Promise((resolve) => setTimeout(resolve, delay));
	}

	throw new Error('Timeout: captcha not solved');
};


export class CapmonsterCloud implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'CapMonster Cloud',
		name: 'capmonsterCloud',
		icon: 'file:favicon.svg',
		group: ['transform'],
		version: 1,
		description: 'Solve captchas with custom JSON using CapMonster Cloud',
		defaults: { name: 'CapMonster Cloud' },
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'capmonsterCloudApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Task JSON Payload',
				name: 'taskJson',
				type: 'string',
				typeOptions: { editor: 'codeNodeEditor', rows: 10 },
				default:
					'{\n  "type": "RecaptchaV2Task",\n  "websiteURL": "https://example.com",\n  "websiteKey": "SITE_KEY"\n}',
				required: true,
				description: 'CapMonster "task" object. Do not include clientKey.',
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		for (let i = 0; i < items.length; i++) {
			try {
				const credentials = await this.getCredentials('capmonsterCloudApi');
				const apiKey = credentials.apiKey as string;
				const raw = this.getNodeParameter('taskJson', i) as string;
				let task: IDataObject;

				try {
					task = JSON.parse(raw) as IDataObject;
				} catch {
					throw new Error('Invalid JSON in Task Payload');
				}

				const createTask = (await request(this, 'https://api.capmonster.cloud/createTask', {
					clientKey: apiKey,
					task,
				})) as CreateTaskResponse;

				if (createTask.errorId !== 0) {
					throw new Error(createTask.errorDescription || 'CreateTask failed');
				}

				const solution = await waitForResult(this, apiKey, createTask.taskId);

				returnData.push({ json: solution, pairedItem: i });
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({ json: { error: (error as Error).message }, pairedItem: i });
					continue;
				}
				throw new NodeOperationError(this.getNode(), error as Error, { itemIndex: i });
			}
		}

		return [returnData];
	}
}
