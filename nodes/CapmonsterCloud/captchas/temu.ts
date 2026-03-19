import { IDataObject, IExecuteFunctions, INodeProperties } from 'n8n-workflow';
import { userAgent } from '../const';
import { getProxyFields } from '../proxy';

export const temu: INodeProperties[] = [
	{
		displayName: 'Website URL',
		name: 'websiteURL',
		type: 'string',
		required: true,
		displayOptions: { show: { taskType: ['temu'] } },
		default: '',
		description: 'The URL of the Temu verification page',
	},
	{
		displayName: 'User Agent',
		name: 'userAgent',
		type: 'string',
		displayOptions: { show: { taskType: ['temu'] } },
		default: userAgent,
		description: 'User-Agent header to simulate the browser',
	},
	{
		displayName: 'Metadata Cookie',
		name: 'metadataCookie',
		type: 'string',
		required: true,
		displayOptions: { show: { taskType: ['temu'] } },
		default: '',
		description: 'Cookie string for Temu verification (use metadata.cookie)',
	},
];




export const buildTemuTask = function (this: IExecuteFunctions, i: number): IDataObject {
	const task: IDataObject = {
		type: 'TemuTask',
		class: 'Temu',
		websiteURL: this.getNodeParameter('websiteURL', i),
		userAgent: this.getNodeParameter('userAgent', i),
		metadata: {
			cookie: this.getNodeParameter('metadataCookie', i),
		},
	};

	return {
		...task,
		...getProxyFields.call(this, i),
	};
};
