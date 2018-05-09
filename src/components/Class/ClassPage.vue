<template>
<div>
  <template v-if="loading" >
    <v-container fill-height>
      <v-layout row justify-center align-center fill-height>
        <v-progress-circular indeterminate :size="50" :width="5" color="green"></v-progress-circular>
      </v-layout>
    </v-container>
  </template>
  <template v-if="pageLoad !== false">
  <v-layout row wrap>
    <!--<v-btn color="primary" @click="alert = !alert">Toggle</v-btn>-->
    <v-flex xs6>
    <v-avatar  :size="90">
    <img :src="QR.teacherPic">
    </v-avatar>
      <!--<p> {{ teacherName }}    {{ classLocation }}</p>--> <!--Being used to test if Vuex is working-->
      <p class="teacher">{{ QR.teacherName }}</p>
      <p>{{ QR.classLevel }}</p> <!---->
    </v-flex>
    <v-flex>
      <v-spacer></v-spacer>
    </v-flex>
    <v-flex xs6 class="mt-5">
      <h2 class="className">{{ QR.classLocation }}</h2>
      <h3 class="classTime">{{ QR.classTime }}</h3>
    </v-flex>
    <v-flex xs12 class="text-xs-center">
      <v-btn round class="check-in" large route to="home" color="secondary">Check in to class</v-btn>
    </v-flex>
    <v-flex xs12>
      <h2 class="text-xs-center">Homework</h2>
      <v-container
        fluid
        style="min-height: 0;"
        grid-list-lg
        id="homeworkBox"
        v-for="(homework, idx) in homework" :key="idx"
      >
      <div>
        <v-card>
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">{{homework.homeworkDate}}</h3> <!--TODO We need to fix it so that the homework assignments are ordered by date. Newest first-->
              <div>{{homework.description}}</div>
            </div>
          </v-card-title>
          <v-card-actions>
            <v-btn flat color="orange" :href="homework.homeworkURL">Read</v-btn>
          </v-card-actions>
        </v-card>
      </div>
      </v-container>
      <v-btn v-on:click="test">Click dis</v-btn>
    </v-flex>
    <!--<v-alert
      :value="alert"
      type="error"
      transition="scale-transition"
    >You have not checked into a class yet</v-alert>-->
  </v-layout>
  </template>
</div>
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
        test1: [],
        loading: true,
        alert: false,
        pageLoad: false
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
            let originalString = userInfo.location
            const splitString = originalString.split(' ') // TODO FINISH WRITING THIS CODE split location to search firebase
            console.log(splitString + 'This is the classPage')
            db.collection('QR').doc(userInfo.location).get().then(doc => {
              if (doc.exists) {
                var classDetails = doc.data()
                this.QR = classDetails
                db.collection('QR').doc(userInfo.location).collection('homework').get().then((snap) => { /* Must be converted to objects */
                  const items = snap.docs.reduce((res, item) => (
                    {...res, [item.id]: item.data()}),
                  {})
                  this.homework = items
                  this.pageLoad = true
                  this.loading = false
                })
              }
            })
          } else {
            // doc.data() will be undefined in this case
            console.log('No such document!')
            this.alert = true
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

<style>
  #homeworkBox {
    padding-top: 4px;
    padding-bottom: 4px;
    padding-left: 6px;
    padding-right: 6px;
  },
  #Absolute-Center {
    margin: auto;
    position: absolute;
    top: 0; left: 0; bottom: 0; right: 0;
  }
</style>
<!--<style scoped>
  .check-in {
    margin-top: 10px;
  }
  p {
    margin: auto 0;
    text-align: center;
    margin-right: 60px;
    margin-left: 20px;
  }
  img {
    min-width: 80px;
    min-height: 40px;
    margin-top: 40px;
    margin-left: 60px;
  }
  .teacher {
    margin-top: 20px;
    margin-right: 60px;
    margin-left: 20px;
  }
  .className {
    text-align: center;
    font-size: 30px;
    margin-right: 13px;
  }
  .classTime {
    text-align: center;
    font-size: 18px;
    margin-right: 13px;
  }
</style>-->
