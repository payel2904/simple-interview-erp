import axios from 'axios'
import { HTTP } from '../../utils/http.js'

export const categoryInitialState = {
    loading: true,
    submit: false,
    categories: [],
}

export default {
    namespaced: true,
    state: JSON.parse(JSON.stringify(categoryInitialState)),
    getters: {
    },
    mutations: {
        LOADING(state, payload) {
            state.loading = payload
        },
        SUBMIT(state, payload) {
            state.submit = payload
        },
        LOAD_CATEGORIES(state, payload) {
            state.categories = payload
        },
        ADD_CATEGORY(state, payload) {
            state.categories = [...[payload], ...state.categories]
        },
        UPDATE_CATEGORY(state, { id, data }) {
            state.categories = state.categories.map(item => {
                if (item.id === id) return data
                return item
            }) || []
        },
        DELETE_CATEGORY(state, payload) {
            state.categories = state.categories.filter(item => item.id !== payload) || []
        },
    },
    actions: {
        fetchCategories({ commit }) {
            return new Promise((resolve, reject) => {
                axios
                    .get(`${HTTP.baseURL}api/category`)
                    .then(response => {
                        const { status, data } = response.data
                        if (status) commit('LOAD_CATEGORIES', data)
                        resolve(response.data)
                    })
                    .catch(error => reject(error))
                    .finally(() => { commit('LOADING', false) })
            })
        },
        addCategory({ commit }, categoryData) {
            commit('SUBMIT', true)
            return new Promise((resolve, reject) => {
                axios
                    .post(`${HTTP.baseURL}api/category`, categoryData)
                    .then(response => {
                        const { status, data } = response.data
                        if (status) commit('ADD_CATEGORY', data)
                        resolve(response.data)
                    })
                    .catch(error => reject(error))
                    .finally(() => { commit('SUBMIT', false) })
            })
        },
        updateCategory({ commit }, { id, ...categoryData }) {
            commit('SUBMIT', true)
            return new Promise((resolve, reject) => {
                axios
                    .put(`${HTTP.baseURL}api/category/${id}`, categoryData)
                    .then(response => {
                        const { status, data } = response.data
                        if (status) commit('UPDATE_CATEGORY', { id, data })
                        resolve(response.data)
                    })
                    .catch(error => reject(error))
                    .finally(() => { commit('SUBMIT', false) })
            })
        },
        deleteCategory({ commit }, id) {
            return new Promise((resolve, reject) => {
                axios
                    .delete(`${HTTP.baseURL}api/category/${id}`)
                    .then(response => {
                        const { status } = response.data
                        if (status) commit('DELETE_CATEGORY', id)
                        resolve(response.data)
                    })
                    .catch(error => reject(error))
                    .finally(() => { commit('SUBMIT', false) })
            })
        },
    },
}
