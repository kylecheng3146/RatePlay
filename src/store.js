import Vue from 'vue'
import Vuex from 'vuex'
import { http } from './http/http';
Vue.use(Vuex)

export default new Vuex.Store({
  
  state: {
     data: [],
     wire_data: [],
     machine_data: [],
     userID : '',
     authToken : '',
     wire_no: '',
     machine_code: '',
     stove_code: '',
  },
  actions: {
      
    //取得
    GetSendJobData(context, data) {
        return http.getSendJobData(data);
    },

    //輸入工單資料
    AddworkData(context, data){
        return http.addworkData(data);
    },

    //線材批號綁定
    BindWire(context, data) {
        return http.getBindWire(data);
    },

    AUTHENTICATE(context,data){
        return http.authenticate(data);
    },

    //機台綁定
    BindMachine(context, data){
        return http.getBindMachine(data);
    }
  },
  mutations: {
    //設定使用者資料
    SET_USER_INFO: (state, {
      data
    }) => {
      state.userID = data.userId,
      state.authToken = data.salt
    },

    //設定線材批號資料
    SET_WIRE_INFO: (state, {
      data
    }) => {
      state.wire_data = data
      state.wire_no = data.品號
    },

    //設定機台號碼資料
    SET_MACHINE_INFO: (state, {
      data
    }) => {
      state.machine_data = data
      state.machine_code = data.機台號碼
    },

    //設定爐號資料
    SET_STOVE_CODE: (state, {
      data
    }) => {
      state.stove_code = data
    },
  },
  getters: {
  },  
  modules: {
    
  }
})
