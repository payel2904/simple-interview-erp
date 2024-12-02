import { ref } from "vue";
import store from "../../store";

export default function useProductList() {
    const products = ref([]);
    const product = ref({ id: null, name: "", sku: "", quantity: null, price: null, category_id: null });
    const isEditing = ref(false);
    const isValid = ref({
        name: true,
        sku: true,
        price: true,
        quantity: true,
        category_id: true,
    })

    const validateForm = () => {
        isValid.value.name = !!product.value.name;
        isValid.value.sku = !!product.value.sku;
        isValid.value.price = !!product.value.price;
        isValid.value.quantity = !!product.value.quantity;
        isValid.value.category_id = !!product.value.category_id;

        return isValid.value.name && isValid.value.sku && isValid.value.price && isValid.value.quantity && isValid.value.category_id;
    };

    const fetchProducts = async (page = 1) => {
        try {
            await store.dispatch("product/fetchProducts", page).then(res => {
                const { status, data, message } = res
                if (status) {
                    products.value = data
                    return
                }
                product.value = []
                alert(message)
            })
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    const resetForm = () => {
        product.value = { id: null, name: "", sku: "", quantity: null, price: null, category_id: null };
        isEditing.value = false;
    };

    const saveProduct =  () => {
        if (!validateForm()) {
            return;
        }

            if (isEditing.value) {

                store.dispatch("product/updateProduct", product.value)
                    .then(res => {
                        const { status, message } = res
                        if (+status) {
                            alert("Product updated successfully!");
                            return
                        }
                        alert("Failed To Update Product")
                    }).catch(error => {
                        console.log(error)
                    })
            } else {
                store.dispatch("product/addProduct", product.value)
                    .then(res => {
                        const { status, data, message } = res
                        if (status) {
                            alert("Product added successfully!");
                            return
                        }
                        alert("Failed To Add Product")
                    })
            }
            resetForm();
            fetchProducts();
    };

    const deleteProduct = async (id) => {
        if (confirm("Are you sure you want to delete this product?")) {
            try {
                await store.dispatch("product/deleteProduct", id)
                    .then(res => {
                        const { status, message } = res
                        if (status) {
                            alert("Product deleted successfully!");
                            return
                        }

                        alert("Failed To deleted Product")
                    })
                await fetchProducts();
            } catch (error) {
                console.error("Error deleting product:", error);
            }
        }
    };

    const editProduct = (item) => {
        product.value = { ...item };
        isEditing.value = true;
    };


    return {
        isValid,
        products,
        product,
        isEditing,
        fetchProducts,
        saveProduct,
        deleteProduct,
        editProduct,
        resetForm,
    };
}
