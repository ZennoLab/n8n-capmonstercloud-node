import { INodeProperties, IDataObject, IExecuteFunctions } from 'n8n-workflow';
import { userAgent } from '../const';
import { getProxyFields } from '../proxy';

export const datadome: INodeProperties[] = [
	{
		displayName: 'Website URL',
		name: 'websiteURL',
		type: 'string',
		required: true,
		displayOptions: { show: { taskType: ['datadome'] } },
		default: '',
		description: 'Target website URL protected by DataDome',
	},
	{
		displayName: 'User Agent',
		name: 'userAgent',
		type: 'string',
		displayOptions: { show: { taskType: ['datadome'] } },
		default: userAgent,
		description: 'Browser User-Agent used for solving',
	},
	{
		displayName: 'Captcha URL',
		name: 'captchaUrl',
		type: 'string',
		required: true,
		displayOptions: { show: { taskType: ['datadome'] } },
		default: '',
		description: 'DataDome captcha URL',
	},
	{
		displayName: 'DataDome Cookie',
		name: 'datadomeCookie',
		type: 'string',
		required: true,
		displayOptions: { show: { taskType: ['datadome'] } },
		default: '',
		description: 'Datadome cookie value',
	},
	{
		displayName: 'DataDome Version',
		name: 'datadomeVersion',
		type: 'options',
		options: [
			{ name: 'New', value: 'new' },
			{ name: 'Old', value: 'old' },
		],
		default: 'new',
		displayOptions: { show: { taskType: ['datadome'] } },
		description: 'Version of DataDome protection',
	},
];


export const buildDataDome = function (this: IExecuteFunctions, i: number): IDataObject {
	return {
		type: 'CustomTask',
		class: 'DataDome',
		websiteURL: this.getNodeParameter('websiteURL', i),
		userAgent: this.getNodeParameter('userAgent', i),
		metadata: {
			captchaUrl: this.getNodeParameter('captchaUrl', i),
			datadomeCookie: this.getNodeParameter('datadomeCookie', i),
			datadomeVersion: this.getNodeParameter('datadomeVersion', i),
		},
		...getProxyFields.call(this, i),
	};
};
