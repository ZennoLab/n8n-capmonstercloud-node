import { INodeProperties, IDataObject, IExecuteFunctions } from 'n8n-workflow';
import { getProxyFields } from '../proxy';
import { userAgent } from '../const';

export const turnstileChallengeCfClearance: INodeProperties[] = [
	{
		displayName: 'Website URL',
		name: 'websiteURL',
		type: 'string',
		required: true,
		displayOptions: { show: { taskType: ['turnstileChallengeCfClearance'] } },
		default: '',
	},
	{
		displayName: 'Website Key',
		name: 'websiteKey',
		type: 'string',
		required: true,
		displayOptions: { show: { taskType: ['turnstileChallengeCfClearance'] } },
		default: '',
	},
	{
		displayName: 'HTML Page Base64',
		name: 'htmlPageBase64',
		type: 'string',
		required: true,
		displayOptions: { show: { taskType: ['turnstileChallengeCfClearance'] } },
		default: '',
	},
	{
		displayName: 'User Agent',
		name: 'userAgent',
		type: 'string',
		required: true,
		displayOptions: { show: { taskType: ['turnstileChallengeCfClearance'] } },
		default: userAgent,
	},
];

export const buildTurnstileChallengeCfClearance = function (
	this: IExecuteFunctions,
	i: number,
): IDataObject {
	return {
		type: 'TurnstileTask',
		websiteURL: this.getNodeParameter('websiteURL', i),
		websiteKey: this.getNodeParameter('websiteKey', i),
		cloudflareTaskType: 'cf_clearance',
		htmlPageBase64: this.getNodeParameter('htmlPageBase64', i),
		userAgent: this.getNodeParameter('userAgent', i),
		...getProxyFields.call(this, i),
	};
};
