<template>
    <v-container class="pa-0" fluid>
        <v-container grid-list-lg fluid>
            <v-layout wrap justify-center>
                <v-flex xs12 sm6 md4>
                    <v-layout wrap>
                        <v-flex xs12>
                            <span class="heading">Directional</span>
                        </v-flex>
                    </v-layout>
                    <v-layout wrap>
                        <v-flex xs6>
                            <v-switch v-model="$store.state.trackedMetrics.wind" @change.self="updateTrackedMetrics($store.state.trackedMetrics)" class="mt-0" inset label="Wind" color="golfGuildPrimary" hide-details>
                            </v-switch>
                        </v-flex>
                        <v-flex xs6>
                            <v-switch v-model="$store.state.trackedMetrics.accuracy" @change.self="updateTrackedMetrics($store.state.trackedMetrics)" class="mt-0" inset label="Accuracy" color="golfGuildPrimary" hide-details>
                            </v-switch>
                        </v-flex>
                    </v-layout>
                </v-flex>
            </v-layout>
            <v-layout wrap justify-center>
                <v-flex xs12 sm6 md4>
                    <v-divider/>
                </v-flex>
            </v-layout>
            <v-layout wrap justify-center>
                <v-flex xs12 sm6 md4>
                    <v-layout wrap>
                        <v-flex xs12>
                            <span class="heading">Qualities</span>
                        </v-flex>
                    </v-layout>
                    <v-layout wrap>
                        <v-flex xs6>
                            <v-switch v-model="$store.state.trackedMetrics.lieQuality" @change.self="updateTrackedMetrics($store.state.trackedMetrics)" class="mt-0" inset label="Lie Quality" color="golfGuildPrimary" hide-details>
                            </v-switch>
                        </v-flex>
                        <v-flex xs6>
                            <v-switch v-model="$store.state.trackedMetrics.strikeQuality" @change.self="updateTrackedMetrics($store.state.trackedMetrics)" class="mt-0" inset label="Strike Quality" color="golfGuildPrimary" hide-details>
                            </v-switch>
                        </v-flex>
                        <v-flex xs6>
                            <v-switch v-model="$store.state.trackedMetrics.breakReadQuality" @change.self="updateTrackedMetrics($store.state.trackedMetrics)" class="mt-0" inset label="Break Read Quality" color="golfGuildPrimary" hide-details>
                            </v-switch>
                        </v-flex>
                        <v-flex xs6>
                            <v-switch v-model="$store.state.trackedMetrics.leaveQuality" @change.self="updateTrackedMetrics($store.state.trackedMetrics)" class="mt-0" inset label="Leave Quality" color="golfGuildPrimary" hide-details>
                            </v-switch>
                        </v-flex>
                    </v-layout>
                </v-flex>
            </v-layout>
            <v-layout wrap justify-center>
                <v-flex xs12 sm6 md4>
                    <v-divider/>
                </v-flex>
            </v-layout>
            <v-layout wrap justify-center>
                <v-flex xs12 sm6 md4>
                    <v-layout wrap>
                        <v-flex xs12>
                            <span class="heading">Shape</span>
                        </v-flex>
                    </v-layout>
                    <v-layout wrap>
                        <v-flex xs12>
                            <v-switch v-model="$store.state.trackedMetrics.shape" @change.self="updateTrackedMetrics($store.state.trackedMetrics)" class="mt-0" inset label="Intended and Exhibited Shape" color="golfGuildPrimary" hide-details>
                            </v-switch>
                        </v-flex>
                    </v-layout>
                </v-flex>
            </v-layout>
            <v-layout wrap justify-center>
                <v-flex xs12 sm6 md4>
                    <v-divider/>
                </v-flex>
            </v-layout>
            <v-layout wrap justify-center>
                <v-flex xs12 sm6 md4>
                    <v-layout wrap>
                        <v-flex xs12>
                            <span class="heading">Experimental</span>
                        </v-flex>
                    </v-layout>
                    <v-layout wrap>
                        <v-flex xs6>
                            <v-switch v-model="$store.state.trackedMetrics.satisfaction" @change.self="updateTrackedMetrics($store.state.trackedMetrics)" class="mt-0" inset label="Satisfaction" color="golfGuildPrimary" hide-details>
                            </v-switch>
                        </v-flex>
                    </v-layout>
                </v-flex>
            </v-layout>
        </v-container>
        <v-snackbar v-model="snackbar.show" :timeout="8000" bottom :color="snackbar.color">
            {{snackbar.message}}
            <v-btn text @click="snackbar.show = false">
                Close
            </v-btn>
        </v-snackbar>
    </v-container>
</template>

<script>
import { UsersRepository } from '../repositories';

export default {
    name: "Metrics",

    components: {

    },

    data: () => ({
        usersRepository: new UsersRepository(),

        snackbar: {
            show: false,
            message: '',
            color: ''
        },
    }),

    computed: {

    },

    methods: {

        getTrackedMetrics() {
            this.usersRepository.getTrackedMetrics(this.$store.getters.user.userId)
                .then((apiResponse) => {
                    this.$store.state.trackedMetrics = apiResponse.data;
                })
                .catch((apiError) => {
                    console.error(apiError);
                    this.snackbar.message = 'Failed to get your tracked metrics. Please try again later.';
                    this.snackbar.color = "red";
                    this.snackbar.show = true;
                })
        },

        updateTrackedMetrics(payload) {
            console.log(payload.trackedMetrics)
            this.usersRepository.updateTrackedMetrics(this.$store.getters.user.userId, {trackedMetrics: payload})
                .then(() => {
                    this.getTrackedMetrics();
                })
                .catch((apiError) => {
                    console.error(apiError)
                    this.snackbar.message = 'Failed to update your tracked metrics. Please try again later.';
                    this.snackbar.color = "red";
                    this.snackbar.show = true;
                })
        },
    },

    created() {
        this.usersRepository.getTrackedMetrics(this.$store.getters.user.userId)
            .then((apiResponse) => {
                this.$store.state.trackedMetrics = apiResponse.data;
            })
            .catch((apiError) => {
                console.error(apiError);
                this.snackbar.message = 'Failed to get your tracked metrics. Please try again later.';
                this.snackbar.color = "red";
                this.snackbar.show = true;
            })
    },
    
};
</script>

<style>

</style>
