import { INodeProperties, IExecuteFunctions, IDataObject } from 'n8n-workflow';
import { TaskType } from '../types';

const taskTypes: TaskType[] = [
	'recaptchaV2',
	'recaptchaV3',
	'recaptchaV2Enterprise',
	'recaptchaV3Enterprise',
	'geeTestV3',
	'geeTestV4',
	'turnstile',
	'turnstileChallengeToken',
	'turnstileChallengeCfClearance',
	'turnstileWaitRoom',
	'datadome',
	'basilisk',
	'tendi',
	'amazonJsApi',
	'amazonFullChallenge',
	'amazonInvisibleChallenge',
	'binance',
	'imperva',
	'prosopo',
	'temu',
	'yidun',
	'mtcaptcha',
	'altcha',
	'funcaptcha',
	'castle',
	'tspd',
	'hunt',
];

export const proxyFields: INodeProperties[] = [
	{
		displayName: 'Use Proxy',
		name: 'useProxy',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				taskType: taskTypes,
			},
		},
	},
	{
		displayName: 'Proxy Type',
		name: 'proxyType',
		type: 'options',
		options: [
			{ name: 'HTTP', value: 'http' },
			{ name: 'HTTPS', value: 'https' },
			{ name: 'SOCKS5', value: 'socks5' },
		],
		default: 'http',
		displayOptions: {
			show: {
				useProxy: [true],
				taskType: ['recaptchaV2', 'recaptchaV3'],
			},
		},
	},
	{
		displayName: 'Proxy Address',
		name: 'proxyAddress',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				useProxy: [true],
				taskType: taskTypes,
			},
		},
		description: 'IP/hostname proxy. Example: 1.2.3.4 или proxy.example.com.',
	},
	{
		displayName: 'Proxy Port',
		name: 'proxyPort',
		type: 'number',
		default: 8080,
		displayOptions: {
			show: {
				useProxy: [true],
				taskType: taskTypes,
			},
		},
	},
	{
		displayName: 'Proxy Login',
		name: 'proxyLogin',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				useProxy: [true],
				taskType: taskTypes,
			},
		},
	},
	{
		displayName: 'Proxy Password',
		name: 'proxyPassword',
		type: 'string',
		typeOptions: { password: true },
		default: '',
		displayOptions: {
			show: {
				useProxy: [true],
				taskType: taskTypes,
			},
		},
	},
];


export const getProxyFields = function (this: IExecuteFunctions, i: number): IDataObject {
	const useProxy = this.getNodeParameter('useProxy', i, false) as boolean;
	if (!useProxy) return {};

	const proxyType = this.getNodeParameter('proxyType', i, undefined) as string | undefined;
	const proxyAddress = this.getNodeParameter('proxyAddress', i, undefined) as string | undefined;
	const proxyPort = this.getNodeParameter('proxyPort', i, undefined) as number | undefined;
	const proxyLogin = this.getNodeParameter('proxyLogin', i, undefined) as string | undefined;
	const proxyPassword = this.getNodeParameter('proxyPassword', i, undefined) as string | undefined;

	if (!proxyType || !proxyAddress || !proxyPort) return {};

	return {
		proxyType,
		proxyAddress,
		proxyPort,
		...(proxyLogin ? { proxyLogin } : {}),
		...(proxyPassword ? { proxyPassword } : {}),
	};
};
