import { INodeProperties, IDataObject, IExecuteFunctions } from 'n8n-workflow';
import { getProxyFields } from '../proxy';

export const prosopo: INodeProperties[] = [
	{
		displayName: 'Website URL',
		name: 'websiteURL',
		type: 'string',
		required: true,
		displayOptions: { show: { taskType: ['prosopo'] } },
		default: '',
		description: 'The URL of the website to solve the Prosopo CAPTCHA',
	},
	{
		displayName: 'Website Key',
		name: 'websiteKey',
		type: 'string',
		required: true,
		displayOptions: { show: { taskType: ['prosopo'] } },
		default: '',
		description: 'Prosopo site key for the CAPTCHA',
	},
];



export const buildProsopoTask = function (this: IExecuteFunctions, i: number): IDataObject {
	const task: IDataObject = {
		type: 'ProsopoTask',
		websiteURL: this.getNodeParameter('websiteURL', i),
		websiteKey: this.getNodeParameter('websiteKey', i),
	};

	return {
		...task,
		...getProxyFields.call(this, i),
	};
};
