<template>
    <v-container>
        <v-layout row wrap>
            <v-flex xs12 sm12 class="text-xs-center text-sm-center">
                <v-btn large router to="/abstracts" class="info">Explore Abstracts</v-btn>
            </v-flex>
        </v-layout>
        <v-layout row wrap class="mt-2">
            <v-flex xs12>
    
                <v-carousel style="cursor: pointer;">
                    <v-carousel-item v-for="abstract in abstracts" src="" :key="abstract.id" @click="onLoadAbstract(abstract.id)">
                        <div class="pa-5">
                            <h4 class="primary--text">{{ abstract.reviewSubspecialty }}</h4>
                            <h5>{{ abstract.title }}</h5>
                        </div>
                    </v-carousel-item>
                </v-carousel>
    
            </v-flex>
        </v-layout>
        <v-layout row wrap class="mt-2">
            <v-flex xs12 sm12 class="text-xs-center">
                <p>Explore our awesome abstracts!</p>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    computed: {
        abstracts() {
            return this.$store.getters.featuredAbstracts
        }
    },
    methods: {
        onLoadAbstract(id) {
            this.$router.push(`/abstracts/${id}`)
        }
    }
}
</script>

<style scoped>

</style>
