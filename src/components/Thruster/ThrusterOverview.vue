<template>
    <v-card class="rounded-xl" outlined @click="$emit('thruster-click', thruster)" :ripple="allowClick" :class="allowClick ? '' : 'no-click'" :disabled="disabled">
        <v-container fluid>
            <v-layout wrap align-center>
                <v-flex grow class="pb-0">
                    <span class="subtitle-1 font-weight-bold">{{thruster.Title}}</span>
                </v-flex>
                <v-flex shrink class="pb-0">
                    <v-chip class="font-weight-bold">{{thruster.ModulePointsCost}}</v-chip>
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
                                    <span>{{thruster.Mass | decimal}}</span>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                    </template>
                    <span class="subtitle-1">Mass describes the overall mass of the Thruster.</span>
                </v-tooltip>
                <v-tooltip bottom max-width="300" color="black" open-delay="700">
                    <template v-slot:activator="{ on, attrs }">
                        <v-flex xs6 sm3 v-on="on" v-bind="attrs" class="pt-0">
                            <v-layout wrap justify-center>
                                <v-flex shrink class="pb-0">
                                    <v-icon color="red">mdi-thermometer-alert</v-icon>
                                </v-flex>
                                <v-flex xs12 class="pt-0 text-center">
                                    <span>{{thruster.HeatCapacity | decimal}}</span>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                    </template>
                    <span class="subtitle-1">Heat Capacity describes the amount of heat units the thruster can withstand. It contributes to the Total Heat Capacity of the spaceship.</span>
                </v-tooltip>  
                <v-tooltip bottom max-width="300" color="black" open-delay="700">
                    <template v-slot:activator="{ on, attrs }">
                        <v-flex xs6 sm3 v-on="on" v-bind="attrs" class="pt-0">
                            <v-layout wrap justify-center>
                                <v-flex shrink class="pb-0">
                                    <v-icon>mdi-hexagon-outline</v-icon>
                                    <v-icon small color="orange">mdi-arrow-right-thick</v-icon>
                                    <v-icon>mdi-hexagon-outline</v-icon>
                                </v-flex>
                                <v-flex xs12 class="pt-0 text-center">
                                    <span>{{thruster.Thrust | decimal}}</span>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                    </template>
                    <span class="subtitle-1">Thrust describes the maximimum number of Tiles the thruster is capable of moving the ship in one turn.</span>
                </v-tooltip>  
                <v-tooltip bottom max-width="300" color="black" open-delay="700">
                    <template v-slot:activator="{ on, attrs }">
                        <v-flex xs6 sm3 v-on="on" v-bind="attrs" class="pt-0">
                            <v-layout wrap justify-center>
                                <v-flex shrink class="pb-0">
                                    <v-icon color="green">mdi-chart-bell-curve-cumulative</v-icon>
                                </v-flex>
                                <v-flex xs12 class="pt-0 text-center">
                                    <span>{{thruster.Efficiency | percent }}</span>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                    </template>
                    <span class="subtitle-1">Efficiency describes how well the thruster converts fuel into energy.</span>
                </v-tooltip>  
                <v-flex xs12 class="pt-1">
                    <span class="subtitle-2 font-weight-light font-italic">
                        {{thruster.Description}}
                    </span>
                </v-flex>
            </v-layout>
        </v-container>
    </v-card>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: "ThrusterOverview",

    components: {

    },

    props: {
        thruster: {
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
