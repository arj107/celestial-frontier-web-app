<template>
    <v-card class="rounded-xl" outlined @click="$emit('payload-click', payload)" :ripple="allowClick" :class="allowClick ? '' : 'no-click'" :disabled="disabled">
        <v-container fluid>
            <v-layout wrap align-center>
                <v-flex grow class="pb-0">
                    <span class="subtitle-1 font-weight-bold">{{payload.Title}}</span>
                </v-flex>
                <v-flex shrink class="pb-0">
                    <v-chip class="font-weight-bold">{{payload.ModulePointsCost}}</v-chip>
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
                                    <v-icon color="blue-grey">mdi-bullet</v-icon>
                                </v-flex>
                                <v-flex xs12 class="pt-0 text-center">
                                    <span>{{payload.PayloadTypeText }}</span>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                    </template>
                    <span class="subtitle-1">Payload Type describes what kind of payload this is.</span>
                </v-tooltip> 
                <v-tooltip bottom max-width="300" color="black" open-delay="700">
                    <template v-slot:activator="{ on, attrs }">
                        <v-flex xs6 sm3 v-on="on" v-bind="attrs" class="pt-0">
                            <v-layout wrap justify-center>
                                <v-flex shrink class="pb-0">
                                    <v-icon color="blue-grey">mdi-pistol</v-icon>
                                </v-flex>
                                <v-flex xs12 class="pt-0 text-center">
                                    <span>{{payload.WeaponFrameTypeText }}</span>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                    </template>
                    <span class="subtitle-1">Weapon Frame Type describes what kind of weapon frame this payload is compatable with.</span>
                </v-tooltip> 
                <v-tooltip bottom max-width="300" color="black" open-delay="700">
                    <template v-slot:activator="{ on, attrs }">
                        <v-flex xs6 sm3 v-on="on" v-bind="attrs" class="pt-0">
                            <v-layout wrap justify-center>
                                <v-flex shrink class="pb-0">
                                    <v-icon color="yellow">mdi-lightning-bolt</v-icon>
                                </v-flex>
                                <v-flex xs12 class="pt-0 text-center">
                                    <span>{{payload.PowerLevelText }}</span>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                    </template>
                    <span class="subtitle-1">Power Level describes the minimum required Weapon Frame Power Level this payload is compatible with.</span>
                </v-tooltip> 
                <v-tooltip bottom max-width="300" color="black" open-delay="700">
                    <template v-slot:activator="{ on, attrs }">
                        <v-flex xs6 sm3 v-on="on" v-bind="attrs" class="pt-0">
                            <v-layout wrap justify-center>
                                <v-flex shrink class="pb-0">
                                    <v-icon color="pink">mdi-heart-broken</v-icon>
                                </v-flex>
                                <v-flex xs12 class="pt-0 text-center">
                                    <span>{{payload.BaseDamage | decimal }}</span>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                    </template>
                    <span class="subtitle-1">Damage describes how much damage the payload will do if it hits the target.</span>
                </v-tooltip>  
                <v-tooltip bottom max-width="300" color="black" open-delay="700">
                    <template v-slot:activator="{ on, attrs }">
                        <v-flex xs6 sm3 v-on="on" v-bind="attrs" class="pt-0">
                            <v-layout wrap justify-center>
                                <v-flex shrink class="pb-0">
                                    <v-icon color="green">mdi-transfer-right</v-icon>
                                </v-flex>
                                <v-flex xs12 class="pt-0 text-center">
                                    <span>{{payload.Velocity | decimal }}</span>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                    </template>
                    <span class="subtitle-1">Velocity describes how quickly the payload travels. It is a critical factor for combat at any given range.</span>
                </v-tooltip>
                <v-tooltip bottom max-width="300" color="black" open-delay="700">
                    <template v-slot:activator="{ on, attrs }">
                        <v-flex xs6 sm3 v-on="on" v-bind="attrs" class="pt-0">
                            <v-layout wrap justify-center>
                                <v-flex shrink class="pb-0">
                                    <v-icon>mdi-ammunition</v-icon>
                                </v-flex>
                                <v-flex xs12 class="pt-0 text-center">
                                    <span>{{payload.KineticDamageBias | percent }}</span>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                    </template>
                    <span class="subtitle-1">Kinetic Damage Bias describes the portion of this payload's damage that is of Kinetic variety.</span>
                </v-tooltip>    
                <v-tooltip bottom max-width="300" color="black" open-delay="700">
                    <template v-slot:activator="{ on, attrs }">
                        <v-flex xs6 sm3 v-on="on" v-bind="attrs" class="pt-0">
                            <v-layout wrap justify-center>
                                <v-flex shrink class="pb-0">
                                    <v-icon>mdi-heat-wave</v-icon>
                                </v-flex>
                                <v-flex xs12 class="pt-0 text-center">
                                    <span>{{payload.EnergyDamageBias | percent }}</span>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                    </template>
                    <span class="subtitle-1">Energy Damage Bias describes the portion of this payload's damage that is of Energy variety.</span>
                </v-tooltip>    
                <v-tooltip bottom max-width="300" color="black" open-delay="700">
                    <template v-slot:activator="{ on, attrs }">
                        <v-flex xs6 sm3 v-on="on" v-bind="attrs" class="pt-0">
                            <v-layout wrap justify-center>
                                <v-flex shrink class="pb-0">
                                    <v-icon color="red">mdi-flare</v-icon>
                                    <v-icon small color="green">mdi-chevron-triple-up</v-icon>
                                    <v-icon color="pink">mdi-heart-broken</v-icon>
                                </v-flex>
                                <v-flex xs12 class="pt-0 text-center">
                                    <span>{{payload.BaseCriticalHitMultiplier | percent }}</span>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                    </template>
                    <span class="subtitle-1">Critical Hit Multiplier describes the proportional increase in damage if a critical hit occurs.</span>
                </v-tooltip>
                <v-flex xs12 class="pt-1">
                    <span class="subtitle-2 font-weight-light font-italic">
                        {{payload.Description}}
                    </span>
                </v-flex>
            </v-layout>
        </v-container>
    </v-card>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: "PayloadOverview",

    components: {

    },

    props: {
        payload: {
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
