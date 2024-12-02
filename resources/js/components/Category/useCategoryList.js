import axios from "axios";
import { ref } from "vue";
import store from "../../store";

export default function useCategoryList() {
    const categories = ref([]);
    const category = ref({ id: null, name: "" });
    const isEditing = ref(false);

    const fetchCategories = async () => {
        try {
            const response = await store.dispatch("category/fetchCategories")
                .then(res => {
                    const { status, data } = res
                    if (status) {
                        categories.value = data
                        return
                    }
                    category.value = []
                }).catch(error => {
                    console.log(error)
                })
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    const saveCategory = async () => {
        if (!category.value.name.trim()) {
            alert("Category name is required!");
            return;
        }

        try {
            if (isEditing.value) {
                // Edit category
                await store.dispatch(`category/updateCategory`, {
                    id: category.value.id,
                    name: category.value.name,
                })
                .then(res => {
                    const { status, message } = res
                    if (status) {
                        alert("Category updated successfully!");
                        return
                    }
                    alert(message)
                })
            } else {
                // Add category
                const response = await store.dispatch("category/addCategory", {
                    name: category.value.name,
                }).then(res => {
                    const { status, data, message } = res
                    if (status) {
                        categories.value.push(data)
                        alert("Category added successfully!");
                        return
                    }
                    return alert(message)
                })
            }

            resetForm();
            await fetchCategories();
        } catch (error) {
            console.error("Error saving category:", error);
        }
    };

    const deleteCategory = async (id) => {
        if (confirm("Are you sure you want to delete this category?")) {
            try {
                await store.dispatch(`category/deleteCategory`, id)
                .then(res => {
                    const { status, message } = res
                    if (status) {
                        alert("Category deleted successfully!");
                        return
                    }
                    alert(message)
                })
                await fetchCategories();
            } catch (error) {
                console.error("Error deleting category:", error);
            }
        }
    };

    // Edit a category
    const editCategory = (item) => {
        category.value = { ...item };
        isEditing.value = true;
    };

    // Reset the form
    const resetForm = () => {
        category.value = { id: null, name: "" };
        isEditing.value = false;
    };

    return {
        categories,
        category,
        isEditing,
        fetchCategories,
        saveCategory,
        deleteCategory,
        editCategory,
        resetForm,
    };
}
