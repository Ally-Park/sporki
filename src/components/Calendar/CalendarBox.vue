
<template>
  <div class="calendar">
    <div class="year-box">
      <div class="year-month">
        <button class="previous-btn" @click="onClickChangeMonth('prev')"></button>
        <span>{{ selectedDate[0] }}년 {{ selectedDate[1] }}월</span>
        <button class="next-btn" @click="onClickChangeMonth('next')"></button>
        <button class="calendar-btn"></button>
      </div>
      <div class="btn-box">
        <button 
          :class="type"
          v-for="(btn, index) in buttons" 
          :key="index"
          @click="onClickButton(type)"
        >{{ btn }}
      </button>
      </div>
    </div>
    <div class="flick-wrapper">
      <Flicking ref="flick" :options="{ circular: false, autoResize: true }">
        <div v-for="(i, index) in scheduleArray"
          :key="index"
          class="flicking-panel date-box"
          :class="[`${calendarType}`, {'not-game': !i.isExistGame}, {'today' : i.day === '오늘'}]"
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
      // dateArray: [],
      selectedPannel: -1,
      currentGame: '',
      selectedDate: [], // [0]: year, [1]: month, [2]: day,
      scheduleArray: []
    }
  },
  props: {
    buttons: {
      types: Array,
      default: () => []
    },
    calendarType: {
      types: String,
      default: ''
    }
  },
  computed: {
    ...mapGetters([
      types.GET_CURRENT_SPORTS
    ]),
    type () {
      if (this.calendarType === 'schedule') {
        return 'league-btn'
      } else {
        // vod 
        return 'vod-btn'
      }
    }
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
      let gameSchedule = []
      this.scheduleArray = []
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
        const schedule = {
          month: month,
          day: this.selectedDate[2] === i && type === 'init' 
            ? '오늘' 
            : this.week[new Date(`${year}-${month}-${i}`).getDay()],
          date: i
        }
        if (Number(gameSchedule[0].date.split('-')[2]) === i) {
          schedule.isExistGame = true
          schedule.gameList = gameSchedule[0].gameList
          gameSchedule.shift()
        } else {
          schedule.isExistGame = false
        }
        tmpArray.push(schedule)
      }
      this.scheduleArray = tmpArray

      this.$nextTick(() => {
        this.movePannel(type)
      })
    },
    async movePannel (type) {
      let pannel = 0
      switch (type) {
        case 'init':
          pannel = this.selectedDate[2] -1
          this.$refs.flick.moveTo(pannel)
          this.$refs.flick.getPanel(this.selectedDate[2]-1).element.classList.add('selected')
          this.selectedPannel = pannel
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
      this.$emit('click', this.scheduleArray[this.selectedDate[2] - 1].gameList)
    },
    async onClickDate (index) {
      this.selectedDate[2] = index + 1
      const selEl = this.$refs.flick.getPanel(this.selectedPannel).element 
      const el = this.$refs.flick.getPanel(index).element
      selEl.classList.remove('selected')
      el.classList.add('selected')
      this.selectedPannel = index
      // console.log(this.scheduleArray[this.selectedDate[2] - 1].gameList)
      this.$emit('click', this.scheduleArray[this.selectedDate[2] - 1].gameList)
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
    },
    onClickButton (type) {
      if (type === 'league-btn') {
        // TODO: 리그 여러개인 경우 리그 팝업
      } else {
        // vod
        // TODO: emit
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
  &.today {
      color: #d5bda8;
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

.date-box.vod.selected::after {
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0.4;
  border-radius: 8px;
  background-image: linear-gradient(to top, #4d4543, #8b847f);
  border: none;
}
.flicking-camera {
  display: flex;
}
</style>

<style lang="scss" scoped>
.calendar {
  .year-box {
    display: flex;
    align-items: center;
    height: 70px;
    justify-content: space-between;
    .year-month {
      display: flex;
      align-items: center;
    }
    .btn-box {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 20px;
      font-weight: normal;
    }
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
      background: url('~@/images/svgs/arrow_left.svg') no-repeat;
      background-size: contain;
    }

    .next-btn {
      width: 60px;
      height: 60px;
      background: url('~@/images/svgs/arrow_right.svg') no-repeat;
      background-size: contain;
    }
    
    .calendar-btn {
      width: 70px;
      height: 70px;
      border-radius: 8px;
      border: solid 2px rgba(255, 255, 255, 0.1);
      background-color: #38393f; // TODO: image
    }

    .league-btn {
      width: 166px;
      height: 70px;
      border-radius: 8px;
      border: solid 2px rgba(255, 255, 255, 0.1);
      background-color: rgba(56, 57, 63, 0.2);
      font-size: 30px;
      font-weight: bold;
      // margin-left: 648px;
    }

    .vod-btn {
      width: 166px;
      height: 70px;
      font-size: 30px;
      font-weight: normal;
      border: solid 2px rgba(255, 255, 255, 0.1);
      background-color: #38393f;
      border-radius: 8px;
      color: rgba(255, 255, 255, 0.4);
      &:nth-child(2) {
        color: rgba(255, 255, 255, 1);
      }
    }
  }
  .flick-wrapper {
    height: 140px;
    margin-top: 30px;
    margin-bottom: 26px;
  }
}

</style>