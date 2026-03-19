import { INodeProperties, IDataObject, IExecuteFunctions } from 'n8n-workflow';
import { userAgent } from '../const';
import { getProxyFields } from '../proxy';

export const tendi: INodeProperties[] = [
	{
		displayName: 'Website URL',
		name: 'websiteURL',
		type: 'string',
		required: true,
		displayOptions: { show: { taskType: ['tendi'] } },
		default: '',
		description: 'The URL of the page with TenDI captcha',
	},
	{
		displayName: 'Website Key',
		name: 'websiteKey',
		type: 'string',
		required: true,
		displayOptions: { show: { taskType: ['tendi'] } },
		default: '',
		description: 'Site key of the TenDI captcha',
	},
	{
		displayName: 'User Agent',
		name: 'userAgent',
		type: 'string',
		displayOptions: { show: { taskType: ['tendi'] } },
		default: userAgent,
		description: 'Optional User-Agent header for the request',
	},
	{
		displayName: 'Captcha URL',
		name: 'captchaUrl',
		type: 'string',
		displayOptions: { show: { taskType: ['tendi'] } },
		default: '',
		description: 'URL of the TenDI captcha script (optional metadata)',
	},
];


export const buildTenDITask = function (this: IExecuteFunctions, i: number): IDataObject {
	const metadata = this.getNodeParameter('captchaUrl', i)
		? { captchaUrl: this.getNodeParameter('captchaUrl', i) }
		: undefined;

	return {
		type: 'CustomTask',
		class: 'TenDI',
		websiteURL: this.getNodeParameter('websiteURL', i),
		websiteKey: this.getNodeParameter('websiteKey', i),
		userAgent: this.getNodeParameter('userAgent', i),
		...(metadata ? { metadata } : {}),
		...getProxyFields.call(this, i),
	};
};
