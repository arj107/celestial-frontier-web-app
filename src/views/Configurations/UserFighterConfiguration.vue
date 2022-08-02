<template>
    <v-container fluid v-show="!$store.state.isLoading">
        <v-layout wrap>
            <v-flex xs12>
                <v-card class="rounded-xl" outlined>
                    <v-layout wrap>
                        <v-flex xs12 v-if="fighterConfiguration != null">
                            <fighter-configuration v-on="$listeners"
                                :fighterConfiguration="fighterConfiguration"
                                @update="getUserFighterConfiguration"
                            ></fighter-configuration>
                        </v-flex>
                    </v-layout>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import { mapState } from 'vuex';
import { FighterConfigurationRepository } from '../../repositories';
import FighterConfiguration from '../../components/Configurations/FighterConfiguration.vue';
import { FighterConfigurationModel } from '../../models/Configurations/FighterConfigurationModel';


export default {
    name: "UserFighterConfiguration",

    components: {
        FighterConfiguration
    },

    data: () => ({
        fighterConfigurationRepository: new FighterConfigurationRepository(),
        fighterConfiguration: null,
    }),

    computed: {
        ...mapState([
            'validationRules',
        ]),
    },

    methods: {
        getUserFighterConfiguration() {
            this.$store.state.isLoading = true;
            this.fighterConfigurationRepository.getUserFighterConfiguration(this.$route.params.FighterConfigurationGuid)
                .then((apiResponse) => {
                    console.log('apiResponse', apiResponse);
                    this.fighterConfiguration = new FighterConfigurationModel(apiResponse.data);
                    this.$store.state.isLoading = false;
                })
                .catch((apiError) => {
                    console.error(apiError)
                    this.$emit('show-snackbar', {
                        message: 'Failed to get your Fighter Configuration. Please try again later',
                        color: 'red',
                        show: true
                    });
                    this.$store.state.isLoading = false;
                })
        },
    },

    created() {
        this.getUserFighterConfiguration();
    },

    mounted() {
        
    }
    
};
</script>

<style>
</style>
