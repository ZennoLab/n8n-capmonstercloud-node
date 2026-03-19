import { INodeProperties, IDataObject, IExecuteFunctions } from 'n8n-workflow';
import { userAgent } from '../const';
import { getProxyFields } from '../proxy';

export const amazonJsApi: INodeProperties[] = [
	{
		displayName: 'Website URL',
		name: 'websiteURL',
		type: 'string',
		required: true,
		displayOptions: { show: { taskType: ['amazonJsApi'] } },
		default: '',
	},
	{
		displayName: 'Website Key',
		name: 'websiteKey',
		type: 'string',
		required: true,
		displayOptions: { show: { taskType: ['amazonJsApi'] } },
		default: '',
	},
	{
		displayName: 'Captcha Script',
		name: 'captchaScript',
		type: 'string',
		required: true,
		displayOptions: { show: { taskType: ['amazonJsApi'] } },
		default: '',
	},
	{
		displayName: 'Cookie Solution',
		name: 'cookieSolution',
		type: 'boolean',
		displayOptions: { show: { taskType: ['amazonJsApi'] } },
		default: false,
	},
	{
		displayName: 'User Agent',
		name: 'userAgent',
		type: 'string',
		displayOptions: { show: { taskType: ['amazonJsApi'] } },
		default: userAgent,
	},
];

export const buildAmazonJsApi = function (this: IExecuteFunctions, i: number): IDataObject {
	const result: IDataObject = {
		type: 'AmazonTask',
		websiteURL: this.getNodeParameter('websiteURL', i),
		websiteKey: this.getNodeParameter('websiteKey', i),
		captchaScript: this.getNodeParameter('captchaScript', i),
		...getProxyFields.call(this, i),
	};

	const cookieSolution = this.getNodeParameter('cookieSolution', i, false) as boolean;
	if (cookieSolution) result.cookieSolution = cookieSolution;

	const ua = this.getNodeParameter('userAgent', i, '') as string;
	if (ua) result.userAgent = ua;

	return result;
};
