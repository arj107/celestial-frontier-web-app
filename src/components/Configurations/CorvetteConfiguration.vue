<template>
    <v-container fluid v-if="$store.state.editingCorvetteConfiguration">
        <v-card 
            flat class="rounded-xl mb-2" 
            :class="$store.state.corvetteConfigurationStatsPinned ? 'sticky-configuration elevation-20' : 'background'" 
            :style="[
                {outline: `thin solid ${$vuetify.theme.dark ? $vuetify.theme.themes.dark['outline'] : $vuetify.theme.themes.light['outline']}`},
            ]"
        >
            <v-container fluid>
                <v-layout wrap align-center>
                    <v-flex shrink>
                        <v-btn small fab @click.stop="toggleStatsPinned()" top left elevation="3">
                            <v-icon v-if="$store.state.corvetteConfigurationStatsPinned">mdi-pin-off</v-icon>
                            <v-icon v-else>mdi-pin</v-icon>
                        </v-btn>
                    </v-flex>
                    <v-flex grow>
                        <v-text-field v-model="$store.state.editingCorvetteConfiguration.Name"
                            clearable outlined hide-details rounded dense
                            label="Corvette Configuration Name" color="cfPrimary"
                        ></v-text-field>
                    </v-flex>
                    <v-flex shrink v-show="corvetteConfiguration.Name !== $store.state.editingCorvetteConfiguration.Name">
                        <v-btn 
                            block rounded color="cfPrimary" @click="updateCorvetteConfiguration('Name')"
                            :disabled="corvetteConfiguration.Name === $store.state.editingCorvetteConfiguration.Name || $store.state.editingCorvetteConfiguration.Name === '' || $store.state.editingCorvetteConfiguration.Name === null"
                        >
                            Save
                        </v-btn>
                    </v-flex>
                    <v-flex shrink v-show="corvetteConfiguration.Name !== $store.state.editingCorvetteConfiguration.Name">
                        <v-btn 
                            block rounded color="orange" @click="revertCorvetteConfiguration('Name')"
                            :disabled="corvetteConfiguration.Name === $store.state.editingCorvetteConfiguration.Name"
                        >
                            Revert
                        </v-btn>
                    </v-flex>
                    <v-flex shrink>
                        <v-dialog 
                            open-on-click allow-overflow max-width="700px"
                            :close-on-content-click="false" content-class="rounded-xl elevation-20" 
                            origin="top right" v-model="problemSummaryDailogOpen"
                        >
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn v-on="on" v-bind="attrs"
                                    block rounded color="red"
                                    :disabled="isCorvetteConfigurationValid"
                                >
                                    Problem Summary
                                </v-btn>
                            </template>
                            <v-card outlined class="rounded-xl elevation-20" width="700px" max-width="700px">
                                <v-container fluid class="pa-0">
                                    <v-layout wrap align-center class="pa-4">
                                        <v-flex grow>
                                            <span class="title">Problem Summary</span>
                                        </v-flex>
                                        <v-flex shrink>
                                            <v-btn small fab top right text @click="problemSummaryDailogOpen = false">
                                                <v-icon color="red">mdi-close</v-icon>
                                            </v-btn>
                                        </v-flex>
                                        <v-flex xs12>
                                            <span class="subtitle-2 font-italic font-weight-light">
                                                Problems occur when an original component is invalidated by constraints given proposed changes.
                                                They can be resolved by saving all proposed changes or by reverting
                                                the changes that introduced the problems.
                                                <br/><br/>
                                                <span class="font-weight-bold">A configuration with problems cannot be used in a fleet.</span>
                                            </span>
                                        </v-flex>
                                    </v-layout>
                                    <v-divider v-show="corvetteErrors.length > 0"/>
                                    <v-layout wrap align-center class="pa-4 pb-0" v-show="corvetteErrors.length > 0">
                                        <v-flex xs12 class="pb-2">
                                            <span class="subtitle-1 font-weight-bold">Hull Class</span>
                                        </v-flex>
                                        <v-flex xs12 v-for="(error, index) in corvetteErrors" :key="index">
                                            <v-alert text outlined dense class="rounded-xl" type="error">
                                                {{error.message}}
                                            </v-alert>
                                        </v-flex>
                                    </v-layout>
                                    <v-divider v-show="armorErrors.length > 0"/>
                                    <v-layout wrap align-center class="pa-4 pb-0" v-show="armorErrors.length > 0">
                                        <v-flex xs12 class="pb-2">
                                            <span class="subtitle-1 font-weight-bold">Armor</span>
                                        </v-flex>
                                        <v-flex xs12 v-for="(error, index) in armorErrors" :key="index">
                                            <v-alert text outlined dense class="rounded-xl" type="error">
                                                {{error.message}}
                                            </v-alert>
                                        </v-flex>
                                    </v-layout>
                                    <v-divider v-show="pointDefenseSystemErrors.length > 0"/>
                                    <v-layout wrap align-center class="pa-4 pb-0" v-show="pointDefenseSystemErrors.length > 0">
                                        <v-flex xs12 class="pb-2">
                                            <span class="subtitle-1 font-weight-bold">Point Defense System</span>
                                        </v-flex>
                                        <v-flex xs12 v-for="(error, index) in pointDefenseSystemErrors" :key="index">
                                            <v-alert text outlined dense class="rounded-xl" type="error">
                                                {{error.message}}
                                            </v-alert>
                                        </v-flex>
                                    </v-layout>
                                    <v-divider v-show="fuelSystemErrors.length > 0"/>
                                    <v-layout wrap align-center class="pa-4 pb-0" v-show="fuelSystemErrors.length > 0">
                                        <v-flex xs12 class="pb-2">
                                            <span class="subtitle-1 font-weight-bold">Fuel System</span>
                                        </v-flex>
                                        <v-flex xs12 v-for="(error, index) in fuelSystemErrors" :key="index">
                                            <v-alert text outlined dense class="rounded-xl" type="error">
                                                {{error.message}}
                                            </v-alert>
                                        </v-flex>
                                    </v-layout>
                                    <v-divider v-show="thrusterErrors.length > 0"/>
                                    <v-layout wrap align-center class="pa-4 pb-0" v-show="thrusterErrors.length > 0">
                                        <v-flex xs12 class="pb-2">
                                            <span class="subtitle-1 font-weight-bold">Thruster</span>
                                        </v-flex>
                                        <v-flex xs12 v-for="(error, index) in thrusterErrors" :key="index">
                                            <v-alert text outlined dense class="rounded-xl" type="error">
                                                {{error.message}}
                                            </v-alert>
                                        </v-flex>
                                    </v-layout>
                                    <v-divider v-show="weaponFrame1Errors.length > 0"/>
                                    <v-layout wrap align-center class="pa-4 pb-0" v-show="weaponFrame1Errors.length > 0">
                                        <v-flex xs12 class="pb-2">
                                            <span class="subtitle-1 font-weight-bold">Weapon Frame</span>
                                        </v-flex>
                                        <v-flex xs12 v-for="(error, index) in weaponFrame1Errors" :key="index">
                                            <v-alert text outlined dense class="rounded-xl" type="error">
                                                {{error.message}}
                                            </v-alert>
                                        </v-flex>
                                    </v-layout>
                                    <v-divider v-show="payload1Errors.length > 0"/>
                                    <v-layout wrap align-center class="pa-4 pb-0" v-show="payload1Errors.length > 0">
                                        <v-flex xs12 class="pb-2">
                                            <span class="subtitle-1 font-weight-bold">Payload</span>
                                        </v-flex>
                                        <v-flex xs12 v-for="(error, index) in payload1Errors" :key="index">
                                            <v-alert text outlined dense class="rounded-xl" type="error">
                                                {{error.message}}
                                            </v-alert>
                                        </v-flex>
                                    </v-layout>
                                </v-container>
                            </v-card>
                        </v-dialog>
                    </v-flex>
                </v-layout>
                <v-layout wrap align-top>
                    <v-flex grow class="pb-0">
                        <div class="headline">
                            <span class="font-weight-bold">
                                {{$store.state.editingCorvetteConfiguration.Corvette.Class}}
                            </span>
                            Class {{$store.state.editingCorvetteConfiguration.Corvette.SpaceshipTypeText}}
                        </div>
                        <span class="subtitle-1 font-italic">
                            {{$store.state.editingCorvetteConfiguration.Corvette.Description}}
                        </span>
                    </v-flex>
                    <v-flex shrink class="pb-0">
                        <v-chip
                            class="title font-weight-bold"
                        >
                            <v-icon class="vigor-icon mr-1" color="orange darken-2">mdi-triangle</v-icon>
                            {{$store.state.editingCorvetteConfiguration.CorvetteBaseVigorCost}}
                            <v-chip small class="pl-2 ml-1 mr-0 subtitle-2 font-weight-bold" color="background" v-if="vigorCostDifference != 0">
                                <v-layout wrap align-center>
                                    <v-flex shrink class="pa-0">
                                        <v-icon v-if="vigorCostDifference < 0" color="green" class="pr-0 pl-0">mdi-arrow-down-thick</v-icon>
                                        <v-icon v-if="vigorCostDifference > 0" color="red" class="pr-0 pl-0">mdi-arrow-up-thick</v-icon>
                                    </v-flex>
                                    <v-flex shrink class="pa-0">
                                        <span>{{Math.abs(vigorCostDifference)}}</span>
                                    </v-flex>
                                </v-layout>
                            </v-chip>
                        </v-chip>
                    </v-flex>
                    <v-flex shrink class="pb-0">
                        <v-chip :color="corvetteConfigurationModulePointsUsageColor"
                            class="title font-weight-bold"
                        >
                            {{`${$store.state.editingCorvetteConfiguration.TotalModulePointsUsage}/${$store.state.editingCorvetteConfiguration.CorvetteModulePointLimit}`}}
                        </v-chip>
                    </v-flex>
                </v-layout>
                <v-layout wrap align-center class="pa-0 pb-2">
                    <v-flex xs12>
                        <v-layout wrap>
                            <v-flex xs12 sm6 md4 lg4 xl3 class="text-center pb-0">
                                <v-tooltip bottom max-width="300" color="black" open-delay="700" content-class="rounded-xl">
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-chip class="pr-1" v-on="on" v-bind="attrs" color="transparent">
                                            <v-layout align-center>
                                                <v-flex shrink class="pr-0">
                                                    <div class="subtitle-1 font-weight-bold">Hull</div>
                                                </v-flex>
                                                <v-flex shrink class="pr-0">
                                                    <v-icon>mdi-weight</v-icon>
                                                </v-flex>
                                                <v-flex shrink class="pr-0">
                                                    <span class="subtitle-1">{{$store.state.editingCorvetteConfiguration.Corvette.HullMass | decimal}}</span>
                                                </v-flex>
                                                <v-flex shrink>
                                                    <v-chip small class="pl-2 ml-0 mr-1 subtitle-2 font-weight-bold" v-if="hullMassDifference != 0">
                                                        <v-layout wrap align-center>
                                                            <v-flex shrink class="pa-0">
                                                                <v-icon v-if="hullMassDifference < 0" color="green" class="pr-0 pl-0">mdi-arrow-down-thick</v-icon>
                                                                <v-icon v-if="hullMassDifference > 0" color="red" class="pr-0 pl-0">mdi-arrow-up-thick</v-icon>
                                                            </v-flex>
                                                            <v-flex shrink class="pa-0">
                                                                <span>{{Math.abs(hullMassDifference) | decimal}}</span>
                                                            </v-flex>
                                                        </v-layout>
                                                    </v-chip>
                                                </v-flex>
                                            </v-layout>
                                        </v-chip>
                                    </template>
                                    <span class="subtitle-1">Hull Mass describes the mass of the Corvette's hull.</span>
                                </v-tooltip>
                            </v-flex>
                            <v-flex  xs12 sm6 md4 lg4 xl3 class="text-center pb-0">
                                <v-tooltip bottom max-width="300" color="black" open-delay="700" content-class="rounded-xl">
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-chip class="pr-1" v-on="on" v-bind="attrs" color="transparent">
                                            <v-layout align-center>
                                                <v-flex shrink class="pr-0">
                                                    <div class="subtitle-1 font-weight-bold">Total</div>
                                                </v-flex>
                                                <v-flex shrink class="pr-0">
                                                    <v-icon>mdi-weight</v-icon>
                                                </v-flex>
                                                <v-flex shrink class="pr-0">
                                                    <span class="subtitle-1">{{$store.state.editingCorvetteConfiguration.TotalMass | decimal}}</span>
                                                </v-flex>
                                                <v-flex shrink>
                                                    <v-chip small class="pl-2 ml-0 mr-1 subtitle-2 font-weight-bold" v-if="totalMassDifference != 0">
                                                        <v-layout wrap align-center>
                                                            <v-flex shrink class="pa-0">
                                                                <v-icon v-if="totalMassDifference < 0" color="green" class="pr-0 pl-0">mdi-arrow-down-thick</v-icon>
                                                                <v-icon v-if="totalMassDifference > 0" color="red" class="pr-0 pl-0">mdi-arrow-up-thick</v-icon>
                                                            </v-flex>
                                                            <v-flex shrink class="pa-0">
                                                                <span>{{Math.abs(totalMassDifference) | decimal}}</span>
                                                            </v-flex>
                                                        </v-layout>
                                                    </v-chip>
                                                </v-flex>
                                            </v-layout>
                                        </v-chip>
                                    </template>
                                    <span class="subtitle-1">Total Mass describes the mass of the Corvette's hull plus the mass of all attached components.</span>
                                </v-tooltip>
                            </v-flex>
                            <v-flex xs12 sm6 md4 lg4 xl3 class="text-center pb-0">
                                <v-tooltip bottom max-width="300" color="black" open-delay="700" content-class="rounded-xl">
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-chip class="pr-1" v-on="on" v-bind="attrs" color="transparent">
                                            <v-layout align-center>
                                                <v-flex shrink class="pr-0">
                                                    <span class="subtitle-1 font-weight-bold">Total</span>
                                                </v-flex>
                                                <v-flex shrink class="pr-0">
                                                    <v-icon color="light-blue">mdi-account-group</v-icon>
                                                </v-flex>
                                                <v-flex shrink class="pr-0">
                                                    <span class="subtitle-1">{{$store.state.editingCorvetteConfiguration.TotalCrewCost | decimal}}</span>
                                                </v-flex>
                                                <v-flex shrink>
                                                    <v-chip small class="pl-2 ml-0 mr-1 subtitle-2 font-weight-bold" v-if="totalCrewCostDifference != 0">
                                                        <v-layout wrap align-center>
                                                            <v-flex shrink class="pa-0">
                                                                <v-icon v-if="totalCrewCostDifference < 0" color="green" class="pr-0 pl-0">mdi-arrow-down-thick</v-icon>
                                                                <v-icon v-if="totalCrewCostDifference > 0" color="red" class="pr-0 pl-0">mdi-arrow-up-thick</v-icon>
                                                            </v-flex>
                                                            <v-flex shrink class="pa-0">
                                                                <span>{{Math.abs(totalCrewCostDifference) | decimal}}</span>
                                                            </v-flex>
                                                        </v-layout>
                                                    </v-chip>
                                                </v-flex>
                                            </v-layout>
                                        </v-chip>
                                    </template>
                                    <span class="subtitle-1">Total Crew describes the crew cost of the Corvette plus the crew cost of all attached modules.</span>
                                </v-tooltip>
                            </v-flex>
                            <v-flex xs12 sm6 md4 lg4 xl3 class="text-center pb-0">
                                <v-tooltip bottom max-width="300" color="black" open-delay="700" content-class="rounded-xl">
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-chip class="pr-1" v-on="on" v-bind="attrs" color="transparent">
                                            <v-layout align-center>
                                                <v-flex shrink class="pr-0">
                                                    <span class="subtitle-1 font-weight-bold">Total</span>
                                                </v-flex>
                                                <v-flex shrink class="pr-0">
                                                    <v-icon color="red">mdi-thermometer-alert</v-icon>
                                                </v-flex>
                                                <v-flex shrink class="pr-0">
                                                    <span class="subtitle-1">{{$store.state.editingCorvetteConfiguration.TotalHeatCapacity | decimal}}</span>
                                                </v-flex>
                                                <v-flex shrink>
                                                    <v-chip small class="pl-2 ml-0 mr-1 subtitle-2 font-weight-bold" v-if="totalHeatCapacityDifference != 0">
                                                        <v-layout wrap align-center>
                                                            <v-flex shrink class="pa-0">
                                                                <v-icon v-if="totalHeatCapacityDifference < 0" color="red" class="pr-0 pl-0">mdi-arrow-down-thick</v-icon>
                                                                <v-icon v-if="totalHeatCapacityDifference > 0" color="green" class="pr-0 pl-0">mdi-arrow-up-thick</v-icon>
                                                            </v-flex>
                                                            <v-flex shrink class="pa-0">
                                                                <span>{{Math.abs(totalHeatCapacityDifference) | decimal}}</span>
                                                            </v-flex>
                                                        </v-layout>
                                                    </v-chip>
                                                </v-flex>
                                            </v-layout>
                                        </v-chip>
                                    </template>
                                    <span class="subtitle-1">Total Heat Capacity describes the amount of heat units the entire ship can withstand before becomming overheated.</span>
                                </v-tooltip>
                            </v-flex>
                            <v-flex xs12 sm6 md4 lg4 xl3 class="text-center pb-0">
                                <v-tooltip bottom max-width="300" color="black" open-delay="700" content-class="rounded-xl">
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-chip class="pr-1" v-on="on" v-bind="attrs" color="transparent">
                                            <v-layout align-center>
                                                <v-flex shrink class="pr-0">
                                                    <v-icon color="green">mdi-weather-windy</v-icon>
                                                </v-flex>
                                                <v-flex shrink class="pr-0">
                                                    <span class="subtitle-1">{{$store.state.editingCorvetteConfiguration.Maneuverability | decimal5}}</span>
                                                </v-flex>
                                                <v-flex shrink>
                                                    <v-chip small class="pl-2 ml-0 mr-1 subtitle-2 font-weight-bold" v-if="maneuverabilityDifference != 0">
                                                        <v-layout wrap align-center>
                                                            <v-flex shrink class="pa-0">
                                                                <v-icon v-if="maneuverabilityDifference < 0" color="red" class="pr-0 pl-0">mdi-arrow-down-thick</v-icon>
                                                                <v-icon v-if="maneuverabilityDifference > 0" color="green" class="pr-0 pl-0">mdi-arrow-up-thick</v-icon>
                                                            </v-flex>
                                                            <v-flex shrink class="pa-0">
                                                                <span>{{Math.abs(maneuverabilityDifference) | decimal5}}</span>
                                                            </v-flex>
                                                        </v-layout>
                                                    </v-chip>
                                                </v-flex>
                                            </v-layout>
                                        </v-chip>
                                    </template>
                                    <span class="subtitle-1">Maneuverability describes how quickly the entire ship can accelerate given its Total Mass and its Thruster's Thrust.</span>
                                </v-tooltip>
                            </v-flex>
                            <v-flex xs12 sm6 md4 lg4 xl3 class="text-center pb-0">
                                <v-tooltip bottom max-width="300" color="black" open-delay="700" content-class="rounded-xl">
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-chip class="pr-1" v-on="on" v-bind="attrs" color="transparent">
                                            <v-layout align-center>
                                                <v-flex shrink class="pr-0">
                                                    <v-icon color="red" x-small>mdi-minus-thick</v-icon>
                                                    <v-icon color="orange">mdi-fire</v-icon>
                                                    <v-icon small>mdi-slash-forward</v-icon>
                                                    <v-icon>mdi-hexagon-outline</v-icon>
                                                </v-flex>
                                                <v-flex shrink class="pr-0">
                                                    <span class="subtitle-1">{{$store.state.editingCorvetteConfiguration.FuelSystemFuelConsumptionRate | decimal}}</span>
                                                </v-flex>
                                                <v-flex shrink>
                                                    <v-chip small class="pl-2 ml-0 mr-1 subtitle-2 font-weight-bold" v-if="fuelConsumptionRateDifference != 0">
                                                        <v-layout wrap align-center>
                                                            <v-flex shrink class="pa-0">
                                                                <v-icon v-if="fuelConsumptionRateDifference < 0" color="green" class="pr-0 pl-0">mdi-arrow-down-thick</v-icon>
                                                                <v-icon v-if="fuelConsumptionRateDifference > 0" color="red" class="pr-0 pl-0">mdi-arrow-up-thick</v-icon>
                                                            </v-flex>
                                                            <v-flex shrink class="pa-0">
                                                                <span>{{Math.abs(fuelConsumptionRateDifference) | decimal}}</span>
                                                            </v-flex>
                                                        </v-layout>
                                                    </v-chip>
                                                </v-flex>
                                            </v-layout>
                                        </v-chip>
                                    </template>
                                    <span class="subtitle-1">Fuel Consumption Rate describes how much fuel it costs for the ship to move 1 tile.</span>
                                </v-tooltip>
                            </v-flex>
                            <v-flex xs12 sm6 md4 lg4 xl3 class="text-center pb-0">
                                <v-tooltip bottom max-width="300" color="black" open-delay="700" content-class="rounded-xl">
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-chip class="pr-1" v-on="on" v-bind="attrs" color="transparent">
                                            <v-layout align-center>
                                                <v-flex shrink class="pr-0">
                                                    <v-icon color="orange">mdi-fuel</v-icon>
                                                </v-flex>
                                                <v-flex shrink class="pr-0">
                                                    <span class="subtitle-1">{{$store.state.editingCorvetteConfiguration.FuelSystemFuelCapacity | decimal}}</span>
                                                </v-flex>
                                                <v-flex shrink>
                                                    <v-chip small class="pl-2 ml-0 mr-1 subtitle-2 font-weight-bold" v-if="fuelCapacityDifference != 0">
                                                        <v-layout wrap align-center>
                                                            <v-flex shrink class="pa-0">
                                                                <v-icon v-if="fuelCapacityDifference < 0" color="red" class="pr-0 pl-0">mdi-arrow-down-thick</v-icon>
                                                                <v-icon v-if="fuelCapacityDifference > 0" color="green" class="pr-0 pl-0">mdi-arrow-up-thick</v-icon>
                                                            </v-flex>
                                                            <v-flex shrink class="pa-0">
                                                                <span>{{Math.abs(fuelCapacityDifference) | decimal}}</span>
                                                            </v-flex>
                                                        </v-layout>
                                                    </v-chip>
                                                </v-flex>
                                            </v-layout>
                                        </v-chip>
                                    </template>
                                    <span class="subtitle-1">Fuel Capacity describes the maximimum amount of fuel the ship's Fuel System can contian.</span>
                                </v-tooltip>
                            </v-flex>
                            <v-flex xs12 sm6 md4 lg4 xl3 class="text-center pb-0">
                                <v-tooltip bottom max-width="300" color="black" open-delay="700" content-class="rounded-xl">
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-chip class="pr-1" v-on="on" v-bind="attrs" color="transparent">
                                            <v-layout align-center>
                                                <v-flex shrink class="pr-0">
                                                    <v-icon color="green" x-small>mdi-plus-thick</v-icon>
                                                    <v-icon color="orange">mdi-fire</v-icon>
                                                    <v-icon small>mdi-slash-forward</v-icon>
                                                    <v-icon>mdi-arrow-u-down-right</v-icon>
                                                </v-flex>
                                                <v-flex shrink class="pr-0">
                                                    <span class="subtitle-1">{{$store.state.editingCorvetteConfiguration.FuelSystemFuelRegenerationRate | decimal}}</span>
                                                </v-flex>
                                                <v-flex shrink>
                                                    <v-chip small class="pl-2 ml-0 mr-1 subtitle-2 font-weight-bold" v-if="fuelRegenerationRateDifference != 0">
                                                    <v-layout wrap align-center>
                                                        <v-flex shrink class="pa-0">
                                                            <v-icon v-if="fuelRegenerationRateDifference < 0" color="red" class="pr-0 pl-0">mdi-arrow-down-thick</v-icon>
                                                            <v-icon v-if="fuelRegenerationRateDifference > 0" color="green" class="pr-0 pl-0">mdi-arrow-up-thick</v-icon>
                                                        </v-flex>
                                                        <v-flex shrink class="pa-0">
                                                            <span>{{Math.abs(fuelRegenerationRateDifference) | decimal}}</span>
                                                        </v-flex>
                                                    </v-layout>
                                                    </v-chip>
                                                </v-flex>
                                            </v-layout>
                                        </v-chip>
                                    </template>
                                    <span class="subtitle-1">Fuel Regeneration Rate describes how much fuel the ship's Fuel System restores per turn.</span>
                                </v-tooltip>
                            </v-flex>
                        </v-layout>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card>
        <v-layout wrap>
            <v-expansion-panels accordian flat class="rounded-xl ml-2 mr-2 mt-0" v-model="$store.state.corvetteConfigurationSelectedComponentPanels" multiple>
                <v-expansion-panel class="rounded-xl mt-0 mb-2 expansionPanelBackground" :style="`outline: thin solid ${$vuetify.theme.dark ? $vuetify.theme.themes.dark['outline'] : $vuetify.theme.themes.light['outline']}`">
                    <v-expansion-panel-header v-slot="{ open }" class="pt-0 pb-0">
                        <v-container fluid class="pa-0">
                            <span v-if="open" class="title">Hull Class</span>
                            <v-layout wrap align-center v-else>
                                <v-flex shrink>
                                    <span class="title">Hull Class</span>
                                </v-flex>
                                <v-flex v-if="corvetteConfiguration.CorvetteGuid !== $store.state.editingCorvetteConfiguration.CorvetteGuid" shrink>
                                    <v-menu 
                                        open-on-hover allow-overflow max-width="500px"
                                        :close-on-content-click="false" nudge-bottom="3"
                                        offset-y content-class="rounded-xl elevation-20" 
                                        :z-index="10000"
                                    >
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-chip class="subtitle-1 font-weight-bold" v-on="on" v-bind="attrs"
                                                :color="'cfPrimary'"
                                            >
                                                {{ $store.state.editingCorvetteConfiguration.CorvetteClass }} Class
                                            </v-chip>
                                        </template>
                                        <corvette-overview
                                            :corvette="$store.state.editingCorvetteConfiguration.Corvette"
                                            :style="`border: 2px solid ${$vuetify.theme.themes.dark['cfPrimary']}`"
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
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-chip class="subtitle-1 font-weight-bold" v-on="on" v-bind="attrs"
                                                :color="isCorvetteDisabled(corvetteConfiguration.Corvette) ? 'red' : 'orange'"
                                            >
                                                {{ corvetteConfiguration.CorvetteClass }} Class
                                            </v-chip>
                                        </template>
                                        <corvette-overview
                                            :corvette="corvetteConfiguration.Corvette"
                                            :style="`border: 2px solid ${isCorvetteDisabled(corvetteConfiguration.Corvette) ? 'red' : 'orange'}`"
                                            :allowClick="false"
                                        ></corvette-overview>
                                    </v-menu>   
                                </v-flex>
                                <v-spacer />
                                <v-flex shrink class="mr-5">
                                    <v-layout wrap>
                                        <v-flex shrink v-if="corvetteConfiguration.CorvetteGuid !== $store.state.editingCorvetteConfiguration.CorvetteGuid">
                                            <v-btn 
                                                small rounded color="cfPrimary" @click.stop="updateCorvetteConfiguration('Corvette')" :disabled="!isCorvetteConfigurationValid && isCorvetteDisabled($store.state.editingCorvetteConfiguration.Corvette)"
                                            >
                                                Save
                                            </v-btn>
                                        </v-flex>
                                        <v-flex shrink v-if="corvetteConfiguration.CorvetteGuid !== $store.state.editingCorvetteConfiguration.CorvetteGuid">
                                            <v-btn 
                                                small rounded color="orange" @click.stop="revertCorvetteConfiguration('Corvette')" :disabled="isCorvetteDisabled(corvetteConfiguration.Corvette)"
                                            >
                                                Revert
                                            </v-btn>
                                        </v-flex>
                                    </v-layout>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <v-layout wrap align-center>
                            <v-flex xs12 sm12 md5 lg5 xl4>
                                <v-text-field v-model="$store.state.corvettesSearch"
                                    clearable outlined hide-details rounded dense
                                    prepend-icon="mdi-magnify" label="Search" color="cfPrimary"
                                ></v-text-field>
                            </v-flex>
                            <v-flex grow>
                                <v-combobox v-model="$store.state.corvettesSortBy"
                                    flat outlined hide-details rounded dense clearable
                                    label="Sort by" color="cfPrimary" item-color="cfPrimary" item-text="text" item-value="value"
                                    :items="$store.state.corvettesSortOptions" :menu-props="{maxHeight: 600}"
                                >
                                    <template v-slot:selection="{item}">
                                        <v-icon v-for="(icon, index) in item.icons" :key="index" :color="icon.iconColor" :size="icon.size" :class="icon.cssClass">{{icon.icon}}</v-icon>
                                        <span class="subtitle-2 ml-1">{{item.text}}</span>
                                    </template>
                                    <template v-slot:item="{item}">
                                        <v-layout align-center>
                                            <v-flex shrink>
                                                <v-icon v-for="(icon, index) in item.icons" :key="index" :color="icon.iconColor" :size="icon.size" :class="icon.cssClass">{{icon.icon}}</v-icon>
                                            </v-flex>
                                            <v-flex grow>
                                                <span class="subtitle-2 ml-1">{{item.text}}</span>
                                            </v-flex>
                                        </v-layout>
                                    </template>
                                </v-combobox>
                            </v-flex>
                            <v-flex shrink>
                                <v-btn-toggle rounded dense v-model="$store.state.corvettesSortDesc" mandatory>
                                    <v-btn depressed :value="false">
                                        <v-icon>mdi-arrow-up</v-icon>
                                    </v-btn>
                                    <v-btn depressed :value="true">
                                        <v-icon>mdi-arrow-down</v-icon>
                                    </v-btn>
                                </v-btn-toggle>
                            </v-flex>
                            <v-flex shrink>
                                <v-switch v-model="$store.state.corvettesShowOnlyFeasible" class="mt-0"
                                    hide-details dense label="Only Feasible" color="cfPrimary"
                                >
                                </v-switch>
                            </v-flex>
                        </v-layout>
                        <v-card class="rounded-xl mb-2 mt-2" outlined v-if="$store.state.configurationsCondensedView">
                            <v-data-table
                                :items="filteredCorvetteOptions"
                                :items-per-page.sync="$store.state.corvettesItemsPerPage"
                                :page.sync="$store.state.corvettesPageSync"
                                @page-count="$store.state.corvettesPageCount = $event"
                                :search.sync="$store.state.corvettesSearch" class="rounded-table clickable-rows"
                                :sort-by="$store.state.corvettesSortBy ? $store.state.corvettesSortBy.value : null"
                                :sort-desc.sync="$store.state.corvettesSortDesc" dense loader-height="0"
                                hide-default-footer :loading="corvettesLoading" :headers="$store.state.corvettesHeaders"
                            >
                                <template v-slot:loading>
                                    <v-container fluid class="pa-5">
                                        <v-layout wrap justify-center>
                                            <v-flex shrink>
                                                <v-progress-circular 
                                                    indeterminate
                                                    size="100" width="10" color="cfSecondary"
                                                >
                                                    <v-icon large>mdi-rocket-launch-outline</v-icon>
                                                </v-progress-circular>
                                            </v-flex>
                                        </v-layout>
                                    </v-container>
                                </template>
                                <template v-slot:item="{ item, headers }">
                                    <tr :style="`outline: solid 2px ${getCorvetteOutlineColor(item.CorvetteGuid)}; outline-offset:-0.35rem; border-radius: 24px; ${item.disabled ? 'pointer-events:none;' : ''}`" 
                                        @click="item.disabled ? '' : setEditingCorvette(item)"
                                    >
                                        <td 
                                            :align="`${headers.find(h => h.value === 'Class').align}`" 
                                            :style="headers.find(h => h.value === 'Class').divider ? `${$vuetify.theme.dark ? 'border-right: 1px solid rgba(255,255,255,0.12)' : 'border-right: 1px solid rgba(0,0,0,0.12)'}` : ''"
                                        >
                                            <span class="subtitle-1" :style="`${item.disabled ? 'opacity: 0.5;' : ''}`">{{ item.Class }}</span>
                                        </td>
                                        <td 
                                            :align="`${headers.find(h => h.value === 'BaseVigorCost').align}`" 
                                            :style="headers.find(h => h.value === 'BaseVigorCost').divider ? `${$vuetify.theme.dark ? 'border-right: 1px solid rgba(255,255,255,0.12)' : 'border-right: 1px solid rgba(0,0,0,0.12)'}` : ''"
                                        >
                                            <span class="subtitle-1" :style="`${item.disabled ? 'opacity: 0.5;' : ''}`">{{ item.BaseVigorCost }}</span>
                                        </td>
                                        <td :align="`${headers.find(h => h.value === 'ModulePointLimit').align}`"
                                            :style="headers.find(h => h.value === 'ModulePointLimit').divider ? `${$vuetify.theme.dark ? 'border-right: 1px solid rgba(255,255,255,0.12)' : 'border-right: 1px solid rgba(0,0,0,0.12)'}` : ''"
                                        >
                                            <span class="subtitle-1" :style="`${item.disabled ? 'opacity: 0.5;' : ''}`">{{ item.ModulePointLimit | decimal }}</span>
                                        </td>
                                        <td :align="`${headers.find(h => h.value === 'HullMass').align}`"
                                            :style="headers.find(h => h.value === 'HullMass').divider ? `${$vuetify.theme.dark ? 'border-right: 1px solid rgba(255,255,255,0.12)' : 'border-right: 1px solid rgba(0,0,0,0.12)'}` : ''"
                                        >
                                            <span class="subtitle-1" :style="`${item.disabled ? 'opacity: 0.5;' : ''}`">{{ item.HullMass | decimal }}</span>
                                        </td>
                                        <td :align="`${headers.find(h => h.value === 'BaseCrewCost').align}`"
                                            :style="headers.find(h => h.value === 'BaseCrewCost').divider ? `${$vuetify.theme.dark ? 'border-right: 1px solid rgba(255,255,255,0.12)' : 'border-right: 1px solid rgba(0,0,0,0.12)'}` : ''"
                                        >
                                            <span class="subtitle-1" :style="`${item.disabled ? 'opacity: 0.5;' : ''}`">{{ item.BaseCrewCost | decimal }}</span>
                                        </td>
                                        <td :align="`${headers.find(h => h.value === 'HeatCapacity').align}`"
                                            :style="headers.find(h => h.value === 'HeatCapacity').divider ? `${$vuetify.theme.dark ? 'border-right: 1px solid rgba(255,255,255,0.12)' : 'border-right: 1px solid rgba(0,0,0,0.12)'}` : ''"
                                        >
                                            <span class="subtitle-1" :style="`${item.disabled ? 'opacity: 0.5;' : ''}`">{{ item.HeatCapacity | decimal }}</span>
                                        </td>
                                        <td :align="`${headers.find(h => h.value === 'BaseHullHealth').align}`"
                                            :style="headers.find(h => h.value === 'BaseHullHealth').divider ? `${$vuetify.theme.dark ? 'border-right: 1px solid rgba(255,255,255,0.12)' : 'border-right: 1px solid rgba(0,0,0,0.12)'}` : ''"
                                        >
                                            <span class="subtitle-1" :style="`${item.disabled ? 'opacity: 0.5;' : ''}`">{{ item.BaseHullHealth | decimal }}</span>
                                        </td>
                                        <td :align="`${headers.find(h => h.value === 'PointDefenseSystemPowerLevelText').align}`"
                                            :style="headers.find(h => h.value === 'PointDefenseSystemPowerLevelText').divider ? `${$vuetify.theme.dark ? 'border-right: 1px solid rgba(255,255,255,0.12)' : 'border-right: 1px solid rgba(0,0,0,0.12)'}` : ''"
                                        >
                                            <span class="subtitle-1" :style="`${item.disabled ? 'opacity: 0.5;' : ''}`">{{ item.PointDefenseSystemPowerLevelText | decimal }}</span>
                                        </td>
                                        <td :align="`${headers.find(h => h.value === 'WeaponPowerLevelText').align}`"
                                            :style="headers.find(h => h.value === 'WeaponPowerLevelText').divider ? `${$vuetify.theme.dark ? 'border-right: 1px solid rgba(255,255,255,0.12)' : 'border-right: 1px solid rgba(0,0,0,0.12)'}` : ''"
                                        >
                                            <span class="subtitle-1" :style="`${item.disabled ? 'opacity: 0.5;' : ''}`">{{ item.WeaponPowerLevelText | decimal }}</span>
                                        </td>
                                        <td :align="`${headers.find(h => h.value === 'Description').align}`"
                                            :style="headers.find(h => h.value === 'Description').divider ? `${$vuetify.theme.dark ? 'border-right: 1px solid rgba(255,255,255,0.12)' : 'border-right: 1px solid rgba(0,0,0,0.12)'}` : ''"
                                        >
                                            <v-tooltip top max-width="300" color="black" open-delay="700" content-class="rounded-xl">
                                                <template v-slot:activator="{ on, attrs }">
                                                    <v-chip 
                                                        color="grey" x-small v-on="on" v-bind="attrs" 
                                                        :style="`pointer-events:initial !important`"
                                                        class="pl-1 pr-1"
                                                    >
                                                        <v-icon>mdi-dots-horizontal</v-icon>
                                                    </v-chip>
                                                </template>
                                                <span class="subtitle-2 font-weight-normal font-italic">{{item.Description}}</span>
                                            </v-tooltip>
                                        </td>
                                    </tr>
                                </template>
                                <template v-slot:[`header.BaseVigorCost`]="{ header }">
                                    <v-tooltip top max-width="300" color="black" open-delay="700" content-class="rounded-xl">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-icon v-for="(icon, index) in header.icons" :key="index" :color="icon.iconColor" :size="icon.size" :class="icon.cssClass" v-on="on" v-bind="attrs">{{icon.icon}}</v-icon>
                                        </template>
                                        <span class="subtitle-1">{{header.description}}</span>
                                    </v-tooltip>
                                </template>
                                <template v-slot:[`header.HullMass`]="{ header }">
                                    <v-tooltip top max-width="300" color="black" open-delay="700" content-class="rounded-xl">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-icon v-for="(icon, index) in header.icons" :key="index" :color="icon.iconColor" :size="icon.size" :class="icon.cssClass" v-on="on" v-bind="attrs">{{icon.icon}}</v-icon>
                                        </template>
                                        <span class="subtitle-1">{{header.description}}</span>
                                    </v-tooltip>
                                </template>
                                <template v-slot:[`header.BaseCrewCost`]="{ header }">
                                    <v-tooltip top max-width="300" color="black" open-delay="700" content-class="rounded-xl">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-icon v-for="(icon, index) in header.icons" :key="index" :color="icon.iconColor" :size="icon.size" :class="icon.cssClass" v-on="on" v-bind="attrs">{{icon.icon}}</v-icon>
                                        </template>
                                        <span class="subtitle-1">{{header.description}}</span>
                                    </v-tooltip>
                                </template>
                                <template v-slot:[`header.HeatCapacity`]="{ header }">
                                    <v-tooltip top max-width="300" color="black" open-delay="700" content-class="rounded-xl">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-icon v-for="(icon, index) in header.icons" :key="index" :color="icon.iconColor" :size="icon.size" :class="icon.cssClass" v-on="on" v-bind="attrs">{{icon.icon}}</v-icon>
                                        </template>
                                        <span class="subtitle-1">{{header.description}}</span>
                                    </v-tooltip>
                                </template>
                                <template v-slot:[`header.BaseHullHealth`]="{ header }">
                                    <v-tooltip top max-width="300" color="black" open-delay="700" content-class="rounded-xl">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-icon v-for="(icon, index) in header.icons" :key="index" :color="icon.iconColor" :size="icon.size" :class="icon.cssClass" v-on="on" v-bind="attrs">{{icon.icon}}</v-icon>
                                        </template>
                                        <span class="subtitle-1">{{header.description}}</span>
                                    </v-tooltip>
                                </template>
                                <template v-slot:[`header.PointDefenseSystemPowerLevelText`]="{ header }">
                                    <v-tooltip top max-width="300" color="black" open-delay="700" content-class="rounded-xl">
                                        <template v-slot:activator="{ on, attrs }">
                                            PDS<v-icon v-for="(icon, index) in header.icons" :key="index" :color="icon.iconColor" :size="icon.size" :class="icon.cssClass" v-on="on" v-bind="attrs">{{icon.icon}}</v-icon>
                                        </template>
                                        <span class="subtitle-1">{{header.description}}</span>
                                    </v-tooltip>
                                </template>
                                <template v-slot:[`header.WeaponPowerLevelText`]="{ header }">
                                    <v-tooltip top max-width="300" color="black" open-delay="700" content-class="rounded-xl">
                                        <template v-slot:activator="{ on, attrs }">
                                            Wpn<v-icon v-for="(icon, index) in header.icons" :key="index" :color="icon.iconColor" :size="icon.size" :class="icon.cssClass" v-on="on" v-bind="attrs">{{icon.icon}}</v-icon>
                                        </template>
                                        <span class="subtitle-1">{{header.description}}</span>
                                    </v-tooltip>
                                </template>
                                <template v-slot:[`header.Description`]="{  }">
                                </template>
                            </v-data-table>
                        </v-card>
                        <v-data-iterator v-else
                            :items="filteredCorvetteOptions"
                            :items-per-page.sync="$store.state.corvettesItemsPerPage"
                            :page.sync="$store.state.corvettesPageSync"
                            @page-count="$store.state.corvettesPageCount = $event"
                            :search="$store.state.corvettesSearch" class="mb-2 mt-2"
                            :sort-by="$store.state.corvettesSortBy ? $store.state.corvettesSortBy.value : null"
                            :sort-desc="$store.state.corvettesSortDesc"
                            hide-default-footer :loading="corvettesLoading"
                        >
                            <template v-slot:loading>
                                <v-container fluid class="pa-5">
                                    <v-layout wrap justify-center>
                                        <v-flex shrink>
                                            <v-progress-circular 
                                                indeterminate
                                                size="100" width="10" color="cfSecondary"
                                            >
                                                <v-icon large>mdi-rocket-launch-outline</v-icon>
                                            </v-progress-circular>
                                        </v-flex>
                                    </v-layout>
                                </v-container>
                            </template>
                            <template v-slot:default="props">
                                <v-layout wrap>
                                    <v-flex xs12 sm12 md6 lg4 xl4 v-for="(corvette, i) in props.items" :key="i">
                                        <corvette-overview
                                            :corvette="corvette" class="fill-height" :style="`outline: solid 2px ${getCorvetteOutlineColor(corvette.CorvetteGuid)}`"
                                            @corvette-click="setEditingCorvette(corvette)" 
                                            :disabled="corvette.disabled"
                                        ></corvette-overview>
                                    </v-flex>
                                </v-layout>
                            </template>
                        </v-data-iterator>
                        <v-layout wrap align-center>
                            <v-flex grow>
                                <v-pagination :length="$store.state.corvettesPageCount" :total-visible="7"
                                    v-model="$store.state.corvettesPageSync" color="cfPrimary" circle
                                ></v-pagination>
                            </v-flex>
                            <v-flex xs12 sm12 md4 lg3 xl3>
                                <v-select v-model="$store.state.corvettesItemsPerPage"
                                    :items="$store.state.itemsPerPageOptions"
                                    outlined hide-details rounded dense item-value="value" item-text="text"
                                    label="Items Per Page" color="cfPrimary" item-color="cfPrimary"
                                ></v-select>
                            </v-flex>
                            <v-flex shrink>
                                <v-btn 
                                    block rounded color="cfPrimary" @click="updateCorvetteConfiguration('Corvette')"
                                    :disabled="corvetteConfiguration.CorvetteGuid === $store.state.editingCorvetteConfiguration.CorvetteGuid || (!isCorvetteConfigurationValid && isCorvetteDisabled($store.state.editingCorvetteConfiguration.Corvette))"
                                >
                                    Save
                                </v-btn>
                            </v-flex>
                            <v-flex shrink>
                                <v-btn 
                                    block rounded color="orange" @click="revertCorvetteConfiguration('Corvette')"
                                    :disabled="corvetteConfiguration.CorvetteGuid === $store.state.editingCorvetteConfiguration.CorvetteGuid || isCorvetteDisabled(corvetteConfiguration.Corvette)"
                                >
                                    Revert
                                </v-btn>
                            </v-flex>
                        </v-layout>
                    </v-expansion-panel-content>
                </v-expansion-panel>
                <v-expansion-panel class="rounded-xl mt-0 mb-2 expansionPanelBackground" :style="`outline: thin solid ${$vuetify.theme.dark ? $vuetify.theme.themes.dark['outline'] : $vuetify.theme.themes.light['outline']}`">
                    <v-expansion-panel-header v-slot="{ open }" class="pt-0 pb-0">
                        <v-container fluid class="pa-0">
                            <span class="title" v-if="open">Armor</span>
                            <v-layout wrap align-center v-else>
                                <v-flex shrink>
                                    <span class="title">Armor</span>
                                </v-flex>
                                <v-flex v-if="corvetteConfiguration.ArmorGuid !== $store.state.editingCorvetteConfiguration.ArmorGuid" shrink>
                                    <v-menu 
                                        open-on-hover allow-overflow max-width="500px"
                                        :close-on-content-click="false" nudge-bottom="3"
                                        offset-y content-class="rounded-xl elevation-20"
                                        :z-index="10000"
                                    >
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-chip class="subtitle-1 font-weight-bold" v-on="on" v-bind="attrs"
                                                :color="'cfPrimary'"
                                            >
                                                {{ $store.state.editingCorvetteConfiguration.Armor.Title }}
                                            </v-chip>
                                        </template>
                                        <armor-overview
                                            :armor="$store.state.editingCorvetteConfiguration.Armor"
                                            :style="`border: 2px solid ${$vuetify.theme.themes.dark['cfPrimary']}`"
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
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-chip class="subtitle-1 font-weight-bold" v-on="on" v-bind="attrs"
                                                :color="isArmorDisabled(corvetteConfiguration.Armor) ? 'red' : 'orange'"
                                            >
                                                {{ corvetteConfiguration.ArmorTitle }}
                                            </v-chip>
                                        </template>
                                        <armor-overview
                                            :armor="corvetteConfiguration.Armor"
                                            :style="`border: 2px solid ${isArmorDisabled(corvetteConfiguration.Armor) ? 'red' : 'orange'}`"
                                            :allowClick="false"
                                        ></armor-overview>
                                    </v-menu>   
                                </v-flex>
                                <v-spacer />
                                <v-flex shrink class="mr-5">
                                    <v-layout wrap>
                                        <v-flex shrink v-if="corvetteConfiguration.ArmorGuid !== $store.state.editingCorvetteConfiguration.ArmorGuid">
                                            <v-btn 
                                                small rounded color="cfPrimary" @click.stop="updateCorvetteConfiguration('Armor')" :disabled="!isCorvetteConfigurationValid && isArmorDisabled($store.state.editingCorvetteConfiguration.Armor)"
                                            >
                                                Save
                                            </v-btn>
                                        </v-flex>
                                        <v-flex shrink v-if="corvetteConfiguration.ArmorGuid !== $store.state.editingCorvetteConfiguration.ArmorGuid">
                                            <v-btn 
                                                small rounded color="orange" @click.stop="revertCorvetteConfiguration('Armor')" :disabled="isArmorDisabled(corvetteConfiguration.Armor)"
                                            >
                                                Revert
                                            </v-btn>
                                        </v-flex>
                                    </v-layout>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <v-layout wrap align-center>
                            <v-flex xs12 sm12 md5 lg5 xl4>
                                <v-text-field v-model="$store.state.armorsSearch"
                                    clearable outlined hide-details rounded dense
                                    prepend-icon="mdi-magnify" label="Search" color="cfPrimary"
                                ></v-text-field>
                            </v-flex>
                            <v-flex grow>
                                <v-combobox v-model="$store.state.armorsSortBy"
                                    flat outlined hide-details rounded dense clearable
                                    label="Sort by" color="cfPrimary" item-color="cfPrimary" item-text="text" item-value="value"
                                    :items="$store.state.armorsSortOptions" :menu-props="{maxHeight: 600}"
                                >
                                    <template v-slot:selection="{item}">
                                        <v-icon v-for="(icon, index) in item.icons" :key="index" :color="icon.iconColor" :size="icon.size" :class="icon.cssClass">{{icon.icon}}</v-icon>
                                        <span class="subtitle-2 ml-1">{{item.text}}</span>
                                    </template>
                                    <template v-slot:item="{item}">
                                        <v-layout align-center>
                                            <v-flex shrink>
                                                <v-icon v-for="(icon, index) in item.icons" :key="index" :color="icon.iconColor" :size="icon.size" :class="icon.cssClass">{{icon.icon}}</v-icon>
                                            </v-flex>
                                            <v-flex grow>
                                                <span class="subtitle-2 ml-1">{{item.text}}</span>
                                            </v-flex>
                                        </v-layout>
                                    </template>
                                </v-combobox>
                            </v-flex>
                            <v-flex shrink>
                                <v-btn-toggle rounded dense v-model="$store.state.armorsSortDesc" mandatory>
                                    <v-btn depressed :value="false">
                                        <v-icon>mdi-arrow-up</v-icon>
                                    </v-btn>
                                    <v-btn depressed :value="true">
                                        <v-icon>mdi-arrow-down</v-icon>
                                    </v-btn>
                                </v-btn-toggle>
                            </v-flex>
                            <v-flex shrink>
                                <v-switch v-model="$store.state.armorsShowOnlyFeasible" class="mt-0"
                                    hide-details dense label="Only Feasible" color="cfPrimary"
                                >
                                </v-switch>
                            </v-flex>
                        </v-layout>
                        <v-card class="rounded-xl mb-2 mt-2" outlined v-if="$store.state.configurationsCondensedView">
                            <v-data-table
                                :items="filteredArmorOptions"
                                :items-per-page.sync="$store.state.armorsItemsPerPage"
                                :page.sync="$store.state.armorsPageSync"
                                @page-count="$store.state.armorsPageCount = $event"
                                :search.sync="$store.state.armorsSearch" class="rounded-table clickable-rows"
                                :sort-by="$store.state.armorsSortBy ? $store.state.armorsSortBy.value : null"
                                :sort-desc.sync="$store.state.armorsSortDesc" dense loader-height="0"
                                hide-default-footer :loading="armorsLoading" :headers="$store.state.armorsHeaders"
                            >
                                <template v-slot:loading>
                                    <v-container fluid class="pa-5">
                                        <v-layout wrap justify-center>
                                            <v-flex shrink>
                                                <v-progress-circular 
                                                    indeterminate
                                                    size="100" width="10" color="cfSecondary"
                                                >
                                                    <v-icon large>mdi-rocket-launch-outline</v-icon>
                                                </v-progress-circular>
                                            </v-flex>
                                        </v-layout>
                                    </v-container>
                                </template>
                                <template v-slot:item="{ item, headers }">
                                    <tr :style="`outline: solid 2px ${getArmorComponentOutlineColor(item.ArmorGuid)}; outline-offset:-0.35rem; border-radius: 24px; ${item.disabled ? 'pointer-events:none;' : ''}`" 
                                        @click="item.disabled ? '' : setEditingArmorComponent(item)"
                                    >
                                        <td 
                                            :align="`${headers.find(h => h.value === 'Title').align}`" 
                                            :style="headers.find(h => h.value === 'Title').divider ? `${$vuetify.theme.dark ? 'border-right: 1px solid rgba(255,255,255,0.12)' : 'border-right: 1px solid rgba(0,0,0,0.12)'}` : ''"
                                        >
                                            <span class="subtitle-1" :style="`${item.disabled ? 'opacity: 0.5;' : ''}`">{{ item.Title }}</span>
                                        </td>
                                        <td :align="`${headers.find(h => h.value === 'ModulePointsCost').align}`"
                                            :style="headers.find(h => h.value === 'ModulePointsCost').divider ? `${$vuetify.theme.dark ? 'border-right: 1px solid rgba(255,255,255,0.12)' : 'border-right: 1px solid rgba(0,0,0,0.12)'}` : ''"
                                        >
                                            <span class="subtitle-1" :style="`${item.disabled ? 'opacity: 0.5;' : ''}`">{{ item.ModulePointsCost | decimal }}</span>
                                        </td>
                                        <td :align="`${headers.find(h => h.value === 'Mass').align}`"
                                            :style="headers.find(h => h.value === 'Mass').divider ? `${$vuetify.theme.dark ? 'border-right: 1px solid rgba(255,255,255,0.12)' : 'border-right: 1px solid rgba(0,0,0,0.12)'}` : ''"
                                        >
                                            <span class="subtitle-1" :style="`${item.disabled ? 'opacity: 0.5;' : ''}`">{{ item.Mass | decimal }}</span>
                                        </td>
                                        <td :align="`${headers.find(h => h.value === 'HeatCapacity').align}`"
                                            :style="headers.find(h => h.value === 'HeatCapacity').divider ? `${$vuetify.theme.dark ? 'border-right: 1px solid rgba(255,255,255,0.12)' : 'border-right: 1px solid rgba(0,0,0,0.12)'}` : ''"
                                        >
                                            <span class="subtitle-1" :style="`${item.disabled ? 'opacity: 0.5;' : ''}`">{{ item.HeatCapacity | decimal }}</span>
                                        </td>
                                        <td :align="`${headers.find(h => h.value === 'KineticResistance').align}`"
                                            :style="headers.find(h => h.value === 'KineticResistance').divider ? `${$vuetify.theme.dark ? 'border-right: 1px solid rgba(255,255,255,0.12)' : 'border-right: 1px solid rgba(0,0,0,0.12)'}` : ''"
                                        >
                                            <span class="subtitle-1" :style="`${item.disabled ? 'opacity: 0.5;' : ''}`">{{ item.KineticResistance | percent }}</span>
                                        </td>
                                        <td :align="`${headers.find(h => h.value === 'EnergyResistance').align}`"
                                            :style="headers.find(h => h.value === 'EnergyResistance').divider ? `${$vuetify.theme.dark ? 'border-right: 1px solid rgba(255,255,255,0.12)' : 'border-right: 1px solid rgba(0,0,0,0.12)'}` : ''"
                                        >
                                            <span class="subtitle-1" :style="`${item.disabled ? 'opacity: 0.5;' : ''}`">{{ item.EnergyResistance | percent }}</span>
                                        </td>
                                        <td :align="`${headers.find(h => h.value === 'Description').align}`"
                                            :style="headers.find(h => h.value === 'Description').divider ? `${$vuetify.theme.dark ? 'border-right: 1px solid rgba(255,255,255,0.12)' : 'border-right: 1px solid rgba(0,0,0,0.12)'}` : ''"
                                        >
                                            <v-tooltip top max-width="300" color="black" open-delay="700" content-class="rounded-xl">
                                                <template v-slot:activator="{ on, attrs }">
                                                    <v-chip 
                                                        color="grey" x-small v-on="on" v-bind="attrs" 
                                                        :style="`pointer-events:initial !important`"
                                                        class="pl-1 pr-1"
                                                    >
                                                        <v-icon>mdi-dots-horizontal</v-icon>
                                                    </v-chip>
                                                </template>
                                                <span class="subtitle-2 font-weight-normal font-italic">{{item.Description}}</span>
                                            </v-tooltip>
                                        </td>
                                    </tr>
                                </template>
                                <template v-slot:[`header.Mass`]="{ header }">
                                    <v-tooltip top max-width="300" color="black" open-delay="700" content-class="rounded-xl">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-icon v-for="(icon, index) in header.icons" :key="index" :color="icon.iconColor" :size="icon.size" :class="icon.cssClass" v-on="on" v-bind="attrs">{{icon.icon}}</v-icon>
                                        </template>
                                        <span class="subtitle-1">{{header.description}}</span>
                                    </v-tooltip>
                                </template>
                                <template v-slot:[`header.HeatCapacity`]="{ header }">
                                    <v-tooltip top max-width="300" color="black" open-delay="700" content-class="rounded-xl">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-icon v-for="(icon, index) in header.icons" :key="index" :color="icon.iconColor" :size="icon.size" :class="icon.cssClass" v-on="on" v-bind="attrs">{{icon.icon}}</v-icon>
                                        </template>
                                        <span class="subtitle-1">{{header.description}}</span>
                                    </v-tooltip>
                                </template>
                                <template v-slot:[`header.KineticResistance`]="{ header }">
                                    <v-tooltip top max-width="300" color="black" open-delay="700" content-class="rounded-xl">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-icon v-for="(icon, index) in header.icons" :key="index" :color="icon.iconColor" :size="icon.size" :class="icon.cssClass" v-on="on" v-bind="attrs">{{icon.icon}}</v-icon>
                                        </template>
                                        <span class="subtitle-1">{{header.description}}</span>
                                    </v-tooltip>
                                </template>
                                <template v-slot:[`header.EnergyResistance`]="{ header }">
                                    <v-tooltip top max-width="300" color="black" open-delay="700" content-class="rounded-xl">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-icon v-for="(icon, index) in header.icons" :key="index" :color="icon.iconColor" :size="icon.size" :class="icon.cssClass" v-on="on" v-bind="attrs">{{icon.icon}}</v-icon>
                                        </template>
                                        <span class="subtitle-1">{{header.description}}</span>
                                    </v-tooltip>
                                </template>
                                <template v-slot:[`header.Description`]="{  }">
                                </template>
                            </v-data-table>
                        </v-card>
                        <v-data-iterator v-else
                            :items="filteredArmorOptions"
                            :items-per-page.sync="$store.state.armorsItemsPerPage"
                            :page.sync="$store.state.armorsPageSync"
                            @page-count="$store.state.armorsPageCount = $event"
                            :search="$store.state.armorsSearch" class="mt-2 mb-2"
                            :sort-by="$store.state.armorsSortBy ? $store.state.armorsSortBy.value : null"
                            :sort-desc="$store.state.armorsSortDesc"
                            hide-default-footer :loading="armorsLoading"
                        >
                            <template v-slot:loading>
                                <v-container fluid class="pa-5">
                                    <v-layout wrap justify-center>
                                        <v-flex shrink>
                                            <v-progress-circular 
                                                indeterminate
                                                size="100" width="10" color="cfSecondary"
                                            >
                                                <v-icon large>mdi-rocket-launch-outline</v-icon>
                                            </v-progress-circular>
                                        </v-flex>
                                    </v-layout>
                                </v-container>
                            </template>
                            <template v-slot:default="props">
                                <v-layout wrap>
                                    <v-flex xs12 sm12 md6 lg4 xl4 v-for="(armor, i) in props.items" :key="i">
                                        <armor-overview 
                                            :armor="armor" class="fill-height" :style="`outline: solid 2px ${getArmorComponentOutlineColor(armor.ArmorGuid)}`"
                                            @armor-click="setEditingArmorComponent(armor)" 
                                            :disabled="armor.disabled"
                                        ></armor-overview>
                                    </v-flex>
                                </v-layout>
                            </template>
                        </v-data-iterator>
                        <v-layout wrap align-center>
                            <v-flex grow>
                                <v-pagination :length="$store.state.armorsPageCount" :total-visible="7"
                                    v-model="$store.state.armorsPageSync" color="cfPrimary" circle
                                ></v-pagination>
                            </v-flex>
                            <v-flex xs12 sm12 md4 lg3 xl3>
                                <v-select v-model="$store.state.armorsItemsPerPage"
                                    :items="$store.state.itemsPerPageOptions"
                                    outlined hide-details rounded dense item-value="value" item-text="text"
                                    label="Items Per Page" color="cfPrimary" item-color="cfPrimary"
                                ></v-select>
                            </v-flex>
                            <v-flex shrink>
                                <v-btn 
                                    block rounded color="cfPrimary" @click="updateCorvetteConfiguration('Armor')"
                                    :disabled="corvetteConfiguration.ArmorGuid === $store.state.editingCorvetteConfiguration.ArmorGuid || (!isCorvetteConfigurationValid && isArmorDisabled($store.state.editingCorvetteConfiguration.Armor))"
                                >
                                    Save
                                </v-btn>
                            </v-flex>
                            <v-flex shrink>
                                <v-btn 
                                    block rounded color="orange" @click="revertCorvetteConfiguration('Armor')"
                                    :disabled="corvetteConfiguration.ArmorGuid === $store.state.editingCorvetteConfiguration.ArmorGuid || isArmorDisabled(corvetteConfiguration.Armor)"
                                >
                                    Revert
                                </v-btn>
                            </v-flex>
                        </v-layout>
                    </v-expansion-panel-content>
                </v-expansion-panel>
                <v-expansion-panel class="rounded-xl mt-0 mb-2 expansionPanelBackground" :style="`outline: thin solid ${$vuetify.theme.dark ? $vuetify.theme.themes.dark['outline'] : $vuetify.theme.themes.light['outline']}`">
                    <v-expansion-panel-header v-slot="{ open }" class="pt-0 pb-0">
                        <v-container fluid class="pa-0">
                            <span class="title" v-if="open">Point Defense System</span>
                            <v-layout wrap align-center v-else>
                                <v-flex shrink>
                                    <span class="title">Point Defense System</span>
                                </v-flex>
                                <v-flex v-if="corvetteConfiguration.PointDefenseSystemGuid !== $store.state.editingCorvetteConfiguration.PointDefenseSystemGuid" shrink>
                                    <v-menu 
                                        open-on-hover allow-overflow max-width="500px"
                                        :close-on-content-click="false" nudge-bottom="3"
                                        offset-y content-class="rounded-xl elevation-20"
                                        :z-index="10000"
                                    >
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-chip class="subtitle-1 font-weight-bold" v-on="on" v-bind="attrs"
                                                :color="'cfPrimary'"
                                            >
                                                {{ $store.state.editingCorvetteConfiguration.PointDefenseSystemTitle }}
                                            </v-chip>
                                        </template>
                                        <point-defense-system-overview
                                            :pointDefenseSystem="$store.state.editingCorvetteConfiguration.PointDefenseSystem"
                                            :style="`border: 2px solid ${$vuetify.theme.themes.dark['cfPrimary']}`"
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
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-chip class="subtitle-1 font-weight-bold" v-on="on" v-bind="attrs"
                                                :color="isPointDefenseSystemDisabled(corvetteConfiguration.PointDefenseSystem) ? 'red' : 'orange'"
                                            >
                                                {{ corvetteConfiguration.PointDefenseSystemTitle }}
                                            </v-chip>
                                        </template>
                                        <point-defense-system-overview
                                            :pointDefenseSystem="corvetteConfiguration.PointDefenseSystem"
                                            :style="`border: 2px solid ${isPointDefenseSystemDisabled(corvetteConfiguration.PointDefenseSystem) ? 'red' : 'orange'}`"
                                            :allowClick="false"
                                        ></point-defense-system-overview>
                                    </v-menu>   
                                </v-flex>
                                <v-spacer />
                                <v-flex shrink class="mr-5">
                                    <v-layout wrap>
                                        <v-flex shrink v-if="corvetteConfiguration.PointDefenseSystemGuid !== $store.state.editingCorvetteConfiguration.PointDefenseSystemGuid">
                                            <v-btn 
                                                small rounded color="cfPrimary" @click.stop="updateCorvetteConfiguration('PointDefenseSystem')" :disabled="!isCorvetteConfigurationValid && isPointDefenseSystemDisabled($store.state.editingCorvetteConfiguration.PointDefenseSystem)"
                                            >
                                                Save
                                            </v-btn>
                                        </v-flex>
                                        <v-flex shrink v-if="corvetteConfiguration.PointDefenseSystemGuid !== $store.state.editingCorvetteConfiguration.PointDefenseSystemGuid">
                                            <v-btn 
                                                small rounded color="orange" @click.stop="revertCorvetteConfiguration('PointDefenseSystem')" :disabled="isPointDefenseSystemDisabled(corvetteConfiguration.PointDefenseSystem)"
                                            >
                                                Revert
                                            </v-btn>
                                        </v-flex>
                                    </v-layout>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <v-layout wrap align-center>
                            <v-flex xs12 sm12 md5 lg5 xl4>
                                <v-text-field v-model="$store.state.pointDefenseSystemsSearch"
                                    clearable outlined hide-details rounded dense
                                    prepend-icon="mdi-magnify" label="Search" color="cfPrimary"
                                ></v-text-field>
                            </v-flex>
                            <v-flex grow>
                                <v-combobox v-model="$store.state.pointDefenseSystemsSortBy"
                                    flat outlined hide-details rounded dense clearable
                                    label="Sort by" color="cfPrimary" item-color="cfPrimary" item-text="text" item-value="value"
                                    :items="$store.state.pointDefenseSystemsSortOptions" :menu-props="{maxHeight: 600}"
                                >
                                    <template v-slot:selection="{item}">
                                        <v-icon v-for="(icon, index) in item.icons" :key="index" :color="icon.iconColor" :size="icon.size" :class="icon.cssClass">{{icon.icon}}</v-icon>
                                        <span class="subtitle-2 ml-1">{{item.text}}</span>
                                    </template>
                                    <template v-slot:item="{item}">
                                        <v-layout align-center>
                                            <v-flex shrink>
                                                <v-icon v-for="(icon, index) in item.icons" :key="index" :color="icon.iconColor" :size="icon.size" :class="icon.cssClass">{{icon.icon}}</v-icon>
                                            </v-flex>
                                            <v-flex grow>
                                                <span class="subtitle-2 ml-1">{{item.text}}</span>
                                            </v-flex>
                                        </v-layout>
                                    </template>
                                </v-combobox>
                            </v-flex>
                            <v-flex shrink>
                                <v-btn-toggle rounded dense v-model="$store.state.pointDefenseSystemsSortDesc" mandatory>
                                    <v-btn depressed :value="false">
                                        <v-icon>mdi-arrow-up</v-icon>
                                    </v-btn>
                                    <v-btn depressed :value="true">
                                        <v-icon>mdi-arrow-down</v-icon>
                                    </v-btn>
                                </v-btn-toggle>
                            </v-flex>
                            <v-flex shrink>
                                <v-switch v-model="$store.state.pointDefenseSystemsShowOnlyFeasible" class="mt-0"
                                    hide-details dense label="Only Feasible" color="cfPrimary"
                                >
                                </v-switch>
                            </v-flex>
                        </v-layout>
                        <v-card class="rounded-xl mb-2 mt-2" outlined v-if="$store.state.configurationsCondensedView">
                            <v-data-table
                                :items="filteredPointDefenseSystemOptions"
                                :items-per-page.sync="$store.state.pointDefenseSystemsItemsPerPage"
                                :page.sync="$store.state.pointDefenseSystemsPageSync"
                                @page-count="$store.state.pointDefenseSystemsPageCount = $event"
                                :search.sync="$store.state.pointDefenseSystemsSearch" class="rounded-table clickable-rows"
                                :sort-by="$store.state.pointDefenseSystemsSortBy ? $store.state.pointDefenseSystemsSortBy.value : null"
                                :sort-desc.sync="$store.state.pointDefenseSystemsSortDesc" dense loader-height="0"
                                hide-default-footer :loading="pointDefenseSystemsLoading" :headers="$store.state.pointDefenseSystemsHeaders"
                            >
                                <template v-slot:loading>
                                    <v-container fluid class="pa-5">
                                        <v-layout wrap justify-center>
                                            <v-flex shrink>
                                                <v-progress-circular 
                                                    indeterminate
                                                    size="100" width="10" color="cfSecondary"
                                                >
                                                    <v-icon large>mdi-rocket-launch-outline</v-icon>
                                                </v-progress-circular>
                                            </v-flex>
                                        </v-layout>
                                    </v-container>
                                </template>
                                <template v-slot:item="{ item, headers }">
                                    <tr :style="`outline: solid 2px ${getPointDefenseSystemComponentOutlineColor(item.PointDefenseSystemGuid)}; outline-offset:-0.35rem; border-radius: 24px; ${item.disabled ? 'pointer-events:none;' : ''}`" 
                                        @click="item.disabled ? '' : setEditingPointDefenseSystemComponent(item)"
                                    >
                                        <td 
                                            :align="`${headers.find(h => h.value === 'Title').align}`" 
                                            :style="headers.find(h => h.value === 'Title').divider ? `${$vuetify.theme.dark ? 'border-right: 1px solid rgba(255,255,255,0.12)' : 'border-right: 1px solid rgba(0,0,0,0.12)'}` : ''"
                                        >
                                            <span class="subtitle-1" :style="`${item.disabled ? 'opacity: 0.5;' : ''}`">{{ item.Title }}</span>
                                        </td>
                                        <td :align="`${headers.find(h => h.value === 'ModulePointsCost').align}`"
                                            :style="headers.find(h => h.value === 'ModulePointsCost').divider ? `${$vuetify.theme.dark ? 'border-right: 1px solid rgba(255,255,255,0.12)' : 'border-right: 1px solid rgba(0,0,0,0.12)'}` : ''"
                                        >
                                            <span class="subtitle-1" :style="`${item.disabled ? 'opacity: 0.5;' : ''}`">{{ item.ModulePointsCost | decimal }}</span>
                                        </td>
                                        <td :align="`${headers.find(h => h.value === 'Mass').align}`"
                                            :style="headers.find(h => h.value === 'Mass').divider ? `${$vuetify.theme.dark ? 'border-right: 1px solid rgba(255,255,255,0.12)' : 'border-right: 1px solid rgba(0,0,0,0.12)'}` : ''"
                                        >
                                            <span class="subtitle-1" :style="`${item.disabled ? 'opacity: 0.5;' : ''}`">{{ item.Mass | decimal }}</span>
                                        </td>
                                        <td :align="`${headers.find(h => h.value === 'HeatCapacity').align}`"
                                            :style="headers.find(h => h.value === 'HeatCapacity').divider ? `${$vuetify.theme.dark ? 'border-right: 1px solid rgba(255,255,255,0.12)' : 'border-right: 1px solid rgba(0,0,0,0.12)'}` : ''"
                                        >
                                            <span class="subtitle-1" :style="`${item.disabled ? 'opacity: 0.5;' : ''}`">{{ item.HeatCapacity | decimal }}</span>
                                        </td>
                                        <td :align="`${headers.find(h => h.value === 'PowerLevelText').align}`"
                                            :style="headers.find(h => h.value === 'PowerLevelText').divider ? `${$vuetify.theme.dark ? 'border-right: 1px solid rgba(255,255,255,0.12)' : 'border-right: 1px solid rgba(0,0,0,0.12)'}` : ''"
                                        >
                                            <span class="subtitle-1" :style="`${item.disabled ? 'opacity: 0.5;' : ''}`">{{ item.PowerLevelText }}</span>
                                        </td>
                                        <td :align="`${headers.find(h => h.value === 'Efficiency').align}`"
                                            :style="headers.find(h => h.value === 'Efficiency').divider ? `${$vuetify.theme.dark ? 'border-right: 1px solid rgba(255,255,255,0.12)' : 'border-right: 1px solid rgba(0,0,0,0.12)'}` : ''"
                                        >
                                            <span class="subtitle-1" :style="`${item.disabled ? 'opacity: 0.5;' : ''}`">{{ item.Efficiency | decimal }}</span>
                                        </td>
                                        <td :align="`${headers.find(h => h.value === 'CountermeasureCapacity').align}`"
                                            :style="headers.find(h => h.value === 'CountermeasureCapacity').divider ? `${$vuetify.theme.dark ? 'border-right: 1px solid rgba(255,255,255,0.12)' : 'border-right: 1px solid rgba(0,0,0,0.12)'}` : ''"
                                        >
                                            <span class="subtitle-1" :style="`${item.disabled ? 'opacity: 0.5;' : ''}`">{{ item.CountermeasureCapacity | decimal }}</span>
                                        </td>
                                        <td :align="`${headers.find(h => h.value === 'CountermeasureRegenerationRate').align}`"
                                            :style="headers.find(h => h.value === 'CountermeasureRegenerationRate').divider ? `${$vuetify.theme.dark ? 'border-right: 1px solid rgba(255,255,255,0.12)' : 'border-right: 1px solid rgba(0,0,0,0.12)'}` : ''"
                                        >
                                            <span class="subtitle-1" :style="`${item.disabled ? 'opacity: 0.5;' : ''}`">{{ item.CountermeasureRegenerationRate | decimal }}</span>
                                        </td>
                                        <td :align="`${headers.find(h => h.value === 'Description').align}`"
                                            :style="headers.find(h => h.value === 'Description').divider ? `${$vuetify.theme.dark ? 'border-right: 1px solid rgba(255,255,255,0.12)' : 'border-right: 1px solid rgba(0,0,0,0.12)'}` : ''"
                                        >
                                            <v-tooltip top max-width="300" color="black" open-delay="700" content-class="rounded-xl">
                                                <template v-slot:activator="{ on, attrs }">
                                                    <v-chip 
                                                        color="grey" x-small v-on="on" v-bind="attrs" 
                                                        :style="`pointer-events:initial !important`"
                                                        class="pl-1 pr-1"
                                                    >
                                                        <v-icon>mdi-dots-horizontal</v-icon>
                                                    </v-chip>
                                                </template>
                                                <span class="subtitle-2 font-weight-normal font-italic">{{item.Description}}</span>
                                            </v-tooltip>
                                        </td>
                                    </tr>
                                </template>
                                <template v-slot:[`header.Mass`]="{ header }">
                                    <v-tooltip top max-width="300" color="black" open-delay="700" content-class="rounded-xl">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-icon v-for="(icon, index) in header.icons" :key="index" :color="icon.iconColor" :size="icon.size" :class="icon.cssClass" v-on="on" v-bind="attrs">{{icon.icon}}</v-icon>
                                        </template>
                                        <span class="subtitle-1">{{header.description}}</span>
                                    </v-tooltip>
                                </template>
                                <template v-slot:[`header.HeatCapacity`]="{ header }">
                                    <v-tooltip top max-width="300" color="black" open-delay="700" content-class="rounded-xl">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-icon v-for="(icon, index) in header.icons" :key="index" :color="icon.iconColor" :size="icon.size" :class="icon.cssClass" v-on="on" v-bind="attrs">{{icon.icon}}</v-icon>
                                        </template>
                                        <span class="subtitle-1">{{header.description}}</span>
                                    </v-tooltip>
                                </template>
                                <template v-slot:[`header.PowerLevelText`]="{ header }">
                                    <v-tooltip top max-width="300" color="black" open-delay="700" content-class="rounded-xl">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-icon v-for="(icon, index) in header.icons" :key="index" :color="icon.iconColor" :size="icon.size" :class="icon.cssClass" v-on="on" v-bind="attrs">{{icon.icon}}</v-icon>
                                        </template>
                                        <span class="subtitle-1">{{header.description}}</span>
                                    </v-tooltip>
                                </template>
                                <template v-slot:[`header.Efficiency`]="{ header }">
                                    <v-tooltip top max-width="300" color="black" open-delay="700" content-class="rounded-xl">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-icon v-for="(icon, index) in header.icons" :key="index" :color="icon.iconColor" :size="icon.size" :class="icon.cssClass" v-on="on" v-bind="attrs">{{icon.icon}}</v-icon>
                                        </template>
                                        <span class="subtitle-1">{{header.description}}</span>
                                    </v-tooltip>
                                </template>
                                <template v-slot:[`header.CountermeasureCapacity`]="{ header }">
                                    <v-tooltip top max-width="300" color="black" open-delay="700" content-class="rounded-xl">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-icon v-for="(icon, index) in header.icons" :key="index" :color="icon.iconColor" :size="icon.size" :class="icon.cssClass" v-on="on" v-bind="attrs">{{icon.icon}}</v-icon>
                                        </template>
                                        <span class="subtitle-1">{{header.description}}</span>
                                    </v-tooltip>
                                </template>
                                <template v-slot:[`header.CountermeasureRegenerationRate`]="{ header }">
                                    <v-tooltip top max-width="300" color="black" open-delay="700" content-class="rounded-xl">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-icon v-for="(icon, index) in header.icons" :key="icon.order || index" :color="icon.iconColor" :size="icon.size" :class="icon.cssClass" v-on="on" v-bind="attrs">{{icon.icon}}</v-icon>
                                        </template>
                                        <span class="subtitle-1">{{header.description}}</span>
                                    </v-tooltip>
                                </template>
                                <template v-slot:[`header.Description`]="{  }">
                                </template>
                            </v-data-table>
                        </v-card>
                        <v-data-iterator v-else
                            :items="filteredPointDefenseSystemOptions"
                            :items-per-page.sync="$store.state.pointDefenseSystemsItemsPerPage"
                            :page.sync="$store.state.pointDefenseSystemsPageSync"
                            @page-count="$store.state.pointDefenseSystemsPageCount = $event"
                            :search="$store.state.pointDefenseSystemsSearch"  class="mb-2 mt-2"
                            :sort-by="$store.state.pointDefenseSystemsSortBy ? $store.state.pointDefenseSystemsSortBy.value : null"
                            :sort-desc="$store.state.pointDefenseSystemsSortDesc"
                            hide-default-footer :loading="pointDefenseSystemsLoading"
                        >
                            <template v-slot:loading>
                                <v-container fluid class="pa-5">
                                    <v-layout wrap justify-center>
                                        <v-flex shrink>
                                            <v-progress-circular 
                                                indeterminate
                                                size="100" width="10" color="cfSecondary"
                                            >
                                                <v-icon large>mdi-rocket-launch-outline</v-icon>
                                            </v-progress-circular>
                                        </v-flex>
                                    </v-layout>
                                </v-container>
                            </template>
                            <template v-slot:default="props">
                                <v-layout wrap>
                                    <v-flex xs12 sm12 md6 lg4 xl4 v-for="(pointDefenseSystem, i) in props.items" :key="i">
                                        <point-defense-system-overview 
                                            :pointDefenseSystem="pointDefenseSystem" class="fill-height" :style="`outline: solid 2px ${getPointDefenseSystemComponentOutlineColor(pointDefenseSystem.PointDefenseSystemGuid)}`"
                                            @point-defense-system-click="setEditingPointDefenseSystemComponent(pointDefenseSystem)" 
                                            :disabled="pointDefenseSystem.disabled"
                                        ></point-defense-system-overview>
                                    </v-flex>
                                </v-layout>
                            </template>
                        </v-data-iterator>
                        <v-layout wrap align-center>
                            <v-flex grow>
                                <v-pagination :length="$store.state.pointDefenseSystemsPageCount" :total-visible="7"
                                    v-model="$store.state.pointDefenseSystemsPageSync" color="cfPrimary" circle
                                ></v-pagination>
                            </v-flex>
                            <v-flex xs12 sm12 md4 lg3 xl3>
                                <v-select v-model="$store.state.pointDefenseSystemsItemsPerPage"
                                    :items="$store.state.itemsPerPageOptions"
                                    outlined hide-details rounded dense item-value="value" item-text="text"
                                    label="Items Per Page" color="cfPrimary" item-color="cfPrimary"
                                ></v-select>
                            </v-flex>
                            <v-flex shrink>
                                <v-btn 
                                    block rounded color="cfPrimary" @click="updateCorvetteConfiguration('PointDefenseSystem')"
                                    :disabled="corvetteConfiguration.PointDefenseSystemGuid === $store.state.editingCorvetteConfiguration.PointDefenseSystemGuid || (!isCorvetteConfigurationValid && isPointDefenseSystemDisabled($store.state.editingCorvetteConfiguration.PointDefenseSystem))"
                                >
                                    Save
                                </v-btn>
                            </v-flex>
                            <v-flex shrink>
                                <v-btn 
                                    block rounded color="orange" @click="revertCorvetteConfiguration('PointDefenseSystem')"
                                    :disabled="corvetteConfiguration.PointDefenseSystemGuid === $store.state.editingCorvetteConfiguration.PointDefenseSystemGuid || isPointDefenseSystemDisabled(corvetteConfiguration.PointDefenseSystem)"
                                >
                                    Revert
                                </v-btn>
                            </v-flex>
                        </v-layout>
                    </v-expansion-panel-content>
                </v-expansion-panel>
                <v-expansion-panel class="rounded-xl mt-0 mb-2 expansionPanelBackground" :style="`outline: thin solid ${$vuetify.theme.dark ? $vuetify.theme.themes.dark['outline'] : $vuetify.theme.themes.light['outline']}`">
                    <v-expansion-panel-header v-slot="{ open }" class="pt-0 pb-0">
                        <v-container fluid class="pa-0">
                            <span class="title" v-if="open">Fuel System</span>
                            <v-layout wrap align-center v-else>
                                <v-flex shrink>
                                    <span class="title">Fuel System</span>
                                </v-flex>
                                <v-flex v-if="corvetteConfiguration.FuelSystemGuid !== $store.state.editingCorvetteConfiguration.FuelSystemGuid" shrink>
                                    <v-menu 
                                        open-on-hover allow-overflow max-width="500px"
                                        :close-on-content-click="false" nudge-bottom="3"
                                        offset-y content-class="rounded-xl elevation-20"
                                        :z-index="10000"
                                    >
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-chip class="subtitle-1 font-weight-bold" v-on="on" v-bind="attrs"
                                                :color="'cfPrimary'"
                                            >
                                                {{ $store.state.editingCorvetteConfiguration.FuelSystem.Title }}
                                            </v-chip>
                                        </template>
                                        <fuel-system-overview
                                            :fuelSystem="$store.state.editingCorvetteConfiguration.FuelSystem"
                                            :style="`border: 2px solid ${$vuetify.theme.themes.dark['cfPrimary']}`"
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
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-chip class="subtitle-1 font-weight-bold" v-on="on" v-bind="attrs"
                                                :color="isFuelSystemDisabled(corvetteConfiguration.FuelSystem) ? 'red' : 'orange'"
                                            >
                                                {{ corvetteConfiguration.FuelSystemTitle }}
                                            </v-chip>
                                        </template>
                                        <fuel-system-overview
                                            :fuelSystem="corvetteConfiguration.FuelSystem"
                                            :style="`border: 2px solid ${isFuelSystemDisabled(corvetteConfiguration.FuelSystem) ? 'red' : 'orange'}`"
                                            :allowClick="false"
                                        ></fuel-system-overview>
                                    </v-menu>   
                                </v-flex>
                                <v-spacer />
                                <v-flex shrink class="mr-5">
                                    <v-layout wrap>
                                        <v-flex shrink v-if="corvetteConfiguration.FuelSystemGuid !== $store.state.editingCorvetteConfiguration.FuelSystemGuid">
                                            <v-btn 
                                                small rounded color="cfPrimary" @click.stop="updateCorvetteConfiguration('FuelSystem')" :disabled="!isCorvetteConfigurationValid && isFuelSystemDisabled($store.state.editingCorvetteConfiguration.FuelSystem)"
                                            >
                                                Save
                                            </v-btn>
                                        </v-flex>
                                        <v-flex shrink v-if="corvetteConfiguration.FuelSystemGuid !== $store.state.editingCorvetteConfiguration.FuelSystemGuid">
                                            <v-btn 
                                                small rounded color="orange" @click.stop="revertCorvetteConfiguration('FuelSystem')" :disabled="isFuelSystemDisabled(corvetteConfiguration.FuelSystem)"
                                            >
                                                Revert
                                            </v-btn>
                                        </v-flex>
                                    </v-layout>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <v-layout wrap align-center>
                            <v-flex xs12 sm12 md5 lg5 xl4>
                                <v-text-field v-model="$store.state.fuelSystemsSearch"
                                    clearable outlined hide-details rounded dense
                                    prepend-icon="mdi-magnify" label="Search" color="cfPrimary"
                                ></v-text-field>
                            </v-flex>
                            <v-flex grow>
                                <v-combobox v-model="$store.state.fuelSystemsSortBy"
                                    flat outlined hide-details rounded dense clearable
                                    label="Sort by" color="cfPrimary" item-color="cfPrimary" item-text="text" item-value="value"
                                    :items="$store.state.fuelSystemsSortOptions" :menu-props="{maxHeight: 600}"
                                >
                                    <template v-slot:selection="{item}">
                                        <v-icon v-for="(icon, index) in item.icons" :key="index" :color="icon.iconColor" :size="icon.size" :class="icon.cssClass">{{icon.icon}}</v-icon>
                                        <span class="subtitle-2 ml-1">{{item.text}}</span>
                                    </template>
                                    <template v-slot:item="{item}">
                                        <v-layout align-center>
                                            <v-flex shrink>
                                                <v-icon v-for="(icon, index) in item.icons" :key="index" :color="icon.iconColor" :size="icon.size" :class="icon.cssClass">{{icon.icon}}</v-icon>
                                            </v-flex>
                                            <v-flex grow>
                                                <span class="subtitle-2 ml-1">{{item.text}}</span>
                                            </v-flex>
                                        </v-layout>
                                    </template>
                                </v-combobox>
                            </v-flex>
                            <v-flex shrink>
                                <v-btn-toggle rounded dense v-model="$store.state.fuelSystemsSortDesc" mandatory>
                                    <v-btn depressed :value="false">
                                        <v-icon>mdi-arrow-up</v-icon>
                                    </v-btn>
                                    <v-btn depressed :value="true">
                                        <v-icon>mdi-arrow-down</v-icon>
                                    </v-btn>
                                </v-btn-toggle>
                            </v-flex>
                            <v-flex shrink>
                                <v-switch v-model="$store.state.fuelSystemsShowOnlyFeasible" class="mt-0"
                                    hide-details dense label="Only Feasible" color="cfPrimary"
                                >
                                </v-switch>
                            </v-flex>
                        </v-layout>
                        <v-card class="rounded-xl mb-2 mt-2" outlined v-if="$store.state.configurationsCondensedView">
                            <v-data-table
                                :items="filteredFuelSystemOptions"
                                :items-per-page.sync="$store.state.fuelSystemsItemsPerPage"
                                :page.sync="$store.state.fuelSystemsPageSync"
                                @page-count="$store.state.fuelSystemsPageCount = $event"
                                :search.sync="$store.state.fuelSystemsSearch" class="rounded-table clickable-rows"
                                :sort-by="$store.state.fuelSystemsSortBy ? $store.state.fuelSystemsSortBy.value : null"
                                :sort-desc.sync="$store.state.fuelSystemsSortDesc" dense loader-height="0"
                                hide-default-footer :loading="fuelSystemsLoading" :headers="$store.state.fuelSystemsHeaders"
                            >
                                <template v-slot:loading>
                                    <v-container fluid class="pa-5">
                                        <v-layout wrap justify-center>
                                            <v-flex shrink>
                                                <v-progress-circular 
                                                    indeterminate
                                                    size="100" width="10" color="cfSecondary"
                                                >
                                                    <v-icon large>mdi-rocket-launch-outline</v-icon>
                                                </v-progress-circular>
                                            </v-flex>
                                        </v-layout>
                                    </v-container>
                                </template>
                                <template v-slot:item="{ item, headers }">
                                    <tr :style="`outline: solid 2px ${getFuelSystemComponentOutlineColor(item.FuelSystemGuid)}; outline-offset:-0.35rem; border-radius: 24px; ${item.disabled ? 'pointer-events:none;' : ''}`" 
                                        @click="item.disabled ? '' : setEditingFuelSystemComponent(item)"
                                    >
                                        <td 
                                            :align="`${headers.find(h => h.value === 'Title').align}`" 
                                            :style="headers.find(h => h.value === 'Title').divider ? `${$vuetify.theme.dark ? 'border-right: 1px solid rgba(255,255,255,0.12)' : 'border-right: 1px solid rgba(0,0,0,0.12)'}` : ''"
                                        >
                                            <span class="subtitle-1" :style="`${item.disabled ? 'opacity: 0.5;' : ''}`">{{ item.Title }}</span>
                                        </td>
                                        <td :align="`${headers.find(h => h.value === 'ModulePointsCost').align}`"
                                            :style="headers.find(h => h.value === 'ModulePointsCost').divider ? `${$vuetify.theme.dark ? 'border-right: 1px solid rgba(255,255,255,0.12)' : 'border-right: 1px solid rgba(0,0,0,0.12)'}` : ''"
                                        >
                                            <span class="subtitle-1" :style="`${item.disabled ? 'opacity: 0.5;' : ''}`">{{ item.ModulePointsCost | decimal }}</span>
                                        </td>
                                        <td :align="`${headers.find(h => h.value === 'Mass').align}`"
                                            :style="headers.find(h => h.value === 'Mass').divider ? `${$vuetify.theme.dark ? 'border-right: 1px solid rgba(255,255,255,0.12)' : 'border-right: 1px solid rgba(0,0,0,0.12)'}` : ''"
                                        >
                                            <span class="subtitle-1" :style="`${item.disabled ? 'opacity: 0.5;' : ''}`">{{ item.Mass | decimal }}</span>
                                        </td>
                                        <td :align="`${headers.find(h => h.value === 'HeatCapacity').align}`"
                                            :style="headers.find(h => h.value === 'HeatCapacity').divider ? `${$vuetify.theme.dark ? 'border-right: 1px solid rgba(255,255,255,0.12)' : 'border-right: 1px solid rgba(0,0,0,0.12)'}` : ''"
                                        >
                                            <span class="subtitle-1" :style="`${item.disabled ? 'opacity: 0.5;' : ''}`">{{ item.HeatCapacity | decimal }}</span>
                                        </td>
                                        <td :align="`${headers.find(h => h.value === 'FuelCapacity').align}`"
                                            :style="headers.find(h => h.value === 'FuelCapacity').divider ? `${$vuetify.theme.dark ? 'border-right: 1px solid rgba(255,255,255,0.12)' : 'border-right: 1px solid rgba(0,0,0,0.12)'}` : ''"
                                        >
                                            <span class="subtitle-1" :style="`${item.disabled ? 'opacity: 0.5;' : ''}`">{{ item.FuelCapacity | decimal }}</span>
                                        </td>
                                        <td :align="`${headers.find(h => h.value === 'FuelRegenerationRate').align}`"
                                            :style="headers.find(h => h.value === 'FuelRegenerationRate').divider ? `${$vuetify.theme.dark ? 'border-right: 1px solid rgba(255,255,255,0.12)' : 'border-right: 1px solid rgba(0,0,0,0.12)'}` : ''"
                                        >
                                            <span class="subtitle-1" :style="`${item.disabled ? 'opacity: 0.5;' : ''}`">{{ item.FuelRegenerationRate | decimal }}</span>
                                        </td>
                                        <td :align="`${headers.find(h => h.value === 'Description').align}`"
                                            :style="headers.find(h => h.value === 'Description').divider ? `${$vuetify.theme.dark ? 'border-right: 1px solid rgba(255,255,255,0.12)' : 'border-right: 1px solid rgba(0,0,0,0.12)'}` : ''"
                                        >
                                            <v-tooltip top max-width="300" color="black" open-delay="700" content-class="rounded-xl">
                                                <template v-slot:activator="{ on, attrs }">
                                                    <v-chip 
                                                        color="grey" x-small v-on="on" v-bind="attrs" 
                                                        :style="`pointer-events:initial !important`"
                                                        class="pl-1 pr-1"
                                                    >
                                                        <v-icon>mdi-dots-horizontal</v-icon>
                                                    </v-chip>
                                                </template>
                                                <span class="subtitle-2 font-weight-normal font-italic">{{item.Description}}</span>
                                            </v-tooltip>
                                        </td>
                                    </tr>
                                </template>
                                <template v-slot:[`header.Mass`]="{ header }">
                                    <v-tooltip top max-width="300" color="black" open-delay="700" content-class="rounded-xl">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-icon v-for="(icon, index) in header.icons" :key="index" :color="icon.iconColor" :size="icon.size" :class="icon.cssClass" v-on="on" v-bind="attrs">{{icon.icon}}</v-icon>
                                        </template>
                                        <span class="subtitle-1">{{header.description}}</span>
                                    </v-tooltip>
                                </template>
                                <template v-slot:[`header.HeatCapacity`]="{ header }">
                                    <v-tooltip top max-width="300" color="black" open-delay="700" content-class="rounded-xl">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-icon v-for="(icon, index) in header.icons" :key="index" :color="icon.iconColor" :size="icon.size" :class="icon.cssClass" v-on="on" v-bind="attrs">{{icon.icon}}</v-icon>
                                        </template>
                                        <span class="subtitle-1">{{header.description}}</span>
                                    </v-tooltip>
                                </template>
                                <template v-slot:[`header.FuelCapacity`]="{ header }">
                                    <v-tooltip top max-width="300" color="black" open-delay="700" content-class="rounded-xl">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-icon v-for="(icon, index) in header.icons" :key="index" :color="icon.iconColor" :size="icon.size" :class="icon.cssClass" v-on="on" v-bind="attrs">{{icon.icon}}</v-icon>
                                        </template>
                                        <span class="subtitle-1">{{header.description}}</span>
                                    </v-tooltip>
                                </template>
                                <template v-slot:[`header.FuelRegenerationRate`]="{ header }">
                                    <v-tooltip top max-width="300" color="black" open-delay="700" content-class="rounded-xl">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-icon v-for="(icon, index) in header.icons" :key="icon.order || index" :color="icon.iconColor" :size="icon.size" :class="icon.cssClass" v-on="on" v-bind="attrs">{{icon.icon}}</v-icon>
                                        </template>
                                        <span class="subtitle-1">{{header.description}}</span>
                                    </v-tooltip>
                                </template>
                                <template v-slot:[`header.Description`]="{  }">
                                </template>
                            </v-data-table>
                        </v-card>
                        <v-data-iterator v-else
                            :items="filteredFuelSystemOptions"
                            :items-per-page.sync="$store.state.fuelSystemsItemsPerPage"
                            :page.sync="$store.state.fuelSystemsPageSync"
                            @page-count="$store.state.fuelSystemsPageCount = $event"
                            :search="$store.state.fuelSystemsSearch" class="mt-2 mb-2"
                            :sort-by="$store.state.fuelSystemsSortBy ? $store.state.fuelSystemsSortBy.value : null"
                            :sort-desc="$store.state.fuelSystemsSortDesc"
                            hide-default-footer :loading="fuelSystemsLoading"
                        >
                            <template v-slot:loading>
                                <v-container fluid class="pa-5">
                                    <v-layout wrap justify-center>
                                        <v-flex shrink>
                                            <v-progress-circular 
                                                indeterminate
                                                size="100" width="10" color="cfSecondary"
                                            >
                                                <v-icon large>mdi-rocket-launch-outline</v-icon>
                                            </v-progress-circular>
                                        </v-flex>
                                    </v-layout>
                                </v-container>
                            </template>
                            <template v-slot:default="props">
                                <v-layout wrap>
                                    <v-flex xs12 sm12 md6 lg4 xl4 v-for="(fuelSystem, i) in props.items" :key="i">
                                        <fuel-system-overview 
                                            :fuelSystem="fuelSystem" class="fill-height" :style="`outline: solid 2px  ${getFuelSystemComponentOutlineColor(fuelSystem.FuelSystemGuid)}`"
                                            @fuel-system-click="setEditingFuelSystemComponent(fuelSystem)" 
                                            :disabled="fuelSystem.disabled"
                                        ></fuel-system-overview>
                                    </v-flex>
                                </v-layout>
                            </template>
                        </v-data-iterator>
                        <v-layout wrap align-center>
                            <v-flex grow>
                                <v-pagination :length="$store.state.fuelSystemsPageCount" :total-visible="7"
                                    v-model="$store.state.fuelSystemsPageSync" color="cfPrimary" circle
                                ></v-pagination>
                            </v-flex>
                            <v-flex xs12 sm12 md4 lg3 xl3>
                                <v-select v-model="$store.state.fuelSystemsItemsPerPage"
                                    :items="$store.state.itemsPerPageOptions"
                                    outlined hide-details rounded dense item-value="value" item-text="text"
                                    label="Items Per Page" color="cfPrimary" item-color="cfPrimary"
                                ></v-select>
                            </v-flex>
                            <v-flex shrink>
                                <v-btn 
                                    block rounded color="cfPrimary" @click="updateCorvetteConfiguration('FuelSystem')"
                                    :disabled="corvetteConfiguration.FuelSystemGuid === $store.state.editingCorvetteConfiguration.FuelSystemGuid || (!isCorvetteConfigurationValid && isFuelSystemDisabled($store.state.editingCorvetteConfiguration.FuelSystem))"
                                >
                                    Save
                                </v-btn>
                            </v-flex>
                            <v-flex shrink>
                                <v-btn 
                                    block rounded color="orange" @click="revertCorvetteConfiguration('FuelSystem')"
                                    :disabled="corvetteConfiguration.FuelSystemGuid === $store.state.editingCorvetteConfiguration.FuelSystemGuid || isFuelSystemDisabled(corvetteConfiguration.FuelSystem)"
                                >
                                    Revert
                                </v-btn>
                            </v-flex>
                        </v-layout>
                    </v-expansion-panel-content>
                </v-expansion-panel>
                <v-expansion-panel class="rounded-xl mt-0 mb-2 expansionPanelBackground" :style="`outline: thin solid ${$vuetify.theme.dark ? $vuetify.theme.themes.dark['outline'] : $vuetify.theme.themes.light['outline']}`">
                    <v-expansion-panel-header v-slot="{ open }" class="pt-0 pb-0">
                        <v-container fluid class="pa-0">
                            <span class="title" v-if="open">Thruster</span>
                            <v-layout wrap align-center v-else>
                                <v-flex shrink>
                                    <span class="title">Thruster</span>
                                </v-flex>
                                <v-flex v-if="corvetteConfiguration.ThrusterGuid !== $store.state.editingCorvetteConfiguration.ThrusterGuid" shrink>
                                    <v-menu 
                                        open-on-hover allow-overflow max-width="500px"
                                        :close-on-content-click="false" nudge-bottom="3"
                                        offset-y content-class="rounded-xl elevation-20"
                                        :z-index="10000"
                                    >
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-chip class="subtitle-1 font-weight-bold" v-on="on" v-bind="attrs"
                                                :color="'cfPrimary'"
                                            >
                                                {{ $store.state.editingCorvetteConfiguration.Thruster.Title }}
                                            </v-chip>
                                        </template>
                                        <thruster-overview
                                            :thruster="$store.state.editingCorvetteConfiguration.Thruster"
                                            :style="`border: 2px solid ${$vuetify.theme.themes.dark['cfPrimary']}`"
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
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-chip class="subtitle-1 font-weight-bold" v-on="on" v-bind="attrs"
                                                :color="isThrusterDisabled(corvetteConfiguration.Thruster) ? 'red' : 'orange'"
                                            >
                                                {{ corvetteConfiguration.ThrusterTitle }}
                                            </v-chip>
                                        </template>
                                        <thruster-overview
                                            :thruster="corvetteConfiguration.Thruster"
                                            :style="`border: 2px solid ${isThrusterDisabled(corvetteConfiguration.Thruster) ? 'red' : 'orange'}`"
                                            :allowClick="false"
                                        ></thruster-overview>
                                    </v-menu>   
                                </v-flex>
                                <v-spacer />
                                <v-flex shrink class="mr-5">
                                    <v-layout wrap>
                                        <v-flex shrink v-if="corvetteConfiguration.ThrusterGuid !== $store.state.editingCorvetteConfiguration.ThrusterGuid">
                                            <v-btn 
                                                small rounded color="cfPrimary" @click.stop="updateCorvetteConfiguration('Thruster')" :disabled="!isCorvetteConfigurationValid && isThrusterDisabled($store.state.editingCorvetteConfiguration.Thruster)"
                                            >
                                                Save
                                            </v-btn>
                                        </v-flex>
                                        <v-flex shrink v-if="corvetteConfiguration.ThrusterGuid !== $store.state.editingCorvetteConfiguration.ThrusterGuid">
                                            <v-btn 
                                                small rounded color="orange" @click.stop="revertCorvetteConfiguration('Thruster')" :disabled="isThrusterDisabled(corvetteConfiguration.Thruster)"
                                            >
                                                Revert
                                            </v-btn>
                                        </v-flex>
                                    </v-layout>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <v-layout wrap align-center>
                            <v-flex xs12 sm12 md5 lg5 xl4>
                                <v-text-field v-model="$store.state.thrustersSearch"
                                    clearable outlined hide-details rounded dense
                                    prepend-icon="mdi-magnify" label="Search" color="cfPrimary"
                                ></v-text-field>
                            </v-flex>
                            <v-flex grow>
                                <v-combobox v-model="$store.state.thrustersSortBy"
                                    flat outlined hide-details rounded dense clearable
                                    label="Sort by" color="cfPrimary" item-color="cfPrimary" item-text="text" item-value="value"
                                    :items="$store.state.thrustersSortOptions" :menu-props="{maxHeight: 600}"
                                >
                                    <template v-slot:selection="{item}">
                                        <v-icon v-for="(icon, index) in item.icons" :key="index" :color="icon.iconColor" :size="icon.size" :class="icon.cssClass">{{icon.icon}}</v-icon>
                                        <span class="subtitle-2 ml-1">{{item.text}}</span>
                                    </template>
                                    <template v-slot:item="{item}">
                                        <v-layout align-center>
                                            <v-flex shrink>
                                                <v-icon v-for="(icon, index) in item.icons" :key="index" :color="icon.iconColor" :size="icon.size" :class="icon.cssClass">{{icon.icon}}</v-icon>
                                            </v-flex>
                                            <v-flex grow>
                                                <span class="subtitle-2 ml-1">{{item.text}}</span>
                                            </v-flex>
                                        </v-layout>
                                    </template>
                                </v-combobox>
                            </v-flex>
                            <v-flex shrink>
                                <v-btn-toggle rounded dense v-model="$store.state.thrustersSortDesc" mandatory>
                                    <v-btn depressed :value="false">
                                        <v-icon>mdi-arrow-up</v-icon>
                                    </v-btn>
                                    <v-btn depressed :value="true">
                                        <v-icon>mdi-arrow-down</v-icon>
                                    </v-btn>
                                </v-btn-toggle>
                            </v-flex>
                            <v-flex shrink>
                                <v-switch v-model="$store.state.thrustersShowOnlyFeasible" class="mt-0"
                                    hide-details dense label="Only Feasible" color="cfPrimary"
                                >
                                </v-switch>
                            </v-flex>
                        </v-layout>
                        <v-card class="rounded-xl mb-2 mt-2" outlined v-if="$store.state.configurationsCondensedView">
                            <v-data-table
                                :items="filteredThrusterOptions"
                                :items-per-page.sync="$store.state.thrustersItemsPerPage"
                                :page.sync="$store.state.thrustersPageSync"
                                @page-count="$store.state.thrustersPageCount = $event"
                                :search.sync="$store.state.thrustersSearch" class="rounded-table clickable-rows"
                                :sort-by="$store.state.thrustersSortBy ? $store.state.thrustersSortBy.value : null"
                                :sort-desc.sync="$store.state.thrustersSortDesc" dense loader-height="0"
                                hide-default-footer :loading="thrustersLoading" :headers="$store.state.thrustersHeaders"
                            >
                                <template v-slot:loading>
                                    <v-container fluid class="pa-5">
                                        <v-layout wrap justify-center>
                                            <v-flex shrink>
                                                <v-progress-circular 
                                                    indeterminate
                                                    size="100" width="10" color="cfSecondary"
                                                >
                                                    <v-icon large>mdi-rocket-launch-outline</v-icon>
                                                </v-progress-circular>
                                            </v-flex>
                                        </v-layout>
                                    </v-container>
                                </template>
                                <template v-slot:item="{ item, headers }">
                                    <tr :style="`outline: solid 2px ${getThrusterComponentOutlineColor(item.ThrusterGuid)}; outline-offset:-0.35rem; border-radius: 24px; ${item.disabled ? 'pointer-events:none;' : ''}`" 
                                        @click="item.disabled ? '' : setEditingThrusterComponent(item)"
                                    >
                                        <td 
                                            :align="`${headers.find(h => h.value === 'Title').align}`" 
                                            :style="headers.find(h => h.value === 'Title').divider ? `${$vuetify.theme.dark ? 'border-right: 1px solid rgba(255,255,255,0.12)' : 'border-right: 1px solid rgba(0,0,0,0.12)'}` : ''"
                                        >
                                            <span class="subtitle-1" :style="`${item.disabled ? 'opacity: 0.5;' : ''}`">{{ item.Title }}</span>
                                        </td>
                                        <td :align="`${headers.find(h => h.value === 'ModulePointsCost').align}`"
                                            :style="headers.find(h => h.value === 'ModulePointsCost').divider ? `${$vuetify.theme.dark ? 'border-right: 1px solid rgba(255,255,255,0.12)' : 'border-right: 1px solid rgba(0,0,0,0.12)'}` : ''"
                                        >
                                            <span class="subtitle-1" :style="`${item.disabled ? 'opacity: 0.5;' : ''}`">{{ item.ModulePointsCost | decimal }}</span>
                                        </td>
                                        <td :align="`${headers.find(h => h.value === 'Mass').align}`"
                                            :style="headers.find(h => h.value === 'Mass').divider ? `${$vuetify.theme.dark ? 'border-right: 1px solid rgba(255,255,255,0.12)' : 'border-right: 1px solid rgba(0,0,0,0.12)'}` : ''"
                                        >
                                            <span class="subtitle-1" :style="`${item.disabled ? 'opacity: 0.5;' : ''}`">{{ item.Mass | decimal }}</span>
                                        </td>
                                        <td :align="`${headers.find(h => h.value === 'HeatCapacity').align}`"
                                            :style="headers.find(h => h.value === 'HeatCapacity').divider ? `${$vuetify.theme.dark ? 'border-right: 1px solid rgba(255,255,255,0.12)' : 'border-right: 1px solid rgba(0,0,0,0.12)'}` : ''"
                                        >
                                            <span class="subtitle-1" :style="`${item.disabled ? 'opacity: 0.5;' : ''}`">{{ item.HeatCapacity | decimal }}</span>
                                        </td>
                                        <td :align="`${headers.find(h => h.value === 'Thrust').align}`"
                                            :style="headers.find(h => h.value === 'Thrust').divider ? `${$vuetify.theme.dark ? 'border-right: 1px solid rgba(255,255,255,0.12)' : 'border-right: 1px solid rgba(0,0,0,0.12)'}` : ''"
                                        >
                                            <span class="subtitle-1" :style="`${item.disabled ? 'opacity: 0.5;' : ''}`">{{ item.Thrust | decimal }}</span>
                                        </td>
                                        <td :align="`${headers.find(h => h.value === 'Efficiency').align}`"
                                            :style="headers.find(h => h.value === 'Efficiency').divider ? `${$vuetify.theme.dark ? 'border-right: 1px solid rgba(255,255,255,0.12)' : 'border-right: 1px solid rgba(0,0,0,0.12)'}` : ''"
                                        >
                                            <span class="subtitle-1" :style="`${item.disabled ? 'opacity: 0.5;' : ''}`">{{ item.Efficiency | percent }}</span>
                                        </td>
                                        <td :align="`${headers.find(h => h.value === 'Description').align}`"
                                            :style="headers.find(h => h.value === 'Description').divider ? `${$vuetify.theme.dark ? 'border-right: 1px solid rgba(255,255,255,0.12)' : 'border-right: 1px solid rgba(0,0,0,0.12)'}` : ''"
                                        >
                                            <v-tooltip top max-width="300" color="black" open-delay="700" content-class="rounded-xl">
                                                <template v-slot:activator="{ on, attrs }">
                                                    <v-chip 
                                                        color="grey" x-small v-on="on" v-bind="attrs" 
                                                        :style="`pointer-events:initial !important`"
                                                        class="pl-1 pr-1"
                                                    >
                                                        <v-icon>mdi-dots-horizontal</v-icon>
                                                    </v-chip>
                                                </template>
                                                <span class="subtitle-2 font-weight-normal font-italic">{{item.Description}}</span>
                                            </v-tooltip>
                                        </td>
                                    </tr>
                                </template>
                                <template v-slot:[`header.Mass`]="{ header }">
                                    <v-tooltip top max-width="300" color="black" open-delay="700" content-class="rounded-xl">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-icon v-for="(icon, index) in header.icons" :key="index" :color="icon.iconColor" :size="icon.size" :class="icon.cssClass" v-on="on" v-bind="attrs">{{icon.icon}}</v-icon>
                                        </template>
                                        <span class="subtitle-1">{{header.description}}</span>
                                    </v-tooltip>
                                </template>
                                <template v-slot:[`header.HeatCapacity`]="{ header }">
                                    <v-tooltip top max-width="300" color="black" open-delay="700" content-class="rounded-xl">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-icon v-for="(icon, index) in header.icons" :key="index" :color="icon.iconColor" :size="icon.size" :class="icon.cssClass" v-on="on" v-bind="attrs">{{icon.icon}}</v-icon>
                                        </template>
                                        <span class="subtitle-1">{{header.description}}</span>
                                    </v-tooltip>
                                </template>
                                <template v-slot:[`header.Thrust`]="{ header }">
                                    <v-tooltip top max-width="300" color="black" open-delay="700" content-class="rounded-xl">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-icon v-for="(icon, index) in header.icons" :key="index" :color="icon.iconColor" :size="icon.size" :class="icon.cssClass" v-on="on" v-bind="attrs">{{icon.icon}}</v-icon>
                                        </template>
                                        <span class="subtitle-1">{{header.description}}</span>
                                    </v-tooltip>
                                </template>
                                <template v-slot:[`header.Efficiency`]="{ header }">
                                    <v-tooltip top max-width="300" color="black" open-delay="700" content-class="rounded-xl">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-icon v-for="(icon, index) in header.icons" :key="icon.order || index" :color="icon.iconColor" :size="icon.size" :class="icon.cssClass" v-on="on" v-bind="attrs">{{icon.icon}}</v-icon>
                                        </template>
                                        <span class="subtitle-1">{{header.description}}</span>
                                    </v-tooltip>
                                </template>
                                <template v-slot:[`header.Description`]="{  }">
                                </template>
                            </v-data-table>
                        </v-card>
                        <v-data-iterator v-else
                            :items="filteredThrusterOptions"
                            :items-per-page.sync="$store.state.thrustersItemsPerPage"
                            :page.sync="$store.state.thrustersPageSync"
                            @page-count="$store.state.thrustersPageCount = $event"
                            :search="$store.state.thrustersSearch" class="mt-2 mb-2"
                            :sort-by="$store.state.thrustersSortBy ? $store.state.thrustersSortBy.value : null"
                            :sort-desc="$store.state.thrustersSortDesc"
                            hide-default-footer :loading="thrustersLoading"
                        >
                            <template v-slot:loading>
                                <v-container fluid class="pa-5">
                                    <v-layout wrap justify-center>
                                        <v-flex shrink>
                                            <v-progress-circular 
                                                indeterminate
                                                size="100" width="10" color="cfSecondary"
                                            >
                                                <v-icon large>mdi-rocket-launch-outline</v-icon>
                                            </v-progress-circular>
                                        </v-flex>
                                    </v-layout>
                                </v-container>
                            </template>
                            <template v-slot:default="props">
                                <v-layout wrap>
                                    <v-flex xs12 sm12 md6 lg4 xl4 v-for="(thruster, i) in props.items" :key="i">
                                        <thruster-overview 
                                            :thruster="thruster" class="fill-height" :style="`outline: solid 2px ${getThrusterComponentOutlineColor(thruster.ThrusterGuid)}`"
                                            @thruster-click="setEditingThrusterComponent(thruster)" 
                                            :disabled="thruster.disabled"
                                        ></thruster-overview>
                                    </v-flex>
                                </v-layout>
                            </template>
                        </v-data-iterator>
                        <v-layout wrap align-center>
                            <v-flex grow>
                                <v-pagination :length="$store.state.thrustersPageCount" :total-visible="7"
                                    v-model="$store.state.thrustersPageSync" color="cfPrimary" circle
                                ></v-pagination>
                            </v-flex>
                            <v-flex xs12 sm12 md4 lg3 xl3>
                                <v-select v-model="$store.state.thrustersItemsPerPage"
                                    :items="$store.state.itemsPerPageOptions"
                                    outlined hide-details rounded dense item-value="value" item-text="text"
                                    label="Items Per Page" color="cfPrimary" item-color="cfPrimary"
                                ></v-select>
                            </v-flex>
                            <v-flex shrink>
                                <v-btn 
                                    block rounded color="cfPrimary" @click="updateCorvetteConfiguration('Thruster')"
                                    :disabled="corvetteConfiguration.ThrusterGuid === $store.state.editingCorvetteConfiguration.ThrusterGuid || (!isCorvetteConfigurationValid && isThrusterDisabled($store.state.editingCorvetteConfiguration.Thruster))"
                                >
                                    Save
                                </v-btn>
                            </v-flex>
                            <v-flex shrink>
                                <v-btn 
                                    block rounded color="orange" @click="revertCorvetteConfiguration('Thruster')"
                                    :disabled="corvetteConfiguration.ThrusterGuid === $store.state.editingCorvetteConfiguration.ThrusterGuid || isThrusterDisabled(corvetteConfiguration.Thruster)"
                                >
                                    Revert
                                </v-btn>
                            </v-flex>
                        </v-layout>
                    </v-expansion-panel-content>
                </v-expansion-panel>





                
                <v-expansion-panel class="rounded-xl mt-0 mb-2 expansionPanelBackground" :style="`outline: thin solid ${$vuetify.theme.dark ? $vuetify.theme.themes.dark['outline'] : $vuetify.theme.themes.light['outline']}`">
                    <v-expansion-panel-header v-slot="{ open }" class="pt-0 pb-0">
                        <v-container fluid class="pa-0">
                            <span class="title" v-if="open">Weapon Frame</span>
                            <v-layout wrap align-center v-else>
                                <v-flex shrink>
                                    <span class="title">Weapon Frame</span>
                                </v-flex>
                                <v-flex v-if="corvetteConfiguration.WeaponFrameGuid !== $store.state.editingCorvetteConfiguration.WeaponFrameGuid" shrink>
                                    <v-menu 
                                        open-on-hover allow-overflow max-width="500px"
                                        :close-on-content-click="false" nudge-bottom="3"
                                        offset-y content-class="rounded-xl elevation-20"
                                        :z-index="10000"
                                    >
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-chip class="subtitle-1 font-weight-bold" v-on="on" v-bind="attrs"
                                                :color="'cfPrimary'"
                                            >
                                                {{ $store.state.editingCorvetteConfiguration.WeaponFrameTitle }}
                                            </v-chip>
                                        </template>
                                        <weapon-frame-overview
                                            :weaponFrame="$store.state.editingCorvetteConfiguration.WeaponFrame"
                                            :style="`border: 2px solid ${$vuetify.theme.themes.dark['cfPrimary']}`"
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
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-chip class="subtitle-1 font-weight-bold" v-on="on" v-bind="attrs"
                                                :color="isWeaponFrameDisabled(corvetteConfiguration.WeaponFrame) ? 'red' : 'orange'"
                                            >
                                                {{ corvetteConfiguration.WeaponFrameTitle }}
                                            </v-chip>
                                        </template>
                                        <weapon-frame-overview
                                            :weaponFrame="corvetteConfiguration.WeaponFrame"
                                            :style="`border: 2px solid ${isWeaponFrameDisabled(corvetteConfiguration.WeaponFrame) ? 'red' : 'orange'}`"
                                            :allowClick="false"
                                        ></weapon-frame-overview>
                                    </v-menu>   
                                </v-flex>
                                <v-spacer />
                                <v-flex shrink class="mr-5">
                                    <v-layout wrap>
                                        <v-flex shrink v-if="corvetteConfiguration.WeaponFrameGuid !== $store.state.editingCorvetteConfiguration.WeaponFrameGuid">
                                            <v-btn 
                                                small rounded color="cfPrimary" @click.stop="updateCorvetteConfiguration('WeaponFrame')" :disabled="!isCorvetteConfigurationValid && isWeaponFrameDisabled($store.state.editingCorvetteConfiguration.WeaponFrame)"
                                            >
                                                Save
                                            </v-btn>
                                        </v-flex>
                                        <v-flex shrink v-if="corvetteConfiguration.WeaponFrameGuid !== $store.state.editingCorvetteConfiguration.WeaponFrameGuid">
                                            <v-btn 
                                                small rounded color="orange" @click.stop="revertCorvetteConfiguration('WeaponFrame')" :disabled="isWeaponFrameDisabled(corvetteConfiguration.WeaponFrame)"
                                            >
                                                Revert
                                            </v-btn>
                                        </v-flex>
                                    </v-layout>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <v-layout wrap align-center>
                            <v-flex xs12 sm12 md5 lg5 xl4>
                                <v-text-field v-model="$store.state.weaponFrame1sSearch"
                                    clearable outlined hide-details rounded dense
                                    prepend-icon="mdi-magnify" label="Search" color="cfPrimary"
                                ></v-text-field>
                            </v-flex>
                            <v-flex grow>
                                <v-combobox v-model="$store.state.weaponFrame1sSortBy"
                                    flat outlined hide-details rounded dense clearable
                                    label="Sort by" color="cfPrimary" item-color="cfPrimary" item-text="text" item-value="value"
                                    :items="$store.state.weaponFrame1sSortOptions" :menu-props="{maxHeight: 600}"
                                >
                                    <template v-slot:selection="{item}">
                                        <v-icon v-for="(icon, index) in item.icons" :key="index" :color="icon.iconColor" :size="icon.size" :class="icon.cssClass">{{icon.icon}}</v-icon>
                                        <span class="subtitle-2 ml-1">{{item.text}}</span>
                                    </template>
                                    <template v-slot:item="{item}">
                                        <v-layout align-center>
                                            <v-flex shrink>
                                                <v-icon v-for="(icon, index) in item.icons" :key="index" :color="icon.iconColor" :size="icon.size" :class="icon.cssClass">{{icon.icon}}</v-icon>
                                            </v-flex>
                                            <v-flex grow>
                                                <span class="subtitle-2 ml-1">{{item.text}}</span>
                                            </v-flex>
                                        </v-layout>
                                    </template>
                                </v-combobox>
                            </v-flex>
                            <v-flex shrink>
                                <v-btn-toggle rounded dense v-model="$store.state.weaponFrame1sSortDesc" mandatory>
                                    <v-btn depressed :value="false">
                                        <v-icon>mdi-arrow-up</v-icon>
                                    </v-btn>
                                    <v-btn depressed :value="true">
                                        <v-icon>mdi-arrow-down</v-icon>
                                    </v-btn>
                                </v-btn-toggle>
                            </v-flex>
                            <v-flex shrink>
                                <v-switch v-model="$store.state.weaponFrame1sShowOnlyFeasible" class="mt-0"
                                    hide-details dense label="Only Feasible" color="cfPrimary"
                                >
                                </v-switch>
                            </v-flex>
                        </v-layout>
                        <v-card class="rounded-xl mb-2 mt-2" outlined v-if="$store.state.configurationsCondensedView">
                            <v-data-table
                                :items="filteredWeaponFrameOptions"
                                :items-per-page.sync="$store.state.weaponFrame1sItemsPerPage"
                                :page.sync="$store.state.weaponFrame1sPageSync"
                                @page-count="$store.state.weaponFrame1sPageCount = $event"
                                :search.sync="$store.state.weaponFrame1sSearch" class="rounded-table clickable-rows"
                                :sort-by="$store.state.weaponFrame1sSortBy ? $store.state.weaponFrame1sSortBy.value : null"
                                :sort-desc.sync="$store.state.weaponFrame1sSortDesc" dense loader-height="0"
                                hide-default-footer :loading="weaponFrame1sLoading" :headers="$store.state.weaponFrame1sHeaders"
                            >
                                <template v-slot:loading>
                                    <v-container fluid class="pa-5">
                                        <v-layout wrap justify-center>
                                            <v-flex shrink>
                                                <v-progress-circular 
                                                    indeterminate
                                                    size="100" width="10" color="cfSecondary"
                                                >
                                                    <v-icon large>mdi-rocket-launch-outline</v-icon>
                                                </v-progress-circular>
                                            </v-flex>
                                        </v-layout>
                                    </v-container>
                                </template>
                                <template v-slot:item="{ item, headers }">
                                    <tr :style="`outline: solid 2px ${getWeaponFrameComponentOutlineColor(item.WeaponFrameGuid)}; outline-offset:-0.35rem; border-radius: 24px; ${item.disabled ? 'pointer-events:none;' : ''}`" 
                                        @click="item.disabled ? '' : setEditingWeaponFrameComponent(item)"
                                    >
                                        <td 
                                            :align="`${headers.find(h => h.value === 'Title').align}`" 
                                            :style="headers.find(h => h.value === 'Title').divider ? `${$vuetify.theme.dark ? 'border-right: 1px solid rgba(255,255,255,0.12)' : 'border-right: 1px solid rgba(0,0,0,0.12)'}` : ''"
                                        >
                                            <span class="subtitle-1" :style="`${item.disabled ? 'opacity: 0.5;' : ''}`">{{ item.Title }}</span>
                                        </td>
                                        <td :align="`${headers.find(h => h.value === 'WeaponFrameTypeText').align}`"
                                            :style="headers.find(h => h.value === 'WeaponFrameTypeText').divider ? `${$vuetify.theme.dark ? 'border-right: 1px solid rgba(255,255,255,0.12)' : 'border-right: 1px solid rgba(0,0,0,0.12)'}` : ''"
                                        >
                                            <span class="subtitle-1" :style="`${item.disabled ? 'opacity: 0.5;' : ''}`">{{ item.WeaponFrameTypeText }}</span>
                                        </td>
                                        <td :align="`${headers.find(h => h.value === 'ModulePointsCost').align}`"
                                            :style="headers.find(h => h.value === 'ModulePointsCost').divider ? `${$vuetify.theme.dark ? 'border-right: 1px solid rgba(255,255,255,0.12)' : 'border-right: 1px solid rgba(0,0,0,0.12)'}` : ''"
                                        >
                                            <span class="subtitle-1" :style="`${item.disabled ? 'opacity: 0.5;' : ''}`">{{ item.ModulePointsCost | decimal }}</span>
                                        </td>
                                        <td :align="`${headers.find(h => h.value === 'Mass').align}`"
                                            :style="headers.find(h => h.value === 'Mass').divider ? `${$vuetify.theme.dark ? 'border-right: 1px solid rgba(255,255,255,0.12)' : 'border-right: 1px solid rgba(0,0,0,0.12)'}` : ''"
                                        >
                                            <span class="subtitle-1" :style="`${item.disabled ? 'opacity: 0.5;' : ''}`">{{ item.Mass | decimal }}</span>
                                        </td>
                                        <td :align="`${headers.find(h => h.value === 'HeatCapacity').align}`"
                                            :style="headers.find(h => h.value === 'HeatCapacity').divider ? `${$vuetify.theme.dark ? 'border-right: 1px solid rgba(255,255,255,0.12)' : 'border-right: 1px solid rgba(0,0,0,0.12)'}` : ''"
                                        >
                                            <span class="subtitle-1" :style="`${item.disabled ? 'opacity: 0.5;' : ''}`">{{ item.HeatCapacity | decimal }}</span>
                                        </td>
                                        <td :align="`${headers.find(h => h.value === 'PowerLevelText').align}`"
                                            :style="headers.find(h => h.value === 'PowerLevelText').divider ? `${$vuetify.theme.dark ? 'border-right: 1px solid rgba(255,255,255,0.12)' : 'border-right: 1px solid rgba(0,0,0,0.12)'}` : ''"
                                        >
                                            <span class="subtitle-1" :style="`${item.disabled ? 'opacity: 0.5;' : ''}`">{{ item.PowerLevelText }}</span>
                                        </td>
                                        <td :align="`${headers.find(h => h.value === 'BaseMagSize').align}`"
                                            :style="headers.find(h => h.value === 'BaseMagSize').divider ? `${$vuetify.theme.dark ? 'border-right: 1px solid rgba(255,255,255,0.12)' : 'border-right: 1px solid rgba(0,0,0,0.12)'}` : ''"
                                        >
                                            <span class="subtitle-1" :style="`${item.disabled ? 'opacity: 0.5;' : ''}`">{{ item.BaseMagSize | decimal }}</span>
                                        </td>
                                        <td :align="`${headers.find(h => h.value === 'TargetingEfficiency').align}`"
                                            :style="headers.find(h => h.value === 'TargetingEfficiency').divider ? `${$vuetify.theme.dark ? 'border-right: 1px solid rgba(255,255,255,0.12)' : 'border-right: 1px solid rgba(0,0,0,0.12)'}` : ''"
                                        >
                                            <span class="subtitle-1" :style="`${item.disabled ? 'opacity: 0.5;' : ''}`">{{ item.TargetingEfficiency | percent }}</span>
                                        </td>
                                        <td :align="`${headers.find(h => h.value === 'OptimalRange').align}`"
                                            :style="headers.find(h => h.value === 'OptimalRange').divider ? `${$vuetify.theme.dark ? 'border-right: 1px solid rgba(255,255,255,0.12)' : 'border-right: 1px solid rgba(0,0,0,0.12)'}` : ''"
                                        >
                                            <span class="subtitle-1" :style="`${item.disabled ? 'opacity: 0.5;' : ''}`">{{ item.OptimalRange | decimal }}</span>
                                        </td>
                                        <td :align="`${headers.find(h => h.value === 'EffectiveRange').align}`"
                                            :style="headers.find(h => h.value === 'EffectiveRange').divider ? `${$vuetify.theme.dark ? 'border-right: 1px solid rgba(255,255,255,0.12)' : 'border-right: 1px solid rgba(0,0,0,0.12)'}` : ''"
                                        >
                                            <span class="subtitle-1" :style="`${item.disabled ? 'opacity: 0.5;' : ''}`">{{ item.EffectiveRange | decimal }}</span>
                                        </td>
                                        <td :align="`${headers.find(h => h.value === 'BaseCriticalHitChance').align}`"
                                            :style="headers.find(h => h.value === 'BaseCriticalHitChance').divider ? `${$vuetify.theme.dark ? 'border-right: 1px solid rgba(255,255,255,0.12)' : 'border-right: 1px solid rgba(0,0,0,0.12)'}` : ''"
                                        >
                                            <span class="subtitle-1" :style="`${item.disabled ? 'opacity: 0.5;' : ''}`">{{ item.BaseCriticalHitChance | percent }}</span>
                                        </td>
                                        <td :align="`${headers.find(h => h.value === 'Description').align}`"
                                            :style="headers.find(h => h.value === 'Description').divider ? `${$vuetify.theme.dark ? 'border-right: 1px solid rgba(255,255,255,0.12)' : 'border-right: 1px solid rgba(0,0,0,0.12)'}` : ''"
                                        >
                                            <v-tooltip top max-width="300" color="black" open-delay="700" content-class="rounded-xl">
                                                <template v-slot:activator="{ on, attrs }">
                                                    <v-chip 
                                                        color="grey" x-small v-on="on" v-bind="attrs" 
                                                        :style="`pointer-events:initial !important`"
                                                        class="pl-1 pr-1"
                                                    >
                                                        <v-icon>mdi-dots-horizontal</v-icon>
                                                    </v-chip>
                                                </template>
                                                <span class="subtitle-2 font-weight-normal font-italic">{{item.Description}}</span>
                                            </v-tooltip>
                                        </td>
                                    </tr>
                                </template>
                                <template v-slot:[`header.WeaponFrameTypeText`]="{ header }">
                                    <v-tooltip top max-width="300" color="black" open-delay="700" content-class="rounded-xl">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-icon v-for="(icon, index) in header.icons" :key="index" :color="icon.iconColor" :size="icon.size" :class="icon.cssClass" v-on="on" v-bind="attrs">{{icon.icon}}</v-icon>
                                        </template>
                                        <span class="subtitle-1">{{header.description}}</span>
                                    </v-tooltip>
                                </template>
                                <template v-slot:[`header.Mass`]="{ header }">
                                    <v-tooltip top max-width="300" color="black" open-delay="700" content-class="rounded-xl">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-icon v-for="(icon, index) in header.icons" :key="index" :color="icon.iconColor" :size="icon.size" :class="icon.cssClass" v-on="on" v-bind="attrs">{{icon.icon}}</v-icon>
                                        </template>
                                        <span class="subtitle-1">{{header.description}}</span>
                                    </v-tooltip>
                                </template>
                                <template v-slot:[`header.HeatCapacity`]="{ header }">
                                    <v-tooltip top max-width="300" color="black" open-delay="700" content-class="rounded-xl">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-icon v-for="(icon, index) in header.icons" :key="index" :color="icon.iconColor" :size="icon.size" :class="icon.cssClass" v-on="on" v-bind="attrs">{{icon.icon}}</v-icon>
                                        </template>
                                        <span class="subtitle-1">{{header.description}}</span>
                                    </v-tooltip>
                                </template>
                                <template v-slot:[`header.PowerLevelText`]="{ header }">
                                    <v-tooltip top max-width="300" color="black" open-delay="700" content-class="rounded-xl">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-icon v-for="(icon, index) in header.icons" :key="index" :color="icon.iconColor" :size="icon.size" :class="icon.cssClass" v-on="on" v-bind="attrs">{{icon.icon}}</v-icon>
                                        </template>
                                        <span class="subtitle-1">{{header.description}}</span>
                                    </v-tooltip>
                                </template>
                                <template v-slot:[`header.BaseMagSize`]="{ header }">
                                    <v-tooltip top max-width="300" color="black" open-delay="700" content-class="rounded-xl">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-icon v-for="(icon, index) in header.icons" :key="index" :color="icon.iconColor" :size="icon.size" :class="icon.cssClass" v-on="on" v-bind="attrs">{{icon.icon}}</v-icon>
                                        </template>
                                        <span class="subtitle-1">{{header.description}}</span>
                                    </v-tooltip>
                                </template>
                                <template v-slot:[`header.TargetingEfficiency`]="{ header }">
                                    <v-tooltip top max-width="300" color="black" open-delay="700" content-class="rounded-xl">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-icon v-for="(icon, index) in header.icons" :key="index" :color="icon.iconColor" :size="icon.size" :class="icon.cssClass" v-on="on" v-bind="attrs">{{icon.icon}}</v-icon>
                                        </template>
                                        <span class="subtitle-1">{{header.description}}</span>
                                    </v-tooltip>
                                </template>
                                <template v-slot:[`header.OptimalRange`]="{ header }">
                                    <v-tooltip top max-width="300" color="black" open-delay="700" content-class="rounded-xl">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-icon v-for="(icon, index) in header.icons" :key="icon.order || index" :color="icon.iconColor" :size="icon.size" :class="icon.cssClass" v-on="on" v-bind="attrs">{{icon.icon}}</v-icon>
                                        </template>
                                        <span class="subtitle-1">{{header.description}}</span>
                                    </v-tooltip>
                                </template>
                                <template v-slot:[`header.EffectiveRange`]="{ header }">
                                    <v-tooltip top max-width="300" color="black" open-delay="700" content-class="rounded-xl">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-icon v-for="(icon, index) in header.icons" :key="icon.order || index" :color="icon.iconColor" :size="icon.size" :class="icon.cssClass" v-on="on" v-bind="attrs">{{icon.icon}}</v-icon>
                                        </template>
                                        <span class="subtitle-1">{{header.description}}</span>
                                    </v-tooltip>
                                </template>
                                <template v-slot:[`header.BaseCriticalHitChance`]="{ header }">
                                    <v-tooltip top max-width="300" color="black" open-delay="700" content-class="rounded-xl">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-icon v-for="(icon, index) in header.icons" :key="icon.order || index" :color="icon.iconColor" :size="icon.size" :class="icon.cssClass" v-on="on" v-bind="attrs">{{icon.icon}}</v-icon>
                                        </template>
                                        <span class="subtitle-1">{{header.description}}</span>
                                    </v-tooltip>
                                </template>
                                <template v-slot:[`header.Description`]="{  }">
                                </template>
                            </v-data-table>
                        </v-card>
                        <v-data-iterator v-else
                            :items="filteredWeaponFrameOptions"
                            :items-per-page.sync="$store.state.weaponFrame1sItemsPerPage"
                            :page.sync="$store.state.weaponFrame1sPageSync"
                            @page-count="$store.state.weaponFrame1sPageCount = $event"
                            :search="$store.state.weaponFrame1sSearch" class="mt-2 mb-2"
                            :sort-by="$store.state.weaponFrame1sSortBy ? $store.state.weaponFrame1sSortBy.value : null"
                            :sort-desc="$store.state.weaponFrame1sSortDesc"
                            hide-default-footer :loading="weaponFrame1sLoading"
                        >
                            <template v-slot:loading>
                                <v-container fluid class="pa-5">
                                    <v-layout wrap justify-center>
                                        <v-flex shrink>
                                            <v-progress-circular 
                                                indeterminate
                                                size="100" width="10" color="cfSecondary"
                                            >
                                                <v-icon large>mdi-rocket-launch-outline</v-icon>
                                            </v-progress-circular>
                                        </v-flex>
                                    </v-layout>
                                </v-container>
                            </template>
                            <template v-slot:default="props">
                                <v-layout wrap>
                                    <v-flex xs12 sm12 md6 lg4 xl4 v-for="(weaponFrame1, i) in props.items" :key="i">
                                        <weapon-frame-overview 
                                            :weaponFrame="weaponFrame1" class="fill-height" :style="`outline: solid 2px ${getWeaponFrameComponentOutlineColor(weaponFrame1.WeaponFrameGuid)}`"
                                            @weapon-frame-click="setEditingWeaponFrameComponent(weaponFrame1)" 
                                            :disabled="weaponFrame1.disabled"
                                        ></weapon-frame-overview>
                                    </v-flex>
                                </v-layout>
                            </template>
                        </v-data-iterator>
                        <v-layout wrap align-center>
                            <v-flex grow>
                                <v-pagination :length="$store.state.weaponFrame1sPageCount" :total-visible="7"
                                    v-model="$store.state.weaponFrame1sPageSync" color="cfPrimary" circle
                                ></v-pagination>
                            </v-flex>
                            <v-flex xs12 sm12 md4 lg3 xl3>
                                <v-select v-model="$store.state.weaponFrame1sItemsPerPage"
                                    :items="$store.state.itemsPerPageOptions"
                                    outlined hide-details rounded dense item-value="value" item-text="text"
                                    label="Items Per Page" color="cfPrimary" item-color="cfPrimary"
                                ></v-select>
                            </v-flex>
                            <v-flex shrink>
                                <v-btn 
                                    block rounded color="cfPrimary" @click="updateCorvetteConfiguration('WeaponFrame')"
                                    :disabled="corvetteConfiguration.WeaponFrameGuid === $store.state.editingCorvetteConfiguration.WeaponFrameGuid || (!isCorvetteConfigurationValid && isWeaponFrameDisabled($store.state.editingCorvetteConfiguration.WeaponFrame))"
                                >
                                    Save
                                </v-btn>
                            </v-flex>
                            <v-flex shrink>
                                <v-btn 
                                    block rounded color="orange" @click="revertCorvetteConfiguration('WeaponFrame')"
                                    :disabled="corvetteConfiguration.WeaponFrameGuid === $store.state.editingCorvetteConfiguration.WeaponFrameGuid || isWeaponFrameDisabled(corvetteConfiguration.WeaponFrame)"
                                >
                                    Revert
                                </v-btn>
                            </v-flex>
                        </v-layout>
                    </v-expansion-panel-content>
                </v-expansion-panel>
                <v-expansion-panel class="rounded-xl mt-0 mb-2 expansionPanelBackground" :style="`outline: thin solid ${$vuetify.theme.dark ? $vuetify.theme.themes.dark['outline'] : $vuetify.theme.themes.light['outline']}`">
                    <v-expansion-panel-header v-slot="{ open }" class="pt-0 pb-0">
                        <v-container fluid class="pa-0">
                            <span class="title" v-if="open">Payload</span>
                            <v-layout wrap align-center v-else>
                                <v-flex shrink>
                                    <span class="title">Payload</span>
                                </v-flex>
                                <v-flex v-if="corvetteConfiguration.PayloadGuid !== $store.state.editingCorvetteConfiguration.PayloadGuid" shrink>
                                    <v-menu 
                                        open-on-hover allow-overflow max-width="500px"
                                        :close-on-content-click="false" nudge-bottom="3"
                                        offset-y content-class="rounded-xl elevation-20"
                                        :z-index="10000"
                                    >
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-chip class="subtitle-1 font-weight-bold" v-on="on" v-bind="attrs"
                                                :color="'cfPrimary'"
                                            >
                                                {{ $store.state.editingCorvetteConfiguration.PayloadTitle }}
                                            </v-chip>
                                        </template>
                                        <payload-overview
                                            :payload="$store.state.editingCorvetteConfiguration.Payload"
                                            :style="`border: 2px solid ${$vuetify.theme.themes.dark['cfPrimary']}`"
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
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-chip class="subtitle-1 font-weight-bold" v-on="on" v-bind="attrs"
                                                :color="isPayloadDisabled(corvetteConfiguration.Payload) ? 'red' : 'orange'"
                                            >
                                                {{ corvetteConfiguration.PayloadTitle }}
                                            </v-chip>
                                        </template>
                                        <payload-overview
                                            :payload="corvetteConfiguration.Payload"
                                            :style="`border: 2px solid ${isPayloadDisabled(corvetteConfiguration.Payload) ? 'red' : 'orange'}`"
                                            :allowClick="false"
                                        ></payload-overview>
                                    </v-menu>   
                                </v-flex>
                                <v-spacer />
                                <v-flex shrink class="mr-5">
                                    <v-layout wrap>
                                        <v-flex shrink v-if="corvetteConfiguration.PayloadGuid !== $store.state.editingCorvetteConfiguration.PayloadGuid">
                                            <v-btn 
                                                small rounded color="cfPrimary" @click.stop="updateCorvetteConfiguration('Payload')" :disabled="!isCorvetteConfigurationValid && isPayloadDisabled($store.state.editingCorvetteConfiguration.Payload)"
                                            >
                                                Save
                                            </v-btn>
                                        </v-flex>
                                        <v-flex shrink v-if="corvetteConfiguration.PayloadGuid !== $store.state.editingCorvetteConfiguration.PayloadGuid">
                                            <v-btn 
                                                small rounded color="orange" @click.stop="revertCorvetteConfiguration('Payload')" :disabled="isPayloadDisabled(corvetteConfiguration.Payload)"
                                            >
                                                Revert
                                            </v-btn>
                                        </v-flex>
                                    </v-layout>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <v-layout wrap align-center>
                            <v-flex xs12 sm12 md5 lg5 xl4>
                                <v-text-field v-model="$store.state.payload1sSearch"
                                    clearable outlined hide-details rounded dense
                                    prepend-icon="mdi-magnify" label="Search" color="cfPrimary"
                                ></v-text-field>
                            </v-flex>
                            <v-flex grow>
                                <v-combobox v-model="$store.state.payload1sSortBy"
                                    flat outlined hide-details rounded dense clearable
                                    label="Sort by" color="cfPrimary" item-color="cfPrimary" item-text="text" item-value="value"
                                    :items="$store.state.payload1sSortOptions" :menu-props="{maxHeight: 600}"
                                >
                                    <template v-slot:selection="{item}">
                                        <v-icon v-for="(icon, index) in item.icons" :key="index" :color="icon.iconColor" :size="icon.size" :class="icon.cssClass">{{icon.icon}}</v-icon>
                                        <span class="subtitle-2 ml-1">{{item.text}}</span>
                                    </template>
                                    <template v-slot:item="{item}">
                                        <v-layout align-center>
                                            <v-flex shrink>
                                                <v-icon v-for="(icon, index) in item.icons" :key="index" :color="icon.iconColor" :size="icon.size" :class="icon.cssClass">{{icon.icon}}</v-icon>
                                            </v-flex>
                                            <v-flex grow>
                                                <span class="subtitle-2 ml-1">{{item.text}}</span>
                                            </v-flex>
                                        </v-layout>
                                    </template>
                                </v-combobox>
                            </v-flex>
                            <v-flex shrink>
                                <v-btn-toggle rounded dense v-model="$store.state.payload1sSortDesc" mandatory>
                                    <v-btn depressed :value="false">
                                        <v-icon>mdi-arrow-up</v-icon>
                                    </v-btn>
                                    <v-btn depressed :value="true">
                                        <v-icon>mdi-arrow-down</v-icon>
                                    </v-btn>
                                </v-btn-toggle>
                            </v-flex>
                            <v-flex shrink>
                                <v-switch v-model="$store.state.payload1sShowOnlyFeasible" class="mt-0"
                                    hide-details dense label="Only Feasible" color="cfPrimary"
                                >
                                </v-switch>
                            </v-flex>
                        </v-layout>
                        <v-card class="rounded-xl mb-2 mt-2" outlined v-if="$store.state.configurationsCondensedView">
                            <v-data-table
                                :items="filteredPayloadOptions"
                                :items-per-page.sync="$store.state.payload1sItemsPerPage"
                                :page.sync="$store.state.payload1sPageSync"
                                @page-count="$store.state.payload1sPageCount = $event"
                                :search.sync="$store.state.payload1sSearch" class="rounded-table clickable-rows"
                                :sort-by="$store.state.payload1sSortBy ? $store.state.payload1sSortBy.value : null"
                                :sort-desc.sync="$store.state.payload1sSortDesc" dense loader-height="0"
                                hide-default-footer :loading="payload1sLoading" :headers="$store.state.payload1sHeaders"
                            >
                                <template v-slot:loading>
                                    <v-container fluid class="pa-5">
                                        <v-layout wrap justify-center>
                                            <v-flex shrink>
                                                <v-progress-circular 
                                                    indeterminate
                                                    size="100" width="10" color="cfSecondary"
                                                >
                                                    <v-icon large>mdi-rocket-launch-outline</v-icon>
                                                </v-progress-circular>
                                            </v-flex>
                                        </v-layout>
                                    </v-container>
                                </template>
                                <template v-slot:item="{ item, headers }">
                                    <tr :style="`outline: solid 2px ${getPayloadComponentOutlineColor(item.PayloadGuid)}; outline-offset:-0.35rem; border-radius: 24px; ${item.disabled ? 'pointer-events:none;' : ''}`" 
                                        @click="item.disabled ? '' : setEditingPayloadComponent(item)"
                                    >
                                        <td 
                                            :align="`${headers.find(h => h.value === 'Title').align}`" 
                                            :style="headers.find(h => h.value === 'Title').divider ? `${$vuetify.theme.dark ? 'border-right: 1px solid rgba(255,255,255,0.12)' : 'border-right: 1px solid rgba(0,0,0,0.12)'}` : ''"
                                        >
                                            <span class="subtitle-1" :style="`${item.disabled ? 'opacity: 0.5;' : ''}`">{{ item.Title }}</span>
                                        </td>
                                        <td :align="`${headers.find(h => h.value === 'ModulePointsCost').align}`"
                                            :style="headers.find(h => h.value === 'ModulePointsCost').divider ? `${$vuetify.theme.dark ? 'border-right: 1px solid rgba(255,255,255,0.12)' : 'border-right: 1px solid rgba(0,0,0,0.12)'}` : ''"
                                        >
                                            <span class="subtitle-1" :style="`${item.disabled ? 'opacity: 0.5;' : ''}`">{{ item.ModulePointsCost | decimal }}</span>
                                        </td>
                                        <td :align="`${headers.find(h => h.value === 'PayloadTypeText').align}`"
                                            :style="headers.find(h => h.value === 'PayloadTypeText').divider ? `${$vuetify.theme.dark ? 'border-right: 1px solid rgba(255,255,255,0.12)' : 'border-right: 1px solid rgba(0,0,0,0.12)'}` : ''"
                                        >
                                            <span class="subtitle-1" :style="`${item.disabled ? 'opacity: 0.5;' : ''}`">{{ item.PayloadTypeText }}</span>
                                        </td>
                                        <td :align="`${headers.find(h => h.value === 'WeaponFrameTypeText').align}`"
                                            :style="headers.find(h => h.value === 'WeaponFrameTypeText').divider ? `${$vuetify.theme.dark ? 'border-right: 1px solid rgba(255,255,255,0.12)' : 'border-right: 1px solid rgba(0,0,0,0.12)'}` : ''"
                                        >
                                            <span class="subtitle-1" :style="`${item.disabled ? 'opacity: 0.5;' : ''}`">{{ item.WeaponFrameTypeText }}</span>
                                        </td>
                                        <td :align="`${headers.find(h => h.value === 'PowerLevelText').align}`"
                                            :style="headers.find(h => h.value === 'PowerLevelText').divider ? `${$vuetify.theme.dark ? 'border-right: 1px solid rgba(255,255,255,0.12)' : 'border-right: 1px solid rgba(0,0,0,0.12)'}` : ''"
                                        >
                                            <span class="subtitle-1" :style="`${item.disabled ? 'opacity: 0.5;' : ''}`">{{ item.PowerLevelText }}</span>
                                        </td>
                                        <td :align="`${headers.find(h => h.value === 'BaseDamage').align}`"
                                            :style="headers.find(h => h.value === 'BaseDamage').divider ? `${$vuetify.theme.dark ? 'border-right: 1px solid rgba(255,255,255,0.12)' : 'border-right: 1px solid rgba(0,0,0,0.12)'}` : ''"
                                        >
                                            <span class="subtitle-1" :style="`${item.disabled ? 'opacity: 0.5;' : ''}`">{{ item.BaseDamage | decimal }}</span>
                                        </td>
                                        <td :align="`${headers.find(h => h.value === 'Velocity').align}`"
                                            :style="headers.find(h => h.value === 'Velocity').divider ? `${$vuetify.theme.dark ? 'border-right: 1px solid rgba(255,255,255,0.12)' : 'border-right: 1px solid rgba(0,0,0,0.12)'}` : ''"
                                        >
                                            <span class="subtitle-1" :style="`${item.disabled ? 'opacity: 0.5;' : ''}`">{{ item.Velocity | decimal }}</span>
                                        </td>
                                        <td :align="`${headers.find(h => h.value === 'KineticDamageBias').align}`"
                                            :style="headers.find(h => h.value === 'KineticDamageBias').divider ? `${$vuetify.theme.dark ? 'border-right: 1px solid rgba(255,255,255,0.12)' : 'border-right: 1px solid rgba(0,0,0,0.12)'}` : ''"
                                        >
                                            <span class="subtitle-1" :style="`${item.disabled ? 'opacity: 0.5;' : ''}`">{{ item.KineticDamageBias | percent }}</span>
                                        </td>
                                        <td :align="`${headers.find(h => h.value === 'EnergyDamageBias').align}`"
                                            :style="headers.find(h => h.value === 'EnergyDamageBias').divider ? `${$vuetify.theme.dark ? 'border-right: 1px solid rgba(255,255,255,0.12)' : 'border-right: 1px solid rgba(0,0,0,0.12)'}` : ''"
                                        >
                                            <span class="subtitle-1" :style="`${item.disabled ? 'opacity: 0.5;' : ''}`">{{ item.EnergyDamageBias | percent }}</span>
                                        </td>
                                        <td :align="`${headers.find(h => h.value === 'BaseCriticalHitMultiplier').align}`"
                                            :style="headers.find(h => h.value === 'BaseCriticalHitMultiplier').divider ? `${$vuetify.theme.dark ? 'border-right: 1px solid rgba(255,255,255,0.12)' : 'border-right: 1px solid rgba(0,0,0,0.12)'}` : ''"
                                        >
                                            <span class="subtitle-1" :style="`${item.disabled ? 'opacity: 0.5;' : ''}`">{{ item.BaseCriticalHitMultiplier | percent }}</span>
                                        </td>
                                        <td :align="`${headers.find(h => h.value === 'Description').align}`"
                                            :style="headers.find(h => h.value === 'Description').divider ? `${$vuetify.theme.dark ? 'border-right: 1px solid rgba(255,255,255,0.12)' : 'border-right: 1px solid rgba(0,0,0,0.12)'}` : ''"
                                        >
                                            <v-tooltip top max-width="300" color="black" open-delay="700" content-class="rounded-xl">
                                                <template v-slot:activator="{ on, attrs }">
                                                    <v-chip 
                                                        color="grey" x-small v-on="on" v-bind="attrs" 
                                                        :style="`pointer-events:initial !important`"
                                                        class="pl-1 pr-1"
                                                    >
                                                        <v-icon>mdi-dots-horizontal</v-icon>
                                                    </v-chip>
                                                </template>
                                                <span class="subtitle-2 font-weight-normal font-italic">{{item.Description}}</span>
                                            </v-tooltip>
                                        </td>
                                    </tr>
                                </template>
                                <template v-slot:[`header.PayloadTypeText`]="{ header }">
                                    <v-tooltip top max-width="300" color="black" open-delay="700" content-class="rounded-xl">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-icon v-for="(icon, index) in header.icons" :key="index" :color="icon.iconColor" :size="icon.size" :class="icon.cssClass" v-on="on" v-bind="attrs">{{icon.icon}}</v-icon>
                                        </template>
                                        <span class="subtitle-1">{{header.description}}</span>
                                    </v-tooltip>
                                </template>
                                <template v-slot:[`header.WeaponFrameTypeText`]="{ header }">
                                    <v-tooltip top max-width="300" color="black" open-delay="700" content-class="rounded-xl">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-icon v-for="(icon, index) in header.icons" :key="index" :color="icon.iconColor" :size="icon.size" :class="icon.cssClass" v-on="on" v-bind="attrs">{{icon.icon}}</v-icon>
                                        </template>
                                        <span class="subtitle-1">{{header.description}}</span>
                                    </v-tooltip>
                                </template>
                                <template v-slot:[`header.PowerLevelText`]="{ header }">
                                    <v-tooltip top max-width="300" color="black" open-delay="700" content-class="rounded-xl">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-icon v-for="(icon, index) in header.icons" :key="index" :color="icon.iconColor" :size="icon.size" :class="icon.cssClass" v-on="on" v-bind="attrs">{{icon.icon}}</v-icon>
                                        </template>
                                        <span class="subtitle-1">{{header.description}}</span>
                                    </v-tooltip>
                                </template>
                                <template v-slot:[`header.BaseDamage`]="{ header }">
                                    <v-tooltip top max-width="300" color="black" open-delay="700" content-class="rounded-xl">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-icon v-for="(icon, index) in header.icons" :key="index" :color="icon.iconColor" :size="icon.size" :class="icon.cssClass" v-on="on" v-bind="attrs">{{icon.icon}}</v-icon>
                                        </template>
                                        <span class="subtitle-1">{{header.description}}</span>
                                    </v-tooltip>
                                </template>
                                <template v-slot:[`header.Velocity`]="{ header }">
                                    <v-tooltip top max-width="300" color="black" open-delay="700" content-class="rounded-xl">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-icon v-for="(icon, index) in header.icons" :key="index" :color="icon.iconColor" :size="icon.size" :class="icon.cssClass" v-on="on" v-bind="attrs">{{icon.icon}}</v-icon>
                                        </template>
                                        <span class="subtitle-1">{{header.description}}</span>
                                    </v-tooltip>
                                </template>
                                <template v-slot:[`header.KineticDamageBias`]="{ header }">
                                    <v-tooltip top max-width="300" color="black" open-delay="700" content-class="rounded-xl">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-icon v-for="(icon, index) in header.icons" :key="index" :color="icon.iconColor" :size="icon.size" :class="icon.cssClass" v-on="on" v-bind="attrs">{{icon.icon}}</v-icon>
                                        </template>
                                        <span class="subtitle-1">{{header.description}}</span>
                                    </v-tooltip>
                                </template>
                                <template v-slot:[`header.EnergyDamageBias`]="{ header }">
                                    <v-tooltip top max-width="300" color="black" open-delay="700" content-class="rounded-xl">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-icon v-for="(icon, index) in header.icons" :key="index" :color="icon.iconColor" :size="icon.size" :class="icon.cssClass" v-on="on" v-bind="attrs">{{icon.icon}}</v-icon>
                                        </template>
                                        <span class="subtitle-1">{{header.description}}</span>
                                    </v-tooltip>
                                </template>
                                <template v-slot:[`header.BaseCriticalHitMultiplier`]="{ header }">
                                    <v-tooltip top max-width="300" color="black" open-delay="700" content-class="rounded-xl">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-icon v-for="(icon, index) in header.icons" :key="icon.order || index" :color="icon.iconColor" :size="icon.size" :class="icon.cssClass" v-on="on" v-bind="attrs">{{icon.icon}}</v-icon>
                                        </template>
                                        <span class="subtitle-1">{{header.description}}</span>
                                    </v-tooltip>
                                </template>
                                <template v-slot:[`header.Description`]="{  }">
                                </template>
                            </v-data-table>
                        </v-card>
                        <v-data-iterator v-else
                            :items="filteredPayloadOptions"
                            :items-per-page.sync="$store.state.payload1sItemsPerPage"
                            :page.sync="$store.state.payload1sPageSync"
                            @page-count="$store.state.payload1sPageCount = $event"
                            :search="$store.state.payload1sSearch" class="mt-2 mb-2"
                            :sort-by="$store.state.payload1sSortBy ? $store.state.payload1sSortBy.value : null"
                            :sort-desc="$store.state.payload1sSortDesc"
                            hide-default-footer :loading="payload1sLoading"
                        >
                            <template v-slot:loading>
                                <v-container fluid class="pa-5">
                                    <v-layout wrap justify-center>
                                        <v-flex shrink>
                                            <v-progress-circular 
                                                indeterminate
                                                size="100" width="10" color="cfSecondary"
                                            >
                                                <v-icon large>mdi-rocket-launch-outline</v-icon>
                                            </v-progress-circular>
                                        </v-flex>
                                    </v-layout>
                                </v-container>
                            </template>
                            <template v-slot:default="props">
                                <v-layout wrap>
                                    <v-flex xs12 sm12 md6 lg4 xl4 v-for="(payload1, i) in props.items" :key="i">
                                        <payload-overview 
                                            :payload="payload1" class="fill-height" :style="`outline: solid 2px ${getPayloadComponentOutlineColor(payload1.PayloadGuid)}`"
                                            @payload-click="setEditingPayloadComponent(payload1)" 
                                            :disabled="payload1.disabled"
                                        ></payload-overview>
                                    </v-flex>
                                </v-layout>
                            </template>
                        </v-data-iterator>
                        <v-layout wrap align-center>
                            <v-flex grow>
                                <v-pagination :length="$store.state.payload1sPageCount" :total-visible="7"
                                    v-model="$store.state.payload1sPageSync" color="cfPrimary" circle
                                ></v-pagination>
                            </v-flex>
                            <v-flex xs12 sm12 md4 lg3 xl3>
                                <v-select v-model="$store.state.payload1sItemsPerPage"
                                    :items="$store.state.itemsPerPageOptions"
                                    outlined hide-details rounded dense item-value="value" item-text="text"
                                    label="Items Per Page" color="cfPrimary" item-color="cfPrimary"
                                ></v-select>
                            </v-flex>
                            <v-flex shrink>
                                <v-btn 
                                    block rounded color="cfPrimary" @click="updateCorvetteConfiguration('Payload')"
                                    :disabled="corvetteConfiguration.PayloadGuid === $store.state.editingCorvetteConfiguration.PayloadGuid || (!isCorvetteConfigurationValid  && isPayloadDisabled($store.state.editingCorvetteConfiguration.Payload))"
                                >
                                    Save
                                </v-btn>
                            </v-flex>
                            <v-flex shrink>
                                <v-btn 
                                    block rounded color="orange" @click="revertCorvetteConfiguration('Payload')"
                                    :disabled="corvetteConfiguration.PayloadGuid === $store.state.editingCorvetteConfiguration.PayloadGuid || isPayloadDisabled(corvetteConfiguration.Payload)"
                                >
                                    Revert
                                </v-btn>
                            </v-flex>
                        </v-layout>
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>
        </v-layout>

        <v-card 
            flat class="rounded-xl" 
            :class="$store.state.corvetteConfigurationWeaponChartsPinned ? 'sticky-weapon-chart elevation-20' : 'background'"
            :style="[
                {outline: `thin solid ${$vuetify.theme.dark ? $vuetify.theme.themes.dark['outline'] : $vuetify.theme.themes.light['outline']}`},
                // {top: `${$store.state.corvetteConfigurationStatsPinned ? '60px' : ''}`},
                // {position: `${$store.state.corvetteConfigurationStatsPinned ? 'sticky' : ''}`},
            ]"
        >
            <v-container grid-list-sm fluid>
                <v-layout wrap align-center>
                    <v-flex shrink>
                        <v-btn small fab @click.stop="toggleWeaponChartsPinned()" top left elevation="3">
                            <v-icon v-if="$store.state.corvetteConfigurationWeaponChartsPinned">mdi-pin-off</v-icon>
                            <v-icon v-else>mdi-pin</v-icon>
                        </v-btn>
                    </v-flex>
                    <v-flex grow>
                        <v-layout wrap align-center>
                            <v-flex shrink>
                                Target <v-icon color="green">mdi-weather-windy</v-icon> = {{$store.state.configurationsTargetManeuverability | decimal5}}
                            </v-flex>
                            <v-flex grow>
                                <v-slider 
                                    v-model="$store.state.configurationsTargetManeuverability" 
                                    color="cfPrimary"
                                    min="0.0005" max="0.3" step="0.00025"
                                    hide-details track-color="grey"
                                ></v-slider>
                            </v-flex>
                            <v-flex shrink>
                                <v-dialog 
                                    open-on-click allow-overflow max-width="500px"
                                    :close-on-content-click="false" content-class="rounded-xl elevation-20" 
                                    origin="bottom right" v-model="weaponChartsSettingsDialogOpen"
                                >
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn small fab bottom right v-on="on" v-bind="attrs" text>
                                            <v-icon large color="grey">mdi-cog</v-icon>
                                        </v-btn>
                                    </template>
                                    <v-card outlined class="rounded-xl elevation-20" width="500px" max-width="500px">
                                        <v-container fluid class="pa-0">
                                            <v-layout wrap align-center class="pa-4">
                                                <v-flex grow>
                                                    <span class="title">Chart Settings</span>
                                                </v-flex>
                                                <v-flex shrink>
                                                    <v-btn small fab top right text @click="weaponChartsSettingsDialogOpen = false">
                                                        <v-icon color="red">mdi-close</v-icon>
                                                    </v-btn>
                                                </v-flex>
                                            </v-layout>
                                            <v-divider/>
                                            <v-layout wrap align-center class="pa-4">
                                                <v-flex xs12>
                                                    <v-switch v-model="$store.state.configurationsShowWeaponModelCharts"
                                                        hide-details color="cfPrimary" dense class="mt-0" label="Model Charts"
                                                    ></v-switch>
                                                </v-flex>
                                                <v-flex xs12 class="pr-2">
                                                    <v-slider 
                                                        v-model="$store.state.configurationsWeaponModelChartsHeight" 
                                                        color="cfPrimary" label="Height"
                                                        min="200" max="400" step="5"
                                                        hide-details track-color="grey"
                                                    ></v-slider>
                                                </v-flex>
                                            </v-layout>
                                            <v-divider/>
                                            <v-layout wrap align-center class="pa-4">
                                                <v-flex xs12>
                                                    <v-switch v-model="$store.state.configurationsShowWeaponDamageCharts"
                                                        hide-details color="cfPrimary" dense class="mt-0" label="Damage Charts"
                                                    ></v-switch>
                                                </v-flex>
                                                <v-flex xs12 class="pr-2">
                                                    <v-slider 
                                                        v-model="$store.state.configurationsWeaponDamageChartsHeight" 
                                                        color="cfPrimary" label="Height"
                                                        min="200" max="400" step="5"
                                                        hide-details track-color="grey"
                                                    ></v-slider>
                                                </v-flex>
                                            </v-layout>
                                        </v-container>
                                    </v-card>
                                </v-dialog> 
                            </v-flex>
                        </v-layout>
                    </v-flex>
                </v-layout>
                <v-layout wrap>
                    <v-flex xs12 class="pt-0 pb-0">
                        <v-layout wrap justify-center>
                            <v-flex xs12 class="text-center pt-0 pb-0">
                                <span class="subtitle-2">Weapon 1</span><br/>
                                <span class="title font-weight-bold">
                                    {{`${this.$store.state.editingCorvetteConfiguration.WeaponFrame.Title} & ${this.$store.state.editingCorvetteConfiguration.Payload.Title}`}}
                                </span>
                            </v-flex>
                            <v-flex xs12 md6 class="pt-0 pb-0" v-show="$store.state.configurationsShowWeaponModelCharts" v-if="!isWeaponFrameDisabled($store.state.editingCorvetteConfiguration.WeaponFrame) && !isPayloadDisabled($store.state.editingCorvetteConfiguration.Payload)">
                                <weapon-model-chart
                                    :weaponFrame="$store.state.editingCorvetteConfiguration.WeaponFrame"
                                    :payload="$store.state.editingCorvetteConfiguration.Payload"
                                ></weapon-model-chart>
                            </v-flex>
                            <v-flex xs12 md6 class="pt-0 pb-0" v-show="$store.state.configurationsShowWeaponDamageCharts" v-if="!isWeaponFrameDisabled($store.state.editingCorvetteConfiguration.WeaponFrame) && !isPayloadDisabled($store.state.editingCorvetteConfiguration.Payload)">
                                <weapon-damage-chart
                                    :weaponFrame="$store.state.editingCorvetteConfiguration.WeaponFrame"
                                    :payload="$store.state.editingCorvetteConfiguration.Payload"
                                ></weapon-damage-chart>
                            </v-flex>
                            <v-flex xs12 v-else>
                                <v-alert type="error" class="rounded-xl ma-2" text outlined dense>
                                    Weapon 1 is invald. Please fix the problems to display the charts for Weapon 1.
                                </v-alert>
                            </v-flex>
                        </v-layout>
                    </v-flex>
                </v-layout>
                <v-layout wrap align-center v-show="$store.state.configurationsShowWeaponDamageCharts">
                    <v-flex grow class="pt-0">
                        <v-layout wrap align-center>
                            <v-flex shrink>
                                Target Armor <v-icon>mdi-ammunition</v-icon> = {{$store.state.configurationsTargetArmorKineticResistance | decimal2}}
                            </v-flex>
                            <v-flex grow>
                                <v-slider 
                                    v-model="$store.state.configurationsTargetArmorKineticResistance" 
                                    color="cfPrimary"
                                    min="0.0" max="1" step="0.01"
                                    hide-details track-color="grey"
                                ></v-slider>
                            </v-flex>
                            <v-flex shrink>
                                Target Armor <v-icon>mdi-heat-wave</v-icon> = {{$store.state.configurationsTargetArmorEnergyResistance | decimal2}}
                            </v-flex>
                            <v-flex grow>
                                <v-slider 
                                    v-model="$store.state.configurationsTargetArmorEnergyResistance" 
                                    color="cfPrimary"
                                    min="0.0" max="1" step="0.01"
                                    hide-details track-color="grey"
                                ></v-slider>
                            </v-flex>
                        </v-layout>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card>
    </v-container>
    <v-container fluid grid-list-sm v-else>

    </v-container>
