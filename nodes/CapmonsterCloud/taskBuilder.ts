import { IDataObject, IExecuteFunctions } from 'n8n-workflow';
import { TaskType } from './types';
import { buildRecaptchaV2 } from './captchas/recaptchaV2';
import { buildRecaptchaV3 } from './captchas/recaptchaV3';
import { buildRecaptchaV2Enterprise } from './captchas/recaptchaV2Enterprise';
import { buildRecaptchaV3Enterprise } from './captchas/recaptchaV3Enterprise';
import { buildRecaptchaClick } from './captchas/recaptchaClick';
import { buildGeeTestV3 } from './captchas/geetestV3';
import { buildGeeTestV4 } from './captchas/geeTestV4';
import { buildTurnstile } from './captchas/turnstile';
import { buildTurnstileChallengeToken } from './captchas/turnstileChallengeToken';
import { buildTurnstileChallengeCfClearance } from './captchas/turnstileChallengeCfClearance';
import { buildTurnstileWaitRoom } from './captchas/turnstileWaitRoom';
import { buildComplexImageRecognition } from './captchas/complexImageRecognition';
import { buildDataDome } from './captchas/datadome';
import { buildImageToText } from './captchas/imageToText';
import { buildBasiliskTask } from './captchas/basilisk';
import { buildTenDITask } from './captchas/tendi';
import { buildAmazonJsApi } from './captchas/amazonJsapi';
import {  buildAmazonFullChallenge } from './captchas/amazonFullChallenge';
import { buildAmazonInvisibleChallenge } from './captchas/amazonInvisibleChallenge';
import { buildBinanceTask } from './captchas/binance';
import { buildImpervaTask } from './captchas/imperva';
import { buildProsopoTask } from './captchas/prosopo';
import { buildTemuTask } from './captchas/temu';
import { buildYidunTask } from './captchas/yidun';
import { buildMTCaptchaTask } from './captchas/mtcaptcha';
import { buildAltchaTask } from './captchas/altcha';
import { buildFunCaptchaTask } from './captchas/funcaptcha';
import { buildCastleTask } from './captchas/castle';
import { buildTspdTask } from './captchas/tspd';
import { buildHuntTask } from './captchas/hunt';
import { buildJsonTask } from './captchas/json';

type Builder = (this: IExecuteFunctions, i: number) => IDataObject;

export const taskBuilders: Record<TaskType, Builder> = {
	json: buildJsonTask,
	recaptchaV2: buildRecaptchaV2,
	recaptchaV3: buildRecaptchaV3,
	imageToText: buildImageToText,
	recaptchaV2Enterprise: buildRecaptchaV2Enterprise,
	recaptchaV3Enterprise: buildRecaptchaV3Enterprise,
	recaptchaClick: buildRecaptchaClick,
	geeTestV3: buildGeeTestV3,
	geeTestV4: buildGeeTestV4,
	turnstile: buildTurnstile,
	turnstileWaitRoom: buildTurnstileWaitRoom,
	turnstileChallengeToken: buildTurnstileChallengeToken,
	turnstileChallengeCfClearance: buildTurnstileChallengeCfClearance,
	complexImageRecognition: buildComplexImageRecognition,
	datadome: buildDataDome,
	basilisk: buildBasiliskTask,
	tendi: buildTenDITask,
	amazonJsApi: buildAmazonJsApi,
	amazonFullChallenge: buildAmazonFullChallenge,
	amazonInvisibleChallenge: buildAmazonInvisibleChallenge,
	binance: buildBinanceTask,
	imperva: buildImpervaTask,
	prosopo: buildProsopoTask,
	temu: buildTemuTask,
	yidun: buildYidunTask,
	mtcaptcha: buildMTCaptchaTask,
	altcha: buildAltchaTask,
	funcaptcha: buildFunCaptchaTask,
	castle: buildCastleTask,
	tspd: buildTspdTask,
	hunt: buildHuntTask,
};
