<template>
    <v-card outlined class="rounded-xl">
        <v-data-table  mobile-breakpoint="0"
            :headers="fleetsHeaders"
            :items="fleets" dense
            hide-default-footer 
            @click:row="viewFleet"
            class="clickable-rows rounded-table"
        >
            <template v-slot:top>
                <v-container fluid>
                    <v-layout wrap align-center>
                        <v-flex grow>
                            <span class="headline font-weight-bold">Your Fleets</span>
                        </v-flex>
                        <v-flex shrink v-if="!newFleetMode">
                            <v-btn fab small color="cfPrimary" @click.stop="newFleetMode = !newFleetMode">
                                <v-icon>mdi-plus</v-icon>
                            </v-btn>
                        </v-flex>
                    </v-layout>
                    <v-layout wrap align-center v-if="newFleetMode">
                        <v-flex grow>
                            <v-text-field
                                v-model="newFleet.Name" :rules="[$store.state.validationRules.required, $store.state.validationRules.upTo50Chars]"
                                label="New Fleet Name" dense counter clearable
                                outlined color="cfPrimary"
                            >
                            </v-text-field>
                        </v-flex>
                        <v-flex shrink>
                            <v-btn fab small color="green" @click.stop="createUserFleet">
                                <v-icon>mdi-check</v-icon>
                            </v-btn>
                        </v-flex>
                        <v-flex shrink>
                            <v-btn fab small color="red" @click.stop="newFleetMode = !newFleetMode">
                                <v-icon>mdi-close</v-icon>
                            </v-btn>
                        </v-flex>
                    </v-layout>
                </v-container>
                <v-divider></v-divider>
            </template>
            <template v-slot:item.User="{ item }">
                <span class="font-weight-medium" tile flat>
                    {{item.User.Username}}
                </span>
            </template>
            <template v-slot:item.Name="{ item }">
                <span class="font-weight-medium" tile flat>
                    {{item.Name}}
                </span>
            </template>
            <template v-slot:item.FleetFighters="{ item }">
                <span class="font-weight-medium" tile flat>
                    {{item.FleetFighters.length}}
                </span>
            </template>
            <template v-slot:item.FleetCorvettes="{ item }">
                <span class="font-weight-medium" tile flat>
                    {{item.FleetCorvettes.length}}
                </span>
            </template>
            <template v-slot:item.FleetFrigates="{ item }">
                <span class="font-weight-medium" tile flat>
                    {{item.FleetFrigates.length}}
                </span>
            </template>
            <template v-slot:item.FleetDestroyers="{ item }">
                <span class="font-weight-medium" tile flat>
                    {{item.FleetDestroyers.length}}
                </span>
            </template>
            <!-- <template v-slot:item.Actions="{ item }">
                <span class="font-weight-medium" tile flat>
                    {{item.FleetGuid}}
                </span>
            </template> -->
        </v-data-table>
    </v-card>
</template>

<script>
import { mapState } from 'vuex';
import { FleetRepository } from '../../repositories';
import { UsersRepository } from '../../repositories';
import { NewFleet } from '../../models/Fleets/NewFleet';


export default {
    name: 'UserFleetList',

    components: {
        
    },

    created() {
        this.getUserFleets();
    },

    mounted() {
        
    },
    methods: {
        viewFleet(fleet) {
            this.$router.push({path: `${this.$router.history.current.path}/${fleet.FleetGuid}`});
        },
        getUserFleets() {
            this.$store.state.isLoading = true;
            this.fleetRepository.getUserFleets()
                .then((apiResponse) => {
                    console.log('apiResponse', apiResponse);
                    this.fleets = apiResponse.data;
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
        fleetRepository: new FleetRepository(),
        usersRepository: new UsersRepository(),

        newFleetMode: false,
        fleets: [],
        selectedFleet: null,
        newFleet: new NewFleet(),

        fleetsHeaders: [
            // text: string
            // value: string
            // align?: 'start' | 'center' | 'end'
            // sortable?: boolean
            // filterable?: boolean
            // divider?: boolean
            // class?: string | string[]
            // width?: string | number
            // filter?: (value: any, search: string, item: any) => boolean
            // sort?: (a: any, b: any) => number
            {
                text: "User",
                value: "User",
                align: "left",
                divider: true,
                class:'subtitle-1 font-weight-bold'
            },
            {
                text: "Name",
                value: "Name",
                align: "left",
                divider: true,
                class:'subtitle-1 font-weight-bold'
            },
            {
                text: "Fighters",
                value: "FleetFighters",
                align: "center",
                divider: true,
                class:'subtitle-1 font-weight-bold'
            },
            {
                text: "Corvettes",
                value: "FleetCorvettes",
                align: "center",
                divider: true,
                class:'subtitle-1 font-weight-bold'
            },
            {
                text: "Frigates",
                value: "FleetFrigates",
                align: "center",
                divider: true,
                class:'subtitle-1 font-weight-bold'
            },
            {
                text: "Destroyers",
                value: "FleetDestroyers",
                align: "center",
                divider: false,
                class:'subtitle-1 font-weight-bold'
            },
            // {
            //     text: "Actions",
            //     value: "FleetGuid",
            //     align: "center",
            //     divider: false,
            //     width:'0',
            //     class:'subtitle-1 font-weight-bold'
            // },
        ],
    }),
    computed: {
        ...mapState([
            'validationRules',
        ]),
    }
}
</script>