<template>
    <v-card class="rounded-xl" outlined @click="$emit('weapon-frame-click', weaponFrame)" :ripple="allowClick" :class="allowClick ? '' : 'no-click'" :disabled="disabled">
        <v-container fluid>
            <v-layout wrap align-center>
                <v-flex grow class="pb-0">
                    <span class="subtitle-1 font-weight-bold">{{weaponFrame.Title}}</span>
                </v-flex>
                <v-flex shrink class="pr-0 pb-0">
                    <v-chip>
                        <v-icon  class="pr-1" color="blue-grey">mdi-pistol</v-icon>
                        {{weaponFrame.WeaponFrameTypeText}}
                    </v-chip>
                </v-flex>
                <v-flex shrink class="pb-0">
                    <v-chip class="font-weight-bold">{{weaponFrame.ModulePointsCost}}</v-chip>
                </v-flex>
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
                                    <span>{{weaponFrame.Mass | decimal}}</span>
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
                                    <span>{{weaponFrame.HeatCapacity | decimal}}</span>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                    </template>
                    <span class="subtitle-1">Heat Capacity describes the amount of heat units the Weapon Frame can withstand. It contributes to the Total Heat Capacity of the spaceship.</span>
                </v-tooltip>  
                <v-tooltip bottom max-width="300" color="black" open-delay="700">
                    <template v-slot:activator="{ on, attrs }">
                        <v-flex xs6 sm3 v-on="on" v-bind="attrs" class="pt-0">
                            <v-layout wrap justify-center>
                                <v-flex shrink class="pb-0">
                                    <v-icon color="yellow">mdi-lightning-bolt</v-icon>
                                </v-flex>
                                <v-flex xs12 class="pt-0 text-center">
                                    <span>{{weaponFrame.PowerLevelText }}</span>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                    </template>
                    <span class="subtitle-1">Power Level describes the minimum required hull Weapon power level that this Weapon Frame is compatible with.</span>
                </v-tooltip> 
                <v-tooltip bottom max-width="300" color="black" open-delay="700">
                    <template v-slot:activator="{ on, attrs }">
                        <v-flex xs6 sm3 v-on="on" v-bind="attrs" class="pt-0">
                            <v-layout wrap justify-center>
                                <v-flex shrink class="pb-0">
                                    <v-icon color="orange">mdi-magazine-rifle</v-icon>
                                </v-flex>
                                <v-flex xs12 class="pt-0 text-center">
                                    <span>{{weaponFrame.BaseMagSize }}</span>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                    </template>
                    <span class="subtitle-1">Mag Size describes how many payloads this weapon frame can contain in it's magazine. All payloads are fired during a combat event.</span>
                </v-tooltip> 
                <v-tooltip bottom max-width="300" color="black" open-delay="700">
                    <template v-slot:activator="{ on, attrs }">
                        <v-flex xs6 sm3 v-on="on" v-bind="attrs" class="pt-0">
                            <v-layout wrap justify-center>
                                <v-flex shrink class="pb-0">
                                    <v-icon color="green">mdi-chart-bell-curve</v-icon>
                                </v-flex>
                                <v-flex xs12 class="pt-0 text-center">
                                    <span>{{weaponFrame.TargetingEfficiency | percent }}</span>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                    </template>
                    <span class="subtitle-1">Targeting Efficiency describes the weapon frame's highest intrinsic potential to successfully acquire a target.</span>
                </v-tooltip> 
                <v-tooltip bottom max-width="300" color="black" open-delay="700">
                    <template v-slot:activator="{ on, attrs }">
                        <v-flex xs6 sm3 v-on="on" v-bind="attrs" class="pt-0">
                            <v-layout wrap justify-center>
                                <v-flex shrink class="pb-0">
                                    <v-icon color="light-green">mdi-target-account</v-icon>
                                </v-flex>
                                <v-flex xs12 class="pt-0 text-center">
                                    <span>{{weaponFrame.OptimalRange | decimal }}</span>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                    </template>
                    <span class="subtitle-1">Optimal Range describes the weapon frame's ideal distance at which it can acquire a target.</span>
                </v-tooltip>    
                <v-tooltip bottom max-width="300" color="black" open-delay="700">
                    <template v-slot:activator="{ on, attrs }">
                        <v-flex xs6 sm3 v-on="on" v-bind="attrs" class="pt-0">
                            <v-layout wrap justify-center>
                                <v-flex shrink class="pb-0">
                                    <v-icon color="light-green">mdi-code-brackets</v-icon>
                                </v-flex>
                                <v-flex xs12 class="pt-0 text-center">
                                    <span>{{weaponFrame.EffectiveRange | decimal }}</span>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                    </template>
                    <span class="subtitle-1">Effective Range describes the distance around the weapon frame's Optimal Range at which it can still reliably acquire a target.</span>
                </v-tooltip>    
                <v-tooltip bottom max-width="300" color="black" open-delay="700">
                    <template v-slot:activator="{ on, attrs }">
                        <v-flex xs6 sm3 v-on="on" v-bind="attrs" class="pt-0">
                            <v-layout wrap justify-center>
                                <v-flex shrink class="pb-0">
                                    <v-icon color="red">mdi-flare</v-icon>
                                </v-flex>
                                <v-flex xs12 class="pt-0 text-center">
                                    <span>{{weaponFrame.BaseCriticalHitChance | percent }}</span>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                    </template>
                    <span class="subtitle-1">Critical Hit Chance describes the possibility that the weapon frame will deliver a critically placed payload.</span>
                </v-tooltip>
                <v-flex xs12 class="pt-1">
                    <span class="subtitle-2 font-weight-light font-italic">
                        {{weaponFrame.Description}}
                    </span>
                </v-flex>
            </v-layout>
        </v-container>
    </v-card>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: "WeaponFrameOverview",

    components: {

    },

    props: {
        weaponFrame: {
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
