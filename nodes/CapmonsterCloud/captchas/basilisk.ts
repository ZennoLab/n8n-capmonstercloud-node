import { INodeProperties, IDataObject, IExecuteFunctions } from 'n8n-workflow';
import { userAgent } from '../const';
import { getProxyFields } from '../proxy';

export const basilisk: INodeProperties[] = [
	{
		displayName: 'Website URL',
		name: 'websiteURL',
		type: 'string',
		required: true,
		displayOptions: { show: { taskType: ['basilisk'] } },
		default: '',
		description: 'The URL of the page with Basilisk captcha',
	},
	{
		displayName: 'Website Key',
		name: 'websiteKey',
		type: 'string',
		required: true,
		displayOptions: { show: { taskType: ['basilisk'] } },
		default: '',
		description: 'Site key of the Basilisk captcha',
	},
	{
		displayName: 'User Agent',
		name: 'userAgent',
		type: 'string',
		displayOptions: { show: { taskType: ['basilisk'] } },
		default: userAgent,
		description: 'Optional User-Agent header for the request',
	},
];


export const buildBasiliskTask = function (this: IExecuteFunctions, i: number): IDataObject {
	return {
		type: 'CustomTask',
		class: 'Basilisk',
		websiteURL: this.getNodeParameter('websiteURL', i),
		websiteKey: this.getNodeParameter('websiteKey', i),
		userAgent: this.getNodeParameter('userAgent', i),
		...getProxyFields.call(this, i),
	};
};
