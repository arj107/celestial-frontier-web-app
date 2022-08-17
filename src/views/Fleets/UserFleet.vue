<template>
    <v-container fluid v-if="!$store.state.isLoading">
        <v-layout wrap>
            <v-flex xs12 v-if="fleet ? fleet.FleetCarriers.length >= 0 : false">
                <v-alert type="warning" dense text class="rounded-xl">There are not enough Carriers in this fleet!</v-alert>
            </v-flex>
            <!-- <v-flex xs12>
                {{fleet}}
            </v-flex> -->
            <v-flex xs12>
                <v-expansion-panels accordian multiple flat class="rounded-xl" v-model="$store.state.selectedFleetBuilderPanel">
                    <v-expansion-panel class="rounded-xl mt-0 mb-2 expansionPanelBackground" :style="`outline: thin solid ${$vuetify.theme.dark ? $vuetify.theme.themes.dark['outline'] : $vuetify.theme.themes.light['outline']}`">
                        <v-expansion-panel-header class="pt-0 pb-0">
                            <span class="title">Fleet Battlecruiser</span>
                        </v-expansion-panel-header>
                        <v-expansion-panel-content>
                            <v-layout wrap align-center>
                                <v-flex xs12 sm12 md5 lg5 xl4>
                                    <v-text-field v-model="$store.state.fleetBattlecruiserConfigurationsSearch"
                                        clearable outlined hide-details rounded dense
                                        prepend-icon="mdi-magnify" label="Search" color="cfPrimary"
                                    ></v-text-field>
                                </v-flex> 
                                <v-flex grow>
                                    <v-combobox v-model="$store.state.fleetBattlecruiserConfigurationsSortBy"
                                        flat outlined hide-details rounded dense clearable
                                        label="Sort by" color="cfPrimary" item-color="cfPrimary" item-text="text" item-value="value"
                                        :items="$store.state.fleetBattlecruiserConfigurationsSortOptions" :menu-props="{maxHeight: 600}"
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
                                    <v-btn-toggle rounded dense v-model="$store.state.fleetBattlecruiserConfigurationsSortDesc" mandatory>
                                        <v-btn depressed :value="false">
                                            <v-icon>mdi-arrow-up</v-icon>
                                        </v-btn>
                                        <v-btn depressed :value="true">
                                            <v-icon>mdi-arrow-down</v-icon>
                                        </v-btn>
                                    </v-btn-toggle>
                                </v-flex>
                            </v-layout>
                            <v-card class="rounded-xl mb-2 mt-2" outlined v-if="$store.state.configurationsCondensedView">
                                <v-data-table
                                    :items="filteredBattlecruiserConfigurations"
                                    :items-per-page.sync="$store.state.fleetBattlecruiserConfigurationsItemsPerPage"
                                    :page.sync="$store.state.fleetBattlecruiserConfigurationsPageSync"
                                    @page-count="$store.state.fleetBattlecruiserConfigurationsPageCount = $event"
                                    :search.sync="$store.state.fleetBattlecruiserConfigurationsSearch" class="rounded-table clickable-rows"
                                    :sort-by="$store.state.fleetBattlecruiserConfigurationsSortBy ? $store.state.fleetBattlecruiserConfigurationsSortBy.value : null"
                                    :sort-desc.sync="$store.state.fleetBattlecruiserConfigurationsSortDesc" dense loader-height="0"
                                    hide-default-footer :loading="fleetBattlecruiserConfigurationsLoading" :headers="$store.state.fleetBattlecruiserConfigurationsHeaders"
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
                                        <tr @click="$router.push({path: `${$router.history.current.path}/battlecruisers/${item.BattlecruiserConfigurationGuid}`});">
                                            <td 
                                                :align="`${headers.find(h => h.value === 'Name').align}`" 
                                                :style="headers.find(h => h.value === 'Name').divider ? `${$vuetify.theme.dark ? 'border-right: 1px solid rgba(255,255,255,0.12)' : 'border-right: 1px solid rgba(0,0,0,0.12)'}` : ''"
                                            >
                                                <span class="subtitle-1" :style="`${item.disabled ? 'opacity: 0.5;' : ''}`">{{ item.Name }}</span>
                                            </td>
                                            <td 
                                                :align="`${headers.find(h => h.value === 'Class').align}`" 
                                                :style="headers.find(h => h.value === 'Class').divider ? `${$vuetify.theme.dark ? 'border-right: 1px solid rgba(255,255,255,0.12)' : 'border-right: 1px solid rgba(0,0,0,0.12)'}` : ''"
                                            >
                                                <span class="subtitle-1" :style="`${item.disabled ? 'opacity: 0.5;' : ''}`">{{ item.BattlecruiserClass }}</span>
                                            </td>
                                            <td :align="`${headers.find(h => h.value === 'TotalModulePointsUsage').align}`"
                                                :style="headers.find(h => h.value === 'TotalModulePointsUsage').divider ? `${$vuetify.theme.dark ? 'border-right: 1px solid rgba(255,255,255,0.12)' : 'border-right: 1px solid rgba(0,0,0,0.12)'}` : ''"
                                            >
                                                <!-- <span class="subtitle-1" :style="`${item.disabled ? 'opacity: 0.5;' : ''}`">{{`${item.TotalModulePointsUsage}/${item.BattlecruiserModulePointLimit}`}}</span> -->
                                                <v-chip :style="`${item.disabled ? 'opacity: 0.5;' : ''}`"
                                                    class="font-weight-bold" small
                                                >
                                                    {{`${item.TotalModulePointsUsage}/${item.BattlecruiserModulePointLimit}`}}
                                                </v-chip>
                                            </td>
                                            <td :align="`${headers.find(h => h.value === 'BattlecruiserHullMass').align}`"
                                                :style="headers.find(h => h.value === 'BattlecruiserHullMass').divider ? `${$vuetify.theme.dark ? 'border-right: 1px solid rgba(255,255,255,0.12)' : 'border-right: 1px solid rgba(0,0,0,0.12)'}` : ''"
                                            >
                                                <span class="subtitle-1" :style="`${item.disabled ? 'opacity: 0.5;' : ''}`">{{ item.BattlecruiserHullMass | decimal }}</span>
                                            </td>
                                            <td :align="`${headers.find(h => h.value === 'TotalMass').align}`"
                                                :style="headers.find(h => h.value === 'TotalMass').divider ? `${$vuetify.theme.dark ? 'border-right: 1px solid rgba(255,255,255,0.12)' : 'border-right: 1px solid rgba(0,0,0,0.12)'}` : ''"
                                            >
                                                <span class="subtitle-1" :style="`${item.disabled ? 'opacity: 0.5;' : ''}`">{{ item.TotalMass | decimal }}</span>
                                            </td>
                                            <td :align="`${headers.find(h => h.value === 'TotalCrewCost').align}`"
                                                :style="headers.find(h => h.value === 'TotalCrewCost').divider ? `${$vuetify.theme.dark ? 'border-right: 1px solid rgba(255,255,255,0.12)' : 'border-right: 1px solid rgba(0,0,0,0.12)'}` : ''"
                                            >
                                                <span class="subtitle-1" :style="`${item.disabled ? 'opacity: 0.5;' : ''}`">{{ item.TotalCrewCost | decimal }}</span>
                                            </td>
                                            <td :align="`${headers.find(h => h.value === 'TotalHeatCapacity').align}`"
                                                :style="headers.find(h => h.value === 'TotalHeatCapacity').divider ? `${$vuetify.theme.dark ? 'border-right: 1px solid rgba(255,255,255,0.12)' : 'border-right: 1px solid rgba(0,0,0,0.12)'}` : ''"
                                            >
                                                <span class="subtitle-1" :style="`${item.disabled ? 'opacity: 0.5;' : ''}`">{{ item.TotalHeatCapacity | decimal }}</span>
                                            </td>
                                            <td :align="`${headers.find(h => h.value === 'Maneuverability').align}`"
                                                :style="headers.find(h => h.value === 'Maneuverability').divider ? `${$vuetify.theme.dark ? 'border-right: 1px solid rgba(255,255,255,0.12)' : 'border-right: 1px solid rgba(0,0,0,0.12)'}` : ''"
                                            >
                                                <span class="subtitle-1" :style="`${item.disabled ? 'opacity: 0.5;' : ''}`">{{ item.Maneuverability | decimal5 }}</span>
                                            </td>
                                            <td :align="`${headers.find(h => h.value === 'FuelSystemFuelConsumptionRate').align}`"
                                                :style="headers.find(h => h.value === 'FuelSystemFuelConsumptionRate').divider ? `${$vuetify.theme.dark ? 'border-right: 1px solid rgba(255,255,255,0.12)' : 'border-right: 1px solid rgba(0,0,0,0.12)'}` : ''"
                                            >
                                                <span class="subtitle-1" :style="`${item.disabled ? 'opacity: 0.5;' : ''}`">{{ item.FuelSystemFuelConsumptionRate | decimal }}</span>
                                            </td>
                                            <td :align="`${headers.find(h => h.value === 'FuelSystemFuelCapacity').align}`"
                                                :style="headers.find(h => h.value === 'FuelSystemFuelCapacity').divider ? `${$vuetify.theme.dark ? 'border-right: 1px solid rgba(255,255,255,0.12)' : 'border-right: 1px solid rgba(0,0,0,0.12)'}` : ''"
                                            >
                                                <span class="subtitle-1" :style="`${item.disabled ? 'opacity: 0.5;' : ''}`">{{ item.FuelSystemFuelCapacity | decimal }}</span>
                                            </td>
                                            <td :align="`${headers.find(h => h.value === 'FuelSystemFuelRegenerationRate').align}`"
                                                :style="headers.find(h => h.value === 'FuelSystemFuelRegenerationRate').divider ? `${$vuetify.theme.dark ? 'border-right: 1px solid rgba(255,255,255,0.12)' : 'border-right: 1px solid rgba(0,0,0,0.12)'}` : ''"
                                            >
                                                <span class="subtitle-1" :style="`${item.disabled ? 'opacity: 0.5;' : ''}`">{{ item.FuelSystemFuelRegenerationRate | decimal }}</span>
                                            </td>
                                            <td :align="`${headers.find(h => h.value === 'BattlecruiserDescription').align}`"
                                                :style="headers.find(h => h.value === 'BattlecruiserDescription').divider ? `${$vuetify.theme.dark ? 'border-right: 1px solid rgba(255,255,255,0.12)' : 'border-right: 1px solid rgba(0,0,0,0.12)'}` : ''"
                                            >
                                                <v-menu
                                                    open-on-click allow-overflow
                                                    :close-on-content-click="false" nudge-bottom="3"
                                                    offset-y content-class="rounded-xl elevation-20"
                                                    :z-index="10000" left nudge-left="40"
                                                >
                                                    <template v-slot:activator="{ on, attrs, value }">
                                                        <v-chip 
                                                            :color="value ? 'cfPrimary' : 'grey'" small v-on="on" v-bind="attrs" 
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
                                                                                {{ item.BattlecruiserClass }} Class
                                                                            </v-chip>
                                                                        </template>
                                                                        <battlecruiser-overview
                                                                            :battlecruiser="item.Battlecruiser"
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
                                                                        <template v-slot:activator="{ on, attrs, value }">
                                                                            <div class="caption font-weight-bold">Armor</div>
                                                                            <v-chip class="subtitle-1 font-weight-bold" v-on="on" v-bind="attrs"
                                                                                :color="value  ? 'cfPrimary' : ''"
                                                                            >
                                                                                {{ item.ArmorTitle }}
                                                                            </v-chip>
                                                                        </template>
                                                                        <armor-overview
                                                                            :armor="item.Armor"
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
                                                                                {{ item.PointDefenseSystemTitle }}
                                                                            </v-chip>
                                                                        </template>
                                                                        <point-defense-system-overview
                                                                            :pointDefenseSystem="item.PointDefenseSystem"
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
                                                                                {{ item.FuelSystemTitle }}
                                                                            </v-chip>
                                                                        </template>
                                                                        <fuel-system-overview
                                                                            :fuelSystem="item.FuelSystem"
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
                                                                                {{ item.ThrusterTitle }}
                                                                            </v-chip>
                                                                        </template>
                                                                        <thruster-overview
                                                                            :thruster="item.Thruster"
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
                                                                                {{ item.WeaponFrame1Title }}
                                                                            </v-chip>
                                                                        </template>
                                                                        <weapon-frame-overview
                                                                            :weaponFrame="item.WeaponFrame1"
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
                                                                                {{ item.Payload1Title }}
                                                                            </v-chip>
                                                                        </template>
                                                                        <payload-overview
                                                                            :payload="item.Payload1"
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
                                                                                {{ item.WeaponFrame2Title }}
                                                                            </v-chip>
                                                                        </template>
                                                                        <weapon-frame-overview
                                                                            :weaponFrame="item.WeaponFrame2"
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
                                                                                {{ item.Payload2Title }}
                                                                            </v-chip>
                                                                        </template>
                                                                        <payload-overview
                                                                            :payload="item.Payload2"
                                                                            :allowClick="false"
                                                                        ></payload-overview>
                                                                    </v-menu>  
                                                                </v-flex>
                                                            </v-layout>
                                                        </v-container>
                                                    </v-card>
                                                </v-menu>
                                            </td>
                                        </tr>
                                    </template>
                                    <template v-slot:[`header.BattlecruiserHullMass`]="{ header }">
                                        <v-tooltip top max-width="300" color="black" open-delay="700" content-class="rounded-xl">
                                            <template v-slot:activator="{ on, attrs }">
                                                Hull <v-icon v-for="(icon, index) in header.icons" :key="index" :color="icon.iconColor" :size="icon.size" :class="icon.cssClass" v-on="on" v-bind="attrs">{{icon.icon}}</v-icon>
                                            </template>
                                            <span class="subtitle-1">{{header.description}}</span>
                                        </v-tooltip>
                                    </template>
                                    <template v-slot:[`header.TotalMass`]="{ header }">
                                        <v-tooltip top max-width="300" color="black" open-delay="700" content-class="rounded-xl">
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-icon small>mdi-sigma</v-icon>
                                                <v-icon v-for="(icon, index) in header.icons" :key="index" :color="icon.iconColor" :size="icon.size" :class="icon.cssClass" v-on="on" v-bind="attrs">{{icon.icon}}</v-icon>
                                            </template>
                                            <span class="subtitle-1">{{header.description}}</span>
                                        </v-tooltip>
                                    </template>
                                    <template v-slot:[`header.TotalCrewCost`]="{ header }">
                                        <v-tooltip top max-width="300" color="black" open-delay="700" content-class="rounded-xl">
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-icon small>mdi-sigma</v-icon>
                                                <v-icon v-for="(icon, index) in header.icons" :key="index" :color="icon.iconColor" :size="icon.size" :class="icon.cssClass" v-on="on" v-bind="attrs">{{icon.icon}}</v-icon>
                                            </template>
                                            <span class="subtitle-1">{{header.description}}</span>
                                        </v-tooltip>
                                    </template>
                                    <template v-slot:[`header.TotalHeatCapacity`]="{ header }">
                                        <v-tooltip top max-width="300" color="black" open-delay="700" content-class="rounded-xl">
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-icon small>mdi-sigma</v-icon>
                                                <v-icon v-for="(icon, index) in header.icons" :key="index" :color="icon.iconColor" :size="icon.size" :class="icon.cssClass" v-on="on" v-bind="attrs">{{icon.icon}}</v-icon>
                                            </template>
                                            <span class="subtitle-1">{{header.description}}</span>
                                        </v-tooltip>
                                    </template>
                                    <template v-slot:[`header.Maneuverability`]="{ header }">
                                        <v-tooltip top max-width="300" color="black" open-delay="700" content-class="rounded-xl">
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-icon v-for="(icon, index) in header.icons" :key="index" :color="icon.iconColor" :size="icon.size" :class="icon.cssClass" v-on="on" v-bind="attrs">{{icon.icon}}</v-icon>
                                            </template>
                                            <span class="subtitle-1">{{header.description}}</span>
                                        </v-tooltip>
                                    </template>
                                    <template v-slot:[`header.FuelSystemFuelConsumptionRate`]="{ header }">
                                        <v-tooltip top max-width="300" color="black" open-delay="700" content-class="rounded-xl">
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-icon v-for="(icon, index) in header.icons" :key="index" :color="icon.iconColor" :size="icon.size" :class="icon.cssClass" v-on="on" v-bind="attrs">{{icon.icon}}</v-icon>
                                            </template>
                                            <span class="subtitle-1">{{header.description}}</span>
                                        </v-tooltip>
                                    </template>
                                    <template v-slot:[`header.FuelSystemFuelCapacity`]="{ header }">
                                        <v-tooltip top max-width="300" color="black" open-delay="700" content-class="rounded-xl">
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-icon v-for="(icon, index) in header.icons" :key="index" :color="icon.iconColor" :size="icon.size" :class="icon.cssClass" v-on="on" v-bind="attrs">{{icon.icon}}</v-icon>
                                            </template>
                                            <span class="subtitle-1">{{header.description}}</span>
                                        </v-tooltip>
                                    </template>
                                    <template v-slot:[`header.FuelSystemFuelRegenerationRate`]="{ header }">
                                        <v-tooltip top max-width="300" color="black" open-delay="700" content-class="rounded-xl">
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-icon v-for="(icon, index) in header.icons" :key="index" :color="icon.iconColor" :size="icon.size" :class="icon.cssClass" v-on="on" v-bind="attrs">{{icon.icon}}</v-icon>
                                            </template>
                                            <span class="subtitle-1">{{header.description}}</span>
                                        </v-tooltip>
                                    </template>
                                    <template v-slot:[`header.BattlecruiserDescription`]="{  }">
                                    </template>
                                </v-data-table>
                            </v-card>
                            <v-data-iterator v-else
                                :items="filteredBattlecruiserConfigurations"
                                :items-per-page.sync="$store.state.fleetBattlecruiserConfigurationsItemsPerPage"
                                :page.sync="$store.state.fleetBattlecruiserConfigurationsPageSync"
                                @page-count="$store.state.fleetBattlecruiserConfigurationsPageCount = $event"
                                :search="$store.state.fleetBattlecruiserConfigurationsSearch" class="mt-2 mb-2"
                                :sort-by="$store.state.fleetBattlecruiserConfigurationsSortBy ? $store.state.fleetBattlecruiserConfigurationsSortBy.value : null"
                                :sort-desc="$store.state.fleetBattlecruiserConfigurationsSortDesc"
                                hide-default-footer
                            >
                                <template v-slot:default="props">
                                    <v-layout wrap>
                                        <v-flex xs12 sm12 md6 lg6 xl4 v-for="(battlecruiserConfiguration, i) in props.items" :key="i">
                                            <battlecruiser-configuration-overview class="fill-height"
                                                :battlecruiserConfiguration="battlecruiserConfiguration"
                                            ></battlecruiser-configuration-overview>
                                        </v-flex>
                                    </v-layout>
                                </template>
                            </v-data-iterator>
                            <v-layout wrap align-center>
                                <v-flex grow>
                                    <v-pagination :length="$store.state.fleetBattlecruiserConfigurationsPageCount" :total-visible="7"
                                        v-model="$store.state.fleetBattlecruiserConfigurationsPageSync" color="cfPrimary" circle
                                    ></v-pagination>
                                </v-flex>
                                <v-flex xs12 sm12 md4 lg3 xl3>
                                    <v-select v-model="$store.state.fleetBattlecruiserConfigurationsItemsPerPage"
                                        :items="$store.state.itemsPerPageOptions"
                                        outlined hide-details rounded dense item-value="value" item-text="text"
                                        label="Items Per Page" color="cfPrimary" item-color="cfPrimary"
                                    ></v-select>
                                </v-flex>
                            </v-layout>
                        </v-expansion-panel-content>
                    </v-expansion-panel>












                    <v-expansion-panel class="rounded-xl mt-0 mb-2 expansionPanelBackground" :style="`outline: thin solid ${$vuetify.theme.dark ? $vuetify.theme.themes.dark['outline'] : $vuetify.theme.themes.light['outline']}`">
                        <v-expansion-panel-header class="pt-0 pb-0">
                            <span class="title">Fleet Carrier 1</span>
                        </v-expansion-panel-header>
                        <v-expansion-panel-content>
                            <v-layout wrap align-center>
                                <v-flex xs12 sm12 md5 lg5 xl4>
                                    <v-text-field v-model="$store.state.fleetCarrier1ConfigurationsSearch"
                                        clearable outlined hide-details rounded dense
                                        prepend-icon="mdi-magnify" label="Search" color="cfPrimary"
                                    ></v-text-field>
                                </v-flex> 
                                <v-flex grow>
                                    <v-combobox v-model="$store.state.fleetCarrier1ConfigurationsSortBy"
                                        flat outlined hide-details rounded dense clearable
                                        label="Sort by" color="cfPrimary" item-color="cfPrimary" item-text="text" item-value="value"
                                        :items="$store.state.fleetCarrier1ConfigurationsSortOptions" :menu-props="{maxHeight: 600}"
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
                                    <v-btn-toggle rounded dense v-model="$store.state.fleetCarrier1ConfigurationsSortDesc" mandatory>
                                        <v-btn depressed :value="false">
                                            <v-icon>mdi-arrow-up</v-icon>
                                        </v-btn>
                                        <v-btn depressed :value="true">
                                            <v-icon>mdi-arrow-down</v-icon>
                                        </v-btn>
                                    </v-btn-toggle>
                                </v-flex>
                            </v-layout>
                            <v-card class="rounded-xl mb-2 mt-2" outlined v-if="$store.state.configurationsCondensedView">
                                <v-data-table
                                    :items="filteredCarrierConfigurations"
                                    :items-per-page.sync="$store.state.fleetCarrier1ConfigurationsItemsPerPage"
                                    :page.sync="$store.state.fleetCarrier1ConfigurationsPageSync"
                                    @page-count="$store.state.fleetCarrier1ConfigurationsPageCount = $event"
                                    :search.sync="$store.state.fleetCarrier1ConfigurationsSearch" class="rounded-table clickable-rows"
                                    :sort-by="$store.state.fleetCarrier1ConfigurationsSortBy ? $store.state.fleetCarrier1ConfigurationsSortBy.value : null"
                                    :sort-desc.sync="$store.state.fleetCarrier1ConfigurationsSortDesc" dense loader-height="0"
                                    hide-default-footer :loading="fleetCarrierConfigurationsLoading" :headers="$store.state.fleetCarrier1ConfigurationsHeaders"
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
                                        <tr @click="$router.push({path: `${$router.history.current.path}/carriers/${item.CarrierConfigurationGuid}`});">
                                            <td 
                                                :align="`${headers.find(h => h.value === 'Name').align}`" 
                                                :style="headers.find(h => h.value === 'Name').divider ? `${$vuetify.theme.dark ? 'border-right: 1px solid rgba(255,255,255,0.12)' : 'border-right: 1px solid rgba(0,0,0,0.12)'}` : ''"
                                            >
                                                <span class="subtitle-1" :style="`${item.disabled ? 'opacity: 0.5;' : ''}`">{{ item.Name }}</span>
                                            </td>
                                            <td 
                                                :align="`${headers.find(h => h.value === 'Class').align}`" 
                                                :style="headers.find(h => h.value === 'Class').divider ? `${$vuetify.theme.dark ? 'border-right: 1px solid rgba(255,255,255,0.12)' : 'border-right: 1px solid rgba(0,0,0,0.12)'}` : ''"
                                            >
                                                <span class="subtitle-1" :style="`${item.disabled ? 'opacity: 0.5;' : ''}`">{{ item.CarrierClass }}</span>
                                            </td>
                                            <td :align="`${headers.find(h => h.value === 'CarrierBays').align}`"
                                                :style="headers.find(h => h.value === 'CarrierBays').divider ? `${$vuetify.theme.dark ? 'border-right: 1px solid rgba(255,255,255,0.12)' : 'border-right: 1px solid rgba(0,0,0,0.12)'}` : ''"
                                            >
                                                <v-tooltip top max-width="300" color="black" open-delay="0" content-class="rounded-xl">
                                                    <template v-slot:activator="{ on, attrs }">
                                                        <v-chip :style="`${item.disabled ? 'opacity: 0.5;' : ''}`"
                                                            class="subtitle-2 pl-2 pr-2 mr-1" small v-on="on" v-bind="attrs"
                                                        >
                                                            {{`${item.CarrierFighterBays}`}}
                                                        </v-chip>
                                                    </template>
                                                    <span class="subtitle-1">Fighter Bays</span>
                                                </v-tooltip>
                                                <v-tooltip top max-width="300" color="black" open-delay="0" content-class="rounded-xl">
                                                    <template v-slot:activator="{ on, attrs }">
                                                        <v-chip :style="`${item.disabled ? 'opacity: 0.5;' : ''}`"
                                                            class="subtitle-2 pl-2 pr-2 mr-1" small v-on="on" v-bind="attrs"
                                                        >
                                                            {{`${item.CarrierCorvetteBays}`}}
                                                        </v-chip>
                                                    </template>
                                                    <span class="subtitle-1">Corvette Bays</span>
                                                </v-tooltip>
                                                <v-tooltip top max-width="300" color="black" open-delay="0" content-class="rounded-xl">
                                                    <template v-slot:activator="{ on, attrs }">
                                                        <v-chip :style="`${item.disabled ? 'opacity: 0.5;' : ''}`"
                                                            class="subtitle-2 pl-2 pr-2 mr-1" small v-on="on" v-bind="attrs"
                                                        >
                                                            {{`${item.CarrierFrigateBays}`}}
                                                        </v-chip>
                                                    </template>
                                                    <span class="subtitle-1">Frigate Bays</span>
                                                </v-tooltip>
                                                <v-tooltip top max-width="300" color="black" open-delay="0" content-class="rounded-xl">
                                                    <template v-slot:activator="{ on, attrs }">
                                                        <v-chip :style="`${item.disabled ? 'opacity: 0.5;' : ''}`"
                                                            class="subtitle-2 pl-2 pr-2 mr-1" small v-on="on" v-bind="attrs"
                                                        >
                                                            {{`${item.CarrierDestroyerBays}`}}
                                                        </v-chip>
                                                    </template>
                                                    <span class="subtitle-1">Destroyer Bays</span>
                                                </v-tooltip>
                                            </td>
                                            <td :align="`${headers.find(h => h.value === 'TotalModulePointsUsage').align}`"
                                                :style="headers.find(h => h.value === 'TotalModulePointsUsage').divider ? `${$vuetify.theme.dark ? 'border-right: 1px solid rgba(255,255,255,0.12)' : 'border-right: 1px solid rgba(0,0,0,0.12)'}` : ''"
                                            >
                                                <!-- <span class="subtitle-1" :style="`${item.disabled ? 'opacity: 0.5;' : ''}`">{{`${item.TotalModulePointsUsage}/${item.CarrierModulePointLimit}`}}</span> -->
                                                <v-chip :style="`${item.disabled ? 'opacity: 0.5;' : ''}`"
                                                    class="font-weight-bold" small
                                                >
                                                    {{`${item.TotalModulePointsUsage}/${item.CarrierModulePointLimit}`}}
                                                </v-chip>
                                            </td>
                                            <td :align="`${headers.find(h => h.value === 'CarrierHullMass').align}`"
                                                :style="headers.find(h => h.value === 'CarrierHullMass').divider ? `${$vuetify.theme.dark ? 'border-right: 1px solid rgba(255,255,255,0.12)' : 'border-right: 1px solid rgba(0,0,0,0.12)'}` : ''"
                                            >
                                                <span class="subtitle-1" :style="`${item.disabled ? 'opacity: 0.5;' : ''}`">{{ item.CarrierHullMass | decimal }}</span>
                                            </td>
                                            <td :align="`${headers.find(h => h.value === 'TotalMass').align}`"
                                                :style="headers.find(h => h.value === 'TotalMass').divider ? `${$vuetify.theme.dark ? 'border-right: 1px solid rgba(255,255,255,0.12)' : 'border-right: 1px solid rgba(0,0,0,0.12)'}` : ''"
                                            >
                                                <span class="subtitle-1" :style="`${item.disabled ? 'opacity: 0.5;' : ''}`">{{ item.TotalMass | decimal }}</span>
                                            </td>
                                            <td :align="`${headers.find(h => h.value === 'TotalCrewCost').align}`"
                                                :style="headers.find(h => h.value === 'TotalCrewCost').divider ? `${$vuetify.theme.dark ? 'border-right: 1px solid rgba(255,255,255,0.12)' : 'border-right: 1px solid rgba(0,0,0,0.12)'}` : ''"
                                            >
                                                <span class="subtitle-1" :style="`${item.disabled ? 'opacity: 0.5;' : ''}`">{{ item.TotalCrewCost | decimal }}</span>
                                            </td>
                                            <td :align="`${headers.find(h => h.value === 'TotalHeatCapacity').align}`"
                                                :style="headers.find(h => h.value === 'TotalHeatCapacity').divider ? `${$vuetify.theme.dark ? 'border-right: 1px solid rgba(255,255,255,0.12)' : 'border-right: 1px solid rgba(0,0,0,0.12)'}` : ''"
                                            >
                                                <span class="subtitle-1" :style="`${item.disabled ? 'opacity: 0.5;' : ''}`">{{ item.TotalHeatCapacity | decimal }}</span>
                                            </td>
                                            <td :align="`${headers.find(h => h.value === 'Maneuverability').align}`"
                                                :style="headers.find(h => h.value === 'Maneuverability').divider ? `${$vuetify.theme.dark ? 'border-right: 1px solid rgba(255,255,255,0.12)' : 'border-right: 1px solid rgba(0,0,0,0.12)'}` : ''"
                                            >
                                                <span class="subtitle-1" :style="`${item.disabled ? 'opacity: 0.5;' : ''}`">{{ item.Maneuverability | decimal5 }}</span>
                                            </td>
                                            <td :align="`${headers.find(h => h.value === 'FuelSystemFuelConsumptionRate').align}`"
                                                :style="headers.find(h => h.value === 'FuelSystemFuelConsumptionRate').divider ? `${$vuetify.theme.dark ? 'border-right: 1px solid rgba(255,255,255,0.12)' : 'border-right: 1px solid rgba(0,0,0,0.12)'}` : ''"
                                            >
                                                <span class="subtitle-1" :style="`${item.disabled ? 'opacity: 0.5;' : ''}`">{{ item.FuelSystemFuelConsumptionRate | decimal }}</span>
                                            </td>
                                            <td :align="`${headers.find(h => h.value === 'FuelSystemFuelCapacity').align}`"
                                                :style="headers.find(h => h.value === 'FuelSystemFuelCapacity').divider ? `${$vuetify.theme.dark ? 'border-right: 1px solid rgba(255,255,255,0.12)' : 'border-right: 1px solid rgba(0,0,0,0.12)'}` : ''"
                                            >
                                                <span class="subtitle-1" :style="`${item.disabled ? 'opacity: 0.5;' : ''}`">{{ item.FuelSystemFuelCapacity | decimal }}</span>
                                            </td>
                                            <td :align="`${headers.find(h => h.value === 'FuelSystemFuelRegenerationRate').align}`"
                                                :style="headers.find(h => h.value === 'FuelSystemFuelRegenerationRate').divider ? `${$vuetify.theme.dark ? 'border-right: 1px solid rgba(255,255,255,0.12)' : 'border-right: 1px solid rgba(0,0,0,0.12)'}` : ''"
                                            >
                                                <span class="subtitle-1" :style="`${item.disabled ? 'opacity: 0.5;' : ''}`">{{ item.FuelSystemFuelRegenerationRate | decimal }}</span>
                                            </td>
                                            <td :align="`${headers.find(h => h.value === 'CarrierDescription').align}`"
                                                :style="headers.find(h => h.value === 'CarrierDescription').divider ? `${$vuetify.theme.dark ? 'border-right: 1px solid rgba(255,255,255,0.12)' : 'border-right: 1px solid rgba(0,0,0,0.12)'}` : ''"
                                            >
                                                <v-menu
                                                    open-on-click allow-overflow
                                                    :close-on-content-click="false" nudge-bottom="3"
                                                    offset-y content-class="rounded-xl elevation-20"
                                                    :z-index="10000" left nudge-left="40"
                                                >
                                                    <template v-slot:activator="{ on, attrs, value }">
                                                        <v-chip 
                                                            :color="value ? 'cfPrimary' : 'grey'" small v-on="on" v-bind="attrs" 
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
                                                                                {{ item.CarrierClass }} Class
                                                                            </v-chip>
                                                                        </template>
                                                                        <carrier-overview
                                                                            :carrier="item.Carrier"
                                                                            :allowClick="false"
                                                                        ></carrier-overview>
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
                                                                                {{ item.ArmorTitle }}
                                                                            </v-chip>
                                                                        </template>
                                                                        <armor-overview
                                                                            :armor="item.Armor"
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
                                                                                {{ item.PointDefenseSystemTitle }}
                                                                            </v-chip>
                                                                        </template>
                                                                        <point-defense-system-overview
                                                                            :pointDefenseSystem="item.PointDefenseSystem"
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
                                                                                {{ item.FuelSystemTitle }}
                                                                            </v-chip>
                                                                        </template>
                                                                        <fuel-system-overview
                                                                            :fuelSystem="item.FuelSystem"
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
                                                                                {{ item.ThrusterTitle }}
                                                                            </v-chip>
                                                                        </template>
                                                                        <thruster-overview
                                                                            :thruster="item.Thruster"
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
                                                                            <div class="caption font-weight-bold">Weapon Frame</div>
                                                                            <v-chip class="subtitle-1 font-weight-bold" v-on="on" v-bind="attrs"
                                                                                :color="value  ? 'cfPrimary' : ''"
                                                                            >
                                                                                {{ item.WeaponFrameTitle }}
                                                                            </v-chip>
                                                                        </template>
                                                                        <weapon-frame-overview
                                                                            :weaponFrame="item.WeaponFrame"
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
                                                                            <div class="caption font-weight-bold">Payload</div>
                                                                            <v-chip class="subtitle-1 font-weight-bold" v-on="on" v-bind="attrs"
                                                                                :color="value  ? 'cfPrimary' : ''"
                                                                            >
                                                                                {{ item.PayloadTitle }}
                                                                            </v-chip>
                                                                        </template>
                                                                        <payload-overview
                                                                            :payload="item.Payload"
                                                                            :allowClick="false"
                                                                        ></payload-overview>
                                                                    </v-menu>  
                                                                </v-flex>
                                                            </v-layout>
                                                        </v-container>
                                                    </v-card>
                                                </v-menu>
                                            </td>
                                        </tr>
                                    </template>
                                    <template v-slot:[`header.CarrierBays`]="{ header }">
                                        <v-tooltip top max-width="300" color="black" open-delay="700" content-class="rounded-xl">
                                            <template v-slot:activator="{ on, attrs }">
                                                <span v-on="on" v-bind="attrs">{{header.text}}</span>
                                            </template>
                                            <span class="subtitle-1">{{header.description}}</span>
                                        </v-tooltip>
                                    </template>
                                    <template v-slot:[`header.CarrierHullMass`]="{ header }">
                                        <v-tooltip top max-width="300" color="black" open-delay="700" content-class="rounded-xl">
                                            <template v-slot:activator="{ on, attrs }">
                                                Hull <v-icon v-for="(icon, index) in header.icons" :key="index" :color="icon.iconColor" :size="icon.size" :class="icon.cssClass" v-on="on" v-bind="attrs">{{icon.icon}}</v-icon>
                                            </template>
                                            <span class="subtitle-1">{{header.description}}</span>
                                        </v-tooltip>
                                    </template>
                                    <template v-slot:[`header.TotalMass`]="{ header }">
                                        <v-tooltip top max-width="300" color="black" open-delay="700" content-class="rounded-xl">
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-icon small>mdi-sigma</v-icon>
                                                <v-icon v-for="(icon, index) in header.icons" :key="index" :color="icon.iconColor" :size="icon.size" :class="icon.cssClass" v-on="on" v-bind="attrs">{{icon.icon}}</v-icon>
                                            </template>
                                            <span class="subtitle-1">{{header.description}}</span>
                                        </v-tooltip>
                                    </template>
                                    <template v-slot:[`header.TotalCrewCost`]="{ header }">
                                        <v-tooltip top max-width="300" color="black" open-delay="700" content-class="rounded-xl">
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-icon small>mdi-sigma</v-icon>
                                                <v-icon v-for="(icon, index) in header.icons" :key="index" :color="icon.iconColor" :size="icon.size" :class="icon.cssClass" v-on="on" v-bind="attrs">{{icon.icon}}</v-icon>
                                            </template>
                                            <span class="subtitle-1">{{header.description}}</span>
                                        </v-tooltip>
                                    </template>
                                    <template v-slot:[`header.TotalHeatCapacity`]="{ header }">
                                        <v-tooltip top max-width="300" color="black" open-delay="700" content-class="rounded-xl">
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-icon small>mdi-sigma</v-icon>
                                                <v-icon v-for="(icon, index) in header.icons" :key="index" :color="icon.iconColor" :size="icon.size" :class="icon.cssClass" v-on="on" v-bind="attrs">{{icon.icon}}</v-icon>
                                            </template>
                                            <span class="subtitle-1">{{header.description}}</span>
                                        </v-tooltip>
                                    </template>
                                    <template v-slot:[`header.Maneuverability`]="{ header }">
                                        <v-tooltip top max-width="300" color="black" open-delay="700" content-class="rounded-xl">
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-icon v-for="(icon, index) in header.icons" :key="index" :color="icon.iconColor" :size="icon.size" :class="icon.cssClass" v-on="on" v-bind="attrs">{{icon.icon}}</v-icon>
                                            </template>
                                            <span class="subtitle-1">{{header.description}}</span>
                                        </v-tooltip>
                                    </template>
                                    <template v-slot:[`header.FuelSystemFuelConsumptionRate`]="{ header }">
                                        <v-tooltip top max-width="300" color="black" open-delay="700" content-class="rounded-xl">
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-icon v-for="(icon, index) in header.icons" :key="index" :color="icon.iconColor" :size="icon.size" :class="icon.cssClass" v-on="on" v-bind="attrs">{{icon.icon}}</v-icon>
                                            </template>
                                            <span class="subtitle-1">{{header.description}}</span>
                                        </v-tooltip>
                                    </template>
                                    <template v-slot:[`header.FuelSystemFuelCapacity`]="{ header }">
                                        <v-tooltip top max-width="300" color="black" open-delay="700" content-class="rounded-xl">
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-icon v-for="(icon, index) in header.icons" :key="index" :color="icon.iconColor" :size="icon.size" :class="icon.cssClass" v-on="on" v-bind="attrs">{{icon.icon}}</v-icon>
                                            </template>
                                            <span class="subtitle-1">{{header.description}}</span>
                                        </v-tooltip>
                                    </template>
                                    <template v-slot:[`header.FuelSystemFuelRegenerationRate`]="{ header }">
                                        <v-tooltip top max-width="300" color="black" open-delay="700" content-class="rounded-xl">
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-icon v-for="(icon, index) in header.icons" :key="index" :color="icon.iconColor" :size="icon.size" :class="icon.cssClass" v-on="on" v-bind="attrs">{{icon.icon}}</v-icon>
                                            </template>
                                            <span class="subtitle-1">{{header.description}}</span>
                                        </v-tooltip>
                                    </template>
                                    <template v-slot:[`header.CarrierDescription`]="{  }">
                                    </template>
                                </v-data-table>
                            </v-card>
                            <v-data-iterator v-else
                                :items="filteredCarrierConfigurations"
                                :items-per-page.sync="$store.state.fleetCarrier1ConfigurationsItemsPerPage"
                                :page.sync="$store.state.fleetCarrier1ConfigurationsPageSync"
                                @page-count="$store.state.fleetCarrier1ConfigurationsPageCount = $event"
                                :search="$store.state.fleetCarrier1ConfigurationsSearch" class="mt-2 mb-2"
                                :sort-by="$store.state.fleetCarrier1ConfigurationsSortBy ? $store.state.fleetCarrier1ConfigurationsSortBy.value : null"
                                :sort-desc="$store.state.fleetCarrier1ConfigurationsSortDesc"
                                hide-default-footer
                            >
                                <template v-slot:default="props">
                                    <v-layout wrap>
                                        <v-flex xs12 sm12 md6 lg6 xl4 v-for="(carrierConfiguration, i) in props.items" :key="i">
                                            <carrier-configuration-overview class="fill-height"
                                                :carrierConfiguration="carrierConfiguration"
                                            ></carrier-configuration-overview>
                                        </v-flex>
                                    </v-layout>
                                </template>
                            </v-data-iterator>
                            <v-layout wrap align-center>
                                <v-flex grow>
                                    <v-pagination :length="$store.state.fleetCarrier1ConfigurationsPageCount" :total-visible="7"
                                        v-model="$store.state.fleetCarrier1ConfigurationsPageSync" color="cfPrimary" circle
                                    ></v-pagination>
                                </v-flex>
                                <v-flex xs12 sm12 md4 lg3 xl3>
                                    <v-select v-model="$store.state.fleetCarrier1ConfigurationsItemsPerPage"
                                        :items="$store.state.itemsPerPageOptions"
                                        outlined hide-details rounded dense item-value="value" item-text="text"
                                        label="Items Per Page" color="cfPrimary" item-color="cfPrimary"
                                    ></v-select>
                                </v-flex>
                            </v-layout>
                        </v-expansion-panel-content>
                    </v-expansion-panel>












                    <v-expansion-panel class="rounded-xl mt-0 mb-2 expansionPanelBackground" :style="`outline: thin solid ${$vuetify.theme.dark ? $vuetify.theme.themes.dark['outline'] : $vuetify.theme.themes.light['outline']}`">
                        <v-expansion-panel-header class="pt-0 pb-0">
                            <span class="title">Fleet Carrier 2</span>
                        </v-expansion-panel-header>
                        <v-expansion-panel-content>
                            <v-layout wrap align-center>
                                <v-flex xs12 sm12 md5 lg5 xl4>
                                    <v-text-field v-model="$store.state.fleetCarrier2ConfigurationsSearch"
                                        clearable outlined hide-details rounded dense
                                        prepend-icon="mdi-magnify" label="Search" color="cfPrimary"
                                    ></v-text-field>
                                </v-flex> 
                                <v-flex grow>
                                    <v-combobox v-model="$store.state.fleetCarrier2ConfigurationsSortBy"
                                        flat outlined hide-details rounded dense clearable
                                        label="Sort by" color="cfPrimary" item-color="cfPrimary" item-text="text" item-value="value"
                                        :items="$store.state.fleetCarrier2ConfigurationsSortOptions" :menu-props="{maxHeight: 600}"
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
                                    <v-btn-toggle rounded dense v-model="$store.state.fleetCarrier2ConfigurationsSortDesc" mandatory>
                                        <v-btn depressed :value="false">
                                            <v-icon>mdi-arrow-up</v-icon>
                                        </v-btn>
                                        <v-btn depressed :value="true">
                                            <v-icon>mdi-arrow-down</v-icon>
                                        </v-btn>
                                    </v-btn-toggle>
                                </v-flex>
                            </v-layout>
                            <v-card class="rounded-xl mb-2 mt-2" outlined v-if="$store.state.configurationsCondensedView">
                                <v-data-table
                                    :items="filteredCarrierConfigurations"
                                    :items-per-page.sync="$store.state.fleetCarrier2ConfigurationsItemsPerPage"
                                    :page.sync="$store.state.fleetCarrier2ConfigurationsPageSync"
                                    @page-count="$store.state.fleetCarrier2ConfigurationsPageCount = $event"
                                    :search.sync="$store.state.fleetCarrier2ConfigurationsSearch" class="rounded-table clickable-rows"
                                    :sort-by="$store.state.fleetCarrier2ConfigurationsSortBy ? $store.state.fleetCarrier2ConfigurationsSortBy.value : null"
                                    :sort-desc.sync="$store.state.fleetCarrier2ConfigurationsSortDesc" dense loader-height="0"
                                    hide-default-footer :loading="fleetCarrierConfigurationsLoading" :headers="$store.state.fleetCarrier2ConfigurationsHeaders"
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
                                        <tr @click="$router.push({path: `${$router.history.current.path}/carriers/${item.CarrierConfigurationGuid}`});">
                                            <td 
                                                :align="`${headers.find(h => h.value === 'Name').align}`" 
                                                :style="headers.find(h => h.value === 'Name').divider ? `${$vuetify.theme.dark ? 'border-right: 1px solid rgba(255,255,255,0.12)' : 'border-right: 1px solid rgba(0,0,0,0.12)'}` : ''"
                                            >
                                                <span class="subtitle-1" :style="`${item.disabled ? 'opacity: 0.5;' : ''}`">{{ item.Name }}</span>
                                            </td>
                                            <td 
                                                :align="`${headers.find(h => h.value === 'Class').align}`" 
                                                :style="headers.find(h => h.value === 'Class').divider ? `${$vuetify.theme.dark ? 'border-right: 1px solid rgba(255,255,255,0.12)' : 'border-right: 1px solid rgba(0,0,0,0.12)'}` : ''"
                                            >
                                                <span class="subtitle-1" :style="`${item.disabled ? 'opacity: 0.5;' : ''}`">{{ item.CarrierClass }}</span>
                                            </td>
                                            <td :align="`${headers.find(h => h.value === 'CarrierBays').align}`"
                                                :style="headers.find(h => h.value === 'CarrierBays').divider ? `${$vuetify.theme.dark ? 'border-right: 1px solid rgba(255,255,255,0.12)' : 'border-right: 1px solid rgba(0,0,0,0.12)'}` : ''"
                                            >
                                                <v-tooltip top max-width="300" color="black" open-delay="0" content-class="rounded-xl">
                                                    <template v-slot:activator="{ on, attrs }">
                                                        <v-chip :style="`${item.disabled ? 'opacity: 0.5;' : ''}`"
                                                            class="subtitle-2 pl-2 pr-2 mr-1" small v-on="on" v-bind="attrs"
                                                        >
                                                            {{`${item.CarrierFighterBays}`}}
                                                        </v-chip>
                                                    </template>
                                                    <span class="subtitle-1">Fighter Bays</span>
                                                </v-tooltip>
                                                <v-tooltip top max-width="300" color="black" open-delay="0" content-class="rounded-xl">
                                                    <template v-slot:activator="{ on, attrs }">
                                                        <v-chip :style="`${item.disabled ? 'opacity: 0.5;' : ''}`"
                                                            class="subtitle-2 pl-2 pr-2 mr-1" small v-on="on" v-bind="attrs"
                                                        >
                                                            {{`${item.CarrierCorvetteBays}`}}
                                                        </v-chip>
                                                    </template>
                                                    <span class="subtitle-1">Corvette Bays</span>
                                                </v-tooltip>
                                                <v-tooltip top max-width="300" color="black" open-delay="0" content-class="rounded-xl">
                                                    <template v-slot:activator="{ on, attrs }">
                                                        <v-chip :style="`${item.disabled ? 'opacity: 0.5;' : ''}`"
                                                            class="subtitle-2 pl-2 pr-2 mr-1" small v-on="on" v-bind="attrs"
                                                        >
                                                            {{`${item.CarrierFrigateBays}`}}
                                                        </v-chip>
                                                    </template>
                                                    <span class="subtitle-1">Frigate Bays</span>
                                                </v-tooltip>
                                                <v-tooltip top max-width="300" color="black" open-delay="0" content-class="rounded-xl">
                                                    <template v-slot:activator="{ on, attrs }">
                                                        <v-chip :style="`${item.disabled ? 'opacity: 0.5;' : ''}`"
                                                            class="subtitle-2 pl-2 pr-2 mr-1" small v-on="on" v-bind="attrs"
                                                        >
                                                            {{`${item.CarrierDestroyerBays}`}}
                                                        </v-chip>
                                                    </template>
                                                    <span class="subtitle-1">Destroyer Bays</span>
                                                </v-tooltip>
                                            </td>
                                            <td :align="`${headers.find(h => h.value === 'TotalModulePointsUsage').align}`"
                                                :style="headers.find(h => h.value === 'TotalModulePointsUsage').divider ? `${$vuetify.theme.dark ? 'border-right: 1px solid rgba(255,255,255,0.12)' : 'border-right: 1px solid rgba(0,0,0,0.12)'}` : ''"
                                            >
                                                <!-- <span class="subtitle-1" :style="`${item.disabled ? 'opacity: 0.5;' : ''}`">{{`${item.TotalModulePointsUsage}/${item.CarrierModulePointLimit}`}}</span> -->
                                                <v-chip :style="`${item.disabled ? 'opacity: 0.5;' : ''}`"
                                                    class="font-weight-bold" small
                                                >
                                                    {{`${item.TotalModulePointsUsage}/${item.CarrierModulePointLimit}`}}
                                                </v-chip>
                                            </td>
                                            <td :align="`${headers.find(h => h.value === 'CarrierHullMass').align}`"
                                                :style="headers.find(h => h.value === 'CarrierHullMass').divider ? `${$vuetify.theme.dark ? 'border-right: 1px solid rgba(255,255,255,0.12)' : 'border-right: 1px solid rgba(0,0,0,0.12)'}` : ''"
                                            >
                                                <span class="subtitle-1" :style="`${item.disabled ? 'opacity: 0.5;' : ''}`">{{ item.CarrierHullMass | decimal }}</span>
                                            </td>
                                            <td :align="`${headers.find(h => h.value === 'TotalMass').align}`"
                                                :style="headers.find(h => h.value === 'TotalMass').divider ? `${$vuetify.theme.dark ? 'border-right: 1px solid rgba(255,255,255,0.12)' : 'border-right: 1px solid rgba(0,0,0,0.12)'}` : ''"
                                            >
                                                <span class="subtitle-1" :style="`${item.disabled ? 'opacity: 0.5;' : ''}`">{{ item.TotalMass | decimal }}</span>
                                            </td>
                                            <td :align="`${headers.find(h => h.value === 'TotalCrewCost').align}`"
                                                :style="headers.find(h => h.value === 'TotalCrewCost').divider ? `${$vuetify.theme.dark ? 'border-right: 1px solid rgba(255,255,255,0.12)' : 'border-right: 1px solid rgba(0,0,0,0.12)'}` : ''"
                                            >
                                                <span class="subtitle-1" :style="`${item.disabled ? 'opacity: 0.5;' : ''}`">{{ item.TotalCrewCost | decimal }}</span>
                                            </td>
                                            <td :align="`${headers.find(h => h.value === 'TotalHeatCapacity').align}`"
                                                :style="headers.find(h => h.value === 'TotalHeatCapacity').divider ? `${$vuetify.theme.dark ? 'border-right: 1px solid rgba(255,255,255,0.12)' : 'border-right: 1px solid rgba(0,0,0,0.12)'}` : ''"
                                            >
                                                <span class="subtitle-1" :style="`${item.disabled ? 'opacity: 0.5;' : ''}`">{{ item.TotalHeatCapacity | decimal }}</span>
                                            </td>
                                            <td :align="`${headers.find(h => h.value === 'Maneuverability').align}`"
                                                :style="headers.find(h => h.value === 'Maneuverability').divider ? `${$vuetify.theme.dark ? 'border-right: 1px solid rgba(255,255,255,0.12)' : 'border-right: 1px solid rgba(0,0,0,0.12)'}` : ''"
                                            >
                                                <span class="subtitle-1" :style="`${item.disabled ? 'opacity: 0.5;' : ''}`">{{ item.Maneuverability | decimal5 }}</span>
                                            </td>
                                            <td :align="`${headers.find(h => h.value === 'FuelSystemFuelConsumptionRate').align}`"
                                                :style="headers.find(h => h.value === 'FuelSystemFuelConsumptionRate').divider ? `${$vuetify.theme.dark ? 'border-right: 1px solid rgba(255,255,255,0.12)' : 'border-right: 1px solid rgba(0,0,0,0.12)'}` : ''"
                                            >
                                                <span class="subtitle-1" :style="`${item.disabled ? 'opacity: 0.5;' : ''}`">{{ item.FuelSystemFuelConsumptionRate | decimal }}</span>
                                            </td>
                                            <td :align="`${headers.find(h => h.value === 'FuelSystemFuelCapacity').align}`"
                                                :style="headers.find(h => h.value === 'FuelSystemFuelCapacity').divider ? `${$vuetify.theme.dark ? 'border-right: 1px solid rgba(255,255,255,0.12)' : 'border-right: 1px solid rgba(0,0,0,0.12)'}` : ''"
                                            >
                                                <span class="subtitle-1" :style="`${item.disabled ? 'opacity: 0.5;' : ''}`">{{ item.FuelSystemFuelCapacity | decimal }}</span>
                                            </td>
                                            <td :align="`${headers.find(h => h.value === 'FuelSystemFuelRegenerationRate').align}`"
                                                :style="headers.find(h => h.value === 'FuelSystemFuelRegenerationRate').divider ? `${$vuetify.theme.dark ? 'border-right: 1px solid rgba(255,255,255,0.12)' : 'border-right: 1px solid rgba(0,0,0,0.12)'}` : ''"
                                            >
                                                <span class="subtitle-1" :style="`${item.disabled ? 'opacity: 0.5;' : ''}`">{{ item.FuelSystemFuelRegenerationRate | decimal }}</span>
                                            </td>
                                            <td :align="`${headers.find(h => h.value === 'CarrierDescription').align}`"
                                                :style="headers.find(h => h.value === 'CarrierDescription').divider ? `${$vuetify.theme.dark ? 'border-right: 1px solid rgba(255,255,255,0.12)' : 'border-right: 1px solid rgba(0,0,0,0.12)'}` : ''"
                                            >
                                                <v-menu
                                                    open-on-click allow-overflow
                                                    :close-on-content-click="false" nudge-bottom="3"
                                                    offset-y content-class="rounded-xl elevation-20"
                                                    :z-index="10000" left nudge-left="40"
                                                >
                                                    <template v-slot:activator="{ on, attrs, value }">
                                                        <v-chip 
                                                            :color="value ? 'cfPrimary' : 'grey'" small v-on="on" v-bind="attrs" 
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
                                                                                {{ item.CarrierClass }} Class
                                                                            </v-chip>
                                                                        </template>
                                                                        <carrier-overview
                                                                            :carrier="item.Carrier"
                                                                            :allowClick="false"
                                                                        ></carrier-overview>
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
                                                                                {{ item.ArmorTitle }}
                                                                            </v-chip>
                                                                        </template>
                                                                        <armor-overview
                                                                            :armor="item.Armor"
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
                                                                                {{ item.PointDefenseSystemTitle }}
                                                                            </v-chip>
                                                                        </template>
                                                                        <point-defense-system-overview
                                                                            :pointDefenseSystem="item.PointDefenseSystem"
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
                                                                                {{ item.FuelSystemTitle }}
                                                                            </v-chip>
                                                                        </template>
                                                                        <fuel-system-overview
                                                                            :fuelSystem="item.FuelSystem"
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
                                                                                {{ item.ThrusterTitle }}
                                                                            </v-chip>
                                                                        </template>
                                                                        <thruster-overview
                                                                            :thruster="item.Thruster"
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
                                                                            <div class="caption font-weight-bold">Weapon Frame</div>
                                                                            <v-chip class="subtitle-1 font-weight-bold" v-on="on" v-bind="attrs"
                                                                                :color="value  ? 'cfPrimary' : ''"
                                                                            >
                                                                                {{ item.WeaponFrameTitle }}
                                                                            </v-chip>
                                                                        </template>
                                                                        <weapon-frame-overview
                                                                            :weaponFrame="item.WeaponFrame"
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
                                                                            <div class="caption font-weight-bold">Payload</div>
                                                                            <v-chip class="subtitle-1 font-weight-bold" v-on="on" v-bind="attrs"
                                                                                :color="value  ? 'cfPrimary' : ''"
                                                                            >
                                                                                {{ item.PayloadTitle }}
                                                                            </v-chip>
                                                                        </template>
                                                                        <payload-overview
                                                                            :payload="item.Payload"
                                                                            :allowClick="false"
                                                                        ></payload-overview>
                                                                    </v-menu>  
                                                                </v-flex>
                                                            </v-layout>
                                                        </v-container>
                                                    </v-card>
                                                </v-menu>
                                            </td>
                                        </tr>
                                    </template>
                                    <template v-slot:[`header.CarrierBays`]="{ header }">
                                        <v-tooltip top max-width="300" color="black" open-delay="700" content-class="rounded-xl">
                                            <template v-slot:activator="{ on, attrs }">
                                                <span v-on="on" v-bind="attrs">{{header.text}}</span>
                                            </template>
                                            <span class="subtitle-1">{{header.description}}</span>
                                        </v-tooltip>
                                    </template>
                                    <template v-slot:[`header.CarrierHullMass`]="{ header }">
                                        <v-tooltip top max-width="300" color="black" open-delay="700" content-class="rounded-xl">
                                            <template v-slot:activator="{ on, attrs }">
                                                Hull <v-icon v-for="(icon, index) in header.icons" :key="index" :color="icon.iconColor" :size="icon.size" :class="icon.cssClass" v-on="on" v-bind="attrs">{{icon.icon}}</v-icon>
                                            </template>
                                            <span class="subtitle-1">{{header.description}}</span>
                                        </v-tooltip>
                                    </template>
                                    <template v-slot:[`header.TotalMass`]="{ header }">
                                        <v-tooltip top max-width="300" color="black" open-delay="700" content-class="rounded-xl">
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-icon small>mdi-sigma</v-icon>
                                                <v-icon v-for="(icon, index) in header.icons" :key="index" :color="icon.iconColor" :size="icon.size" :class="icon.cssClass" v-on="on" v-bind="attrs">{{icon.icon}}</v-icon>
                                            </template>
                                            <span class="subtitle-1">{{header.description}}</span>
                                        </v-tooltip>
                                    </template>
                                    <template v-slot:[`header.TotalCrewCost`]="{ header }">
                                        <v-tooltip top max-width="300" color="black" open-delay="700" content-class="rounded-xl">
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-icon small>mdi-sigma</v-icon>
                                                <v-icon v-for="(icon, index) in header.icons" :key="index" :color="icon.iconColor" :size="icon.size" :class="icon.cssClass" v-on="on" v-bind="attrs">{{icon.icon}}</v-icon>
                                            </template>
                                            <span class="subtitle-1">{{header.description}}</span>
                                        </v-tooltip>
                                    </template>
                                    <template v-slot:[`header.TotalHeatCapacity`]="{ header }">
                                        <v-tooltip top max-width="300" color="black" open-delay="700" content-class="rounded-xl">
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-icon small>mdi-sigma</v-icon>
                                                <v-icon v-for="(icon, index) in header.icons" :key="index" :color="icon.iconColor" :size="icon.size" :class="icon.cssClass" v-on="on" v-bind="attrs">{{icon.icon}}</v-icon>
                                            </template>
                                            <span class="subtitle-1">{{header.description}}</span>
                                        </v-tooltip>
                                    </template>
                                    <template v-slot:[`header.Maneuverability`]="{ header }">
                                        <v-tooltip top max-width="300" color="black" open-delay="700" content-class="rounded-xl">
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-icon v-for="(icon, index) in header.icons" :key="index" :color="icon.iconColor" :size="icon.size" :class="icon.cssClass" v-on="on" v-bind="attrs">{{icon.icon}}</v-icon>
                                            </template>
                                            <span class="subtitle-1">{{header.description}}</span>
                                        </v-tooltip>
                                    </template>
                                    <template v-slot:[`header.FuelSystemFuelConsumptionRate`]="{ header }">
                                        <v-tooltip top max-width="300" color="black" open-delay="700" content-class="rounded-xl">
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-icon v-for="(icon, index) in header.icons" :key="index" :color="icon.iconColor" :size="icon.size" :class="icon.cssClass" v-on="on" v-bind="attrs">{{icon.icon}}</v-icon>
                                            </template>
                                            <span class="subtitle-1">{{header.description}}</span>
                                        </v-tooltip>
                                    </template>
                                    <template v-slot:[`header.FuelSystemFuelCapacity`]="{ header }">
                                        <v-tooltip top max-width="300" color="black" open-delay="700" content-class="rounded-xl">
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-icon v-for="(icon, index) in header.icons" :key="index" :color="icon.iconColor" :size="icon.size" :class="icon.cssClass" v-on="on" v-bind="attrs">{{icon.icon}}</v-icon>
                                            </template>
                                            <span class="subtitle-1">{{header.description}}</span>
                                        </v-tooltip>
                                    </template>
                                    <template v-slot:[`header.FuelSystemFuelRegenerationRate`]="{ header }">
                                        <v-tooltip top max-width="300" color="black" open-delay="700" content-class="rounded-xl">
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-icon v-for="(icon, index) in header.icons" :key="index" :color="icon.iconColor" :size="icon.size" :class="icon.cssClass" v-on="on" v-bind="attrs">{{icon.icon}}</v-icon>
                                            </template>
                                            <span class="subtitle-1">{{header.description}}</span>
                                        </v-tooltip>
                                    </template>
                                    <template v-slot:[`header.CarrierDescription`]="{  }">
                                    </template>
                                </v-data-table>
                            </v-card>
                            <v-data-iterator v-else
                                :items="filteredCarrierConfigurations"
                                :items-per-page.sync="$store.state.fleetCarrier2ConfigurationsItemsPerPage"
                                :page.sync="$store.state.fleetCarrier2ConfigurationsPageSync"
                                @page-count="$store.state.fleetCarrier2ConfigurationsPageCount = $event"
                                :search="$store.state.fleetCarrier2ConfigurationsSearch" class="mt-2 mb-2"
                                :sort-by="$store.state.fleetCarrier2ConfigurationsSortBy ? $store.state.fleetCarrier2ConfigurationsSortBy.value : null"
                                :sort-desc="$store.state.fleetCarrier2ConfigurationsSortDesc"
                                hide-default-footer
                            >
                                <template v-slot:default="props">
                                    <v-layout wrap>
                                        <v-flex xs12 sm12 md6 lg6 xl4 v-for="(carrierConfiguration, i) in props.items" :key="i">
                                            <carrier-configuration-overview class="fill-height"
                                                :carrierConfiguration="carrierConfiguration"
                                            ></carrier-configuration-overview>
                                        </v-flex>
                                    </v-layout>
                                </template>
                            </v-data-iterator>
                            <v-layout wrap align-center>
                                <v-flex grow>
                                    <v-pagination :length="$store.state.fleetCarrier2ConfigurationsPageCount" :total-visible="7"
                                        v-model="$store.state.fleetCarrier2ConfigurationsPageSync" color="cfPrimary" circle
                                    ></v-pagination>
                                </v-flex>
                                <v-flex xs12 sm12 md4 lg3 xl3>
                                    <v-select v-model="$store.state.fleetCarrier2ConfigurationsItemsPerPage"
                                        :items="$store.state.itemsPerPageOptions"
                                        outlined hide-details rounded dense item-value="value" item-text="text"
                                        label="Items Per Page" color="cfPrimary" item-color="cfPrimary"
                                    ></v-select>
                                </v-flex>
                            </v-layout>
                        </v-expansion-panel-content>
                    </v-expansion-panel>



                </v-expansion-panels>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import { mapState } from 'vuex';
