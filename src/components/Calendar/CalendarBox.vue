
<template>
  <div class="calender">
    <div class="year-box">
      <button class="previous-btn" @click="onClickChangeMonth('prev')"></button>
      <span>{{ selectedDate[0] }}년 {{ selectedDate[1] }}월</span>
      <button class="next-btn" @click="onClickChangeMonth('next')" ></button>
      <button class="calender-btn"></button>
      <button class="league-btn">{{ 'KBO' }}</button>
    </div>
    <div class="flick-wrapper">
      <Flicking ref="flick" :options="{ circular: false, autoResize: true }">
        <div v-for="(i, index) in dateArray"
          :key="index"
          class="flicking-panel date-box"
          :class="{'not-game': !i.isExistGame}"
          @click="onClickDate(index)">
          <div class="day">{{ i.day }}</div>
          <div class="date">{{ i.date }}</div>
        </div>
      </Flicking>
    </div>
  </div>  
</template>

<script>
import * as types  from '@/store/storeTypes'
import { mapGetters } from 'vuex'
import {Flicking} from '@egjs/vue-flicking'

export default {
  components: {
    Flicking
  },
  data () {
    return {
      week: ['일', '월', '화', '수', '목', '금', '토'],
      day: 0,
      dateArray: [],
      selectedPannel: -1,
      currentGame: '',
      selectedDate: [], // [0]: year, [1]: month, [2]: day
    }
  },
  computed: {
    ...mapGetters([
      types.GET_CURRENT_SPORTS
    ])
  },
  async created () {
    this.currentGame = this[types.GET_CURRENT_SPORTS]
    const today = new Date()

    this.selectedDate[0] = today.getFullYear()
    this.selectedDate[1] = today.getMonth() + 1
    this.selectedDate[2] = today.getDate()
    await this.setPannel(this.selectedDate[0], this.selectedDate[1], 'init')
  },
  methods: {
    async setPannel (year, month, type) {
      let tmpArray = []
      this.dateArray = []
      let gameSchedule = []
      const response = await this.$apis.sports.getGameSchedule(this.currentGame, year, month)
      gameSchedule = response.gameSchedule

      for (let i = 0; i < gameSchedule.length; i++) {
        if (Number(gameSchedule[i].date.split('-')[0]) === this.selectedDate[0]) {
          // 같은 year

          if (Number(gameSchedule[i].date.split('-')[1]) !== month) {
            gameSchedule.shift()
            i--
            continue
          }
          break
        } else {
          // 다른 year
          gameSchedule.shift()
          i--
          continue
        }
      }
      const last = new Date(year, month, 0).getDate()
      for (let i = 1; i <= last; i++) {
        const dateObj = {
          month: month,
          day: this.selectedDate[2] === i && type === 'init' 
            ? '오늘' 
            : this.week[new Date(`${year}-${month}-${i}`).getDay()],
          date: i
        }
        if (Number(gameSchedule[0].date.split('-')[2]) === i) {
          dateObj.isExistGame = true
          gameSchedule.shift()
        } else {
          dateObj.isExistGame = false
        }
        tmpArray.push(dateObj)
      }
      this.dateArray = tmpArray
      console.log(this.dateArray)
      this.$nextTick(() => {
        this.movePannel(type)
      })
    },

    async movePannel (type) {
      let pannel = 0
      switch (type) {
        case 'init':
          pannel = this.selectedDate[2] -1
          if (!this.dateArray[pannel].isExistGame) {
            // 경기 없음
            for (let i = pannel; i < this.dateArray.length; i++) {
              if (this.dateArray[i].isExistGame) {
                this.$refs.flick.moveTo(i)
                const focus = this.$refs.flick.getPanel(i)
                focus.element.classList.add('selected')
                this.selectedPannel = i
                break
              }
            }
          } else {
            this.$refs.flick.moveTo(pannel)
            const focus = this.$refs.flick.getPanel(this.selectedDate[2]-1)
            focus.element.classList.add('selected')
            this.selectedPannel = pannel
          }
        break
        case 'prev':
          for (let i = this.dateArray.length - 1; i > 0; i--) {
            if (this.dateArray[i].isExistGame) {
              this.$refs.flick.moveTo(i)
              const focus = this.$refs.flick.getPanel(i)
              focus.element.classList.add('selected')
              this.selectedDate[2] = i + 1
              break
            }
          }
        break
        case 'next':
          for (let i = 0; i < this.dateArray.length; i++) {
            if (this.dateArray[i].isExistGame) {
              this.$refs.flick.moveTo(i)
              const focus = this.$refs.flick.getPanel(i)
              focus.element.classList.add('selected')
              this.selectedDate[2] = i + 1
              break
            }
          }
          break
        default:
          break
      }
      this.$emit('click', this.selectedDate)
    },
    async onClickDate (index) {
      this.selectedDate[2] = index + 1
      const selEl = this.$refs.flick.getPanel(this.selectedPannel).element 
      const el = this.$refs.flick.getPanel(index).element
      selEl.classList.remove('selected')
      el.classList.add('selected')
      this.selectedPannel = index
      this.$emit('click', this.selectedDate)
      try {
        await this.$refs.flick.moveTo(index)
      } catch (e) {
        // Animation is interrupted by user input. Error Handling (ex. loading)
        console.log('eeeeeee')
        console.error(e)
      }    
    },
    async onClickChangeMonth (type) {
      if (type === 'prev') {
        // 이전달
        this.selectedDate[1]--
        await this.setPannel(this.selectedDate[0], this.selectedDate[1], 'prev')
      } else {
        // 다음달
        this.selectedDate[1]++
        await this.setPannel(this.selectedDate[0], this.selectedDate[1], 'next')
      }
    }
  }
}
</script>

