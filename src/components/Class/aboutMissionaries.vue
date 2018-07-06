<template>
  <div>
    <v-content>
  <v-snackbar
    v-model="snackbar"
    color="light-green darken-2"
    :bottom="y === 'bottom'"
    :left="x === 'left'"
    :multi-line="mode === 'multi-line'"
    :right="x === 'right'"
    :timeout="timeout"
    :top="y === 'top'"
    :vertical="mode === 'vertical'"
  >
    {{ text }}
    <v-btn
      color="white"
      flat
      @click="snackbar = false"
    >
      Close
    </v-btn>
  </v-snackbar>

  <v-container grid-list-md class="ma-0 pa-0 ">
    <v-layout row>
      <v-flex xs12>
        <p class="toptext white--text text-xs-center text-sm-center text-md-center text-lg-center text-xl-center"> Who are we? </p>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-card-media src="https://static1.squarespace.com/static/5687c0c5d8af102bf3db6acb/t/57b312ce9de4bb75ceb656cd/1471353572501/" height="250px">
          </v-card-media>
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0"></h3>
              <div class="intro">We are young men and young women serving as missionaries here in Taiwan! Many of us are from America or countries where we were raised with English as our first language.<br><br>We teach free English to help provide people living here in Taiwan with an opportunity for learning and growth!<br><br>Selfless service and love is something we have learned from the teachings and example of Jesus Christ. As missionaries, we also love sharing about how Jesus Christ has blessed our lives, and how He can bless you and your family as well!<br><br>Interested in learning more about Jesus Christ?</div>
            </div>
          </v-card-title>
        </v-card>
      </v-flex>
    </v-layout>

    <!-- Meet with the Missionaries Sign-Up-->
    <v-layout row justify-center>
      <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
        <v-btn slot="activator" large class="white--text" color="green">Meet with the Missionaries</v-btn>
        <v-card>
          <v-toolbar dark color="light-green">
            <v-btn icon dark @click.native="dialog = false">
              <v-icon>close</v-icon>
            </v-btn>
            <v-toolbar-title>Meet with the Missionaries</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card tile color="light-green lighten-2" class="white--text">
            <v-card-title primary-title>
              <div class="headline">Schedule a time!</div>
              <v-spacer></v-spacer>
              <div>Submit a date and time to learn more about Jesus Christ!</div>
              <v-spacer></v-spacer>
            </v-card-title>
          </v-card>

          <!-- Time and Date Submission -->
          <v-container grid-list-md>
            <v-layout row wrap>
              <v-flex xs6 lg6>
                <v-menu
                  ref="menu1"
                  :close-on-content-click="false"
                  v-model="menu1"
                  :nudge-right="40"
                  lazy
                  transition="scale-transition"
                  offset-y
                  full-width
                  max-width="290px"
                  min-width="290px"
                >
                  <v-text-field
                    color="light-green"
                    slot="activator"
                    v-model="dateFormatted"
                    label="Date Available"
                    persistent-hint
                    prepend-icon="event"
                    readonly
                  ></v-text-field>
                  <v-date-picker color="light-green" v-model="date" locale="zh-cn"
                  > <v-spacer></v-spacer>
                    <v-btn flat color="light-green" @click="menu1 = false">Cancel</v-btn>
                    <v-btn flat color="light-green" @click="menu1 = false" >OK</v-btn>
                  </v-date-picker>
                </v-menu>
              </v-flex>
              <v-flex xs6 sm5>
                <v-dialog
                  ref="dialog"
                  v-model="modal2"
                  :return-value.sync="time"
                  persistent
                  lazy
                  full-width
                  width="290px"
                >
                  <v-text-field
                    slot="activator"
                    v-model="time"
                    label="Time of Lesson"
                    prepend-icon="access_time"
                    readonly
                  ></v-text-field>
                  <v-time-picker color="light-green" v-model="time" format="24hr" actions>
                    <v-spacer></v-spacer>
                    <v-btn flat color="light-green" @click="modal2 = false">Cancel</v-btn>
                    <v-btn flat color="light-green" @click="$refs.dialog.save(time)">OK</v-btn>
                  </v-time-picker>
                </v-dialog>
              </v-flex>
              <v-flex xs12>
                <v-btn @click.native="dialog = false"
                       v-if="!alert"
                       @click="saveAppointment"
                       color="green"
                       class="white--text">Submit</v-btn>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-dialog>
    </v-layout>
    <br>
  </v-container>
  </v-content>

  <!-- 耶穌基督後期聖徒教會 -->
  <v-footer class="light-green">
    <v-flex xs12 sm12 class="white--text light-green">
      <p class="footer-text text-xs-center text-sm-center text-md-center text-lg-center text-xl-center">耶穌基督後期聖徒教會</p>
    </v-flex>
  </v-footer>
  </div>
</template>

<script>
  import { db } from '../../main'
  export default {

    data () {
      return {
        alert: false,
        snackbar: false,
        y: 'top',
        x: null,
        mode: '',
        timeout: 12000,
        text: 'You successfully signed up to meet with the missionaries!',
        dialog: false,
        date: null,
        dateFormatted: null,
        menu1: false,
        time: null,
        modal2: false,
        userInfo: []
      }
    },
    computed: {
      user () {
        return this.$store.getters['user/user']
      }
    },
    watch: {
      date (val) {
        this.dateFormatted = this.formatDate(this.date)
      }
    },
    methods: {
      formatDate (date) {
        if (!date) return null
        const [year, month, day] = date.split('-')
        return `${month}/${day}/${year}`
      },
      parseDate (date) {
        if (!date) return null
        const [month, day, year] = date.split('/')
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
      },
      saveAppointment () {
        if (this.date !== null && this.time !== null) {
          db.collection('Users').doc(this.user.email).get().then(doc => { // retreive user location and save appointment info there
            if (doc.exists) {
              console.log('Working')
              this.userInfo = doc.data()
              console.log(this.userInfo.location)
              db.collection('QR').doc(this.userInfo.location).collection('appointments').doc(this.user.email).set({
                studentID: this.user.email,
                date: this.dateFormatted,
                time: this.time
              }, {merge: true})
              this.snackbar = true
            }
          })
        } else {
          console.log('No time or date selected')
        }
      }
    }
  }
</script>

<style scoped>

  .intro {
    font-size: 18px;
  }
  p.toptext {
    position: relative;
    margin: 0 auto;
    z-index: 1;
    font-size: 64px;
    text-shadow: 0px 8px 15px #000000;
  }
  p.description {
    position: relative;
    margin: 0 auto;
    z-index: 1;
    font-size: 32px;
    text-shadow: 0px 2px 5px #000000;
  }
  p.footer-text {
    font-size: 24px;
  }
  </style>
