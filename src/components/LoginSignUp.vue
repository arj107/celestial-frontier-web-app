<template>
    <div>
        <v-layout wrap class="text-center" justify-center>
            <v-flex xs12>
                <!-- <img src="../../assets/logos/TheGolfGuildLogo4Green.png" :height="$vuetify.breakpoint.smAndUp?350:150" class="mb-n6 mt-n2"/> -->
                <!-- <v-icon :size="$vuetify.breakpoint.smAndUp?140:70">mdi-golf-tee</v-icon>
                <v-icon :size="$vuetify.breakpoint.smAndUp?150:80" color="red">mdi-flag-variant-outline</v-icon> -->
            </v-flex>
            <v-flex xs12>
                <span :class="$vuetify.breakpoint.smAndUp?'display-2':'headline'" class="font-weight-bold">
                    Welcome to The Golf Guild
                </span>
            </v-flex>
            <v-flex xs12>
                <div class="subheading font-weight-regular mb-1">
                    Want to learn more about your golf game? 
                    <br />
                    You've come to the right place.
                </div>
            </v-flex>
            <!-- <v-flex xs12>
                <span class="display-2 font-weight-bold">Coming Soon!</span>
            </v-flex> -->
            <v-flex xs12>
                <v-form v-model="valid">
                    <v-layout wrap class="text-center" justify-center>
                        <v-flex xs12 sm12 md10 xl8>
                            <v-text-field
                                v-model="email" 
                                outlined color="secondary" 
                                label="Email" type="email"
                                hide-details :rules="[required]"
                            >

                            </v-text-field>
                        </v-flex>
                        <v-flex v-if="signUpMode" xs6 sm6 md10 xl8>
                            <v-text-field
                                v-model="firstName" 
                                outlined 
                                color="secondary" 
                                label="First Name"
                                type="text"
                                hide-details :rules="[required]"
                            >

                            </v-text-field>
                        </v-flex>
                        <v-flex v-if="signUpMode" xs6 sm6 md10 xl8>
                            <v-text-field
                                v-model="lastName" 
                                outlined 
                                color="secondary" 
                                label="Last Name"
                                type="text"
                                hide-details :rules="[required]"
                            >

                            </v-text-field>
                        </v-flex>
                        <v-flex xs12 sm12 md10 xl8>
                            <v-text-field
                                v-model="password" 
                                outlined
                                color="secondary" 
                                label="Password"
                                @click:append="showPassword = !showPassword"
                                :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                                :type="showPassword ? 'text' : 'password'"
                                hide-details :rules="[required]" @focus="$event.target.select()"
                                @keyup.enter="login"
                            >

                            </v-text-field>
                        </v-flex>
                        <v-flex v-if="signUpMode" xs12 sm12 md10 xl8>
                            <v-text-field
                                v-model="confirmPassword" 
                                outlined 
                                color="secondary" 
                                label="Confirm Password"
                                @click:append="showPassword = !showPassword"
                                :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                                :type="showPassword ? 'text' : 'password'"
                                hide-details :rules="[passwordsMatch, required]" @focus="$event.target.select()"
                                @keyup.enter="signUp"
                            >

                            </v-text-field>
                        </v-flex>
                    </v-layout>
                </v-form>
            </v-flex>
            <v-flex xs12>
                <v-layout wrap class="text-center" justify-center>
                    <v-flex v-if="signUpMode" xs12 sm12 md10 xl8>
                        <v-btn block x-large color="light-green" class="white--text" @click="signUp" :disabled="!valid || email == '' || password == '' || confirmPassword == '' || firstName == '' || lastName == ''" :loading="loginSignUpLoading">
                            Sign Up
                        </v-btn>
                    </v-flex>
                    <v-flex v-if="!signUpMode" xs12 sm12 md10 xl8>
                        <v-btn block x-large color="light-green" class="white--text" @click="login" :disabled="!valid || email == '' || password == ''" :loading="loginSignUpLoading">
                            Login
                        </v-btn>
                    </v-flex>
                </v-layout>
            </v-flex>
            <v-flex xs12>
                <v-layout wrap class="text-center" justify-center>
                    <v-flex xs12 sm12 md10 xl8>
                        <v-divider/>
                    </v-flex>
                </v-layout>
            </v-flex>
            <v-flex xs12>
                <v-layout wrap class="text-center" justify-center>
                    <v-flex v-if="!signUpMode"  xs12 sm12 md10 xl8>
                        <v-btn outlined block large color="white--text" @click.stop="signUpMode = !signUpMode">
                            Need an Account?
                        </v-btn>
                    </v-flex>
                    <v-flex v-if="signUpMode" xs12 sm12 md10 xl8>
                        <v-btn outlined block large color="white--text" @click.stop="signUpMode = !signUpMode">
                            Already have an Account?
                        </v-btn>
                    </v-flex>
                </v-layout>
            </v-flex>
            <v-snackbar v-model="snackbar.show" :timeout="8000" bottom :color="snackbar.color">
                {{snackbar.message}}
                <v-btn text @click="snackbar.show = false">
                    Close
                </v-btn>
            </v-snackbar>
        </v-layout>
    </div>
