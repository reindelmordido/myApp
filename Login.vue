<template>
    <v-container>
        <v-form @submit.prevent="login">
            <v-text-field v-model="email" label="Email" type="email" required></v-text-field>
            <v-text-field v-model="password" label="Password" type="password" required></v-text-field>
            <v-btn type="submit" color="primary">Login</v-btn>
        </v-form>
    </v-container>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            email: '',
            password: '',
        };
    },
    methods: {
        login() {
            axios.post('/login', { email: this.email, password: this.password })
                .then(() => {
                    this.$router.push('/');
                })
                .catch(error => {
                    console.error(error);
                });
        },
    },
};
</script>