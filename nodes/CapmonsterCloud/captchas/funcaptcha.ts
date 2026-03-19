import { INodeProperties, IDataObject, IExecuteFunctions } from 'n8n-workflow';
import { userAgent } from '../const';
import { getProxyFields } from '../proxy';

export const funcaptcha: INodeProperties[] = [
	{
		displayName: 'Website URL',
		name: 'websiteURL',
		type: 'string',
		required: true,
		displayOptions: { show: { taskType: ['funcaptcha'] } },
		default: '',
		description: 'The URL of the page with FunCaptcha',
	},
	{
		displayName: 'Website Public Key',
		name: 'websitePublicKey',
		type: 'string',
		required: true,
		displayOptions: { show: { taskType: ['funcaptcha'] } },
		default: '',
		description: 'FunCaptcha public key (pk)',
	},
	{
		displayName: 'FunCaptcha API JS Subdomain',
		name: 'funcaptchaApiJSSubdomain',
		type: 'string',
		displayOptions: { show: { taskType: ['funcaptcha'] } },
		default: '',
		description: 'Arkose Labs subdomain (surl), without https://',
	},
	{
		displayName: 'Data',
		name: 'data',
		type: 'string',
		displayOptions: { show: { taskType: ['funcaptcha'] } },
		default: '',
		description: 'JSON blob (data[blob]) if required by site',
	},
	{
		displayName: 'Cookies',
		name: 'cookies',
		type: 'string',
		displayOptions: { show: { taskType: ['funcaptcha'] } },
		default: '',
		description: 'Additional cookies (format: name=value; name2=value2)',
	},
	{
		displayName: 'User Agent',
		name: 'userAgent',
		type: 'string',
		displayOptions: { show: { taskType: ['funcaptcha'] } },
		default: userAgent,
		description: 'Browser User-Agent',
	},
];

export const buildFunCaptchaTask = function (this: IExecuteFunctions, i: number): IDataObject {
	const task: IDataObject = {
		type: 'FunCaptchaTask',
		websiteURL: this.getNodeParameter('websiteURL', i),
		websitePublicKey: this.getNodeParameter('websitePublicKey', i),
	};

	const funcaptchaApiJSSubdomain = this.getNodeParameter(
		'funcaptchaApiJSSubdomain',
		i,
		'',
	) as string;
	const data = this.getNodeParameter('data', i, '') as string;
	const cookies = this.getNodeParameter('cookies', i, '') as string;
	const ua = this.getNodeParameter('userAgent', i, '') as string;

	if (funcaptchaApiJSSubdomain) {
		task.funcaptchaApiJSSubdomain = funcaptchaApiJSSubdomain;
	}

	if (data) {
		task.data = data;
	}

	if (cookies) {
		task.cookies = cookies;
	}

	if (ua) {
		task.userAgent = ua;
	}

	return {
		...task,
		...getProxyFields.call(this, i),
	};
};
