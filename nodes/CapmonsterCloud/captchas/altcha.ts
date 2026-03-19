import { INodeProperties, IDataObject, IExecuteFunctions } from 'n8n-workflow';
import { userAgent } from '../const';
import { getProxyFields } from '../proxy';

export const altcha: INodeProperties[] = [
	{
		displayName: 'Website URL',
		name: 'websiteURL',
		type: 'string',
		required: true,
		displayOptions: { show: { taskType: ['altcha'] } },
		default: '',
		description: 'The URL of the page with Altcha',
	},
	{
		displayName: 'Website Key',
		name: 'websiteKey',
		type: 'string',
		displayOptions: { show: { taskType: ['altcha'] } },
		default: '',
		description: 'Optional Altcha website key (empty string allowed)',
	},
	{
		displayName: 'User Agent',
		name: 'userAgent',
		type: 'string',
		required: true,
		displayOptions: { show: { taskType: ['altcha'] } },
		default: userAgent,
		description: 'Browser User-Agent header',
	},
	{
		displayName: 'Challenge',
		name: 'challenge',
		type: 'string',
		required: true,
		displayOptions: { show: { taskType: ['altcha'] } },
		default: '',
		description: 'Unique task identifier obtained from the website',
	},
	{
		displayName: 'Iterations',
		name: 'iterations',
		type: 'string',
		required: true,
		displayOptions: { show: { taskType: ['altcha'] } },
		default: '',
		description: 'Number of hashing iterations (maxnumber value)',
	},
	{
		displayName: 'Salt',
		name: 'salt',
		type: 'string',
		required: true,
		displayOptions: { show: { taskType: ['altcha'] } },
		default: '',
		description: 'Salt value used for hash generation (send full value including all parameters)',
	},
	{
		displayName: 'Signature',
		name: 'signature',
		type: 'string',
		required: true,
		displayOptions: { show: { taskType: ['altcha'] } },
		default: '',
		description: 'Digital signature for validation',
	},
];

export const buildAltchaTask = function (this: IExecuteFunctions, i: number): IDataObject {
	const task: IDataObject = {
		type: 'CustomTask',
		class: 'Altcha',
		websiteURL: this.getNodeParameter('websiteURL', i),
		websiteKey: this.getNodeParameter('websiteKey', i) || undefined,
		userAgent: this.getNodeParameter('userAgent', i),
		metadata: {
			challenge: this.getNodeParameter('challenge', i),
			iterations: this.getNodeParameter('iterations', i),
			salt: this.getNodeParameter('salt', i),
			signature: this.getNodeParameter('signature', i),
		},
	};

	return {
		...task,
		...getProxyFields.call(this, i),
	};
};
