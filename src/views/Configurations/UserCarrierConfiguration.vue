<template>
    <v-container fluid v-show="!$store.state.isLoading">
        <v-layout wrap>
            <v-flex xs12>
                <v-card class="rounded-xl" outlined>
                    <v-layout wrap>
                        <v-flex xs12 v-if="carrierConfiguration != null">
                            <carrier-configuration v-on="$listeners"
                                :carrierConfiguration="carrierConfiguration"
                                @update="getUserCarrierConfiguration"
                            ></carrier-configuration>
                        </v-flex>
                    </v-layout>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import { mapState } from 'vuex';
import { CarrierConfigurationRepository } from '../../repositories';
import CarrierConfiguration from '../../components/Configurations/CarrierConfiguration.vue';
import { CarrierConfigurationModel } from '../../models/Configurations/CarrierConfigurationModel';


export default {
    name: "UserCarrierConfiguration",

    components: {
        CarrierConfiguration
    },

    data: () => ({
        carrierConfigurationRepository: new CarrierConfigurationRepository(),
        carrierConfiguration: null,
    }),

    computed: {
        ...mapState([
            'validationRules',
        ]),
    },

    methods: {
        getUserCarrierConfiguration() {
            this.$store.state.isLoading = true;
            this.carrierConfigurationRepository.getUserCarrierConfiguration(this.$route.params.CarrierConfigurationGuid)
                .then((apiResponse) => {
                    console.log('apiResponse', apiResponse);
                    this.carrierConfiguration = new CarrierConfigurationModel(apiResponse.data);
                    this.$store.state.isLoading = false;
                })
                .catch((apiError) => {
                    console.error(apiError)
                    this.$emit('show-snackbar', {
                        message: 'Failed to get your Carrier Configuration. Please try again later',
                        color: 'red',
                        show: true
                    });
                    this.$store.state.isLoading = false;
                })
        },
    },

    created() {
        this.getUserCarrierConfiguration();
    },

    mounted() {
        
    }
    
};
</script>

<style>
</style>
