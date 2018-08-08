// import { doJavaPost } from "../api";

const state = {
  isShowRule: false,
  isLoading:{
    show:false,
    text:'数据记载中'
  }
};

// actions
const actions = {};
// mutations
const mutations = {
  showLoading(state,value){
      state.isLoading.show = true
      state.isLoading.text = value||'数据加载中'
  },
  hideLoading(){
    state.isLoading = {
      show:false,
      text:'数据记载中'
    }
  },
  toggleRule(state) {
    state.isShowRule = !state.isShowRule;
  }
};

// 模块导出
export default {
  state,
  actions,
  mutations
};
