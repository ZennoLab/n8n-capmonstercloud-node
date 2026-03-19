import { INodeProperties, IExecuteFunctions, IDataObject } from 'n8n-workflow';

export const imageToText: INodeProperties[] = [
	{
		displayName: 'Body',
		name: 'body',
		type: 'string',
		typeOptions: {
			rows: 6,
		},
		required: true,
		displayOptions: { show: { taskType: ['imageToText'] } },
		default: '',
		description: 'Base64',
	},
];


export const buildImageToText = function (this: IExecuteFunctions, i: number): IDataObject {
	return {
		type: 'ImageToTextTask',
		body: this.getNodeParameter('body', i),
	};
};
