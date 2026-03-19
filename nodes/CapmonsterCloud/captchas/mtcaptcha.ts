import { INodeProperties, IDataObject, IExecuteFunctions } from 'n8n-workflow';
import { getProxyFields } from '../proxy';
import { userAgent } from '../const';

export const mtcaptcha: INodeProperties[] = [
	{
		displayName: 'Website URL',
		name: 'websiteURL',
		type: 'string',
		required: true,
		displayOptions: { show: { taskType: ['mtcaptcha'] } },
		default: '',
		description: 'The URL of the page containing the MTCaptcha',
	},
	{
		displayName: 'Website Key',
		name: 'websiteKey',
		type: 'string',
		required: true,
		displayOptions: { show: { taskType: ['mtcaptcha'] } },
		default: '',
		description: 'The public key for MTCaptcha solving',
	},
	{
		displayName: 'Invisible',
		name: 'isInvisible',
		type: 'boolean',
		displayOptions: { show: { taskType: ['mtcaptcha'] } },
		default: false,
		description: 'Whether the captcha is invisible',
	},
	{
		displayName: 'Page Action',
		name: 'pageAction',
		type: 'string',
		displayOptions: { show: { taskType: ['mtcaptcha'] } },
		default: '',
		description: 'Action name for MTCaptcha (e.g., login, register)',
	},
	{
		displayName: 'User Agent',
		name: 'userAgent',
		type: 'string',
		displayOptions: { show: { taskType: ['mtcaptcha'] } },
		default: userAgent,
		description: 'Browser User-Agent',
	},
];

export const buildMTCaptchaTask = function (this: IExecuteFunctions, i: number): IDataObject {
	const task: IDataObject = {
		type: 'MTCaptchaTask',
		websiteURL: this.getNodeParameter('websiteURL', i),
		websiteKey: this.getNodeParameter('websiteKey', i),
		isInvisible: this.getNodeParameter('isInvisible', i, false),
		pageAction: this.getNodeParameter('pageAction', i, undefined),
		userAgent: this.getNodeParameter('userAgent', i, undefined),
	};

	return {
		...task,
		...getProxyFields.call(this, i),
	};
};