import { FleetRepository, BattlecruiserConfigurationRepository, CarrierConfigurationRepository, CorvetteConfigurationRepository, DestroyerConfigurationRepository, FighterConfigurationRepository, FrigateConfigurationRepository } from '../../repositories';
import { UsersRepository } from '../../repositories';
import { FleetModel } from '../../models/Fleets/FleetModel';
import { BattlecruiserConfigurationModel } from '../../models/Configurations/BattlecruiserConfigurationModel';
import BattlecruiserConfigurationOverview from '../../components/Configurations/BattlecruiserConfigurationOverview.vue';
import BattlecruiserOverview from '../../components/Battlecruiser/BattlecruiserOverview.vue';
import { CarrierConfigurationModel } from '../../models/Configurations/CarrierConfigurationModel';
import CarrierConfigurationOverview from '../../components/Configurations/CarrierConfigurationOverview.vue';
import CarrierOverview from '../../components/Carrier/CarrierOverview.vue';
import { DestroyerConfigurationModel } from '../../models/Configurations/DestroyerConfigurationModel';
import DestroyerConfigurationOverview from '../../components/Configurations/DestroyerConfigurationOverview.vue';
import DestroyerOverview from '../../components/Destroyer/DestroyerOverview.vue';
import { FrigateConfigurationModel } from '../../models/Configurations/FrigateConfigurationModel';
import FrigateConfigurationOverview from '../../components/Configurations/FrigateConfigurationOverview.vue';
import FrigateOverview from '../../components/Frigate/FrigateOverview.vue';
import { CorvetteConfigurationModel } from '../../models/Configurations/CorvetteConfigurationModel';
import CorvetteConfigurationOverview from '../../components/Configurations/CorvetteConfigurationOverview.vue';
import CorvetteOverview from '../../components/Corvette/CorvetteOverview.vue';
import { FighterConfigurationModel } from '../../models/Configurations/FighterConfigurationModel';
import FighterConfigurationOverview from '../../components/Configurations/FighterConfigurationOverview.vue';
import FighterOverview from '../../components/Fighter/FighterOverview.vue';
import ArmorOverview from '../../components/Armor/ArmorOverview.vue';
import PointDefenseSystemOverview from '../../components/PointDefenseSystem/PointDefenseSystemOverview.vue';
import FuelSystemOverview from '../../components/FuelSystem/FuelSystemOverview.vue';
import ThrusterOverview from '../../components/Thruster/ThrusterOverview.vue';
import WeaponFrameOverview from '../../components/WeaponFrame/WeaponFrameOverview.vue';
import PayloadOverview from '../../components/Payload/PayloadOverview.vue';