</template>

<script>
import { UsersRepository } from '../repositories';

export default {
    name: "LoginSignUp",

    data: () => ({
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        showPassword: false,
        signUpMode: false,
        valid: false,

        loginSignUpLoading: false,

        snackbar: {
            show: false,
            message: '',
            color: ''
        },

        usersRepository: new UsersRepository(),

    }),

    watch: {
        signUpMode(newValue) {
            if (newValue) {
                this.confirmPassword = ''
            }
        }
    },

    computed: {
        passwordsMatch() {
            return (this.password == this.confirmPassword)
        },
        emailValid() {            
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(this.email)
        },
        required: value => !!value || 'Required.',
    },

    created() {
        this.login = this.$lodash.throttle(this.login, 1000);
    },

    methods: {
        login() {
            if (this.signUpMode) {
                return;
            }
            if (!this.valid || this.email == '' || this.password == '') {
                this.snackbar.message = 'Login failed. Please make sure your info is valid and try again.';
                this.snackbar.color = "red";
                this.snackbar.show = true;
                return;
            }
            this.loginSignUpLoading = true;
            this.usersRepository.login(this.email, this.password)
                .then((apiResponse) => {
                    console.log('apiResponse', apiResponse);
                    this.$store.dispatch('setUser', apiResponse.data.Token)
                        .then(() => {
                            this.$router.push('/');
                            this.loginSignUpLoading = false;
                        })
                })
                .catch((apiError) => {
                    this.loginSignUpLoading = false;
                    this.snackbar.message = 'Login failed. Please check your email and password and try again.';
                    this.snackbar.color = "red";
                    this.snackbar.show = true;
                    console.error('An unexpected error occurred. Login failed. ~ ' + apiError);
                    this.resetPasswords();
                })
        },
        signUp() {
            if (!this.valid || this.email == '' || this.password == '' || this.confirmPassword == '' || this.firstName == '' || this.lastName == '') {
                this.snackbar.message = 'Sign Up failed. Please make sure your info is valid and try again.';
                this.snackbar.color = "red";
                this.snackbar.show = true;
                return;
            }
            this.loginSignUpLoading = true;
            this.usersRepository.signUp(this.email, this.password, this.firstName, this.lastName)
                .then(() => {
                    this.resetNames();
                    this.resetPasswords();
                    this.loginSignUpLoading = false;
                    this.signUpMode = false;
                    this.snackbar.message = `You're signed up! Please re-type your password to login.`;
                    this.snackbar.color = "success";
                    this.snackbar.show = true;
                })
                .catch((apiError) => {
                    this.loginSignUpLoading = false;
                    this.snackbar.message = 'Sign Up failed. Please try again.';
                    this.snackbar.color = "red";
                    this.snackbar.show = true;
                    console.error('An unexpected error occurred. Sign Up failed. ~ ' + apiError);
                    this.resetPasswords();
                })
        },

        resetNames() {
            this.firstName = '';
            this.lastName = '';
        },
        resetCredentials() {
            this.email = '';
            this.password = '';
        },
        resetPasswords() {
            this.password = '';
            this.confirmPassword = '';
        }
    }
};
</script>
