import { INodeProperties, IDataObject, IExecuteFunctions } from 'n8n-workflow';
import { getProxyFields } from '../proxy';

export const amazonFullChallenge: INodeProperties[] = [
	{
		displayName: 'Website URL',
		name: 'websiteURL',
		type: 'string',
		required: true,
		displayOptions: { show: { taskType: ['amazonFullChallenge'] } },
		default: '',
	},
	{
		displayName: 'Challenge Script',
		name: 'challengeScript',
		type: 'string',
		required: true,
		displayOptions: { show: { taskType: ['amazonFullChallenge'] } },
		default: '',
	},
	{
		displayName: 'Website Key',
		name: 'websiteKey',
		type: 'string',
		required: true,
		displayOptions: { show: { taskType: ['amazonFullChallenge'] } },
		default: '',
	},
	{
		displayName: 'Context',
		name: 'context',
		type: 'string',
		required: true,
		displayOptions: { show: { taskType: ['amazonFullChallenge'] } },
		default: '',
	},
	{
		displayName: 'IV',
		name: 'iv',
		type: 'string',
		required: true,
		displayOptions: { show: { taskType: ['amazonFullChallenge'] } },
		default: '',
	},
	{
		displayName: 'Captcha Script',
		name: 'captchaScript',
		type: 'string',
		displayOptions: { show: { taskType: ['amazonFullChallenge'] } },
		default: '',
	},
	{
		displayName: 'Cookie Solution',
		name: 'cookieSolution',
		type: 'boolean',
		displayOptions: { show: { taskType: ['amazonFullChallenge'] } },
		default: false,
	},
];

export const buildAmazonFullChallenge = function (this: IExecuteFunctions, i: number): IDataObject {
	const result: IDataObject = {
		type: 'AmazonTask',
		websiteURL: this.getNodeParameter('websiteURL', i),
		challengeScript: this.getNodeParameter('challengeScript', i),
		websiteKey: this.getNodeParameter('websiteKey', i),
		context: this.getNodeParameter('context', i),
		iv: this.getNodeParameter('iv', i),
		...getProxyFields.call(this, i),
	};

	const captchaScript = this.getNodeParameter('captchaScript', i, '') as string;
	if (captchaScript) result.captchaScript = captchaScript;

	const cookieSolution = this.getNodeParameter('cookieSolution', i, false) as boolean;
	if (cookieSolution) result.cookieSolution = cookieSolution;

	return result;
};
