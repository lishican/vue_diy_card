const getters = {
  themeInfo1: state => state.app.themeInfo1,
  themeInfo2: state => state.app.themeInfo2,
  themeInfo3: state => state.app.themeInfo3,
  musicInfo: state => state.app.musicInfo,
  musicList: state => state.app.musicList,
  cropInfo: state => state.app.cropInfo,
  editInfo: state => state.app.editInfo,
  user: state => state.app.user,
  ridingMapList: state => state.app.user.ridingMapList,
  loginUserMapInfo: state => state.app.user.loginUserMapInfo,
  isShowShare: state => state.app.isShowShare,
  mapData: state => state.app.mapData,
  isShowRule: state => state.common.isShowRule,
  isLoading: state => state.common.isLoading
};

export default getters;
