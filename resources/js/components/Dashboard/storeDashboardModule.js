import axios from "axios";
import { HTTP } from "../../utils/http.js";

export const dashboardInitialState = {
    loading: false,
    submit: false,
    dashboard: [],
};

export default {
    namespaced: true,
    state: JSON.parse(JSON.stringify(dashboardInitialState)),
    getters: {},
    mutations: {
        LOADING(state, payload) {
            state.loading = payload;
        },
        LOAD_DASHBOARD(state, payload) {
            state.dashboard = payload;
        },
    },
    actions: {
        fetchDashboard({ commit }) {
            commit("LOADING", true);
            return new Promise((resolve, reject) => {
                axios
                    .get(`${HTTP.baseURL}api/dashboard`)
                    .then((response) => {
                        const { status, data } = response.data;
                        if (status) commit("LOAD_DASHBOARD", data);
                        resolve(response.data);
                    })
                    .catch((error) => {
                        console.error("Error fetching dashboard:", error);
                        reject(error);
                    })
                    .finally(() => {
                        commit("LOADING", false);
                    });
            });
        },
    },
};
