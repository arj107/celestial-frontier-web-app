import Vue from "vue";
import Vuex from "vuex";
import { User } from "../models/User";
import { decode } from "jsonwebtoken";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    isAuthenticated: false,
    isLoading: false,
    user: new User(),
    validationRules: {
      required: (value) => !!value || "This field is required.",
      upTo50Chars: (value) =>
        (value || "").length <= 50 || "Max of 50 characteres allowed.",
      email: (value) => {
        const pattern =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || "Invalid e-mail.";
      },
    },

    // CONFIGURATIONS
    selectedConfigurationPanel: [],
    configurationsCondensedView: true,
    configurationsTargetManeuverability: 0.1,
    configurationsTargetArmorKineticResistance: 0.5,
    configurationsTargetArmorEnergyResistance: 0.5,
    configurationsWeaponModelChartsHeight: 250,
    configurationsWeaponDamageChartsHeight: 250,
    configurationsShowWeaponModelCharts: true,
    configurationsShowWeaponDamageCharts: true,
    itemsPerPageOptions: [
        {
            text: "3",
            value: 3,
        },
        {
            text: "6",
            value: 6,
        },
        {
            text: "12",
            value: 12,
        },
        {
            text: "18",
            value: 18,
        },
        {
            text: "All",
            value: -1,
        },
    ],

    editingBattlecruiserConfiguration: null,
    battlecruiserConfigurationSelectedComponentPanels: [],
    battlecruiserConfigurationStatsPinned: false,
    battlecruiserConfigurationWeaponChartsPinned: false,
    battlecruiserConfigurationsSortOptions: [
        {
            text: "None",
            value: "",
            icons: [],
        },
        {
            text: "Name",
            value: "Name",
            icons: [],
        },
        {
            text: "Class",
            value: "BattlecruiserClass",
            icons: [],
        },
        {
            text: "Module Points Usage",
            value: "TotalModulePointsUsage",
            icons: [],
        },
        {
            text: "Module Point Limit",
            value: "BattlecruiserModulePointLimit",
            icons: [],
        },
        {
            text: "Hull Mass",
            value: "HullMass",
            icons: [
                {
                    icon: "mdi-weight",
                    size: null,
                    iconColor: null,
                    cssClass: null
                },
            ],
        },
        {
            text: "Total Mass",
            value: "TotalMass",
            icons: [
                {
                    icon: "mdi-weight",
                    size: null,
                    iconColor: null,
                    cssClass: null
                },
            ],
        },
        {
            text: "Total Crew Cost",
            value: "TotalCrewCost",
            icons: [
                {
                    icon: "mdi-account-group",
                    size: null,
                    iconColor: "light-blue",
                    cssClass: null
                },
            ],
        },
        {
            text: "Total Heat Capacity",
            value: "TotalHeatCapacity",
            icons: [
                {
                    icon: "mdi-thermometer-alert",
                    size: null,
                    iconColor: "red",
                    cssClass: null
                },
            ],
        },
        {
            text: "Maneuverability",
            value: "Maneuverability",
            icons: [
                {
                    icon: "mdi-weather-windy",
                    size: null,
                    iconColor: "green",
                    cssClass: null
                },
            ],
        },
        {
            text: "Fuel Consumption Rate",
            value: "FuelSystemFuelConsumptionRate",
            icons: [
                {
                    order: 0,
                    icon: "mdi-minus-thick",
                    size: "x-small",
                    iconColor: "red",
                    cssClass: null
                },
                {
                    order: 1,
                    icon: "mdi-fire",
                    size: null,
                    iconColor: "orange",
                    cssClass: null
                },
                {
                    order: 2,
                    icon: "mdi-slash-forward",
                    size: "small",
                    iconColor: null,
                    cssClass: null
                },
                {
                    order: 3,
                    icon: "mdi-hexagon-outline",
                    size: null,
                    iconColor: null,
                    cssClass: null
                },
            ],
        },
        {
            text: "Fuel Capacity",
            value: "FuelSystemFuelCapacity",
            icons: [
                {
                    icon: "mdi-fuel",
                    size: null,
                    iconColor: "orange",
                    cssClass: null
                },
            ],
        },
        {
            text: "Fuel Regeneration Rate",
            value: "FuelSystemFuelRegenerationRate",
            icons: [
                {
                    order: 0,
                    icon: "mdi-plus-thick",
                    size: "x-small",
                    iconColor: "green",
                    cssClass: null
                },
                {
                    order: 1,
                    icon: "mdi-fire",
                    size: null,
                    iconColor: "orange",
                    cssClass: null
                },
                {
                    order: 2,
                    icon: "mdi-slash-forward",
                    size: "small",
                    iconColor: null,
                    cssClass: null
                },
                {
                    order: 3,
                    icon: "mdi-arrow-u-down-right",
                    size: null,
                    iconColor: null,
                    cssClass: null
                },
            ],
        },
    ],
    battlecruiserConfigurationsHeaders: [
        {
            text: "Name",
            value: "Name",
            description: null,
            align: 'left',
            width: 200,
            icons: [],
            divider: true,
            sortable: false,
        },
        {
            text: "Class",
            value: "Class",
            description: "Class describes the model/design of the hull.",
            align: 'left',
            width: 0,
            icons: [],
            divider: true,
            sortable: false,
        },
        {
            text: "MPU/MPL",
            value: "TotalModulePointsUsage",
            description: "Total Module Points Usage describes how many module points of available capacity have been used.",
            align: 'center',
            width: 0,
            icons: [],
            divider: true,
            sortable: false,
        },
        {
            text: "Hull Mass",
            value: "BattlecruiserHullMass",
            description: "Hull Mass describes the overall mass of the Battlecruiser's Hull.",
            align: 'center',
            width: 0,
            icons: [
                {
                    icon: "mdi-weight",
                    size: null,
                    iconColor: null,
                    cssClass: null
                },
            ],
            divider: true,
            sortable: false,
        },
        {
            text: "Total Mass",
            value: "TotalMass",
            description: "Total Mass describes the mass of the Battlecruiser's hull plus the mass of all attached components.",
            align: 'center',
            width: 0,
            icons: [
                {
                    icon: "mdi-weight",
                    size: null,
                    iconColor: null,
                    cssClass: null
                },
            ],
            divider: true,
            sortable: false,
        },
        {
            text: "Total Crew Cost",
            value: "TotalCrewCost",
            description: "Total Crew describes the crew cost of the Battlecruiser plus the crew cost of all attached modules.",
            align: 'center',
            width: 0,
            icons: [
                {
                    icon: "mdi-account-group",
                    size: null,
                    iconColor: "light-blue",
                    cssClass: null
                },
            ],
            divider: true,
            sortable: false,
        },
        {
            text: "Total Heat Capacity",
            value: "TotalHeatCapacity",
            description: "Total Heat Capacity describes the amount of heat units the entire ship can withstand before becomming overheated.",
            align: 'center',
            width: 0,
            icons: [
                {
                    icon: "mdi-thermometer-alert",
                    size: null,
                    iconColor: "red",
                    cssClass: null
                },
            ],
            divider: true,
            sortable: false,
        },
        {
            text: "Maneuverability",
            value: "Maneuverability",
            description: "Maneuverability describes how quickly the entire ship can accelerate given its Total Mass and its Thruster's Thrust.",
            align: 'center',
            width: 0,
            icons: [
                {
                    icon: "mdi-weather-windy",
                    size: null,
                    iconColor: "green",
                    cssClass: null
                },
            ],
            divider: true,
            sortable: false,
        },
        {
            text: "Fuel Consumption Rate",
            value: "FuelSystemFuelConsumptionRate",
            description: "Fuel Consumption Rate describes how much fuel it costs for the ship to move 1 tile.",
            align: 'center',
            width: 0,
            icons: [
                {
                    order: 0,
                    icon: "mdi-minus-thick",
                    size: "x-small",
                    iconColor: "red",
                    cssClass: null
                },
                {
                    order: 3,
                    icon: "mdi-hexagon-outline",
                    size: null,
                    iconColor: null,
                    cssClass: null
                },
                {
                    order: 2,
                    icon: "mdi-slash-forward",
                    size: "small",
                    iconColor: null,
                    cssClass: null
                },
                {
                    order: 1,
                    icon: "mdi-fire",
                    size: null,
                    iconColor: "orange",
                    cssClass: null
                },
            ],
            divider: true,
            sortable: false,
        },
        {
            text: "Fuel Capacity",
            value: "FuelSystemFuelCapacity",
            description: "Fuel Capacity describes the maximimum amount of fuel the ship's Fuel System can contian.",
            align: 'center',
            width: 0,
            icons: [
                {
                    icon: "mdi-fuel",
                    size: null,
                    iconColor: "orange",
                    cssClass: null
                },
            ],
            divider: true,
            sortable: false,
        },
        {
            text: "Fuel Regeneration Rate",
            value: "FuelSystemFuelRegenerationRate",
            description: "Fuel Regeneration Rate describes how much fuel the ship's Fuel System restores per turn.",
            align: 'center',
            width: 0,
            icons: [
                {
                    order: 0,
                    icon: "mdi-plus-thick",
                    size: "x-small",
                    iconColor: "green",
                    cssClass: null
                },
                {
                    order: 3,
                    icon: "mdi-arrow-u-down-right",
                    size: null,
                    iconColor: null,
                    cssClass: null
                },
                {
                    order: 2,
                    icon: "mdi-slash-forward",
                    size: "small",
                    iconColor: null,
                    cssClass: null
                },
                {
                    order: 1,
                    icon: "mdi-fire",
                    size: null,
                    iconColor: "orange",
                    cssClass: null
                },
            ],
            divider: true,
            sortable: false,
        },
        {
            text: "Description",
            value: "BattlecruiserDescription",
            description: null,
            align: 'center',
            width: 0,
            icons: [
                {
                    icon: null,
                    size: null,
                    iconColor: null,
                    cssClass: null
                },
            ],
            divider: false,
            sortable: false,
        },
    ],
    battlecruiserConfigurationsSelectedComponentPanel: null,
    battlecruiserConfigurationsItemsPerPage: 6,
    battlecruiserConfigurationsPageSync: 1,
    battlecruiserConfigurationsPageCount: 1,
    battlecruiserConfigurationsSearch: "",
    battlecruiserConfigurationsSortBy: "",
    battlecruiserConfigurationsSortDesc: true,
    battlecruisersShowOnlyFeasible: false,
    battlecruisersSortOptions: [
        {
            text: "None",
            value: "",
            icons: [],
        },
        {
            text: "Class",
            value: "Class",
            icons: [],
        },
        {
            text: "Module Point Limit",
            value: "ModulePointLimit",
            icons: [],
        },
        {
            text: "Hull Mass",
            value: "HullMass",
            icons: [
                {
                    icon: "mdi-weight",
                    size: null,
                    iconColor: null,
                    cssClass: null
                },
            ],
        },
        {
            text: "Crew Cost",
            value: "BaseCrewCost",
            icons: [
                {
                    icon: "mdi-account-group",
                    size: null,
                    iconColor: "light-blue",
                    cssClass: null
                },
            ],
        },
        {
            text: "Heat Capacity",
            value: "HeatCapacity",
            icons: [
                {
                    icon: "mdi-thermometer-alert",
                    size: null,
                    iconColor: "red",
                    cssClass: null
                },
            ],
        },
        {
            text: "Hull Health",
            value: "BaseHullHealth",
            icons: [
                {
                    icon: "mdi-heart",
                    size: null,
                    iconColor: "pink",
                    cssClass: null
                },
            ],
        },
        {
            text: "PDS Power Level",
            value: "PointDefenseSystemPowerLevelText",
            icons: [
                {
                    icon: "mdi-lightning-bolt",
                    size: null,
                    iconColor: "yellow",
                    cssClass: null
                },
            ],
        },
        {
            text: "Weapon Power Level",
            value: "WeaponPowerLevelText",
            icons: [
                {
                    icon: "mdi-lightning-bolt",
                    size: null,
                    iconColor: "yellow",
                    cssClass: null
                },
            ],
        },
    ],
    battlecruisersHeaders: [
        {
            text: "Class",
            value: "Class",
            description: "Class describes the model/design of the hull.",
            align: 'left',
            width: 0,
            icons: [],
            divider: true,
            sortable: false,
        },
        {
            text: "MP",
            value: "ModulePointLimit",
            description: "Module Point Limit describes the upper limit for the total module points cost for all equipped components.",
            align: 'center',
            width: 0,
            icons: [],
            divider: true,
            sortable: false,
        },
        {
            text: "Hull Mass",
            value: "HullMass",
            description: "Mass describes the overall mass of the Battlecruiser's Hull.",
            align: 'center',
            width: 0,
            icons: [
                {
                    icon: "mdi-weight",
                    size: null,
                    iconColor: null,
                    cssClass: null
                },
            ],
            divider: true,
            sortable: false,
        },
        {
            text: "Crew Cost",
            value: "BaseCrewCost",
            description: "Crew Cost describes the how much crew the Battlecruiser needs to operate.",
            align: 'center',
            width: 0,
            icons: [
                {
                    icon: "mdi-account-group",
                    size: null,
                    iconColor: "light-blue",
                    cssClass: null
                },
            ],
            divider: true,
            sortable: false,
        },
        {
            text: "Heat Capacity",
            value: "HeatCapacity",
            description: "Heat Capacity describes the amount of heat units the hull can withstand. It contributes to the Total Heat Capacity of the spaceship.",
            align: 'center',
            width: 0,
            icons: [
                {
                    icon: "mdi-thermometer-alert",
                    size: null,
                    iconColor: "red",
                    cssClass: null
                },
            ],
            divider: true,
            sortable: false,
        },
        {
            text: "Hull Health",
            value: "BaseHullHealth",
            description: "Hull Health describes how much total damage the Battlecruiser can take before it is destroyed.",
            align: 'center',
            width: 0,
            icons: [
                {
                    icon: "mdi-heart",
                    size: null,
                    iconColor: "pink",
                    cssClass: null
                },
            ],
            divider: true,
            sortable: false,
        },
        {
            text: "PDS",
            value: "PointDefenseSystemPowerLevelText",
            description: "PDS Power Level describes the maximum power level of PDS this hull is compatible with.",
            align: 'center',
            width: 0,
            icons: [
                {
                    icon: "mdi-lightning-bolt",
                    size: null,
                    iconColor: "yellow",
                    cssClass: null
                },
            ],
            divider: true,
            sortable: false,
        },
        {
            text: "Wpn",
            value: "WeaponPowerLevelText",
            description: "Weapon Power Level describes the maximum power level of Weapon Frame this hull is compatible with.",
            align: 'center',
            width: 0,
            icons: [
                {
                    icon: "mdi-lightning-bolt",
                    size: null,
                    iconColor: "yellow",
                    cssClass: null
                },
            ],
            divider: true,
            sortable: false,
        },
        {
            text: "Description",
            value: "Description",
            description: null,
            align: 'center',
            width: 0,
            icons: [
                {
                    icon: null,
                    size: null,
                    iconColor: null,
                    cssClass: null
                },
            ],
            divider: false,
            sortable: false,
        },
    ],
    battlecruisersItemsPerPage: 6,
    battlecruisersPageSync: 1,
    battlecruisersPageCount: 1,
    battlecruisersSearch: "",
    battlecruisersSortBy: "",
    battlecruisersSortDesc: true,

    
    editingDestroyerConfiguration: null,
    destroyerConfigurationSelectedComponentPanels: [],
    destroyerConfigurationStatsPinned: false,
    destroyerConfigurationWeaponChartsPinned: false,
    destroyerConfigurationsSortOptions: [
        {
            text: "None",
            value: "",
            icons: [],
        },
        {
            text: "Name",
            value: "Name",
            icons: [],
        },
        {
            text: "Class",
            value: "DestroyerClass",
            icons: [],
        },
        {
            text: "Vigor Cost",
            value: "DestroyerBaseVigorCost",
            icons: [
                {
                    icon: "mdi-triangle",
                    size: null,
                    iconColor: "orange darken-2",
                    cssClass: 'vigor-icon'
                },
            ],
        },
        {
            text: "Module Points Usage",
            value: "TotalModulePointsUsage",
            icons: [],
        },
        {
            text: "Module Point Limit",
            value: "DestroyerModulePointLimit",
            icons: [],
        },
        {
            text: "Hull Mass",
            value: "HullMass",
            icons: [
                {
                    icon: "mdi-weight",
                    size: null,
                    iconColor: null,
                    cssClass: null
                },
            ],
        },
        {
            text: "Total Mass",
            value: "TotalMass",
            icons: [
                {
                    icon: "mdi-weight",
                    size: null,
                    iconColor: null,
                    cssClass: null
                },
            ],
        },
        {
            text: "Total Crew Cost",
            value: "TotalCrewCost",
            icons: [
                {
                    icon: "mdi-account-group",
                    size: null,
                    iconColor: "light-blue",
                    cssClass: null
                },
            ],
        },
        {
            text: "Total Heat Capacity",
            value: "TotalHeatCapacity",
            icons: [
                {
                    icon: "mdi-thermometer-alert",
                    size: null,
                    iconColor: "red",
                    cssClass: null
                },
            ],
        },
        {
            text: "Maneuverability",
            value: "Maneuverability",
            icons: [
                {
                    icon: "mdi-weather-windy",
                    size: null,
                    iconColor: "green",
                    cssClass: null
                },
            ],
        },
        {
            text: "Fuel Consumption Rate",
            value: "FuelSystemFuelConsumptionRate",
            icons: [
                {
                    order: 0,
                    icon: "mdi-minus-thick",
                    size: "x-small",
                    iconColor: "red",
                    cssClass: null
                },
                {
                    order: 1,
                    icon: "mdi-fire",
                    size: null,
                    iconColor: "orange",
                    cssClass: null
                },
                {
                    order: 2,
                    icon: "mdi-slash-forward",
                    size: "small",
                    iconColor: null,
                    cssClass: null
                },
                {
                    order: 3,
                    icon: "mdi-hexagon-outline",
                    size: null,
                    iconColor: null,
                    cssClass: null
                },
            ],
        },
        {
            text: "Fuel Capacity",
            value: "FuelSystemFuelCapacity",
            icons: [
                {
                    icon: "mdi-fuel",
                    size: null,
                    iconColor: "orange",
                    cssClass: null
                },
            ],
        },
        {
            text: "Fuel Regeneration Rate",
            value: "FuelSystemFuelRegenerationRate",
            icons: [
                {
                    order: 0,
                    icon: "mdi-plus-thick",
                    size: "x-small",
                    iconColor: "green",
                    cssClass: null
                },
                {
                    order: 1,
                    icon: "mdi-fire",
                    size: null,
                    iconColor: "orange",
                    cssClass: null
                },
                {
                    order: 2,
                    icon: "mdi-slash-forward",
                    size: "small",
                    iconColor: null,
                    cssClass: null
                },
                {
                    order: 3,
                    icon: "mdi-arrow-u-down-right",
                    size: null,
                    iconColor: null,
                    cssClass: null
                },
            ],
        },
    ],
    destroyerConfigurationsHeaders: [
        {
            text: "Name",
            value: "Name",
            description: null,
            align: 'left',
            width: 200,
            icons: [],
            divider: true,
            sortable: false,
        },
        {
            text: "Class",
            value: "Class",
            description: "Class describes the model/design of the hull.",
            align: 'left',
            width: 0,
            icons: [],
            divider: true,
            sortable: false,
        },
        {
            text: "Vigor Cost",
            value: "DestroyerBaseVigorCost",
            description: "Vigor Cost describes the amout of Vigor required to deploy this spaceship into the battlefield.",
            align: 'center',
            width: 0,
            icons: [
                {
                    icon: "mdi-triangle",
                    size: null,
                    iconColor: "orange darken-2",
                    cssClass: 'vigor-icon'
                },
            ],
            divider: true,
            sortable: false,
        },
        {
            text: "MPU/MPL",
            value: "TotalModulePointsUsage",
            description: "Total Module Points Usage describes how many module points of available capacity have been used.",
            align: 'center',
            width: 0,
            icons: [],
            divider: true,
            sortable: false,
        },
        {
            text: "Hull Mass",
            value: "DestroyerHullMass",
            description: "Hull Mass describes the overall mass of the Destroyer's Hull.",
            align: 'center',
            width: 0,
            icons: [
                {
                    icon: "mdi-weight",
                    size: null,
                    iconColor: null,
                    cssClass: null
                },
            ],
            divider: true,
            sortable: false,
        },
        {
            text: "Total Mass",
            value: "TotalMass",
            description: "Total Mass describes the mass of the Destroyer's hull plus the mass of all attached components.",
            align: 'center',
            width: 0,
            icons: [
                {
                    icon: "mdi-weight",
                    size: null,
                    iconColor: null,
                    cssClass: null
                },
            ],
            divider: true,
            sortable: false,
        },
        {
            text: "Total Crew Cost",
            value: "TotalCrewCost",
            description: "Total Crew describes the crew cost of the Destroyer plus the crew cost of all attached modules.",
            align: 'center',
            width: 0,
            icons: [
                {
                    icon: "mdi-account-group",
                    size: null,
                    iconColor: "light-blue",
                    cssClass: null
                },
            ],
            divider: true,
            sortable: false,
        },
        {
            text: "Total Heat Capacity",
            value: "TotalHeatCapacity",
            description: "Total Heat Capacity describes the amount of heat units the entire ship can withstand before becomming overheated.",
            align: 'center',
            width: 0,
            icons: [
                {
                    icon: "mdi-thermometer-alert",
                    size: null,
                    iconColor: "red",
                    cssClass: null
                },
            ],
            divider: true,
            sortable: false,
        },
        {
            text: "Maneuverability",
            value: "Maneuverability",
            description: "Maneuverability describes how quickly the entire ship can accelerate given its Total Mass and its Thruster's Thrust.",
            align: 'center',
            width: 0,
            icons: [
                {
                    icon: "mdi-weather-windy",
                    size: null,
                    iconColor: "green",
                    cssClass: null
                },
            ],
            divider: true,
            sortable: false,
        },
        {
            text: "Fuel Consumption Rate",
            value: "FuelSystemFuelConsumptionRate",
            description: "Fuel Consumption Rate describes how much fuel it costs for the ship to move 1 tile.",
            align: 'center',
            width: 0,
            icons: [
                {
                    order: 0,
                    icon: "mdi-minus-thick",
                    size: "x-small",
                    iconColor: "red",
                    cssClass: null
                },
                {
                    order: 3,
                    icon: "mdi-hexagon-outline",
                    size: null,
                    iconColor: null,
                    cssClass: null
                },
                {
                    order: 2,
                    icon: "mdi-slash-forward",
                    size: "small",
                    iconColor: null,
                    cssClass: null
                },
                {
                    order: 1,
                    icon: "mdi-fire",
                    size: null,
                    iconColor: "orange",
                    cssClass: null
                },
            ],
            divider: true,
            sortable: false,
        },
        {
            text: "Fuel Capacity",
            value: "FuelSystemFuelCapacity",
            description: "Fuel Capacity describes the maximimum amount of fuel the ship's Fuel System can contian.",
            align: 'center',
            width: 0,
            icons: [
                {
                    icon: "mdi-fuel",
                    size: null,
                    iconColor: "orange",
                    cssClass: null
                },
            ],
            divider: true,
            sortable: false,
        },
        {
            text: "Fuel Regeneration Rate",
            value: "FuelSystemFuelRegenerationRate",
            description: "Fuel Regeneration Rate describes how much fuel the ship's Fuel System restores per turn.",
            align: 'center',
            width: 0,
            icons: [
                {
                    order: 0,
                    icon: "mdi-plus-thick",
                    size: "x-small",
                    iconColor: "green",
                    cssClass: null
                },
                {
                    order: 3,
                    icon: "mdi-arrow-u-down-right",
                    size: null,
                    iconColor: null,
                    cssClass: null
                },
                {
                    order: 2,
                    icon: "mdi-slash-forward",
                    size: "small",
                    iconColor: null,
                    cssClass: null
                },
                {
                    order: 1,
                    icon: "mdi-fire",
                    size: null,
                    iconColor: "orange",
                    cssClass: null
                },
            ],
            divider: true,
            sortable: false,
        },
        {
            text: "Description",
            value: "DestroyerDescription",
            description: null,
            align: 'center',
            width: 0,
            icons: [
                {
                    icon: null,
                    size: null,
                    iconColor: null,
                    cssClass: null
                },
            ],
            divider: false,
            sortable: false,
        },
    ],
    destroyerConfigurationsSelectedComponentPanel: null,
    destroyerConfigurationsItemsPerPage: 6,
    destroyerConfigurationsPageSync: 1,
    destroyerConfigurationsPageCount: 1,
    destroyerConfigurationsSearch: "",
    destroyerConfigurationsSortBy: "",
    destroyerConfigurationsSortDesc: true,
    destroyersShowOnlyFeasible: false,
    destroyersSortOptions: [
        {
            text: "None",
            value: "",
            icons: [],
        },
        {
            text: "Class",
            value: "Class",
            icons: [],
        },
        {
            text: "Vigor Cost",
            value: "BaseVigorCost",
            icons: [
                {
                    icon: "mdi-triangle",
                    size: null,
                    iconColor: "orange darken-2",
                    cssClass: 'vigor-icon'
                },
            ],
        },
        {
            text: "Module Point Limit",
            value: "ModulePointLimit",
            icons: [],
        },
        {
            text: "Hull Mass",
            value: "HullMass",
            icons: [
                {
                    icon: "mdi-weight",
                    size: null,
                    iconColor: null,
                    cssClass: null
                },
            ],
        },
        {
            text: "Crew Cost",
            value: "BaseCrewCost",
            icons: [
                {
                    icon: "mdi-account-group",
                    size: null,
                    iconColor: "light-blue",
                    cssClass: null
                },
            ],
        },
        {
            text: "Heat Capacity",
            value: "HeatCapacity",
            icons: [
                {
                    icon: "mdi-thermometer-alert",
                    size: null,
                    iconColor: "red",
                    cssClass: null
                },
            ],
        },
        {
            text: "Hull Health",
            value: "BaseHullHealth",
            icons: [
                {
                    icon: "mdi-heart",
                    size: null,
                    iconColor: "pink",
                    cssClass: null
                },
            ],
        },
        {
            text: "PDS Power Level",
            value: "PointDefenseSystemPowerLevelText",
            icons: [
                {
                    icon: "mdi-lightning-bolt",
                    size: null,
                    iconColor: "yellow",
                    cssClass: null
                },
            ],
        },
        {
            text: "Weapon Power Level",
            value: "WeaponPowerLevelText",
            icons: [
                {
                    icon: "mdi-lightning-bolt",
                    size: null,
                    iconColor: "yellow",
                    cssClass: null
                },
            ],
        },
    ],
    destroyersHeaders: [
        {
            text: "Class",
            value: "Class",
            description: "Class describes the model/design of the hull.",
            align: 'left',
            width: 0,
            icons: [],
            divider: true,
            sortable: false,
        },
        {
            text: "Vigor Cost",
            value: "BaseVigorCost",
            description: "Vigor Cost describes the amout of Vigor required to deploy this spaceship into the battlefield.",
            align: 'center',
            width: 0,
            icons: [
                {
                    icon: "mdi-triangle",
                    size: null,
                    iconColor: "orange darken-2",
                    cssClass: 'vigor-icon'
                },
            ],
            divider: true,
            sortable: false,
        },
        {
            text: "MP",
            value: "ModulePointLimit",
            description: "Module Point Limit describes the upper limit for the total module points cost for all equipped components.",
            align: 'center',
            width: 0,
            icons: [],
            divider: true,
            sortable: false,
        },
        {
            text: "Hull Mass",
            value: "HullMass",
            description: "Mass describes the overall mass of the Destroyer's Hull.",
            align: 'center',
            width: 0,
            icons: [
                {
                    icon: "mdi-weight",
                    size: null,
                    iconColor: null,
                    cssClass: null
                },
            ],
            divider: true,
            sortable: false,
        },
        {
            text: "Crew Cost",
            value: "BaseCrewCost",
            description: "Crew Cost describes the how much crew the Destroyer needs to operate.",
            align: 'center',
            width: 0,
            icons: [
                {
                    icon: "mdi-account-group",
                    size: null,
                    iconColor: "light-blue",
                    cssClass: null
                },
            ],
            divider: true,
            sortable: false,
        },
        {
            text: "Heat Capacity",
            value: "HeatCapacity",
            description: "Heat Capacity describes the amount of heat units the hull can withstand. It contributes to the Total Heat Capacity of the spaceship.",
            align: 'center',
            width: 0,
            icons: [
                {
                    icon: "mdi-thermometer-alert",
                    size: null,
                    iconColor: "red",
                    cssClass: null
                },
            ],
            divider: true,
            sortable: false,
        },
        {
            text: "Hull Health",
            value: "BaseHullHealth",
            description: "Hull Health describes how much total damage the Destroyer can take before it is destroyed.",
            align: 'center',
            width: 0,
            icons: [
                {
                    icon: "mdi-heart",
                    size: null,
                    iconColor: "pink",
                    cssClass: null
                },
            ],
            divider: true,
            sortable: false,
        },
        {
            text: "PDS",
            value: "PointDefenseSystemPowerLevelText",
            description: "PDS Power Level describes the maximum power level of PDS this hull is compatible with.",
            align: 'center',
            width: 0,
            icons: [
                {
                    icon: "mdi-lightning-bolt",
                    size: null,
                    iconColor: "yellow",
                    cssClass: null
                },
            ],
            divider: true,
            sortable: false,
        },
        {
            text: "Wpn",
            value: "WeaponPowerLevelText",
            description: "Weapon Power Level describes the maximum power level of Weapon Frame this hull is compatible with.",
            align: 'center',
            width: 0,
            icons: [
                {
                    icon: "mdi-lightning-bolt",
                    size: null,
                    iconColor: "yellow",
                    cssClass: null
                },
            ],
            divider: true,
            sortable: false,
        },
        {
            text: "Description",
            value: "Description",
            description: null,
            align: 'center',
            width: 0,
            icons: [
                {
                    icon: null,
                    size: null,
                    iconColor: null,
                    cssClass: null
                },
            ],
            divider: false,
            sortable: false,
        },
    ],
    destroyersItemsPerPage: 6,
    destroyersPageSync: 1,
    destroyersPageCount: 1,
    destroyersSearch: "",
    destroyersSortBy: "",
    destroyersSortDesc: true,


    editingFrigateConfiguration: null,
    frigateConfigurationSelectedComponentPanels: [],
    frigateConfigurationStatsPinned: false,
    frigateConfigurationWeaponChartsPinned: false,
    frigateConfigurationsSortOptions: [
        {
            text: "None",
            value: "",
            icons: [],
        },
        {
            text: "Name",
            value: "Name",
            icons: [],
        },
        {
            text: "Class",
            value: "FrigateClass",
            icons: [],
        },
        {
            text: "Vigor Cost",
            value: "FrigateBaseVigorCost",
            icons: [
                {
                    icon: "mdi-triangle",
                    size: null,
                    iconColor: "orange darken-2",
                    cssClass: 'vigor-icon'
                },
            ],
        },
        {
            text: "Module Points Usage",
            value: "TotalModulePointsUsage",
            icons: [],
        },
        {
            text: "Module Point Limit",
            value: "FrigateModulePointLimit",
            icons: [],
        },
        {
            text: "Hull Mass",
            value: "HullMass",
            icons: [
                {
                    icon: "mdi-weight",
                    size: null,
                    iconColor: null,
                    cssClass: null
                },
            ],
        },
        {
            text: "Total Mass",
            value: "TotalMass",
            icons: [
                {
                    icon: "mdi-weight",
                    size: null,
                    iconColor: null,
                    cssClass: null
                },
            ],
        },
        {
            text: "Total Crew Cost",
            value: "TotalCrewCost",
            icons: [
                {
                    icon: "mdi-account-group",
                    size: null,
                    iconColor: "light-blue",
                    cssClass: null
                },
            ],
        },
        {
            text: "Total Heat Capacity",
            value: "TotalHeatCapacity",
            icons: [
                {
                    icon: "mdi-thermometer-alert",
                    size: null,
                    iconColor: "red",
                    cssClass: null
                },
            ],
        },
        {
            text: "Maneuverability",
            value: "Maneuverability",
            icons: [
                {
                    icon: "mdi-weather-windy",
                    size: null,
                    iconColor: "green",
                    cssClass: null
                },
            ],
        },
        {
            text: "Fuel Consumption Rate",
            value: "FuelSystemFuelConsumptionRate",
            icons: [
                {
                    order: 0,
                    icon: "mdi-minus-thick",
                    size: "x-small",
                    iconColor: "red",
                    cssClass: null
                },
                {
                    order: 1,
                    icon: "mdi-fire",
                    size: null,
                    iconColor: "orange",
                    cssClass: null
                },
                {
                    order: 2,
                    icon: "mdi-slash-forward",
                    size: "small",
                    iconColor: null,
                    cssClass: null
                },
                {
                    order: 3,
                    icon: "mdi-hexagon-outline",
                    size: null,
                    iconColor: null,
                    cssClass: null
                },
            ],
        },
        {
            text: "Fuel Capacity",
            value: "FuelSystemFuelCapacity",
            icons: [
                {
                    icon: "mdi-fuel",
                    size: null,
                    iconColor: "orange",
                    cssClass: null
                },
            ],
        },
        {
            text: "Fuel Regeneration Rate",
            value: "FuelSystemFuelRegenerationRate",
            icons: [
                {
                    order: 0,
                    icon: "mdi-plus-thick",
                    size: "x-small",
                    iconColor: "green",
                    cssClass: null
                },
                {
                    order: 1,
                    icon: "mdi-fire",
                    size: null,
                    iconColor: "orange",
                    cssClass: null
                },
                {
                    order: 2,
                    icon: "mdi-slash-forward",
                    size: "small",
                    iconColor: null,
                    cssClass: null
                },
                {
                    order: 3,
                    icon: "mdi-arrow-u-down-right",
                    size: null,
                    iconColor: null,
                    cssClass: null
                },
            ],
        },
    ],
    frigateConfigurationsHeaders: [
        {
            text: "Name",
            value: "Name",
            description: null,
            align: 'left',
            width: 200,
            icons: [],
            divider: true,
            sortable: false,
        },
        {
            text: "Class",
            value: "Class",
            description: "Class describes the model/design of the hull.",
            align: 'left',
            width: 0,
            icons: [],
            divider: true,
            sortable: false,
        },
        {
            text: "Vigor Cost",
            value: "FrigateBaseVigorCost",
            description: "Vigor Cost describes the amout of Vigor required to deploy this spaceship into the battlefield.",
            align: 'center',
            width: 0,
            icons: [
                {
                    icon: "mdi-triangle",
                    size: null,
                    iconColor: "orange darken-2",
                    cssClass: 'vigor-icon'
                },
            ],
            divider: true,
            sortable: false,
        },
        {
            text: "MPU/MPL",
            value: "TotalModulePointsUsage",
            description: "Total Module Points Usage describes how many module points of available capacity have been used.",
            align: 'center',
            width: 0,
            icons: [],
            divider: true,
            sortable: false,
        },
        {
            text: "Hull Mass",
            value: "FrigateHullMass",
            description: "Hull Mass describes the overall mass of the Frigate's Hull.",
            align: 'center',
            width: 0,
            icons: [
                {
                    icon: "mdi-weight",
                    size: null,
                    iconColor: null,
                    cssClass: null
                },
            ],
            divider: true,
            sortable: false,
        },
        {
            text: "Total Mass",
            value: "TotalMass",
            description: "Total Mass describes the mass of the Frigate's hull plus the mass of all attached components.",
            align: 'center',
            width: 0,
            icons: [
                {
                    icon: "mdi-weight",
                    size: null,
                    iconColor: null,
                    cssClass: null
                },
            ],
            divider: true,
            sortable: false,
        },
        {
            text: "Total Crew Cost",
            value: "TotalCrewCost",
            description: "Total Crew describes the crew cost of the Frigate plus the crew cost of all attached modules.",
            align: 'center',
            width: 0,
            icons: [
                {
                    icon: "mdi-account-group",
                    size: null,
                    iconColor: "light-blue",
                    cssClass: null
                },
            ],
            divider: true,
            sortable: false,
        },
        {
            text: "Total Heat Capacity",
            value: "TotalHeatCapacity",
            description: "Total Heat Capacity describes the amount of heat units the entire ship can withstand before becomming overheated.",
            align: 'center',
            width: 0,
            icons: [
                {
                    icon: "mdi-thermometer-alert",
                    size: null,
                    iconColor: "red",
                    cssClass: null
                },
            ],
            divider: true,
            sortable: false,
        },
        {
            text: "Maneuverability",
            value: "Maneuverability",
            description: "Maneuverability describes how quickly the entire ship can accelerate given its Total Mass and its Thruster's Thrust.",
            align: 'center',
            width: 0,
            icons: [
                {
                    icon: "mdi-weather-windy",
                    size: null,
                    iconColor: "green",
                    cssClass: null
                },
            ],
            divider: true,
            sortable: false,
        },
        {
            text: "Fuel Consumption Rate",
            value: "FuelSystemFuelConsumptionRate",
            description: "Fuel Consumption Rate describes how much fuel it costs for the ship to move 1 tile.",
            align: 'center',
            width: 0,
            icons: [
                {
                    order: 0,
                    icon: "mdi-minus-thick",
                    size: "x-small",
                    iconColor: "red",
                    cssClass: null
                },
                {
                    order: 3,
                    icon: "mdi-hexagon-outline",
                    size: null,
                    iconColor: null,
                    cssClass: null
                },
                {
                    order: 2,
                    icon: "mdi-slash-forward",
                    size: "small",
                    iconColor: null,
                    cssClass: null
                },
                {
                    order: 1,
                    icon: "mdi-fire",
                    size: null,
                    iconColor: "orange",
                    cssClass: null
                },
            ],
            divider: true,
            sortable: false,
        },
        {
            text: "Fuel Capacity",
            value: "FuelSystemFuelCapacity",
            description: "Fuel Capacity describes the maximimum amount of fuel the ship's Fuel System can contian.",
            align: 'center',
            width: 0,
            icons: [
                {
                    icon: "mdi-fuel",
                    size: null,
                    iconColor: "orange",
                    cssClass: null
                },
            ],
            divider: true,
            sortable: false,
        },
        {
            text: "Fuel Regeneration Rate",
            value: "FuelSystemFuelRegenerationRate",
            description: "Fuel Regeneration Rate describes how much fuel the ship's Fuel System restores per turn.",
            align: 'center',
            width: 0,
            icons: [
                {
                    order: 0,
                    icon: "mdi-plus-thick",
                    size: "x-small",
                    iconColor: "green",
                    cssClass: null
                },
                {
                    order: 3,
                    icon: "mdi-arrow-u-down-right",
                    size: null,
                    iconColor: null,
                    cssClass: null
                },
                {
                    order: 2,
                    icon: "mdi-slash-forward",
                    size: "small",
                    iconColor: null,
                    cssClass: null
                },
                {
                    order: 1,
                    icon: "mdi-fire",
                    size: null,
                    iconColor: "orange",
                    cssClass: null
                },
            ],
            divider: true,
            sortable: false,
        },
        {
            text: "Description",
            value: "FrigateDescription",
            description: null,
            align: 'center',
            width: 0,
            icons: [
                {
                    icon: null,
                    size: null,
                    iconColor: null,
                    cssClass: null
                },
            ],
            divider: false,
            sortable: false,
        },
    ],
    frigateConfigurationsSelectedComponentPanel: null,
    frigateConfigurationsItemsPerPage: 6,
    frigateConfigurationsPageSync: 1,
    frigateConfigurationsPageCount: 1,
    frigateConfigurationsSearch: "",
    frigateConfigurationsSortBy: "",
    frigateConfigurationsSortDesc: true,
    frigatesShowOnlyFeasible: false,
    frigatesSortOptions: [
        {
            text: "None",
            value: "",
            icons: [],
        },
        {
            text: "Class",
            value: "Class",
            icons: [],
        },
        {
            text: "Vigor Cost",
            value: "BaseVigorCost",
            icons: [
                {
                    icon: "mdi-triangle",
                    size: null,
                    iconColor: "orange darken-2",
                    cssClass: 'vigor-icon'
                },
            ],
        },
        {
            text: "Module Point Limit",
            value: "ModulePointLimit",
            icons: [],
        },
        {
            text: "Hull Mass",
            value: "HullMass",
            icons: [
                {
                    icon: "mdi-weight",
                    size: null,
                    iconColor: null,
                    cssClass: null
                },
            ],
        },
        {
            text: "Crew Cost",
            value: "BaseCrewCost",
            icons: [
                {
                    icon: "mdi-account-group",
                    size: null,
                    iconColor: "light-blue",
                    cssClass: null
                },
            ],
        },
        {
            text: "Heat Capacity",
            value: "HeatCapacity",
            icons: [
                {
                    icon: "mdi-thermometer-alert",
                    size: null,
                    iconColor: "red",
                    cssClass: null
                },
            ],
        },
        {
            text: "Hull Health",
            value: "BaseHullHealth",
            icons: [
                {
                    icon: "mdi-heart",
                    size: null,
                    iconColor: "pink",
                    cssClass: null
                },
            ],
        },
        {
            text: "PDS Power Level",
            value: "PointDefenseSystemPowerLevelText",
            icons: [
                {
                    icon: "mdi-lightning-bolt",
                    size: null,
                    iconColor: "yellow",
                    cssClass: null
                },
            ],
        },
        {
            text: "Weapon Power Level",
            value: "WeaponPowerLevelText",
            icons: [
                {
                    icon: "mdi-lightning-bolt",
                    size: null,
                    iconColor: "yellow",
                    cssClass: null
                },
            ],
        },
    ],
    frigatesHeaders: [
        {
            text: "Class",
            value: "Class",
            description: "Class describes the model/design of the hull.",
            align: 'left',
            width: 0,
            icons: [],
            divider: true,
            sortable: false,
        },
        {
            text: "Vigor Cost",
            value: "BaseVigorCost",
            description: "Vigor Cost describes the amout of Vigor required to deploy this spaceship into the battlefield.",
            align: 'center',
            width: 0,
            icons: [
                {
                    icon: "mdi-triangle",
                    size: null,
                    iconColor: "orange darken-2",
                    cssClass: 'vigor-icon'
                },
            ],
            divider: true,
            sortable: false,
        },
        {
            text: "MP",
            value: "ModulePointLimit",
            description: "Module Point Limit describes the upper limit for the total module points cost for all equipped components.",
            align: 'center',
            width: 0,
            icons: [],
            divider: true,
            sortable: false,
        },
        {
            text: "Hull Mass",
            value: "HullMass",
            description: "Mass describes the overall mass of the Frigate's Hull.",
            align: 'center',
            width: 0,
            icons: [
                {
                    icon: "mdi-weight",
                    size: null,
                    iconColor: null,
                    cssClass: null
                },
            ],
            divider: true,
            sortable: false,
        },
        {
            text: "Crew Cost",
            value: "BaseCrewCost",
            description: "Crew Cost describes the how much crew the Frigate needs to operate.",
            align: 'center',
            width: 0,
            icons: [
                {
                    icon: "mdi-account-group",
                    size: null,
                    iconColor: "light-blue",
                    cssClass: null
                },
            ],
            divider: true,
            sortable: false,
        },
        {
            text: "Heat Capacity",
            value: "HeatCapacity",
            description: "Heat Capacity describes the amount of heat units the hull can withstand. It contributes to the Total Heat Capacity of the spaceship.",
            align: 'center',
            width: 0,
            icons: [
                {
                    icon: "mdi-thermometer-alert",
                    size: null,
                    iconColor: "red",
                    cssClass: null
                },
            ],
            divider: true,
            sortable: false,
        },
        {
            text: "Hull Health",
            value: "BaseHullHealth",
            description: "Hull Health describes how much total damage the Frigate can take before it is destroyed.",
            align: 'center',
            width: 0,
            icons: [
                {
                    icon: "mdi-heart",
                    size: null,
                    iconColor: "pink",
                    cssClass: null
                },
            ],
            divider: true,
            sortable: false,
        },
        {
            text: "PDS",
            value: "PointDefenseSystemPowerLevelText",
            description: "PDS Power Level describes the maximum power level of PDS this hull is compatible with.",
            align: 'center',
            width: 0,
            icons: [
                {
                    icon: "mdi-lightning-bolt",
                    size: null,
                    iconColor: "yellow",
                    cssClass: null
                },
            ],
            divider: true,
            sortable: false,
        },
        {
            text: "Wpn",
            value: "WeaponPowerLevelText",
            description: "Weapon Power Level describes the maximum power level of Weapon Frame this hull is compatible with.",
            align: 'center',
            width: 0,
            icons: [
                {
                    icon: "mdi-lightning-bolt",
                    size: null,
                    iconColor: "yellow",
                    cssClass: null
                },
            ],
            divider: true,
            sortable: false,
        },
        {
            text: "Description",
            value: "Description",
            description: null,
            align: 'center',
            width: 0,
            icons: [
                {
                    icon: null,
                    size: null,
                    iconColor: null,
                    cssClass: null
                },
            ],
            divider: false,
            sortable: false,
        },
    ],
    frigatesItemsPerPage: 6,
    frigatesPageSync: 1,
    frigatesPageCount: 1,
    frigatesSearch: "",
    frigatesSortBy: "",
    frigatesSortDesc: true,


    editingCorvetteConfiguration: null,
    corvetteConfigurationSelectedComponentPanels: [],
    corvetteConfigurationStatsPinned: false,
    corvetteConfigurationWeaponChartsPinned: false,
    corvetteConfigurationsSortOptions: [
        {
            text: "None",
            value: "",
            icons: [],
        },
        {
            text: "Name",
            value: "Name",
            icons: [],
        },
        {
            text: "Class",
            value: "CorvetteClass",
            icons: [],
        },
        {
            text: "Vigor Cost",
            value: "CorvetteBaseVigorCost",
            icons: [
                {
                    icon: "mdi-triangle",
                    size: null,
                    iconColor: "orange darken-2",
                    cssClass: 'vigor-icon'
                },
            ],
        },
        {
            text: "Module Points Usage",
            value: "TotalModulePointsUsage",
            icons: [],
        },
        {
            text: "Module Point Limit",
            value: "CorvetteModulePointLimit",
            icons: [],
        },
        {
            text: "Hull Mass",
            value: "HullMass",
            icons: [
                {
                    icon: "mdi-weight",
                    size: null,
                    iconColor: null,
                    cssClass: null
                },
            ],
        },
        {
            text: "Total Mass",
            value: "TotalMass",
            icons: [
                {
                    icon: "mdi-weight",
                    size: null,
                    iconColor: null,
                    cssClass: null
                },
            ],
        },
        {
            text: "Total Crew Cost",
            value: "TotalCrewCost",
            icons: [
                {
                    icon: "mdi-account-group",
                    size: null,
                    iconColor: "light-blue",
                    cssClass: null
                },
            ],
        },
        {
            text: "Total Heat Capacity",
            value: "TotalHeatCapacity",
            icons: [
                {
                    icon: "mdi-thermometer-alert",
                    size: null,
                    iconColor: "red",
                    cssClass: null
                },
            ],
        },
        {
            text: "Maneuverability",
            value: "Maneuverability",
            icons: [
                {
                    icon: "mdi-weather-windy",
                    size: null,
                    iconColor: "green",
                    cssClass: null
                },
            ],
        },
        {
            text: "Fuel Consumption Rate",
            value: "FuelSystemFuelConsumptionRate",
            icons: [
                {
                    order: 0,
                    icon: "mdi-minus-thick",
                    size: "x-small",
                    iconColor: "red",
                    cssClass: null
                },
                {
                    order: 1,
                    icon: "mdi-fire",
                    size: null,
                    iconColor: "orange",
                    cssClass: null
                },
                {
                    order: 2,
                    icon: "mdi-slash-forward",
                    size: "small",
                    iconColor: null,
                    cssClass: null
                },
                {
                    order: 3,
                    icon: "mdi-hexagon-outline",
                    size: null,
                    iconColor: null,
                    cssClass: null
                },
            ],
        },
        {
            text: "Fuel Capacity",
            value: "FuelSystemFuelCapacity",
            icons: [
                {
                    icon: "mdi-fuel",
                    size: null,
                    iconColor: "orange",
                    cssClass: null
                },
            ],
        },
        {
            text: "Fuel Regeneration Rate",
            value: "FuelSystemFuelRegenerationRate",
            icons: [
                {
                    order: 0,
                    icon: "mdi-plus-thick",
                    size: "x-small",
                    iconColor: "green",
                    cssClass: null
                },
                {
                    order: 1,
                    icon: "mdi-fire",
                    size: null,
                    iconColor: "orange",
                    cssClass: null
                },
                {
                    order: 2,
                    icon: "mdi-slash-forward",
                    size: "small",
                    iconColor: null,
                    cssClass: null
                },
                {
                    order: 3,
                    icon: "mdi-arrow-u-down-right",
                    size: null,
                    iconColor: null,
                    cssClass: null
                },
            ],
        },
    ],
    corvetteConfigurationsHeaders: [
        {
            text: "Name",
            value: "Name",
            description: null,
            align: 'left',
            width: 200,
            icons: [],
            divider: true,
            sortable: false,
        },
        {
            text: "Class",
            value: "Class",
            description: "Class describes the model/design of the hull.",
            align: 'left',
            width: 0,
            icons: [],
            divider: true,
            sortable: false,
        },
        {
            text: "Vigor Cost",
            value: "CorvetteBaseVigorCost",
            description: "Vigor Cost describes the amout of Vigor required to deploy this spaceship into the battlefield.",
            align: 'center',
            width: 0,
            icons: [
                {
                    icon: "mdi-triangle",
                    size: null,
                    iconColor: "orange darken-2",
                    cssClass: 'vigor-icon'
                },
            ],
            divider: true,
            sortable: false,
        },
        {
            text: "MPU/MPL",
            value: "TotalModulePointsUsage",
            description: "Total Module Points Usage describes how many module points of available capacity have been used.",
            align: 'center',
            width: 0,
            icons: [],
            divider: true,
            sortable: false,
        },
        {
            text: "Hull Mass",
            value: "CorvetteHullMass",
            description: "Hull Mass describes the overall mass of the Corvette's Hull.",
            align: 'center',
            width: 0,
            icons: [
                {
                    icon: "mdi-weight",
                    size: null,
                    iconColor: null,
                    cssClass: null
                },
            ],
            divider: true,
            sortable: false,
        },
        {
            text: "Total Mass",
            value: "TotalMass",
            description: "Total Mass describes the mass of the Corvette's hull plus the mass of all attached components.",
            align: 'center',
            width: 0,
            icons: [
                {
                    icon: "mdi-weight",
                    size: null,
                    iconColor: null,
                    cssClass: null
                },
            ],
            divider: true,
            sortable: false,
        },
        {
            text: "Total Crew Cost",
            value: "TotalCrewCost",
            description: "Total Crew describes the crew cost of the Corvette plus the crew cost of all attached modules.",
            align: 'center',
            width: 0,
            icons: [
                {
                    icon: "mdi-account-group",
                    size: null,
                    iconColor: "light-blue",
                    cssClass: null
                },
            ],
            divider: true,
            sortable: false,
        },
        {
            text: "Total Heat Capacity",
            value: "TotalHeatCapacity",
            description: "Total Heat Capacity describes the amount of heat units the entire ship can withstand before becomming overheated.",
            align: 'center',
            width: 0,
            icons: [
                {
                    icon: "mdi-thermometer-alert",
                    size: null,
                    iconColor: "red",
                    cssClass: null
                },
            ],
            divider: true,
            sortable: false,
        },
        {
            text: "Maneuverability",
            value: "Maneuverability",
            description: "Maneuverability describes how quickly the entire ship can accelerate given its Total Mass and its Thruster's Thrust.",
            align: 'center',
            width: 0,
            icons: [
                {
                    icon: "mdi-weather-windy",
                    size: null,
                    iconColor: "green",
                    cssClass: null
                },
            ],
            divider: true,
            sortable: false,
        },
        {
            text: "Fuel Consumption Rate",
            value: "FuelSystemFuelConsumptionRate",
            description: "Fuel Consumption Rate describes how much fuel it costs for the ship to move 1 tile.",
            align: 'center',
            width: 0,
            icons: [
                {
                    order: 0,
                    icon: "mdi-minus-thick",
                    size: "x-small",
                    iconColor: "red",
                    cssClass: null
                },
                {
                    order: 3,
                    icon: "mdi-hexagon-outline",
                    size: null,
                    iconColor: null,
                    cssClass: null
                },
                {
                    order: 2,
                    icon: "mdi-slash-forward",
                    size: "small",
                    iconColor: null,
                    cssClass: null
                },
                {
                    order: 1,
                    icon: "mdi-fire",
                    size: null,
                    iconColor: "orange",
                    cssClass: null
                },
            ],
            divider: true,
            sortable: false,
        },
        {
            text: "Fuel Capacity",
            value: "FuelSystemFuelCapacity",
            description: "Fuel Capacity describes the maximimum amount of fuel the ship's Fuel System can contian.",
            align: 'center',
            width: 0,
            icons: [
                {
                    icon: "mdi-fuel",
                    size: null,
                    iconColor: "orange",
                    cssClass: null
                },
            ],
            divider: true,
            sortable: false,
        },
        {
            text: "Fuel Regeneration Rate",
            value: "FuelSystemFuelRegenerationRate",
            description: "Fuel Regeneration Rate describes how much fuel the ship's Fuel System restores per turn.",
            align: 'center',
            width: 0,
            icons: [
                {
                    order: 0,
                    icon: "mdi-plus-thick",
                    size: "x-small",
                    iconColor: "green",
                    cssClass: null
                },
                {
                    order: 3,
                    icon: "mdi-arrow-u-down-right",
                    size: null,
                    iconColor: null,
                    cssClass: null
                },
                {
                    order: 2,
                    icon: "mdi-slash-forward",
                    size: "small",
                    iconColor: null,
                    cssClass: null
                },
                {
                    order: 1,
                    icon: "mdi-fire",
                    size: null,
                    iconColor: "orange",
                    cssClass: null
                },
            ],
            divider: true,
            sortable: false,
        },
        {
            text: "Description",
            value: "CorvetteDescription",
            description: null,
            align: 'center',
            width: 0,
            icons: [
                {
                    icon: null,
                    size: null,
                    iconColor: null,
                    cssClass: null
                },
            ],
            divider: false,
            sortable: false,
        },
    ],
    corvetteConfigurationsSelectedComponentPanel: null,
    corvetteConfigurationsItemsPerPage: 6,
    corvetteConfigurationsPageSync: 1,
    corvetteConfigurationsPageCount: 1,
    corvetteConfigurationsSearch: "",
    corvetteConfigurationsSortBy: "",
    corvetteConfigurationsSortDesc: true,
    corvettesShowOnlyFeasible: false,
    corvettesSortOptions: [
        {
            text: "None",
            value: "",
            icons: [],
        },
        {
            text: "Class",
            value: "Class",
            icons: [],
        },
        {
            text: "Vigor Cost",
            value: "BaseVigorCost",
            icons: [
                {
                    icon: "mdi-triangle",
                    size: null,
                    iconColor: "orange darken-2",
                    cssClass: 'vigor-icon'
                },
            ],
        },
        {
            text: "Module Point Limit",
            value: "ModulePointLimit",
            icons: [],
        },
        {
            text: "Hull Mass",
            value: "HullMass",
            icons: [
                {
                    icon: "mdi-weight",
                    size: null,
                    iconColor: null,
                    cssClass: null
                },
            ],
        },
        {
            text: "Crew Cost",
            value: "BaseCrewCost",
            icons: [
                {
                    icon: "mdi-account-group",
                    size: null,
                    iconColor: "light-blue",
                    cssClass: null
                },
            ],
        },
        {
            text: "Heat Capacity",
            value: "HeatCapacity",
            icons: [
                {
                    icon: "mdi-thermometer-alert",
                    size: null,
                    iconColor: "red",
                    cssClass: null
                },
            ],
        },
        {
            text: "Hull Health",
            value: "BaseHullHealth",
            icons: [
                {
                    icon: "mdi-heart",
                    size: null,
                    iconColor: "pink",
                    cssClass: null
                },
            ],
        },
        {
            text: "PDS Power Level",
            value: "PointDefenseSystemPowerLevelText",
            icons: [
                {
                    icon: "mdi-lightning-bolt",
                    size: null,
                    iconColor: "yellow",
                    cssClass: null
                },
            ],
        },
        {
            text: "Weapon Power Level",
            value: "WeaponPowerLevelText",
            icons: [
                {
                    icon: "mdi-lightning-bolt",
                    size: null,
                    iconColor: "yellow",
                    cssClass: null
                },
            ],
        },
    ],
    corvettesHeaders: [
        {
            text: "Class",
            value: "Class",
            description: "Class describes the model/design of the hull.",
            align: 'left',
            width: 0,
            icons: [],
            divider: true,
            sortable: false,
        },
        {
            text: "Vigor Cost",
            value: "BaseVigorCost",
            description: "Vigor Cost describes the amout of Vigor required to deploy this spaceship into the battlefield.",
            align: 'center',
            width: 0,
            icons: [
                {
                    icon: "mdi-triangle",
                    size: null,
                    iconColor: "orange darken-2",
                    cssClass: 'vigor-icon'
                },
            ],
            divider: true,
            sortable: false,
        },
        {
            text: "MP",
            value: "ModulePointLimit",
            description: "Module Point Limit describes the upper limit for the total module points cost for all equipped components.",
            align: 'center',
            width: 0,
            icons: [],
            divider: true,
            sortable: false,
        },
        {
            text: "Hull Mass",
            value: "HullMass",
            description: "Mass describes the overall mass of the Corvette's Hull.",
            align: 'center',
            width: 0,
            icons: [
                {
                    icon: "mdi-weight",
                    size: null,
                    iconColor: null,
                    cssClass: null
                },
            ],
            divider: true,
            sortable: false,
        },
        {
            text: "Crew Cost",
            value: "BaseCrewCost",
            description: "Crew Cost describes the how much crew the Corvette needs to operate.",
            align: 'center',
            width: 0,
            icons: [
                {
                    icon: "mdi-account-group",
                    size: null,
                    iconColor: "light-blue",
                    cssClass: null
                },
            ],
            divider: true,
            sortable: false,
        },
        {
            text: "Heat Capacity",
            value: "HeatCapacity",
            description: "Heat Capacity describes the amount of heat units the hull can withstand. It contributes to the Total Heat Capacity of the spaceship.",
            align: 'center',
            width: 0,
            icons: [
                {
                    icon: "mdi-thermometer-alert",
                    size: null,
                    iconColor: "red",
                    cssClass: null
                },
            ],
            divider: true,
            sortable: false,
        },
        {
            text: "Hull Health",
            value: "BaseHullHealth",
            description: "Hull Health describes how much total damage the Corvette can take before it is destroyed.",
            align: 'center',
            width: 0,
            icons: [
                {
                    icon: "mdi-heart",
                    size: null,
                    iconColor: "pink",
                    cssClass: null
                },
            ],
            divider: true,
            sortable: false,
        },
        {
            text: "PDS",
            value: "PointDefenseSystemPowerLevelText",
            description: "PDS Power Level describes the maximum power level of PDS this hull is compatible with.",
            align: 'center',
            width: 0,
            icons: [
                {
                    icon: "mdi-lightning-bolt",
                    size: null,
                    iconColor: "yellow",
                    cssClass: null
                },
            ],
            divider: true,
            sortable: false,
        },
        {
            text: "Wpn",
            value: "WeaponPowerLevelText",
            description: "Weapon Power Level describes the maximum power level of Weapon Frame this hull is compatible with.",
            align: 'center',
            width: 0,
            icons: [
                {
                    icon: "mdi-lightning-bolt",
                    size: null,
                    iconColor: "yellow",
                    cssClass: null
                },
            ],
            divider: true,
            sortable: false,
        },
        {
            text: "Description",
            value: "Description",
            description: null,
            align: 'center',
            width: 0,
            icons: [
                {
                    icon: null,
                    size: null,
                    iconColor: null,
                    cssClass: null
                },
            ],
            divider: false,
            sortable: false,
        },
    ],
    corvettesItemsPerPage: 6,
    corvettesPageSync: 1,
    corvettesPageCount: 1,
    corvettesSearch: "",
    corvettesSortBy: "",
    corvettesSortDesc: true,










    





    armorsSortOptions: [
        {
            text: "None",
            value: "",
            icons: [],
        },
        {
            text: "Title",
            value: "Title",
            icons: [],
        },
        {
            text: "Module Points Cost",
            value: "ModulePointsCost",
            icons: [],
        },
        {
            text: "Mass",
            value: "Mass",
            icons: [
                {
                    icon: "mdi-weight",
                    size: null,
                    iconColor: null,
                    cssClass: null
                },
            ],
        },
        {
            text: "Heat Capacity",
            value: "HeatCapacity",
            icons: [
                {
                    icon: "mdi-thermometer-alert",
                    size: null,
                    iconColor: "red",
                    cssClass: null
                },
            ],
        },
        {
            text: "Kinetic Resistance",
            value: "KineticResistance",
            icons: [
                {
                    icon: "mdi-ammunition",
                    size: null,
                    iconColor: null,
                    cssClass: null
                },
            ],
        },
        {
            text: "Energy Resistance",
            value: "EnergyResistance",
            icons: [
                {
                    icon: "mdi-heat-wave",
                    size: null,
                    iconColor: null,
                    cssClass: null
                },
            ],
        },
    ],
    armorsHeaders: [
        {
            text: "Title",
            value: "Title",
            description: null,
            align: 'left',
            width: 0,
            icons: [],
            divider: true,
            sortable: false,
        },
        {
            text: "MP",
            value: "ModulePointsCost",
            description: null,
            align: 'center',
            width: 0,
            icons: [],
            divider: true,
            sortable: false,
        },
        {
            text: "Mass",
            value: "Mass",
            description: "Mass describes the overall mass of the Armor.",
            align: 'center',
            width: 0,
            icons: [
                {
                    icon: "mdi-weight",
                    size: null,
                    iconColor: null,
                    cssClass: null
                },
            ],
            divider: true,
            sortable: false,
        },
        {
            text: "Heat Capacity",
            value: "HeatCapacity",
            description: "Heat Capacity describes the amount of heat units the armor can withstand. It contributes to the Total Heat Capacity of the spaceship.",
            align: 'center',
            width: 0,
            icons: [
                {
                    icon: "mdi-thermometer-alert",
                    size: null,
                    iconColor: "red",
                    cssClass: null
                },
            ],
            divider: true,
            sortable: false,
        },
        {
            text: "Kinetic Resistance",
            value: "KineticResistance",
            description: "Kinetic Resistance describes the Armor's resiliance against Kinetic damage.",
            align: 'center',
            width: 0,
            icons: [
                {
                    icon: "mdi-ammunition",
                    size: null,
                    iconColor: null,
                    cssClass: null
                },
            ],
            divider: true,
            sortable: false,
        },
        {
            text: "Energy Resistance",
            value: "EnergyResistance",
            description: "Energy Resistance describes the Armor's resiliance against Energy damage.",
            align: 'center',
            width: 0,
            icons: [
                {
                    icon: "mdi-heat-wave",
                    size: null,
                    iconColor: null,
                    cssClass: null
                },
            ],
            divider: true,
            sortable: false,
        },
        {
            text: "Description",
            value: "Description",
            description: null,
            align: 'center',
            width: 0,
            icons: [
                {
                    icon: null,
                    size: null,
                    iconColor: null,
                    cssClass: null
                },
            ],
            divider: false,
            sortable: false,
        },
    ],
    armorsItemsPerPage: 6,
    armorsPageSync: 1,
    armorsPageCount: 1,
    armorsSearch: "",
    armorsSortBy: "",
    armorsSortDesc: true,
    armorsShowOnlyFeasible: false,
    pointDefenseSystemsSortOptions: [
        {
            text: "None",
            value: "",
            icons: [],
        },
        {
            text: "Title",
            value: "Title",
            icons: [],
        },
        {
            text: "Module Points Cost",
            value: "ModulePointsCost",
            icons: [],
        },
        {
            text: "Mass",
            value: "Mass",
            icons: [
                {
                    icon: "mdi-weight",
                    size: null,
                    iconColor: null,
                    cssClass: null
                },
            ],
        },
        {
            text: "Heat Capacity",
            value: "HeatCapacity",
            icons: [
                {
                    icon: "mdi-thermometer-alert",
                    size: null,
                    iconColor: "red",
                    cssClass: null
                },
            ],
        },
        {
            text: "Power Level",
            value: "PowerLevelText",
            icons: [
                {
                    icon: "mdi-lightning-bolt",
                    size: null,
                    iconColor: "yellow",
                    cssClass: null
                },
            ],
        },
        {
            text: "Efficiency",
            value: "Efficiency",
            icons: [
                {
                    icon: "mdi-target",
                    size: null,
                    iconColor: "green",
                    cssClass: null
                },
            ],
        },
        {
            text: "Countermeasure Capacity",
            value: "CountermeasureCapacity",
            icons: [
                {
                    icon: "mdi-magazine-rifle",
                    size: null,
                    iconColor: "orange",
                    cssClass: null
                },
            ],
        },
        {
            text: "Countermeasure Regeneration Rate",
            value: "CountermeasureRegenerationRate",
            icons: [
                {
                    icon: "mdi-plus-thick",
                    size: "x-small",
                    iconColor: "green",
                    cssClass: null
                },
                {
                    icon: "mdi-ammunition",
                    size: null,
                    iconColor: "orange",
                    cssClass: null
                },
                {
                    icon: "mdi-slash-forward",
                    size: "small",
                    iconColor: null,
                    cssClass: null
                },
                {
                    icon: "mdi-arrow-u-down-right",
                    size: null,
                    iconColor: null,
                    cssClass: null
                },
            ],
        },
    ],
    pointDefenseSystemsHeaders: [
        {
            text: "Title",
            value: "Title",
            description: null,
            align: 'left',
            width: 0,
            icons: [],
            divider: true,
            sortable: false,
        },
        {
            text: "MP",
            value: "ModulePointsCost",
            description: null,
            align: 'center',
            width: 0,
            icons: [],
            divider: true,
            sortable: false,
        },
        {
            text: "Mass",
            value: "Mass",
            description: "Mass describes the overall mass of the PDS.",
            align: 'center',
            width: 0,
            icons: [
                {
                    icon: "mdi-weight",
                    size: null,
                    iconColor: null,
                    cssClass: null
                },
            ],
            divider: true,
            sortable: false,
        },
        {
            text: "Heat Capacity",
            value: "HeatCapacity",
            description: "Heat Capacity describes the amount of heat units the PDS can withstand. It contributes to the Total Heat Capacity of the spaceship.",
            align: 'center',
            width: 0,
            icons: [
                {
                    icon: "mdi-thermometer-alert",
                    size: null,
                    iconColor: "red",
                    cssClass: null
                },
            ],
            divider: true,
            sortable: false,
        },
        {
            text: "Power Level",
            value: "PowerLevelText",
            description: "Power Level describes the minimum required hull PDS power level that this PDS is compatible with.",
            align: 'center',
            width: 0,
            icons: [
                {
                    icon: "mdi-lightning-bolt",
                    size: null,
                    iconColor: "yellow",
                    cssClass: null
                },
            ],
            divider: true,
            sortable: false,
        },
        {
            text: "Efficiency",
            value: "Efficiency",
            description: "Effeciency describes the probability that a countermeasure will successfully nullify an incomming opponent payload.",
            align: 'center',
            width: 0,
            icons: [
                {
                    icon: "mdi-target",
                    size: null,
                    iconColor: "green",
                    cssClass: null
                },
            ],
            divider: true,
            sortable: false,
        },
        {
            text: "Countermeasure Capacity",
            value: "CountermeasureCapacity",
            description: "Countermeasure Capacity describes how many opponent's payloads the PDS will attempt to nullify during your opponent's turn.",
            align: 'center',
            width: 0,
            icons: [
                {
                    icon: "mdi-magazine-rifle",
                    size: null,
                    iconColor: "orange",
                    cssClass: null
                },
            ],
            divider: true,
            sortable: false,
        },
        {
            text: "Countermeasure Regeneration Rate",
            value: "CountermeasureRegenerationRate",
            description: "Countermeasure Regeneration Rate describes how many countermeasures the PDS will regenerate per turn.",
            align: 'center',
            width: 0,
            icons: [
                {
                    order: 0,
                    icon: "mdi-plus-thick",
                    size: "x-small",
                    iconColor: "green",
                    cssClass: null
                },
                {
                    order: 1,
                    icon: "mdi-arrow-u-down-right",
                    size: null,
                    iconColor: null,
                    cssClass: null
                },
                {
                    order: 2,
                    icon: "mdi-slash-forward",
                    size: "small",
                    iconColor: null,
                    cssClass: null
                },
                {
                    order: 3,
                    icon: "mdi-ammunition",
                    size: null,
                    iconColor: "orange",
                    cssClass: null
                },
            ],
            divider: true,
            sortable: false,
        },
        {
            text: "Description",
            value: "Description",
            description: null,
            align: 'center',
            width: 0,
            icons: [
                {
                    icon: null,
                    size: null,
                    iconColor: null,
                    cssClass: null
                },
            ],
            divider: false,
            sortable: false,
        },
    ],
    pointDefenseSystemsItemsPerPage: 6,
    pointDefenseSystemsPageSync: 1,
    pointDefenseSystemsPageCount: 1,
    pointDefenseSystemsSearch: "",
    pointDefenseSystemsSortBy: "",
    pointDefenseSystemsSortDesc: true,
    pointDefenseSystemsShowOnlyFeasible: false,
    fuelSystemsSortOptions: [
        {
            text: "None",
            value: "",
            icons: [],
        },
        {
            text: "Title",
            value: "Title",
            icons: [],
        },
        {
            text: "Module Points Cost",
            value: "ModulePointsCost",
            icons: [],
        },
        {
            text: "Mass",
            value: "Mass",
            icons: [
                {
                    icon: "mdi-weight",
                    size: null,
                    iconColor: null,
                    cssClass: null
                },
            ],
        },
        {
            text: "Heat Capacity",
            value: "HeatCapacity",
            icons: [
                {
                    icon: "mdi-thermometer-alert",
                    size: null,
                    iconColor: "red",
                    cssClass: null
                },
            ],
        },
        {
            text: "Fuel Capacity",
            value: "FuelCapacity",
            icons: [
                {
                    icon: "mdi-fuel",
                    size: null,
                    iconColor: "orange",
                    cssClass: null
                },
            ],
        },
        {
            text: "Fuel Regeneration Rate",
            value: "FuelRegenerationRate",
            icons: [
                {
                    icon: "mdi-plus-thick",
                    size: "x-small",
                    iconColor: "green",
                    cssClass: null
                },
                {
                    icon: "mdi-fire",
                    size: null,
                    iconColor: "orange",
                    cssClass: null
                },
                {
                    icon: "mdi-slash-forward",
                    size: "small",
                    iconColor: null,
                    cssClass: null
                },
                {
                    icon: "mdi-arrow-u-down-right",
                    size: null,
                    iconColor: null,
                    cssClass: null
                },
            ],
        },
    ],
    fuelSystemsHeaders: [
        {
            text: "Title",
            value: "Title",
            description: null,
            align: 'left',
            width: 0,
            icons: [],
            divider: true,
            sortable: false,
        },
        {
            text: "MP",
            value: "ModulePointsCost",
            description: null,
            align: 'center',
            width: 0,
            icons: [],
            divider: true,
            sortable: false,
        },
        {
            text: "Mass",
            value: "Mass",
            description: "Mass describes the overall mass of the Fuel System.",
            align: 'center',
            width: 0,
            icons: [
                {
                    icon: "mdi-weight",
                    size: null,
                    iconColor: null,
                    cssClass: null
                },
            ],
            divider: true,
            sortable: false,
        },
        {
            text: "Heat Capacity",
            value: "HeatCapacity",
            description: "Heat Capacity describes the amount of heat units the Fuel System can withstand. It contributes to the Total Heat Capacity of the spaceship.",
            align: 'center',
            width: 0,
            icons: [
                {
                    icon: "mdi-thermometer-alert",
                    size: null,
                    iconColor: "red",
                    cssClass: null
                },
            ],
            divider: true,
            sortable: false,
        },
        {
            text: "Fuel Capacity",
            value: "FuelCapacity",
            description: "Fuel Capacity describes the maximimum amount of fuel that the Fuel System can contian.",
            align: 'center',
            width: 0,
            icons: [
                {
                    icon: "mdi-fuel",
                    size: null,
                    iconColor: "orange",
                    cssClass: null
                },
            ],
            divider: true,
            sortable: false,
        },
        {
            text: "Fuel Regeneration Rate",
            value: "FuelRegenerationRate",
            description: "Fuel Regeneration Rate describes how much fuel the Fuel System restores per turn.",
            align: 'center',
            width: 0,
            icons: [
                {
                    order: 0,
                    icon: "mdi-plus-thick",
                    size: "x-small",
                    iconColor: "green",
                    cssClass: null
                },
                {
                    order: 3,
                    icon: "mdi-arrow-u-down-right",
                    size: null,
                    iconColor: null,
                    cssClass: null
                },
                {
                    order: 2,
                    icon: "mdi-slash-forward",
                    size: "small",
                    iconColor: null,
                    cssClass: null
                },
                {
                    order: 1,
                    icon: "mdi-fire",
                    size: null,
                    iconColor: "orange",
                    cssClass: null
                },
            ],
            divider: true,
            sortable: false,
        },
        {
            text: "Description",
            value: "Description",
            description: null,
            align: 'center',
            width: 0,
            icons: [
                {
                    icon: null,
                    size: null,
                    iconColor: null,
                    cssClass: null
                },
            ],
            divider: false,
            sortable: false,
        },
    ],
    fuelSystemsItemsPerPage: 6,
    fuelSystemsPageSync: 1,
    fuelSystemsPageCount: 1,
    fuelSystemsSearch: "",
    fuelSystemsSortBy: "",
    fuelSystemsSortDesc: true,
    fuelSystemsShowOnlyFeasible: false,
    thrustersSortOptions: [
        {
            text: "None",
            value: "",
            icons: [],
        },
        {
            text: "Title",
            value: "Title",
            icons: [],
        },
        {
            text: "Module Points Cost",
            value: "ModulePointsCost",
            icons: [],
        },
        {
            text: "Mass",
            value: "Mass",
            icons: [
                {
                    icon: "mdi-weight",
                    size: null,
                    iconColor: null,
                    cssClass: null
                },
            ],
        },
        {
            text: "Heat Capacity",
            value: "HeatCapacity",
            icons: [
                {
                    icon: "mdi-thermometer-alert",
                    size: null,
                    iconColor: "red",
                    cssClass: null
                },
            ],
        },
        {
            text: "Thrust",
            value: "Thrust",
            icons: [
                {
                    icon: "mdi-hexagon-outline",
                    size: null,
                    iconColor: null,
                    cssClass: null
                },
                {
                    icon: "mdi-arrow-right-thick",
                    size: "small",
                    iconColor: "orange",
                    cssClass: null
                },
                {
                    icon: "mdi-hexagon-outline",
                    size: null,
                    iconColor: null,
                    cssClass: null
                },
            ],
        },
        {
            text: "Efficiency",
            value: "Efficiency",
            icons: [
                {
                    icon: "mdi-chart-bell-curve-cumulative",
                    size: null,
                    iconColor: "green",
                    cssClass: null
                },
            ],
        },
    ],
    thrustersHeaders: [
        {
            text: "Title",
            value: "Title",
            description: null,
            align: 'left',
            width: 0,
            icons: [],
            divider: true,
            sortable: false,
        },
        {
            text: "MP",
            value: "ModulePointsCost",
            description: null,
            align: 'center',
            width: 0,
            icons: [],
            divider: true,
            sortable: false,
        },
        {
            text: "Mass",
            value: "Mass",
            description: "Mass describes the overall mass of the Thruster.",
            align: 'center',
            width: 0,
            icons: [
                {
                    icon: "mdi-weight",
                    size: null,
                    iconColor: null,
                    cssClass: null
                },
            ],
            divider: true,
            sortable: false,
        },
        {
            text: "Heat Capacity",
            value: "HeatCapacity",
            description: "Heat Capacity describes the amount of heat units the thruster can withstand. It contributes to the Total Heat Capacity of the spaceship.",
            align: 'center',
            width: 0,
            icons: [
                {
                    icon: "mdi-thermometer-alert",
                    size: null,
                    iconColor: "red",
                    cssClass: null
                },
            ],
            divider: true,
            sortable: false,
        },
        {
            text: "Thrust",
            value: "Thrust",
            description: "Thrust describes the maximimum number of Tiles the thruster is capable of moving the ship in one turn.",
            align: 'center',
            width: 0,
            icons: [
                {
                    order: 0,
                    icon: "mdi-hexagon-outline",
                    size: null,
                    iconColor: null,
                    cssClass: null
                },
                {
                    order: 2,
                    icon: "mdi-hexagon-outline",
                    size: null,
                    iconColor: null,
                    cssClass: null
                },
                {
                    order: 1,
                    icon: "mdi-arrow-right-thick",
                    size: "small",
                    iconColor: "orange",
                    cssClass: null
                },
            ],
            divider: true,
            sortable: false,
        },
        {
            text: "Efficiency",
            value: "Efficiency",
            description: "Efficiency describes how well the thruster converts fuel into energy.",
            align: 'center',
            width: 0,
            icons: [
                {
                    icon: "mdi-chart-bell-curve-cumulative",
                    size: null,
                    iconColor: "green",
                    cssClass: null
                },
            ],
            divider: true,
            sortable: false,
        },
        {
            text: "Description",
            value: "Description",
            description: null,
            align: 'center',
            width: 0,
            icons: [
                {
                    icon: null,
                    size: null,
                    iconColor: null,
                    cssClass: null
                },
            ],
            divider: false,
            sortable: false,
        },
    ],
    thrustersItemsPerPage: 6,
    thrustersPageSync: 1,
    thrustersPageCount: 1,
    thrustersSearch: "",
    thrustersSortBy: "",
    thrustersSortDesc: true,
    thrustersShowOnlyFeasible: false,
    weaponFrame1sSortOptions: [
        {
            text: "None",
            value: "",
            icons: [],
        },
        {
            text: "Title",
            value: "Title",
            icons: [],
        },
        {
            text: "Weapon Frame Type",
            value: "WeaponFrameTypeText",
            icons: [
                {
                    icon: "mdi-pistol",
                    size: null,
                    iconColor: "blue-grey",
                    cssClass: null
                },
            ],
        },
        {
            text: "Module Points Cost",
            value: "ModulePointsCost",
            icons: [],
        },
        {
            text: "Mass",
            value: "Mass",
            icons: [
                {
                    icon: "mdi-weight",
                    size: null,
                    iconColor: null,
                    cssClass: null
                },
            ],
        },
        {
            text: "Power Level",
            value: "PowerLevelText",
            icons: [
                {
                    icon: "mdi-lightning-bolt",
                    size: null,
                    iconColor: "yellow",
                    cssClass: null
                },
            ],
        },
        {
            text: "Mag Size",
            value: "BaseMagSize",
            icons: [
                {
                    icon: "mdi-magazine-rifle",
                    size: null,
                    iconColor: "orange",
                    cssClass: null
                },
            ],
        },
        {
            text: "Targeting Efficiency",
            value: "TargetingEfficiency",
            icons: [
                {
                    icon: "mdi-chart-bell-curve",
                    size: null,
                    iconColor: "green",
                    cssClass: null
                },
            ],
        },
        {
            text: "Optimal Range",
            value: "OptimalRange",
            icons: [
                {
                    icon: "mdi-target-account",
                    size: null,
                    iconColor: "light-green",
                    cssClass: null
                },
            ],
        },
        {
            text: "Effective Range",
            value: "EffectiveRange",
            icons: [
                {
                    icon: "mdi-code-brackets",
                    size: null,
                    iconColor: "light-green",
                    cssClass: null
                },
            ],
        },
        {
            text: "Critical Hit Chance",
            value: "BaseCriticalHitChance",
            icons: [
                {
                    icon: "mdi-flare",
                    size: null,
                    iconColor: "red",
                    cssClass: null
                },
            ],
        },
    ],
    weaponFrame1sHeaders: [
        {
            text: "Title",
            value: "Title",
            description: null,
            align: 'left',
            width: 200,
            icons: [],
            divider: true,
            sortable: false,
        },
        {
            text: "Weapon Frame Type",
            value: "WeaponFrameTypeText",
            description: null,
            align: 'center',
            width: 0,
            icons: [
                {
                    icon: "mdi-pistol",
                    size: null,
                    iconColor: "blue-grey",
                    cssClass: null
                },
            ],
            divider: true,
            sortable: false,
        },
        {
            text: "MP",
            value: "ModulePointsCost",
            description: null,
            align: 'center',
            width: 0,
            icons: [],
            divider: true,
            sortable: false,
        },
        {
            text: "Mass",
            value: "Mass",
            description: "Mass describes the overall mass of the Weapon Frame.",
            align: 'center',
            width: 0,
            icons: [
                {
                    icon: "mdi-weight",
                    size: null,
                    iconColor: null,
                    cssClass: null
                },
            ],
            divider: true,
            sortable: false,
        },
        {
            text: "Heat Capacity",
            value: "HeatCapacity",
            description: "Heat Capacity describes the amount of heat units the weapon frame can withstand. It contributes to the Total Heat Capacity of the spaceship.",
            align: 'center',
            width: 0,
            icons: [
                {
                    icon: "mdi-thermometer-alert",
                    size: null,
                    iconColor: "red",
                    cssClass: null
                },
            ],
            divider: true,
            sortable: false,
        },
        {
            text: "Power Level",
            value: "PowerLevelText",
            description: "Power Level describes the minimum required hull Weapon power level that this Weapon Frame is compatible with.",
            align: 'center',
            width: 0,
            icons: [
                {
                    icon: "mdi-lightning-bolt",
                    size: null,
                    iconColor: "yellow",
                    cssClass: null
                },
            ],
            divider: true,
            sortable: false,
        },
        {
            text: "Mag Size",
            value: "BaseMagSize",
            description: "Mag Size describes how many payloads this weapon frame can contain in it's magazine. All payloads are fired during a combat event.",
            align: 'center',
            width: 0,
            icons: [
                {
                    icon: "mdi-magazine-rifle",
                    size: null,
                    iconColor: "orange",
                    cssClass: null
                },
            ],
            divider: true,
            sortable: false,
        },
        {
            text: "Targeting Efficiency",
            value: "TargetingEfficiency",
            description: "Targeting Efficiency describes the weapon frame's highest intrinsic potential to successfully acquire a target.",
            align: 'center',
            width: 0,
            icons: [
                {
                    icon: "mdi-chart-bell-curve",
                    size: null,
                    iconColor: "green",
                    cssClass: null
                },
            ],
            divider: true,
            sortable: false,
        },
        {
            text: "Optimal Range",
            value: "OptimalRange",
            description: "Optimal Range describes the weapon frame's ideal distance at which it can acquire a target.",
            align: 'center',
            width: 0,
            icons: [
                {
                    icon: "mdi-target-account",
                    size: null,
                    iconColor: "light-green",
                    cssClass: null
                },
            ],
            divider: true,
            sortable: false,
        },
        {
            text: "Effective Range",
            value: "EffectiveRange",
            description: "Effective Range describes the distance around the weapon frame's Optimal Range at which it can still reliably acquire a target.",
            align: 'center',
            width: 0,
            icons: [
                {
                    icon: "mdi-code-brackets",
                    size: null,
                    iconColor: "light-green",
                    cssClass: null
                },
            ],
            divider: true,
            sortable: false,
        },
        {
            text: "Critical Hit Chance",
            value: "BaseCriticalHitChance",
            description: "Critical Hit Chance describes the possibility that the weapon frame will deliver a critically placed payload.",
            align: 'center',
            width: 0,
            icons: [
                {
                    icon: "mdi-flare",
                    size: null,
                    iconColor: "red",
                    cssClass: null
                },
            ],
            divider: true,
            sortable: false,
        },
        {
            text: "Description",
            value: "Description",
            description: null,
            align: 'center',
            width: 0,
            icons: [
                {
                    icon: null,
                    size: null,
                    iconColor: null,
                    cssClass: null
                },
            ],
            divider: false,
            sortable: false,
        },
    ],
    weaponFrame1sItemsPerPage: 6,
    weaponFrame1sPageSync: 1,
    weaponFrame1sPageCount: 1,
    weaponFrame1sSearch: "",
    weaponFrame1sSortBy: "",
    weaponFrame1sSortDesc: true,
    weaponFrame1sShowOnlyFeasible: false,
    payload1sSortOptions: [
        {
            text: "None",
            value: "",
            icons: [],
        },
        {
            text: "Title",
            value: "Title",
            icons: [],
        },
        {
            text: "Module Points Cost",
            value: "ModulePointsCost",
            icons: [],
        },
        {
            text: "Payload Type",
            value: "PayloadTypeText",
            icons: [
                {
                    icon: "mdi-bullet",
                    size: null,
                    iconColor: "blue-grey",
                    cssClass: null
                },
            ],
        },
        {
            text: "Weapon Frame Type",
            value: "WeaponFrameTypeText",
            icons: [
                {
                    icon: "mdi-pistol",
                    size: null,
                    iconColor: "blue-grey",
                    cssClass: null
                },
            ],
        },
        {
            text: "Power Level",
            value: "PowerLevelText",
            icons: [
                {
                    icon: "mdi-lightning-bolt",
                    size: null,
                    iconColor: "yellow",
                    cssClass: null
                },
            ],
        },
        {
            text: "Damage",
            value: "BaseDamage",
            icons: [
                {
                    icon: "mdi-heart-broken",
                    size: null,
                    iconColor: "pink",
                    cssClass: null
                },
            ],
        },
        {
            text: "Velocity",
            value: "Velocity",
            icons: [
                {
                    icon: "mdi-transfer-right",
                    size: null,
                    iconColor: "green",
                    cssClass: null
                },
            ],
        },
        {
            text: "Kinetic Damage Bias",
            value: "KineticDamageBias",
            icons: [
                {
                    icon: "mdi-ammunition",
                    size: null,
                    iconColor: null,
                    cssClass: null
                },
            ],
        },
        {
            text: "Energy Damage Bias",
            value: "EnergyDamageBias",
            icons: [
                {
                    icon: "mdi-heat-wave",
                    size: null,
                    iconColor: null,
                    cssClass: null
                },
            ],
        },
        {
            text: "Critical Hit Multiplier",
            value: "BaseCriticalHitMultiplier",
            icons: [
                {
                    icon: "mdi-flare",
                    size: null,
                    iconColor: "red",
                    cssClass: null
                },
                {
                    icon: "mdi-chevron-triple-up",
                    size: "small",
                    iconColor: "green",
                    cssClass: null
                },
                {
                    icon: "mdi-heart-broken",
                    size: null,
                    iconColor: "pink",
                    cssClass: null
                },
            ],
        },
    ],
    payload1sHeaders: [
        {
            text: "Title",
            value: "Title",
            description: null,
            align: 'left',
            width: 200,
            icons: [],
            divider: true,
            sortable: false,
        },
        {
            text: "MP",
            value: "ModulePointsCost",
            description: null,
            align: 'center',
            width: 0,
            icons: [],
            divider: true,
            sortable: false,
        },
        {
            text: "Payload Type",
            value: "PayloadTypeText",
            description: "Payload Type describes what kind of payload this is.",
            align: 'center',
            width: 0,
            icons: [
                {
                    icon: "mdi-bullet",
                    size: null,
                    iconColor: "blue-grey",
                    cssClass: null
                },
            ],
            divider: true,
            sortable: false,
        },
        {
            text: "Weapon Frame Type",
            value: "WeaponFrameTypeText",
            description: "Weapon Frame Type describes what kind of weapon frame this payload is compatable with.",
            align: 'center',
            width: 0,
            icons: [
                {
                    icon: "mdi-pistol",
                    size: null,
                    iconColor: "blue-grey",
                    cssClass: null
                },
            ],
            divider: true,
            sortable: false,
        },
        {
            text: "Power Level",
            value: "PowerLevelText",
            description: "Power Level describes the minimum required Weapon Frame Power Level this payload is compatible with.",
            align: 'center',
            width: 0,
            icons: [
                {
                    icon: "mdi-lightning-bolt",
                    size: null,
                    iconColor: "yellow",
                    cssClass: null
                },
            ],
            divider: true,
            sortable: false,
        },
        {
            text: "Damage",
            value: "BaseDamage",
            description: "Damage describes how much damage the payload will do if it hits the target.",
            align: 'center',
            width: 0,
            icons: [
                {
                    icon: "mdi-heart-broken",
                    size: null,
                    iconColor: "pink",
                    cssClass: null
                },
            ],
            divider: true,
            sortable: false,
        },
        {
            text: "Velocity",
            value: "Velocity",
            description: "Velocity describes how quickly the payload travels. It is a critical factor for combat at any given range.",
            align: 'center',
            width: 0,
            icons: [
                {
                    icon: "mdi-transfer-right",
                    size: null,
                    iconColor: "green",
                    cssClass: null
                },
            ],
            divider: true,
            sortable: false,
        },
        {
            text: "Kinetic Damage Bias",
            value: "KineticDamageBias",
            description: "Kinetic Damage Bias describes the portion of this payload's damage that is of Kinetic variety.",
            align: 'center',
            width: 0,
            icons: [
                {
                    icon: "mdi-ammunition",
                    size: null,
                    iconColor: null,
                    cssClass: null
                },
            ],
            divider: true,
            sortable: false,
        },
        {
            text: "Energy Damage Bias",
            value: "EnergyDamageBias",
            description: "Energy Damage Bias describes the portion of this payload's damage that is of Energy variety.",
            align: 'center',
            width: 0,
            icons: [
                {
                    icon: "mdi-heat-wave",
                    size: null,
                    iconColor: null,
                    cssClass: null
                },
            ],
            divider: true,
            sortable: false,
        },
        {
            text: "Critical Hit Multiplier",
            value: "BaseCriticalHitMultiplier",
            description: "Critical Hit Multiplier describes the proportional increase in damage if a critical hit occurs.",
            align: 'center',
            width: 0,
            icons: [
                {
                    order: 0,
                    icon: "mdi-flare",
                    size: null,
                    iconColor: "red",
                    cssClass: null
                },
                {
                    order: 2,
                    icon: "mdi-heart-broken",
                    size: null,
                    iconColor: "pink",
                    cssClass: null
                },
                {
                    order: 1,
                    icon: "mdi-chevron-triple-up",
                    size: "small",
                    iconColor: "green",
                    cssClass: null
                },
            ],
            divider: true,
            sortable: false,
        },
        {
            text: "Description",
            value: "Description",
            description: null,
            align: 'center',
            width: 0,
            icons: [
                {
                    icon: null,
                    size: null,
                    iconColor: null,
                    cssClass: null
                },
            ],
            divider: false,
            sortable: false,
        },
    ],
    payload1sItemsPerPage: 6,
    payload1sPageSync: 1,
    payload1sPageCount: 1,
    payload1sSearch: "",
    payload1sSortBy: "",
    payload1sSortDesc: true,
    payload1sShowOnlyFeasible: false,
    weaponFrame2sSortOptions: [
        {
            text: "None",
            value: "",
            icons: [],
        },
        {
            text: "Title",
            value: "Title",
            icons: [],
        },
        {
            text: "Weapon Frame Type",
            value: "WeaponFrameTypeText",
            icons: [
                {
                    icon: "mdi-pistol",
                    size: null,
                    iconColor: "blue-grey",
                    cssClass: null
                },
            ],
        },
        {
            text: "Module Points Cost",
            value: "ModulePointsCost",
            icons: [],
        },
        {
            text: "Mass",
            value: "Mass",
            icons: [
                {
                    icon: "mdi-weight",
                    size: null,
                    iconColor: null,
                    cssClass: null
                },
            ],
        },
        {
            text: "Power Level",
            value: "PowerLevelText",
            icons: [
                {
                    icon: "mdi-lightning-bolt",
                    size: null,
                    iconColor: "yellow",
                    cssClass: null
                },
            ],
        },
        {
            text: "Mag Size",
            value: "BaseMagSize",
            icons: [
                {
                    icon: "mdi-magazine-rifle",
                    size: null,
                    iconColor: "orange",
                    cssClass: null
                },
            ],
        },
        {
            text: "Targeting Efficiency",
            value: "TargetingEfficiency",
            icons: [
                {
                    icon: "mdi-chart-bell-curve",
                    size: null,
                    iconColor: "green",
                    cssClass: null
                },
            ],
        },
        {
            text: "Optimal Range",
            value: "OptimalRange",
            icons: [
                {
                    icon: "mdi-target-account",
                    size: null,
                    iconColor: "light-green",
                    cssClass: null
                },
            ],
        },
        {
            text: "Effective Range",
            value: "EffectiveRange",
            icons: [
                {
                    icon: "mdi-code-brackets",
                    size: null,
                    iconColor: "light-green",
                    cssClass: null
                },
            ],
        },
        {
            text: "Critical Hit Chance",
            value: "BaseCriticalHitChance",
            icons: [
                {
                    icon: "mdi-flare",
                    size: null,
                    iconColor: "red",
                    cssClass: null
                },
            ],
        },
    ],
    weaponFrame2sHeaders: [
        {
            text: "Title",
            value: "Title",
            description: null,
            align: 'left',
            width: 200,
            icons: [],
            divider: true,
            sortable: false,
        },
        {
            text: "Weapon Frame Type",
            value: "WeaponFrameTypeText",
            description: null,
            align: 'center',
            width: 0,
            icons: [
                {
                    icon: "mdi-pistol",
                    size: null,
                    iconColor: "blue-grey",
                    cssClass: null
                },
            ],
            divider: true,
            sortable: false,
        },
        {
            text: "MP",
            value: "ModulePointsCost",
            description: null,
            align: 'center',
            width: 0,
            icons: [],
            divider: true,
            sortable: false,
        },
        {
            text: "Mass",
            value: "Mass",
            description: "Mass describes the overall mass of the Weapon Frame.",
            align: 'center',
            width: 0,
            icons: [
                {
                    icon: "mdi-weight",
                    size: null,
                    iconColor: null,
                    cssClass: null
                },
            ],
            divider: true,
            sortable: false,
        },
        {
            text: "Heat Capacity",
            value: "HeatCapacity",
            description: "Heat Capacity describes the amount of heat units the weapon frame can withstand. It contributes to the Total Heat Capacity of the spaceship.",
            align: 'center',
            width: 0,
            icons: [
                {
                    icon: "mdi-thermometer-alert",
                    size: null,
                    iconColor: "red",
                    cssClass: null
                },
            ],
            divider: true,
            sortable: false,
        },
        {
            text: "Power Level",
            value: "PowerLevelText",
            description: "Power Level describes the minimum required hull Weapon power level that this Weapon Frame is compatible with.",
            align: 'center',
            width: 0,
            icons: [
                {
                    icon: "mdi-lightning-bolt",
                    size: null,
                    iconColor: "yellow",
                    cssClass: null
                },
            ],
            divider: true,
            sortable: false,
        },
        {
            text: "Mag Size",
            value: "BaseMagSize",
            description: "Mag Size describes how many payloads this weapon frame can contain in it's magazine. All payloads are fired during a combat event.",
            align: 'center',
            width: 0,
            icons: [
                {
                    icon: "mdi-magazine-rifle",
                    size: null,
                    iconColor: "orange",
                    cssClass: null
                },
            ],
            divider: true,
            sortable: false,
        },
        {
            text: "Targeting Efficiency",
            value: "TargetingEfficiency",
            description: "Targeting Efficiency describes the weapon frame's highest intrinsic potential to successfully acquire a target.",
            align: 'center',
            width: 0,
            icons: [
                {
                    icon: "mdi-chart-bell-curve",
                    size: null,
                    iconColor: "green",
                    cssClass: null
                },
            ],
            divider: true,
            sortable: false,
        },
        {
            text: "Optimal Range",
            value: "OptimalRange",
            description: "Optimal Range describes the weapon frame's ideal distance at which it can acquire a target.",
            align: 'center',
            width: 0,
            icons: [
                {
                    icon: "mdi-target-account",
                    size: null,
                    iconColor: "light-green",
                    cssClass: null
                },
            ],
            divider: true,
            sortable: false,
        },
        {
            text: "Effective Range",
            value: "EffectiveRange",
            description: "Effective Range describes the distance around the weapon frame's Optimal Range at which it can still reliably acquire a target.",
            align: 'center',
            width: 0,
            icons: [
                {
                    icon: "mdi-code-brackets",
                    size: null,
                    iconColor: "light-green",
                    cssClass: null
                },
            ],
            divider: true,
            sortable: false,
        },
        {
            text: "Critical Hit Chance",
            value: "BaseCriticalHitChance",
            description: "Critical Hit Chance describes the possibility that the weapon frame will deliver a critically placed payload.",
            align: 'center',
            width: 0,
            icons: [
                {
                    icon: "mdi-flare",
                    size: null,
                    iconColor: "red",
                    cssClass: null
                },
            ],
            divider: true,
            sortable: false,
        },
        {
            text: "Description",
            value: "Description",
            description: null,
            align: 'center',
            width: 0,
            icons: [
                {
                    icon: null,
                    size: null,
                    iconColor: null,
                    cssClass: null
                },
            ],
            divider: false,
            sortable: false,
        },
    ],
    weaponFrame2sItemsPerPage: 6,
    weaponFrame2sPageSync: 1,
    weaponFrame2sPageCount: 1,
    weaponFrame2sSearch: "",
    weaponFrame2sSortBy: "",
    weaponFrame2sSortDesc: true,
    weaponFrame2sShowOnlyFeasible: false,
    payload2sSortOptions: [
        {
            text: "None",
            value: "",
            icons: [],
        },
        {
            text: "Title",
            value: "Title",
            icons: [],
        },
        {
            text: "Module Points Cost",
            value: "ModulePointsCost",
            icons: [],
        },
        {
            text: "Payload Type",
            value: "PayloadTypeText",
            icons: [
                {
                    icon: "mdi-bullet",
                    size: null,
                    iconColor: "blue-grey",
                    cssClass: null
                },
            ],
        },
        {
            text: "Weapon Frame Type",
            value: "WeaponFrameTypeText",
            icons: [
                {
                    icon: "mdi-pistol",
                    size: null,
                    iconColor: "blue-grey",
                    cssClass: null
                },
            ],
        },
        {
            text: "Power Level",
            value: "PowerLevelText",
            icons: [
                {
                    icon: "mdi-lightning-bolt",
                    size: null,
                    iconColor: "yellow",
                    cssClass: null
                },
            ],
        },
        {
            text: "Damage",
            value: "BaseDamage",
            icons: [
                {
                    icon: "mdi-heart-broken",
                    size: null,
                    iconColor: "pink",
                    cssClass: null
                },
            ],
        },
        {
            text: "Velocity",
            value: "Velocity",
            icons: [
                {
                    icon: "mdi-transfer-right",
                    size: null,
                    iconColor: "green",
                    cssClass: null
                },
            ],
        },
        {
            text: "Kinetic Damage Bias",
            value: "KineticDamageBias",
            icons: [
                {
                    icon: "mdi-ammunition",
                    size: null,
                    iconColor: null,
                    cssClass: null
                },
            ],
        },
        {
            text: "Energy Damage Bias",
            value: "EnergyDamageBias",
            icons: [
                {
                    icon: "mdi-heat-wave",
                    size: null,
                    iconColor: null,
                    cssClass: null
                },
            ],
        },
        {
            text: "Critical Hit Multiplier",
            value: "BaseCriticalHitMultiplier",
            icons: [
                {
                    icon: "mdi-flare",
                    size: null,
                    iconColor: "red",
                    cssClass: null
                },
                {
                    icon: "mdi-chevron-triple-up",
                    size: "small",
                    iconColor: "green",
                    cssClass: null
                },
                {
                    icon: "mdi-heart-broken",
                    size: null,
                    iconColor: "pink",
                    cssClass: null
                },
            ],
        },
    ],
    payload2sHeaders: [
        {
            text: "Title",
            value: "Title",
            description: null,
            align: 'left',
            width: 200,
            icons: [],
            divider: true,
            sortable: false,
        },
        {
            text: "MP",
            value: "ModulePointsCost",
            description: null,
            align: 'center',
            width: 0,
            icons: [],
            divider: true,
            sortable: false,
        },
        {
            text: "Payload Type",
            value: "PayloadTypeText",
            description: "Payload Type describes what kind of payload this is.",
            align: 'center',
            width: 0,
            icons: [
                {
                    icon: "mdi-bullet",
                    size: null,
                    iconColor: "blue-grey",
                    cssClass: null
                },
            ],
            divider: true,
            sortable: false,
        },
        {
            text: "Weapon Frame Type",
            value: "WeaponFrameTypeText",
            description: "Weapon Frame Type describes what kind of weapon frame this payload is compatable with.",
            align: 'center',
            width: 0,
            icons: [
                {
                    icon: "mdi-pistol",
                    size: null,
                    iconColor: "blue-grey",
                    cssClass: null
                },
            ],
            divider: true,
            sortable: false,
        },
        {
            text: "Power Level",
            value: "PowerLevelText",
            description: "Power Level describes the minimum required Weapon Frame Power Level this payload is compatible with.",
            align: 'center',
            width: 0,
            icons: [
                {
                    icon: "mdi-lightning-bolt",
                    size: null,
                    iconColor: "yellow",
                    cssClass: null
                },
            ],
            divider: true,
            sortable: false,
        },
        {
            text: "Damage",
            value: "BaseDamage",
            description: "Damage describes how much damage the payload will do if it hits the target.",
            align: 'center',
            width: 0,
            icons: [
                {
                    icon: "mdi-heart-broken",
                    size: null,
                    iconColor: "pink",
                    cssClass: null
                },
            ],
            divider: true,
            sortable: false,
        },
        {
            text: "Velocity",
            value: "Velocity",
            description: "Velocity describes how quickly the payload travels. It is a critical factor for combat at any given range.",
            align: 'center',
            width: 0,
            icons: [
                {
                    icon: "mdi-transfer-right",
                    size: null,
                    iconColor: "green",
                    cssClass: null
                },
            ],
            divider: true,
            sortable: false,
        },
        {
            text: "Kinetic Damage Bias",
            value: "KineticDamageBias",
            description: "Kinetic Damage Bias describes the portion of this payload's damage that is of Kinetic variety.",
            align: 'center',
            width: 0,
            icons: [
                {
                    icon: "mdi-ammunition",
                    size: null,
                    iconColor: null,
                    cssClass: null
                },
            ],
            divider: true,
            sortable: false,
        },
        {
            text: "Energy Damage Bias",
            value: "EnergyDamageBias",
            description: "Energy Damage Bias describes the portion of this payload's damage that is of Energy variety.",
            align: 'center',
            width: 0,
            icons: [
                {
                    icon: "mdi-heat-wave",
                    size: null,
                    iconColor: null,
                    cssClass: null
                },
            ],
            divider: true,
            sortable: false,
        },
        {
            text: "Critical Hit Multiplier",
            value: "BaseCriticalHitMultiplier",
            description: "Critical Hit Multiplier describes the proportional increase in damage if a critical hit occurs.",
            align: 'center',
            width: 0,
            icons: [
                {
                    order: 0,
                    icon: "mdi-flare",
                    size: null,
                    iconColor: "red",
                    cssClass: null
                },
                {
                    order: 2,
                    icon: "mdi-heart-broken",
                    size: null,
                    iconColor: "pink",
                    cssClass: null
                },
                {
                    order: 1,
                    icon: "mdi-chevron-triple-up",
                    size: "small",
                    iconColor: "green",
                    cssClass: null
                },
            ],
            divider: true,
            sortable: false,
        },
        {
            text: "Description",
            value: "Description",
            description: null,
            align: 'center',
            width: 0,
            icons: [
                {
                    icon: null,
                    size: null,
                    iconColor: null,
                    cssClass: null
                },
            ],
            divider: false,
            sortable: false,
        },
    ],
    payload2sItemsPerPage: 6,
    payload2sPageSync: 1,
    payload2sPageCount: 1,
    payload2sSearch: "",
    payload2sSortBy: "",
    payload2sSortDesc: true,
    payload2sShowOnlyFeasible: false,
  },
  mutations: {
    setUser(state, userAuthToken) {
      localStorage.setItem("CelestialFrontierAuthToken", userAuthToken);
      state.user = new User(decode(userAuthToken));
      state.isAuthenticated = true;
    },
    resetUser(state) {
      localStorage.removeItem("CelestialFrontierAuthToken");
      state.user = new User();
      state.isAuthenticated = false;
    },
  },
  actions: {
    setUser(context, userAuthToken) {
      context.commit("setUser", userAuthToken);
    },
    resetUser(context) {
      context.commit("resetUser");
    },
  },
  getters: {
    user(state) {
      return state.user;
    },
    userAuthTokenIsValid(state) {
      console.log("state.user", state.user);
      const secondsSinceEpoch = Math.floor(new Date().getTime() / 1000);
      return state.user.exp < secondsSinceEpoch ? false : true;
    },
  },
  modules: {},
});

export default store;
