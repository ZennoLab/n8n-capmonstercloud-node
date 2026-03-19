import { INodeProperties, IDataObject, IExecuteFunctions } from 'n8n-workflow';
import { getProxyFields } from '../proxy';
import { userAgent } from '../const';

export const recaptchaV2Fields: INodeProperties[] = [
	{
		displayName: 'Website URL',
		name: 'websiteURL',
		type: 'string',
		required: true,
		displayOptions: { show: { taskType: ['recaptchaV2'] } },
		default: '',
	},
	{
		displayName: 'Website Key',
		name: 'websiteKey',
		type: 'string',
		required: true,
		displayOptions: { show: { taskType: ['recaptchaV2'] } },
		default: '',
	},
	{
		displayName: 'Recaptcha Data S Value',
		name: 'recaptchaDataSValue',
		type: 'string',

		displayOptions: { show: { taskType: ['recaptchaV2'] } },
		default: '',
		description: 'Optional data-s value from reCAPTCHA. One-time token from div attribute.',
	},

	{
		displayName: 'User Agent',
		name: 'userAgent',
		type: 'string',
		displayOptions: { show: { taskType: ['recaptchaV2'] } },
		default: userAgent,
		description: 'Browser User-Agent string. Use a modern browser signature.',
	},

	{
		displayName: 'Cookies',
		name: 'cookies',
		type: 'string',
		displayOptions: { show: { taskType: ['recaptchaV2'] } },
		default: '',
		description: 'Cookies in format: name1=value1; name2=value2',
	},

	{
		displayName: 'Is Invisible',
		name: 'isInvisible',
		type: 'boolean',

		displayOptions: { show: { taskType: ['recaptchaV2'] } },
		default: false,
		description: 'Whether the captcha is invisible (no checkbox)',
	},
];

export const buildRecaptchaV2 = function (this: IExecuteFunctions, i: number): IDataObject {
	return {
		type: 'RecaptchaV2Task',
		websiteURL: this.getNodeParameter('websiteURL', i),
		websiteKey: this.getNodeParameter('websiteKey', i),
		
		recaptchaDataSValue: this.getNodeParameter('recaptchaDataSValue', i, ''),
		userAgent: this.getNodeParameter('userAgent', i, ''),
		cookies: this.getNodeParameter('cookies', i, ''),
		isInvisible: this.getNodeParameter('isInvisible', i, false),

		...getProxyFields.call(this, i),
	};
};
