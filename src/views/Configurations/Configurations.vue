<template>
    <v-container fluid grid-list-md>
        <v-layout wrap align-center justify-center>
            <v-flex xs12 md11>
                <v-fade-transition leave-absolute hide-on-leave>
                    <router-view v-on="$listeners"/>
                </v-fade-transition>
            </v-flex>
        </v-layout>
        <!-- <v-layout wrap justify-center>
            <v-flex xs12 sm6 md4>
                <v-select
                    :disabled="fleets.length == 0"
                    :items="fleets"
                    item-text="Name"
                    item-value="FleetGuid"
                    return-object
                    label="Select an existing Fleet" outlined color="secondary" item-color="secondary"
                    hide-details :value="selectedFleet" @input="setSelectedFleet"
                >
                </v-select>
            </v-flex>
        </v-layout> -->
        <!-- <v-layout wrap justify-center v-if="newRoundMode">
            <v-flex xs12 sm6 md4>
                <v-select
                    :disabled="tees.length == 0"
                    :items="tees"
                    item-text="name"
                    item-value="teeId"
                    label="Select a Tee" outlined color="secondary" item-color="secondary"
                    hide-details return-object v-model="selectedTee" 
                >
                    <template v-slot:selection="data">
                        <tee-box-icon :primaryColor="data.item.primaryColor" :secondaryColor="data.item.secondaryColor"></tee-box-icon>
                        {{data.item.name + ' - ' + data.item.scratchRating + '/' + data.item.slope}}
                    </template>
                    <template v-slot:item="data">
                        <tee-box-icon :primaryColor="data.item.primaryColor" :secondaryColor="data.item.secondaryColor"></tee-box-icon>
                        {{data.item.name + ' - ' + data.item.scratchRating + '/' + data.item.slope}}
                    </template>
                </v-select>
            </v-flex>
        </v-layout> -->
    </v-container>
</template>

<script>
import { mapState } from 'vuex';
import { FleetRepository } from '../../repositories';
import { UsersRepository } from '../../repositories';
import { FleetModel } from '../../models/Fleets/FleetModel';


export default {
    name: "Configurations",

    components: {

    },

    data: () => ({
        newFleetMode: false,

        fleetRepository: new FleetRepository(),
        usersRepository: new UsersRepository(),
        
        fleets: [],
        selectedFleet: null,
        newFleet: new FleetModel(),
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
        computedValue() {
            return 'value';
        }
    },

    methods: {

    },

    created() {
        
    },

    mounted() {
        
    }
    
};
</script>

<style>
</style>
