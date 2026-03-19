import { IDataObject, IExecuteFunctions, INodeProperties } from 'n8n-workflow';
import { userAgent } from '../const';
import { getProxyFields } from '../proxy';

export const hunt: INodeProperties[] = [
	{
		displayName: 'Website URL',
		name: 'websiteURL',
		type: 'string',
		required: true,
		displayOptions: { show: { taskType: ['hunt'] } },
		default: '',
		description: 'The URL of the page protected by Hunt',
	},
	{
		displayName: 'API Library URL',
		name: 'apiGetLib',
		type: 'string',
		required: true,
		displayOptions: { show: { taskType: ['hunt'] } },
		default: '',
		description: 'URL to the external API library required for Hunt challenge',
	},
	{
		displayName: 'Data (Optional)',
		name: 'data',
		type: 'string',
		displayOptions: { show: { taskType: ['hunt'] } },
		default: '',
		description: 'Optional data parameter for CAPTCHA solving mode',
	},
	{
		displayName: 'User Agent',
		name: 'userAgent',
		type: 'string',
		required: true,
		displayOptions: { show: { taskType: ['hunt'] } },
		default: userAgent,
		description: 'User-Agent header',
	},
];

export const buildHuntTask = function (this: IExecuteFunctions, i: number): IDataObject {
	const metadata: IDataObject = {
		apiGetLib: this.getNodeParameter('apiGetLib', i),
	};

	const dataParam = this.getNodeParameter('data', i);
	if (dataParam) {
		metadata.data = dataParam;
	}

	return {
		type: 'CustomTask',
		class: 'hunt',
		websiteURL: this.getNodeParameter('websiteURL', i),
		userAgent: this.getNodeParameter('userAgent', i),
		metadata,
		...getProxyFields.call(this, i),
	};
};
