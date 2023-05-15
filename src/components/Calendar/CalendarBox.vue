
<template>
  <div class="calender">
    <div class="year-box">
      <button @click="onClickChangeMonth('prev')">&lt;</button>
      <span>{{ selectedDate[0] }}년 {{ selectedDate[1] }}월</span>
      <button @click="onClickChangeMonth('next')" >&gt;</button>
    </div>
    <div class="wrapper">
      <Flicking ref="flick"  :options="{ circular: false, autoResize: true }">
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
  display: flex;
  flex-direction: column;
  width: 50px;
  height: 50px;
  align-items: center;
  justify-content: center;
  color: white;
  .day {
    width: inherit;
    text-align: center;
  }
}

.date-box.selected {
  border: 2px solid salmon;
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
    justify-content: center;
    button {
      font-size: 30px;
      color: white;
    }
  }
}

</style>