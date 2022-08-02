<template>
    <v-container fluid v-show="!$store.state.isLoading">
        <v-layout wrap>
            <v-flex xs12>
                <v-card class="rounded-xl" outlined>
                    <v-layout wrap>
                        <v-flex xs12 v-if="destroyerConfiguration != null">
                            <destroyer-configuration v-on="$listeners"
                                :destroyerConfiguration="destroyerConfiguration"
                                @update="getUserDestroyerConfiguration"
                            ></destroyer-configuration>
                        </v-flex>
                    </v-layout>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import { mapState } from 'vuex';
import { DestroyerConfigurationRepository } from '../../repositories';
import DestroyerConfiguration from '../../components/Configurations/DestroyerConfiguration.vue';
import { DestroyerConfigurationModel } from '../../models/Configurations/DestroyerConfigurationModel';


export default {
    name: "UserDestroyerConfiguration",

    components: {
        DestroyerConfiguration
    },

    data: () => ({
        destroyerConfigurationRepository: new DestroyerConfigurationRepository(),
        destroyerConfiguration: null,
    }),

    computed: {
        ...mapState([
            'validationRules',
        ]),
    },

    methods: {
        getUserDestroyerConfiguration() {
            this.$store.state.isLoading = true;
            this.destroyerConfigurationRepository.getUserDestroyerConfiguration(this.$route.params.DestroyerConfigurationGuid)
                .then((apiResponse) => {
                    console.log('apiResponse', apiResponse);
                    this.destroyerConfiguration = new DestroyerConfigurationModel(apiResponse.data);
                    this.$store.state.isLoading = false;
                })
                .catch((apiError) => {
                    console.error(apiError)
                    this.$emit('show-snackbar', {
                        message: 'Failed to get your Destroyer Configuration. Please try again later',
                        color: 'red',
                        show: true
                    });
                    this.$store.state.isLoading = false;
                })
        },
    },

    created() {
        this.getUserDestroyerConfiguration();
    },

    mounted() {
        
    }
    
};
</script>

<style>
</style>
