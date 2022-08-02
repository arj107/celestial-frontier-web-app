<template>
    <v-card class="rounded-xl" outlined @click.stop="viewCorvetteConfiguration(corvetteConfiguration)">
        <v-container fluid>
            <v-layout wrap align-center>
                <v-flex grow>
                    <span class="subtitle-1 font-weight-bold">{{corvetteConfiguration.Name}}</span>
                </v-flex>
                <v-flex shrink>
                    <v-menu
                        open-on-click allow-overflow
                        :close-on-content-click="false" nudge-bottom="130"
                        offset-y content-class="rounded-xl elevation-20"
                        :z-index="10000" left nudge-left="40"
                    >
                        <template v-slot:activator="{ on, attrs, value }">
                            <v-chip 
                                :color="value ? 'cfPrimary' : ''" v-on="on" v-bind="attrs" 
                                :style="`pointer-events:initial !important`"
                                class="pl-1 pr-1"
                            >
                                <v-icon>mdi-dots-horizontal</v-icon>
                            </v-chip>
                        </template>
                        <v-card outlined class="rounded-xl" elevation="20">
                            <v-container fluid grid-list-md>
                                <v-layout wrap>
                                    <v-flex shrink>
                                        <v-menu 
                                            open-on-hover allow-overflow max-width="500px"
                                            :close-on-content-click="false" nudge-bottom="3"
                                            offset-y content-class="rounded-xl elevation-20"
                                            :z-index="10000"
                                        >
                                            <template v-slot:activator="{ on, attrs, value }">
                                                <div class="caption font-weight-bold">Hull Class</div>
                                                <v-chip class="subtitle-1 font-weight-bold" v-on="on" v-bind="attrs"
                                                    :color="value  ? 'cfPrimary' : ''"
                                                >
                                                    {{ corvetteConfiguration.CorvetteClass }} Class
                                                </v-chip>
                                            </template>
                                            <corvette-overview
                                                :corvette="corvetteConfiguration.Corvette"
                                                :allowClick="false"
                                            ></corvette-overview>
                                        </v-menu>  
                                    </v-flex>
                                    <v-flex shrink>
                                        <v-menu 
                                            open-on-hover allow-overflow max-width="500px"
                                            :close-on-content-click="false" nudge-bottom="3"
                                            offset-y content-class="rounded-xl elevation-20"
                                            :z-index="10000"
                                        >
                                            <template v-slot:activator="{ on, attrs, value }">
                                                <div class="caption font-weight-bold">Armor</div>
                                                <v-chip class="subtitle-1 font-weight-bold" v-on="on" v-bind="attrs"
                                                    :color="value  ? 'cfPrimary' : ''"
                                                >
                                                    {{ corvetteConfiguration.ArmorTitle }}
                                                </v-chip>
                                            </template>
                                            <armor-overview
                                                :armor="corvetteConfiguration.Armor"
                                                :allowClick="false"
                                            ></armor-overview>
                                        </v-menu>  
                                    </v-flex>
                                    <v-flex shrink>
                                        <v-menu 
                                            open-on-hover allow-overflow max-width="500px"
                                            :close-on-content-click="false" nudge-bottom="3"
                                            offset-y content-class="rounded-xl elevation-20"
                                            :z-index="10000"
                                        >
                                            <template v-slot:activator="{ on, attrs, value }">
                                                <div class="caption font-weight-bold">PDS</div>
                                                <v-chip class="subtitle-1 font-weight-bold" v-on="on" v-bind="attrs"
                                                    :color="value  ? 'cfPrimary' : ''"
                                                >
                                                    {{ corvetteConfiguration.PointDefenseSystemTitle }}
                                                </v-chip>
                                            </template>
                                            <point-defense-system-overview
                                                :pointDefenseSystem="corvetteConfiguration.PointDefenseSystem"
                                                :allowClick="false"
                                            ></point-defense-system-overview>
                                        </v-menu>  
                                    </v-flex>
                                    <v-flex shrink>
                                        <v-menu 
                                            open-on-hover allow-overflow max-width="500px"
                                            :close-on-content-click="false" nudge-bottom="3"
                                            offset-y content-class="rounded-xl elevation-20"
                                            :z-index="10000"
                                        >
                                            <template v-slot:activator="{ on, attrs, value }">
                                                <div class="caption font-weight-bold">Fuel System</div>
                                                <v-chip class="subtitle-1 font-weight-bold" v-on="on" v-bind="attrs"
                                                    :color="value  ? 'cfPrimary' : ''"
                                                >
                                                    {{ corvetteConfiguration.FuelSystemTitle }}
                                                </v-chip>
                                            </template>
                                            <fuel-system-overview
                                                :fuelSystem="corvetteConfiguration.FuelSystem"
                                                :allowClick="false"
                                            ></fuel-system-overview>
                                        </v-menu>  
                                    </v-flex>
                                    <v-flex shrink>
                                        <v-menu 
                                            open-on-hover allow-overflow max-width="500px"
                                            :close-on-content-click="false" nudge-bottom="3"
                                            offset-y content-class="rounded-xl elevation-20"
                                            :z-index="10000"
                                        >
                                            <template v-slot:activator="{ on, attrs, value }">
                                                <div class="caption font-weight-bold">Thruster</div>
                                                <v-chip class="subtitle-1 font-weight-bold" v-on="on" v-bind="attrs"
                                                    :color="value  ? 'cfPrimary' : ''"
                                                >
                                                    {{ corvetteConfiguration.ThrusterTitle }}
                                                </v-chip>
                                            </template>
                                            <thruster-overview
                                                :thruster="corvetteConfiguration.Thruster"
                                                :allowClick="false"
                                            ></thruster-overview>
                                        </v-menu>  
                                    </v-flex>
                                    <v-flex shrink>
                                        <v-menu 
                                            open-on-hover allow-overflow max-width="500px"
                                            :close-on-content-click="false" nudge-bottom="3"
                                            offset-y content-class="rounded-xl elevation-20"
                                            :z-index="10000"
                                        >
                                            <template v-slot:activator="{ on, attrs, value }">
                                                <div class="caption font-weight-bold">Weapon Frame 1</div>
                                                <v-chip class="subtitle-1 font-weight-bold" v-on="on" v-bind="attrs"
                                                    :color="value  ? 'cfPrimary' : ''"
                                                >
                                                    {{ corvetteConfiguration.WeaponFrame1Title }}
                                                </v-chip>
                                            </template>
                                            <weapon-frame-overview
                                                :weaponFrame="corvetteConfiguration.WeaponFrame1"
                                                :allowClick="false"
                                            ></weapon-frame-overview>
                                        </v-menu>  
                                    </v-flex>
                                    <v-flex shrink>
                                        <v-menu 
                                            open-on-hover allow-overflow max-width="500px"
                                            :close-on-content-click="false" nudge-bottom="3"
                                            offset-y content-class="rounded-xl elevation-20"
                                            :z-index="10000"
                                        >
                                            <template v-slot:activator="{ on, attrs, value }">
                                                <div class="caption font-weight-bold">Payload 1</div>
                                                <v-chip class="subtitle-1 font-weight-bold" v-on="on" v-bind="attrs"
                                                    :color="value  ? 'cfPrimary' : ''"
                                                >
                                                    {{ corvetteConfiguration.Payload1Title }}
                                                </v-chip>
                                            </template>
                                            <payload-overview
                                                :payload="corvetteConfiguration.Payload1"
                                                :allowClick="false"
                                            ></payload-overview>
                                        </v-menu>  
                                    </v-flex>
                                    <v-flex shrink>
                                        <v-menu 
                                            open-on-hover allow-overflow max-width="500px"
                                            :close-on-content-click="false" nudge-bottom="3"
                                            offset-y content-class="rounded-xl elevation-20"
                                            :z-index="10000"
                                        >
                                            <template v-slot:activator="{ on, attrs, value }">
                                                <div class="caption font-weight-bold">Weapon Frame 2</div>
                                                <v-chip class="subtitle-1 font-weight-bold" v-on="on" v-bind="attrs"
                                                    :color="value  ? 'cfPrimary' : ''"
                                                >
                                                    {{ corvetteConfiguration.WeaponFrame2Title }}
                                                </v-chip>
                                            </template>
                                            <weapon-frame-overview
                                                :weaponFrame="corvetteConfiguration.WeaponFrame2"
                                                :allowClick="false"
                                            ></weapon-frame-overview>
                                        </v-menu>  
                                    </v-flex>
                                    <v-flex shrink>
                                        <v-menu 
                                            open-on-hover allow-overflow max-width="500px"
                                            :close-on-content-click="false" nudge-bottom="3"
                                            offset-y content-class="rounded-xl elevation-20"
                                            :z-index="10000"
                                        >
                                            <template v-slot:activator="{ on, attrs, value }">
                                                <div class="caption font-weight-bold">Payload 2</div>
                                                <v-chip class="subtitle-1 font-weight-bold" v-on="on" v-bind="attrs"
                                                    :color="value  ? 'cfPrimary' : ''"
                                                >
                                                    {{ corvetteConfiguration.Payload2Title }}
                                                </v-chip>
                                            </template>
                                            <payload-overview
                                                :payload="corvetteConfiguration.Payload2"
                                                :allowClick="false"
                                            ></payload-overview>
                                        </v-menu>  
                                    </v-flex>
                                </v-layout>
                            </v-container>
                        </v-card>
                    </v-menu>
                </v-flex>
                <v-flex shrink class="pl-0">
                    <v-chip class="font-weight-bold">
                        <v-icon small class="vigor-icon mr-1" color="orange darken-2">mdi-triangle</v-icon>{{corvetteConfiguration.CorvetteBaseVigorCost}}
                    </v-chip>
                </v-flex>
                <v-flex shrink class="pl-0">
                    <v-chip class="font-weight-bold">{{`${corvetteConfiguration.TotalModulePointsUsage}/${corvetteConfiguration.CorvetteModulePointLimit}`}}</v-chip>
                </v-flex>
            </v-layout>
            <v-layout wrap align-center class="pa-0">
                <v-tooltip bottom max-width="300" color="black" open-delay="700">
                    <template v-slot:activator="{ on, attrs }">
                        <v-flex xs6 sm3 v-on="on" v-bind="attrs" class="pt-0">
                            <v-layout wrap justify-center>
                                <v-flex shrink class="pr-0 pb-0">
                                    <div class="subtitle-1 font-weight-bold">Hull</div>
                                </v-flex>
                                <v-flex shrink class="pb-0">
                                    <v-icon>mdi-weight</v-icon>
                                </v-flex>
                                <v-flex xs12 class="pt-0 text-center">
                                    <span>{{corvetteConfiguration.CorvetteHullMass | decimal}}</span>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                    </template>
                    <span class="subtitle-1">Hull Mass describes the mass of the Corvette's hull.</span>
                </v-tooltip>  
                <v-tooltip bottom max-width="300" color="black" open-delay="700">
                    <template v-slot:activator="{ on, attrs }">
                        <v-flex xs6 sm3 v-on="on" v-bind="attrs" class="pt-0">
                            <v-layout wrap justify-center>
                                <v-flex shrink class="pr-0 pb-0">
                                    <div class="subtitle-1 font-weight-bold">Total</div>
                                </v-flex>
                                <v-flex shrink class="pb-0">
                                    <v-icon>mdi-weight</v-icon>
                                </v-flex>
                                <v-flex xs12 class="pt-0 text-center">
                                    <span>{{corvetteConfiguration.TotalMass | decimal}}</span>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                    </template>
                    <span class="subtitle-1">Total Mass describes the mass of the Corvette's hull plus the mass of all attached components.</span>
                </v-tooltip>  
                <v-tooltip bottom max-width="300" color="black" open-delay="700">
                    <template v-slot:activator="{ on, attrs }">
                        <v-flex xs6 sm3 v-on="on" v-bind="attrs" class="pt-0">
                            <v-layout wrap justify-center>
                                <v-flex shrink class="pr-0 pb-0">
                                    <span class="subtitle-1 font-weight-bold">Total</span>
                                </v-flex>
                                <v-flex shrink class="pb-0">
                                    <v-icon color="light-blue">mdi-account-group</v-icon>
                                </v-flex>
                                <v-flex xs12 class="pt-0 text-center">
                                    <span>{{corvetteConfiguration.TotalCrewCost | decimal}}</span>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                    </template>
                    <span class="subtitle-1">Total Crew describes the crew cost of the Corvette plus the crew cost of all attached modules.</span>
                </v-tooltip>  
                <v-tooltip bottom max-width="300" color="black" open-delay="700">
                    <template v-slot:activator="{ on, attrs }">
                        <v-flex xs6 sm3 v-on="on" v-bind="attrs" class="pt-0">
                            <v-layout wrap justify-center>
                                <v-flex shrink class="pr-0 pb-0">
                                    <div class="subtitle-1 font-weight-bold">Total</div>
                                </v-flex>
                                <v-flex shrink class="pb-0">
                                    <v-icon color="red">mdi-thermometer-alert</v-icon>
                                </v-flex>
                                <v-flex xs12 class="pt-0 text-center">
                                    <span>{{corvetteConfiguration.TotalHeatCapacity | decimal}}</span>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                    </template>
                    <span class="subtitle-1">Total Heat Capacity describes the amount of heat units the entire ship can withstand before becomming overheated.</span>
                </v-tooltip>  
                <v-tooltip bottom max-width="300" color="black" open-delay="700">
                    <template v-slot:activator="{ on, attrs }">
                        <v-flex xs6 sm3 v-on="on" v-bind="attrs" class="pt-0">
                            <v-layout wrap justify-center>
                                <!-- <v-flex shrink class="pr-0">
                                    <div class="subtitle-1 font-weight-bold"></div>
                                </v-flex> -->
                                <v-flex shrink class="pb-0">
                                    <v-icon color="green">mdi-weather-windy</v-icon>
                                </v-flex>
                                <v-flex xs12 class="pt-0 text-center">
                                    <span>{{corvetteConfiguration.Maneuverability | decimal5 }}</span>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                    </template>
                    <span class="subtitle-1">Maneuverability describes how quickly the entire ship can accelerate given its Total Mass and its Thruster's Thrust.</span>
                </v-tooltip>  
                <v-tooltip bottom max-width="300" color="black" open-delay="700">
                    <template v-slot:activator="{ on, attrs }">
                        <v-flex xs6 sm3 v-on="on" v-bind="attrs" class="pt-0">
                            <v-layout wrap justify-center>
                                <!-- <v-flex shrink class="pr-0">
                                    <div class="subtitle-1 font-weight-bold"></div>
                                </v-flex> -->
                                <v-flex shrink class="pb-0">
                                    <v-icon color="red" x-small>mdi-minus-thick</v-icon>
                                    <v-icon color="orange">mdi-fire</v-icon>
                                    <v-icon small>mdi-slash-forward</v-icon>
                                    <v-icon>mdi-hexagon-outline</v-icon>
                                </v-flex>
                                <v-flex xs12 class="pt-0 text-center">
                                    <span>{{corvetteConfiguration.FuelSystemFuelConsumptionRate | decimal }}</span>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                    </template>
                    <span class="subtitle-1">Fuel Consumption Rate describes how much fuel it costs for the ship to move 1 tile.</span>
                </v-tooltip>  
                <v-tooltip bottom max-width="300" color="black" open-delay="700">
                    <template v-slot:activator="{ on, attrs }">
                        <v-flex xs6 sm3 v-on="on" v-bind="attrs">
                            <v-layout wrap justify-center>
                                <!-- <v-flex shrink class="pr-0">
                                    <div class="subtitle-1 font-weight-bold"></div>
                                </v-flex> -->
                                <v-flex shrink class="pb-0">
                                    <v-icon color="orange">mdi-fuel</v-icon>
                                </v-flex>
                                <v-flex xs12 class="pt-0 text-center">
                                    <span>{{corvetteConfiguration.FuelSystemFuelCapacity | decimal }}</span>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                    </template>
                    <span class="subtitle-1">Fuel Capacity describes the maximimum amount of fuel the ship's Fuel System can contian.</span>
                </v-tooltip>  
                <v-tooltip bottom max-width="300" color="black" open-delay="700">
                    <template v-slot:activator="{ on, attrs }">
                        <v-flex xs6 sm3 v-on="on" v-bind="attrs">
                            <v-layout wrap justify-center>
                                <!-- <v-flex shrink class="pr-0">
                                    <div class="subtitle-1 font-weight-bold"></div>
                                </v-flex> -->
                                <v-flex shrink class="pb-0">
                                    <v-icon color="green" x-small>mdi-plus-thick</v-icon>
                                    <v-icon color="orange">mdi-fire</v-icon>
                                    <v-icon small>mdi-slash-forward</v-icon>
                                    <v-icon>mdi-arrow-u-down-right</v-icon>
                                </v-flex>
                                <v-flex xs12 class="pt-0 text-center">
                                    <span>{{corvetteConfiguration.FuelSystemFuelRegenerationRate | decimal }}</span>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                    </template>
                    <span class="subtitle-1">Fuel Regeneration Rate describes how much fuel the ship's Fuel System restores per turn.</span>
                </v-tooltip> 
                <v-flex xs12 class="pt-1">
                    <span class="subtitle-2 font-weight-light font-italic">
                        {{corvetteConfiguration.Description}}
                    </span>
                </v-flex>
            </v-layout>
        </v-container>
    </v-card>
