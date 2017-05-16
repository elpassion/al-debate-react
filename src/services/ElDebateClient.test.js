import ElDebateClient  from './ElDebateClient';
import URLSearchParams from 'url-search-params';

class HttpClientMock {
  constructor(returnValue) {
    this.returnValue = returnValue;
  }

  async post(path, params, headers) {
    return this.returnData;
  }

  async get(path, headers) {
    return this.returnData;
  }

  get returnData() {
    return { data: this.returnValue };
  }
}

class CacheMock {
  constructor(){
    this.store = {};
  }

  get(key) {
    return this.store[key];
  }

  set(key, value) {
    this.store[key] = value;
  }
}


describe('ElDebateClient', () => {
  let cacheMock  = null;
  const debateId = 1234;
  const debateCacheKey = `debate_${debateId}_token`;
  const token = 'token';

  const _buildParams = (params) => {
    const urlParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      urlParams.append(key, value);
    });

    return urlParams;
  }

  const error = (message) => {
    const e = new Error(message);
    e.response = { data: { error: message } };
    return e;
  }

  beforeEach(() => {
    cacheMock = new CacheMock();
  });

  describe('getToken', () => {
    const httpClientMock = new HttpClientMock({auth_token: token});

    it('fetches token', () => {
      const client = new ElDebateClient(httpClientMock, cacheMock);

      expect.assertions(1);
      return client.getToken(debateId).then((data) => { expect(data).toBe(token) });
    });

    it('caches token', () => {
      const client = new ElDebateClient(httpClientMock, cacheMock);

      expect.assertions(1);
      return client.getToken(debateId).then(() => { expect(cacheMock.get(debateCacheKey)).toBe(token) });
    });

    it('retrieves token from cache', () => {
      cacheMock.set(debateCacheKey, 'cached_token');
      const client = new ElDebateClient(httpClientMock, cacheMock);

      expect.assertions(1);
      return client.getToken(debateId).then((data) => { expect(data).toBe('cached_token') });
    });

    it('throws Error with error response text if available', async () => {
      const errorMessage = 'error message';
      const httpClientMock = new HttpClientMock(true);
      const post = () => { throw error(errorMessage) };
      httpClientMock.post = post;
      const client = new ElDebateClient(httpClientMock, cacheMock);

      expect.assertions(1)
      try {
        await client.getToken(1234)
      } catch(e) {
        expect(e.message).toBe(errorMessage);
      }
    });

    it('throws error with generic message', async () => {
      const httpClientMock = new HttpClientMock(true);
      const post = () => { throw error(null) };
      httpClientMock.post = post;
      const client = new ElDebateClient(httpClientMock, cacheMock);

      expect.assertions(1)
      try {
        await client.getToken(1234)
      } catch(e) {
        expect(e.message).toBe('Something went wrong');
      }
    });
  });

  describe('getDebate', () => {
    it('fetches debate', () => {
      const debate = {topic: 'test', answers: []};
      const httpClientMock = new HttpClientMock(debate);
      const client = new ElDebateClient(httpClientMock, cacheMock);

      expect.assertions(1);
      return client.getDebate('token').then((data) => expect(data).toBe(debate));
    });
  });

  describe('vote', () => {
    it('sends vote', () => {
      const httpClientMock = new HttpClientMock(true);
      const post = jest.fn();
      httpClientMock.post = post;
      const client = new ElDebateClient(httpClientMock, cacheMock);

      client.vote('token', 1);
      expect(post).toHaveBeenCalledWith('/vote', _buildParams({id: 1}), {headers: { 'Authorization': 'token' }});
    });
  });

  it('it throws Error with error response text if available', async () => {
    const errorMessage = 'error message';
    const httpClientMock = new HttpClientMock(true);
    const post = () => { throw error(errorMessage) };
    httpClientMock.post = post;
    const client = new ElDebateClient(httpClientMock, cacheMock);

    expect.assertions(1)
    try {
      await client.getToken(1234)
    } catch(e) {
      expect(e.message).toBe(errorMessage);
    }
  });
});
