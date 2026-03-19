import { INodeProperties, IDataObject, IExecuteFunctions } from 'n8n-workflow';
import { userAgent } from '../const';
import { getProxyFields } from '../proxy';

export const castle: INodeProperties[] = [
	{
		displayName: 'Website URL',
		name: 'websiteURL',
		type: 'string',
		required: true,
		displayOptions: { show: { taskType: ['castle'] } },
		default: '',
		description: 'The URL of the page with Castle protection',
	},
	{
		displayName: 'Website Key',
		name: 'websiteKey',
		type: 'string',
		required: true,
		displayOptions: { show: { taskType: ['castle'] } },
		default: '',
		description: 'Castle public key',
	},
	{
		displayName: 'User Agent',
		name: 'userAgent',
		type: 'string',
		displayOptions: { show: { taskType: ['castle'] } },
		default: userAgent,
		description: 'User-Agent header',
	},
	{
		displayName: 'wUrl',
		name: 'wUrl',
		type: 'string',
		required: true,
		displayOptions: { show: { taskType: ['castle'] } },
		default: '',
		description: 'URL to cw.js script',
	},
	{
		displayName: 'swUrl',
		name: 'swUrl',
		type: 'string',
		required: true,
		displayOptions: { show: { taskType: ['castle'] } },
		default: '',
		description: 'URL to csw.js script',
	},
	{
		displayName: 'Count',
		name: 'count',
		type: 'number',
		displayOptions: { show: { taskType: ['castle'] } },
		default: 1,
		description: 'Number of tokens (default 1, max 49)',
	},
];

export const buildCastleTask = function (this: IExecuteFunctions, i: number): IDataObject {
	const userAgentValue = this.getNodeParameter('userAgent', i, '') as string;
	const count = this.getNodeParameter('count', i, 1) as number;

	const metadata: IDataObject = {
		wUrl: this.getNodeParameter('wUrl', i),
		swUrl: this.getNodeParameter('swUrl', i),
	};

	if (count && count !== 1) {
		metadata.count = count;
	}

	const task: IDataObject = {
		type: 'CustomTask',
		class: 'Castle',
		websiteURL: this.getNodeParameter('websiteURL', i),
		websiteKey: this.getNodeParameter('websiteKey', i),
		metadata,
	};

	if (userAgentValue) {
		task.userAgent = userAgentValue;
	}

	return {
		...task,
		...getProxyFields.call(this, i),
	};
};
