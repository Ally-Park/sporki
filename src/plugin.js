import Vue from 'vue'
import GameManager from './js/GameManager'
import apis from '@/apis'
// import SportItems from './sports/SportItems'

export const plugins = () => {
    Vue.prototype.$gameManager = GameManager.getInstance()
    Vue.prototype.$apis = apis
}
