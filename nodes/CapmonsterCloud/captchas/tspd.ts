import { INodeProperties, IDataObject, IExecuteFunctions } from 'n8n-workflow';
import { userAgent } from '../const';
import { getProxyFields } from '../proxy';

export const tspd: INodeProperties[] = [
	{
		displayName: 'Website URL',
		name: 'websiteURL',
		type: 'string',
		required: true,
		displayOptions: { show: { taskType: ['tspd'] } },
		default: '',
		description: 'The URL of the page protected by TSPD',
	},
	{
		displayName: 'TSPD Cookie',
		name: 'tspdCookie',
		type: 'string',
		required: true,
		displayOptions: { show: { taskType: ['tspd'] } },
		default: '',
		description: 'Cookie string for TSPD validation',
		typeOptions: { rows: 4 },
	},
	{
		displayName: 'HTML Page (Base64)',
		name: 'htmlPageBase64',
		type: 'string',
		required: true,
		displayOptions: { show: { taskType: ['tspd'] } },
		default: '',
		description: 'Base64-encoded HTML page for TSPD challenge',
		typeOptions: { rows: 6 },
	},
	{
		displayName: 'User Agent',
		name: 'userAgent',
		type: 'string',
		required: true,
		displayOptions: { show: { taskType: ['tspd'] } },
		default: userAgent,
		description: 'User-Agent header',
	},
];

export const buildTspdTask = function (this: IExecuteFunctions, i: number): IDataObject {
	return {
		type: 'CustomTask',
		class: 'tspd',
		websiteURL: this.getNodeParameter('websiteURL', i),
		userAgent: this.getNodeParameter('userAgent', i),
		metadata: {
			tspdCookie: this.getNodeParameter('tspdCookie', i),
			htmlPageBase64: this.getNodeParameter('htmlPageBase64', i),
		},
		...getProxyFields.call(this, i),
	};
};
