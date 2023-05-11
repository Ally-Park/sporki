import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import { plugins } from './plugin'
Vue.config.devtools = true;
Vue.config.productionTip = false
Vue.use(plugins)
Vue.directive('lazyload', {
  inserted(el) {
    function imageLoad(targetElement) {
      const imgElement = targetElement
      imgElement.setAttribute('src', imgElement.getAttribute('data-lazy'))
      imgElement.onload = function() {
        imgElement.removeAttribute('data-lazy')
      }
    }

    function callIntersectionApi() {
      const options = { 
        root: null, 
        threshold : 0.00001, 
        rootMargin: '0px' 
      };
      
      const lazyLoadCallback = (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) { 
            // 감지대상이 교차영역에 진입 할 경우
            imageLoad(entry.target)
            observer.unobserve(entry.target)
          }
        })
      }
      const lazyLoadingIO = new IntersectionObserver(lazyLoadCallback, options)
      lazyLoadingIO.observe(el)
    }

    // 지원되는 브라우저 확인
    // imageLoad(el)
    window.IntersectionObserver ? callIntersectionApi() : imageLoad(el)
  },
  
})

window.addEventListener('touchstart', function() {
  // some logic
}, {passive:false}); 

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
