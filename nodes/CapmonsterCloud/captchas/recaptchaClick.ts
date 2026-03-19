import { INodeProperties, IDataObject, IExecuteFunctions } from 'n8n-workflow';
import { userAgent } from '../const';

export const recaptchaClick: INodeProperties[] = [
	{
		displayName: 'Website URL',
		name: 'websiteUrl',
		type: 'string',
		required: true,
		displayOptions: { show: { taskType: ['recaptchaClick'] } },
		default: '',
	},
	{
		displayName: 'Image URLs',
		name: 'imageUrls',
		type: 'string',
		typeOptions: { editor: 'codeNodeEditor', rows: 5 },
		required: true,
		displayOptions: { show: { taskType: ['recaptchaClick'] } },
		default: '["https://example.com/captcha.jpg"]',
	},
	{
		displayName: 'Metadata',
		name: 'metadata',
		type: 'string',
		typeOptions: { editor: 'codeNodeEditor', rows: 5 },
		displayOptions: { show: { taskType: ['recaptchaClick'] } },
		default: '{}',
	},
	{
		displayName: 'User Agent',
		name: 'userAgent',
		type: 'string',
		displayOptions: { show: { taskType: ['recaptchaClick'] } },
		default: userAgent,
		description: 'User-Agent для запроса к сайту',
	},
];

export const buildRecaptchaClick = function (this: IExecuteFunctions, i: number): IDataObject {
	const metadataRaw = this.getNodeParameter('metadata', i, '{}') as string;
	let metadata: IDataObject = {};
	try {
		metadata = JSON.parse(metadataRaw);
	} catch {
		throw new Error('Metadata should be valid JSON');
	}

	const imageUrlsRaw = this.getNodeParameter('imageUrls', i) as string;
	let imageUrls: string[] = [];
	try {
		imageUrls = JSON.parse(imageUrlsRaw);
	} catch {
		throw new Error('Image URLs should be valid JSON array');
	}

	return {
		type: 'ComplexImageTask',
		class: 'recaptcha',
		websiteUrl: this.getNodeParameter('websiteUrl', i),
		imageUrls,
		metadata,
		userAgent: this.getNodeParameter('userAgent', i, undefined),
	};
};
