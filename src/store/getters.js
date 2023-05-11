let getters = {
  getFavoriteSports (state) {
    return state.favoriteSports
  },
  getCurrentSportsDetail (state) {
    return state.currentSportsDetail
  },
  getCurrentSports (state) {
    return state.currentSports
  },
  getSportsList (state) {
    return state.sportsList
  },
  getTodayGameList (state) {
    return state.todayGameList
  }
}

export default getters