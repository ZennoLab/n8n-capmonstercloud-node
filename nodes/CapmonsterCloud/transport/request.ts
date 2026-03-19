import { IExecuteFunctions, IDataObject, NodeOperationError, sleep } from 'n8n-workflow';
import { softId } from '../const';

export const request = async (
	context: IExecuteFunctions,
	url: string,
	body: Record<string, unknown>,
) => {
	return context.helpers.httpRequest({
		method: 'POST',
		url,
		body,
		json: true,
	});
};

export const waitForResult = async (
	context: IExecuteFunctions,
	apiKey: string,
	taskId: number,
	maxAttempts = 180,
	delay = 1000,
): Promise<IDataObject> => {
	for (let attempt = 1; attempt <= maxAttempts; attempt++) {
		const result = await request(context, 'https://api.capmonster.cloud/getTaskResult', {
			clientKey: apiKey,
			taskId,
			softId,
		});

		if (result.errorId !== 0) {
			throw new NodeOperationError(
				context.getNode(),
				result.errorDescription || 'CapMonster error',
			);
		}

		if (result.status === 'ready') {
			return result.solution ?? {};
		}

		await sleep(delay);
	}

	throw new NodeOperationError(context.getNode(), 'Timeout');
};
