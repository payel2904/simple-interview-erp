<template>
    <div class="container mt-2">
        <div class="row">
            <div class="col-sm-8">
                <div class="card">
                    <div class="card-body">
                        <h1>Product List</h1>
                        <div v-if="loading">Loading...</div>

                        <table v-if="!loading" class="table table-stripped">
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th>SKU</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Category</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="product in products.data" :key="product.id">
                                <td>{{ product.name }}</td>
                                <td>{{ product.sku }}</td>
                                <td>{{ product.quantity }}</td>
                                <td>{{ product.price }}</td>
                                <td>{{ product.category.name }}</td>
                                <td>
                                    <button class="btn btn-info m-1" @click="editProduct(product)">Edit</button>
                                    <button class="btn btn-danger" @click="deleteProduct(product.id)">Delete</button>
                                </td>
                            </tr>
                            </tbody>
                        </table>

                        <!-- Pagination Controls -->
                        <nav aria-label="Product pagination">
                            <ul class="pagination">
                                <li class="page-item" :class="{ disabled: !products.prev_page_url }">
                                    <button class="page-link" @click="fetchProducts(products.current_page - 1)" :disabled="!products.prev_page_url">Previous</button>
                                </li>
                                <li class="page-item" :class="{ disabled: !products.next_page_url }">
                                    <button class="page-link" @click="fetchProducts(products.current_page + 1)" :disabled="!products.next_page_url">Next</button>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
            <div class="col-sm-4">
                <div class="card">
                    <div class="card-header">
                        {{ isEditing ? "Edit Product" : "Add Product" }}
                    </div>
                    <div class="card-body">
                        <div>
                            <div class="form-group">
                                <label for="product_name">Name</label>
                                <input type="text" placeholder="Product Name" id="product_name" v-model="product.name" ref="product_name" class="form-control" :class="{'is-invalid': !isValid.name}">
                                <div v-if="!isValid.name" class="invalid-feedback">Product Name is required.</div>
                            </div>

                            <div class="form-group">
                                <label for="product_sku">SKU</label>
                                <input type="text" placeholder="Product SKU" id="product_sku" v-model="product.sku" ref="product_sku" class="form-control" :class="{'is-invalid': !isValid.sku}">
                                <div v-if="!isValid.sku" class="invalid-feedback">Product SKU is required.</div>
                            </div>

                            <div class="form-group">
                                <label for="product_quantity">Quantity</label>
                                <input type="number" min="1" placeholder="Product Quantity" id="product_quantity" v-model="product.quantity" ref="product_quantity" class="form-control" :class="{'is-invalid': !isValid.quantity}">
                                <div v-if="!isValid.quantity" class="invalid-feedback">Product Quantity is required.</div>
                            </div>

                            <div class="form-group">
                                <label for="product_price">Price</label>
                                <input type="number" min="1" placeholder="Product Price" id="product_price" v-model="product.price" ref="product_price" class="form-control" :class="{'is-invalid': !isValid.price}">
                                <div v-if="!isValid.price" class="invalid-feedback">Product Price is required.</div>
                            </div>

                            <div class="form-group">
                                <label for="product_category">Category</label>
                                <!-- Categories Dropdown -->
                                <select id="product_category" v-model="product.category_id" ref="product_category" class="form-control" :class="{'is-invalid': !isValid.category_id}" required>
                                    <option value="">--Select Category--</option>
                                    <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
                                </select>
                                <div v-if="!isValid.category_id" class="invalid-feedback">Category is required.</div>
                            </div>

                            <button class="btn btn-success" type="button" @click="saveProduct">{{ isEditing ? "Edit" : "Add" }}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import useProductList from './useProductList';
import store from "../../store/index.js";
import { onMounted } from  "vue"
export default {
    setup() {

        const {
            isValid,
            products,
            product,
            isEditing,
            loading,
            saveProduct,
            editProduct,
            deleteProduct,
            resetForm,
            fetchProducts,
        } = useProductList();

        const categories = store.state.category.categories;

        onMounted(() => {
            fetchProducts()
        })
        return {
            isValid,
            products,
            product,
            categories,
            isEditing,
            loading,

            fetchProducts,
            saveProduct,
            editProduct,
            deleteProduct,
            resetForm
        };
    }
};
</script>
