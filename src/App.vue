<template>
    <v-app>
        <v-navigation-drawer temporary v-model="sideNav">
            <v-list>
                <v-list-tile v-for="item in menuItems" :key="item.title" :to="item.link">
                    <v-list-tile-action>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>{{ item.title }}</v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>
        <v-toolbar dark class="primary">
            <v-toolbar-side-icon @click="sideNav = !sideNav" class="hidden-sm-and-up"></v-toolbar-side-icon>
            <v-toolbar-title>
                <router-link to="/" tag="span" style="cursor: pointer">Congress Display</router-link>
    
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items class="hidden-xs-only">
                <v-btn flat v-for="item in menuItems" :key="item.title" :to="item.link">
                    <v-icon left dark>{{ item.icon }}</v-icon>
                    {{ item.title }}
                </v-btn>
            </v-toolbar-items>
        </v-toolbar>
        <main>
            <router-view :v-if="isFetching"></router-view>
        </main>
    </v-app>
</template>

<script>
export default {
    data() {
        return {
            sideNav: false,
            isFetching: false,
            menuItems: [
                { icon: 'supervisor_account', title: 'All', link: '/abstracts' },
                { icon: 'insert_photo', title: 'e-Posters', link: '/abstracts?presentation=e-poster' },
                { icon: 'theaters', title: 'Videos', link: '/abstracts?presentation=video' },
            ]
        }
    },
    created() {
        this.isFetching = true
        this.$store.dispatch('fetchAbstracts').then(() => {
            console.log('Finish Download')
            this.isFetching = false
        })
    }
}
</script>

<style lang="stylus">
  @import './stylus/main'
</style>
