import { INodeProperties, IDataObject, IExecuteFunctions } from 'n8n-workflow';
import { userAgent } from '../const';
import { getProxyFields } from '../proxy';

export const yidun: INodeProperties[] = [
	{
		displayName: 'Website URL',
		name: 'websiteURL',
		type: 'string',
		required: true,
		displayOptions: { show: { taskType: ['yidun'] } },
		default: '',
		description: 'The URL of the page containing the Yidun captcha',
	},
	{
		displayName: 'Website Key',
		name: 'websiteKey',
		type: 'string',
		required: true,
		displayOptions: { show: { taskType: ['yidun'] } },
		default: '',
		description: 'The Yidun site key for captcha solving',
	},
	{
		displayName: 'User Agent',
		name: 'userAgent',
		type: 'string',
		displayOptions: { show: { taskType: ['yidun'] } },
		default: userAgent,
		description: 'User-Agent header to simulate the browser',
	},
	{
		displayName: 'Yidun JS Library URL',
		name: 'yidunGetLib',
		type: 'string',
		displayOptions: { show: { taskType: ['yidun'] } },
		default: '',
		description: 'Full URL to the Yidun JS file (e.g., https://...)',
	},
	{
		displayName: 'Yidun API Server Subdomain',
		name: 'yidunApiServerSubdomain',
		type: 'string',
		displayOptions: { show: { taskType: ['yidun'] } },
		default: '',
		description: 'Custom Yidun API server subdomain (without https://)',
	},
	{
		displayName: 'Challenge',
		name: 'challenge',
		type: 'string',
		displayOptions: { show: { taskType: ['yidun'] } },
		default: '',
		description: 'Unique captcha identifier (Enterprise use)',
	},
	{
		displayName: 'HCG',
		name: 'hcg',
		type: 'string',
		displayOptions: { show: { taskType: ['yidun'] } },
		default: '',
		description: 'Captcha hash used in requests (Enterprise use)',
	},
	{
		displayName: 'HCT',
		name: 'hct',
		type: 'number',
		displayOptions: { show: { taskType: ['yidun'] } },
		default: 0,
		description: 'Numeric timestamp for Enterprise version validation',
	},
];

export const buildYidunTask = function (this: IExecuteFunctions, i: number): IDataObject {
	const task: IDataObject = {
		type: 'YidunTask',
		websiteURL: this.getNodeParameter('websiteURL', i),
		websiteKey: this.getNodeParameter('websiteKey', i),
		userAgent: this.getNodeParameter('userAgent', i),
		metadata: {
			yidunGetLib: this.getNodeParameter('yidunGetLib', i, undefined) as string | undefined,
			yidunApiServerSubdomain: this.getNodeParameter('yidunApiServerSubdomain', i, undefined) as
				| string
				| undefined,
			challenge: this.getNodeParameter('challenge', i, undefined) as string | undefined,
			hcg: this.getNodeParameter('hcg', i, undefined) as string | undefined,
			hct: this.getNodeParameter('hct', i, undefined) as number | undefined,
		},
	};

	return {
		...task,
		...getProxyFields.call(this, i),
	};
};
