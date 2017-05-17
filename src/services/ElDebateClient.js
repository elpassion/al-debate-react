import axios             from 'axios';
import URLSearchParams   from 'url-search-params';
import LocalStorageCache from './LocalStorageCache';

export default class ElDebateClient {
  static build() {
    const httpClient = axios.create({
      baseURL: process.env.REACT_APP_EL_DEBATE_BASE_URL
    });
    const cache = new LocalStorageCache();
    return new ElDebateClient(httpClient, cache);
  }

  constructor(httpClient, cache) {
    this.httpClient = httpClient;
    this.cache      = cache;
  }

  async getToken(debateCode) {
    const key     = `debate_${debateCode}_token`;
    let authToken = this.cache.get(key);
    if (authToken) { return authToken }
    else {
      try{
        const response = await this.httpClient.post('/login', this._buildParams({code: debateCode}));
        authToken = response.data.auth_token;
        this.cache.set(key, authToken);
        return authToken;
      } catch(e) {
        throw new Error(e.response.data.message);
      }
    }
  }

  async getDebate(accessToken) {
    const response = await this.httpClient.get('/debate', this._buildHeaders(accessToken));
    return response.data;
  }

  async vote(accessToken, voteId) {
    try {
      const response = await this.httpClient.post('/vote',
                                                  this._buildParams({id: voteId}),
                                                  this._buildHeaders(accessToken));
      return response.data;
    } catch(e) {
      throw new Error(e.response.data.message);
    }
  }

  _buildHeaders(accessToken) {
    return { headers: { 'Authorization': accessToken } };
  }

  _buildParams(params) {
    const urlParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      urlParams.append(key, value);
    })
    return urlParams;
  }
}
