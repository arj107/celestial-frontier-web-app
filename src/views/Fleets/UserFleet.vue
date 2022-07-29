<template>
    <v-container fluid v-if="!$store.state.isLoading">
        <v-layout wrap>
            <v-flex xs12 v-if="fleet.FleetCarriers.length <= 0">
                <v-alert type="warning" dense text class="rounded-xl">There are not enough Carriers in this fleet!</v-alert>
            </v-flex>
            <!-- <v-flex xs12>
                {{fleet}}
            </v-flex> -->
            <v-flex xs12>
                <v-card class="rounded-xl" outlined>
                    <v-layout wrap>
                        <v-flex xs12>
                            <battlecruiser-configuration :battlecruiserConfiguration="fleetBattlecruiser"></battlecruiser-configuration>
                        </v-flex>
                        <v-flex xs12 v-if="!fleetBattlecruiser">
                            <v-flex xs12>
                                <v-alert type="warning" dense text class="rounded-xl">Please select a Battlecruiser to use in {{fleet.Name}}</v-alert>
                            </v-flex>
                            <v-flex xs12>
                                <v-select></v-select>
                            </v-flex>
                        </v-flex>
                    </v-layout>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import { mapState } from 'vuex';
import { FleetRepository } from '../../repositories';
import { UsersRepository } from '../../repositories';
import { NewFleet } from '../../models/Fleets/NewFleet';
import BattlecruiserConfiguration from '../../components/Configurations/BattlecruiserConfiguration.vue';


export default {
    name: "FleetBuilder",

    components: {
        BattlecruiserConfiguration
    },

    data: () => ({
 
        newFleetMode: false,

        fleetRepository: new FleetRepository(),
        usersRepository: new UsersRepository(),
        
        fleet: null,
        fleetBattlecruiser: null,
        selectedFleet: null,
        newFleet: new NewFleet(),
        golfCourses: [],
        selectedGolfCourse: null,
        tees: [],
        selectedTee: null,
        activeRounds: [],
        selectedRound: null,
        selectedRoundHole: null,
        rearrangeStrokesMode: false,
        deleteRoundStrokeDialog: false,
        selectedRoundStroke: null,
        endRoundDialog: false,
    }),

    computed: {
        ...mapState([
            'validationRules',
        ]),
    },

    methods: {
        getUserFleet() {
            this.$store.state.isLoading = true;
            this.fleetRepository.getUserFleet(this.$route.params.FleetGuid)
                .then((apiResponse) => {
                    console.log('apiResponse', apiResponse);
                    this.fleet = apiResponse.data;
                    this.fleetBattlecruiser = this.fleet.FleetBattlecruisers[0].BattlecruiserConfiguration || null;
                    this.$store.state.isLoading = false;
                })
                .catch((apiError) => {
                    console.error(apiError)
                    this.$emit('show-snackbar', {
                        message: 'Failed to get your fleets. Please try again later',
                        color: 'red',
                        show: true
                    });
                })
        },
    },

    created() {
        this.getUserFleet();
    },

    mounted() {
        
    }
    
};
</script>

<style>
</style>
