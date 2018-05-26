<template>
  <v-app>
    <template v-if="user != null">
      <v-navigation-drawer temporary fixed v-model="sideNav" >
        <v-list class="pa-0">
          <v-list-tile avatar>
            <v-list-tile-avatar>
              <img :src="user.photoURL" v-if="user.photoURL != null"> <!--TODO THIS MAY BREAK IF A USER DOES NOT HAVE THIS INFO-->
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title v-if="user.displayName != null">{{user.displayName}}</v-list-tile-title>  <!--TODO THIS MAY BREAK IF A USER DOES NOT HAVE THIS INFO-->
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
        <v-divider></v-divider>
        <v-list class="pt-0">
          <v-list-tile v-for="item in menuItems" :key="item.title" router :to="item.link">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-action></v-list-tile-action>
            <v-list-tile-content>{{ item. title }} </v-list-tile-content>
          </v-list-tile>
          <v-list-tile @click="logOut">
            <v-list-tile-action>
              <v-icon>exit_to_app</v-icon>
            </v-list-tile-action>
            <v-list-tile-action></v-list-tile-action>
            <v-list-tile-content>Logout </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>

      <v-toolbar dark class="primary" > <!--v-if="$route.name == 'ClassPage'-->
        <v-toolbar-side-icon @click="sideNav =!sideNav" class="hidden-sm-and-up"></v-toolbar-side-icon>
        <v-toolbar-title></v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-xs-only">
          <v-btn flat v-for="item in menuItems" :key="item.title"  router :to="item.link">
            <v-icon left dark>{{ item.icon }}</v-icon>
            {{ item.title }}
          </v-btn>
          <v-btn flat @click="logOut">
            <v-icon left dark>exit_to_app</v-icon>
          Logout</v-btn>
        </v-toolbar-items>
      </v-toolbar>


    </template>
    <main>
      <router-view></router-view>
    </main>
  </v-app>
</template>

<script>
  import auth from '@/auth'
  export default {
    data () {
      return {
        sideNav: false,
        menuItems: [
          {icon: 'home', title: 'My Class', link: '/classpage'},
          {icon: 'location_on', title: 'Check in', link: '/checkin'},
          {icon: 'help', title: 'Help', link: '/help'}
        ]
      }
    },
    name: 'App',
    computed: {
      user () {
        return this.$store.getters['user/user']
      }
    },
    methods: {
      logOut () {
        auth.logout()
      }
    }
  }
</script>
