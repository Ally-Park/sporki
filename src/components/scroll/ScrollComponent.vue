<template>
  <div class="scroll-component" ref="scrollComponent">
    <div class="scroll-wrapper" ref="scrollWrapper">
      <slot class="scroll-item"></slot>
    </div>
  </div>
</template>

<script>
import IScroll from "iscroll";
import './iscroll_custom.scss'
// import '../js/utils/iscroll-probe'

export default {
  props: ["visible", "width", "height", "horizontal", "query", "prevent"],
  data() {
    return {
      io: null
    }
  },
  computed: {
    preventDefault() {
      return this.prevenhis.prevent || process.env.NODE_ENV === "development"
    }
  },
  beforeMount() {},
  mounted() {
    this.io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        // AF 에서는 isIntersecting 이 undefined 되어있음.
        if (entry.isIntersecting === undefined || entry.isIntersecting) {
          this.io.unobserve(entry.target)
          this.$emit("observer", entry.target)
        }
      })
    })
    if (this.scroll) {
      this.scroll.destroy()
      delete this.scroll
    }
    const isHorizontal = this.horizontal

    // iscroll pointer 이슈 참고 https://github.com/cubiq/iscroll/issues/1100#issuecomment-266672759

    this.scroll = new IScroll(this.$refs.scrollComponent, {
      probeType: 2,
      bounce: false,
      mouseWheel: false,
      scrollX: isHorizontal,
      scrollY: !isHorizontal,
      scrollbars:"custom",
      fadeScrollbars: true,
      interactiveScrollbars: false,
      click: false,
      tap: true,
      disableTouch: false,
      disableMouse: false,
      disablePointer: true,
      // preventDefault: this.preventDefault,
      preventDefault: true,
      preventDefaultException: {
        // default config, all form elements,
        // extended with a WebComponents Custom Element from the future
        tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT|X-WIDGET)$/,
        // and allow any element that has an accessKey (because we can)
        accessKey: /.+/
      }
    })

    this.scroll.on("scrollStart", (e) => {
      this.$emit("scrollStart", e)
    })
    this.scroll.on("scrollEnd", () => {
      if (this.scroll.y === 0) {
        this.$emit("scrollTop")
      } else if (this.scroll.y === this.scroll.maxScrollY) {
        this.$emit("scrollBottom")
      }
    })
    this.scrollUpdate()
  },
  updated () {},
  beforeDestroy () {
    if (this.query) {
      const items = document.querySelectorAll(this.query)
      items.forEach(el => {
        this.io.unobserve(el)
      })
    }
  },
  destroyed () {
    if (this.scroll) {
      this.scroll.destroy()
      delete this.scroll
    }
  },
  methods: {
    scrollUpdate () {
      // console.log('scrollUpdate')
      // 스크롤 wrapper size 갱신
      if (this.$refs.scrollWrapper) {
        const isHorizontal = this.horizontal
        if (isHorizontal) {
          this.$refs.scrollWrapper.style.width = "fit-content"
          this.$refs.scrollWrapper.style.height = "100%"
        } else {
          this.$refs.scrollWrapper.style.width = "100%"
          this.$refs.scrollWrapper.style.height = "fit-content"
        }
      }
      if (this.query) {
        // 기존 옵저버 삭제
        const items = document.querySelectorAll(this.query)
        items.forEach(el => {
          this.io.unobserve(el)
        })

        // 새 옵저버 등록
        items.forEach(el => {
          this.io.observe(el)
        })
      }
      this.scroll.refresh()
    },
    moveTo (el) {
      this.scroll.scrollToElement(el, 200)
    },
    moveAt (x, y) {
      this.scroll.scrollTo(x, y, 200)
    }
  }
}
</script>

<style lang="scss" scoped>
.scroll-component {
  position: relative;
  /* border: 1px solid orange; */
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.scroll-wrapper {
  // overflow: auto;
}
</style>
