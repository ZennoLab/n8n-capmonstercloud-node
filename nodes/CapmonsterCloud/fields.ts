import { recaptchaV2Fields } from './captchas/recaptchaV2';
import { jsonTaskFields } from './captchas/json';
import { recaptchaV3 } from './captchas/recaptchaV3';
import { imageToText } from './captchas/imageToText';
import { INodeProperties } from 'n8n-workflow';
import { proxyFields } from './proxy';
import { recaptchaV3Enterprise } from './captchas/recaptchaV3Enterprise';
import { recaptchaV2Enterprise } from './captchas/recaptchaV2Enterprise';
import { recaptchaClick } from './captchas/recaptchaClick';
import { turnstile } from './captchas/turnstile';
import { turnstileChallengeToken } from './captchas/turnstileChallengeToken';
import { turnstileWaitRoom } from './captchas/turnstileWaitRoom';
import { complexImageRecognition } from './captchas/complexImageRecognition';
import { datadome } from './captchas/datadome';
import { basilisk } from './captchas/basilisk';
import { tendi } from './captchas/tendi';
import { binance } from './captchas/binance';
import { imperva } from './captchas/imperva';
import { prosopo } from './captchas/prosopo';
import { temu } from './captchas/temu';
import { yidun } from './captchas/yidun';
import { mtcaptcha } from './captchas/mtcaptcha';
import { altcha } from './captchas/altcha';
import { funcaptcha } from './captchas/funcaptcha';
import { castle } from './captchas/castle';
import { tspd } from './captchas/tspd';
import { hunt } from './captchas/hunt';
import { geeTestV3Fields } from './captchas/geetestV3';
import { geeTestV4Fields } from './captchas/geeTestV4';
import { turnstileChallengeCfClearance } from './captchas/turnstileChallengeCfClearance';
import { amazonFullChallenge } from './captchas/amazonFullChallenge';
import { amazonJsApi } from './captchas/amazonJsapi';
import { amazonInvisibleChallenge } from './captchas/amazonInvisibleChallenge';
import { TaskType } from './types';


const options: Array<{ name: string; value: TaskType }> = [
	{ name: 'Altcha', value: 'altcha' },
	{ name: 'Amazon Full Challenge', value: 'amazonFullChallenge' },
	{ name: 'Amazon Invisible Challenge', value: 'amazonInvisibleChallenge' },
	{ name: 'Amazon JS API', value: 'amazonJsApi' },
	{ name: 'Basilisk', value: 'basilisk' },
	{ name: 'Binance', value: 'binance' },
	{ name: 'Castle', value: 'castle' },
	{ name: 'Cloudflare Challenge (CfClearance)', value: 'turnstileChallengeCfClearance' },
	{ name: 'Cloudflare Challenge (Token)', value: 'turnstileChallengeToken' },
	{ name: 'Cloudflare Turnstile', value: 'turnstile' },
	{ name: 'Cloudflare Waiting Room', value: 'turnstileWaitRoom' },
	{ name: 'Complex Image Recognition', value: 'complexImageRecognition' },
	{ name: 'DataDome', value: 'datadome' },
	{ name: 'FunCaptcha', value: 'funcaptcha' },
	{ name: 'Gee Test V3', value: 'geeTestV3' },
	{ name: 'Gee Test V4', value: 'geeTestV4' },
	{ name: 'Hunt', value: 'hunt' },
	{ name: 'Image To Text', value: 'imageToText' },
	{ name: 'Imperva', value: 'imperva' },
	{ name: 'JSON (Custom Task)', value: 'json' },
	{ name: 'Mtcaptcha', value: 'mtcaptcha' },
	{ name: 'Prosopo', value: 'prosopo' },
	{ name: 'Recaptcha (Click)', value: 'recaptchaClick' },
	{ name: 'Recaptcha V2', value: 'recaptchaV2' },
	{ name: 'Recaptcha V2 Enterprise', value: 'recaptchaV2Enterprise' },
	{ name: 'Recaptcha V3', value: 'recaptchaV3' },
	{ name: 'Recaptcha V3 Enterprise', value: 'recaptchaV3Enterprise' },
	{ name: 'Temu', value: 'temu' },
	{ name: 'Tendi', value: 'tendi' },
	{ name: 'Tspd', value: 'tspd' },
	{ name: 'Yidun', value: 'yidun' },
];

export const allFields: INodeProperties[] = [
	{
		displayName: 'Operations',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		options: options,
		default: 'recaptchaV2',
	},
	...recaptchaV2Fields,
	...imageToText,
	...jsonTaskFields,
	...recaptchaV3,
	...recaptchaV2Enterprise,
	...recaptchaV3Enterprise,
	...geeTestV3Fields,
	...geeTestV4Fields,
	...recaptchaClick,
	...turnstile,
	...turnstileChallengeToken,
	...turnstileChallengeCfClearance,
	...turnstileWaitRoom,
	...complexImageRecognition,
	...datadome,
	...basilisk,
	...tendi,
	...binance,
	...imperva,
	...amazonJsApi,
	...amazonInvisibleChallenge,
	...amazonFullChallenge,
	...prosopo,
	...temu,
	...yidun,
	...mtcaptcha,
	...altcha,
	...funcaptcha,
	...castle,
	...tspd,
	...hunt,
	...proxyFields,
];
