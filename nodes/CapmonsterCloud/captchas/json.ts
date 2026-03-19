import { INodeProperties, IExecuteFunctions, IDataObject, NodeOperationError } from 'n8n-workflow';

export const jsonTaskFields: INodeProperties[] = [
	{
		displayName: 'Task JSON Payload',
		name: 'taskJson',
		type: 'string',
		typeOptions: {
			editor: 'codeNodeEditor',
			rows: 10,
		},
		default:
			'{\n  "type": "RecaptchaV2Task",\n  "websiteURL": "https://example.com",\n  "websiteKey": "SITE_KEY"\n}',
		required: true,
		displayOptions: {
			show: {
				taskType: ['json'],
			},
		},
		description: 'Raw CapMonster task object (without clientKey)',
	},
];

export const buildJsonTask = function (this: IExecuteFunctions, i: number): IDataObject {
	const raw = this.getNodeParameter('taskJson', i) as string;

	try {
		const parsed = JSON.parse(raw) as IDataObject;

		if (!parsed.type) {
			throw new Error('Missing "type" field');
		}

		return parsed;
	} catch (error) {
		throw new NodeOperationError(this.getNode(), `Invalid JSON: ${(error as Error).message}`, {
			itemIndex: i,
		});
	}
};