</template>

<script>
import { mapState } from 'vuex';
import { CorvetteConfigurationDto } from '../../models/Configurations/DTOs/CorvetteConfigurationDto'
import { CorvetteConfigurationRepository, CorvetteRepository, ArmorRepository, PointDefenseSystemRepository, FuelSystemRepository, ThrusterRepository, WeaponFrameRepository, PayloadRepository } from '../../repositories';
import CorvetteOverview from '../Corvette/CorvetteOverview.vue';
import ArmorOverview from '../Armor/ArmorOverview.vue';
import PointDefenseSystemOverview from '../PointDefenseSystem/PointDefenseSystemOverview.vue';
import FuelSystemOverview from '../FuelSystem/FuelSystemOverview.vue';
import ThrusterOverview from '../Thruster/ThrusterOverview.vue';
import WeaponFrameOverview from '../WeaponFrame/WeaponFrameOverview.vue';
import PayloadOverview from '../Payload/PayloadOverview.vue';
import WeaponModelChart from '../Charts/WeaponModelChart.vue';
import WeaponDamageChart from '../Charts/WeaponDamageChart.vue';
import { CorvetteModel } from '../../models/Corvette/CorvetteModel';
import { ArmorModel } from '../../models/Armor/ArmorModel';
import { PointDefenseSystemModel } from '../../models/PointDefenseSystem/PointDefenseSystemModel';
import { FuelSystemModel } from '../../models/FuelSystem/FuelSystemModel';
import { ThrusterModel } from '../../models/Thruster/ThrusterModel';
import { WeaponFrameModel } from '../../models/WeaponFrame/WeaponFrameModel';
import { PayloadModel } from '../../models/Payload/PayloadModel';

