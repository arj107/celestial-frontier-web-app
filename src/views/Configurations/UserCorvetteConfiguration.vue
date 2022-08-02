<template>
    <v-container fluid v-show="!$store.state.isLoading">
        <v-layout wrap>
            <v-flex xs12>
                <v-card class="rounded-xl" outlined>
                    <v-layout wrap>
                        <v-flex xs12 v-if="corvetteConfiguration != null">
                            <corvette-configuration v-on="$listeners"
                                :corvetteConfiguration="corvetteConfiguration"
                                @update="getUserCorvetteConfiguration"
                            ></corvette-configuration>
                        </v-flex>
                    </v-layout>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import { mapState } from 'vuex';
import { CorvetteConfigurationRepository } from '../../repositories';
import CorvetteConfiguration from '../../components/Configurations/CorvetteConfiguration.vue';
import { CorvetteConfigurationModel } from '../../models/Configurations/CorvetteConfigurationModel';


export default {
    name: "UserCorvetteConfiguration",

    components: {
        CorvetteConfiguration
    },

    data: () => ({
        corvetteConfigurationRepository: new CorvetteConfigurationRepository(),
        corvetteConfiguration: null,
    }),

    computed: {
        ...mapState([
            'validationRules',
        ]),
    },

    methods: {
        getUserCorvetteConfiguration() {
            this.$store.state.isLoading = true;
            this.corvetteConfigurationRepository.getUserCorvetteConfiguration(this.$route.params.CorvetteConfigurationGuid)
                .then((apiResponse) => {
                    console.log('apiResponse', apiResponse);
                    this.corvetteConfiguration = new CorvetteConfigurationModel(apiResponse.data);
                    this.$store.state.isLoading = false;
                })
                .catch((apiError) => {
                    console.error(apiError)
                    this.$emit('show-snackbar', {
                        message: 'Failed to get your Corvette Configuration. Please try again later',
                        color: 'red',
                        show: true
                    });
                    this.$store.state.isLoading = false;
                })
        },
    },

    created() {
        this.getUserCorvetteConfiguration();
    },

    mounted() {
        
    }
    
};
</script>

<style>
</style>
