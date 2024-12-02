<template>
    <div class="container mt-2">
        <div class="row">
            <div class="col-sm-6">
                <div class="card bg-info">
                    <div class="card-body">
                        <div class="row text-white">
                            <div class="col-sm-8">
                                <h4>
                                Product
                                </h4>
                            </div>
                            <div class="col-sm-4">

                                <h4>{{ dashboard.totalProducts }}</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-sm-6">
                <div class="card bg-primary">
                    <div class="card-body">
                        <div class="row text-white">
                            <div class="col-sm-8">
                                <h4>
                                Category
                                </h4>
                            </div>
                            <div class="col-sm-4">

                                <h4>{{ dashboard.totalCategories }}</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import store from "../../store/index.js";
import {ref} from "vue";

  export default {

    data() {

     return {
        user: null
     }

    },

    mounted() {
        this.getUserDetails();
    },

    methods: {

        getUserDetails() {
            axios.get('api/user')
                .then( response => {
                    this.user = response.data
                })
                .catch( error => {

                });
        }

    },
      setup() {
        const dashboard = ref([])
          const fetchDashboard = async () => {
            await store.dispatch('dashboard/fetchDashboard')
                .then(res => {
                    const { status, data } = res
                    if (status) {
                        dashboard.value = data
                        return
                    }
                    dashboard.value = []
                })
          }
          fetchDashboard()
          return {
            dashboard
          }
      }

  }

</script>
