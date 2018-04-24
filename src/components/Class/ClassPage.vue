<template>
  <v-layout row wrap>
    <v-flex xs6>
      <div>
        <article v-for="(location, idx) in locations" :key="idx">
          <img :src="location.images">
          <h1>{{ location.name }}</h1>
        </article>
      </div>
    <v-avatar  :size="80">
    <img src="../../assets/photo_icon.png"/>
    </v-avatar>
    <p> {{ teacherName }}    {{ classLocation }}</p>
      </v-flex>
    <v-flex>
      <v-spacer></v-spacer>
    </v-flex>
    <v-flex xs6 class="mt-5">
      <h2>Xinzhuang</h2>
      <h3>Wednesday 7:00 PM</h3>
    </v-flex>
    <v-flex xs12 class="text-xs-center">
      <v-btn large route to="home" color="secondary">Check in to class</v-btn>
    </v-flex>
    <v-flex xs12>
      <h2 class="text-xs-center">Homework</h2>
      <v-card>
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">Service 4/12</h3>
            <div>Read the article on LDS.org entitled: <br>Finding Joy through Loving Service</div>
          </div>
        </v-card-title>
        <v-card-actions>
          <v-btn flat color="orange" href="https://www.lds.org/general-conference/2011/04/finding-joy-through-loving-service?lang=eng">Read</v-btn>
        </v-card-actions>
      </v-card>
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
        locations: []
      }
    },
    firestore () {
      return {
        locations: db.collection('locations').orderBy('createdAt')
      }
    },
    methods: {
    },
    computed: {
      teacherName () {
        return this.$store.state.teacherName
      },
      classLocation () {
        return this.$store.state.classLocation
      }
    }
  }
</script>
