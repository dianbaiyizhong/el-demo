import {axios, baseUrl} from '../http'
import {AxiosResponse} from "axios";


const service = axios.create({
    baseURL: baseUrl,
})


service.interceptors.response.use(
    (response: AxiosResponse) => {
        if (response.data && response.data.code == 0) {
            return Promise.resolve(response.data.data)
        } else {
            return Promise.resolve(response)
        }
    },
    (error) => {
        // 响应错误处理
        return Promise.reject(error);
    },
);

export function httpGet(url: string, params: any, config: any) {
    return service.get(url, {
        params: params,
    })
}