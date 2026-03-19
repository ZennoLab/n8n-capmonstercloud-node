import { INodeProperties, IDataObject, IExecuteFunctions } from 'n8n-workflow';
import { getProxyFields } from '../proxy';
import { userAgent } from '../const';

export const geeTestV3Fields: INodeProperties[] = [
	{
		displayName: 'Website URL',
		name: 'websiteURL',
		type: 'string',
		required: true,
		displayOptions: { show: { taskType: ['geeTestV3'] } },
		default: '',
	},
	{
		displayName: 'GT',
		name: 'gt',
		type: 'string',
		required: true,
		displayOptions: { show: { taskType: ['geeTestV3'] } },
		default: '',
		description: 'Static GeeTest identifier key',
	},
	{
		displayName: 'Challenge',
		name: 'challenge',
		type: 'string',
		required: true,
		displayOptions: { show: { taskType: ['geeTestV3'] } },
		default: '',
		description: 'Dynamic challenge ключ (обновляется каждый раз)',
	},
	{
		displayName: 'Geetest API Subdomain',
		name: 'geetestApiServerSubdomain',
		type: 'string',
		displayOptions: { show: { taskType: ['geeTestV3'] } },
		default: '',
		description: 'Custom Geetest API subdomain (не api.geetest.com)',
	},

	{
		displayName: 'Geetest Get Lib',
		name: 'geetestGetLib',
		type: 'string',
		typeOptions: { editor: 'codeNodeEditor', rows: 3 },
		displayOptions: { show: { taskType: ['geeTestV3'] } },
		default: '',
		description: 'JSON string с параметрами загрузки скрипта',
	},

	{
		displayName: 'User Agent',
		name: 'userAgent',
		type: 'string',
		displayOptions: { show: { taskType: ['geeTestV3'] } },
		default: userAgent,
	},
];

export const buildGeeTestV3 = function (this: IExecuteFunctions, i: number): IDataObject {
	const result: IDataObject = {
		type: 'GeeTestTask',
		websiteURL: this.getNodeParameter('websiteURL', i),
		gt: this.getNodeParameter('gt', i),
		challenge: this.getNodeParameter('challenge', i),
		version: 3,
		...getProxyFields.call(this, i),
	};

	const subdomain = this.getNodeParameter('geetestApiServerSubdomain', i, '') as string;
	if (subdomain) result.geetestApiServerSubdomain = subdomain;

	const getLib = this.getNodeParameter('geetestGetLib', i, '') as string;
	if (getLib) result.geetestGetLib = getLib;

	const userAgent = this.getNodeParameter('userAgent', i, '') as string;
	if (userAgent) result.userAgent = userAgent;

	return result;
};
