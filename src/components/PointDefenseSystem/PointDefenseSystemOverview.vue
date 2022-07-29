<template>
    <v-card class="rounded-xl" outlined @click="$emit('point-defense-system-click', pointDefenseSystem)" :ripple="allowClick" :class="allowClick ? '' : 'no-click'" :disabled="disabled">
        <v-container fluid>
            <v-layout wrap align-center>
                <v-flex grow class="pb-0">
                    <span class="subtitle-1 font-weight-bold">{{pointDefenseSystem.Title}}</span>
                </v-flex>
                <v-flex shrink class="pb-0">
                    <v-chip class="font-weight-bold">{{pointDefenseSystem.ModulePointsCost}}</v-chip>
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
                                    <span>{{pointDefenseSystem.Mass | decimal}}</span>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                    </template>
                    <span class="subtitle-1">Mass describes the overall mass of the PDS.</span>
                </v-tooltip>
                <v-tooltip bottom max-width="300" color="black" open-delay="700">
                    <template v-slot:activator="{ on, attrs }">
                        <v-flex xs6 sm3 v-on="on" v-bind="attrs" class="pt-0">
                            <v-layout wrap justify-center>
                                <v-flex shrink class="pb-0">
                                    <v-icon color="red">mdi-thermometer-alert</v-icon>
                                </v-flex>
                                <v-flex xs12 class="pt-0 text-center">
                                    <span>{{pointDefenseSystem.HeatCapacity | decimal}}</span>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                    </template>
                    <span class="subtitle-1">Heat Capacity describes the amount of heat units the PDS can withstand. It contributes to the Total Heat Capacity of the spaceship.</span>
                </v-tooltip>  
                <v-tooltip bottom max-width="300" color="black" open-delay="700">
                    <template v-slot:activator="{ on, attrs }">
                        <v-flex xs6 sm3 v-on="on" v-bind="attrs" class="pt-0">
                            <v-layout wrap justify-center>
                                <v-flex shrink class="pb-0">
                                    <v-icon color="yellow">mdi-lightning-bolt</v-icon>
                                </v-flex>
                                <v-flex xs12 class="pt-0 text-center">
                                    <span>{{pointDefenseSystem.PowerLevelText }}</span>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                    </template>
                    <span class="subtitle-1">Power Level describes the minimum required hull PDS power level that this PDS is compatible with.</span>
                </v-tooltip> 
                <v-tooltip bottom max-width="300" color="black" open-delay="700">
                    <template v-slot:activator="{ on, attrs }">
                        <v-flex xs6 sm3 v-on="on" v-bind="attrs" class="pt-0">
                            <v-layout wrap justify-center>
                                <v-flex shrink class="pb-0">
                                    <v-icon color="green">mdi-target</v-icon>
                                </v-flex>
                                <v-flex xs12 class="pt-0 text-center">
                                    <span>{{pointDefenseSystem.Efficiency | percent }}</span>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                    </template>
                    <span class="subtitle-1">Effeciency describes the probability that a countermeasure will successfully nullify an incomming opponent payload.</span>
                </v-tooltip> 
                <v-tooltip bottom max-width="300" color="black" open-delay="700">
                    <template v-slot:activator="{ on, attrs }">
                        <v-flex xs6 sm3 v-on="on" v-bind="attrs" class="pt-0">
                            <v-layout wrap justify-center>
                                <v-flex shrink class="pb-0">
                                    <v-icon color="orange">mdi-magazine-rifle</v-icon>
                                </v-flex>
                                <v-flex xs12 class="pt-0 text-center">
                                    <span>{{pointDefenseSystem.CountermeasureCapacity | decimal }}</span>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                    </template>
                    <span class="subtitle-1">Countermeasure Capacity describes how many opponent's payloads the PDS will attempt to nullify during your opponent's turn.</span>
                </v-tooltip>    
                <v-tooltip bottom max-width="300" color="black" open-delay="700">
                    <template v-slot:activator="{ on, attrs }">
                        <v-flex xs6 sm3 v-on="on" v-bind="attrs" class="pt-0">
                            <v-layout wrap justify-center>
                                <v-flex shrink class="pb-0">
                                    <v-icon color="green" x-small>mdi-plus-thick</v-icon>
                                    <v-icon color="orange">mdi-ammunition</v-icon>
                                    <v-icon small>mdi-slash-forward</v-icon>
                                    <v-icon>mdi-arrow-u-down-right</v-icon>
                                </v-flex>
                                <v-flex xs12 class="pt-0 text-center">
                                    <span>{{pointDefenseSystem.CountermeasureRegenerationRate | decimal }}</span>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                    </template>
                    <span class="subtitle-1">Countermeasure Regeneration Rate describes how many countermeasures the PDS will regenerate per turn.</span>
                </v-tooltip>
                <v-flex xs12 class="pt-1">
                    <span class="subtitle-2 font-weight-light font-italic">
                        {{pointDefenseSystem.Description}}
                    </span>
                </v-flex>
            </v-layout>
        </v-container>
    </v-card>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: "PointDefenseSystemOverview",

    components: {

    },

    props: {
        pointDefenseSystem: {
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
        
    }),

    computed: {
        ...mapState([
            'validationRules',
        ]),
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
