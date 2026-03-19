import { INodeProperties, IDataObject, IExecuteFunctions } from 'n8n-workflow';
import { getProxyFields } from '../proxy';

export const turnstile: INodeProperties[] = [
	{
		displayName: 'Website URL',
		name: 'websiteURL',
		type: 'string',
		required: true,
		displayOptions: { show: { taskType: ['turnstile'] } },
		default: '',
	},
	{
		displayName: 'Website Key',
		name: 'websiteKey',
		type: 'string',
		required: true,
		displayOptions: { show: { taskType: ['turnstile'] } },
		default: '',
	},
	{
		displayName: 'Page Action',
		name: 'pageAction',
		type: 'string',
		displayOptions: { show: { taskType: ['turnstile'] } },
		default: '',
		description: 'Action field from the callback when captcha is loaded',
	},
	{
		displayName: 'Data',
		name: 'data',
		type: 'string',
		displayOptions: { show: { taskType: ['turnstile'] } },
		default: '',
		description: 'Value of the data field (from cData parameter)',
	},
];

export const buildTurnstile = function (this: IExecuteFunctions, i: number): IDataObject {
	const result: IDataObject = {
		type: 'TurnstileTask',
		websiteURL: this.getNodeParameter('websiteURL', i),
		websiteKey: this.getNodeParameter('websiteKey', i),
		...getProxyFields.call(this, i),
	};

	const pageAction = this.getNodeParameter('pageAction', i, '') as string;
	if (pageAction) result.pageAction = pageAction;

	const data = this.getNodeParameter('data', i, '') as string;
	if (data) result.data = data;

	return result;
};
