/**
 * ajax请求配置
 */
import axios from 'axios'
import apiURL from './api.js'
//import Qs from 'qs'

// axios默认配置
axios.defaults.timeout = 10000;   // 超时时间
axios.defaults.baseURL = apiURL;  // 默认地址


export default axios;