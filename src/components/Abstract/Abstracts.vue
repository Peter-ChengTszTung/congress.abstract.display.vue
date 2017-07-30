<template>
    <v-container>
        <v-layout row wrap v-for="(abstract, index) in abstracts" :key="abstract.id" class="mb-2">
            <v-flex v-if="hasSectionHeader(index)" xs12 sm12 md10 offset-md1 class="mt-4">
                <h5>{{ abstract.reviewSubspecialty }}</h5>
            </v-flex>
            <v-flex xs12 sm12 md10 offset-md1>
                <v-card>
                    <v-container fluid>
                        <v-layout row>
                            <v-card-title>
                                <h5 class="primary--text">{{ abstract.title | snippet }}</h5>
                            </v-card-title>
                        </v-layout>
                        <v-layout row>
                            <v-card-actions>
                                <v-btn flat :to="`/abstracts/${abstract.id}`">
                                    <v-icon left light>arrow_forward</v-icon>
                                    View Abstract
                                </v-btn>
                            </v-card-actions>
                        </v-layout>
                    </v-container>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    props: ['presentation'],
    methods: {
        hasSectionHeader(index) {
            return index === 0 || this.abstracts[index - 1].reviewSubspecialty !== this.abstracts[index].reviewSubspecialty
        }
    },
    computed: {
        abstracts() {
            return this.$store.getters.loadedAbstractsByPresentation(this.presentation)
        }
    },
    filters: {
        snippet(value) {
            if (value.length > 80) {
                return value.slice(0, 80) + '...'
            }
            return value
        }
    }
}
</script>


</script>
