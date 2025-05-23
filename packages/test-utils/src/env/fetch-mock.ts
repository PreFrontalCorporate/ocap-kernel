import { beforeEach, vi } from 'vitest';
import createFetchMock from 'vitest-fetch-mock';

const fetchMock = createFetchMock(vi);
fetchMock.enableMocks();

beforeEach(() => {
  fetchMock.resetMocks();
});

export { fetchMock };
