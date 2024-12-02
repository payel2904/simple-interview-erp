<template>
    <div>
        <nav class="navbar navbar-expand-lg bg-body-tertiary bg-dark border-bottom border-body" data-bs-theme="dark">
            <div class="container-fluid">
                <a class="navbar-brand" href="/">Simple ERP</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">

                        <li class="nav-item" v-if="isAuthenticated">
                            <router-link to="/dashboard" class="nav-link" aria-current="page">Dashboard</router-link>
                        </li>
                        <li class="nav-item" v-else>
                            <router-link to="/" class="nav-link" aria-current="page">Home</router-link>
                        </li>

                        <li class="nav-item" v-if="isAuthenticated">
                            <router-link to="/products" class="nav-link" aria-current="page">Product</router-link>
                        </li>
                        <li class="nav-item" v-if="isAuthenticated">
                            <router-link to="/category" class="nav-link" aria-current="page">Category</router-link>
                        </li>

                    </ul>
                    <form class="d-flex" role="search">
                        <a v-if="isAuthenticated" @click="logout" class="btn btn-outline-danger">Logout</a> &nbsp;
                        <router-link v-if="!isAuthenticated" to="/login" class="btn btn-outline-primary">Login</router-link> &nbsp;
                        <router-link v-if="!isAuthenticated" to="/register" class="btn btn-outline-primary">Register</router-link>
                    </form>
                </div>
            </div>
        </nav>
    </div>

    <router-view></router-view>

</template>

<script>

import { mapGetters } from 'vuex';
import axios from '../axios.js'


export default {

    computed: {

        isAuthenticated() {
            return this.$store.state.isAuthenticated
            // return this.$store.getters.authStatus
        },

        authToken() {
            return this.$store.state.token
        }

        // ...mapGetters({
        //     isAuthenticated: 'authStatus'
        // })

    },

    mounted() {
        this.$store.dispatch('dashboard/fetchDashboard')
        this.$store.dispatch('checkUserAuthenticationStatus')
        this.$store.dispatch('category/fetchCategories')
        this.$store.dispatch('product/fetchProducts')
    },

    methods: {

        logout() {
            axios.post('api/logout')
                .then(response => {

                    this.$store.dispatch('logout')

                    this.$router.push({
                        name: 'login'
                    })

                 })
                .catch(error => {
                 })
        }

    }

}

</script>
