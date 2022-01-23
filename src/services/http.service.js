export default class HttpService {
    
    _baseURL = '';
    _baseQueryParams = {};

    constructor() {}

    create(options = {}) {
        if (options.baseURL) {
            this._baseURL = options.baseURL;
        }
        if (options.params) {
            this._baseQueryParams = {...options.params };
        }
    }

    get(url = '', params = {}) {
        const queryParams = { 
            ...this._baseQueryParams,
            ...params
        }

        url = `${this._baseURL && this._baseURL + '/'}${url}?${this._queryParamsToString(queryParams)}`;
        return fetch(url, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json());
    }

    post(url = '', body = {}) {
        const queryParams = { 
            ...this._baseQueryParams,
            ...params
        }

        url = `${this._baseURL && this._baseURL + '/'}${url}?${this._queryParamsToString(queryParams)}`;
        return fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        .then(res => res.json());
    }

    _queryParamsToString(params) {
        if (params === undefined) {
            return '';
        }
        let result = '';
        Object.keys(params).forEach((key, index) => {
            if (params[key] === undefined) {
                return;
            }
            if (index > 0) {
                result += '&';
            }
            result += `${key}=${params[key]}`;
        });
        return result;
    }
}