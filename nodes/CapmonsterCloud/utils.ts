export type CapmonsterAction = 'CreateTask' | 'GetTaskResult';

export const formatCapmonsterError = (action: CapmonsterAction, response: unknown): string => {
	if (!response || typeof response !== 'object') {
		return `${action} failed: unexpected response ${String(response)}`;
	}

	const errorId =
		'errorId' in response && typeof (response as { errorId?: unknown }).errorId === 'number'
			? (response as { errorId: number }).errorId
			: 'unknown';
	const errorDescription =
		'errorDescription' in response &&
		typeof (response as { errorDescription?: unknown }).errorDescription === 'string' &&
		(response as { errorDescription: string }).errorDescription.trim() !== ''
			? (response as { errorDescription: string }).errorDescription
			: 'not provided';

	return `${action} failed (errorId: ${errorId}, errorDescription: ${errorDescription}, response: ${JSON.stringify(response)})`;
};
