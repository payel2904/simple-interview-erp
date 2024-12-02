import axios from "axios";
import { HTTP } from "../../utils/http.js";

export const productInitialState = {
    loading: false,
    submit: false,
    products: [],
};

export default {
    namespaced: true,
    state: JSON.parse(JSON.stringify(productInitialState)),
    getters: {
        productsByCategory: (state) => (categoryId) =>
            state.products.filter((product) => product.category_id === categoryId),
        specificProduct: (state) => (id) =>
            state.products.find((product) => product.id === id),
    },
    mutations: {
        LOADING(state, payload) {
            state.loading = payload;
        },
        SUBMIT(state, payload) {
            state.submit = payload;
        },
        LOAD_PRODUCTS(state, payload) {
            // Ensure payload is an array
            state.products = Array.isArray(payload) ? payload : [];
        },
        ADD_PRODUCT(state, payload) {
            state.products = [payload, ...state.products];
        },
        UPDATE_PRODUCT(state, { id, data }) {
            state.products = state.products.map((item) => {
                if (item.id === id) return data;
                return item;
            });
        },
        DELETE_PRODUCT(state, payload) {
            state.products = state.products.filter((item) => item.id !== payload);
        },
    },

    actions: {
        fetchProducts({ commit }, page) {
            commit("LOADING", true);
            const url = page ? `${HTTP.baseURL}api/products?page=${page}` : `${HTTP.baseURL}api/products`
            return new Promise((resolve, reject) => {
                axios
                    .get(url)
                    .then((response) => {
                        const { status, data } = response.data;
                        if (status) commit("LOAD_PRODUCTS", data);
                        resolve(response.data);
                    })
                    .catch((error) => {
                        console.error("Error fetching products:", error);
                        reject(error);
                    })
                    .finally(() => {
                        commit("LOADING", false);
                    });
            });
        },

        addProduct({ commit }, productData) {
            commit("SUBMIT", true);
            return new Promise((resolve, reject) => {
                axios
                    .post(`${HTTP.baseURL}api/products`, productData)
                    .then((response) => {
                        const { status, data } = response.data;
                        if (status) {
                            commit("ADD_PRODUCT", data);
                            resolve(response.data);
                        }
                    })
                    .catch((error) => {
                        console.error("Error adding product:", error);
                        reject(error);
                    })
                    .finally(() => {
                        commit("SUBMIT", false);
                    });
            });
        },

        updateProduct({ commit }, { id, ...productData }) {
            commit("SUBMIT", true);
            return new Promise((resolve, reject) => {
                axios
                    .put(`${HTTP.baseURL}api/products/${id}`, productData)
                    .then((response) => {
                        const { status, data } = response.data;
                        if (status) {
                            commit("UPDATE_PRODUCT", { id, data });
                            console.log(response.data)
                            resolve(response.data);
                        }
                    })
                    .catch((error) => {
                        console.error("Error updating product:", error);
                        reject(error);
                    })
                    .finally(() => {
                        console.log("fo")
                        commit("SUBMIT", false);
                    });
            });
        },

        deleteProduct({ commit }, id) {
            return new Promise((resolve, reject) => {
                axios
                    .delete(`${HTTP.baseURL}api/products/${id}`)
                    .then((response) => {
                        const { status } = response.data;
                        if (status) {
                            commit("DELETE_PRODUCT", id);
                            resolve(response.data);
                        }
                    })
                    .catch((error) => {
                        console.error("Error deleting product:", error);
                        reject(error);
                    });
            });
        },
    },
};
