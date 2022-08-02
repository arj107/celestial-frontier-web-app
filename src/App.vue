<template>
    <v-app :dark="$vuetify.theme.dark?true:false">

        <v-navigation-drawer 
            v-if="isAuthenticated"
            v-model="leftNavOpen"
            clipped
            app 
            overflow
        >
            <v-list nav v-if="isAuthenticated" rounded dense>
                <v-list-item exact :to="{name: 'Home' }">
                    <v-list-item-icon>
                        <v-icon>mdi-home</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>
                            <span>Home</span>
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item exact :to="{path: '/fleet-builder'}">
                    <v-list-item-icon>
                        <v-icon>mdi-hammer-wrench</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>
                            <span>Fleet Builder</span>
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item exact :to="{path: '/configurations'}">
                    <v-list-item-icon>
                        <v-icon>mdi-file-cog-outline</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>
                            <span>Configurations</span>
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item exact :to="{path: '/logout'}">
                    <v-list-item-icon>
                        <v-icon color="red">mdi-power</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>
                            <span>Logout</span>
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

        <v-app-bar :clipped-left="true" app>
            <v-btn v-if="isAuthenticated" @click.stop="leftNavOpen = !leftNavOpen" icon>
                <v-icon>{{leftNavOpen?'mdi-backburger':'mdi-menu'}}</v-icon>
            </v-btn>
            <span v-if="$vuetify.breakpoint.smAndUp" class="headline font-weight-bold ml-1 mr-3">Celestial Frontier</span>
            <v-icon large>mdi-rocket-launch-outline</v-icon>
            <span class="caption font-weight-bold mr-3 ml-3">{{this.$route.name}}</span>
            <v-spacer></v-spacer>
            <v-avatar color="grey" v-if="isAuthenticated" class="ml-2 mr-2" size="45" @click="goToProfile()" style="cursor:pointer">
                <span class="title font-weight-bold white--text">{{$store.getters.user.username.charAt(0).toUpperCase()}}</span>
            </v-avatar>
            <v-btn v-if="isAuthenticated" @click.stop="rightPanelOpen = !rightPanelOpen" icon>
                <v-icon large color="grey">mdi-cog</v-icon>
            </v-btn>
            <!-- <v-btn icon @click.stop="$vuetify.theme.dark = !$vuetify.theme.dark">
                <v-icon large :color="$vuetify.theme.dark ? 'warning' : 'primary'">{{$vuetify.theme.dark?'mdi-weather-sunny':'mdi-weather-night'}}</v-icon>
            </v-btn> -->
        </v-app-bar>

        <v-main>
            <v-fade-transition leave-absolute group hide-on-leave>
                <router-view @show-snackbar="showSnackbar($event)" :key="1"></router-view>
                <v-container fluid class="fill-height" :key="2" v-if="$store.state.isLoading">
                    <v-layout wrap align-center justify-center>
                        <v-progress-circular 
                            indeterminate class="fill-height"
                            size="100" width="10" color="cfSecondary"
                        >
                            <v-icon large>mdi-rocket-launch-outline</v-icon>
                        </v-progress-circular>
                    </v-layout>
                </v-container>
            </v-fade-transition>
        </v-main>

        <v-navigation-drawer 
            v-if="isAuthenticated"
            v-model="rightPanelOpen"
            app right temporary
            overflow hide-overlay
            width="400"
        >
            <v-list nav v-if="isAuthenticated" rounded dense class="pa-0">
                <v-list-item>
                    <v-container fluid grid-list-md>
                        <v-layout wrap align-center>
                            <v-flex grow>
                                <span class="title">Settings</span>
                            </v-flex>
                            <v-flex shrink>
                                <v-btn @click.stop="rightPanelOpen = !rightPanelOpen" icon>
                                    <v-icon color="red">mdi-close</v-icon>
                                </v-btn>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-list-item>
                <v-divider/>
                <v-list-item>
                    <v-container fluid grid-list-md>
                        <v-layout wrap align-center>
                            <v-flex xs12>
                                <span class="subtitle-2 font-weight-bold">Theme</span>
                            </v-flex>
                            <v-flex grow>
                                <v-btn elevation="0"
                                    rounded block :color="!$vuetify.theme.dark ? 'cfPrimary' : ''"
                                    @click.stop="$vuetify.theme.dark = false"
                                >
                                    <v-layout wrap align-center>
                                        <v-flex grow class="text-left">
                                            <span class="text-capitalize">Light</span>
                                        </v-flex>
                                        <v-flex shrink>
                                            <v-icon color="warning">mdi-weather-sunny</v-icon>
                                        </v-flex>
                                    </v-layout>
                                </v-btn>
                            </v-flex>
                            <v-flex grow>
                                <v-btn elevation="0"
                                    rounded block :color="$vuetify.theme.dark ? 'cfPrimary' : ''"
                                    @click.stop="$vuetify.theme.dark = true"
                                >
                                    <v-layout wrap align-center>
                                        <v-flex grow class="text-left">
                                            <span class="text-capitalize">Dark</span>
                                        </v-flex>
                                        <v-flex shrink>
                                            <v-icon color="primary">mdi-weather-night</v-icon>
                                        </v-flex>
                                    </v-layout>
                                </v-btn>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-list-item>
                <v-divider/>
                <v-list-item>
                    <v-container fluid grid-list-md>
                        <v-layout wrap align-center>
                            <v-flex xs12>
                                <span class="subtitle-2 font-weight-bold">Presentation</span>
                            </v-flex>
                            <v-flex grow>
                                <v-btn elevation="0"
                                    rounded block :color="!$store.state.configurationsCondensedView ? 'cfPrimary' : ''"
                                    @click.stop="$store.state.configurationsCondensedView = false"
                                >
                                    <v-layout wrap align-center>
                                        <v-flex grow class="text-left">
                                            <span class="text-capitalize">Expanded</span>
                                        </v-flex>
                                        <v-flex shrink>
                                            <v-icon>mdi-view-module</v-icon>
                                        </v-flex>
                                    </v-layout>
                                </v-btn>
                            </v-flex>
                            <v-flex grow>
                                <v-btn elevation="0"
                                    rounded block :color="$store.state.configurationsCondensedView ? 'cfPrimary' : ''"
                                    @click.stop="$store.state.configurationsCondensedView = true"
                                >
                                    <v-layout wrap align-center>
                                        <v-flex grow class="text-left">
                                            <span class="text-capitalize">Condensed</span>
                                        </v-flex>
                                        <v-flex shrink>
                                            <v-icon>mdi-reorder-horizontal</v-icon>
                                        </v-flex>
                                    </v-layout>
                                </v-btn>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-list-item>
                <v-divider/>
                <v-list-item>
                    <v-container fluid grid-list-md>
                        <v-layout wrap align-center>
                            <v-flex xs12>
                                <span class="subtitle-2 font-weight-bold">Charts</span>
                            </v-flex>
                            <v-flex xs12>
                                <v-card outlined flat class="rounded-xl">
                                    <v-container fluid>
                                        <v-layout wrap align-center>
                                            <v-flex xs12>
                                                <v-switch v-model="$store.state.configurationsShowWeaponModelCharts"
                                                    hide-details color="cfPrimary" dense class="mt-0" label="Model Charts"
                                                ></v-switch>
                                            </v-flex>
                                            <v-flex xs12 class="pr-2" v-show="$store.state.configurationsShowWeaponModelCharts">
                                                <v-slider 
                                                    v-model="$store.state.configurationsWeaponModelChartsHeight" 
                                                    color="cfPrimary" label="Height"
                                                    min="200" max="400" step="5"
                                                    hide-details track-color="grey"
                                                ></v-slider>
                                            </v-flex>
                                        </v-layout>
                                    </v-container>
                                </v-card>
                            </v-flex>
                            <v-flex xs12>
                                <v-card outlined flat class="rounded-xl">
                                    <v-container fluid>
                                        <v-layout wrap align-center>
                                            <v-flex xs12>
                                                <v-switch v-model="$store.state.battlecruiserConfigurationsShowWeaponDamageCharts"
                                                    hide-details color="cfPrimary" dense class="mt-0" label="Damage Charts"
                                                ></v-switch>
                                            </v-flex>
                                            <v-flex xs12 class="pr-2" v-show="$store.state.battlecruiserConfigurationsShowWeaponDamageCharts">
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
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-list-item>
                <v-divider/>
            </v-list>
        </v-navigation-drawer>

        <v-footer app padless>
            <v-container class="pb-1 pt-1">
                <!-- <v-layout justify-center v-show="$vuetify.breakpoint.mdAndUp">
                    <v-flex xs12>
                        Testing google adsense
                        <div id="banner-ad" style="width: 728px; height: 90px; margin: 0 auto;">
                        </div>
                    </v-flex>
                </v-layout> -->
    
                <v-layout class="text-center" align-content-center>
                    <v-flex xs12>
                        <span class="caption font-weight-bold">&copy;{{ moment().format('YYYY') }} Blue Dot Studio - All Rights Reserved</span>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-footer>

        <v-snackbar v-model="snackbar.show" :timeout="8000" bottom :color="snackbar.color">
            {{snackbar.message}}
            <v-btn text @click="snackbar.show = false">
                Close
            </v-btn>
        </v-snackbar>
    </v-app>
