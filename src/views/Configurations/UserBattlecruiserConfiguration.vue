<template>
    <v-container fluid v-show="!$store.state.isLoading">
        <v-layout wrap>
            <v-flex xs12>
                <v-card class="rounded-xl" outlined>
                    <v-layout wrap>
                        <v-flex xs12 v-if="battlecruiserConfiguration != null">
                            <battlecruiser-configuration v-on="$listeners"
                                :battlecruiserConfiguration="battlecruiserConfiguration"
                                @update="getUserBattlecruiserConfiguration"
                            ></battlecruiser-configuration>
                        </v-flex>
                    </v-layout>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import { mapState } from 'vuex';
import { BattlecruiserConfigurationRepository } from '../../repositories';
import BattlecruiserConfiguration from '../../components/Configurations/BattlecruiserConfiguration.vue';
import { BattlecruiserConfigurationModel } from '../../models/Configurations/BattlecruiserConfigurationModel';


export default {
    name: "UserBattlecruiserConfiguration",

    components: {
        BattlecruiserConfiguration
    },

    data: () => ({
        battlecruiserConfigurationRepository: new BattlecruiserConfigurationRepository(),
        battlecruiserConfiguration: null,
    }),

    computed: {
        ...mapState([
            'validationRules',
        ]),
    },

    methods: {
        getUserBattlecruiserConfiguration() {
            this.$store.state.isLoading = true;
            this.battlecruiserConfigurationRepository.getUserBattlecruiserConfiguration(this.$route.params.BattlecruiserConfigurationGuid)
                .then((apiResponse) => {
                    console.log('apiResponse', apiResponse);
                    this.battlecruiserConfiguration = new BattlecruiserConfigurationModel(apiResponse.data);
                    this.$store.state.isLoading = false;
                })
                .catch((apiError) => {
                    console.error(apiError)
                    this.$emit('show-snackbar', {
                        message: 'Failed to get your Battlecruiser Configuration. Please try again later',
                        color: 'red',
                        show: true
                    });
                    this.$store.state.isLoading = false;
                })
        },
    },

    created() {
        this.getUserBattlecruiserConfiguration();
    },

    mounted() {
        
    }
    
};
</script>

<style>
</style>
