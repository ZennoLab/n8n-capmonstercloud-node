import { INodeProperties, IDataObject, IExecuteFunctions } from 'n8n-workflow';
import { getProxyFields } from '../proxy';
import { userAgent } from '../const';

export const geeTestV4Fields: INodeProperties[] = [
	{
		displayName: 'Website URL',
		name: 'websiteURL',
		type: 'string',
		required: true,
		displayOptions: { show: { taskType: ['geeTestV4'] } },
		default: '',
	},
	{
		displayName: 'GT',
		name: 'gt',
		type: 'string',
		required: true,
		displayOptions: { show: { taskType: ['geeTestV4'] } },
		default: '',
		description: 'GeeTest captcha_id parameter for the domain',
	},
	{
		displayName: 'Geetest API Subdomain',
		name: 'geetestApiServerSubdomain',
		type: 'string',
		displayOptions: { show: { taskType: ['geeTestV4'] } },
		default: '',
		description: 'Custom Geetest API subdomain (не api.geetest.com)',
	},

	{
		displayName: 'Geetest Get Lib',
		name: 'geetestGetLib',
		type: 'string',
		typeOptions: { editor: 'codeNodeEditor', rows: 3 },
		displayOptions: { show: { taskType: ['geeTestV4'] } },
		default: '',
		description: 'JSON string с параметрами загрузки скрипта',
	},

	{
		displayName: 'Init Parameters',
		name: 'initParameters',
		type: 'json',
		displayOptions: { show: { taskType: ['geeTestV4'] } },
		default: {},
		description: 'Дополнительные параметры для версии 4 (используются с riskType)',
	},

	{
		displayName: 'User Agent',
		name: 'userAgent',
		type: 'string',
		displayOptions: { show: { taskType: ['geeTestV4'] } },
		default: userAgent,
		description: 'Browser User-Agent used for captcha recognition',
	},
];

export const buildGeeTestV4 = function (this: IExecuteFunctions, i: number): IDataObject {
	const result: IDataObject = {
		type: 'GeeTestTask',
		websiteURL: this.getNodeParameter('websiteURL', i),
		gt: this.getNodeParameter('gt', i),
		version: 4,
		...getProxyFields.call(this, i), // добавляет прокси, если указаны
	};

	const subdomain = this.getNodeParameter('geetestApiServerSubdomain', i, '') as string;
	if (subdomain) result.geetestApiServerSubdomain = subdomain;

	const getLib = this.getNodeParameter('geetestGetLib', i, '') as string;
	if (getLib) result.geetestGetLib = getLib;

	const initParams = this.getNodeParameter('initParameters', i, {}) as object;
	if (initParams && Object.keys(initParams).length > 0) result.initParameters = initParams;

	const userAgent = this.getNodeParameter('userAgent', i, '') as string;
	if (userAgent) result.userAgent = userAgent;

	return result;
};