import axios from 'axios';
import configs from '../configs/mainConfigs';
import { getStorageItem } from '../storage';

class MakeRequest {
    constructor() {
        this.axiosInstance = axios.create({
            baseURL: configs.connection.server_url,
            headers: {
                ...(getStorageItem('user')?.token ? { Authorization: `Bearer ${getStorageItem('user')?.token}` } : {}),
                'Content-Type': 'application/json-patch+json',
            },
        });
        this.currentExecutingRequests = {};

        this.axiosInstance.interceptors.response.use(response => {
            if (this.currentExecutingRequests[response.request.responseURL]) {
                delete this.currentExecutingRequests[response.request.responseURL];
            }
            return response;
        }, (error) => {
            const { config } = error;
            const originalRequest = config;

            if (axios.isCancel(error)) {
                return new Promise(() => {});
            }

            if (this.currentExecutingRequests[originalRequest?.url]) {
                delete this.currentExecutingRequests[originalRequest?.url];
            }
            return Promise.reject({ error });
        });

        this.axiosInstance.interceptors.request.use(req => {
            let originalRequest = req;
            if (this.currentExecutingRequests[req?.url + JSON.stringify(req?.params)]) {
                const source = this.currentExecutingRequests[req?.url + JSON.stringify(req?.params)];
                delete this.currentExecutingRequests[req?.url + JSON.stringify(req?.params)];
                source.cancel();
            }

            const CancelToken = axios.CancelToken;
            const source = CancelToken.source();
            originalRequest.cancelToken = source.token;
            this.currentExecutingRequests[req?.url + JSON.stringify(req?.params)] = source;

            req.headers = {
                ...req.headers,
                ...(getStorageItem('user')?.token ? { Authorization: `Bearer ${getStorageItem('user')?.token}` } : {}),
            };

            return req;
        },
        err => {
            return Promise.reject(err);
        }
        );
    }

    getJson(url = '', params = {}, headers = {}) {
        return this.axiosInstance.get(url, { params }, headers);
    }

    postJson(url = '', params = {}) {
        return this.axiosInstance.post(url, params).then(response => {
            return response.data;
        });
    }

    postSendFiles(url, params) {
        return axios.post(url, { ...params }, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
    }

    putJson(url = '', params = {}) {
        return this.axiosInstance.put(url, params);
    }

    deleteJson(url = '', params = {}) {
        return this.axiosInstance.delete(url, params);
    }
}

export default MakeRequest;
