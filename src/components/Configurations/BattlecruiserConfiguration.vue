<template>
    <v-container fluid v-if="$store.state.editingBattlecruiserConfiguration">
        <v-card 
            flat class="rounded-xl mb-2" 
            :class="$store.state.battlecruiserConfigurationStatsPinned ? 'sticky-configuration elevation-20' : 'background'" 
            :style="[
                {outline: `thin solid ${$vuetify.theme.dark ? $vuetify.theme.themes.dark['outline'] : $vuetify.theme.themes.light['outline']}`},
            ]"
        >
            <v-container fluid>
                <v-layout wrap align-center>
                    <v-flex shrink>
                        <v-btn small fab @click.stop="toggleStatsPinned()" top left elevation="3">
                            <v-icon v-if="$store.state.battlecruiserConfigurationStatsPinned">mdi-pin-off</v-icon>
                            <v-icon v-else>mdi-pin</v-icon>
                        </v-btn>
                    </v-flex>
                    <v-flex grow>
                        <v-text-field v-model="$store.state.editingBattlecruiserConfiguration.Name"
                            clearable outlined hide-details rounded dense
                            label="Battlecruiser Configuration Name" color="cfPrimary"
                        ></v-text-field>
                    </v-flex>
                    <v-flex shrink v-show="battlecruiserConfiguration.Name !== $store.state.editingBattlecruiserConfiguration.Name">
                        <v-btn 
                            block rounded color="cfPrimary" @click="updateBattlecruiserConfiguration('Name')"
                            :disabled="battlecruiserConfiguration.Name === $store.state.editingBattlecruiserConfiguration.Name || $store.state.editingBattlecruiserConfiguration.Name === '' || $store.state.editingBattlecruiserConfiguration.Name === null"
                        >
                            Save
                        </v-btn>
                    </v-flex>
                    <v-flex shrink v-show="battlecruiserConfiguration.Name !== $store.state.editingBattlecruiserConfiguration.Name">
                        <v-btn 
                            block rounded color="orange" @click="revertBattlecruiserConfiguration('Name')"
                            :disabled="battlecruiserConfiguration.Name === $store.state.editingBattlecruiserConfiguration.Name"
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
                                    :disabled="isBattlecruiserConfigurationValid"
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
                                    <v-divider v-show="battlecruiserErrors.length > 0"/>
                                    <v-layout wrap align-center class="pa-4 pb-0" v-show="battlecruiserErrors.length > 0">
                                        <v-flex xs12 class="pb-2">
                                            <span class="subtitle-1 font-weight-bold">Hull Class</span>
                                        </v-flex>
                                        <v-flex xs12 v-for="(error, index) in battlecruiserErrors" :key="index">
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
                                            <span class="subtitle-1 font-weight-bold">Weapon Frame 1</span>
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
                                            <span class="subtitle-1 font-weight-bold">Payload 1</span>
                                        </v-flex>
                                        <v-flex xs12 v-for="(error, index) in payload1Errors" :key="index">
                                            <v-alert text outlined dense class="rounded-xl" type="error">
                                                {{error.message}}
                                            </v-alert>
                                        </v-flex>
                                    </v-layout>
                                    <v-divider v-show="weaponFrame2Errors.length > 0"/>
                                    <v-layout wrap align-center class="pa-4 pb-0" v-show="weaponFrame2Errors.length > 0">
                                        <v-flex xs12 class="pb-2">
                                            <span class="subtitle-1 font-weight-bold">Weapon Frame 2</span>
                                        </v-flex>
                                        <v-flex xs12 v-for="(error, index) in weaponFrame2Errors" :key="index">
                                            <v-alert text outlined dense class="rounded-xl" type="error">
                                                {{error.message}}
                                            </v-alert>
                                        </v-flex>
                                    </v-layout>
                                    <v-divider v-show="payload2Errors.length > 0"/>
                                    <v-layout wrap align-center class="pa-4 pb-0" v-show="payload2Errors.length > 0">
                                        <v-flex xs12 class="pb-2">
                                            <span class="subtitle-1 font-weight-bold">Payload 2</span>
                                        </v-flex>
                                        <v-flex xs12 v-for="(error, index) in payload2Errors" :key="index">
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
                                {{$store.state.editingBattlecruiserConfiguration.Battlecruiser.Class}}
                            </span>
                            Class {{$store.state.editingBattlecruiserConfiguration.Battlecruiser.SpaceshipTypeText}}
                        </div>
                        <span class="subtitle-1 font-italic">
                            {{$store.state.editingBattlecruiserConfiguration.Battlecruiser.Description}}
                        </span>
                    </v-flex>
                    <v-flex shrink class="pb-0">
                        <v-chip :color="battlecruiserConfigurationModulePointsUsageColor"
                            class="title font-weight-bold"
                        >
                            {{`${$store.state.editingBattlecruiserConfiguration.TotalModulePointsUsage}/${$store.state.editingBattlecruiserConfiguration.BattlecruiserModulePointLimit}`}}
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
                                                    <span class="subtitle-1">{{$store.state.editingBattlecruiserConfiguration.Battlecruiser.HullMass | decimal}}</span>
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
                                    <span class="subtitle-1">Hull Mass describes the mass of the Battlecruiser's hull.</span>
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
                                                    <span class="subtitle-1">{{$store.state.editingBattlecruiserConfiguration.TotalMass | decimal}}</span>
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
                                    <span class="subtitle-1">Total Mass describes the mass of the Battlecruiser's hull plus the mass of all attached components.</span>
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
                                                    <span class="subtitle-1">{{$store.state.editingBattlecruiserConfiguration.TotalCrewCost | decimal}}</span>
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
                                    <span class="subtitle-1">Total Crew describes the crew cost of the Battlecruiser plus the crew cost of all attached modules.</span>
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
                                                    <span class="subtitle-1">{{$store.state.editingBattlecruiserConfiguration.TotalHeatCapacity | decimal}}</span>
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
                                                    <span class="subtitle-1">{{$store.state.editingBattlecruiserConfiguration.Maneuverability | decimal5}}</span>
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
                                                    <span class="subtitle-1">{{$store.state.editingBattlecruiserConfiguration.FuelSystemFuelConsumptionRate | decimal}}</span>
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
                                                    <span class="subtitle-1">{{$store.state.editingBattlecruiserConfiguration.FuelSystemFuelCapacity | decimal}}</span>
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
                                                    <span class="subtitle-1">{{$store.state.editingBattlecruiserConfiguration.FuelSystemFuelRegenerationRate | decimal}}</span>
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
            <v-expansion-panels accordian flat class="rounded-xl ml-2 mr-2 mt-0" v-model="$store.state.battlecruiserConfigurationSelectedComponentPanels" multiple>
                <v-expansion-panel class="rounded-xl mt-0 mb-2 expansionPanelBackground" :style="`outline: thin solid ${$vuetify.theme.dark ? $vuetify.theme.themes.dark['outline'] : $vuetify.theme.themes.light['outline']}`">
                    <v-expansion-panel-header v-slot="{ open }" class="pt-0 pb-0">
                        <v-container fluid class="pa-0">
                            <span v-if="open" class="title">Hull Class</span>
                            <v-layout wrap align-center v-else>
                                <v-flex shrink>
                                    <span class="title">Hull Class</span>
                                </v-flex>
                                <v-flex v-if="battlecruiserConfiguration.BattlecruiserGuid !== $store.state.editingBattlecruiserConfiguration.BattlecruiserGuid" shrink>
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
                                                {{ $store.state.editingBattlecruiserConfiguration.BattlecruiserClass }} Class
                                            </v-chip>
                                        </template>
                                        <battlecruiser-overview
                                            :battlecruiser="$store.state.editingBattlecruiserConfiguration.Battlecruiser"
                                            :style="`border: 2px solid ${$vuetify.theme.themes.dark['cfPrimary']}`"
                                            :allowClick="false"
                                        ></battlecruiser-overview>
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
                                                :color="isBattlecruiserDisabled(battlecruiserConfiguration.Battlecruiser) ? 'red' : 'orange'"
                                            >
                                                {{ battlecruiserConfiguration.BattlecruiserClass }} Class
                                            </v-chip>
                                        </template>
                                        <battlecruiser-overview
                                            :battlecruiser="battlecruiserConfiguration.Battlecruiser"
                                            :style="`border: 2px solid ${isBattlecruiserDisabled(battlecruiserConfiguration.Battlecruiser) ? 'red' : 'orange'}`"
                                            :allowClick="false"
                                        ></battlecruiser-overview>
                                    </v-menu>   
                                </v-flex>
                                <v-spacer />
                                <v-flex shrink class="mr-5">
                                    <v-layout wrap>
                                        <v-flex shrink v-if="battlecruiserConfiguration.BattlecruiserGuid !== $store.state.editingBattlecruiserConfiguration.BattlecruiserGuid">
                                            <v-btn 
                                                small rounded color="cfPrimary" @click.stop="updateBattlecruiserConfiguration('Battlecruiser')" :disabled="!isBattlecruiserConfigurationValid && isBattlecruiserDisabled($store.state.editingBattlecruiserConfiguration.Battlecruiser)"
                                            >
                                                Save
                                            </v-btn>
                                        </v-flex>
                                        <v-flex shrink v-if="battlecruiserConfiguration.BattlecruiserGuid !== $store.state.editingBattlecruiserConfiguration.BattlecruiserGuid">
                                            <v-btn 
                                                small rounded color="orange" @click.stop="revertBattlecruiserConfiguration('Battlecruiser')" :disabled="isBattlecruiserDisabled(battlecruiserConfiguration.Battlecruiser)"
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
                                <v-text-field v-model="$store.state.battlecruisersSearch"
                                    clearable outlined hide-details rounded dense
                                    prepend-icon="mdi-magnify" label="Search" color="cfPrimary"
                                ></v-text-field>
                            </v-flex>
                            <v-flex grow>
                                <v-combobox v-model="$store.state.battlecruisersSortBy"
                                    flat outlined hide-details rounded dense clearable
                                    label="Sort by" color="cfPrimary" item-color="cfPrimary" item-text="text" item-value="value"
                                    :items="$store.state.battlecruisersSortOptions" :menu-props="{maxHeight: 600}"
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
                                <v-btn-toggle rounded dense v-model="$store.state.battlecruisersSortDesc" mandatory>
                                    <v-btn depressed :value="false">
                                        <v-icon>mdi-arrow-up</v-icon>
                                    </v-btn>
                                    <v-btn depressed :value="true">
                                        <v-icon>mdi-arrow-down</v-icon>
                                    </v-btn>
                                </v-btn-toggle>
                            </v-flex>
                            <v-flex shrink>
                                <v-switch v-model="$store.state.battlecruisersShowOnlyFeasible" class="mt-0"
                                    hide-details dense label="Only Feasible" color="cfPrimary"
                                >
                                </v-switch>
                            </v-flex>
                        </v-layout>
                        <v-card class="rounded-xl mb-2 mt-2" outlined v-if="$store.state.configurationsCondensedView">
                            <v-data-table
                                :items="filteredBattlecruiserOptions"
                                :items-per-page.sync="$store.state.battlecruisersItemsPerPage"
                                :page.sync="$store.state.battlecruisersPageSync"
                                @page-count="$store.state.battlecruisersPageCount = $event"
                                :search.sync="$store.state.battlecruisersSearch" class="rounded-table clickable-rows"
                                :sort-by="$store.state.battlecruisersSortBy ? $store.state.battlecruisersSortBy.value : null"
                                :sort-desc.sync="$store.state.battlecruisersSortDesc" dense loader-height="0"
                                hide-default-footer :loading="battlecruisersLoading" :headers="$store.state.battlecruisersHeaders"
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
                                    <tr :style="`outline: solid 2px ${getBattlecruiserOutlineColor(item.BattlecruiserGuid)}; outline-offset:-0.35rem; border-radius: 24px; ${item.disabled ? 'pointer-events:none;' : ''}`" 
                                        @click="item.disabled ? '' : setEditingBattlecruiser(item)"
                                    >
                                        <td 
                                            :align="`${headers.find(h => h.value === 'Class').align}`" 
                                            :style="headers.find(h => h.value === 'Class').divider ? `${$vuetify.theme.dark ? 'border-right: 1px solid rgba(255,255,255,0.12)' : 'border-right: 1px solid rgba(0,0,0,0.12)'}` : ''"
                                        >
                                            <span class="subtitle-1" :style="`${item.disabled ? 'opacity: 0.5;' : ''}`">{{ item.Class }}</span>
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
                            :items="filteredBattlecruiserOptions"
                            :items-per-page.sync="$store.state.battlecruisersItemsPerPage"
                            :page.sync="$store.state.battlecruisersPageSync"
                            @page-count="$store.state.battlecruisersPageCount = $event"
                            :search="$store.state.battlecruisersSearch" class="mb-2 mt-2"
                            :sort-by="$store.state.battlecruisersSortBy ? $store.state.battlecruisersSortBy.value : null"
                            :sort-desc="$store.state.battlecruisersSortDesc"
                            hide-default-footer :loading="battlecruisersLoading"
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
                                    <v-flex xs12 sm12 md6 lg4 xl4 v-for="(battlecruiser, i) in props.items" :key="i">
                                        <battlecruiser-overview
                                            :battlecruiser="battlecruiser" class="fill-height" :style="`outline: solid 2px ${getBattlecruiserOutlineColor(battlecruiser.BattlecruiserGuid)}`"
                                            @battlecruiser-click="setEditingBattlecruiser(battlecruiser)" 
                                            :disabled="battlecruiser.disabled"
                                        ></battlecruiser-overview>
                                    </v-flex>
                                </v-layout>
                            </template>
                        </v-data-iterator>
                        <v-layout wrap align-center>
                            <v-flex grow>
                                <v-pagination :length="$store.state.battlecruisersPageCount" :total-visible="7"
                                    v-model="$store.state.battlecruisersPageSync" color="cfPrimary" circle
                                ></v-pagination>
                            </v-flex>
                            <v-flex xs12 sm12 md4 lg3 xl3>
                                <v-select v-model="$store.state.battlecruisersItemsPerPage"
                                    :items="$store.state.itemsPerPageOptions"
                                    outlined hide-details rounded dense item-value="value" item-text="text"
                                    label="Items Per Page" color="cfPrimary" item-color="cfPrimary"
                                ></v-select>
                            </v-flex>
                            <v-flex shrink>
                                <v-btn 
                                    block rounded color="cfPrimary" @click="updateBattlecruiserConfiguration('Battlecruiser')"
                                    :disabled="battlecruiserConfiguration.BattlecruiserGuid === $store.state.editingBattlecruiserConfiguration.BattlecruiserGuid || (!isBattlecruiserConfigurationValid && isBattlecruiserDisabled($store.state.editingBattlecruiserConfiguration.Battlecruiser))"
                                >
                                    Save
                                </v-btn>
                            </v-flex>
                            <v-flex shrink>
                                <v-btn 
                                    block rounded color="orange" @click="revertBattlecruiserConfiguration('Battlecruiser')"
                                    :disabled="battlecruiserConfiguration.BattlecruiserGuid === $store.state.editingBattlecruiserConfiguration.BattlecruiserGuid || isBattlecruiserDisabled(battlecruiserConfiguration.Battlecruiser)"
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
                                <v-flex v-if="battlecruiserConfiguration.ArmorGuid !== $store.state.editingBattlecruiserConfiguration.ArmorGuid" shrink>
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
                                                {{ $store.state.editingBattlecruiserConfiguration.Armor.Title }}
                                            </v-chip>
                                        </template>
                                        <armor-overview
                                            :armor="$store.state.editingBattlecruiserConfiguration.Armor"
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
                                                :color="isArmorDisabled(battlecruiserConfiguration.Armor) ? 'red' : 'orange'"
                                            >
                                                {{ battlecruiserConfiguration.ArmorTitle }}
                                            </v-chip>
                                        </template>
                                        <armor-overview
                                            :armor="battlecruiserConfiguration.Armor"
                                            :style="`border: 2px solid ${isArmorDisabled(battlecruiserConfiguration.Armor) ? 'red' : 'orange'}`"
                                            :allowClick="false"
                                        ></armor-overview>
                                    </v-menu>   
                                </v-flex>
                                <v-spacer />
                                <v-flex shrink class="mr-5">
                                    <v-layout wrap>
                                        <v-flex shrink v-if="battlecruiserConfiguration.ArmorGuid !== $store.state.editingBattlecruiserConfiguration.ArmorGuid">
                                            <v-btn 
                                                small rounded color="cfPrimary" @click.stop="updateBattlecruiserConfiguration('Armor')" :disabled="!isBattlecruiserConfigurationValid && isArmorDisabled($store.state.editingBattlecruiserConfiguration.Armor)"
                                            >
                                                Save
                                            </v-btn>
                                        </v-flex>
                                        <v-flex shrink v-if="battlecruiserConfiguration.ArmorGuid !== $store.state.editingBattlecruiserConfiguration.ArmorGuid">
                                            <v-btn 
                                                small rounded color="orange" @click.stop="revertBattlecruiserConfiguration('Armor')" :disabled="isArmorDisabled(battlecruiserConfiguration.Armor)"
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
                                    block rounded color="cfPrimary" @click="updateBattlecruiserConfiguration('Armor')"
                                    :disabled="battlecruiserConfiguration.ArmorGuid === $store.state.editingBattlecruiserConfiguration.ArmorGuid || (!isBattlecruiserConfigurationValid && isArmorDisabled($store.state.editingBattlecruiserConfiguration.Armor))"
                                >
                                    Save
                                </v-btn>
                            </v-flex>
                            <v-flex shrink>
                                <v-btn 
                                    block rounded color="orange" @click="revertBattlecruiserConfiguration('Armor')"
                                    :disabled="battlecruiserConfiguration.ArmorGuid === $store.state.editingBattlecruiserConfiguration.ArmorGuid || isArmorDisabled(battlecruiserConfiguration.Armor)"
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
                                <v-flex v-if="battlecruiserConfiguration.PointDefenseSystemGuid !== $store.state.editingBattlecruiserConfiguration.PointDefenseSystemGuid" shrink>
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
                                                {{ $store.state.editingBattlecruiserConfiguration.PointDefenseSystemTitle }}
                                            </v-chip>
                                        </template>
                                        <point-defense-system-overview
                                            :pointDefenseSystem="$store.state.editingBattlecruiserConfiguration.PointDefenseSystem"
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
                                                :color="isPointDefenseSystemDisabled(battlecruiserConfiguration.PointDefenseSystem) ? 'red' : 'orange'"
                                            >
                                                {{ battlecruiserConfiguration.PointDefenseSystemTitle }}
                                            </v-chip>
                                        </template>
                                        <point-defense-system-overview
                                            :pointDefenseSystem="battlecruiserConfiguration.PointDefenseSystem"
                                            :style="`border: 2px solid ${isPointDefenseSystemDisabled(battlecruiserConfiguration.PointDefenseSystem) ? 'red' : 'orange'}`"
                                            :allowClick="false"
                                        ></point-defense-system-overview>
                                    </v-menu>   
                                </v-flex>
                                <v-spacer />
                                <v-flex shrink class="mr-5">
                                    <v-layout wrap>
                                        <v-flex shrink v-if="battlecruiserConfiguration.PointDefenseSystemGuid !== $store.state.editingBattlecruiserConfiguration.PointDefenseSystemGuid">
                                            <v-btn 
                                                small rounded color="cfPrimary" @click.stop="updateBattlecruiserConfiguration('PointDefenseSystem')" :disabled="!isBattlecruiserConfigurationValid && isPointDefenseSystemDisabled($store.state.editingBattlecruiserConfiguration.PointDefenseSystem)"
                                            >
                                                Save
                                            </v-btn>
                                        </v-flex>
                                        <v-flex shrink v-if="battlecruiserConfiguration.PointDefenseSystemGuid !== $store.state.editingBattlecruiserConfiguration.PointDefenseSystemGuid">
                                            <v-btn 
                                                small rounded color="orange" @click.stop="revertBattlecruiserConfiguration('PointDefenseSystem')" :disabled="isPointDefenseSystemDisabled(battlecruiserConfiguration.PointDefenseSystem)"
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
                                    block rounded color="cfPrimary" @click="updateBattlecruiserConfiguration('PointDefenseSystem')"
                                    :disabled="battlecruiserConfiguration.PointDefenseSystemGuid === $store.state.editingBattlecruiserConfiguration.PointDefenseSystemGuid || (!isBattlecruiserConfigurationValid && isPointDefenseSystemDisabled($store.state.editingBattlecruiserConfiguration.PointDefenseSystem))"
                                >
                                    Save
                                </v-btn>
                            </v-flex>
                            <v-flex shrink>
                                <v-btn 
                                    block rounded color="orange" @click="revertBattlecruiserConfiguration('PointDefenseSystem')"
                                    :disabled="battlecruiserConfiguration.PointDefenseSystemGuid === $store.state.editingBattlecruiserConfiguration.PointDefenseSystemGuid || isPointDefenseSystemDisabled(battlecruiserConfiguration.PointDefenseSystem)"
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
                                <v-flex v-if="battlecruiserConfiguration.FuelSystemGuid !== $store.state.editingBattlecruiserConfiguration.FuelSystemGuid" shrink>
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
                                                {{ $store.state.editingBattlecruiserConfiguration.FuelSystem.Title }}
                                            </v-chip>
                                        </template>
                                        <fuel-system-overview
                                            :fuelSystem="$store.state.editingBattlecruiserConfiguration.FuelSystem"
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
                                                :color="isFuelSystemDisabled(battlecruiserConfiguration.FuelSystem) ? 'red' : 'orange'"
                                            >
                                                {{ battlecruiserConfiguration.FuelSystemTitle }}
                                            </v-chip>
                                        </template>
                                        <fuel-system-overview
                                            :fuelSystem="battlecruiserConfiguration.FuelSystem"
                                            :style="`border: 2px solid ${isFuelSystemDisabled(battlecruiserConfiguration.FuelSystem) ? 'red' : 'orange'}`"
                                            :allowClick="false"
                                        ></fuel-system-overview>
                                    </v-menu>   
                                </v-flex>
                                <v-spacer />
                                <v-flex shrink class="mr-5">
                                    <v-layout wrap>
                                        <v-flex shrink v-if="battlecruiserConfiguration.FuelSystemGuid !== $store.state.editingBattlecruiserConfiguration.FuelSystemGuid">
                                            <v-btn 
                                                small rounded color="cfPrimary" @click.stop="updateBattlecruiserConfiguration('FuelSystem')" :disabled="!isBattlecruiserConfigurationValid && isFuelSystemDisabled($store.state.editingBattlecruiserConfiguration.FuelSystem)"
                                            >
                                                Save
                                            </v-btn>
                                        </v-flex>
                                        <v-flex shrink v-if="battlecruiserConfiguration.FuelSystemGuid !== $store.state.editingBattlecruiserConfiguration.FuelSystemGuid">
                                            <v-btn 
                                                small rounded color="orange" @click.stop="revertBattlecruiserConfiguration('FuelSystem')" :disabled="isFuelSystemDisabled(battlecruiserConfiguration.FuelSystem)"
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
                                    block rounded color="cfPrimary" @click="updateBattlecruiserConfiguration('FuelSystem')"
                                    :disabled="battlecruiserConfiguration.FuelSystemGuid === $store.state.editingBattlecruiserConfiguration.FuelSystemGuid || (!isBattlecruiserConfigurationValid && isFuelSystemDisabled($store.state.editingBattlecruiserConfiguration.FuelSystem))"
                                >
                                    Save
                                </v-btn>
                            </v-flex>
                            <v-flex shrink>
                                <v-btn 
                                    block rounded color="orange" @click="revertBattlecruiserConfiguration('FuelSystem')"
                                    :disabled="battlecruiserConfiguration.FuelSystemGuid === $store.state.editingBattlecruiserConfiguration.FuelSystemGuid || isFuelSystemDisabled(battlecruiserConfiguration.FuelSystem)"
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
                                <v-flex v-if="battlecruiserConfiguration.ThrusterGuid !== $store.state.editingBattlecruiserConfiguration.ThrusterGuid" shrink>
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
                                                {{ $store.state.editingBattlecruiserConfiguration.Thruster.Title }}
                                            </v-chip>
                                        </template>
                                        <thruster-overview
                                            :thruster="$store.state.editingBattlecruiserConfiguration.Thruster"
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
                                                :color="isThrusterDisabled(battlecruiserConfiguration.Thruster) ? 'red' : 'orange'"
                                            >
                                                {{ battlecruiserConfiguration.ThrusterTitle }}
                                            </v-chip>
                                        </template>
                                        <thruster-overview
                                            :thruster="battlecruiserConfiguration.Thruster"
                                            :style="`border: 2px solid ${isThrusterDisabled(battlecruiserConfiguration.Thruster) ? 'red' : 'orange'}`"
                                            :allowClick="false"
                                        ></thruster-overview>
                                    </v-menu>   
                                </v-flex>
                                <v-spacer />
                                <v-flex shrink class="mr-5">
                                    <v-layout wrap>
                                        <v-flex shrink v-if="battlecruiserConfiguration.ThrusterGuid !== $store.state.editingBattlecruiserConfiguration.ThrusterGuid">
                                            <v-btn 
                                                small rounded color="cfPrimary" @click.stop="updateBattlecruiserConfiguration('Thruster')" :disabled="!isBattlecruiserConfigurationValid && isThrusterDisabled($store.state.editingBattlecruiserConfiguration.Thruster)"
                                            >
                                                Save
                                            </v-btn>
                                        </v-flex>
                                        <v-flex shrink v-if="battlecruiserConfiguration.ThrusterGuid !== $store.state.editingBattlecruiserConfiguration.ThrusterGuid">
                                            <v-btn 
                                                small rounded color="orange" @click.stop="revertBattlecruiserConfiguration('Thruster')" :disabled="isThrusterDisabled(battlecruiserConfiguration.Thruster)"
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
                                    block rounded color="cfPrimary" @click="updateBattlecruiserConfiguration('Thruster')"
                                    :disabled="battlecruiserConfiguration.ThrusterGuid === $store.state.editingBattlecruiserConfiguration.ThrusterGuid || (!isBattlecruiserConfigurationValid && isThrusterDisabled($store.state.editingBattlecruiserConfiguration.Thruster))"
                                >
                                    Save
                                </v-btn>
                            </v-flex>
                            <v-flex shrink>
                                <v-btn 
                                    block rounded color="orange" @click="revertBattlecruiserConfiguration('Thruster')"
                                    :disabled="battlecruiserConfiguration.ThrusterGuid === $store.state.editingBattlecruiserConfiguration.ThrusterGuid || isThrusterDisabled(battlecruiserConfiguration.Thruster)"
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
                            <span class="title" v-if="open">Weapon Frame 1</span>
                            <v-layout wrap align-center v-else>
                                <v-flex shrink>
                                    <span class="title">Weapon Frame 1</span>
                                </v-flex>
                                <v-flex v-if="battlecruiserConfiguration.WeaponFrame1Guid !== $store.state.editingBattlecruiserConfiguration.WeaponFrame1Guid" shrink>
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
                                                {{ $store.state.editingBattlecruiserConfiguration.WeaponFrame1Title }}
                                            </v-chip>
                                        </template>
                                        <weapon-frame-overview
                                            :weaponFrame="$store.state.editingBattlecruiserConfiguration.WeaponFrame1"
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
                                                :color="isWeaponFrame1Disabled(battlecruiserConfiguration.WeaponFrame1) ? 'red' : 'orange'"
                                            >
                                                {{ battlecruiserConfiguration.WeaponFrame1Title }}
                                            </v-chip>
                                        </template>
                                        <weapon-frame-overview
                                            :weaponFrame="battlecruiserConfiguration.WeaponFrame1"
                                            :style="`border: 2px solid ${isWeaponFrame1Disabled(battlecruiserConfiguration.WeaponFrame1) ? 'red' : 'orange'}`"
                                            :allowClick="false"
                                        ></weapon-frame-overview>
                                    </v-menu>   
                                </v-flex>
                                <v-spacer />
                                <v-flex shrink class="mr-5">
                                    <v-layout wrap>
                                        <v-flex shrink v-if="battlecruiserConfiguration.WeaponFrame1Guid !== $store.state.editingBattlecruiserConfiguration.WeaponFrame1Guid">
                                            <v-btn 
                                                small rounded color="cfPrimary" @click.stop="updateBattlecruiserConfiguration('WeaponFrame1')" :disabled="!isBattlecruiserConfigurationValid && isWeaponFrame1Disabled($store.state.editingBattlecruiserConfiguration.WeaponFrame1)"
                                            >
                                                Save
                                            </v-btn>
                                        </v-flex>
                                        <v-flex shrink v-if="battlecruiserConfiguration.WeaponFrame1Guid !== $store.state.editingBattlecruiserConfiguration.WeaponFrame1Guid">
                                            <v-btn 
                                                small rounded color="orange" @click.stop="revertBattlecruiserConfiguration('WeaponFrame1')" :disabled="isWeaponFrame1Disabled(battlecruiserConfiguration.WeaponFrame1)"
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
                                :items="filteredWeaponFrame1Options"
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
                                    <tr :style="`outline: solid 2px ${getWeaponFrame1ComponentOutlineColor(item.WeaponFrameGuid)}; outline-offset:-0.35rem; border-radius: 24px; ${item.disabled ? 'pointer-events:none;' : ''}`" 
                                        @click="item.disabled ? '' : setEditingWeaponFrame1Component(item)"
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
                            :items="filteredWeaponFrame1Options"
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
                                            :weaponFrame="weaponFrame1" class="fill-height" :style="`outline: solid 2px ${getWeaponFrame1ComponentOutlineColor(weaponFrame1.WeaponFrameGuid)}`"
                                            @weapon-frame-click="setEditingWeaponFrame1Component(weaponFrame1)" 
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
                                    block rounded color="cfPrimary" @click="updateBattlecruiserConfiguration('WeaponFrame1')"
                                    :disabled="battlecruiserConfiguration.WeaponFrame1Guid === $store.state.editingBattlecruiserConfiguration.WeaponFrame1Guid || (!isBattlecruiserConfigurationValid && isWeaponFrame1Disabled($store.state.editingBattlecruiserConfiguration.WeaponFrame1))"
                                >
                                    Save
                                </v-btn>
                            </v-flex>
                            <v-flex shrink>
                                <v-btn 
                                    block rounded color="orange" @click="revertBattlecruiserConfiguration('WeaponFrame1')"
                                    :disabled="battlecruiserConfiguration.WeaponFrame1Guid === $store.state.editingBattlecruiserConfiguration.WeaponFrame1Guid || isWeaponFrame1Disabled(battlecruiserConfiguration.WeaponFrame1)"
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
                            <span class="title" v-if="open">Payload 1</span>
                            <v-layout wrap align-center v-else>
                                <v-flex shrink>
                                    <span class="title">Payload 1</span>
                                </v-flex>
                                <v-flex v-if="battlecruiserConfiguration.Payload1Guid !== $store.state.editingBattlecruiserConfiguration.Payload1Guid" shrink>
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
                                                {{ $store.state.editingBattlecruiserConfiguration.Payload1Title }}
                                            </v-chip>
                                        </template>
                                        <payload-overview
                                            :payload="$store.state.editingBattlecruiserConfiguration.Payload1"
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
                                                :color="isPayload1Disabled(battlecruiserConfiguration.Payload1) ? 'red' : 'orange'"
                                            >
                                                {{ battlecruiserConfiguration.Payload1Title }}
                                            </v-chip>
                                        </template>
                                        <payload-overview
                                            :payload="battlecruiserConfiguration.Payload1"
                                            :style="`border: 2px solid ${isPayload1Disabled(battlecruiserConfiguration.Payload1) ? 'red' : 'orange'}`"
                                            :allowClick="false"
                                        ></payload-overview>
                                    </v-menu>   
                                </v-flex>
                                <v-spacer />
                                <v-flex shrink class="mr-5">
                                    <v-layout wrap>
                                        <v-flex shrink v-if="battlecruiserConfiguration.Payload1Guid !== $store.state.editingBattlecruiserConfiguration.Payload1Guid">
                                            <v-btn 
                                                small rounded color="cfPrimary" @click.stop="updateBattlecruiserConfiguration('Payload1')" :disabled="!isBattlecruiserConfigurationValid && isPayload1Disabled($store.state.editingBattlecruiserConfiguration.Payload1)"
                                            >
                                                Save
                                            </v-btn>
                                        </v-flex>
                                        <v-flex shrink v-if="battlecruiserConfiguration.Payload1Guid !== $store.state.editingBattlecruiserConfiguration.Payload1Guid">
                                            <v-btn 
                                                small rounded color="orange" @click.stop="revertBattlecruiserConfiguration('Payload1')" :disabled="isPayload1Disabled(battlecruiserConfiguration.Payload1)"
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
                                :items="filteredPayload1Options"
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
                                    <tr :style="`outline: solid 2px ${getPayload1ComponentOutlineColor(item.PayloadGuid)}; outline-offset:-0.35rem; border-radius: 24px; ${item.disabled ? 'pointer-events:none;' : ''}`" 
                                        @click="item.disabled ? '' : setEditingPayload1Component(item)"
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
                            :items="filteredPayload1Options"
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
                                            :payload="payload1" class="fill-height" :style="`outline: solid 2px ${getPayload1ComponentOutlineColor(payload1.PayloadGuid)}`"
                                            @payload-click="setEditingPayload1Component(payload1)" 
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
                                    block rounded color="cfPrimary" @click="updateBattlecruiserConfiguration('Payload1')"
                                    :disabled="battlecruiserConfiguration.Payload1Guid === $store.state.editingBattlecruiserConfiguration.Payload1Guid || (!isBattlecruiserConfigurationValid  && isPayload1Disabled($store.state.editingBattlecruiserConfiguration.Payload1))"
                                >
                                    Save
                                </v-btn>
                            </v-flex>
                            <v-flex shrink>
                                <v-btn 
                                    block rounded color="orange" @click="revertBattlecruiserConfiguration('Payload1')"
                                    :disabled="battlecruiserConfiguration.Payload1Guid === $store.state.editingBattlecruiserConfiguration.Payload1Guid || isPayload1Disabled(battlecruiserConfiguration.Payload1)"
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
                            <span class="title" v-if="open">Weapon Frame 2</span>
                            <v-layout wrap align-center v-else>
                                <v-flex shrink>
                                    <span class="title">Weapon Frame 2</span>
                                </v-flex>
                                <v-flex v-if="battlecruiserConfiguration.WeaponFrame2Guid !== $store.state.editingBattlecruiserConfiguration.WeaponFrame2Guid" shrink>
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
                                                {{ $store.state.editingBattlecruiserConfiguration.WeaponFrame2Title }}
                                            </v-chip>
                                        </template>
                                        <weapon-frame-overview
                                            :weaponFrame="$store.state.editingBattlecruiserConfiguration.WeaponFrame2"
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
                                                :color="isWeaponFrame2Disabled(battlecruiserConfiguration.WeaponFrame2) ? 'red' : 'orange'"
                                            >
                                                {{ battlecruiserConfiguration.WeaponFrame2Title }}
                                            </v-chip>
                                        </template>
                                        <weapon-frame-overview
                                            :weaponFrame="battlecruiserConfiguration.WeaponFrame2"
                                            :style="`border: 2px solid ${isWeaponFrame2Disabled(battlecruiserConfiguration.WeaponFrame2) ? 'red' : 'orange'}`"
                                            :allowClick="false"
                                        ></weapon-frame-overview>
                                    </v-menu>   
                                </v-flex>
                                <v-spacer />
                                <v-flex shrink class="mr-5">
                                    <v-layout wrap>
                                        <v-flex shrink v-if="battlecruiserConfiguration.WeaponFrame2Guid !== $store.state.editingBattlecruiserConfiguration.WeaponFrame2Guid">
                                            <v-btn 
                                                small rounded color="cfPrimary" @click.stop="updateBattlecruiserConfiguration('WeaponFrame2')" :disabled="!isBattlecruiserConfigurationValid && isWeaponFrame2Disabled($store.state.editingBattlecruiserConfiguration.WeaponFrame2)"
                                            >
                                                Save
                                            </v-btn>
                                        </v-flex>
                                        <v-flex shrink v-if="battlecruiserConfiguration.WeaponFrame2Guid !== $store.state.editingBattlecruiserConfiguration.WeaponFrame2Guid">
                                            <v-btn 
                                                small rounded color="orange" @click.stop="revertBattlecruiserConfiguration('WeaponFrame2')" :disabled="isWeaponFrame2Disabled(battlecruiserConfiguration.WeaponFrame2)"
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
                                <v-text-field v-model="$store.state.weaponFrame2sSearch"
                                    clearable outlined hide-details rounded dense
                                    prepend-icon="mdi-magnify" label="Search" color="cfPrimary"
                                ></v-text-field>
                            </v-flex>
                            <v-flex grow>
                                <v-combobox v-model="$store.state.payload1sSortBy"
                                    flat outlined hide-details rounded dense clearable
                                    label="Sort by" color="cfPrimary" item-color="cfPrimary" item-text="text" item-value="value"
                                    :items="$store.state.weaponFrame2sSortOptions" :menu-props="{maxHeight: 600}"
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
                                <v-btn-toggle rounded dense v-model="$store.state.weaponFrame2sSortDesc" mandatory>
                                    <v-btn depressed :value="false">
                                        <v-icon>mdi-arrow-up</v-icon>
                                    </v-btn>
                                    <v-btn depressed :value="true">
                                        <v-icon>mdi-arrow-down</v-icon>
                                    </v-btn>
                                </v-btn-toggle>
                            </v-flex>
                            <v-flex shrink>
                                <v-switch v-model="$store.state.weaponFrame2sShowOnlyFeasible" class="mt-0"
                                    hide-details dense label="Only Feasible" color="cfPrimary"
                                >
                                </v-switch>
                            </v-flex>
                        </v-layout>
                        <v-card class="rounded-xl mb-2 mt-2" outlined v-if="$store.state.configurationsCondensedView">
                            <v-data-table
                                :items="filteredWeaponFrame2Options"
                                :items-per-page.sync="$store.state.weaponFrame2sItemsPerPage"
                                :page.sync="$store.state.weaponFrame2sPageSync"
                                @page-count="$store.state.weaponFrame2sPageCount = $event"
                                :search.sync="$store.state.weaponFrame2sSearch" class="rounded-table clickable-rows"
                                :sort-by="$store.state.weaponFrame2sSortBy ? $store.state.weaponFrame2sSortBy.value : null"
                                :sort-desc.sync="$store.state.weaponFrame2sSortDesc" dense loader-height="0"
                                hide-default-footer :loading="weaponFrame2sLoading" :headers="$store.state.weaponFrame2sHeaders"
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
                                    <tr :style="`outline: solid 2px ${getWeaponFrame2ComponentOutlineColor(item.WeaponFrameGuid)}; outline-offset:-0.35rem; border-radius: 24px; ${item.disabled ? 'pointer-events:none;' : ''}`" 
                                        @click="item.disabled ? '' : setEditingWeaponFrame2Component(item)"
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
                            :items="filteredWeaponFrame2Options"
                            :items-per-page.sync="$store.state.weaponFrame2sItemsPerPage"
                            :page.sync="$store.state.weaponFrame2sPageSync"
                            @page-count="$store.state.weaponFrame2sPageCount = $event"
                            :search="$store.state.weaponFrame2sSearch" class="mt-2 mb-2"
                            :sort-by="$store.state.weaponFrame2sSortBy ? $store.state.weaponFrame2sSortBy.value : null"
                            :sort-desc="$store.state.weaponFrame2sSortDesc"
                            hide-default-footer :loading="weaponFrame2sLoading"
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
                                    <v-flex xs12 sm12 md6 lg4 xl4 v-for="(weaponFrame2, i) in props.items" :key="i">
                                        <weapon-frame-overview 
                                            :weaponFrame="weaponFrame2" class="fill-height" :style="`outline: solid 2px ${getWeaponFrame2ComponentOutlineColor(weaponFrame2.WeaponFrameGuid)}`"
                                            @weapon-frame-click="setEditingWeaponFrame2Component(weaponFrame2)" 
                                            :disabled="weaponFrame2.disabled"
                                        ></weapon-frame-overview>
                                    </v-flex>
                                </v-layout>
                            </template>
                        </v-data-iterator>
                        <v-layout wrap align-center>
                            <v-flex grow>
                                <v-pagination :length="$store.state.weaponFrame2sPageCount" :total-visible="7"
                                    v-model="$store.state.weaponFrame2sPageSync" color="cfPrimary" circle
                                ></v-pagination>
                            </v-flex>
                            <v-flex xs12 sm12 md4 lg3 xl3>
                                <v-select v-model="$store.state.weaponFrame2sItemsPerPage"
                                    :items="$store.state.itemsPerPageOptions"
                                    outlined hide-details rounded dense item-value="value" item-text="text"
                                    label="Items Per Page" color="cfPrimary" item-color="cfPrimary"
                                ></v-select>
                            </v-flex>
                            <v-flex shrink>
                                <v-btn 
                                    block rounded color="cfPrimary" @click="updateBattlecruiserConfiguration('WeaponFrame2')"
                                    :disabled="battlecruiserConfiguration.WeaponFrame2Guid === $store.state.editingBattlecruiserConfiguration.WeaponFrame2Guid || (!isBattlecruiserConfigurationValid && isWeaponFrame2Disabled($store.state.editingBattlecruiserConfiguration.WeaponFrame2))"
                                >
                                    Save
                                </v-btn>
                            </v-flex>
                            <v-flex shrink>
                                <v-btn 
                                    block rounded color="orange" @click="revertBattlecruiserConfiguration('WeaponFrame2')"
                                    :disabled="battlecruiserConfiguration.WeaponFrame2Guid === $store.state.editingBattlecruiserConfiguration.WeaponFrame2Guid || isWeaponFrame2Disabled(battlecruiserConfiguration.WeaponFrame2)"
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
                            <span class="title" v-if="open">Payload 2</span>
                            <v-layout wrap align-center v-else>
                                <v-flex shrink>
                                    <span class="title">Payload 2</span>
                                </v-flex>
                                <v-flex v-if="battlecruiserConfiguration.Payload2Guid !== $store.state.editingBattlecruiserConfiguration.Payload2Guid" shrink>
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
                                                {{ $store.state.editingBattlecruiserConfiguration.Payload2Title }}
                                            </v-chip>
                                        </template>
                                        <payload-overview
                                            :payload="$store.state.editingBattlecruiserConfiguration.Payload2"
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
                                                :color="isPayload2Disabled(battlecruiserConfiguration.Payload2) ? 'red' : 'orange'"
                                            >
                                                {{ battlecruiserConfiguration.Payload2Title }}
                                            </v-chip>
                                        </template>
                                        <payload-overview
                                            :payload="battlecruiserConfiguration.Payload2"
                                            :style="`border: 2px solid ${isPayload2Disabled(battlecruiserConfiguration.Payload2) ? 'red' : 'orange'}`"
                                            :allowClick="false"
                                        ></payload-overview>
                                    </v-menu>   
                                </v-flex>
                                <v-spacer />
                                <v-flex shrink class="mr-5">
                                    <v-layout wrap>
                                        <v-flex shrink v-if="battlecruiserConfiguration.Payload2Guid !== $store.state.editingBattlecruiserConfiguration.Payload2Guid">
                                            <v-btn 
                                                small rounded color="cfPrimary" @click.stop="updateBattlecruiserConfiguration('Payload2')" :disabled="!isBattlecruiserConfigurationValid && isPayload2Disabled($store.state.editingBattlecruiserConfiguration.WeaponFrame2)"
                                            >
                                                Save
                                            </v-btn>
                                        </v-flex>
                                        <v-flex shrink v-if="battlecruiserConfiguration.Payload2Guid !== $store.state.editingBattlecruiserConfiguration.Payload2Guid">
                                            <v-btn 
                                                small rounded color="orange" @click.stop="revertBattlecruiserConfiguration('Payload2')" :disabled="isPayload2Disabled(battlecruiserConfiguration.Payload2)"
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
                                <v-text-field v-model="$store.state.payload2sSearch"
                                    clearable outlined hide-details rounded dense
                                    prepend-icon="mdi-magnify" label="Search" color="cfPrimary"
                                ></v-text-field>
                            </v-flex>
                            <v-flex grow>
                                <v-combobox v-model="$store.state.payload2sSortBy"
                                    flat outlined hide-details rounded dense clearable
                                    label="Sort by" color="cfPrimary" item-color="cfPrimary" item-text="text" item-value="value"
                                    :items="$store.state.payload2sSortOptions" :menu-props="{maxHeight: 600}"
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
                                <v-btn-toggle rounded dense v-model="$store.state.payload2sSortDesc" mandatory>
                                    <v-btn depressed :value="false">
                                        <v-icon>mdi-arrow-up</v-icon>
                                    </v-btn>
                                    <v-btn depressed :value="true">
                                        <v-icon>mdi-arrow-down</v-icon>
                                    </v-btn>
                                </v-btn-toggle>
                            </v-flex>
                            <v-flex shrink>
                                <v-switch v-model="$store.state.payload2sShowOnlyFeasible" class="mt-0"
                                    hide-details dense label="Only Feasible" color="cfPrimary"
                                >
                                </v-switch>
                            </v-flex>
                        </v-layout>
                        <v-card class="rounded-xl mb-2 mt-2" outlined v-if="$store.state.configurationsCondensedView">
                            <v-data-table
                                :items="filteredPayload2Options"
                                :items-per-page.sync="$store.state.payload2sItemsPerPage"
                                :page.sync="$store.state.payload2sPageSync"
                                @page-count="$store.state.payload2sPageCount = $event"
                                :search.sync="$store.state.payload2sSearch" class="rounded-table clickable-rows"
                                :sort-by="$store.state.payload2sSortBy ? $store.state.payload2sSortBy.value : null"
                                :sort-desc.sync="$store.state.payload2sSortDesc" dense loader-height="0"
                                hide-default-footer :loading="payload2sLoading" :headers="$store.state.payload2sHeaders"
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
                                    <tr :style="`outline: solid 2px ${getPayload2ComponentOutlineColor(item.PayloadGuid)}; outline-offset:-0.35rem; border-radius: 24px; ${item.disabled ? 'pointer-events:none;' : ''}`" 
                                        @click="item.disabled ? '' : setEditingPayload2Component(item)"
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
                            :items="filteredPayload2Options"
                            :items-per-page.sync="$store.state.payload2sItemsPerPage"
                            :page.sync="$store.state.payload2sPageSync"
                            @page-count="$store.state.payload2sPageCount = $event"
                            :search="$store.state.payload2sSearch" class="mt-2 mb-2"
                            :sort-by="$store.state.payload2sSortBy ? $store.state.payload2sSortBy.value : null"
                            :sort-desc="$store.state.payload2sSortDesc"
                            hide-default-footer :loading="payload2sLoading"
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
                                    <v-flex xs12 sm12 md6 lg4 xl4 v-for="(payload2, i) in props.items" :key="i">
                                        <payload-overview 
                                            :payload="payload2" class="fill-height" :style="`outline: solid 2px ${getPayload2ComponentOutlineColor(payload2.PayloadGuid)}`"
                                            @payload-click="setEditingPayload2Component(payload2)" 
                                            :disabled="payload2.disabled"
                                        ></payload-overview>
                                    </v-flex>
                                </v-layout>
                            </template>
                        </v-data-iterator>
                        <v-layout wrap align-center>
                            <v-flex grow>
                                <v-pagination :length="$store.state.payload2sPageCount" :total-visible="7"
                                    v-model="$store.state.payload2sPageSync" color="cfPrimary" circle
                                ></v-pagination>
                            </v-flex>
                            <v-flex xs12 sm12 md4 lg3 xl3>
                                <v-select v-model="$store.state.payload2sItemsPerPage"
                                    :items="$store.state.itemsPerPageOptions"
                                    outlined hide-details rounded dense item-value="value" item-text="text"
                                    label="Items Per Page" color="cfPrimary" item-color="cfPrimary"
                                ></v-select>
                            </v-flex>
                            <v-flex shrink>
                                <v-btn 
                                    block rounded color="cfPrimary" @click="updateBattlecruiserConfiguration('Payload2')"
                                    :disabled="battlecruiserConfiguration.Payload2Guid === $store.state.editingBattlecruiserConfiguration.Payload2Guid || (!isBattlecruiserConfigurationValid && isPayload2Disabled($store.state.editingBattlecruiserConfiguration.WeaponFrame2))"
                                >
                                    Save
                                </v-btn>
                            </v-flex>
                            <v-flex shrink>
                                <v-btn 
                                    block rounded color="orange" @click="revertBattlecruiserConfiguration('Payload2')"
                                    :disabled="battlecruiserConfiguration.Payload2Guid === $store.state.editingBattlecruiserConfiguration.Payload2Guid || isPayload2Disabled(battlecruiserConfiguration.Payload2)"
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
            :class="$store.state.battlecruiserConfigurationWeaponChartsPinned ? 'sticky-weapon-chart elevation-20' : 'background'"
            :style="[
                {outline: `thin solid ${$vuetify.theme.dark ? $vuetify.theme.themes.dark['outline'] : $vuetify.theme.themes.light['outline']}`},
                // {top: `${$store.state.battlecruiserConfigurationStatsPinned ? '60px' : ''}`},
                // {position: `${$store.state.battlecruiserConfigurationStatsPinned ? 'sticky' : ''}`},
            ]"
        >
            <v-container grid-list-sm fluid>
                <v-layout wrap align-center>
                    <v-flex shrink>
                        <v-btn small fab @click.stop="toggleWeaponChartsPinned()" top left elevation="3">
                            <v-icon v-if="$store.state.battlecruiserConfigurationWeaponChartsPinned">mdi-pin-off</v-icon>
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
                    <v-flex xs12 md6 class="pt-0 pb-0">
                        <v-layout wrap justify-center>
                            <v-flex xs12 class="text-center pt-0 pb-0">
                                <span class="subtitle-2">Weapon 1</span><br/>
                                <span class="title font-weight-bold">
                                    {{`${this.$store.state.editingBattlecruiserConfiguration.WeaponFrame1.Title} & ${this.$store.state.editingBattlecruiserConfiguration.Payload1.Title}`}}
                                </span>
                            </v-flex>
                            <v-flex xs12 class="pt-0 pb-0" v-show="$store.state.configurationsShowWeaponModelCharts" v-if="!isWeaponFrame1Disabled($store.state.editingBattlecruiserConfiguration.WeaponFrame1) && !isPayload1Disabled($store.state.editingBattlecruiserConfiguration.Payload1)">
                                <weapon-model-chart
                                    :weaponFrame="$store.state.editingBattlecruiserConfiguration.WeaponFrame1"
                                    :payload="$store.state.editingBattlecruiserConfiguration.Payload1"
                                ></weapon-model-chart>
                            </v-flex>
                            <v-flex xs12 class="pt-0 pb-0" v-show="$store.state.configurationsShowWeaponDamageCharts" v-if="!isWeaponFrame1Disabled($store.state.editingBattlecruiserConfiguration.WeaponFrame1) && !isPayload1Disabled($store.state.editingBattlecruiserConfiguration.Payload1)">
                                <weapon-damage-chart
                                    :weaponFrame="$store.state.editingBattlecruiserConfiguration.WeaponFrame1"
                                    :payload="$store.state.editingBattlecruiserConfiguration.Payload1"
                                ></weapon-damage-chart>
                            </v-flex>
                            <v-flex xs12 v-else>
                                <v-alert type="error" class="rounded-xl ma-2" text outlined dense>
                                    Weapon 1 is invald. Please fix the problems to display the charts for Weapon 1.
                                </v-alert>
                            </v-flex>
                        </v-layout>
                    </v-flex>
                    <v-flex xs12 md6 class="pt-0 pb-0">
                        <v-layout wrap>
                            <v-flex xs12 class="text-center pt-0 pb-0">
                                <span class="subtitle-2">Weapon 2</span><br/>
                                <span class="title font-weight-bold">
                                    {{`${this.$store.state.editingBattlecruiserConfiguration.WeaponFrame2.Title} & ${this.$store.state.editingBattlecruiserConfiguration.Payload2.Title}`}}
                                </span>
                            </v-flex>
                            <v-flex xs12 class="pt-0 pb-0" v-show="$store.state.configurationsShowWeaponModelCharts" v-if="!isWeaponFrame2Disabled($store.state.editingBattlecruiserConfiguration.WeaponFrame2) && !isPayload2Disabled($store.state.editingBattlecruiserConfiguration.Payload2)">
                                <weapon-model-chart
                                    :weaponFrame="$store.state.editingBattlecruiserConfiguration.WeaponFrame2"
                                    :payload="$store.state.editingBattlecruiserConfiguration.Payload2"
                                ></weapon-model-chart>
                            </v-flex>
                            <v-flex xs12 class="pt-0 pb-0" v-show="$store.state.configurationsShowWeaponDamageCharts" v-if="!isWeaponFrame2Disabled($store.state.editingBattlecruiserConfiguration.WeaponFrame2) && !isPayload2Disabled($store.state.editingBattlecruiserConfiguration.Payload2)">
                                <weapon-damage-chart
                                    :weaponFrame="$store.state.editingBattlecruiserConfiguration.WeaponFrame2"
                                    :payload="$store.state.editingBattlecruiserConfiguration.Payload2"
                                ></weapon-damage-chart>
                            </v-flex>
                            <v-flex xs12 v-else>
                                <v-alert type="error" class="rounded-xl ma-2" text outlined dense>
                                    Weapon 2 is invald. Please fix the problems to display the charts for Weapon 2.
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
import { BattlecruiserConfigurationDto } from '../../models/Configurations/DTOs/BattlecruiserConfigurationDto'
import { BattlecruiserConfigurationRepository, BattlecruiserRepository, ArmorRepository, PointDefenseSystemRepository, FuelSystemRepository, ThrusterRepository, WeaponFrameRepository, PayloadRepository } from '../../repositories';
import BattlecruiserOverview from '../Battlecruiser/BattlecruiserOverview.vue';
import ArmorOverview from '../Armor/ArmorOverview.vue';
import PointDefenseSystemOverview from '../PointDefenseSystem/PointDefenseSystemOverview.vue';
import FuelSystemOverview from '../FuelSystem/FuelSystemOverview.vue';
import ThrusterOverview from '../Thruster/ThrusterOverview.vue';
import WeaponFrameOverview from '../WeaponFrame/WeaponFrameOverview.vue';
import PayloadOverview from '../Payload/PayloadOverview.vue';
import WeaponModelChart from '../Charts/WeaponModelChart.vue';
import WeaponDamageChart from '../Charts/WeaponDamageChart.vue';
import { BattlecruiserModel } from '../../models/Battlecruiser/BattlecruiserModel';
import { ArmorModel } from '../../models/Armor/ArmorModel';
import { PointDefenseSystemModel } from '../../models/PointDefenseSystem/PointDefenseSystemModel';
import { FuelSystemModel } from '../../models/FuelSystem/FuelSystemModel';
import { ThrusterModel } from '../../models/Thruster/ThrusterModel';
import { WeaponFrameModel } from '../../models/WeaponFrame/WeaponFrameModel';
import { PayloadModel } from '../../models/Payload/PayloadModel';

