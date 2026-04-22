import { IDataObject, IExecuteFunctions, INodeProperties } from 'n8n-workflow';
import { userAgent } from '../const';
import { getProxyFields } from '../proxy';

export const friendly: INodeProperties[] = [
	{
		displayName: 'Website URL',
		name: 'websiteURL',
		type: 'string',
		required: true,
		displayOptions: { show: { operation: ['friendly'] } },
		default: '',
		description: 'Full URL of the page with the captcha',
	},
	{
		displayName: 'Website Key',
		name: 'websiteKey',
		type: 'string',
		required: true,
		displayOptions: { show: { operation: ['friendly'] } },
		default: '',
		description: 'Friendly Captcha site key',
	},
	{
		displayName: 'API Get Lib',
		name: 'apiGetLib',
		type: 'string',
		required: true,
		displayOptions: { show: { operation: ['friendly'] } },
		default: '',
		description: 'JS library URL used by Friendly Captcha (metadata.apiGetLib)',
	},
	{
		displayName: 'User Agent',
		name: 'userAgent',
		type: 'string',
		displayOptions: { show: { operation: ['friendly'] } },
		default: userAgent,
		description: 'Optional Windows browser User-Agent',
	},
];

export const buildFriendlyTask = function (this: IExecuteFunctions, i: number): IDataObject {
	return {
		type: 'CustomTask',
		class: 'friendly',
		websiteURL: this.getNodeParameter('websiteURL', i),
		websiteKey: this.getNodeParameter('websiteKey', i),
		userAgent: this.getNodeParameter('userAgent', i),
		metadata: {
			apiGetLib: this.getNodeParameter('apiGetLib', i),
		},
		...getProxyFields.call(this, i),
	};
};
