import {
	ICredentialType,
	INodeProperties,
	Icon,
	IAuthenticateGeneric,
	ICredentialTestRequest,
} from 'n8n-workflow';

export class CapmonsterCloudApi implements ICredentialType {
	name = 'capmonsterCloudApi';
	displayName = 'Capmonster Cloud API';
	documentationUrl = 'https://docs.capmonster.cloud';
	icon = 'file:favicon.svg' as Icon;
	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			default: '',
			required: true,
			typeOptions: {
				password: true,
			},
			description: 'Your Capmonster Cloud API Key',
		},
	];
	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			body: {
				clientKey: '={{$credentials.apiKey}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://api.capmonster.cloud/getBalance',
			method: 'POST',
		},
	};
}
