import { INodeProperties, IDataObject, IExecuteFunctions } from 'n8n-workflow';
import { userAgent } from '../const';
import { getProxyFields } from '../proxy';

export const imperva: INodeProperties[] = [
	{
		displayName: 'Website URL',
		name: 'websiteURL',
		type: 'string',
		required: true,
		displayOptions: { show: { taskType: ['imperva'] } },
		default: '',
		description: 'The URL of the site protected by Imperva',
	},
	{
		displayName: 'User Agent',
		name: 'userAgent',
		type: 'string',
		displayOptions: { show: { taskType: ['imperva'] } },
		default: userAgent,
		description: 'Optional User-Agent header',
	},
	{
		displayName: 'Incapsula Script URL',
		name: 'incapsulaScriptUrl',
		type: 'string',
		required: true,
		displayOptions: { show: { taskType: ['imperva'] } },
		default: '',
		description: 'URL of the Incapsula JS resource',
	},
	{
		displayName: 'Incapsula Cookies',
		name: 'incapsulaCookies',
		type: 'string',
		required: true,
		displayOptions: { show: { taskType: ['imperva'] } },
		default: '',
		description: 'Incapsula session cookies',
	},
	{
		displayName: 'Reese84 URL Endpoint',
		name: 'reese84UrlEndpoint',
		type: 'string',
		displayOptions: { show: { taskType: ['imperva'] } },
		default: '',
		description: 'Reese84 endpoint for validation',
	},
];


export const buildImpervaTask = function (this: IExecuteFunctions, i: number): IDataObject {
	const task: IDataObject = {
		type: 'CustomTask',
		class: 'Imperva',
		websiteURL: this.getNodeParameter('websiteURL', i),
		userAgent: this.getNodeParameter('userAgent', i),
		metadata: {
			incapsulaScriptUrl: this.getNodeParameter('incapsulaScriptUrl', i),
			incapsulaCookies: this.getNodeParameter('incapsulaCookies', i),
			reese84UrlEndpoint: this.getNodeParameter('reese84UrlEndpoint', i),
		},
	};

	return {
		...task,
		...getProxyFields.call(this, i),
	};
};
