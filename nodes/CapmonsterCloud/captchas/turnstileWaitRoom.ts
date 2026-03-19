import { INodeProperties, IDataObject, IExecuteFunctions } from 'n8n-workflow';
import { userAgent } from '../const';
import { getProxyFields } from '../proxy';

export const turnstileWaitRoom: INodeProperties[] = [
	{
		displayName: 'Website URL',
		name: 'websiteURL',
		type: 'string',
		required: true,
		displayOptions: { show: { taskType: ['turnstileWaitRoom'] } },
		default: '',
	},
	{
		displayName: 'Website Key',
		name: 'websiteKey',
		type: 'string',
		required: true,
		displayOptions: { show: { taskType: ['turnstileWaitRoom'] } },
		default: '',
	},
	{
		displayName: 'HTML Page (Base64)',
		name: 'htmlPageBase64',
		type: 'string',
		typeOptions: { editor: 'codeNodeEditor', rows: 5 },
		required: true,
		displayOptions: { show: { taskType: ['turnstileWaitRoom'] } },
		default: '',
	},
	{
		displayName: 'User Agent',
		name: 'userAgent',
		type: 'string',
		required: true,
		displayOptions: { show: { taskType: ['turnstileWaitRoom'] } },
		default: userAgent,
	},
];


export const buildTurnstileWaitRoom = function (this: IExecuteFunctions, i: number): IDataObject {
	return {
		type: 'TurnstileTask',
		websiteURL: this.getNodeParameter('websiteURL', i),
		websiteKey: this.getNodeParameter('websiteKey', i),
		cloudflareTaskType: 'wait_room',
		htmlPageBase64: this.getNodeParameter('htmlPageBase64', i),
		userAgent: this.getNodeParameter('userAgent', i),
		...getProxyFields.call(this, i),
	};
};
