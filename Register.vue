<template>
    <v-container>
        <v-form @submit.prevent="register">
            <v-text-field v-model="name" label="Name" required></v-text-field>
            <v-text-field v-model="email" label="Email" type="email" required></v-text-field>
            <v-text-field v-model="password" label="Password" type="password" required></v-text-field>
            <v-text-field v-model="password_confirmation" label="Confirm Password" type="password"
                required></v-text-field>
            <v-btn type="submit" color="success">Register</v-btn>
        </v-form>
    </v-container>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            name: '',
            email: '',
            password: '',
            password_confirmation: '',
        };
    },
    methods: {
        register() {
            axios.post('/register', {
                name: this.name,
                email: this.email,
                password: this.password,
                password_confirmation: this.password_confirmation,
            })
                .then(() => {
                    this.$router.push('/login');
                })
                .catch(error => {
                    console.error(error);
                });
        },
    },
};
</script>