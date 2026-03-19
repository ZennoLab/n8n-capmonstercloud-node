import { INodeProperties, IDataObject, IExecuteFunctions } from 'n8n-workflow';
import { getProxyFields } from '../proxy';

export const recaptchaV3: INodeProperties[] = [
	{
		displayName: 'Website URL',
		name: 'websiteURL',
		type: 'string',
		required: true,
		displayOptions: { show: { taskType: ['recaptchaV3'] } },
		default: '',
	},
	{
		displayName: 'Website Key',
		name: 'websiteKey',
		type: 'string',
		required: true,
		displayOptions: { show: { taskType: ['recaptchaV3'] } },
		default: '',
	},
	{
		displayName: 'Action',
		name: 'pageAction',
		type: 'string',
		displayOptions: { show: { taskType: ['recaptchaV3'] } },
		default: '',
	},
	{
		displayName: 'Min Score',
		name: 'minScore',
		type: 'number',
		displayOptions: { show: { taskType: ['recaptchaV3'] } },
		default: 0.3,
	},
	{
		displayName: 'Is Enterprise',
		name: 'isEnterprise',
		type: 'boolean',
		displayOptions: { show: { taskType: ['recaptchaV3'] } },
		default: false,
	},
];

export const buildRecaptchaV3 = function (this: IExecuteFunctions, i: number): IDataObject {
	return {
		type: 'RecaptchaV3Task',
		websiteURL: this.getNodeParameter('websiteURL', i),
		websiteKey: this.getNodeParameter('websiteKey', i),
		minScore: this.getNodeParameter('minScore', i),
		pageAction: this.getNodeParameter('pageAction', i),
		isEnterprise: this.getNodeParameter('isEnterprise', i),
		...getProxyFields.call(this, i),
	};
};