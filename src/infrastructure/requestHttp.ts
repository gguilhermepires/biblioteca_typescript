import axios, {
  AxiosPromise,
  AxiosRequestConfig,
  AxiosRequestHeaders,
} from 'axios';

interface IConfig {
  method: string;
  url: string;
  headers: AxiosRequestHeaders;
  data?: any;
  auth?: {
    username: string;
    password: string;
  };
}
class RequestHttp {
  static createConfig(_config: IConfig): AxiosRequestConfig {
    let config: AxiosRequestConfig;
    switch (_config.method.toUpperCase()) {
      case 'POST':
        config = {
          method: _config.method,
          url: _config.url,
          headers: _config.headers,
          data: _config.data,
        };

        if (_config.auth !== undefined) {
          config = {
            ...config,
            auth: _config.auth,
          };
        }
        break;
      case 'GET':
        config = {
          method: _config.method,
          url: _config.url,
          headers: _config.headers,
        };
        break;
      case 'DELETE':
        config = {
          method: _config.method,
          url: _config.url,
          headers: _config.headers,
        };
        break;
      default:
        throw new Error('Method invalid');

        config = {
          method: _config.method,
          url: _config.url,
          headers: _config.headers,
        };
        break;
    }
    return config;
  }

  static execute(_config: AxiosRequestConfig): AxiosPromise<any> {
    return axios(_config);
  }

  static execute2(_config: AxiosRequestConfig): AxiosPromise<any> {
    switch (String(_config.method).toUpperCase()) {
      case 'POST':
        return axios.post(String(_config.url), _config.data, {
          auth: {
            username: String(_config.auth?.username),
            password: String(_config.auth?.password),
          },
        });
      default:
        throw new Error('method not implemented');
    }
  }
}

export default RequestHttp;
