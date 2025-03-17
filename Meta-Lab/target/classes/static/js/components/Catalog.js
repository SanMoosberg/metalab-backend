const Catalog = {
    data() {
        return {
            client: null,
            products: [],
            isAdmin: false,
            isAuthenticated: false,
            isEditing: false,
            newProduct: {
                name: "",
                description: "",
                price: 0
            },
            showNotification: false,
            notificationText: '',
            notificationType: ''
        };
    },
    async created() {
        const response = await axios.get("/api/products");
        this.products = response.data;

        const token = localStorage.getItem("jwtToken");
        if (token) {
            this.isAuthenticated = true;
            const profileResponse = await axios.get("/api/auth/profile", {
                headers: { Authorization: `Bearer ${token}` },
            });
            this.client = profileResponse.data;
            this.isAdmin = profileResponse.data.role === "ADMIN";
        }
    },
    methods: {
        async addOrEditProduct() {
            try {
                const token = localStorage.getItem("jwtToken");

                if (this.isEditing) {
                    await axios.patch(`/api/products/${this.newProduct.id}`, this.newProduct, {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                } else {
                    await axios.post("/api/products", this.newProduct, {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                }

                this.newProduct = {id: null, name: "", description: "", price: 0};
                this.isEditing = false;

                const response = await axios.get("/api/products");
                this.products = response.data;
            } catch (error) {
                alert("Error: " + (error.response?.data?.message || error));
            }
        },
        startEditing(product) {
            this.newProduct = {...product};
            this.isEditing = true;
        },
        cancelEditing() {
            this.newProduct = {id: null, name: "", description: "", price: 0};
            this.isEditing = false;
        },
        async deleteProduct(id) {
            if (confirm("Are you sure you want to delete this test?")) {
                try {
                    const token = localStorage.getItem("jwtToken");
                    await axios.delete(`/api/products/${id}`, {
                        headers: { Authorization: `Bearer ${token}` },
                    });

                    const response = await axios.get("/api/products");
                    this.products = response.data;
                } catch (error) {
                    alert("Error deleting test: " + (error.response?.data?.message || error));
                }
            }
        },
        async fetchUserProfile() {
            try {
                const response = await axios.get('/api/auth/profile');
                this.client = response.data;
            } catch (error) {
                console.error("Error loading profile:", error);
            }
        },
        isProductPurchased(productId) {
            return this.client?.productList?.some(p => p.id === productId) || false;
        },
        async buyProduct(clientId, productId) {
            if (this.isProductPurchased(productId)) {
                this.showToast('This test is already purchased', 'error');
                return;
            }

            try {
                const token = localStorage.getItem("jwtToken");

                const response = await axios.post(`/api/clients/${clientId}/${productId}`, {}, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (response.status >= 200 && response.status < 300) {
                    this.showToast('✓ Test added to cart', 'success');
                } else {
                    this.showToast('✗ Error adding test (unexpected status)', 'error');
                }

                await this.fetchUserProfile();
            } catch (error) {
                console.error("Error adding test:", error);
                this.showToast('✗ Error adding test', 'error');
            }
        },
        async removeOrder(clientId, productId) {
            try {
                const token = localStorage.getItem("jwtToken");
                await axios.delete(`api/clients/${clientId}/${productId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                this.showToast('✓ Test removed from cart', 'success');
                await this.fetchUserProfile();
            } catch (error) {
                console.error("Error removing test:", error);
                this.showToast('✗ Error removing test', 'error');
            }
        },
        showToast(text, type) {
            this.notificationText = text;
            this.notificationType = type;
            this.showNotification = true;
            setTimeout(() => {
                this.showNotification = false;
            }, 3000);
        }
    },
    template: `
    <div class="catalog-container">
        <div v-if="showNotification" 
             :class="['notification', notificationType]">
            {{ notificationText }}
        </div>

        <div v-if="isAdmin" class="admin-panel">
            <h2>Admin Panel</h2>
            <div class="add-product-form">
                <input v-model="newProduct.name" placeholder="Test name">
                <textarea v-model="newProduct.description" placeholder="Description"></textarea>
                <input v-model="newProduct.price" type="number" step="0.01" placeholder="Price">
                
                <button @click="addOrEditProduct" class="admin-button">
                    {{ isEditing ? "Update Test" : "Add Test" }}
                </button>
                
                <button v-if="isEditing" @click="cancelEditing" class="cancel-button">
                    Cancel
                </button>
            </div>
        </div>

        <div class="analysis-grid">
            <div v-for="product in products" :key="product.id" class="analysis-item">
                <div class="product-status" :class="{ 
                    show: isProductPurchased(product.id),
                    purchased: isProductPurchased(product.id) 
                }">
                    {{ isProductPurchased(product.id) ? 'Purchased' : '' }}
                </div>
                <div class="analysis-content">
                    <div class="analysis-info">
                        <h2>{{ product.name }}</h2>
                        <p>{{ product.description }}</p>
                    </div>
                    <div class="analysis-footer">
                        <span class="price">{{ Number(product.price).toFixed(2) }} €</span>
                        <div class="analysis-actions">
                            <div v-if="isAuthenticated" class="action-buttons">
                                <button class="buy-button" 
                                        title="Add test"
                                        @click="buyProduct(client.id, product.id)">
                                </button>
                                <button class="remove-button" 
                                        title="Remove test"
                                        @click="removeOrder(client.id, product.id)">
                                </button>
                            </div>
                            <div v-if="isAdmin" class="admin-actions">
                                <button class="edit-button" @click="startEditing(product)">
                                    Edit
                                </button>
                                <button class="delete-button" @click="deleteProduct(product.id)">
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `
};
