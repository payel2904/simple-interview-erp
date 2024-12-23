import { createStore } from 'vuex';
import storeCategoryModule from "../components/Category/storeCategoryModule.js";
import storeProductModule from "../components/Product/storeProductModule.js";
import storeDashboardModule from "../components/Dashboard/storeDashboardModule.js";
export default createStore({

    state: {
        token: localStorage.getItem('token') || '' ,
        isAuthenticated: false
    },

    mutations: {

        UpdateAuthenticationStatus (state, status) {
            state.isAuthenticated = status;
        },

        UpdateAuthStatus(state, status) {
            state.isAuthenticated = status;
        },

        UpdateToken(state, token) {
            state.token = token
            localStorage.setItem('token', token)
        },

        resetAuth(state) {
            state.token = null
            state.isAuthenticated = false
        }

    },

    actions: {

        checkUserAuthenticationStatus( {commit} ) {
            axios.get('api/authenticated')
                .then( response => {
                    commit('UpdateAuthenticationStatus', response.data.status)
                })
                .catch(error => {
                })

        },

        SetAuthStatus( {commit}, status ) {
         commit('UpdateAuthStatus', status);
        },

        setAuthToken({commit}, token) {
            commit('UpdateToken', token)
        },

        logout({commit}) {

            commit('resetAuth')

            localStorage.removeItem('token')

            delete axios.defaults.headers.common['Authorization']

        }

    },

    getters: {
        authStatus: state => state.isAuthenticated
    },

    modules: {
        category: storeCategoryModule,
        product: storeProductModule,
        dashboard: storeDashboardModule,
    },
});