export default {
    name: "BattlecruiserConfiguration",

    components: {
        BattlecruiserOverview,
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
        battlecruiserConfiguration: {
            type: Object,
            required: true
        }
    },

    data: () => ({
        problemSummaryDailogOpen: false,
        weaponChartsSettingsDialogOpen: false,

        battlecruiserOptions: [],
        armorOptions: [],
        pointDefenseSystemOptions: [],
        fuelSystemOptions: [],
        thrusterOptions: [],
        weaponFrame1Options: [],
        weaponFrame2Options: [],
        payload1Options: [],
        payload2Options: [],

        battlecruisersLoading: false,
        armorsLoading: false,
        pointDefenseSystemsLoading: false,
        fuelSystemsLoading: false,
        thrustersLoading: false,
        weaponFrame1sLoading: false,
        payload1sLoading: false,
        weaponFrame2sLoading: false,
        payload2sLoading: false,

        battlecruiserConfigurationRepository: new BattlecruiserConfigurationRepository(),
        battlecruiserRepository: new BattlecruiserRepository(),
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

        hullMassDifference() {
            return this.$store.state.editingBattlecruiserConfiguration.Battlecruiser.HullMass - this.battlecruiserConfiguration.Battlecruiser.HullMass;
        },
        totalMassDifference() {
            return this.$store.state.editingBattlecruiserConfiguration.TotalMass - this.battlecruiserConfiguration.TotalMass;
        },
        totalCrewCostDifference() {
            return this.$store.state.editingBattlecruiserConfiguration.TotalCrewCost - this.battlecruiserConfiguration.TotalCrewCost;
        },
        totalHeatCapacityDifference() {
            return this.$store.state.editingBattlecruiserConfiguration.TotalHeatCapacity - this.battlecruiserConfiguration.TotalHeatCapacity;
        },
        maneuverabilityDifference() {
            return this.$store.state.editingBattlecruiserConfiguration.Maneuverability - this.battlecruiserConfiguration.Maneuverability;
        },
        fuelConsumptionRateDifference() {
            return this.$store.state.editingBattlecruiserConfiguration.FuelSystemFuelConsumptionRate - this.battlecruiserConfiguration.FuelSystemFuelConsumptionRate;
        },
        fuelCapacityDifference() {
            return this.$store.state.editingBattlecruiserConfiguration.FuelSystemFuelCapacity - this.battlecruiserConfiguration.FuelSystemFuelCapacity;
        },
        fuelRegenerationRateDifference() {
            return this.$store.state.editingBattlecruiserConfiguration.FuelSystemFuelRegenerationRate - this.battlecruiserConfiguration.FuelSystemFuelRegenerationRate;
        },
        battlecruiserConfigurationModulePointsUsageColor() {
            if (this.$store.state.editingBattlecruiserConfiguration.TotalModulePointsUsage < this.$store.state.editingBattlecruiserConfiguration.BattlecruiserModulePointLimit) {
                return 'lime darken-3';
            } else if (this.$store.state.editingBattlecruiserConfiguration.TotalModulePointsUsage === this.$store.state.editingBattlecruiserConfiguration.BattlecruiserModulePointLimit) {
                return 'green';
            } else if (this.$store.state.editingBattlecruiserConfiguration.TotalModulePointsUsage > this.$store.state.editingBattlecruiserConfiguration.BattlecruiserModulePointLimit) {
                return 'red';
            } else {
                return '';
            }
        },

        filteredBattlecruiserOptions() {
            if (this.battlecruiserOptions.length <= 0) {
                return [];
            }
            var filtered = [];
            this.battlecruiserOptions.forEach((battlecruiser) => {
                battlecruiser.disabled = this.isBattlecruiserDisabled(battlecruiser);

                if (this.$store.state.battlecruisersShowOnlyFeasible) {
                    if (!battlecruiser.disabled) {
                        filtered.push(battlecruiser)
                    }
                } else {
                    filtered.push(battlecruiser)
                }
            });
            this.validateCurrentSelectionFeasibility('Battlecruiser')
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
        filteredWeaponFrame1Options() {
            if (this.weaponFrame1Options.length <= 0) {
                return [];
            }
            var filtered = [];
            this.weaponFrame1Options.forEach((weaponFrame) => {
                weaponFrame.disabled = this.isWeaponFrame1Disabled(weaponFrame);

                if (this.$store.state.weaponFrame1sShowOnlyFeasible) {
                    if (!weaponFrame.disabled) {
                        filtered.push(weaponFrame)
                    }
                } else {
                    filtered.push(weaponFrame)
                }
            });
            this.validateCurrentSelectionFeasibility('WeaponFrame1')
            return filtered;
        },
        filteredPayload1Options() {
            if (this.payload1Options.length <= 0) {
                return [];
            }
            var filtered = [];
            this.payload1Options.forEach((payload) => {
                payload.disabled = this.isPayload1Disabled(payload);

                if (this.$store.state.payload1sShowOnlyFeasible) {
                    if (!payload.disabled) {
                        filtered.push(payload)
                    }
                } else {
                    filtered.push(payload)
                }
            });
            this.validateCurrentSelectionFeasibility('Payload1')
            return filtered;
        },
        filteredWeaponFrame2Options() {
            if (this.weaponFrame2Options.length <= 0) {
                return [];
            }
            var filtered = [];
            this.weaponFrame2Options.forEach((weaponFrame) => {
                weaponFrame.disabled = this.isWeaponFrame2Disabled(weaponFrame);

                if (this.$store.state.weaponFrame2sShowOnlyFeasible) {
                    if (!weaponFrame.disabled) {
                        filtered.push(weaponFrame)
                    }
                } else {
                    filtered.push(weaponFrame)
                }
            });
            this.validateCurrentSelectionFeasibility('WeaponFrame2')
            return filtered;
        },
        filteredPayload2Options() {
            if (this.payload2Options.length <= 0) {
                return [];
            }
            var filtered = [];
            this.payload2Options.forEach((payload) => {
                payload.disabled = this.isPayload2Disabled(payload);

                if (this.$store.state.payload2sShowOnlyFeasible) {
                    if (!payload.disabled) {
                        filtered.push(payload)
                    }
                } else {
                    filtered.push(payload)
                }
            });
            this.validateCurrentSelectionFeasibility('Payload2')
            return filtered;
        },

        battlecruiserErrors() {
            var errors = [];
            if (this.$store.state.editingBattlecruiserConfiguration.Battlecruiser.disabled) {
                errors.push({message: 'The proposed Hull Class is invalid with other proposed changes.'})
            }
            if (this.isBattlecruiserDisabledByModulePoints(this.battlecruiserConfiguration.Battlecruiser)) {
                errors.push({message: 'The original Hull Class does not have enough Module Points Capacity for the proposed changes.'})
            }
            if (this.isBattlecruiserDisabledByPDSPowerLevel(this.battlecruiserConfiguration.Battlecruiser)) {
                errors.push({message: 'The original Hull Class PDS Power Level is too low for the proposed PDS.'})
            }
            if (this.isBattlecruiserDisabledByWeaponFrame1PowerLevel(this.battlecruiserConfiguration.Battlecruiser)) {
                errors.push({message: 'The original Hull Class Weapon Power Level is too low for the proposed Weapon Frame 1.'})
            }
            if (this.isBattlecruiserDisabledByWeaponFrame2PowerLevel(this.battlecruiserConfiguration.Battlecruiser)) {
                errors.push({message: 'The original Hull Class Weapon Power Level is too low for the proposed Weapon Frame 2.'})
            }
            return errors;
        },
        armorErrors() {
            var errors = [];
            if (this.$store.state.editingBattlecruiserConfiguration.Armor.disabled) {
                errors.push({message: 'The proposed Armor is invalid with other proposed changes.'})
            }
            if (this.isArmorDisabledByModulePoints(this.battlecruiserConfiguration.Armor)) {
                errors.push({message: 'The original Armor costs too many Module Points for the proposed changes.'})
            }
            return errors;
        },
        pointDefenseSystemErrors() {
            var errors = [];
            if (this.$store.state.editingBattlecruiserConfiguration.PointDefenseSystem.disabled) {
                errors.push({message: 'The proposed Point Defense System is invalid with other proposed changes.'})
            }
            if (this.isPointDefenseSystemDisabledByModulePoints(this.battlecruiserConfiguration.PointDefenseSystem)) {
                errors.push({message: 'The original Point Defense System costs too many Module Points for the proposed changes.'})
            }
            if (this.isPointDefenseSystemDisabledByPowerLevel(this.battlecruiserConfiguration.PointDefenseSystem)) {
                errors.push({message: 'The original Point Defense System Power Level is too high for the proposed Hull Class.'})
            }
            return errors;
        },
        fuelSystemErrors() {
            var errors = [];
            if (this.$store.state.editingBattlecruiserConfiguration.FuelSystem.disabled) {
                errors.push({message: 'The proposed Fuel System is invalid with other proposed changes.'})
            }
            if (this.isFuelSystemDisabledByModulePoints(this.battlecruiserConfiguration.FuelSystem)) {
                errors.push({message: 'The original Fuel System costs too many Module Points for the proposed changes.'})
            }
            return errors;
        },
        thrusterErrors() {
            var errors = [];
            if (this.$store.state.editingBattlecruiserConfiguration.Thruster.disabled) {
                errors.push({message: 'The proposed Thruster is invalid with other proposed changes.'})
            }
            if (this.isThrusterDisabledByModulePoints(this.battlecruiserConfiguration.Thruster)) {
                errors.push({message: 'The original Thruster costs too many Module Points for the proposed changes.'})
            }
            return errors;
        },
        weaponFrame1Errors() {
            var errors = [];
            if (this.$store.state.editingBattlecruiserConfiguration.WeaponFrame1.disabled) {
                errors.push({message: 'The proposed Weapon Frame 1 is invalid with other proposed changes.'})
            }
            if (this.isWeaponFrame1DisabledByModulePoints(this.battlecruiserConfiguration.WeaponFrame1)) {
                errors.push({message: 'The original Weapon Frame 1 costs too many Module Points for the proposed changes.'})
            }
            if (this.isWeaponFrame1DisabledByPowerLevel(this.battlecruiserConfiguration.WeaponFrame1)) {
                errors.push({message: 'The original Weapon Frame 1 Power Level is too high for the proposed Hull Class.'})
            }
            if (this.isWeaponFrame1DisabledByWeaponFrameType(this.battlecruiserConfiguration.WeaponFrame1)) {
                errors.push({message: 'The original Weapon Frame 1 Weapon Type is incompatable with the proposed Payload 1.'})
            }
            return errors;
        },
        payload1Errors() {
            var errors = [];
            if (this.$store.state.editingBattlecruiserConfiguration.Payload1.disabled) {
                errors.push({message: 'The proposed Payload 1 is invalid with other proposed changes.'})
            }
            if (this.isPayload1DisabledByModulePoints(this.battlecruiserConfiguration.Payload1)) {
                errors.push({message: 'The original Payload 1 costs too many Module Points for the proposed changes.'})
            }
            if (this.isPayload1DisabledByPowerLevel(this.battlecruiserConfiguration.Payload1)) {
                errors.push({message: 'The original Payload 1 Power Level is too high for the proposed Weapon Frame 1.'})
            }
            if (this.isPayload1DisabledByWeaponFrameType(this.battlecruiserConfiguration.Payload1)) {
                errors.push({message: 'The original Payload 1 Weapon Type is incompatable with the proposed Weapon Frame 1.'})
            }
            return errors;
        },
        weaponFrame2Errors() {
            var errors = [];
            if (this.$store.state.editingBattlecruiserConfiguration.WeaponFrame2.disabled) {
                errors.push({message: 'The proposed Weapon Frame 2 is invalid with other proposed changes.'})
            }
            if (this.isWeaponFrame2DisabledByModulePoints(this.battlecruiserConfiguration.WeaponFrame2)) {
                errors.push({message: 'The original Weapon Frame 2 costs too many Module Points for the proposed changes.'})
            }
            if (this.isWeaponFrame2DisabledByPowerLevel(this.battlecruiserConfiguration.WeaponFrame2)) {
                errors.push({message: 'The original Weapon Frame 2 Power Level is too high for the proposed Hull Class.'})
            }
            if (this.isWeaponFrame2DisabledByWeaponFrameType(this.battlecruiserConfiguration.WeaponFrame2)) {
                errors.push({message: 'The original Weapon Frame 2 Weapon Type is incompatable with the proposed Payload 2.'})
            }
            return errors;
        },
        payload2Errors() {
            var errors = [];
            if (this.$store.state.editingBattlecruiserConfiguration.Payload2.disabled) {
                errors.push({message: 'The proposed Payload 2 is invalid with other proposed changes.'})
            }
            if (this.isPayload2DisabledByModulePoints(this.battlecruiserConfiguration.Payload2)) {
                errors.push({message: 'The original Payload 2 costs too many Module Points for the proposed changes.'})
            }
            if (this.isPayload2DisabledByPowerLevel(this.battlecruiserConfiguration.Payload2)) {
                errors.push({message: 'The original Payload 2 Power Level is too high for the proposed Weapon Frame 2.'})
            }
            if (this.isPayload2DisabledByWeaponFrameType(this.battlecruiserConfiguration.Payload2)) {
                errors.push({message: 'The original Payload 2 Weapon Type is incompatable with the proposed Weapon Frame 2.'})
            }
            return errors;
        },
        isBattlecruiserConfigurationValid() {
            var invalid = this.$store.state.editingBattlecruiserConfiguration.Battlecruiser.disabled ||
                          this.isBattlecruiserDisabled(this.battlecruiserConfiguration.Battlecruiser) ||
                          this.$store.state.editingBattlecruiserConfiguration.Armor.disabled ||
                          this.isArmorDisabled(this.battlecruiserConfiguration.Armor) ||
                          this.$store.state.editingBattlecruiserConfiguration.PointDefenseSystem.disabled ||
                          this.isPointDefenseSystemDisabled(this.battlecruiserConfiguration.PointDefenseSystem) ||
                          this.$store.state.editingBattlecruiserConfiguration.FuelSystem.disabled ||
                          this.isFuelSystemDisabled(this.battlecruiserConfiguration.FuelSystem) ||
                          this.$store.state.editingBattlecruiserConfiguration.Thruster.disabled ||
                          this.isThrusterDisabled(this.battlecruiserConfiguration.Thruster) ||
                          this.$store.state.editingBattlecruiserConfiguration.WeaponFrame1.disabled ||
                          this.isWeaponFrame1Disabled(this.battlecruiserConfiguration.WeaponFrame1) ||
                          this.$store.state.editingBattlecruiserConfiguration.Payload1.disabled ||
                          this.isPayload1Disabled(this.battlecruiserConfiguration.Payload1) ||
                          this.$store.state.editingBattlecruiserConfiguration.WeaponFrame2.disabled ||
                          this.isWeaponFrame2Disabled(this.battlecruiserConfiguration.WeaponFrame2) ||
                          this.$store.state.editingBattlecruiserConfiguration.Payload2.disabled ||
                          this.isPayload2Disabled(this.battlecruiserConfiguration.Payload2);

            return !invalid;
        },
    },

    methods: {
        toggleStatsPinned(){
            this.$store.state.battlecruiserConfigurationStatsPinned = !this.$store.state.battlecruiserConfigurationStatsPinned
        },
        toggleWeaponChartsPinned(){
            this.$store.state.battlecruiserConfigurationWeaponChartsPinned = !this.$store.state.battlecruiserConfigurationWeaponChartsPinned
        },
        getBattlecruisers() {
            this.battlecruisersLoading = true;
            this.battlecruiserRepository.getBattlecruisers()
                .then((apiResponse) => {
                    console.log('apiResponse', apiResponse);
                    var responses = apiResponse.data;
                    this.battlecruiserOptions = [];
                    for (var i = 0; i < responses.length; i++) {
                        this.battlecruiserOptions.push(new BattlecruiserModel(responses[i]));
                    }
                    this.battlecruisersLoading = false;
                })
                .catch((apiError) => {
                    console.error(apiError)
                    this.$emit('show-snackbar', {
                        message: 'Failed to load Battlecruiser options. Please try again later',
                        color: 'red',
                        show: true
                    });
                    this.battlecruisersLoading = false;
                })
        },
        isBattlecruiserDisabledByModulePoints(battlecruiser) {
            return battlecruiser.ModulePointLimit < this.$store.state.editingBattlecruiserConfiguration.TotalModulePointsUsage;
        },
        isBattlecruiserDisabledByPDSPowerLevel(battlecruiser) {
            var disabledByPDSPowerLevel = false;
            let level3 = "Level 3";
            let level2 = "Level 2";
            let level1 = "Level 1";
            if (level3 === this.$store.state.editingBattlecruiserConfiguration.PointDefenseSystemPowerLevelText) {
                // disable all Level 2 and all Level 1 options
                disabledByPDSPowerLevel = battlecruiser.PointDefenseSystemPowerLevelText === level1 || battlecruiser.PointDefenseSystemPowerLevelText === level2;
            } else if (level2 === this.$store.state.editingBattlecruiserConfiguration.PointDefenseSystemPowerLevelText) {
                // disable all Level 1 options
                disabledByPDSPowerLevel = battlecruiser.PointDefenseSystemPowerLevelText === level1;
            } else if (level1 === this.$store.state.editingBattlecruiserConfiguration.PointDefenseSystemPowerLevelText) { 
                // allow all options
            }
            return disabledByPDSPowerLevel;
        },
        isBattlecruiserDisabledByWeaponFrame1PowerLevel(battlecruiser) {
            var disabledByWeaponFrame1PowerLevel = false;
            let level3 = "Level 3";
            let level2 = "Level 2";
            let level1 = "Level 1";
            if (level3 === this.$store.state.editingBattlecruiserConfiguration.WeaponFrame1PowerLevelText) {
                // disable all Level 2 and all Level 1 options
                disabledByWeaponFrame1PowerLevel = battlecruiser.WeaponPowerLevelText === level1 || battlecruiser.WeaponPowerLevelText === level2;
            } else if (level2 === this.$store.state.editingBattlecruiserConfiguration.WeaponFrame1PowerLevelText) {
                // disable all Level 1 options
                disabledByWeaponFrame1PowerLevel = battlecruiser.WeaponPowerLevelText === level1;
            } else if (level1 === this.$store.state.editingBattlecruiserConfiguration.WeaponFrame1PowerLevelText) { 
                // allow all options
            }
            return disabledByWeaponFrame1PowerLevel;
        },
        isBattlecruiserDisabledByWeaponFrame2PowerLevel(battlecruiser) {
            var disabledByWeaponFrame2PowerLevel = false;
            let level3 = "Level 3";
            let level2 = "Level 2";
            let level1 = "Level 1";
            if (level3 === this.$store.state.editingBattlecruiserConfiguration.WeaponFrame2PowerLevelText) {
                // disable all Level 2 and all Level 1 options
                disabledByWeaponFrame2PowerLevel = battlecruiser.WeaponPowerLevelText === level1 || battlecruiser.WeaponPowerLevelText === level2;
            } else if (level2 === this.$store.state.editingBattlecruiserConfiguration.WeaponFrame2PowerLevelText) {
                // disable all Level 1 options
                disabledByWeaponFrame2PowerLevel = battlecruiser.WeaponPowerLevelText === level1;
            } else if (level1 === this.$store.state.editingBattlecruiserConfiguration.WeaponFrame2PowerLevelText) { 
                // allow all options
            }
            return disabledByWeaponFrame2PowerLevel;
        },
        isBattlecruiserDisabled(battlecruiser) {
            return this.isBattlecruiserDisabledByModulePoints(battlecruiser) || 
                   this.isBattlecruiserDisabledByPDSPowerLevel(battlecruiser) || 
                   this.isBattlecruiserDisabledByWeaponFrame1PowerLevel(battlecruiser) || 
                   this.isBattlecruiserDisabledByWeaponFrame2PowerLevel(battlecruiser);
        },
        getBattlecruiserOutlineColor(battlecruiserGuid) {
            if (battlecruiserGuid === this.battlecruiserConfiguration.Battlecruiser.BattlecruiserGuid && battlecruiserGuid === this.$store.state.editingBattlecruiserConfiguration.Battlecruiser.BattlecruiserGuid) {
                if (this.isBattlecruiserDisabled(this.battlecruiserOptions.find(option => option.BattlecruiserGuid === battlecruiserGuid))) {
                    return `red`;
                }
                return `${'orange'}`;
            } else if (battlecruiserGuid === this.battlecruiserConfiguration.Battlecruiser.BattlecruiserGuid) {
                if (this.isBattlecruiserDisabled(this.battlecruiserOptions.find(option => option.BattlecruiserGuid === battlecruiserGuid))) {
                    return `red`;
                }
                return `${'orange'}`;
            } else if (battlecruiserGuid === this.$store.state.editingBattlecruiserConfiguration.Battlecruiser.BattlecruiserGuid) {
                return `${this.$vuetify.theme.themes.dark['cfPrimary']}`;
            } else {
                return 'transparent';
            }
        },
        setEditingBattlecruiser(battlecruiser) {
            this.$store.state.editingBattlecruiserConfiguration.setBattlecruiser(battlecruiser);
            this.validateCurrentSelectionFeasibility()
        },
        getArmorComponents() {
            this.armorsLoading = true;
            this.armorRepository.getArmorsBySpaceshipType(this.$store.state.editingBattlecruiserConfiguration.BattlecruiserSpaceshipTypeGuid)
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
            return (this.$store.state.editingBattlecruiserConfiguration.TotalModulePointsUsage - 
                this.$store.state.editingBattlecruiserConfiguration.ArmorModulePointsCost) + 
                armor.ModulePointsCost > 
                this.$store.state.editingBattlecruiserConfiguration.BattlecruiserModulePointLimit;
        },
        isArmorDisabled(armor) {
            return this.isArmorDisabledByModulePoints(armor);
        },
        getArmorComponentOutlineColor(armorGuid) {
            if (armorGuid === this.battlecruiserConfiguration.Armor.ArmorGuid && armorGuid === this.$store.state.editingBattlecruiserConfiguration.Armor.ArmorGuid) {
                if (this.isArmorDisabled(this.armorOptions.find(option => option.ArmorGuid === armorGuid))) {
                    return `red`;
                }
                return `${'orange'}`;
            } else if (armorGuid === this.battlecruiserConfiguration.Armor.ArmorGuid) {
                if (this.isArmorDisabled(this.armorOptions.find(option => option.ArmorGuid === armorGuid))) {
                    return `red`;
                }
                return `${'orange'}`;
            } else if (armorGuid === this.$store.state.editingBattlecruiserConfiguration.Armor.ArmorGuid) {
                return `${this.$vuetify.theme.themes.dark['cfPrimary']}`;
            } else {
                return 'transparent';
            }
        },
        setEditingArmorComponent(armor) {
            this.$store.state.editingBattlecruiserConfiguration.setArmor(armor);
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
            return (this.$store.state.editingBattlecruiserConfiguration.TotalModulePointsUsage - 
                this.$store.state.editingBattlecruiserConfiguration.PointDefenseSystemModulePointsCost) + 
                pointDefenseSystem.ModulePointsCost > 
                this.$store.state.editingBattlecruiserConfiguration.BattlecruiserModulePointLimit;
        },
        isPointDefenseSystemDisabledByPowerLevel(pointDefenseSystem) {
            var disabledByPowerLevel = false;
            let level3 = "Level 3";
            let level2 = "Level 2";
            let level1 = "Level 1";
            if (level3 === this.$store.state.editingBattlecruiserConfiguration.BattlecruiserPointDefenseSystemPowerLevelText) {
                // allow all options
            } else if (level2 === this.$store.state.editingBattlecruiserConfiguration.BattlecruiserPointDefenseSystemPowerLevelText) {
                // disable all Level 3 options
                disabledByPowerLevel = pointDefenseSystem.PowerLevelText === level3;
            } else if (level1 === this.$store.state.editingBattlecruiserConfiguration.BattlecruiserPointDefenseSystemPowerLevelText) { 
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
            if (pointDefenseSystemGuid === this.battlecruiserConfiguration.PointDefenseSystemGuid && pointDefenseSystemGuid === this.$store.state.editingBattlecruiserConfiguration.PointDefenseSystemGuid) {
                if (this.isPointDefenseSystemDisabled(this.pointDefenseSystemOptions.find(option => option.PointDefenseSystemGuid === pointDefenseSystemGuid))) {
                    return `red`;
                }
                return `${'orange'}`;
            } else if (pointDefenseSystemGuid === this.battlecruiserConfiguration.PointDefenseSystemGuid) {
                if (this.isPointDefenseSystemDisabled(this.pointDefenseSystemOptions.find(option => option.PointDefenseSystemGuid === pointDefenseSystemGuid))) {
                    return `red`;
                }
                return `${'orange'}`;
            } else if (pointDefenseSystemGuid === this.$store.state.editingBattlecruiserConfiguration.PointDefenseSystemGuid) {
                return `${this.$vuetify.theme.themes.dark['cfPrimary']}`;
            } else {
                return 'transparent';
            }
        },
        setEditingPointDefenseSystemComponent(pointDefenseSystem) {
            this.$store.state.editingBattlecruiserConfiguration.setPointDefenseSystem(pointDefenseSystem);
            this.validateCurrentSelectionFeasibility()
        },
        getFuelSystemComponents() {
            this.fuelSystemsLoading = true;
            this.fuelSystemRepository.getFuelSystemsBySpaceshipType(this.$store.state.editingBattlecruiserConfiguration.BattlecruiserSpaceshipTypeGuid)
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
            return (this.$store.state.editingBattlecruiserConfiguration.TotalModulePointsUsage - 
                this.$store.state.editingBattlecruiserConfiguration.FuelSystemModulePointsCost) + 
                fuelSystem.ModulePointsCost > 
                this.$store.state.editingBattlecruiserConfiguration.BattlecruiserModulePointLimit;
        },
        isFuelSystemDisabled(fuelSystem) {
            return this.isFuelSystemDisabledByModulePoints(fuelSystem);
        },
        getFuelSystemComponentOutlineColor(fuelSystemGuid) {
            if (fuelSystemGuid === this.battlecruiserConfiguration.FuelSystem.FuelSystemGuid && fuelSystemGuid === this.$store.state.editingBattlecruiserConfiguration.FuelSystem.FuelSystemGuid) {
                if (this.isFuelSystemDisabled(this.fuelSystemOptions.find(option => option.FuelSystemGuid === fuelSystemGuid))) {
                    return `red`;
                }
                return `${'orange'}`;
            } else if (fuelSystemGuid === this.battlecruiserConfiguration.FuelSystem.FuelSystemGuid) {
                if (this.isFuelSystemDisabled(this.fuelSystemOptions.find(option => option.FuelSystemGuid === fuelSystemGuid))) {
                    return `red`;
                }
                return `${'orange'}`;
            } else if (fuelSystemGuid === this.$store.state.editingBattlecruiserConfiguration.FuelSystem.FuelSystemGuid) {
                return `${this.$vuetify.theme.themes.dark['cfPrimary']}`;
            } else {
                return 'transparent';
            }
        },
        setEditingFuelSystemComponent(fuelSystem) {
            this.$store.state.editingBattlecruiserConfiguration.setFuelSystem(fuelSystem);
            this.validateCurrentSelectionFeasibility()
        },
        getThrusterComponents() {
            this.thrustersLoading = true;
            this.thrusterRepository.getThrustersBySpaceshipType(this.$store.state.editingBattlecruiserConfiguration.BattlecruiserSpaceshipTypeGuid)
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
            return (this.$store.state.editingBattlecruiserConfiguration.TotalModulePointsUsage - 
                this.$store.state.editingBattlecruiserConfiguration.ThrusterModulePointsCost) + 
                thruster.ModulePointsCost > 
                this.$store.state.editingBattlecruiserConfiguration.BattlecruiserModulePointLimit;
        },
        isThrusterDisabled(thruster) {
            return this.isThrusterDisabledByModulePoints(thruster);
        },
        getThrusterComponentOutlineColor(thrusterGuid) {
            if (thrusterGuid === this.battlecruiserConfiguration.Thruster.ThrusterGuid && thrusterGuid === this.$store.state.editingBattlecruiserConfiguration.Thruster.ThrusterGuid) {
                if (this.isThrusterDisabled(this.thrusterOptions.find(option => option.ThrusterGuid === thrusterGuid))) {
                    return `red`;
                }
                return `${'orange'}`;
            } else if (thrusterGuid === this.battlecruiserConfiguration.Thruster.ThrusterGuid) {
                if (this.isThrusterDisabled(this.thrusterOptions.find(option => option.ThrusterGuid === thrusterGuid))) {
                    return `red`;
                }
                return `${'orange'}`;
            } else if (thrusterGuid === this.$store.state.editingBattlecruiserConfiguration.Thruster.ThrusterGuid) {
                return `${this.$vuetify.theme.themes.dark['cfPrimary']}`;
            } else {
                return 'transparent';
            }
        },
        setEditingThrusterComponent(thruster) {
            this.$store.state.editingBattlecruiserConfiguration.setThruster(thruster);
            this.validateCurrentSelectionFeasibility()
        },
        getWeaponFrameComponents() {
            this.weaponFramesLoading = true;
            this.weaponFrameRepository.getWeaponFrames()
                .then((apiResponse) => {
                    console.log('apiResponse', apiResponse);
                    var responses = apiResponse.data;
                    this.weaponFrame1Options = [];
                    this.weaponFrame2Options = [];
                    for (var i = 0; i < responses.length; i++) {
                        this.weaponFrame1Options.push(new WeaponFrameModel(responses[i]));
                        this.weaponFrame2Options.push(new WeaponFrameModel(responses[i]));
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
        isWeaponFrame1DisabledByModulePoints(weaponFrame) {
            return (this.$store.state.editingBattlecruiserConfiguration.TotalModulePointsUsage - 
                this.$store.state.editingBattlecruiserConfiguration.WeaponFrame1ModulePointsCost) + 
                weaponFrame.ModulePointsCost > 
                this.$store.state.editingBattlecruiserConfiguration.BattlecruiserModulePointLimit;
        },
        isWeaponFrame1DisabledByPowerLevel(weaponFrame) {
            var disabledByPowerLevel = false;
            let level3 = "Level 3";
            let level2 = "Level 2";
            let level1 = "Level 1";
            if (level3 === this.$store.state.editingBattlecruiserConfiguration.BattlecruiserWeaponPowerLevelText) {
                // allow all options
            } else if (level2 === this.$store.state.editingBattlecruiserConfiguration.BattlecruiserWeaponPowerLevelText) {
                // disable all Level 3 options
                disabledByPowerLevel = weaponFrame.PowerLevelText === level3;
            } else if (level1 === this.$store.state.editingBattlecruiserConfiguration.BattlecruiserWeaponPowerLevelText) { 
                // disable all Level 2 and all Level 3 options
                disabledByPowerLevel = weaponFrame.PowerLevelText === level3 || weaponFrame.PowerLevelText === level2;
            }
            return disabledByPowerLevel;
        },
        isWeaponFrame1DisabledByWeaponFrameType(weaponFrame) {
            var disabledByWeaponFrameType = false;
            // disabledByWeaponFrameType = weaponFrame.WeaponFrameTypeText !== this.battlecruiserConfiguration.Payload1WeaponFrameTypeText;
            return disabledByWeaponFrameType;
        },
        isWeaponFrame1Disabled(weaponFrame) {
            return this.isWeaponFrame1DisabledByModulePoints(weaponFrame) || 
                   this.isWeaponFrame1DisabledByPowerLevel(weaponFrame) ||
                   this.isWeaponFrame1DisabledByWeaponFrameType(weaponFrame);
        },
        getWeaponFrame1ComponentOutlineColor(weaponFrameGuid) {
            if (weaponFrameGuid === this.battlecruiserConfiguration.WeaponFrame1Guid && weaponFrameGuid === this.$store.state.editingBattlecruiserConfiguration.WeaponFrame1Guid) {
                if (this.isWeaponFrame1Disabled(this.weaponFrame1Options.find(option => option.WeaponFrameGuid === weaponFrameGuid))) {
                    return `red`;
                }
                return `${'orange'}`;
            } else if (weaponFrameGuid === this.battlecruiserConfiguration.WeaponFrame1Guid) {
                if (this.isWeaponFrame1Disabled(this.weaponFrame1Options.find(option => option.WeaponFrameGuid === weaponFrameGuid))) {
                    return `red`;
                }
                return `${'orange'}`;
            } else if (weaponFrameGuid === this.$store.state.editingBattlecruiserConfiguration.WeaponFrame1Guid) {
                return `${this.$vuetify.theme.themes.dark['cfPrimary']}`;
            } else {
                return 'transparent';
            }
        },
        setEditingWeaponFrame1Component(weaponFrame) {
            this.$store.state.editingBattlecruiserConfiguration.setWeaponFrame1(weaponFrame);
            if (!this.isBattlecruiserConfigurationValid) {
                this.validateCurrentSelectionFeasibility(null)
            }
        },
        getPayloadComponents() {
            this.payloadsLoading = true;
            this.payloadRepository.getPayloads()
                .then((apiResponse) => {
                    console.log('apiResponse', apiResponse);
                    var responses = apiResponse.data;
                    this.payload1Options = [];
                    this.payload2Options = [];
                    for (var i = 0; i < responses.length; i++) {
                        this.payload1Options.push(new PayloadModel(responses[i]));
                        this.payload2Options.push(new PayloadModel(responses[i]));
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
        isPayload1DisabledByModulePoints(payload) {
            return (this.$store.state.editingBattlecruiserConfiguration.TotalModulePointsUsage - 
                this.$store.state.editingBattlecruiserConfiguration.Payload1ModulePointsCost) + 
                payload.ModulePointsCost > 
                this.$store.state.editingBattlecruiserConfiguration.BattlecruiserModulePointLimit;
        },
        isPayload1DisabledByPowerLevel(payload) {
            var disabledByPowerLevel = false;
            let level3 = "Level 3";
            let level2 = "Level 2";
            let level1 = "Level 1";
            if (level3 === this.$store.state.editingBattlecruiserConfiguration.WeaponFrame1PowerLevelText) {
                // allow all options
            } else if (level2 === this.$store.state.editingBattlecruiserConfiguration.WeaponFrame1PowerLevelText) {
                // disable all Level 3 options
                disabledByPowerLevel = payload.PowerLevelText === level3;
            } else if (level1 === this.$store.state.editingBattlecruiserConfiguration.WeaponFrame1PowerLevelText) { 
                // disable all Level 2 and all Level 3 options
                disabledByPowerLevel = payload.PowerLevelText === level3 || payload.PowerLevelText === level2;
            }
            return disabledByPowerLevel;
        },
        isPayload1DisabledByWeaponFrameType(payload) {
            return payload.WeaponFrameTypeText !== this.$store.state.editingBattlecruiserConfiguration.WeaponFrame1WeaponFrameTypeText;
        },
        isPayload1Disabled(payload) {
            return this.isPayload1DisabledByModulePoints(payload) || 
                   this.isPayload1DisabledByPowerLevel(payload) || 
                   this.isPayload1DisabledByWeaponFrameType(payload);
        },
        getPayload1ComponentOutlineColor(payloadGuid) {
            if (payloadGuid === this.battlecruiserConfiguration.Payload1Guid && payloadGuid === this.$store.state.editingBattlecruiserConfiguration.Payload1Guid) {
                if (this.isPayload1Disabled(this.payload1Options.find(option => option.PayloadGuid === payloadGuid))) {
                    return `red`;
                }
                return `${'orange'}`;
            } else if (payloadGuid === this.battlecruiserConfiguration.Payload1Guid) {
                if (this.isPayload1Disabled(this.payload1Options.find(option => option.PayloadGuid === payloadGuid))) {
                    return `red`;
                }
                return `${'orange'}`;
            } else if (payloadGuid === this.$store.state.editingBattlecruiserConfiguration.Payload1Guid) {
                return `${this.$vuetify.theme.themes.dark['cfPrimary']}`;
            } else {
                return 'transparent';
            }
        },
        setEditingPayload1Component(payload) {
            this.$store.state.editingBattlecruiserConfiguration.setPayload1(payload);
            if (!this.isBattlecruiserConfigurationValid) {
                this.validateCurrentSelectionFeasibility(null)
            }
        },


        
        isWeaponFrame2DisabledByModulePoints(weaponFrame) {
            return (this.$store.state.editingBattlecruiserConfiguration.TotalModulePointsUsage - 
                this.$store.state.editingBattlecruiserConfiguration.WeaponFrame2ModulePointsCost) + 
                weaponFrame.ModulePointsCost > 
                this.$store.state.editingBattlecruiserConfiguration.BattlecruiserModulePointLimit;
        },
        isWeaponFrame2DisabledByPowerLevel(weaponFrame) {
            var disabledByPowerLevel = false;
            let level3 = "Level 3";
            let level2 = "Level 2";
            let level1 = "Level 1";
            if (level3 === this.$store.state.editingBattlecruiserConfiguration.BattlecruiserWeaponPowerLevelText) {
                // allow all options
            } else if (level2 === this.$store.state.editingBattlecruiserConfiguration.BattlecruiserWeaponPowerLevelText) {
                // disable all Level 3 options
                disabledByPowerLevel = weaponFrame.PowerLevelText === level3;
            } else if (level1 === this.$store.state.editingBattlecruiserConfiguration.BattlecruiserWeaponPowerLevelText) { 
                // disable all Level 2 and all Level 3 options
                disabledByPowerLevel = weaponFrame.PowerLevelText === level3 || weaponFrame.PowerLevelText === level2;
            }
            return disabledByPowerLevel;
        },
        isWeaponFrame2DisabledByWeaponFrameType(weaponFrame) {
            var disabledByWeaponFrameType = false;
            // disabledByWeaponFrameType = weaponFrame.WeaponFrameTypeText !== this.battlecruiserConfiguration.Payload2WeaponFrameTypeText;
            return disabledByWeaponFrameType;
        },
        isWeaponFrame2Disabled(weaponFrame) {
            return this.isWeaponFrame2DisabledByModulePoints(weaponFrame) || 
                   this.isWeaponFrame2DisabledByPowerLevel(weaponFrame) ||
                   this.isWeaponFrame2DisabledByWeaponFrameType(weaponFrame);
        },
        getWeaponFrame2ComponentOutlineColor(weaponFrameGuid) {
            if (weaponFrameGuid === this.battlecruiserConfiguration.WeaponFrame2Guid && weaponFrameGuid === this.$store.state.editingBattlecruiserConfiguration.WeaponFrame2Guid) {
                if (this.isWeaponFrame2Disabled(this.weaponFrame2Options.find(option => option.WeaponFrameGuid === weaponFrameGuid))) {
                    return `red`;
                }
                return `${'orange'}`;
            } else if (weaponFrameGuid === this.battlecruiserConfiguration.WeaponFrame2Guid) {
                if (this.isWeaponFrame2Disabled(this.weaponFrame2Options.find(option => option.WeaponFrameGuid === weaponFrameGuid))) {
                    return `red`;
                }
                return `${'orange'}`;
            } else if (weaponFrameGuid === this.$store.state.editingBattlecruiserConfiguration.WeaponFrame2Guid) {
                return `${this.$vuetify.theme.themes.dark['cfPrimary']}`;
            } else {
                return 'transparent';
            }
        },
        setEditingWeaponFrame2Component(weaponFrame) {
            this.$store.state.editingBattlecruiserConfiguration.setWeaponFrame2(weaponFrame);
            this.validateCurrentSelectionFeasibility()
        },
        isPayload2DisabledByModulePoints(payload) {
            return (this.$store.state.editingBattlecruiserConfiguration.TotalModulePointsUsage - 
                this.$store.state.editingBattlecruiserConfiguration.Payload2ModulePointsCost) + 
                payload.ModulePointsCost > 
                this.$store.state.editingBattlecruiserConfiguration.BattlecruiserModulePointLimit;
        },
        isPayload2DisabledByPowerLevel(payload) {
            var disabledByPowerLevel = false;
            let level3 = "Level 3";
            let level2 = "Level 2";
            let level1 = "Level 1";
            if (level3 === this.$store.state.editingBattlecruiserConfiguration.WeaponFrame2PowerLevelText) {
                // allow all options
            } else if (level2 === this.$store.state.editingBattlecruiserConfiguration.WeaponFrame2PowerLevelText) {
                // disable all Level 3 options
                disabledByPowerLevel = payload.PowerLevelText === level3;
            } else if (level1 === this.$store.state.editingBattlecruiserConfiguration.WeaponFrame2PowerLevelText) { 
                // disable all Level 2 and all Level 3 options
                disabledByPowerLevel = payload.PowerLevelText === level3 || payload.PowerLevelText === level2;
            }
            return disabledByPowerLevel;
        },
        isPayload2DisabledByWeaponFrameType(payload) {
            return payload.WeaponFrameTypeText !== this.$store.state.editingBattlecruiserConfiguration.WeaponFrame2WeaponFrameTypeText;
        },
        isPayload2Disabled(payload) {
            return this.isPayload2DisabledByModulePoints(payload) || 
                   this.isPayload2DisabledByPowerLevel(payload) || 
                   this.isPayload2DisabledByWeaponFrameType(payload);
        },
        getPayload2ComponentOutlineColor(payloadGuid) {
            if (payloadGuid === this.battlecruiserConfiguration.Payload2Guid && payloadGuid === this.$store.state.editingBattlecruiserConfiguration.Payload2Guid) {
                if (this.isPayload2Disabled(this.payload2Options.find(option => option.PayloadGuid === payloadGuid))) {
                    return `red`;
                }
                return `${'orange'}`;
            } else if (payloadGuid === this.battlecruiserConfiguration.Payload2Guid) {
                if (this.isPayload2Disabled(this.payload2Options.find(option => option.PayloadGuid === payloadGuid))) {
                    return `red`;
                }
                return `${'orange'}`;
            } else if (payloadGuid === this.$store.state.editingBattlecruiserConfiguration.Payload2Guid) {
                return `${this.$vuetify.theme.themes.dark['cfPrimary']}`;
            } else {
                return 'transparent';
            }
        },
        setEditingPayload2Component(payload) {
            this.$store.state.editingBattlecruiserConfiguration.setPayload2(payload);
            this.validateCurrentSelectionFeasibility()
        },





        updateBattlecruiserConfiguration(key = null) {
            if (key == null) {
                this.battlecruiserConfigurationRepository.updateUserBattlecruiserConfiguration(
                    this.$store.state.editingBattlecruiserConfiguration.BattlecruiserConfigurationGuid,
                    new BattlecruiserConfigurationDto(this.$store.state.editingBattlecruiserConfiguration)
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
                let updatedBattlecruiserConfig = { ...this.battlecruiserConfiguration, [key]: this.$store.state.editingBattlecruiserConfiguration[key]};

                this.battlecruiserConfigurationRepository.updateUserBattlecruiserConfiguration(
                    updatedBattlecruiserConfig.BattlecruiserConfigurationGuid,
                    new BattlecruiserConfigurationDto(updatedBattlecruiserConfig)
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
        revertBattlecruiserConfiguration(key = null) {
            if (key == null) {
                this.$store.state.editingBattlecruiserConfiguration = Object.assign({}, this.battlecruiserConfiguration);
            } else {
                this.$store.state.editingBattlecruiserConfiguration[`set${key}`](this.battlecruiserConfiguration[key]);
            }
            this.validateCurrentSelectionFeasibility(key);
        },
        validateCurrentSelectionFeasibility(key = null) {
            if (key == null) {
                if(this.isBattlecruiserDisabled(this.$store.state.editingBattlecruiserConfiguration.Battlecruiser)) {
                    this.$store.state.editingBattlecruiserConfiguration.setBattlecruiser(this.battlecruiserOptions.find(option => option.disabled === false));
                }
                if(this.isArmorDisabled(this.$store.state.editingBattlecruiserConfiguration.Armor)) {
                    this.$store.state.editingBattlecruiserConfiguration.setArmor(this.armorOptions.find(option => option.disabled === false));
                }
                if(this.isPointDefenseSystemDisabled(this.$store.state.editingBattlecruiserConfiguration.PointDefenseSystem)) {
                    this.$store.state.editingBattlecruiserConfiguration.setPointDefenseSystem(this.pointDefenseSystemOptions.find(option => option.disabled === false));
                }
                if(this.isFuelSystemDisabled(this.$store.state.editingBattlecruiserConfiguration.FuelSystem)) {
                    this.$store.state.editingBattlecruiserConfiguration.setFuelSystem(this.fuelSystemOptions.find(option => option.disabled === false));
                }
                if(this.isThrusterDisabled(this.$store.state.editingBattlecruiserConfiguration.Thruster)) {
                    this.$store.state.editingBattlecruiserConfiguration.setThruster(this.thrusterOptions.find(option => option.disabled === false));
                }
                if(this.isWeaponFrame1Disabled(this.$store.state.editingBattlecruiserConfiguration.WeaponFrame1)) {
                    this.$store.state.editingBattlecruiserConfiguration.setWeaponFrame1(this.weaponFrame1Options.find(option => option.disabled === false));
                }
                if(this.isPayload1Disabled(this.$store.state.editingBattlecruiserConfiguration.Payload1)) {
                    this.$store.state.editingBattlecruiserConfiguration.setPayload1(this.payload1Options.find(option => option.disabled === false));
                }
                if(this.isWeaponFrame2Disabled(this.$store.state.editingBattlecruiserConfiguration.WeaponFrame2)) {
                    this.$store.state.editingBattlecruiserConfiguration.setWeaponFrame2(this.weaponFrame2Options.find(option => option.disabled === false));
                }
                if(this.isPayload2Disabled(this.$store.state.editingBattlecruiserConfiguration.Payload2)) {
                    this.$store.state.editingBattlecruiserConfiguration.setPayload2(this.payload2Options.find(option => option.disabled === false));
                }
                return;
            }
            if(this.$store.state.editingBattlecruiserConfiguration[key].disabled) {
                this.$store.state.editingBattlecruiserConfiguration[`set${key}`](this[`${key.charAt(0).toLowerCase() + key.slice(1)}Options`].find(option => option.disabled === false));
            }
        }
    },

    created() {

    },

    mounted() {
        this.$store.state.editingBattlecruiserConfiguration = Object.assign({}, this.battlecruiserConfiguration);
        this.getBattlecruisers();
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