export default {
    name: "FleetBuilder",

    components: {
        BattlecruiserConfigurationOverview,
        BattlecruiserOverview,
        CarrierConfigurationOverview,
        CarrierOverview,
        DestroyerConfigurationOverview,
        DestroyerOverview,
        FrigateConfigurationOverview,
        FrigateOverview,
        CorvetteConfigurationOverview,
        CorvetteOverview,
        FighterConfigurationOverview,
        FighterOverview,
        ArmorOverview,
        PointDefenseSystemOverview,
        FuelSystemOverview,
        ThrusterOverview,
        WeaponFrameOverview,
        PayloadOverview,
    },

    data: () => ({
        
        fleetRepository: new FleetRepository(),
        battlecruiserConfigurationRepository: new BattlecruiserConfigurationRepository(),
        carrierConfigurationRepository: new CarrierConfigurationRepository(),
        destroyerConfigurationRepository: new DestroyerConfigurationRepository(),
        frigateConfigurationRepository: new FrigateConfigurationRepository(),
        corvetteConfigurationRepository: new CorvetteConfigurationRepository(),
        fighterConfigurationRepository: new FighterConfigurationRepository(),
        usersRepository: new UsersRepository(),

        fleet: null,
        editingFleet: null,
        fleetBattlecruiser: null,
        newFleetMode: false,
        battlecruiserConfigurations: [],
        fleetBattlecruiserConfigurationsLoading: false,
        carrierConfigurations: [],
        fleetCarrierConfigurationsLoading: false,
        destroyerConfigurations: [],
        fleetDestroyerConfigurationsLoading: false,
        frigateConfigurations: [],
        fleetFrigateConfigurationsLoading: false,
        corvetteConfigurations: [],
        fleetCorvetteConfigurationsLoading: false,
        fighterConfigurations: [],
        fleetFighterConfigurationsLoading: false,
        selectedFleet: null,
        newFleet: new FleetModel(),
    }),

    computed: {
        ...mapState([
            'validationRules',
        ]),

        filteredBattlecruiserConfigurations() {
            return this.battlecruiserConfigurations;
        },

        filteredCarrierConfigurations() {
            return this.carrierConfigurations;
        },

        filteredDestroyerConfigurations() {
            return this.destroyerConfigurations;
        },

        filteredFrigateConfigurations() {
            return this.frigateConfigurations;
        },

        filteredCorvetteConfigurations() {
            return this.corvetteConfigurations;
        },

        filteredFighterConfigurations() {
            return this.fighterConfigurations;
        }
    },

    methods: {
        getUserFleet() {
            this.$store.state.isLoading = true;
            this.fleetRepository.getUserFleet(this.$route.params.FleetGuid)
                .then((apiResponse) => {
                    console.log('apiResponse', apiResponse);
                    this.fleet = apiResponse.data;
                    this.fleetBattlecruiser = new BattlecruiserConfigurationModel(this.fleet.FleetBattlecruisers[0].BattlecruiserConfiguration) || null;
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
        getUserBattlecruiserConfigurations() {
            this.$store.state.isLoading = true;
            this.fleetBattlecruiserConfigurationsLoading = true;
            this.battlecruiserConfigurationRepository.getUserBattlecruiserConfigurations()
                .then((apiResponse) => {
                    console.log('apiResponse', apiResponse);
                    var responses = apiResponse.data;
                    for (var i = 0; i < responses.length; i++) {
                        this.battlecruiserConfigurations.push(new BattlecruiserConfigurationModel(responses[i]));
                    }
                    this.$store.state.isLoading = false;
                    this.fleetBattlecruiserConfigurationsLoading = false;
                })
                .catch((apiError) => {
                    console.error(apiError)
                    this.$emit('show-snackbar', {
                        message: 'Failed to get your Battlecruiser Configurations. Please try again later',
                        color: 'red',
                        show: true
                    });
                    this.$store.state.isLoading = false;
                    this.fleetBattlecruiserConfigurationsLoading = false;
                })
        },
        getUserCarrierConfigurations() {
            this.$store.state.isLoading = true;
            this.fleetCarrierConfigurationsLoading = true;
            this.carrierConfigurationRepository.getUserCarrierConfigurations()
                .then((apiResponse) => {
                    console.log('apiResponse', apiResponse);
                    var responses = apiResponse.data;
                    for (var i = 0; i < responses.length; i++) {
                        this.carrierConfigurations.push(new CarrierConfigurationModel(responses[i]));
                    }
                    this.$store.state.isLoading = false;
                    this.fleetCarrierConfigurationsLoading = false;
                })
                .catch((apiError) => {
                    console.error(apiError)
                    this.$emit('show-snackbar', {
                        message: 'Failed to get your Carrier Configurations. Please try again later',
                        color: 'red',
                        show: true
                    });
                    this.$store.state.isLoading = false;
                    this.fleetCarrierConfigurationsLoading = false;
                })
        },
        getUserDestroyerConfigurations() {
            this.$store.state.isLoading = true;
            this.fleetDestroyerConfigurationsLoading = true;
            this.destroyerConfigurationRepository.getUserDestroyerConfigurations()
                .then((apiResponse) => {
                    console.log('apiResponse', apiResponse);
                    var responses = apiResponse.data;
                    for (var i = 0; i < responses.length; i++) {
                        this.destroyerConfigurations.push(new DestroyerConfigurationModel(responses[i]));
                    }
                    this.$store.state.isLoading = false;
                    this.fleetDestroyerConfigurationsLoading = false;
                })
                .catch((apiError) => {
                    console.error(apiError)
                    this.$emit('show-snackbar', {
                        message: 'Failed to get your Destroyer Configurations. Please try again later',
                        color: 'red',
                        show: true
                    });
                    this.$store.state.isLoading = false;
                    this.fleetDestroyerConfigurationsLoading = false;
                })
        },
        getUserFrigateConfigurations() {
            this.$store.state.isLoading = true;
            this.fleetFrigateConfigurationsLoading = true;
            this.frigateConfigurationRepository.getUserFrigateConfigurations()
                .then((apiResponse) => {
                    console.log('apiResponse', apiResponse);
                    var responses = apiResponse.data;
                    for (var i = 0; i < responses.length; i++) {
                        this.frigateConfigurations.push(new FrigateConfigurationModel(responses[i]));
                    }
                    this.$store.state.isLoading = false;
                    this.fleetFrigateConfigurationsLoading = false;
                })
                .catch((apiError) => {
                    console.error(apiError)
                    this.$emit('show-snackbar', {
                        message: 'Failed to get your Frigate Configurations. Please try again later',
                        color: 'red',
                        show: true
                    });
                    this.$store.state.isLoading = false;
                    this.fleetFrigateConfigurationsLoading = false;
                })
        },
        getUserCorvetteConfigurations() {
            this.$store.state.isLoading = true;
            this.fleetCorvetteConfigurationsLoading = true;
            this.corvetteConfigurationRepository.getUserCorvetteConfigurations()
                .then((apiResponse) => {
                    console.log('apiResponse', apiResponse);
                    var responses = apiResponse.data;
                    for (var i = 0; i < responses.length; i++) {
                        this.corvetteConfigurations.push(new CorvetteConfigurationModel(responses[i]));
                    }
                    this.$store.state.isLoading = false;
                    this.fleetCorvetteConfigurationsLoading = false;
                })
                .catch((apiError) => {
                    console.error(apiError)
                    this.$emit('show-snackbar', {
                        message: 'Failed to get your Corvette Configurations. Please try again later',
                        color: 'red',
                        show: true
                    });
                    this.$store.state.isLoading = false;
                    this.fleetCorvetteConfigurationsLoading = false;
                })
        },
        getUserFighterConfigurations() {
            this.$store.state.isLoading = true;
            this.fleetFighterConfigurationsLoading = true;
            this.fighterConfigurationRepository.getUserFighterConfigurations()
                .then((apiResponse) => {
                    console.log('apiResponse', apiResponse);
                    var responses = apiResponse.data;
                    for (var i = 0; i < responses.length; i++) {
                        this.fighterConfigurations.push(new FighterConfigurationModel(responses[i]));
                    }
                    this.$store.state.isLoading = false;
                    this.fleetFighterConfigurationsLoading = false;
                })
                .catch((apiError) => {
                    console.error(apiError)
                    this.$emit('show-snackbar', {
                        message: 'Failed to get your Fighter Configurations. Please try again later',
                        color: 'red',
                        show: true
                    });
                    this.$store.state.isLoading = false;
                    this.fleetFighterConfigurationsLoading = false;
                })
        },
    },

    created() {
        this.getUserFleet();
        this.getUserBattlecruiserConfigurations();
        this.getUserCarrierConfigurations();
        this.getUserDestroyerConfigurations();
        this.getUserFrigateConfigurations();
        this.getUserCorvetteConfigurations();
        this.getUserFighterConfigurations();
    },

    mounted() {
        
    }
    
};
</script>

<style>
</style>
