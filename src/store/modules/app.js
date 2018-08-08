import { doJavaPost } from "../api";
import { themeInfo1, themeInfo2, themeInfo3 } from "../../themeConfig";

const state = {
  musicList: [
    {
      name: "狂热",
      img: require("../../assets/one.png"),
      value:
        "http://ofvbasfrz.bkt.clouddn.com/478fba32-0830-4b7b-b301-a1eacffdda84"
    },
    {
      name: "轻音乐",
      img: require("../../assets/two.png"),
      value: "http://ofvbasfrz.bkt.clouddn.com/qxm/轻音乐1_1.mp3"
    },
    {
      name: "轻快",
      img: require("../../assets/three.png"),
      value: "http://ofvbasfrz.bkt.clouddn.com/qxmusic1.0.0/three.mp3"
    }
  ],
  themeInfo1: themeInfo1,
  themeInfo2: themeInfo2,
  themeInfo3: themeInfo3,
  isShowShare: {
    show: false,
    templateId: "",
    name: ""
  },
  editInfo: {
    show: false,
    currentText: "",
    theme: "",
    key: ""
  },
  cropInfo: {
    show: false,
    currentText: "",
    theme: "",
    rawImg: "",
    key: ""
  },
  musicInfo: {
    show: false,
    currentText: require("../../assets/one.mp3"),
    theme: "",
    key: ""
  },
  mapData: {
    citys: [],
    lines: [],
    distant: 0
  },
  user: {}
};
const actions = {
  fetchMap({ commit }, param) {
    return doJavaPost("/getMapDistance", param);
  },
  saveShare({ commit }, param) {
    return doJavaPost("/saveShare", param);
  },
  async initUser({ commit }, param) {
    let userInfo = {
      openId: document.getElementById("openId").value,
      name: document.getElementById("nickName").value,
      img: document.getElementById("headImg").value
    };
    let data = await doJavaPost("/saveUser", userInfo);
    commit("updateUser", {
      ridingMapList: data.ridingMapList,
      loginUserMapInfo: data.loginUserMapInfo,
      user: data.user
    });

    return data;
  },
  async fetchPageInfo({ commit }, param) {
    let data = await doJavaPost("/getPages", param);
    return data;
  },

  async addPopularity({ commit, dispatch }, param) {
    let data = await doJavaPost("/addPopularity", param);
    if (data.code == 200) {
      dispatch("initUser");
    }
    return data;
  },
  async delCard({ commit, dispatch }, param) {
    let data = await doJavaPost("/del", param);

    if (data.code == 200) {
      let userInfo = {
        openId: document.getElementById("openId").value,
        name: document.getElementById("nickName").value,
        img: document.getElementById("headImg").value
      };
      dispatch("initUser", userInfo);
    }
    return data;
  },

  showEdit({ commit }, value) {
    commit("showEdit", value);
  },
  saveEditText({ commit }, value) {
    commit("saveEditText", value);
  },
  hideEditText({ commit }, value) {
    commit("hideEditText", value);
  },
  showMusic({ commit }, value) {
    commit("showMusic", value);
  },
  saveMusic({ commit }, value) {
    commit("saveMusic", value);
  },
  hideMusic({ commit }) {
    commit("hideMusic");
  },
  showCrop({ commit }, value) {
    commit("showCrop", value);
  },
  saveCrop({ commit }, value) {
    commit("saveCrop", value);
  },
  hideCrop({ commit }) {
    commit("hideCrop");
  },
  hideShare({ commit, dispatch }) {
    commit("hideShare");
    dispatch("initUser");
  },
  async saveThemeInfo({ commit }, param) {
    let responseData = await doJavaPost("/save", param);

    return responseData;
  }
};

const mutations = {
  showShare(state, value) {
    state.isShowShare.show = true;
    state.isShowShare.templateId = value.templateId;
    state.isShowShare.name = value.name;
  },
  initTheme(state) {
    state.themeInfo1 = themeInfo1;
    state.themeInfo2 = themeInfo2;
    state.themeInfo3 = themeInfo3;
  },
  hideShare(state) {
    state.isShowShare.show = false;
    state.isShowShare.templateId = "";
  },
  // 更新themeInfo
  updateThemeInfo(state, value) {
    state[value.themeType] = value.themeInfo;
    state.musicInfo.currentText = value.themeInfo.music;
  },
  updateMapData(state, value) {
    state.mapData = value;
  },
  updateUser(state, value) {
    state.user = value;
  },
  showCrop(state, value) {
    console.log(value);
    state.cropInfo.show = true;
    state.cropInfo.currentText = state[value.theme][value.key];
    state.cropInfo.rawImg = value.rawImg;
    state.cropInfo.theme = value.theme;
    state.cropInfo.key = value.key;
  },
  saveCrop(state, value) {
    state.cropInfo.show = false;
    state[state.cropInfo.theme][state.cropInfo.key] = value.text;
  },
  hideCrop(state) {
    state.cropInfo.show = false;
  },
  showMusic(state, value) {
    console.log(value);
    state.musicInfo.show = value.show;
    state.musicInfo.currentText = state[value.theme][value.key];
    state.musicInfo.theme = value.theme;
    state.musicInfo.key = value.key;
  },
  saveMusic(state, value) {
    console.log(value);
    state.musicInfo.currentText = value.text;
    state[state.musicInfo.theme][state.musicInfo.key] = value.text;
  },
  saveMusic2(state, value) {
    console.log(value);
    state.musicInfo.currentText = value.text;
    state[state.musicInfo.theme][state.musicInfo.key] = value.text;
  },
  hideMusic(state) {
    state.musicInfo.show = false;
  },
  hideEditText(state) {
    state.editInfo.show = false;
  },
  saveEditText(state, value) {
    state.editInfo.show = false;
    state[state.editInfo.theme][state.editInfo.key] = value.text;
  },
  showEdit(state, value) {
    state.editInfo.show = true;
    state.editInfo.currentText = state[value.theme][value.key];
    state.editInfo.theme = value.theme;
    state.editInfo.key = value.key;
  },
  changeThemeInfo(state, value) {
    state.themeInfo[value.key] = value.value;
  }
};

export default {
  state,
  actions,
  mutations
};
