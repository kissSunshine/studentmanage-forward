import axios from 'axios'
import { Message } from 'element-ui';

// 统一响应处理
axios.interceptors.response.use(success => {
    if(success.status && success.status == 200){
        const data = success.data
        if (data.status !== 1) {
            Message.error({ showClose: true, message: data.msg})
            return false
        }
    }
    
    return success.data
}, error => {
    Message.error({ showClose: true, message: "服务器错误，请重试或联系管理员"})
    return
})

// 统一前缀请求
let baseUrl = 'http://localhost:8090'

export const postRequest = (url,params) =>{
    return axios({
        method: 'post',
        url: baseUrl + url,
        data: params
    })
}

export const getRequest = (url, params) => {
    return axios({
        method: 'get',
        url: baseUrl + url,
        params: params
    })
}