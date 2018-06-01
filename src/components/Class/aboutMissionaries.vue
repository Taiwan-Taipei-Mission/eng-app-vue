<template>
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
            slot="activator"
            v-model="dateFormatted"
            label="Date Available"
            persistent-hint
            prepend-icon="event"
            readonly
          ></v-text-field>
          <v-date-picker v-model="date" locale="zh-cn"
          > <v-spacer></v-spacer>
            <v-btn flat color="primary" @click="menu1 = false">Cancel</v-btn>
            <v-btn flat color="primary" @click="menu1 = false" >OK</v-btn>
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
          <v-time-picker v-model="time" format="24hr" actions>
            <v-spacer></v-spacer>
            <v-btn flat color="primary" @click="modal2 = false">Cancel</v-btn>
            <v-btn flat color="primary" @click="$refs.dialog.save(time)">OK</v-btn>
          </v-time-picker>
        </v-dialog>
      </v-flex>
      <v-flex xs12>
        <v-btn @click="saveAppointment">Submit</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import { db } from '../../main'
  export default {

    data () {
      return {
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
            }
          })
        } else {
          console.log('No time or date selected')
        }
      }
    }
  }
</script>
