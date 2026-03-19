import { INodeProperties, IDataObject, IExecuteFunctions } from 'n8n-workflow';
import { getProxyFields } from '../proxy';
import { userAgent } from '../const';

export const turnstileChallengeToken: INodeProperties[] = [
	{
		displayName: 'Website URL',
		name: 'websiteURL',
		type: 'string',
		required: true,
		displayOptions: { show: { taskType: ['turnstileChallengeToken'] } },
		default: '',
	},
	{
		displayName: 'Website Key',
		name: 'websiteKey',
		type: 'string',
		required: true,
		displayOptions: { show: { taskType: ['turnstileChallengeToken'] } },
		default: '',
	},
	{
		displayName: 'Page Action',
		name: 'pageAction',
		type: 'string',
		required: true,
		displayOptions: { show: { taskType: ['turnstileChallengeToken'] } },
		default: '',
	},
	{
		displayName: 'Data',
		name: 'data',
		type: 'string',
		required: true,
		displayOptions: { show: { taskType: ['turnstileChallengeToken'] } },
		default: '',
	},
	{
		displayName: 'Page Data',
		name: 'pageData',
		type: 'string',
		required: true,
		displayOptions: { show: { taskType: ['turnstileChallengeToken'] } },
		default: '',
	},
	{
		displayName: 'User Agent',
		name: 'userAgent',
		type: 'string',
		required: true,
		displayOptions: { show: { taskType: ['turnstileChallengeToken'] } },
		default: userAgent,
	},
	{
		displayName: 'API JS URL',
		name: 'apiJsUrl',
		type: 'string',
		displayOptions: { show: { taskType: ['turnstileChallengeToken'] } },
		default: '',
	},
];

export const buildTurnstileChallengeToken = function (
	this: IExecuteFunctions,
	i: number,
): IDataObject {
	return {
		type: 'TurnstileTask',
		websiteURL: this.getNodeParameter('websiteURL', i),
		websiteKey: this.getNodeParameter('websiteKey', i),
		cloudflareTaskType: 'token',
		pageAction: this.getNodeParameter('pageAction', i),
		data: this.getNodeParameter('data', i),
		pageData: this.getNodeParameter('pageData', i),
		userAgent: this.getNodeParameter('userAgent', i),
		apiJsUrl: this.getNodeParameter('apiJsUrl', i, undefined),
		...getProxyFields.call(this, i),
	};
};
