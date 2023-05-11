import send from '../reqeust/Send'

export default {
  /**
   * @description 종목코드 리스트
   */
  getSportsCode () {
    return send({
        url: '/display/v1/code/sports',
        method: 'get'
    })
  },
  /**
   * @description 리그 코드 리스트
   */
  getLeagueCode (sportsCode) {
    return send({
        url: `/display/v1/code/sports/${sportsCode}/league`,
        method: 'get'
    })
  },
  /**
   * @description 테마 리스트
   */
  getThemeList (sportsCode) {
    return send({
        url: `/display/v1/vod/${sportsCode}/theme`,
        method: 'get'
    })
  },
  /**
   * @description 테마별 컨텐츠 리스트
   */
  getThemeContentsList (sportsCode, vodDispalySeq) {
    return send({
        url: `/display/v1/vod/${sportsCode}/theme/${vodDispalySeq}`,
        method: 'get'
    })
  }
}