</template>

<script>
    // TESTING GOOGLE ADSENSE
    // window.googletag.cmd.push(function() {
    //     window.googletag.display('banner-ad');
    // });

export default {
    name: "App",

    data: () => ({
        leftNavOpen: false,
        rightPanelOpen: false,
        snackbar: {
            show: false,
            message: '',
            color: ''
        },
    }),

    computed: {
        isAuthenticated() {
            return !!this.$store.state.isAuthenticated
        }
    },

    methods: {
        goToProfile() {
            if (this.$route.path !== '/your-profile') {
                this.$router.push({name: "Your Profile"})
            }
        },
        showSnackbar(event) {
            this.snackbar.message = event.message;
            this.snackbar.color = event.color;
            this.snackbar.show = event.show;
        }
    }
};
</script>

<style>

    .clickable-rows tbody tr {
        cursor: pointer
    }
    
    .rounded-table tr:first-child td:first-child{
        border-top-left-radius: 0px !important;
    }
    .rounded-table tr:first-child td:last-child{
        border-top-right-radius: 0px !important;
    }
    .rounded-table tr:last-child> td:first-child{
        border-bottom-left-radius: 24px !important;
    }
    .rounded-table tr:last-child > td:last-child{
        border-bottom-right-radius: 24px !important;
    }  
    .rounded-table tr.v-data-table__mobile-table-row:last-child{
        border-bottom-left-radius: 24px !important;
        border-bottom-right-radius: 24px !important;
    }
    
    .vigor-icon {
        transform: rotate(180deg);
    }
    
    /* for v-card components using rounded-xl class that specify an @click attribute  */
    .v-card--link:focus:before {
        border-radius: 24px !important;
    }
    .v-card--link:before {
        border-radius: 24px !important;
    }

    /* for v-card components specifying an @click attribute that should not show pointer cursor or background color when clicked */
    .no-click.v-card--link:before {
        background: none;
    }
    .no-click.v-card--link {
        cursor: default;
    }

    /* for v-card components on spaceships configurations to make the configuration stats sticky at the top*/
    .sticky-configuration {
        position: sticky !important;
        z-index: 100 !important;
        top: 4rem !important;
        /* cursor: move; */
    }
    /* for v-card components on weapon chart to make the charts sticky at the bottom*/
    .sticky-weapon-chart {
        position: sticky !important;
        z-index: 100 !important;
        bottom: 2rem !important;
        /* cursor: move; */
    }
</style>
