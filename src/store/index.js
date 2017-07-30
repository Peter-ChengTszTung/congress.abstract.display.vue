import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        loadedAbstracts: []
    },
    mutations: {
        fetchAbstracts(state, abstracts) {
            state.loadedAbstracts = abstracts
        }
    },
    actions: {
        fetchAbstracts({ commit }) {
            return new Promise((resolve, reject) => {
                Vue.http.get('http://congress.asiateleophth.org/mobile/abstract?eventShortCode=aptos2017')
                    .then(response => {
                        commit('fetchAbstracts', response.body)
                        resolve()
                    })
            })
        }
    },
    getters: {
        loadedAbstracts(state) {
            return state.loadedAbstracts.sort((abstractA, abstractB) => {
                if (abstractA.reviewSubspecialty.toLowerCase() === abstractB.reviewSubspecialty.toLowerCase()) {
                    return abstractA.title > abstractB.title ? 1 : -1
                }
                return abstractA.reviewSubspecialty > abstractB.reviewSubspecialty ? 1 : -1
            }).filter(abstract => {
                return abstract.finalPresentation.toLowerCase() !== 'free paper'
            })
        },
        featuredAbstracts(state, getters) {
            return getters.loadedAbstracts.slice(0, 5)
        },
        loadedAbstract(state) {
            return (abstractId) => {
                return state.loadedAbstracts.find(abstract => {
                    return abstract.id === abstractId
                })
            }
        },
        loadedAbstractsByPresentation(state, getters) {
            return (presentation) => {
                if (presentation) {
                    return getters.loadedAbstracts.filter(abstract => {
                        return abstract.finalPresentation.toLowerCase() === presentation.toLowerCase()
                    })
                } else {
                    return getters.loadedAbstracts
                }
            }
        }
    }
})
