<template>
    <v-container fluid v-show="!$store.state.isLoading">
        <v-layout wrap>
            <v-flex xs12>
                <v-card class="rounded-xl" outlined>
                    <v-layout wrap>
                        <v-flex xs12 v-if="frigateConfiguration != null">
                            <frigate-configuration v-on="$listeners"
                                :frigateConfiguration="frigateConfiguration"
                                @update="getUserFrigateConfiguration"
                            ></frigate-configuration>
                        </v-flex>
                    </v-layout>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import { mapState } from 'vuex';
import { FrigateConfigurationRepository } from '../../repositories';
import FrigateConfiguration from '../../components/Configurations/FrigateConfiguration.vue';
import { FrigateConfigurationModel } from '../../models/Configurations/FrigateConfigurationModel';


export default {
    name: "UserFrigateConfiguration",

    components: {
        FrigateConfiguration
    },

    data: () => ({
        frigateConfigurationRepository: new FrigateConfigurationRepository(),
        frigateConfiguration: null,
    }),

    computed: {
        ...mapState([
            'validationRules',
        ]),
    },

    methods: {
        getUserFrigateConfiguration() {
            this.$store.state.isLoading = true;
            this.frigateConfigurationRepository.getUserFrigateConfiguration(this.$route.params.FrigateConfigurationGuid)
                .then((apiResponse) => {
                    console.log('apiResponse', apiResponse);
                    this.frigateConfiguration = new FrigateConfigurationModel(apiResponse.data);
                    this.$store.state.isLoading = false;
                })
                .catch((apiError) => {
                    console.error(apiError)
                    this.$emit('show-snackbar', {
                        message: 'Failed to get your Frigate Configuration. Please try again later',
                        color: 'red',
                        show: true
                    });
                    this.$store.state.isLoading = false;
                })
        },
    },

    created() {
        this.getUserFrigateConfiguration();
    },

    mounted() {
        
    }
    
};
</script>

<style>
</style>
