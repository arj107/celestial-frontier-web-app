<template>
    <v-container fluid grid-list-lg>
        <v-layout wrap justify-center>
            <v-flex xs12 sm6 md5>
                <LoginSignUp></LoginSignUp>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
// @ is an alias to /src
import LoginSignUp from "@/components/LoginSignUp.vue";

export default {
    name: "Login",
    components: {
        LoginSignUp
    },

    data: () => ({
        
    })
  
};

</script>
