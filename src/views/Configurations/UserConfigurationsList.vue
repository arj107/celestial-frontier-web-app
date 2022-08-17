<template>
    <v-container fluid v-show="!$store.state.isLoading">
        <v-layout wrap>
            <v-flex xs12>
                <v-expansion-panels accordian multiple flat class="rounded-xl" v-model="$store.state.selectedConfigurationPanel">
                    <v-expansion-panel class="rounded-xl mt-0 mb-2 expansionPanelBackground" :style="`outline: thin solid ${$vuetify.theme.dark ? $vuetify.theme.themes.dark['outline'] : $vuetify.theme.themes.light['outline']}`">
                        <v-expansion-panel-header class="pt-0 pb-0">
                            <span class="title">Your Battlecruiser Configurations</span>
                        </v-expansion-panel-header>
                        <v-expansion-panel-content>
                            <v-layout wrap align-center>
                                <v-flex xs12 sm12 md5 lg5 xl4>
                                    <v-text-field v-model="$store.state.battlecruiserConfigurationsSearch"
                                        clearable outlined hide-details rounded dense
                                        prepend-icon="mdi-magnify" label="Search" color="cfPrimary"
                                    ></v-text-field>
                                </v-flex> 
                                <v-flex grow>
                                    <v-combobox v-model="$store.state.battlecruiserConfigurationsSortBy"
                                        flat outlined hide-details rounded dense clearable
                                        label="Sort by" color="cfPrimary" item-color="cfPrimary" item-text="text" item-value="value"
                                        :items="$store.state.battlecruiserConfigurationsSortOptions" :menu-props="{maxHeight: 600}"
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
                                    <v-btn-toggle rounded dense v-model="$store.state.battlecruiserConfigurationsSortDesc" mandatory>
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
                                    :items-per-page.sync="$store.state.battlecruiserConfigurationsItemsPerPage"
                                    :page.sync="$store.state.battlecruiserConfigurationsPageSync"
                                    @page-count="$store.state.battlecruiserConfigurationsPageCount = $event"
                                    :search.sync="$store.state.battlecruiserConfigurationsSearch" class="rounded-table clickable-rows"
                                    :sort-by="$store.state.battlecruiserConfigurationsSortBy ? $store.state.battlecruiserConfigurationsSortBy.value : null"
                                    :sort-desc.sync="$store.state.battlecruiserConfigurationsSortDesc" dense loader-height="0"
                                    hide-default-footer :loading="battlecruiserConfigurationsLoading" :headers="$store.state.battlecruiserConfigurationsHeaders"
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
                                :items-per-page.sync="$store.state.battlecruiserConfigurationsItemsPerPage"
                                :page.sync="$store.state.battlecruiserConfigurationsPageSync"
                                @page-count="$store.state.battlecruiserConfigurationsPageCount = $event"
                                :search="$store.state.battlecruiserConfigurationsSearch" class="mt-2 mb-2"
                                :sort-by="$store.state.battlecruiserConfigurationsSortBy ? $store.state.battlecruiserConfigurationsSortBy.value : null"
                                :sort-desc="$store.state.battlecruiserConfigurationsSortDesc"
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
                                    <v-pagination :length="$store.state.battlecruiserConfigurationsPageCount" :total-visible="7"
                                        v-model="$store.state.battlecruiserConfigurationsPageSync" color="cfPrimary" circle
                                    ></v-pagination>
                                </v-flex>
                                <v-flex xs12 sm12 md4 lg3 xl3>
                                    <v-select v-model="$store.state.battlecruiserConfigurationsItemsPerPage"
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
                            <span class="title">Your Carrier Configurations</span>
                        </v-expansion-panel-header>
                        <v-expansion-panel-content>
                            <v-layout wrap align-center>
                                <v-flex xs12 sm12 md5 lg5 xl4>
                                    <v-text-field v-model="$store.state.carrierConfigurationsSearch"
                                        clearable outlined hide-details rounded dense
                                        prepend-icon="mdi-magnify" label="Search" color="cfPrimary"
                                    ></v-text-field>
                                </v-flex> 
                                <v-flex grow>
                                    <v-combobox v-model="$store.state.carrierConfigurationsSortBy"
                                        flat outlined hide-details rounded dense clearable
                                        label="Sort by" color="cfPrimary" item-color="cfPrimary" item-text="text" item-value="value"
                                        :items="$store.state.carrierConfigurationsSortOptions" :menu-props="{maxHeight: 600}"
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
                                    <v-btn-toggle rounded dense v-model="$store.state.carrierConfigurationsSortDesc" mandatory>
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
                                    :items-per-page.sync="$store.state.carrierConfigurationsItemsPerPage"
                                    :page.sync="$store.state.carrierConfigurationsPageSync"
                                    @page-count="$store.state.carrierConfigurationsPageCount = $event"
                                    :search.sync="$store.state.carrierConfigurationsSearch" class="rounded-table clickable-rows"
                                    :sort-by="$store.state.carrierConfigurationsSortBy ? $store.state.carrierConfigurationsSortBy.value : null"
                                    :sort-desc.sync="$store.state.carrierConfigurationsSortDesc" dense loader-height="0"
                                    hide-default-footer :loading="carrierConfigurationsLoading" :headers="$store.state.carrierConfigurationsHeaders"
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
                                :items-per-page.sync="$store.state.carrierConfigurationsItemsPerPage"
                                :page.sync="$store.state.carrierConfigurationsPageSync"
                                @page-count="$store.state.carrierConfigurationsPageCount = $event"
                                :search="$store.state.carrierConfigurationsSearch" class="mt-2 mb-2"
                                :sort-by="$store.state.carrierConfigurationsSortBy ? $store.state.carrierConfigurationsSortBy.value : null"
                                :sort-desc="$store.state.carrierConfigurationsSortDesc"
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
                                    <v-pagination :length="$store.state.carrierConfigurationsPageCount" :total-visible="7"
                                        v-model="$store.state.carrierConfigurationsPageSync" color="cfPrimary" circle
                                    ></v-pagination>
                                </v-flex>
                                <v-flex xs12 sm12 md4 lg3 xl3>
                                    <v-select v-model="$store.state.carrierConfigurationsItemsPerPage"
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
                            <span class="title">Your Destroyer Configurations</span>
                        </v-expansion-panel-header>
                        <v-expansion-panel-content>
                            <v-layout wrap align-center>
                                <v-flex xs12 sm12 md5 lg5 xl4>
                                    <v-text-field v-model="$store.state.destroyerConfigurationsSearch"
                                        clearable outlined hide-details rounded dense
                                        prepend-icon="mdi-magnify" label="Search" color="cfPrimary"
                                    ></v-text-field>
                                </v-flex> 
                                <v-flex grow>
                                    <v-combobox v-model="$store.state.destroyerConfigurationsSortBy"
                                        flat outlined hide-details rounded dense clearable
                                        label="Sort by" color="cfPrimary" item-color="cfPrimary" item-text="text" item-value="value"
                                        :items="$store.state.destroyerConfigurationsSortOptions" :menu-props="{maxHeight: 600}"
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
                                    <v-btn-toggle rounded dense v-model="$store.state.destroyerConfigurationsSortDesc" mandatory>
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
                                    :items="filteredDestroyerConfigurations"
                                    :items-per-page.sync="$store.state.destroyerConfigurationsItemsPerPage"
                                    :page.sync="$store.state.destroyerConfigurationsPageSync"
                                    @page-count="$store.state.destroyerConfigurationsPageCount = $event"
                                    :search.sync="$store.state.destroyerConfigurationsSearch" class="rounded-table clickable-rows"
                                    :sort-by="$store.state.destroyerConfigurationsSortBy ? $store.state.destroyerConfigurationsSortBy.value : null"
                                    :sort-desc.sync="$store.state.destroyerConfigurationsSortDesc" dense loader-height="0"
                                    hide-default-footer :loading="destroyerConfigurationsLoading" :headers="$store.state.destroyerConfigurationsHeaders"
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
                                        <tr @click="$router.push({path: `${$router.history.current.path}/destroyers/${item.DestroyerConfigurationGuid}`});">
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
                                                <span class="subtitle-1" :style="`${item.disabled ? 'opacity: 0.5;' : ''}`">{{ item.DestroyerClass }}</span>
                                            </td>
                                            <td 
                                                :align="`${headers.find(h => h.value === 'DestroyerBaseVigorCost').align}`" 
                                                :style="headers.find(h => h.value === 'DestroyerBaseVigorCost').divider ? `${$vuetify.theme.dark ? 'border-right: 1px solid rgba(255,255,255,0.12)' : 'border-right: 1px solid rgba(0,0,0,0.12)'}` : ''"
                                            >
                                                <span class="subtitle-1" :style="`${item.disabled ? 'opacity: 0.5;' : ''}`">{{ item.DestroyerBaseVigorCost }}</span>
                                            </td>
                                            <td :align="`${headers.find(h => h.value === 'TotalModulePointsUsage').align}`"
                                                :style="headers.find(h => h.value === 'TotalModulePointsUsage').divider ? `${$vuetify.theme.dark ? 'border-right: 1px solid rgba(255,255,255,0.12)' : 'border-right: 1px solid rgba(0,0,0,0.12)'}` : ''"
                                            >
                                                <!-- <span class="subtitle-1" :style="`${item.disabled ? 'opacity: 0.5;' : ''}`">{{`${item.TotalModulePointsUsage}/${item.DestroyerModulePointLimit}`}}</span> -->
                                                <v-chip :style="`${item.disabled ? 'opacity: 0.5;' : ''}`"
                                                    class="font-weight-bold" small
                                                >
                                                    {{`${item.TotalModulePointsUsage}/${item.DestroyerModulePointLimit}`}}
                                                </v-chip>
                                            </td>
                                            <td :align="`${headers.find(h => h.value === 'DestroyerHullMass').align}`"
                                                :style="headers.find(h => h.value === 'DestroyerHullMass').divider ? `${$vuetify.theme.dark ? 'border-right: 1px solid rgba(255,255,255,0.12)' : 'border-right: 1px solid rgba(0,0,0,0.12)'}` : ''"
                                            >
                                                <span class="subtitle-1" :style="`${item.disabled ? 'opacity: 0.5;' : ''}`">{{ item.DestroyerHullMass | decimal }}</span>
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
                                            <td :align="`${headers.find(h => h.value === 'DestroyerDescription').align}`"
                                                :style="headers.find(h => h.value === 'DestroyerDescription').divider ? `${$vuetify.theme.dark ? 'border-right: 1px solid rgba(255,255,255,0.12)' : 'border-right: 1px solid rgba(0,0,0,0.12)'}` : ''"
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
                                                                                {{ item.DestroyerClass }} Class
                                                                            </v-chip>
                                                                        </template>
                                                                        <destroyer-overview
                                                                            :destroyer="item.Destroyer"
                                                                            :allowClick="false"
                                                                        ></destroyer-overview>
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
                                    <template v-slot:[`header.DestroyerBaseVigorCost`]="{ header }">
                                        <v-tooltip top max-width="300" color="black" open-delay="700" content-class="rounded-xl">
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-icon v-for="(icon, index) in header.icons" :key="index" :color="icon.iconColor" :size="icon.size" :class="icon.cssClass" v-on="on" v-bind="attrs">{{icon.icon}}</v-icon>
                                            </template>
                                            <span class="subtitle-1">{{header.description}}</span>
                                        </v-tooltip>
                                    </template>
                                    <template v-slot:[`header.DestroyerHullMass`]="{ header }">
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
                                    <template v-slot:[`header.DestroyerDescription`]="{  }">
                                    </template>
                                </v-data-table>
                            </v-card>
                            <v-data-iterator v-else
                                :items="filteredDestroyerConfigurations"
                                :items-per-page.sync="$store.state.destroyerConfigurationsItemsPerPage"
                                :page.sync="$store.state.destroyerConfigurationsPageSync"
                                @page-count="$store.state.destroyerConfigurationsPageCount = $event"
                                :search="$store.state.destroyerConfigurationsSearch" class="mt-2 mb-2"
                                :sort-by="$store.state.destroyerConfigurationsSortBy ? $store.state.destroyerConfigurationsSortBy.value : null"
                                :sort-desc="$store.state.destroyerConfigurationsSortDesc"
                                hide-default-footer
                            >
                                <template v-slot:default="props">
                                    <v-layout wrap>
                                        <v-flex xs12 sm12 md6 lg6 xl4 v-for="(destroyerConfiguration, i) in props.items" :key="i">
                                            <destroyer-configuration-overview class="fill-height"
                                                :destroyerConfiguration="destroyerConfiguration"
                                            ></destroyer-configuration-overview>
                                        </v-flex>
                                    </v-layout>
                                </template>
                            </v-data-iterator>
                            <v-layout wrap align-center>
                                <v-flex grow>
                                    <v-pagination :length="$store.state.destroyerConfigurationsPageCount" :total-visible="7"
                                        v-model="$store.state.destroyerConfigurationsPageSync" color="cfPrimary" circle
                                    ></v-pagination>
                                </v-flex>
                                <v-flex xs12 sm12 md4 lg3 xl3>
                                    <v-select v-model="$store.state.destroyerConfigurationsItemsPerPage"
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
                            <span class="title">Your Frigate Configurations</span>
                        </v-expansion-panel-header>
                        <v-expansion-panel-content>
                            <v-layout wrap align-center>
                                <v-flex xs12 sm12 md5 lg5 xl4>
                                    <v-text-field v-model="$store.state.frigateConfigurationsSearch"
                                        clearable outlined hide-details rounded dense
                                        prepend-icon="mdi-magnify" label="Search" color="cfPrimary"
                                    ></v-text-field>
                                </v-flex> 
                                <v-flex grow>
                                    <v-combobox v-model="$store.state.frigateConfigurationsSortBy"
                                        flat outlined hide-details rounded dense clearable
                                        label="Sort by" color="cfPrimary" item-color="cfPrimary" item-text="text" item-value="value"
                                        :items="$store.state.frigateConfigurationsSortOptions" :menu-props="{maxHeight: 600}"
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
                                    <v-btn-toggle rounded dense v-model="$store.state.frigateConfigurationsSortDesc" mandatory>
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
                                    :items="filteredFrigateConfigurations"
                                    :items-per-page.sync="$store.state.frigateConfigurationsItemsPerPage"
                                    :page.sync="$store.state.frigateConfigurationsPageSync"
                                    @page-count="$store.state.frigateConfigurationsPageCount = $event"
                                    :search.sync="$store.state.frigateConfigurationsSearch" class="rounded-table clickable-rows"
                                    :sort-by="$store.state.frigateConfigurationsSortBy ? $store.state.frigateConfigurationsSortBy.value : null"
                                    :sort-desc.sync="$store.state.frigateConfigurationsSortDesc" dense loader-height="0"
                                    hide-default-footer :loading="frigateConfigurationsLoading" :headers="$store.state.frigateConfigurationsHeaders"
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
                                        <tr @click="$router.push({path: `${$router.history.current.path}/frigates/${item.FrigateConfigurationGuid}`});">
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
                                                <span class="subtitle-1" :style="`${item.disabled ? 'opacity: 0.5;' : ''}`">{{ item.FrigateClass }}</span>
                                            </td>
                                            <td 
                                                :align="`${headers.find(h => h.value === 'FrigateBaseVigorCost').align}`" 
                                                :style="headers.find(h => h.value === 'FrigateBaseVigorCost').divider ? `${$vuetify.theme.dark ? 'border-right: 1px solid rgba(255,255,255,0.12)' : 'border-right: 1px solid rgba(0,0,0,0.12)'}` : ''"
                                            >
                                                <span class="subtitle-1" :style="`${item.disabled ? 'opacity: 0.5;' : ''}`">{{ item.FrigateBaseVigorCost }}</span>
                                            </td>
                                            <td :align="`${headers.find(h => h.value === 'TotalModulePointsUsage').align}`"
                                                :style="headers.find(h => h.value === 'TotalModulePointsUsage').divider ? `${$vuetify.theme.dark ? 'border-right: 1px solid rgba(255,255,255,0.12)' : 'border-right: 1px solid rgba(0,0,0,0.12)'}` : ''"
                                            >
                                                <!-- <span class="subtitle-1" :style="`${item.disabled ? 'opacity: 0.5;' : ''}`">{{`${item.TotalModulePointsUsage}/${item.FrigateModulePointLimit}`}}</span> -->
                                                <v-chip :style="`${item.disabled ? 'opacity: 0.5;' : ''}`"
                                                    class="font-weight-bold" small
                                                >
                                                    {{`${item.TotalModulePointsUsage}/${item.FrigateModulePointLimit}`}}
                                                </v-chip>
                                            </td>
                                            <td :align="`${headers.find(h => h.value === 'FrigateHullMass').align}`"
                                                :style="headers.find(h => h.value === 'FrigateHullMass').divider ? `${$vuetify.theme.dark ? 'border-right: 1px solid rgba(255,255,255,0.12)' : 'border-right: 1px solid rgba(0,0,0,0.12)'}` : ''"
                                            >
                                                <span class="subtitle-1" :style="`${item.disabled ? 'opacity: 0.5;' : ''}`">{{ item.FrigateHullMass | decimal }}</span>
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
                                            <td :align="`${headers.find(h => h.value === 'FrigateDescription').align}`"
                                                :style="headers.find(h => h.value === 'FrigateDescription').divider ? `${$vuetify.theme.dark ? 'border-right: 1px solid rgba(255,255,255,0.12)' : 'border-right: 1px solid rgba(0,0,0,0.12)'}` : ''"
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
                                                                                {{ item.FrigateClass }} Class
                                                                            </v-chip>
                                                                        </template>
                                                                        <frigate-overview
                                                                            :frigate="item.Frigate"
                                                                            :allowClick="false"
                                                                        ></frigate-overview>
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
                                    <template v-slot:[`header.FrigateBaseVigorCost`]="{ header }">
                                        <v-tooltip top max-width="300" color="black" open-delay="700" content-class="rounded-xl">
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-icon v-for="(icon, index) in header.icons" :key="index" :color="icon.iconColor" :size="icon.size" :class="icon.cssClass" v-on="on" v-bind="attrs">{{icon.icon}}</v-icon>
                                            </template>
                                            <span class="subtitle-1">{{header.description}}</span>
                                        </v-tooltip>
                                    </template>
                                    <template v-slot:[`header.FrigateHullMass`]="{ header }">
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
                                    <template v-slot:[`header.FrigateDescription`]="{  }">
                                    </template>
                                </v-data-table>
                            </v-card>
                            <v-data-iterator v-else
                                :items="filteredFrigateConfigurations"
                                :items-per-page.sync="$store.state.frigateConfigurationsItemsPerPage"
                                :page.sync="$store.state.frigateConfigurationsPageSync"
                                @page-count="$store.state.frigateConfigurationsPageCount = $event"
                                :search="$store.state.frigateConfigurationsSearch" class="mt-2 mb-2"
                                :sort-by="$store.state.frigateConfigurationsSortBy ? $store.state.frigateConfigurationsSortBy.value : null"
                                :sort-desc="$store.state.frigateConfigurationsSortDesc"
                                hide-default-footer
                            >
                                <template v-slot:default="props">
                                    <v-layout wrap>
                                        <v-flex xs12 sm12 md6 lg6 xl4 v-for="(frigateConfiguration, i) in props.items" :key="i">
                                            <frigate-configuration-overview class="fill-height"
                                                :frigateConfiguration="frigateConfiguration"
                                            ></frigate-configuration-overview>
                                        </v-flex>
                                    </v-layout>
                                </template>
                            </v-data-iterator>
                            <v-layout wrap align-center>
                                <v-flex grow>
                                    <v-pagination :length="$store.state.frigateConfigurationsPageCount" :total-visible="7"
                                        v-model="$store.state.frigateConfigurationsPageSync" color="cfPrimary" circle
                                    ></v-pagination>
                                </v-flex>
                                <v-flex xs12 sm12 md4 lg3 xl3>
                                    <v-select v-model="$store.state.frigateConfigurationsItemsPerPage"
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
                            <span class="title">Your Corvette Configurations</span>
                        </v-expansion-panel-header>
                        <v-expansion-panel-content>
                            <v-layout wrap align-center>
                                <v-flex xs12 sm12 md5 lg5 xl4>
                                    <v-text-field v-model="$store.state.corvetteConfigurationsSearch"
                                        clearable outlined hide-details rounded dense
                                        prepend-icon="mdi-magnify" label="Search" color="cfPrimary"
                                    ></v-text-field>
                                </v-flex> 
                                <v-flex grow>
                                    <v-combobox v-model="$store.state.corvetteConfigurationsSortBy"
                                        flat outlined hide-details rounded dense clearable
                                        label="Sort by" color="cfPrimary" item-color="cfPrimary" item-text="text" item-value="value"
                                        :items="$store.state.corvetteConfigurationsSortOptions" :menu-props="{maxHeight: 600}"
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
                                    <v-btn-toggle rounded dense v-model="$store.state.corvetteConfigurationsSortDesc" mandatory>
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
                                    :items="filteredCorvetteConfigurations"
                                    :items-per-page.sync="$store.state.corvetteConfigurationsItemsPerPage"
                                    :page.sync="$store.state.corvetteConfigurationsPageSync"
                                    @page-count="$store.state.corvetteConfigurationsPageCount = $event"
                                    :search.sync="$store.state.corvetteConfigurationsSearch" class="rounded-table clickable-rows"
                                    :sort-by="$store.state.corvetteConfigurationsSortBy ? $store.state.corvetteConfigurationsSortBy.value : null"
                                    :sort-desc.sync="$store.state.corvetteConfigurationsSortDesc" dense loader-height="0"
                                    hide-default-footer :loading="corvetteConfigurationsLoading" :headers="$store.state.corvetteConfigurationsHeaders"
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
                                        <tr @click="$router.push({path: `${$router.history.current.path}/corvettes/${item.CorvetteConfigurationGuid}`});">
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
                                                <span class="subtitle-1" :style="`${item.disabled ? 'opacity: 0.5;' : ''}`">{{ item.CorvetteClass }}</span>
                                            </td>
                                            <td 
                                                :align="`${headers.find(h => h.value === 'CorvetteBaseVigorCost').align}`" 
                                                :style="headers.find(h => h.value === 'CorvetteBaseVigorCost').divider ? `${$vuetify.theme.dark ? 'border-right: 1px solid rgba(255,255,255,0.12)' : 'border-right: 1px solid rgba(0,0,0,0.12)'}` : ''"
                                            >
                                                <span class="subtitle-1" :style="`${item.disabled ? 'opacity: 0.5;' : ''}`">{{ item.CorvetteBaseVigorCost }}</span>
                                            </td>
                                            <td :align="`${headers.find(h => h.value === 'TotalModulePointsUsage').align}`"
                                                :style="headers.find(h => h.value === 'TotalModulePointsUsage').divider ? `${$vuetify.theme.dark ? 'border-right: 1px solid rgba(255,255,255,0.12)' : 'border-right: 1px solid rgba(0,0,0,0.12)'}` : ''"
                                            >
                                                <!-- <span class="subtitle-1" :style="`${item.disabled ? 'opacity: 0.5;' : ''}`">{{`${item.TotalModulePointsUsage}/${item.CorvetteModulePointLimit}`}}</span> -->
                                                <v-chip :style="`${item.disabled ? 'opacity: 0.5;' : ''}`"
                                                    class="font-weight-bold" small
                                                >
                                                    {{`${item.TotalModulePointsUsage}/${item.CorvetteModulePointLimit}`}}
                                                </v-chip>
                                            </td>
                                            <td :align="`${headers.find(h => h.value === 'CorvetteHullMass').align}`"
                                                :style="headers.find(h => h.value === 'CorvetteHullMass').divider ? `${$vuetify.theme.dark ? 'border-right: 1px solid rgba(255,255,255,0.12)' : 'border-right: 1px solid rgba(0,0,0,0.12)'}` : ''"
                                            >
                                                <span class="subtitle-1" :style="`${item.disabled ? 'opacity: 0.5;' : ''}`">{{ item.CorvetteHullMass | decimal }}</span>
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
                                            <td :align="`${headers.find(h => h.value === 'CorvetteDescription').align}`"
                                                :style="headers.find(h => h.value === 'CorvetteDescription').divider ? `${$vuetify.theme.dark ? 'border-right: 1px solid rgba(255,255,255,0.12)' : 'border-right: 1px solid rgba(0,0,0,0.12)'}` : ''"
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
                                                                                {{ item.CorvetteClass }} Class
                                                                            </v-chip>
                                                                        </template>
                                                                        <corvette-overview
                                                                            :corvette="item.Corvette"
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
                                    <template v-slot:[`header.CorvetteBaseVigorCost`]="{ header }">
                                        <v-tooltip top max-width="300" color="black" open-delay="700" content-class="rounded-xl">
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-icon v-for="(icon, index) in header.icons" :key="index" :color="icon.iconColor" :size="icon.size" :class="icon.cssClass" v-on="on" v-bind="attrs">{{icon.icon}}</v-icon>
                                            </template>
                                            <span class="subtitle-1">{{header.description}}</span>
                                        </v-tooltip>
                                    </template>
                                    <template v-slot:[`header.CorvetteHullMass`]="{ header }">
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
                                    <template v-slot:[`header.CorvetteDescription`]="{  }">
                                    </template>
                                </v-data-table>
                            </v-card>
                            <v-data-iterator v-else
                                :items="filteredCorvetteConfigurations"
                                :items-per-page.sync="$store.state.corvetteConfigurationsItemsPerPage"
                                :page.sync="$store.state.corvetteConfigurationsPageSync"
                                @page-count="$store.state.corvetteConfigurationsPageCount = $event"
                                :search="$store.state.corvetteConfigurationsSearch" class="mt-2 mb-2"
                                :sort-by="$store.state.corvetteConfigurationsSortBy ? $store.state.corvetteConfigurationsSortBy.value : null"
                                :sort-desc="$store.state.corvetteConfigurationsSortDesc"
                                hide-default-footer
                            >
                                <template v-slot:default="props">
                                    <v-layout wrap>
                                        <v-flex xs12 sm12 md6 lg6 xl4 v-for="(corvetteConfiguration, i) in props.items" :key="i">
                                            <corvette-configuration-overview class="fill-height"
                                                :corvetteConfiguration="corvetteConfiguration"
                                            ></corvette-configuration-overview>
                                        </v-flex>
                                    </v-layout>
                                </template>
                            </v-data-iterator>
                            <v-layout wrap align-center>
                                <v-flex grow>
                                    <v-pagination :length="$store.state.corvetteConfigurationsPageCount" :total-visible="7"
                                        v-model="$store.state.corvetteConfigurationsPageSync" color="cfPrimary" circle
                                    ></v-pagination>
                                </v-flex>
                                <v-flex xs12 sm12 md4 lg3 xl3>
                                    <v-select v-model="$store.state.corvetteConfigurationsItemsPerPage"
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
                            <span class="title">Your Fighter Configurations</span>
                        </v-expansion-panel-header>
                        <v-expansion-panel-content>
                            <v-layout wrap align-center>
                                <v-flex xs12 sm12 md5 lg5 xl4>
                                    <v-text-field v-model="$store.state.fighterConfigurationsSearch"
                                        clearable outlined hide-details rounded dense
                                        prepend-icon="mdi-magnify" label="Search" color="cfPrimary"
                                    ></v-text-field>
                                </v-flex> 
                                <v-flex grow>
                                    <v-combobox v-model="$store.state.fighterConfigurationsSortBy"
                                        flat outlined hide-details rounded dense clearable
                                        label="Sort by" color="cfPrimary" item-color="cfPrimary" item-text="text" item-value="value"
                                        :items="$store.state.fighterConfigurationsSortOptions" :menu-props="{maxHeight: 600}"
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
                                    <v-btn-toggle rounded dense v-model="$store.state.fighterConfigurationsSortDesc" mandatory>
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
                                    :items="filteredFighterConfigurations"
                                    :items-per-page.sync="$store.state.fighterConfigurationsItemsPerPage"
                                    :page.sync="$store.state.fighterConfigurationsPageSync"
                                    @page-count="$store.state.fighterConfigurationsPageCount = $event"
                                    :search.sync="$store.state.fighterConfigurationsSearch" class="rounded-table clickable-rows"
                                    :sort-by="$store.state.fighterConfigurationsSortBy ? $store.state.fighterConfigurationsSortBy.value : null"
                                    :sort-desc.sync="$store.state.fighterConfigurationsSortDesc" dense loader-height="0"
                                    hide-default-footer :loading="fighterConfigurationsLoading" :headers="$store.state.fighterConfigurationsHeaders"
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
                                        <tr @click="$router.push({path: `${$router.history.current.path}/fighters/${item.FighterConfigurationGuid}`});">
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
                                                <span class="subtitle-1" :style="`${item.disabled ? 'opacity: 0.5;' : ''}`">{{ item.FighterClass }}</span>
                                            </td>
                                            <td 
                                                :align="`${headers.find(h => h.value === 'FighterBaseVigorCost').align}`" 
                                                :style="headers.find(h => h.value === 'FighterBaseVigorCost').divider ? `${$vuetify.theme.dark ? 'border-right: 1px solid rgba(255,255,255,0.12)' : 'border-right: 1px solid rgba(0,0,0,0.12)'}` : ''"
                                            >
                                                <span class="subtitle-1" :style="`${item.disabled ? 'opacity: 0.5;' : ''}`">{{ item.FighterBaseVigorCost }}</span>
                                            </td>
                                            <td :align="`${headers.find(h => h.value === 'TotalModulePointsUsage').align}`"
                                                :style="headers.find(h => h.value === 'TotalModulePointsUsage').divider ? `${$vuetify.theme.dark ? 'border-right: 1px solid rgba(255,255,255,0.12)' : 'border-right: 1px solid rgba(0,0,0,0.12)'}` : ''"
                                            >
                                                <!-- <span class="subtitle-1" :style="`${item.disabled ? 'opacity: 0.5;' : ''}`">{{`${item.TotalModulePointsUsage}/${item.FighterModulePointLimit}`}}</span> -->
                                                <v-chip :style="`${item.disabled ? 'opacity: 0.5;' : ''}`"
                                                    class="font-weight-bold" small
                                                >
                                                    {{`${item.TotalModulePointsUsage}/${item.FighterModulePointLimit}`}}
                                                </v-chip>
                                            </td>
                                            <td :align="`${headers.find(h => h.value === 'FighterHullMass').align}`"
                                                :style="headers.find(h => h.value === 'FighterHullMass').divider ? `${$vuetify.theme.dark ? 'border-right: 1px solid rgba(255,255,255,0.12)' : 'border-right: 1px solid rgba(0,0,0,0.12)'}` : ''"
                                            >
                                                <span class="subtitle-1" :style="`${item.disabled ? 'opacity: 0.5;' : ''}`">{{ item.FighterHullMass | decimal }}</span>
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
                                            <td :align="`${headers.find(h => h.value === 'FighterDescription').align}`"
                                                :style="headers.find(h => h.value === 'FighterDescription').divider ? `${$vuetify.theme.dark ? 'border-right: 1px solid rgba(255,255,255,0.12)' : 'border-right: 1px solid rgba(0,0,0,0.12)'}` : ''"
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
                                                                                {{ item.FighterClass }} Class
                                                                            </v-chip>
                                                                        </template>
                                                                        <fighter-overview
                                                                            :fighter="item.Fighter"
                                                                            :allowClick="false"
                                                                        ></fighter-overview>
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
                                    <template v-slot:[`header.FighterBaseVigorCost`]="{ header }">
                                        <v-tooltip top max-width="300" color="black" open-delay="700" content-class="rounded-xl">
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-icon v-for="(icon, index) in header.icons" :key="index" :color="icon.iconColor" :size="icon.size" :class="icon.cssClass" v-on="on" v-bind="attrs">{{icon.icon}}</v-icon>
                                            </template>
                                            <span class="subtitle-1">{{header.description}}</span>
                                        </v-tooltip>
                                    </template>
                                    <template v-slot:[`header.FighterHullMass`]="{ header }">
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
                                    <template v-slot:[`header.FighterDescription`]="{  }">
                                    </template>
                                </v-data-table>
                            </v-card>
                            <v-data-iterator v-else
                                :items="filteredFighterConfigurations"
                                :items-per-page.sync="$store.state.fighterConfigurationsItemsPerPage"
                                :page.sync="$store.state.fighterConfigurationsPageSync"
                                @page-count="$store.state.fighterConfigurationsPageCount = $event"
                                :search="$store.state.fighterConfigurationsSearch" class="mt-2 mb-2"
                                :sort-by="$store.state.fighterConfigurationsSortBy ? $store.state.fighterConfigurationsSortBy.value : null"
                                :sort-desc="$store.state.fighterConfigurationsSortDesc"
                                hide-default-footer
                            >
                                <template v-slot:default="props">
                                    <v-layout wrap>
                                        <v-flex xs12 sm12 md6 lg6 xl4 v-for="(fighterConfiguration, i) in props.items" :key="i">
                                            <fighter-configuration-overview class="fill-height"
                                                :fighterConfiguration="fighterConfiguration"
                                            ></fighter-configuration-overview>
                                        </v-flex>
                                    </v-layout>
                                </template>
                            </v-data-iterator>
                            <v-layout wrap align-center>
                                <v-flex grow>
                                    <v-pagination :length="$store.state.fighterConfigurationsPageCount" :total-visible="7"
                                        v-model="$store.state.fighterConfigurationsPageSync" color="cfPrimary" circle
                                    ></v-pagination>
                                </v-flex>
                                <v-flex xs12 sm12 md4 lg3 xl3>
                                    <v-select v-model="$store.state.fighterConfigurationsItemsPerPage"
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
import { BattlecruiserConfigurationRepository, CarrierConfigurationRepository, CorvetteConfigurationRepository, DestroyerConfigurationRepository, FighterConfigurationRepository, FrigateConfigurationRepository } from '../../repositories';
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
    name: 'UserFleetList',

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

    created() {
        this.getUserBattlecruiserConfigurations();
        this.getUserCarrierConfigurations();
        this.getUserDestroyerConfigurations();
        this.getUserFrigateConfigurations();
        this.getUserCorvetteConfigurations();
        this.getUserFighterConfigurations();
    },

    mounted() {
        
    },
    methods: {
        getUserBattlecruiserConfigurations() {
            this.$store.state.isLoading = true;
            this.battlecruiserConfigurationsLoading = true;
            this.battlecruiserConfigurationRepository.getUserBattlecruiserConfigurations()
                .then((apiResponse) => {
                    console.log('apiResponse', apiResponse);
                    var responses = apiResponse.data;
                    for (var i = 0; i < responses.length; i++) {
                        this.battlecruiserConfigurations.push(new BattlecruiserConfigurationModel(responses[i]));
                    }
                    this.$store.state.isLoading = false;
                    this.battlecruiserConfigurationsLoading = false;
                })
                .catch((apiError) => {
                    console.error(apiError)
                    this.$emit('show-snackbar', {
                        message: 'Failed to get your Battlecruiser Configurations. Please try again later',
                        color: 'red',
                        show: true
                    });
                    this.$store.state.isLoading = false;
                    this.battlecruiserConfigurationsLoading = false;
                })
        },
        getUserCarrierConfigurations() {
            this.$store.state.isLoading = true;
            this.carrierConfigurationsLoading = true;
            this.carrierConfigurationRepository.getUserCarrierConfigurations()
                .then((apiResponse) => {
                    console.log('apiResponse', apiResponse);
                    var responses = apiResponse.data;
                    for (var i = 0; i < responses.length; i++) {
                        this.carrierConfigurations.push(new CarrierConfigurationModel(responses[i]));
                    }
                    this.$store.state.isLoading = false;
                    this.carrierConfigurationsLoading = false;
                })
                .catch((apiError) => {
                    console.error(apiError)
                    this.$emit('show-snackbar', {
                        message: 'Failed to get your Carrier Configurations. Please try again later',
                        color: 'red',
                        show: true
                    });
                    this.$store.state.isLoading = false;
                    this.carrierConfigurationsLoading = false;
                })
        },
        getUserDestroyerConfigurations() {
            this.$store.state.isLoading = true;
            this.destroyerConfigurationsLoading = true;
            this.destroyerConfigurationRepository.getUserDestroyerConfigurations()
                .then((apiResponse) => {
                    console.log('apiResponse', apiResponse);
                    var responses = apiResponse.data;
                    for (var i = 0; i < responses.length; i++) {
                        this.destroyerConfigurations.push(new DestroyerConfigurationModel(responses[i]));
                    }
                    this.$store.state.isLoading = false;
                    this.destroyerConfigurationsLoading = false;
                })
                .catch((apiError) => {
                    console.error(apiError)
                    this.$emit('show-snackbar', {
                        message: 'Failed to get your Destroyer Configurations. Please try again later',
                        color: 'red',
                        show: true
                    });
                    this.$store.state.isLoading = false;
                    this.destroyerConfigurationsLoading = false;
                })
        },
        getUserFrigateConfigurations() {
            this.$store.state.isLoading = true;
            this.frigateConfigurationsLoading = true;
            this.frigateConfigurationRepository.getUserFrigateConfigurations()
                .then((apiResponse) => {
                    console.log('apiResponse', apiResponse);
                    var responses = apiResponse.data;
                    for (var i = 0; i < responses.length; i++) {
                        this.frigateConfigurations.push(new FrigateConfigurationModel(responses[i]));
                    }
                    this.$store.state.isLoading = false;
                    this.frigateConfigurationsLoading = false;
                })
                .catch((apiError) => {
                    console.error(apiError)
                    this.$emit('show-snackbar', {
                        message: 'Failed to get your Frigate Configurations. Please try again later',
                        color: 'red',
                        show: true
                    });
                    this.$store.state.isLoading = false;
                    this.frigateConfigurationsLoading = false;
                })
        },
        getUserCorvetteConfigurations() {
            this.$store.state.isLoading = true;
            this.corvetteConfigurationsLoading = true;
            this.corvetteConfigurationRepository.getUserCorvetteConfigurations()
                .then((apiResponse) => {
                    console.log('apiResponse', apiResponse);
                    var responses = apiResponse.data;
                    for (var i = 0; i < responses.length; i++) {
                        this.corvetteConfigurations.push(new CorvetteConfigurationModel(responses[i]));
                    }
                    this.$store.state.isLoading = false;
                    this.corvetteConfigurationsLoading = false;
                })
                .catch((apiError) => {
                    console.error(apiError)
                    this.$emit('show-snackbar', {
                        message: 'Failed to get your Corvette Configurations. Please try again later',
                        color: 'red',
                        show: true
                    });
                    this.$store.state.isLoading = false;
                    this.corvetteConfigurationsLoading = false;
                })
        },
        getUserFighterConfigurations() {
            this.$store.state.isLoading = true;
            this.fighterConfigurationsLoading = true;
            this.fighterConfigurationRepository.getUserFighterConfigurations()
                .then((apiResponse) => {
                    console.log('apiResponse', apiResponse);
                    var responses = apiResponse.data;
                    for (var i = 0; i < responses.length; i++) {
                        this.fighterConfigurations.push(new FighterConfigurationModel(responses[i]));
                    }
                    this.$store.state.isLoading = false;
                    this.fighterConfigurationsLoading = false;
                })
                .catch((apiError) => {
                    console.error(apiError)
                    this.$emit('show-snackbar', {
                        message: 'Failed to get your Fighter Configurations. Please try again later',
                        color: 'red',
                        show: true
                    });
                    this.$store.state.isLoading = false;
                    this.fighterConfigurationsLoading = false;
                })
        },
        createUserFleet() {
            if (this.newFleet.Name !== '') {
                this.fleetRepository.createUserFleet(this.newFleet)
                    .then((apiResponse) => {
                        console.log('apiResponse', apiResponse);
                        this.newFleetMode = !this.newFleetMode;
                        this.getUserFleets();
                    })
                    .catch((apiError) => {
                        console.error(apiError)
                        this.$emit('show-snackbar', {
                            message: 'Failed to add a new fleet. Please try again later',
                            color: 'red',
                            show: true
                        });
                    })
            }
        },
    },
    data: () => ({
        battlecruiserConfigurationRepository: new BattlecruiserConfigurationRepository(),
        carrierConfigurationRepository: new CarrierConfigurationRepository(),
        destroyerConfigurationRepository: new DestroyerConfigurationRepository(),
        frigateConfigurationRepository: new FrigateConfigurationRepository(),
        corvetteConfigurationRepository: new CorvetteConfigurationRepository(),
        fighterConfigurationRepository: new FighterConfigurationRepository(),
        usersRepository: new UsersRepository(),

        newFleetMode: false,
        battlecruiserConfigurations: [],
        battlecruiserConfigurationsLoading: false,
        carrierConfigurations: [],
        carrierConfigurationsLoading: false,
        destroyerConfigurations: [],
        destroyerConfigurationsLoading: false,
        frigateConfigurations: [],
        frigateConfigurationsLoading: false,
        corvetteConfigurations: [],
        corvetteConfigurationsLoading: false,
        fighterConfigurations: [],
        fighterConfigurationsLoading: false,
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
    }
}
</script>