<style lang="scss">
.date-box {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 95px;
  height: 140px;
  align-items: center;
  justify-content: center;
  color: white;
  margin-right: 29px;
  .day {
    width: inherit;
    text-align: center;
    font-size: 30px;
    font-weight: bold;
    line-height: 1;
    margin-bottom: 20px;
  }
  .date {
    font-size: 30px;
    font-weight: bold;
    line-height: 1;
  }
}

.date-box.selected::after {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0.4;
  border-radius: 8px;
  border-style: solid;
  border-width: 3px;
  border-image-source: linear-gradient(6deg, #f5e0c0 -295%, #ddaa5f 374%);
  border-image-slice: 1;
  background-image: linear-gradient(to top, #4d4543, #8b847f), linear-gradient(6deg, #f5e0c0 -295%, #ddaa5f 374%);
  background-origin: border-box;
  background-clip: content-box, border-box;
  z-index: -1;
}
.date-box.not-game {
  color: gray !important;
}

.flicking-camera {
  display: flex;
}
</style>

<style lang="scss" scoped>
.calender {
  .year-box {
    display: flex;
    align-items: center;
    height: 70px;
    span {
      font-size: 50px;
      font-weight: bold;
      line-height: 1;
      letter-spacing: -1px;
      margin: 0 30px;
    }

    .previous-btn {
      width: 60px;
      height: 60px;
      background: url('~@/images/arrow_left.png') no-repeat;
      background-size: contain;
    }

    .next-btn {
      width: 60px;
      height: 60px;
      background: url('~@/images/arrow_right.png') no-repeat;
      background-size: contain;
    }
    
    .calender-btn {
      width: 70px;
      height: 70px;
      border-radius: 8px;
      border: solid 2px rgba(255, 255, 255, 0.1);
      background-color: #38393f;
    }

    .league-btn {
      width: 166px;
      height: 70px;
      border-radius: 8px;
      border: solid 2px rgba(255, 255, 255, 0.1);
      background-color: rgba(56, 57, 63, 0.2);
      font-size: 30px;
      font-weight: bold;
      margin-left: 648px;
    }
  }
  .flick-wrapper {
    height: 140px;
    margin-top: 30px;
    margin-bottom: 26px;
  }
}

</style>