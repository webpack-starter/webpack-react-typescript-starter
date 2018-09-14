/* global window */
import axios from 'axios'
import qs from 'qs'
import jsonp from 'jsonp';
import { CORS } from './config'

const timeout = 30000;

const fetch = (url, options) => {
  let {
    method = 'get',
    data,
    fetchType,
  } = options

  if (fetchType === 'JSONP') {
    return new Promise((resolve, reject) => {
      jsonp(url, {
        param: `${qs.stringify(data)}&callback`,
        name: `jsonp_${new Date().getTime()}`,
        timeout,
      }, (error, result) => {
        if (error) {
          reject(error)
        }
        resolve({ statusText: 'OK', status: 200, data: result })
      })
    })
  }

  
  /*
    // 添加请求拦截器
    axios.interceptors.request.use(function (config) {
      // 在发送请求之前做些什么
      return config;
    }, function (error) {
      // 对请求错误做些什么
      return Promise.reject(error);
    });
  
    // 添加响应拦截器
    axios.interceptors.response.use(function (response) {
      // 对响应数据做点什么
      return response;
    }, function (error) {
      // 对响应错误做点什么
      return Promise.reject(error);
    });
  */

  axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
  switch (method.toLowerCase()) {
    case 'get':
      return axios.get(url, {
        params: data,
        timeout,
      })
    case 'delete':
      return axios.delete(url, {
        data: data,
      })
    case 'post':
      const opts = {
        url,
        method: 'POST',
        headers: {
          'content-type': 'application/json;charset=UTF-8',
          ...(options.headers || {}),
        },
        data: data,
      };
      return axios(opts);
    case 'put':
      return axios.put(url, data)
    case 'patch':
      return axios.patch(url, data)
    default:
      return axios({
        timeout,
        ...options,
      })
  }
}

export default function request(url, options = {}) {
  if (url && url.indexOf('//') > -1) {
    const origin = `${url.split('//')[0]}//${url.split('//')[1].split('/')[0]}`
    if (window.location.origin !== origin) {
      if (CORS && CORS.indexOf(origin) > -1) {
        options.fetchType = 'CORS'
      } else {
        options.fetchType = 'JSONP'
      }
    }
  }

  return fetch(url, options).then((response) => {
    let { statusText, status, data } = response;
    return Promise.resolve({ //eslint-disable-line
      statusText,
      status,
      data,
    })
  }).catch((error) => {
    let status;
    let statusText;
    let { response } = error
    if (response && response instanceof Object) {
      const { data } = response
      status = response.status
      statusText = data.message || response.statusText;
    } else {
      status = 600
      statusText = error.message || 'Network Error'
    }
    return Promise.reject({ status, statusText })
  })
}