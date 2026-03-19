import { INodeProperties, IDataObject, IExecuteFunctions } from 'n8n-workflow';
import { getProxyFields } from '../proxy';

export const amazonInvisibleChallenge: INodeProperties[] = [
	{
		displayName: 'Website URL',
		name: 'websiteURL',
		type: 'string',
		required: true,
		displayOptions: { show: { taskType: ['amazonInvisibleChallenge'] } },
		default: '',
	},
	{
		displayName: 'Challenge Script',
		name: 'challengeScript',
		type: 'string',
		required: true,
		displayOptions: { show: { taskType: ['amazonInvisibleChallenge'] } },
		default: '',
	},
	{
		displayName: 'Captcha Script',
		name: 'captchaScript',
		type: 'string',
		required: true,
		displayOptions: { show: { taskType: ['amazonInvisibleChallenge'] } },
		default: '',
		description: 'Can be any string',
	},
	{
		displayName: 'Website Key',
		name: 'websiteKey',
		type: 'string',
		required: true,
		displayOptions: { show: { taskType: ['amazonInvisibleChallenge'] } },
		default: '',
		description: 'Can be any string',
	},
	{
		displayName: 'Context',
		name: 'context',
		type: 'string',
		required: true,
		displayOptions: { show: { taskType: ['amazonInvisibleChallenge'] } },
		default: '',
		description: 'Can be any string',
	},
	{
		displayName: 'IV',
		name: 'iv',
		type: 'string',
		required: true,
		displayOptions: { show: { taskType: ['amazonInvisibleChallenge'] } },
		default: '',
		description: 'Can be any string',
	},
	{
		displayName: 'Cookie Solution',
		name: 'cookieSolution',
		type: 'boolean',
		displayOptions: { show: { taskType: ['amazonInvisibleChallenge'] } },
		default: true,
	},
];

export const buildAmazonInvisibleChallenge = function (
	this: IExecuteFunctions,
	i: number,
): IDataObject {
	const result: IDataObject = {
		type: 'AmazonTask',
		websiteURL: this.getNodeParameter('websiteURL', i),
		challengeScript: this.getNodeParameter('challengeScript', i),
		captchaScript: this.getNodeParameter('captchaScript', i),
		websiteKey: this.getNodeParameter('websiteKey', i),
		context: this.getNodeParameter('context', i),
		iv: this.getNodeParameter('iv', i),
		...getProxyFields.call(this, i),
	};

	const cookieSolution = this.getNodeParameter('cookieSolution', i, true) as boolean;
	if (cookieSolution) result.cookieSolution = cookieSolution;

	return result;
};
