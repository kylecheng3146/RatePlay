/* eslint-disable no-console */
import axios from "axios";
import { authHeader } from './auth-header.js';

axios.defaults.timeout = 10000;
axios.defaults.baseURL = "https://localhost:5001/"; // 域名
// axios.defaults.baseURL = "http://211.22.242.13:8164/"; // 域名

// http request 欄截
axios.interceptors.request.use(
    config => {
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// 異常處理
axios.interceptors.response.use(
    response => {
          // 返回狀態200代表成功.否則丟出錯誤
          if (
            response.status === 200 ||
            response.status === 201 ||
            response.status === 204
          ) {
            return Promise.resolve(response);
          } else {
            return Promise.reject(response);
          }
      },
    err => {
        if (err && err.response) {
            switch (err.response.status) {
                case 404:
                    err.response.statusText = "查無相關資料，請重新確認。";
                    console.log("查無相關資料，請重新確認。");
                    break;
                case 500:
                    err.response.statusText = "伺服器出錯";
                    console.log("伺服器出錯");
                    break;
                case 503:
                    err.response.statusText = "服務失效";
                    console.log("服務失效");
                    break;
                default:
                    err.response.statusText = `連接錯誤${err.response.status}`;
                    console.log(`連接錯誤${err.response.status}`);
            }
        } else {
            // err.response.statusText = "連接到伺服器失敗。";
            console.log("連接到伺服器失敗。");
        }
        return Promise.resolve(err.response);
    }
);

export function get(url, params = {}) {
    return new Promise((resolve, reject) => {
        axios
            .get(url, {
                params: params,
                headers: authHeader() 
            })
            .then(response => {
                resolve(response);
            })
            .catch(err => {
                reject(err);
            });
    });
}

export function post(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios
          .post(url, data)
          .then(response => {
            resolve(response);
          })
          .catch(err => {
            reject(err);
          });
    });
}

export function remove(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.delete(url, data).then(
            response => {
                resolve(response);
            },
            err => {
                reject(err);
            }
        );
    });
}

export function put(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.put(url, data).then(
            response => {
                resolve(response);
            },
            err => {
                reject(err);
            }
        );
    });
}
// 將封裝的方法打包起來
export const http = {
         get: function(paramObj) {
           return get("", paramObj);
         },

         //驗證登入 jwt token
         authenticate: function(paramObj) {
           return post("api/login/authenticate", paramObj);
         },

         //傳送工單與機器號碼查詢寫入資料
         addworkData: function(paramObj) {
           return post("api/work/AddData", paramObj);
         },

         // 取得派工單
         getSendJobData: function(paramObj) {
           return get("api/SendJob/GetBySendJob", paramObj);
         },

         // 取得要綁定的線材批號
         getBindWire: function(paramObj) {
           return get("api/wire/GetByWire", paramObj);
         },

         //取得匯率
         getExrate: function(paramObj) {
           return get("api/rate/GetByRateName", paramObj);
         },

         // 取得活動資訊
         getActivity: function(paramObj) {
           return get("api/activity", paramObj);
         },

         // 取得要綁定的機台號碼
         getBindMachine: function(paramObj) {
           return get("api/machine/GetByMachineCode", paramObj);
         },

         // 取得國家
         getCountries: function(paramObj) {
           return get("api/countries", paramObj);
         },

         // 取得匯率歷史紀錄
         getHistoryRate: function (paramObj) {
             return get("api/rate/GetHistoryRate", paramObj);
         },

         put: function(paramObj) {
           return put("api/users", paramObj);
         },
         delete: function(paramObj) {
           return remove("api/users", paramObj);
         }
       };
