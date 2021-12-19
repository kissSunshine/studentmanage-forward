import axios from "axios";

const service = axios.create({
    // 响应类型，二进制流
    responseType: 'arraybuffer'
})

service.interceptors.response.use(res => {
    const headers = res.headers
    let contentType = headers['content-type']
    let reg = RegExp(/application\/octet-stream/)
    if(contentType.match(reg)){
        // 获取文件名
        let filename = headers['content-disposition'].split(';')[1].split('filename=')[1]
        // 转换，防止中文乱码
        filename = decodeURIComponent(filename)
        // 通过插件下载文件
        let fileDownload = require('js-file-download')
        fileDownload(res.data, filename, contentType)
    }
},error => {
    console.log(error)
})

let baseurl = 'http://localhost:8090'
export const downloadRequest=(url,params) => {
    return service({
        method: 'get',
        url: baseurl + url,
        data: params
    })
}