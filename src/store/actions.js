import * as types from './storeTypes'
import $apis from '@/apis'

let actions = {
  async setSportsDetail (context, payload) {
    console.log(payload)
    const response = await $apis.sports.getGameSchedule(payload)
    context.commit(types.SET_CURRENT_SPORTS_DETAIL, response)
  },
  async setSelLiveSchedule (context, payload) {
    const response = await $apis.sports.getLiveSchedule(payload)
    context.commit(types.SET_SEL_LIVE_SCHEDULE, response)
  },

  async setAllThemeVideo (context, payload) {
    console.log(payload)
    const response = await $apis.display.getThemeList(payload)
    console.log(response)

    let tmp = []
    for (let i of response.vodThemeList) {
        let res = await $apis.display.getThemeContentsList(payload, i.seq)
        if (res.vodThemeContents.content.length !== 0) {
            console.log(res.vodThemeContents.content)
            tmp = tmp.concat(res.vodThemeContents.content)
        }
    }

    console.log(tmp)

    for (let i of tmp) {
        console.log(i.registerDate.split(' ')[0])
    }
    //
  },

  async reqSportCode (conext) {
    const response = await $apis.display.getSportsCode()
    console.log(response)
    conext.commit(types.SET_SPORTS_CODE, response)
  }
}

export default actions