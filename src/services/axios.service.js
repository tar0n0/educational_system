import axios from 'axios';
import configs from '../configs/mainConfigs';
import { getStorageItem } from '../storage';

class MakeRequest {
    constructor() {
        this.axiosInstance = axios.create({
            baseURL: configs.connection.server_url,
            headers: {
                ...(getStorageItem('user')?.token ? { Authorization: `Bearer ${getStorageItem('user')?.token}` } : {}),
                'Content-Type': 'application/json',
            },
        });

        this.axiosInstance.interceptors.response.use(response => {
            return response;
        }, (error) => {
            return Promise.reject({ error });
        });

        this.axiosInstance.interceptors.request.use(req => {
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
