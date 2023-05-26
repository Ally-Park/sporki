import Vue from 'vue'
import apis from '@/apis'


export const plugins = () => {
    Vue.prototype.$apis = apis
}
