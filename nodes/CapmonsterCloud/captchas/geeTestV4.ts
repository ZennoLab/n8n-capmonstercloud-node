import { INodeProperties, IDataObject, IExecuteFunctions } from 'n8n-workflow';
import { getProxyFields } from '../proxy';
import { userAgent as defaultUserAgent } from '../const';

export const geeTestV4Fields: INodeProperties[] = [
	{
		displayName: 'Website URL',
		name: 'websiteURL',
		type: 'string',
		required: true,
		displayOptions: { show: { operation: ['geeTestV4'] } },
		default: '',
		description: 'Address of the page on which the captcha is solved',
	},
	{
		displayName: 'GT',
		name: 'gt',
		type: 'string',
		required: true,
		displayOptions: { show: { operation: ['geeTestV4'] } },
		default: '',
		description: 'GeeTest identifier key for the domain (captcha_id parameter)',
	},
	{
		displayName: 'Geetest API Subdomain',
		name: 'geetestApiServerSubdomain',
		type: 'string',
		displayOptions: { show: { operation: ['geeTestV4'] } },
		default: '',
		description:
			'Geetest API subdomain server (must be different from api.geetest.com). Optional parameter, required for some sites.',
	},
	{
		displayName: 'Geetest Get Lib',
		name: 'geetestGetLib',
		type: 'string',
		typeOptions: { editor: 'codeNodeEditor', rows: 3 },
		displayOptions: { show: { operation: ['geeTestV4'] } },
		default: '',
		description: 'Path to the captcha script to display it on the page. Send JSON as a string.',
	},
	{
		displayName: 'Init Parameters',
		name: 'initParameters',
		type: 'string',
		typeOptions: { editor: 'codeNodeEditor', rows: 5 },
		displayOptions: { show: { operation: ['geeTestV4'] } },
		default: '{}',
		description: 'JSON string with additional parameters for V4 (will be parsed)',
	},
	{
		displayName: 'User Agent',
		name: 'userAgent',
		type: 'string',
		displayOptions: { show: { operation: ['geeTestV4'] } },
		default: defaultUserAgent,
		description: 'Browser User-Agent used to recognize captcha',
	},
];

export const buildGeeTestV4 = function (this: IExecuteFunctions, i: number): IDataObject {
	const result: IDataObject = {
		type: 'GeeTestTask',
		version: 4,
		websiteURL: this.getNodeParameter('websiteURL', i),
		gt: this.getNodeParameter('gt', i),
		...getProxyFields.call(this, i),
	};

	const subdomain = this.getNodeParameter('geetestApiServerSubdomain', i, '') as string;
	if (subdomain) result.geetestApiServerSubdomain = subdomain;

	const getLib = this.getNodeParameter('geetestGetLib', i, '') as string;
	if (getLib) result.geetestGetLib = getLib;

	const initParamsRaw = this.getNodeParameter('initParameters', i, '{}') as string;
	let initParams: IDataObject = {};
	try {
		initParams = JSON.parse(initParamsRaw);
	} catch {
		throw new Error('Init Parameters must be valid JSON');
	}
	if (Object.keys(initParams).length) result.initParameters = initParams;

	const ua = this.getNodeParameter('userAgent', i, '') as string;
	if (ua) result.userAgent = ua;

	return result;
};
