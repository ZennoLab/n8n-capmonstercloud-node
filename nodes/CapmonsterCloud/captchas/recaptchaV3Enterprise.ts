import { INodeProperties, IDataObject, IExecuteFunctions } from 'n8n-workflow';
import { getProxyFields } from '../proxy';
import { userAgent } from '../const';

export const recaptchaV3Enterprise: INodeProperties[] = [
	{
		displayName: 'Website URL',
		name: 'websiteURL',
		type: 'string',
		required: true,
		displayOptions: { show: { taskType: ['recaptchaV3Enterprise'] } },
		default: '',
	},
	{
		displayName: 'Website Key',
		name: 'websiteKey',
		type: 'string',
		required: true,
		displayOptions: { show: { taskType: ['recaptchaV3Enterprise'] } },
		default: '',
		description: 'Site key ReCaptcha V3 Enterprise',
	},
	{
		displayName: 'Minimum Score',
		name: 'minScore',
		type: 'number',
		typeOptions: {
			minValue: 0.1,
			maxValue: 0.9,
			numberStep: 0.1,
		},
		displayOptions: { show: { taskType: ['recaptchaV3Enterprise'] } },
		default: 0.3,
		description: 'Minimum score from 0.1 to 0.9',
	},
	{
		displayName: 'Page Action',
		name: 'pageAction',
		type: 'string',
		displayOptions: { show: { taskType: ['recaptchaV3Enterprise'] } },
		default: 'verify',
		description: 'Action parameter passed by the ReCaptcha widget (e.g. login_test)',
	},
	{
		displayName: 'User Agent',
		name: 'userAgent',
		type: 'string',
		displayOptions: { show: { taskType: ['recaptchaV3Enterprise'] } },
		default: userAgent,
		description: 'Browser User-Agent string used in emulation',
	},
	{
		displayName: 'Cookies',
		name: 'cookies',
		type: 'string',
		displayOptions: { show: { taskType: ['recaptchaV3Enterprise'] } },
		default: '',
		description: 'Additional cookies: name1=value1; name2=value2',
	},
	{
		displayName: 'API Domain',
		name: 'apiDomain',
		type: 'string',
		displayOptions: { show: { taskType: ['recaptchaV3Enterprise'] } },
		default: '',
		description: 'Domain to load reCAPTCHA from (e.g. www.google.com)',
	},
];

export const buildRecaptchaV3Enterprise = function (
	this: IExecuteFunctions,
	i: number,
): IDataObject {
	const result: IDataObject = {
		type: 'RecaptchaV3EnterpriseTask',
		websiteURL: this.getNodeParameter('websiteURL', i),
		websiteKey: this.getNodeParameter('websiteKey', i),
		...getProxyFields.call(this, i),
	};

	const minScore = this.getNodeParameter('minScore', i, 0.3) as number;
	if (minScore) result.minScore = minScore;

	const pageAction = this.getNodeParameter('pageAction', i, 'verify') as string;
	if (pageAction) result.pageAction = pageAction;

	const userAgent = this.getNodeParameter('userAgent', i, '') as string;
	if (userAgent) result.userAgent = userAgent;

	const cookies = this.getNodeParameter('cookies', i, '') as string;
	if (cookies) result.cookies = cookies;

	const apiDomain = this.getNodeParameter('apiDomain', i, '') as string;
	if (apiDomain) result.apiDomain = apiDomain;

	return result;
};
