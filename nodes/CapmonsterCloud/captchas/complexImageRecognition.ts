import { INodeProperties, IDataObject, IExecuteFunctions } from 'n8n-workflow';

export const complexImageRecognition: INodeProperties[] = [
	{
		displayName: 'Images (Base64 Array)',
		name: 'imagesBase64',
		type: 'string',
		typeOptions: { editor: 'codeNodeEditor', rows: 8 },
		required: true,
		displayOptions: { show: { taskType: ['complexImageRecognition'] } },
		default: '[]',
		description: 'Images array base64',
	},
	{
		displayName: 'Metadata',
		name: 'metadata',
		type: 'string',
		typeOptions: { editor: 'codeNodeEditor', rows: 5 },
		required: true,
		displayOptions: { show: { taskType: ['complexImageRecognition'] } },
		default: '{\n  "Task": "betpunch_3x3_rotate"\n}',
		description: 'JSON metadata',
	},
];


export const buildComplexImageRecognition = function (
	this: IExecuteFunctions,
	i: number,
): IDataObject {
	const imagesRaw = this.getNodeParameter('imagesBase64', i) as string;
	const metadataRaw = this.getNodeParameter('metadata', i) as string;

	let imagesBase64: string[] = [];
	let metadata: IDataObject = {};

	try {
		imagesBase64 = JSON.parse(imagesRaw);
		if (!Array.isArray(imagesBase64)) {
			throw new Error('Images must be an array');
		}
	} catch (error) {
		throw new Error(error.message);
	}

	try {
		metadata = JSON.parse(metadataRaw);
	} catch {
		throw new Error('metadata должен быть валидным JSON');
	}

	return {
		type: 'ComplexImageTask',
		class: 'recognition',
		imagesBase64,
		metadata,
	};
};
