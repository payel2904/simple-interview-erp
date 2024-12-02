<template>
    <div class="container mt-2">
        <div class="row">
            <!-- Table Data -->
            <div class="col-sm-8">
                <div class="card">
                    <div class="card-body">
                        <table class="table table-striped">
                            <thead>
                            <tr>
                                <th>S/N</th>
                                <th>Name</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="(item, index) in categories" :key="item.id">
                                <td>{{ index + 1 }}</td>
                                <td>{{ item.name }}</td>
                                <td>
                                    <button
                                        type="button"
                                        class="btn btn-outline-info"
                                        @click="editCategory(item)"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        type="button"
                                        class="btn btn-outline-danger"
                                        @click="deleteCategory(item.id)"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <!-- Add/Edit Category Form -->
            <div class="col-sm-4">
                <div class="card">
                    <div class="card-body">
                        <h5>{{ isEditing ? "Edit Category" : "Add Category" }}</h5>
                        <input
                            type="text"
                            class="form-control mb-2"
                            v-model="category.name"
                            placeholder="Category Name"
                        />
                        <button
                            type="button"
                            class="btn btn-primary w-100"
                            @click="saveCategory"
                        >
                            {{ isEditing ? "Update" : "Add" }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import useCategoryList from "./useCategoryList.js";

export default {
    setup() {
        const {
            categories,
            category,
            isEditing,
            fetchCategories,
            saveCategory,
            deleteCategory,
            editCategory,
        } = useCategoryList();

        fetchCategories();

        return {
            categories,
            category,
            isEditing,
            fetchCategories,
            saveCategory,
            deleteCategory,
            editCategory,
        };
    },
};
</script>
