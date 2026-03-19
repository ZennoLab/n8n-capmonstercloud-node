import { INodeProperties, IDataObject, IExecuteFunctions } from 'n8n-workflow';
import { userAgent } from '../const';
import { getProxyFields } from '../proxy';

export const recaptchaV2Enterprise: INodeProperties[] = [
	{
		displayName: 'Website URL',
		name: 'websiteURL',
		type: 'string',
		required: true,
		displayOptions: { show: { taskType: ['recaptchaV2Enterprise'] } },
		default: '',
	},
	{
		displayName: 'Website Key',
		name: 'websiteKey',
		type: 'string',
		required: true,
		displayOptions: { show: { taskType: ['recaptchaV2Enterprise'] } },
		default: '',
		description: 'Site key ReCaptcha Enterprise',
	},
	{
		displayName: 'Enterprise Payload',
		name: 'enterprisePayload',
		type: 'string',
		typeOptions: { editor: 'codeNodeEditor', rows: 5 },
		displayOptions: { show: { taskType: ['recaptchaV2Enterprise'] } },
		default: '{}',
		description: 'Additional parameters passed to grecaptcha.enterprise.render',
	},
	{
		displayName: 'Page Action',
		name: 'pageAction',
		type: 'string',
		displayOptions: { show: { taskType: ['recaptchaV2Enterprise'] } },
		default: '',
		description: 'Value of action parameter (e.g. login, verify)',
	},
	{
		displayName: 'API Domain',
		name: 'apiDomain',
		type: 'string',
		displayOptions: { show: { taskType: ['recaptchaV2Enterprise'] } },
		default: '',
		description: 'Domain to load reCAPTCHA from (e.g. www.google.com)',
	},
	{
		displayName: 'User Agent',
		name: 'userAgent',
		type: 'string',
		displayOptions: { show: { taskType: ['recaptchaV2Enterprise'] } },
		default: userAgent,
		description: 'Browser User-Agent string',
	},

	{
		displayName: 'Cookies',
		name: 'cookies',
		type: 'string',
		displayOptions: { show: { taskType: ['recaptchaV2Enterprise'] } },
		default: '',
		description: 'Format: name1=value1; name2=value2',
	},
];

export const buildRecaptchaV2Enterprise = function (
	this: IExecuteFunctions,
	i: number,
): IDataObject {
	const enterprisePayloadRaw = this.getNodeParameter('enterprisePayload', i, '{}') as string;

	let enterprisePayload: IDataObject = {};
	try {
		enterprisePayload = JSON.parse(enterprisePayloadRaw);
	} catch {
		throw new Error('Enterprise Payload should be valid JSON');
	}

	return {
		type: 'RecaptchaV2EnterpriseTask',
		websiteURL: this.getNodeParameter('websiteURL', i),
		websiteKey: this.getNodeParameter('websiteKey', i),
		enterprisePayload,
		pageAction: this.getNodeParameter('pageAction', i, '') as string,
		apiDomain: this.getNodeParameter('apiDomain', i, '') as string,
		userAgent: this.getNodeParameter('userAgent', i, undefined) as string | undefined,
		cookies: this.getNodeParameter('cookies', i, '') as string,

		...getProxyFields.call(this, i),
	};
};
