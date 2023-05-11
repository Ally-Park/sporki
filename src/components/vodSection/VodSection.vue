<template>
  <div class="vod-section">
    <div class="vod-type">
      <button @click="onClick('all')">전체<span v-if="!showVodTypeDetail">(최신순)</span></button>
      <button @click="onClick('date')">날짜별</button>
      <button @click="onClick('theme')">테마별</button>
    </div>
    <div class="vod-type-detail" v-if="showVodTypeDetail">
      <CalendarBox @click="onClickDate"></CalendarBox>
      <div>날짜 + 최신순</div>
    </div>
    <div class="vod-card-area">
      <Scroll :horizontal="true" ref="scroll">
        <div class="vod-card-container">
          <VodCard v-for="(i, index) in this.vodList" :key="index" :vod="i"></VodCard>
        </div>
      </Scroll>
    </div>
  </div>
</template>

<script>
import Scroll from '@/components/scroll/ScrollComponent.vue'
import VodCard from './VodCard.vue';
import CalendarBox from '../Calendar/CalendarBox.vue';
export default {
  props: {
    vodList: {
      types: Array,
      default: () => []
    }
  },
  components: {
    Scroll,
    VodCard,
    CalendarBox
  },
  watch: {
    vodList() {
      this.$nextTick(() =>{
        const el = document.getElementsByClassName('vod-card-container')[0]?.children[0]
        if (el) {
          this.$refs.scroll.moveTo(el)
          this.$refs.scroll.scrollUpdate()
        }
      })
    }
  },
  data () {
    return {
      showVodTypeDetail: false
    }
  },
  created () {
    console.log('[VodSection.vue] created')
  },
  mounted () {
    this.$nextTick(() =>{
      this.$refs.scroll.scrollUpdate()
    })
  },
  methods: {
    onClick (type) {
      switch (type) {
        case 'all':
          this.showVodTypeDetail = false
          break
        case 'date':
          this.showVodTypeDetail = true
          break
        case 'theme':
          this.showVodTypeDetail = true
          break
        default:
          break
      }
      this.$emit('click', 'typeDetail' ,this.showVodTypeDetail)
    },
    onClickAllBtn () {
      this.showVodType = true
    },
    onClickDateBtn () {
      this.showVodType = false
    },
    onClickThemeBtn () {
      this.showVodType = false
    },
    onClickDate (dateArray) {
      console.log('onClick=====>', dateArray)
    }
  }
}
</script>

<style lang="scss" scoped>
.vod-section {
  .vod-type {
    button {
      font-size: 30px;
      color: white;
      margin-right: 20px;
    }
    button:active {
      border: 1px solid darkcyan  
    }
  }
  .vod-type-detail {
    .type-detailbtn-container {
      button {
        color: white;
        font-size: 30px;
        margin-right: 20px;
      }
    }

  }
  .vod-card-area {
    display: flex;
    .vod-card-container {
      display: flex;
    }
  }
  
}
</style>