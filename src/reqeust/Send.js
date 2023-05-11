import axios from 'axios'

const DEV_BASE = 'https://api.dev.sporki.com'


const send = axios.create({
    baseURL: DEV_BASE,
    headers: {'accept': 'application/json'},
    timeout: 10000
})

send.interceptors.request.use(requestSuccess, requestError)
send.interceptors.response.use(responseSuccess, responseError)

function requestSuccess (config) {
    console.log('[Request] ' + config.url)
    return config
}

function requestError (error) {
    console.error(error)
    return Promise.reject(error)
}

function responseSuccess (response) {
    console.log('[Response] ' + response.config.url)
    console.log(response)
    if (response.data.code === 200) {
        return response.data.result
    } else {
        console.error('[Response Error]', response.data)
    }
}

function responseError (error) {
    console.error(error)
    return Promise.reject(error)
}

export default send