</template>

<script>
import { mapState } from 'vuex';
import CorvetteOverview from '../../components/Corvette/CorvetteOverview.vue';
import ArmorOverview from '../../components/Armor/ArmorOverview.vue';
import PointDefenseSystemOverview from '../../components/PointDefenseSystem/PointDefenseSystemOverview.vue';
import FuelSystemOverview from '../../components/FuelSystem/FuelSystemOverview.vue';
import ThrusterOverview from '../../components/Thruster/ThrusterOverview.vue';
import WeaponFrameOverview from '../../components/WeaponFrame/WeaponFrameOverview.vue';
import PayloadOverview from '../../components/Payload/PayloadOverview.vue';

export default {
    name: "CorvetteConfigurationOverview",

    components: {
        CorvetteOverview,
        ArmorOverview,
        PointDefenseSystemOverview,
        FuelSystemOverview,
        ThrusterOverview,
        WeaponFrameOverview,
        PayloadOverview,
    },

    props: {
        corvetteConfiguration: {
            type: Object,
            required: false
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
    },

    methods: {
        viewCorvetteConfiguration(corvetteConfiguration) {
            this.$router.push({path: `${this.$router.history.current.path}/corvettes/${corvetteConfiguration.CorvetteConfigurationGuid}`});
        },
    },

    created() {
        
    },

    mounted() {
        
    }
    
};
</script>

<style>
</style>
