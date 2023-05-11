import store from "@/store";
import $apis from "@/apis";
import * as types  from '@/store/storeTypes'

export default class SportItems {
  constructor () {
  }

  static async getSports () {
    let sportsArray = []
    const spCode = [2, 5, 7, 9] 
    const response = await $apis.display.getSportsCode()
    console.log(response)
    for (let sport of response.sportsCodeList) {
      if (spCode.indexOf(sport.code) !== -1) {
        const league = await $apis.display.getLeagueCode(sport.sportsCodeValue)
        sport.league = league.leagueCodeList
        sportsArray.push(sport)
      }
    }
    store.commit(types.SET_SPORTS_LIST, sportsArray)
    return sportsArray
  }

  static async getTodayGame (sport) {
    const response = await $apis.sports.getLiveSchedule(sport)
    store.commit(types.SET_TODAY_GAME_LIST, response.liveScheduleGameList)
    console.log(response)
    return response.liveScheduleGameList
  }

  static async getTodayGames (sportsList) {
    const todayGameList = []
    for (let sport of sportsList) {
      const game = {}
      const response = await $apis.sports.getLiveSchedule(sport)
      console.log(response)
      // TODO: broadcast type check (생중계만 제공)
      if (sport === 'kbaseball') {
        // 야구: KBO
        let kbo = []
        for (let i of response.liveScheduleGameList) {
          if (i.leagueCodeValue === 'kbo') {
            kbo.push(i)
          }
        }
        game[sport] = { 'kbo' : kbo }
      } else if (sport === 'wfootball') {
        // 해외 축구: 리그1
        let ligue1 = []
        for (let i of response.liveScheduleGameList) {
          if (i.leagueCodeValue === 'ligue1') {
            ligue1.push(i)
          }
        }
        game[sport] = { 'ligue1' : ligue1 }
      } else if (sport === 'volleyball') {
        // 배구: 남자배구, 여자배구
        let kovo = []
        let wkovo = []
        for (let i of response.liveScheduleGameList) {
          if (i.leagueCodeValue === 'kovo') {
            kovo.push(i)
          } else if (i.leagueCodeValue === 'wkovo') {
            wkovo.push(i)
          }
        }
        game[sport] = { 'kovo': kovo, 'wkovo': wkovo }
      } else if (sport === 'billiards') {
        // 당구: PBA/LPBA, PBA팀리그
        let pbatour = []
        let pbateam = []
        for (let i of response.liveScheduleGameList) {
          if (i.leagueCodeValue === 'pbatour') {
            pbatour.push(i)
          } else if (i.leagueCodeValue === 'pbateam') {
            pbateam.push(i)
          }
        }
        game[sport] = { 'pbatour': pbatour, 'pbateam': pbateam }
      }
      todayGameList.push(game)
    }
    store.commit(types.SET_TODAY_GAME_LIST, todayGameList)
    return todayGameList
  }
}