
let mutations = {
  setFavoriteSports (state, payload) {
    state.favoriteSports = payload
  },
  setCurrentSports (state, payload) {
    state.currentSports = payload
  },
  setCurrentSportsDetail (state, payload) {
    state.currentSportsDetail = payload
  },
  setSelLiveSchedule (state, payload) {
    state.selLiveSchedule = payload
  },

  setSportsList (state, payload) {
    state.sportsList = payload
  },
  setTodayGameList (state, payload) {
    state.todayGameList = payload
  }
}

export default mutations