<template>
    <v-card class="rounded-xl" outlined @click="$emit('battlecruiser-click', battlecruiser)" :ripple="allowClick" :class="allowClick ? '' : 'no-click'" :disabled="disabled">
        <v-container fluid>
            <v-layout wrap align-center>
                <v-flex grow class="pb-0">
                    <span class="subtitle-1 font-weight-bold">{{battlecruiser.Class}} Class</span>
                </v-flex>
                <v-flex shrink class="pb-0">
                    <v-chip class="font-weight-bold">{{battlecruiser.ModulePointLimit}}</v-chip>
                </v-flex>
                <!-- <v-flex shrink class="pl-0 pb-0">
                    <v-chip >{{armor.SpaceshipType.Text}} Armor</v-chip>
                </v-flex> -->
            </v-layout>
            <v-layout wrap align-center class="pa-0 pt-2">
                <v-tooltip bottom max-width="300" color="black" open-delay="700">
                    <template v-slot:activator="{ on, attrs }">
                        <v-flex xs6 sm3 v-on="on" v-bind="attrs" class="pt-0">
                            <v-layout wrap justify-center>
                                <v-flex shrink class="pb-0">
                                    <v-icon>mdi-weight</v-icon>
                                </v-flex>
                                <v-flex xs12 class="pt-0 text-center">
                                    <span>{{battlecruiser.HullMass | decimal}}</span>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                    </template>
                    <span class="subtitle-1">Mass describes the overall mass of the Battlecruiser's Hull.</span>
                </v-tooltip>
                <v-tooltip bottom max-width="300" color="black" open-delay="700">
                    <template v-slot:activator="{ on, attrs }">
                        <v-flex xs6 sm3 v-on="on" v-bind="attrs" class="pt-0">
                            <v-layout wrap justify-center>
                                <v-flex shrink class="pb-0">
                                    <v-icon color="blue">mdi-account-group</v-icon>
                                </v-flex>
                                <v-flex xs12 class="pt-0 text-center">
                                    <span>{{battlecruiser.BaseCrewCost | decimal }}</span>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                    </template>
                    <span class="subtitle-1">Crew Cost describes the how much crew the Battlecruiser needs to operate.</span>
                </v-tooltip>  
                <v-tooltip bottom max-width="300" color="black" open-delay="700">
                    <template v-slot:activator="{ on, attrs }">
                        <v-flex xs6 sm3 v-on="on" v-bind="attrs" class="pt-0">
                            <v-layout wrap justify-center>
                                <v-flex shrink class="pb-0">
                                    <v-icon color="red">mdi-thermometer-alert</v-icon>
                                </v-flex>
                                <v-flex xs12 class="pt-0 text-center">
                                    <span>{{battlecruiser.HeatCapacity | decimal}}</span>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                    </template>
                    <span class="subtitle-1">Heat Capacity describes the amount of heat units the hull can withstand. It contributes to the Total Heat Capacity of the spaceship.</span>
                </v-tooltip>
                <v-tooltip bottom max-width="300" color="black" open-delay="700">
                    <template v-slot:activator="{ on, attrs }">
                        <v-flex xs6 sm3 v-on="on" v-bind="attrs" class="pt-0">
                            <v-layout wrap justify-center>
                                <v-flex shrink class="pb-0">
                                    <v-icon color="pink">mdi-heart</v-icon>
                                </v-flex>
                                <v-flex xs12 class="pt-0 text-center">
                                    <span>{{battlecruiser.BaseHullHealth | decimal }}</span>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                    </template>
                    <span class="subtitle-1">Hull Health describes how much total damage the Battlecruiser can take before it is destroyed.</span>
                </v-tooltip>
                <v-tooltip bottom max-width="300" color="black" open-delay="700">
                    <template v-slot:activator="{ on, attrs }">
                        <v-flex xs6 sm3 v-on="on" v-bind="attrs" class="pt-0">
                            <v-layout wrap justify-center>
                                <v-flex shrink class="pr-0 pb-0">
                                    <div class="subtitle-1 font-weight-bold">PDS</div>
                                </v-flex>
                                <v-flex shrink class="pb-0 pl-0">
                                    <v-icon color="yellow">mdi-lightning-bolt</v-icon>
                                </v-flex>
                                <v-flex xs12 class="pt-0 text-center">
                                    <span>{{battlecruiser.PointDefenseSystemPowerLevelText }}</span>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                    </template>
                    <span class="subtitle-1">PDS Power Level describes the maximum power level of PDS this hull is compatible with.</span>
                </v-tooltip>
                <v-tooltip bottom max-width="300" color="black" open-delay="700">
                    <template v-slot:activator="{ on, attrs }">
                        <v-flex xs6 sm3 v-on="on" v-bind="attrs" class="pt-0">
                            <v-layout wrap justify-center>
                                <v-flex shrink class="pr-0 pb-0">
                                    <div class="subtitle-1 font-weight-bold">Wpn</div>
                                </v-flex>
                                <v-flex shrink class="pb-0 pl-0">
                                    <v-icon color="yellow">mdi-lightning-bolt</v-icon>
                                </v-flex>
                                <v-flex xs12 class="pt-0 text-center">
                                    <span>{{battlecruiser.WeaponPowerLevelText }}</span>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                    </template>
                    <span class="subtitle-1">Weapon Power Level describes the maximum power level of Weapon Frame this hull is compatible with.</span>
                </v-tooltip>
                <v-flex xs12 class="pt-1">
                    <span class="subtitle-2 font-weight-light font-italic">
                        {{battlecruiser.Description}}
                    </span>
                </v-flex>
            </v-layout>
        </v-container>
    </v-card>
</template>

<script>
import { mapState } from 'vuex';
// import { BattlecruiserModel } from '../../models/Battlecruiser/BattlecruiserModel';

export default {
    name: "BattlecruiserOverview",

    components: {

    },

    props: {
        battlecruiser: {
            type: Object,
            required: true
        },
        allowClick: {
            type: Boolean,
            required: false,
            default: true
        },
        disabled: {
            type: Boolean,
            required: false,
            default: false
        }
    },

    data: () => ({
        newFleetMode: false,
        
        fleet: null,
        selectedFleet: null,
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
        // battlecruiserOverview() {
        //     return new BattlecruiserModel(this.battlecruiser);
        // }
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
