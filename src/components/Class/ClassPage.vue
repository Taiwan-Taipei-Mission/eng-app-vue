<template>
  <v-layout row wrap>
    <v-flex xs6>
    <v-avatar  :size="80">
    <img :src="QR.teacherPic"> <!--TODO Add dynamically changing photos for teachers-->
    </v-avatar>
    <!--<p> {{ teacherName }}    {{ classLocation }}</p>--> <!--Being used to test if Vuex is working-->
      <p>{{ QR.teacherName }}  {{ QR.classLevel }}</p> <!--TODO properly style these elements with better alignment-->
      </v-flex>
    <v-flex>
      <v-spacer></v-spacer>
    </v-flex>
    <v-flex xs6 class="mt-5">
      <h2>{{ QR.classLocation }}</h2>
      <h3>{{ QR.classTime }}</h3>
    </v-flex>
    <v-flex xs12 class="text-xs-center">
      <v-btn round large route to="home" color="secondary">Check in to class</v-btn>
    </v-flex>
    <v-flex xs12>
      <h2 class="text-xs-center">Homework</h2>
      <div>
      <v-card v-for="(homework, idx) in homework" :key="idx">
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">{{homework.homeworkDate}}</h3> <!--TODO We need to fix it so that the homework assignments are ordered by date. Newest first-->
            <div>{{homework.description}}</div>
          </div>
        </v-card-title>
        <v-card-actions>
          <v-btn flat color="orange" :href="homework.homeworkURL">Read</v-btn>
        </v-card-actions>
        <hr> <!--TODO Swap this out for a good looking spacer, or leave it.-->
      </v-card>
      </div>
      <v-btn v-on:click="test">Click dis</v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
  import { db } from '../../main'

  export default {

    data () {
      return {
        paused: false,
        content: '',
        QR: [],
        homework: [],
        classLocation: [],
        test1: []
      }
    },
    created () {
      this.firestore2()
    },
    firestore () {
      return {
        classLocation: db.collection('Users').doc(this.user.email)
      }
    },
    methods: {
      test () {
        console.log(this.homework)
      },
      firestore2 () {
        db.collection('Users').doc(this.user.email).get().then(doc => {
          if (doc.exists) {
            var userInfo = doc.data()
            console.log(userInfo.location)
            db.collection('QR').doc(userInfo.location).get().then(doc => {
              if (doc.exists) {
                var classDetails = doc.data()
                this.QR = classDetails
                db.collection('QR').doc(userInfo.location).collection('homework').get().then((snap) => { /* Must be converted to objects */
                  const items = snap.docs.reduce((res, item) => (
                    {...res, [item.id]: item.data()}),
                  {})
                  this.homework = items
                })
              }
            })
          } else {
            // doc.data() will be undefined in this case
            console.log('No such document!')
          }
        })
      }
    },
    computed: {
      user () {
        return this.$store.getters['user/user']
      }
    }
  }
</script>
