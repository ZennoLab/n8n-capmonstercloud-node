import { INodeProperties, IDataObject, IExecuteFunctions } from 'n8n-workflow';
import { userAgent } from '../const';
import { getProxyFields } from '../proxy';

export const binance: INodeProperties[] = [
	{
		displayName: 'Website URL',
		name: 'websiteURL',
		type: 'string',
		required: true,
		displayOptions: { show: { taskType: ['binance'] } },
		default: '',
		description: 'The URL of the Binance page with the captcha',
	},
	{
		displayName: 'Website Key',
		name: 'websiteKey',
		type: 'string',
		required: true,
		displayOptions: { show: { taskType: ['binance'] } },
		default: '',
		description: 'Captcha site key or identifier',
	},
	{
		displayName: 'Validate ID',
		name: 'validateId',
		type: 'string',
		required: true,
		displayOptions: { show: { taskType: ['binance'] } },
		default: '',
		description: 'Unique validation ID for the captcha challenge',
	},
	{
		displayName: 'User Agent',
		name: 'userAgent',
		type: 'string',
		displayOptions: { show: { taskType: ['binance'] } },
		default: userAgent,
		description: 'Optional User-Agent header for the request',
	},
];


export const buildBinanceTask = function (this: IExecuteFunctions, i: number): IDataObject {
	const task: IDataObject = {
		type: 'BinanceTask',
		websiteURL: this.getNodeParameter('websiteURL', i),
		websiteKey: this.getNodeParameter('websiteKey', i),
		validateId: this.getNodeParameter('validateId', i),
		userAgent: this.getNodeParameter('userAgent', i),
	};

	return {
		...task,
		...getProxyFields.call(this, i),
	};
};