export default {
    name: "CorvetteConfiguration",

    components: {
        CorvetteOverview,
        ArmorOverview,
        PointDefenseSystemOverview,
        FuelSystemOverview,
        ThrusterOverview,
        WeaponFrameOverview,
        PayloadOverview,
        WeaponModelChart,
        WeaponDamageChart,
    },

    props: {
        corvetteConfiguration: {
            type: Object,
            required: true
        }
    },

    data: () => ({
        problemSummaryDailogOpen: false,
        weaponChartsSettingsDialogOpen: false,

        corvetteOptions: [],
        armorOptions: [],
        pointDefenseSystemOptions: [],
        fuelSystemOptions: [],
        thrusterOptions: [],
        weaponFrameOptions: [],
        payloadOptions: [],

        corvettesLoading: false,
        armorsLoading: false,
        pointDefenseSystemsLoading: false,
        fuelSystemsLoading: false,
        thrustersLoading: false,
        weaponFrame1sLoading: false,
        payload1sLoading: false,

        corvetteConfigurationRepository: new CorvetteConfigurationRepository(),
        corvetteRepository: new CorvetteRepository(),
        armorRepository: new ArmorRepository(),
        pointDefenseSystemRepository: new PointDefenseSystemRepository(),
        fuelSystemRepository: new FuelSystemRepository(),
        thrusterRepository: new ThrusterRepository(),
        weaponFrameRepository: new WeaponFrameRepository(),
        payloadRepository: new PayloadRepository(),

    }),

    computed: {
        ...mapState([
            'validationRules',
        ]),

        vigorCostDifference() {
            return this.$store.state.editingCorvetteConfiguration.Corvette.BaseVigorCost - this.corvetteConfiguration.Corvette.BaseVigorCost;
        },
        hullMassDifference() {
            return this.$store.state.editingCorvetteConfiguration.Corvette.HullMass - this.corvetteConfiguration.Corvette.HullMass;
        },
        totalMassDifference() {
            return this.$store.state.editingCorvetteConfiguration.TotalMass - this.corvetteConfiguration.TotalMass;
        },
        totalCrewCostDifference() {
            return this.$store.state.editingCorvetteConfiguration.TotalCrewCost - this.corvetteConfiguration.TotalCrewCost;
        },
        totalHeatCapacityDifference() {
            return this.$store.state.editingCorvetteConfiguration.TotalHeatCapacity - this.corvetteConfiguration.TotalHeatCapacity;
        },
        maneuverabilityDifference() {
            return this.$store.state.editingCorvetteConfiguration.Maneuverability - this.corvetteConfiguration.Maneuverability;
        },
        fuelConsumptionRateDifference() {
            return this.$store.state.editingCorvetteConfiguration.FuelSystemFuelConsumptionRate - this.corvetteConfiguration.FuelSystemFuelConsumptionRate;
        },
        fuelCapacityDifference() {
            return this.$store.state.editingCorvetteConfiguration.FuelSystemFuelCapacity - this.corvetteConfiguration.FuelSystemFuelCapacity;
        },
        fuelRegenerationRateDifference() {
            return this.$store.state.editingCorvetteConfiguration.FuelSystemFuelRegenerationRate - this.corvetteConfiguration.FuelSystemFuelRegenerationRate;
        },
        corvetteConfigurationModulePointsUsageColor() {
            if (this.$store.state.editingCorvetteConfiguration.TotalModulePointsUsage < this.$store.state.editingCorvetteConfiguration.CorvetteModulePointLimit) {
                return 'lime darken-3';
            } else if (this.$store.state.editingCorvetteConfiguration.TotalModulePointsUsage === this.$store.state.editingCorvetteConfiguration.CorvetteModulePointLimit) {
                return 'green';
            } else if (this.$store.state.editingCorvetteConfiguration.TotalModulePointsUsage > this.$store.state.editingCorvetteConfiguration.CorvetteModulePointLimit) {
                return 'red';
            } else {
                return '';
            }
        },

        filteredCorvetteOptions() {
            if (this.corvetteOptions.length <= 0) {
                return [];
            }
            var filtered = [];
            this.corvetteOptions.forEach((corvette) => {
                corvette.disabled = this.isCorvetteDisabled(corvette);

                if (this.$store.state.corvettesShowOnlyFeasible) {
                    if (!corvette.disabled) {
                        filtered.push(corvette)
                    }
                } else {
                    filtered.push(corvette)
                }
            });
            this.validateCurrentSelectionFeasibility('Corvette')
            return filtered;
        },
        filteredArmorOptions() {
            if (this.armorOptions.length <= 0) {
                return [];
            }
            var filtered = [];
            this.armorOptions.forEach((armor) => {
                armor.disabled = this.isArmorDisabled(armor);

                if (this.$store.state.armorsShowOnlyFeasible) {
                    if (!armor.disabled) {
                        filtered.push(armor)
                    }
                } else {
                    filtered.push(armor)
                }
            });
            this.validateCurrentSelectionFeasibility('Armor')
            return filtered;
        },
        filteredPointDefenseSystemOptions() {
            if (this.pointDefenseSystemOptions.length <= 0) {
                return [];
            }
            var filtered = [];
            this.pointDefenseSystemOptions.forEach((pointDefenseSystem) => {
                pointDefenseSystem.disabled = this.isPointDefenseSystemDisabled(pointDefenseSystem);

                if (this.$store.state.pointDefenseSystemsShowOnlyFeasible) {
                    if (!pointDefenseSystem.disabled) {
                        filtered.push(pointDefenseSystem)
                    }
                } else {
                    filtered.push(pointDefenseSystem)
                }
            });
            this.validateCurrentSelectionFeasibility('PointDefenseSystem')
            return filtered;
        },
        filteredFuelSystemOptions() {
            if (this.fuelSystemOptions.length <= 0) {
                return [];
            }
            var filtered = [];
            this.fuelSystemOptions.forEach((fuelSystem) => {
                fuelSystem.disabled = this.isFuelSystemDisabled(fuelSystem);

                if (this.$store.state.fuelSystemsShowOnlyFeasible) {
                    if (!fuelSystem.disabled) {
                        filtered.push(fuelSystem)
                    }
                } else {
                    filtered.push(fuelSystem)
                }
            });
            this.validateCurrentSelectionFeasibility('FuelSystem')
            return filtered;
        },
        filteredThrusterOptions() {
            if (this.thrusterOptions.length <= 0) {
                return [];
            }
            var filtered = [];
            this.thrusterOptions.forEach((thruster) => {
                thruster.disabled = this.isThrusterDisabled(thruster);

                if (this.$store.state.thrustersShowOnlyFeasible) {
                    if (!thruster.disabled) {
                        filtered.push(thruster)
                    }
                } else {
                    filtered.push(thruster)
                }
            });
            this.validateCurrentSelectionFeasibility('Thruster')
            return filtered;
        },
        filteredWeaponFrameOptions() {
            if (this.weaponFrameOptions.length <= 0) {
                return [];
            }
            var filtered = [];
            this.weaponFrameOptions.forEach((weaponFrame) => {
                weaponFrame.disabled = this.isWeaponFrameDisabled(weaponFrame);

                if (this.$store.state.weaponFrame1sShowOnlyFeasible) {
                    if (!weaponFrame.disabled) {
                        filtered.push(weaponFrame)
                    }
                } else {
                    filtered.push(weaponFrame)
                }
            });
            this.validateCurrentSelectionFeasibility('WeaponFrame')
            return filtered;
        },
        filteredPayloadOptions() {
            if (this.payloadOptions.length <= 0) {
                return [];
            }
            var filtered = [];
            this.payloadOptions.forEach((payload) => {
                payload.disabled = this.isPayloadDisabled(payload);

                if (this.$store.state.payload1sShowOnlyFeasible) {
                    if (!payload.disabled) {
                        filtered.push(payload)
                    }
                } else {
                    filtered.push(payload)
                }
            });
            this.validateCurrentSelectionFeasibility('Payload')
            return filtered;
        },

        corvetteErrors() {
            var errors = [];
            if (this.$store.state.editingCorvetteConfiguration.Corvette.disabled) {
                errors.push({message: 'The proposed Hull Class is invalid with other proposed changes.'})
            }
            if (this.isCorvetteDisabledByModulePoints(this.corvetteConfiguration.Corvette)) {
                errors.push({message: 'The original Hull Class does not have enough Module Points Capacity for the proposed changes.'})
            }
            if (this.isCorvetteDisabledByPDSPowerLevel(this.corvetteConfiguration.Corvette)) {
                errors.push({message: 'The original Hull Class PDS Power Level is too low for the proposed PDS.'})
            }
            if (this.isCorvetteDisabledByWeaponFramePowerLevel(this.corvetteConfiguration.Corvette)) {
                errors.push({message: 'The original Hull Class Weapon Power Level is too low for the proposed Weapon Frame.'})
            }
            return errors;
        },
        armorErrors() {
            var errors = [];
            if (this.$store.state.editingCorvetteConfiguration.Armor.disabled) {
                errors.push({message: 'The proposed Armor is invalid with other proposed changes.'})
            }
            if (this.isArmorDisabledByModulePoints(this.corvetteConfiguration.Armor)) {
                errors.push({message: 'The original Armor costs too many Module Points for the proposed changes.'})
            }
            return errors;
        },
        pointDefenseSystemErrors() {
            var errors = [];
            if (this.$store.state.editingCorvetteConfiguration.PointDefenseSystem.disabled) {
                errors.push({message: 'The proposed Point Defense System is invalid with other proposed changes.'})
            }
            if (this.isPointDefenseSystemDisabledByModulePoints(this.corvetteConfiguration.PointDefenseSystem)) {
                errors.push({message: 'The original Point Defense System costs too many Module Points for the proposed changes.'})
            }
            if (this.isPointDefenseSystemDisabledByPowerLevel(this.corvetteConfiguration.PointDefenseSystem)) {
                errors.push({message: 'The original Point Defense System Power Level is too high for the proposed Hull Class.'})
            }
            return errors;
        },
        fuelSystemErrors() {
            var errors = [];
            if (this.$store.state.editingCorvetteConfiguration.FuelSystem.disabled) {
                errors.push({message: 'The proposed Fuel System is invalid with other proposed changes.'})
            }
            if (this.isFuelSystemDisabledByModulePoints(this.corvetteConfiguration.FuelSystem)) {
                errors.push({message: 'The original Fuel System costs too many Module Points for the proposed changes.'})
            }
            return errors;
        },
        thrusterErrors() {
            var errors = [];
            if (this.$store.state.editingCorvetteConfiguration.Thruster.disabled) {
                errors.push({message: 'The proposed Thruster is invalid with other proposed changes.'})
            }
            if (this.isThrusterDisabledByModulePoints(this.corvetteConfiguration.Thruster)) {
                errors.push({message: 'The original Thruster costs too many Module Points for the proposed changes.'})
            }
            return errors;
        },
        weaponFrame1Errors() {
            var errors = [];
            if (this.$store.state.editingCorvetteConfiguration.WeaponFrame.disabled) {
                errors.push({message: 'The proposed Weapon Frame is invalid with other proposed changes.'})
            }
            if (this.isWeaponFrameDisabledByModulePoints(this.corvetteConfiguration.WeaponFrame)) {
                errors.push({message: 'The original Weapon Frame costs too many Module Points for the proposed changes.'})
            }
            if (this.isWeaponFrameDisabledByPowerLevel(this.corvetteConfiguration.WeaponFrame)) {
                errors.push({message: 'The original Weapon Frame Power Level is too high for the proposed Hull Class.'})
            }
            if (this.isWeaponFrameDisabledByWeaponFrameType(this.corvetteConfiguration.WeaponFrame)) {
                errors.push({message: 'The original Weapon Frame Weapon Type is incompatable with the proposed Payload.'})
            }
            return errors;
        },
        payload1Errors() {
            var errors = [];
            if (this.$store.state.editingCorvetteConfiguration.Payload.disabled) {
                errors.push({message: 'The proposed Payload is invalid with other proposed changes.'})
            }
            if (this.isPayloadDisabledByModulePoints(this.corvetteConfiguration.Payload)) {
                errors.push({message: 'The original Payload costs too many Module Points for the proposed changes.'})
            }
            if (this.isPayloadDisabledByPowerLevel(this.corvetteConfiguration.Payload)) {
                errors.push({message: 'The original Payload Power Level is too high for the proposed Weapon Frame.'})
            }
            if (this.isPayloadDisabledByWeaponFrameType(this.corvetteConfiguration.Payload)) {
                errors.push({message: 'The original Payload Weapon Type is incompatable with the proposed Weapon Frame.'})
            }
            return errors;
        },
        isCorvetteConfigurationValid() {
            var invalid = this.$store.state.editingCorvetteConfiguration.Corvette.disabled ||
                          this.isCorvetteDisabled(this.corvetteConfiguration.Corvette) ||
                          this.$store.state.editingCorvetteConfiguration.Armor.disabled ||
                          this.isArmorDisabled(this.corvetteConfiguration.Armor) ||
                          this.$store.state.editingCorvetteConfiguration.PointDefenseSystem.disabled ||
                          this.isPointDefenseSystemDisabled(this.corvetteConfiguration.PointDefenseSystem) ||
                          this.$store.state.editingCorvetteConfiguration.FuelSystem.disabled ||
                          this.isFuelSystemDisabled(this.corvetteConfiguration.FuelSystem) ||
                          this.$store.state.editingCorvetteConfiguration.Thruster.disabled ||
                          this.isThrusterDisabled(this.corvetteConfiguration.Thruster) ||
                          this.$store.state.editingCorvetteConfiguration.WeaponFrame.disabled ||
                          this.isWeaponFrameDisabled(this.corvetteConfiguration.WeaponFrame) ||
                          this.$store.state.editingCorvetteConfiguration.Payload.disabled ||
                          this.isPayloadDisabled(this.corvetteConfiguration.Payload);

            return !invalid;
        },
    },

    methods: {
        toggleStatsPinned(){
            this.$store.state.corvetteConfigurationStatsPinned = !this.$store.state.corvetteConfigurationStatsPinned
        },
        toggleWeaponChartsPinned(){
            this.$store.state.corvetteConfigurationWeaponChartsPinned = !this.$store.state.corvetteConfigurationWeaponChartsPinned
        },
        getCorvettes() {
            this.corvettesLoading = true;
            this.corvetteRepository.getCorvettes()
                .then((apiResponse) => {
                    console.log('apiResponse', apiResponse);
                    var responses = apiResponse.data;
                    this.corvetteOptions = [];
                    for (var i = 0; i < responses.length; i++) {
                        this.corvetteOptions.push(new CorvetteModel(responses[i]));
                    }
                    this.corvettesLoading = false;
                })
                .catch((apiError) => {
                    console.error(apiError)
                    this.$emit('show-snackbar', {
                        message: 'Failed to load Corvette options. Please try again later',
                        color: 'red',
                        show: true
                    });
                    this.corvettesLoading = false;
                })
        },
        isCorvetteDisabledByModulePoints(corvette) {
            return corvette.ModulePointLimit < this.$store.state.editingCorvetteConfiguration.TotalModulePointsUsage;
        },
        isCorvetteDisabledByPDSPowerLevel(corvette) {
            var disabledByPDSPowerLevel = false;
            let level3 = "Level 3";
            let level2 = "Level 2";
            let level1 = "Level 1";
            if (level3 === this.$store.state.editingCorvetteConfiguration.PointDefenseSystemPowerLevelText) {
                // disable all Level 2 and all Level 1 options
                disabledByPDSPowerLevel = corvette.PointDefenseSystemPowerLevelText === level1 || corvette.PointDefenseSystemPowerLevelText === level2;
            } else if (level2 === this.$store.state.editingCorvetteConfiguration.PointDefenseSystemPowerLevelText) {
                // disable all Level 1 options
                disabledByPDSPowerLevel = corvette.PointDefenseSystemPowerLevelText === level1;
            } else if (level1 === this.$store.state.editingCorvetteConfiguration.PointDefenseSystemPowerLevelText) { 
                // allow all options
            }
            return disabledByPDSPowerLevel;
        },
        isCorvetteDisabledByWeaponFramePowerLevel(corvette) {
            var disabledByWeaponFramePowerLevel = false;
            let level3 = "Level 3";
            let level2 = "Level 2";
            let level1 = "Level 1";
            if (level3 === this.$store.state.editingCorvetteConfiguration.WeaponFramePowerLevelText) {
                // disable all Level 2 and all Level 1 options
                disabledByWeaponFramePowerLevel = corvette.WeaponPowerLevelText === level1 || corvette.WeaponPowerLevelText === level2;
            } else if (level2 === this.$store.state.editingCorvetteConfiguration.WeaponFramePowerLevelText) {
                // disable all Level 1 options
                disabledByWeaponFramePowerLevel = corvette.WeaponPowerLevelText === level1;
            } else if (level1 === this.$store.state.editingCorvetteConfiguration.WeaponFramePowerLevelText) { 
                // allow all options
            }
            return disabledByWeaponFramePowerLevel;
        },
        isCorvetteDisabled(corvette) {
            return this.isCorvetteDisabledByModulePoints(corvette) || 
                   this.isCorvetteDisabledByPDSPowerLevel(corvette) || 
                   this.isCorvetteDisabledByWeaponFramePowerLevel(corvette);
        },
        getCorvetteOutlineColor(corvetteGuid) {
            if (corvetteGuid === this.corvetteConfiguration.Corvette.CorvetteGuid && corvetteGuid === this.$store.state.editingCorvetteConfiguration.Corvette.CorvetteGuid) {
                if (this.isCorvetteDisabled(this.corvetteOptions.find(option => option.CorvetteGuid === corvetteGuid))) {
                    return `red`;
                }
                return `${'orange'}`;
            } else if (corvetteGuid === this.corvetteConfiguration.Corvette.CorvetteGuid) {
                if (this.isCorvetteDisabled(this.corvetteOptions.find(option => option.CorvetteGuid === corvetteGuid))) {
                    return `red`;
                }
                return `${'orange'}`;
            } else if (corvetteGuid === this.$store.state.editingCorvetteConfiguration.Corvette.CorvetteGuid) {
                return `${this.$vuetify.theme.themes.dark['cfPrimary']}`;
            } else {
                return 'transparent';
            }
        },
        setEditingCorvette(corvette) {
            this.$store.state.editingCorvetteConfiguration.setCorvette(corvette);
            this.validateCurrentSelectionFeasibility()
        },
        getArmorComponents() {
            this.armorsLoading = true;
            this.armorRepository.getArmorsBySpaceshipType(this.$store.state.editingCorvetteConfiguration.CorvetteSpaceshipTypeGuid)
                .then((apiResponse) => {
                    console.log('apiResponse', apiResponse);
                    var responses = apiResponse.data;
                    this.armorOptions = [];
                    for (var i = 0; i < responses.length; i++) {
                        this.armorOptions.push(new ArmorModel(responses[i]));
                    }
                    this.armorsLoading = false;
                })
                .catch((apiError) => {
                    console.error(apiError)
                    this.$emit('show-snackbar', {
                        message: 'Failed to load Armor options. Please try again later',
                        color: 'red',
                        show: true
                    });
                    this.armorsLoading = false;
                })
        },
        isArmorDisabledByModulePoints(armor) {
            return (this.$store.state.editingCorvetteConfiguration.TotalModulePointsUsage - 
                this.$store.state.editingCorvetteConfiguration.ArmorModulePointsCost) + 
                armor.ModulePointsCost > 
                this.$store.state.editingCorvetteConfiguration.CorvetteModulePointLimit;
        },
        isArmorDisabled(armor) {
            return this.isArmorDisabledByModulePoints(armor);
        },
        getArmorComponentOutlineColor(armorGuid) {
            if (armorGuid === this.corvetteConfiguration.Armor.ArmorGuid && armorGuid === this.$store.state.editingCorvetteConfiguration.Armor.ArmorGuid) {
                if (this.isArmorDisabled(this.armorOptions.find(option => option.ArmorGuid === armorGuid))) {
                    return `red`;
                }
                return `${'orange'}`;
            } else if (armorGuid === this.corvetteConfiguration.Armor.ArmorGuid) {
                if (this.isArmorDisabled(this.armorOptions.find(option => option.ArmorGuid === armorGuid))) {
                    return `red`;
                }
                return `${'orange'}`;
            } else if (armorGuid === this.$store.state.editingCorvetteConfiguration.Armor.ArmorGuid) {
                return `${this.$vuetify.theme.themes.dark['cfPrimary']}`;
            } else {
                return 'transparent';
            }
        },
        setEditingArmorComponent(armor) {
            this.$store.state.editingCorvetteConfiguration.setArmor(armor);
            this.validateCurrentSelectionFeasibility()
        },
        getPointDefenseSystemComponents() {
            this.pointDefenseSystemsLoading = true;
            this.pointDefenseSystemRepository.getPointDefenseSystems()
                .then((apiResponse) => {
                    console.log('apiResponse', apiResponse);
                    var responses = apiResponse.data;
                    this.pointDefenseSystemOptions = [];
                    for (var i = 0; i < responses.length; i++) {
                        this.pointDefenseSystemOptions.push(new PointDefenseSystemModel(responses[i]));
                    }
                    this.pointDefenseSystemsLoading = false;
                })
                .catch((apiError) => {
                    console.error(apiError)
                    this.$emit('show-snackbar', {
                        message: 'Failed to load Point Defense System options. Please try again later',
                        color: 'red',
                        show: true
                    });
                    this.pointDefenseSystemsLoading = false;
                })
        },
        isPointDefenseSystemDisabledByModulePoints(pointDefenseSystem) {
            return (this.$store.state.editingCorvetteConfiguration.TotalModulePointsUsage - 
                this.$store.state.editingCorvetteConfiguration.PointDefenseSystemModulePointsCost) + 
                pointDefenseSystem.ModulePointsCost > 
                this.$store.state.editingCorvetteConfiguration.CorvetteModulePointLimit;
        },
        isPointDefenseSystemDisabledByPowerLevel(pointDefenseSystem) {
            var disabledByPowerLevel = false;
            let level3 = "Level 3";
            let level2 = "Level 2";
            let level1 = "Level 1";
            if (level3 === this.$store.state.editingCorvetteConfiguration.CorvettePointDefenseSystemPowerLevelText) {
                // allow all options
            } else if (level2 === this.$store.state.editingCorvetteConfiguration.CorvettePointDefenseSystemPowerLevelText) {
                // disable all Level 3 options
                disabledByPowerLevel = pointDefenseSystem.PowerLevelText === level3;
            } else if (level1 === this.$store.state.editingCorvetteConfiguration.CorvettePointDefenseSystemPowerLevelText) { 
                // disable all Level 2 and all Level 3 options
                disabledByPowerLevel = pointDefenseSystem.PowerLevelText === level3 || pointDefenseSystem.PowerLevelText === level2;
            }
            return disabledByPowerLevel;
        },
        isPointDefenseSystemDisabled(pointDefenseSystem) {
            return this.isPointDefenseSystemDisabledByModulePoints(pointDefenseSystem) || 
                   this.isPointDefenseSystemDisabledByPowerLevel(pointDefenseSystem);
        },
        getPointDefenseSystemComponentOutlineColor(pointDefenseSystemGuid) {
            if (pointDefenseSystemGuid === this.corvetteConfiguration.PointDefenseSystemGuid && pointDefenseSystemGuid === this.$store.state.editingCorvetteConfiguration.PointDefenseSystemGuid) {
                if (this.isPointDefenseSystemDisabled(this.pointDefenseSystemOptions.find(option => option.PointDefenseSystemGuid === pointDefenseSystemGuid))) {
                    return `red`;
                }
                return `${'orange'}`;
            } else if (pointDefenseSystemGuid === this.corvetteConfiguration.PointDefenseSystemGuid) {
                if (this.isPointDefenseSystemDisabled(this.pointDefenseSystemOptions.find(option => option.PointDefenseSystemGuid === pointDefenseSystemGuid))) {
                    return `red`;
                }
                return `${'orange'}`;
            } else if (pointDefenseSystemGuid === this.$store.state.editingCorvetteConfiguration.PointDefenseSystemGuid) {
                return `${this.$vuetify.theme.themes.dark['cfPrimary']}`;
            } else {
                return 'transparent';
            }
        },
        setEditingPointDefenseSystemComponent(pointDefenseSystem) {
            this.$store.state.editingCorvetteConfiguration.setPointDefenseSystem(pointDefenseSystem);
            this.validateCurrentSelectionFeasibility()
        },
        getFuelSystemComponents() {
            this.fuelSystemsLoading = true;
            this.fuelSystemRepository.getFuelSystemsBySpaceshipType(this.$store.state.editingCorvetteConfiguration.CorvetteSpaceshipTypeGuid)
                .then((apiResponse) => {
                    console.log('apiResponse', apiResponse);
                    var responses = apiResponse.data;
                    this.fuelSystemOptions = [];
                    for (var i = 0; i < responses.length; i++) {
                        this.fuelSystemOptions.push(new FuelSystemModel(responses[i]));
                    }
                    this.fuelSystemsLoading = false;
                })
                .catch((apiError) => {
                    console.error(apiError)
                    this.$emit('show-snackbar', {
                        message: 'Failed to load Fuel System options. Please try again later',
                        color: 'red',
                        show: true
                    });
                    this.fuelSystemsLoading = false;
                })
        },
        isFuelSystemDisabledByModulePoints(fuelSystem) {
            return (this.$store.state.editingCorvetteConfiguration.TotalModulePointsUsage - 
                this.$store.state.editingCorvetteConfiguration.FuelSystemModulePointsCost) + 
                fuelSystem.ModulePointsCost > 
                this.$store.state.editingCorvetteConfiguration.CorvetteModulePointLimit;
        },
        isFuelSystemDisabled(fuelSystem) {
            return this.isFuelSystemDisabledByModulePoints(fuelSystem);
        },
        getFuelSystemComponentOutlineColor(fuelSystemGuid) {
            if (fuelSystemGuid === this.corvetteConfiguration.FuelSystem.FuelSystemGuid && fuelSystemGuid === this.$store.state.editingCorvetteConfiguration.FuelSystem.FuelSystemGuid) {
                if (this.isFuelSystemDisabled(this.fuelSystemOptions.find(option => option.FuelSystemGuid === fuelSystemGuid))) {
                    return `red`;
                }
                return `${'orange'}`;
            } else if (fuelSystemGuid === this.corvetteConfiguration.FuelSystem.FuelSystemGuid) {
                if (this.isFuelSystemDisabled(this.fuelSystemOptions.find(option => option.FuelSystemGuid === fuelSystemGuid))) {
                    return `red`;
                }
                return `${'orange'}`;
            } else if (fuelSystemGuid === this.$store.state.editingCorvetteConfiguration.FuelSystem.FuelSystemGuid) {
                return `${this.$vuetify.theme.themes.dark['cfPrimary']}`;
            } else {
                return 'transparent';
            }
        },
        setEditingFuelSystemComponent(fuelSystem) {
            this.$store.state.editingCorvetteConfiguration.setFuelSystem(fuelSystem);
            this.validateCurrentSelectionFeasibility()
        },
        getThrusterComponents() {
            this.thrustersLoading = true;
            this.thrusterRepository.getThrustersBySpaceshipType(this.$store.state.editingCorvetteConfiguration.CorvetteSpaceshipTypeGuid)
                .then((apiResponse) => {
                    console.log('apiResponse', apiResponse);
                    var responses = apiResponse.data;
                    this.thrusterOptions = [];
                    for (var i = 0; i < responses.length; i++) {
                        this.thrusterOptions.push(new ThrusterModel(responses[i]));
                    }
                    this.thrustersLoading = false;
                })
                .catch((apiError) => {
                    console.error(apiError)
                    this.$emit('show-snackbar', {
                        message: 'Failed to load Thruster options. Please try again later',
                        color: 'red',
                        show: true
                    });
                    this.thrustersLoading = false;
                })
        },
        isThrusterDisabledByModulePoints(thruster) {
            return (this.$store.state.editingCorvetteConfiguration.TotalModulePointsUsage - 
                this.$store.state.editingCorvetteConfiguration.ThrusterModulePointsCost) + 
                thruster.ModulePointsCost > 
                this.$store.state.editingCorvetteConfiguration.CorvetteModulePointLimit;
        },
        isThrusterDisabled(thruster) {
            return this.isThrusterDisabledByModulePoints(thruster);
        },
        getThrusterComponentOutlineColor(thrusterGuid) {
            if (thrusterGuid === this.corvetteConfiguration.Thruster.ThrusterGuid && thrusterGuid === this.$store.state.editingCorvetteConfiguration.Thruster.ThrusterGuid) {
                if (this.isThrusterDisabled(this.thrusterOptions.find(option => option.ThrusterGuid === thrusterGuid))) {
                    return `red`;
                }
                return `${'orange'}`;
            } else if (thrusterGuid === this.corvetteConfiguration.Thruster.ThrusterGuid) {
                if (this.isThrusterDisabled(this.thrusterOptions.find(option => option.ThrusterGuid === thrusterGuid))) {
                    return `red`;
                }
                return `${'orange'}`;
            } else if (thrusterGuid === this.$store.state.editingCorvetteConfiguration.Thruster.ThrusterGuid) {
                return `${this.$vuetify.theme.themes.dark['cfPrimary']}`;
            } else {
                return 'transparent';
            }
        },
        setEditingThrusterComponent(thruster) {
            this.$store.state.editingCorvetteConfiguration.setThruster(thruster);
            this.validateCurrentSelectionFeasibility()
        },
        getWeaponFrameComponents() {
            this.weaponFramesLoading = true;
            this.weaponFrameRepository.getWeaponFrames()
                .then((apiResponse) => {
                    console.log('apiResponse', apiResponse);
                    var responses = apiResponse.data;
                    this.weaponFrameOptions = [];
                    for (var i = 0; i < responses.length; i++) {
                        this.weaponFrameOptions.push(new WeaponFrameModel(responses[i]));
                    }
                    this.weaponFramesLoading = false;
                })
                .catch((apiError) => {
                    console.error(apiError)
                    this.$emit('show-snackbar', {
                        message: 'Failed to load Weapon Frame options. Please try again later',
                        color: 'red',
                        show: true
                    });
                    this.weaponFramesLoading = false;
                })
        },
        isWeaponFrameDisabledByModulePoints(weaponFrame) {
            return (this.$store.state.editingCorvetteConfiguration.TotalModulePointsUsage - 
                this.$store.state.editingCorvetteConfiguration.WeaponFrameModulePointsCost) + 
                weaponFrame.ModulePointsCost > 
                this.$store.state.editingCorvetteConfiguration.CorvetteModulePointLimit;
        },
        isWeaponFrameDisabledByPowerLevel(weaponFrame) {
            var disabledByPowerLevel = false;
            let level3 = "Level 3";
            let level2 = "Level 2";
            let level1 = "Level 1";
            if (level3 === this.$store.state.editingCorvetteConfiguration.CorvetteWeaponPowerLevelText) {
                // allow all options
            } else if (level2 === this.$store.state.editingCorvetteConfiguration.CorvetteWeaponPowerLevelText) {
                // disable all Level 3 options
                disabledByPowerLevel = weaponFrame.PowerLevelText === level3;
            } else if (level1 === this.$store.state.editingCorvetteConfiguration.CorvetteWeaponPowerLevelText) { 
                // disable all Level 2 and all Level 3 options
                disabledByPowerLevel = weaponFrame.PowerLevelText === level3 || weaponFrame.PowerLevelText === level2;
            }
            return disabledByPowerLevel;
        },
        isWeaponFrameDisabledByWeaponFrameType(weaponFrame) {
            var disabledByWeaponFrameType = false;
            // disabledByWeaponFrameType = weaponFrame.WeaponFrameTypeText !== this.corvetteConfiguration.PayloadWeaponFrameTypeText;
            return disabledByWeaponFrameType;
        },
        isWeaponFrameDisabled(weaponFrame) {
            return this.isWeaponFrameDisabledByModulePoints(weaponFrame) || 
                   this.isWeaponFrameDisabledByPowerLevel(weaponFrame) ||
                   this.isWeaponFrameDisabledByWeaponFrameType(weaponFrame);
        },
        getWeaponFrameComponentOutlineColor(weaponFrameGuid) {
            if (weaponFrameGuid === this.corvetteConfiguration.WeaponFrameGuid && weaponFrameGuid === this.$store.state.editingCorvetteConfiguration.WeaponFrameGuid) {
                if (this.isWeaponFrameDisabled(this.weaponFrameOptions.find(option => option.WeaponFrameGuid === weaponFrameGuid))) {
                    return `red`;
                }
                return `${'orange'}`;
            } else if (weaponFrameGuid === this.corvetteConfiguration.WeaponFrameGuid) {
                if (this.isWeaponFrameDisabled(this.weaponFrameOptions.find(option => option.WeaponFrameGuid === weaponFrameGuid))) {
                    return `red`;
                }
                return `${'orange'}`;
            } else if (weaponFrameGuid === this.$store.state.editingCorvetteConfiguration.WeaponFrameGuid) {
                return `${this.$vuetify.theme.themes.dark['cfPrimary']}`;
            } else {
                return 'transparent';
            }
        },
        setEditingWeaponFrameComponent(weaponFrame) {
            this.$store.state.editingCorvetteConfiguration.setWeaponFrame(weaponFrame);
            if (!this.isCorvetteConfigurationValid) {
                this.validateCurrentSelectionFeasibility(null)
            }
        },
        getPayloadComponents() {
            this.payloadsLoading = true;
            this.payloadRepository.getPayloads()
                .then((apiResponse) => {
                    console.log('apiResponse', apiResponse);
                    var responses = apiResponse.data;
                    this.payloadOptions = [];
                    for (var i = 0; i < responses.length; i++) {
                        this.payloadOptions.push(new PayloadModel(responses[i]));
                    }
                    this.payloadsLoading = false;
                })
                .catch((apiError) => {
                    console.error(apiError)
                    this.$emit('show-snackbar', {
                        message: 'Failed to load Payload options. Please try again later',
                        color: 'red',
                        show: true
                    });
                    this.payloadsLoading = false;
                })
        },
        isPayloadDisabledByModulePoints(payload) {
            return (this.$store.state.editingCorvetteConfiguration.TotalModulePointsUsage - 
                this.$store.state.editingCorvetteConfiguration.PayloadModulePointsCost) + 
                payload.ModulePointsCost > 
                this.$store.state.editingCorvetteConfiguration.CorvetteModulePointLimit;
        },
        isPayloadDisabledByPowerLevel(payload) {
            var disabledByPowerLevel = false;
            let level3 = "Level 3";
            let level2 = "Level 2";
            let level1 = "Level 1";
            if (level3 === this.$store.state.editingCorvetteConfiguration.WeaponFramePowerLevelText) {
                // allow all options
            } else if (level2 === this.$store.state.editingCorvetteConfiguration.WeaponFramePowerLevelText) {
                // disable all Level 3 options
                disabledByPowerLevel = payload.PowerLevelText === level3;
            } else if (level1 === this.$store.state.editingCorvetteConfiguration.WeaponFramePowerLevelText) { 
                // disable all Level 2 and all Level 3 options
                disabledByPowerLevel = payload.PowerLevelText === level3 || payload.PowerLevelText === level2;
            }
            return disabledByPowerLevel;
        },
        isPayloadDisabledByWeaponFrameType(payload) {
            return payload.WeaponFrameTypeText !== this.$store.state.editingCorvetteConfiguration.WeaponFrameWeaponFrameTypeText;
        },
        isPayloadDisabled(payload) {
            return this.isPayloadDisabledByModulePoints(payload) || 
                   this.isPayloadDisabledByPowerLevel(payload) || 
                   this.isPayloadDisabledByWeaponFrameType(payload);
        },
        getPayloadComponentOutlineColor(payloadGuid) {
            if (payloadGuid === this.corvetteConfiguration.PayloadGuid && payloadGuid === this.$store.state.editingCorvetteConfiguration.PayloadGuid) {
                if (this.isPayloadDisabled(this.payloadOptions.find(option => option.PayloadGuid === payloadGuid))) {
                    return `red`;
                }
                return `${'orange'}`;
            } else if (payloadGuid === this.corvetteConfiguration.PayloadGuid) {
                if (this.isPayloadDisabled(this.payloadOptions.find(option => option.PayloadGuid === payloadGuid))) {
                    return `red`;
                }
                return `${'orange'}`;
            } else if (payloadGuid === this.$store.state.editingCorvetteConfiguration.PayloadGuid) {
                return `${this.$vuetify.theme.themes.dark['cfPrimary']}`;
            } else {
                return 'transparent';
            }
        },
        setEditingPayloadComponent(payload) {
            this.$store.state.editingCorvetteConfiguration.setPayload(payload);
            if (!this.isCorvetteConfigurationValid) {
                this.validateCurrentSelectionFeasibility(null)
            }
        },

        updateCorvetteConfiguration(key = null) {
            if (key == null) {
                this.corvetteConfigurationRepository.updateUserCorvetteConfiguration(
                    this.$store.state.editingCorvetteConfiguration.CorvetteConfigurationGuid,
                    new CorvetteConfigurationDto(this.$store.state.editingCorvetteConfiguration)
                )
                    .then((apiResponse) => {
                        console.log('apiResponse', apiResponse);
                        this.$emit('update');
                        this.getArmorComponents();
                        this.getPointDefenseSystemComponents();
                        this.getFuelSystemComponents();
                        this.getThrusterComponents();
                        this.getWeaponFrameComponents();
                        this.getPayloadComponents();
                    })
                    .catch((apiError) => {
                        console.error(apiError)
                        this.$emit('show-snackbar', {
                            message: 'Could not update the Battlecrusier Configuration. Please try again later',
                            color: 'red',
                            show: true
                        });
                    })
            } else {
                let updatedCorvetteConfig = { ...this.corvetteConfiguration, [key]: this.$store.state.editingCorvetteConfiguration[key]};

                this.corvetteConfigurationRepository.updateUserCorvetteConfiguration(
                    updatedCorvetteConfig.CorvetteConfigurationGuid,
                    new CorvetteConfigurationDto(updatedCorvetteConfig)
                )
                    .then((apiResponse) => {
                        console.log('apiResponse', apiResponse);
                        this.$emit('update');
                        this.getArmorComponents();
                        this.getPointDefenseSystemComponents();
                        this.getFuelSystemComponents();
                        this.getThrusterComponents();
                        this.getWeaponFrameComponents();
                        this.getPayloadComponents();
                    })
                    .catch((apiError) => {
                        console.error(apiError)
                        this.$emit('show-snackbar', {
                            message: `Could not update the ${key} component. Please try again later`,
                            color: 'red',
                            show: true
                        });
                    })
            }
        },
        revertCorvetteConfiguration(key = null) {
            if (key == null) {
                this.$store.state.editingCorvetteConfiguration = Object.assign({}, this.corvetteConfiguration);
            } else {
                this.$store.state.editingCorvetteConfiguration[`set${key}`](this.corvetteConfiguration[key]);
            }
            this.validateCurrentSelectionFeasibility(key);
        },
        validateCurrentSelectionFeasibility(key = null) {
            if (key == null) {
                if(this.isCorvetteDisabled(this.$store.state.editingCorvetteConfiguration.Corvette)) {
                    this.$store.state.editingCorvetteConfiguration.setCorvette(this.corvetteOptions.find(option => option.disabled === false));
                }
                if(this.isArmorDisabled(this.$store.state.editingCorvetteConfiguration.Armor)) {
                    this.$store.state.editingCorvetteConfiguration.setArmor(this.armorOptions.find(option => option.disabled === false));
                }
                if(this.isPointDefenseSystemDisabled(this.$store.state.editingCorvetteConfiguration.PointDefenseSystem)) {
                    this.$store.state.editingCorvetteConfiguration.setPointDefenseSystem(this.pointDefenseSystemOptions.find(option => option.disabled === false));
                }
                if(this.isFuelSystemDisabled(this.$store.state.editingCorvetteConfiguration.FuelSystem)) {
                    this.$store.state.editingCorvetteConfiguration.setFuelSystem(this.fuelSystemOptions.find(option => option.disabled === false));
                }
                if(this.isThrusterDisabled(this.$store.state.editingCorvetteConfiguration.Thruster)) {
                    this.$store.state.editingCorvetteConfiguration.setThruster(this.thrusterOptions.find(option => option.disabled === false));
                }
                if(this.isWeaponFrameDisabled(this.$store.state.editingCorvetteConfiguration.WeaponFrame)) {
                    this.$store.state.editingCorvetteConfiguration.setWeaponFrame(this.weaponFrameOptions.find(option => option.disabled === false));
                }
                if(this.isPayloadDisabled(this.$store.state.editingCorvetteConfiguration.Payload)) {
                    this.$store.state.editingCorvetteConfiguration.setPayload(this.payloadOptions.find(option => option.disabled === false));
                }
                return;
            }
            if(this.$store.state.editingCorvetteConfiguration[key].disabled) {
                this.$store.state.editingCorvetteConfiguration[`set${key}`](this[`${key.charAt(0).toLowerCase() + key.slice(1)}Options`].find(option => option.disabled === false));
            }
        }
    },

    created() {

    },

    mounted() {
        this.$store.state.editingCorvetteConfiguration = Object.assign({}, this.corvetteConfiguration);
        this.getCorvettes();
        this.getArmorComponents();
        this.getPointDefenseSystemComponents();
        this.getFuelSystemComponents();
        this.getThrusterComponents();
        this.getWeaponFrameComponents();
        this.getPayloadComponents();
    }
    
};
</script>

<style>
</style>
