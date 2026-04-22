import { IDataObject, IExecuteFunctions, INodeProperties } from 'n8n-workflow';
import { userAgent } from '../const';
import { getProxyFields } from '../proxy';

export const alibaba: INodeProperties[] = [
	{
		displayName: 'Website URL',
		name: 'websiteURL',
		type: 'string',
		required: true,
		displayOptions: { show: { operation: ['alibaba'] } },
		default: '',
		description: 'Full URL of the page with the CAPTCHA',
	},
	{
		displayName: 'Scene ID',
		name: 'sceneId',
		type: 'string',
		required: true,
		displayOptions: { show: { operation: ['alibaba'] } },
		default: '',
		description: 'CAPTCHA scenario identifier (metadata.sceneId)',
	},
	{
		displayName: 'Prefix',
		name: 'prefix',
		type: 'string',
		required: true,
		displayOptions: { show: { operation: ['alibaba'] } },
		default: '',
		description: 'CAPTCHA initialization parameter from captcha subdomain (metadata.prefix)',
	},
	{
		displayName: 'User ID',
		name: 'userId',
		type: 'string',
		displayOptions: { show: { operation: ['alibaba'] } },
		default: '',
		description: 'Optional user or session identifier (metadata.userId)',
	},
	{
		displayName: 'User User ID',
		name: 'userUserId',
		type: 'string',
		displayOptions: { show: { operation: ['alibaba'] } },
		default: '',
		description: 'Optional secondary user identifier (metadata.userUserId)',
	},
	{
		displayName: 'Verify Type',
		name: 'verifyType',
		type: 'string',
		displayOptions: { show: { operation: ['alibaba'] } },
		default: '',
		description: 'Optional captcha verification type/version (metadata.verifyType)',
	},
	{
		displayName: 'Region',
		name: 'region',
		type: 'string',
		displayOptions: { show: { operation: ['alibaba'] } },
		default: '',
		description: 'Optional processing region or data center (metadata.region)',
	},
	{
		displayName: 'User Certify ID',
		name: 'userCertifyId',
		type: 'string',
		displayOptions: { show: { operation: ['alibaba'] } },
		default: '',
		description: 'Optional verification ID for current captcha session (metadata.UserCertifyId)',
	},
	{
		displayName: 'API Get Lib',
		name: 'apiGetLib',
		type: 'string',
		displayOptions: { show: { operation: ['alibaba'] } },
		default: '',
		description: 'Optional captcha JS library URL (metadata.apiGetLib)',
	},
	{
		displayName: 'User Agent',
		name: 'userAgent',
		type: 'string',
		displayOptions: { show: { operation: ['alibaba'] } },
		default: userAgent,
		description: 'Optional Windows browser User-Agent',
	},
];

export const buildAlibabaTask = function (this: IExecuteFunctions, i: number): IDataObject {
	const optionalMetadataEntries: Array<[string, string]> = [
		['userId', this.getNodeParameter('userId', i) as string],
		['userUserId', this.getNodeParameter('userUserId', i) as string],
		['verifyType', this.getNodeParameter('verifyType', i) as string],
		['region', this.getNodeParameter('region', i) as string],
		['UserCertifyId', this.getNodeParameter('userCertifyId', i) as string],
		['apiGetLib', this.getNodeParameter('apiGetLib', i) as string],
	];

	const optionalMetadata = optionalMetadataEntries.reduce((acc, [key, value]) => {
		if (value) {
			acc[key] = value;
		}
		return acc;
	}, {} as IDataObject);

	return {
		type: 'CustomTask',
		class: 'alibaba',
		websiteURL: this.getNodeParameter('websiteURL', i),
		userAgent: this.getNodeParameter('userAgent', i),
		metadata: {
			sceneId: this.getNodeParameter('sceneId', i),
			prefix: this.getNodeParameter('prefix', i),
			...optionalMetadata,
		},
		...getProxyFields.call(this, i),
	};
};
