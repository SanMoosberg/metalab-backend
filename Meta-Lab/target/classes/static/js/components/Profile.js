const Profile = {
    data() {
        return {
            client: null,
            booking: null,
            showNotification: false,
            notificationText: '',
            notificationType: ''
        };
    },
    methods: {
        async fetchUserProfile() {
            try {
                const response = await axios.get('/api/auth/profile');
                this.client = response.data;
                if (this.client && this.client.id) {
                    await this.fetchUserBooking(this.client.id);
                }
            } catch (error) {
                console.error('Error loading profile:', error);
            }
        },
        async fetchUserBooking(clientId) {
            try {
                const response = await axios.get(`/api/main/bookings/by-client/${clientId}`);
                if (response.data && typeof response.data === 'object' && response.data.id) {
                    this.booking = response.data;
                } else {
                    this.booking = null;
                }
            } catch (error) {
                console.error('Error loading booking:', error);
                this.booking = null;
            }
        },
        async cancelBooking(bookingId) {
            try {
                await axios.delete(`/api/main/bookings/${bookingId}`);
                this.showToast('Booking cancelled', 'success');
                this.booking = null;
            } catch (error) {
                console.error('Error cancelling booking:', error);
                this.showToast('Error cancelling booking', 'error');
            }
        },
        logout() {
            localStorage.removeItem('jwtToken');
            delete axios.defaults.headers.common['Authorization'];
            this.$root.updateAuthState();
            this.$router.push('/login');
        },
        showToast(text, type) {
            this.notificationText = text;
            this.notificationType = type;
            this.showNotification = true;
            setTimeout(() => {
                this.showNotification = false;
            }, 3000);
        },
        formatDate(dateStr) {
            if (!dateStr) return '';
            try {
                const date = new Date(dateStr);
                return date.toLocaleDateString('en-US');
            } catch (e) {
                console.error('Date formatting error:', e);
                return dateStr;
            }
        },
        formatTime(timeStr) {
            if (!timeStr) return '';
            try {
                return timeStr.substring(0, 5);
            } catch (e) {
                console.error('Time formatting error:', e);
                return timeStr;
            }
        }
    },
    computed: {
        calculateTotal() {
            if (!this.client || !this.client.productList) return "0.00";
            const total = this.client.productList.reduce((sum, product) => sum + Number(product.price), 0);
            return total.toFixed(2);
        },
        hasBooking() {
            return this.booking !== null;
        }
    },
    mounted() {
        this.fetchUserProfile();
    },
    template: `
        <div class="profile-container">
            <div v-if="showNotification" 
                 :class="['notification', notificationType]">
                {{ notificationText }}
            </div>

            <div class="profile-wrapper">
                <div class="profile-card">
                    <div class="profile-header">
                        <h2>My Account</h2>
                    </div>
                    
                    <div v-if="client" class="profile-content">
                        <div class="profile-info-section">
                            <div class="profile-avatar">
                                <div class="avatar-circle">
                                    {{ client.username.charAt(0).toUpperCase() }}
                                </div>
                            </div>
                            
                            <div class="profile-info">
                                <div class="info-group">
                                    <label>Username</label>
                                    <p>{{ client.username }}</p>
                                </div>
                                <div class="info-group">
                                    <label>Email</label>
                                    <p>{{ client.email }}</p>
                                </div>
                            </div>
                        </div>
                        
                        <div class="bookings-section">
                            <h3>My Booking</h3>
                            <div v-if="hasBooking" class="bookings-list">
                                <div class="booking-item">
                                    <div class="booking-info">
                                        <div class="booking-date">
                                            {{ booking.timeSlot ? formatDate(booking.timeSlot.date) : 'Date not specified' }}
                                        </div>
                                        <div class="booking-time">
                                            {{ booking.timeSlot ? formatTime(booking.timeSlot.startTime) + ' - ' + formatTime(booking.timeSlot.endTime) : 'Time not specified' }}
                                        </div>
                                    </div>
                                    <button @click="cancelBooking(booking.id)" 
                                            class="cancel-booking-btn">
                                        Cancel
                                    </button>
                                </div>
                            </div>
                            <div v-else class="empty-bookings">
                                <i class="fas fa-calendar-times"></i>
                                <p>You don't have any bookings yet</p>
                                <router-link to="/booking" class="book-time-btn">
                                    Book an Appointment
                                </router-link>
                            </div>
                        </div>
                        
                        <button @click="logout" class="logout-button">
                            Log Out
                        </button>
                    </div>
                </div>

                <div class="purchases-card">
                    <div class="purchases-header">
                        <h3>My Tests</h3>
                        <span class="purchases-count">{{ client && client.productList ? client.productList.length : 0 }}</span>
                    </div>
                    <div v-if="client && client.productList && client.productList.length > 0" class="purchases-list">
                        <div v-for="product in client.productList" 
                             :key="product.id" 
                             class="purchase-item">
                            <h4>{{ product.name }}</h4>
                            <span class="product-price">{{ Number(product.price).toFixed(2) }} €</span>
                        </div>
                    </div>
                    <div v-if="client && client.productList && client.productList.length > 0" class="purchases-total">
                        <span class="total-label">Total:</span>
                        <span class="total-amount">{{ calculateTotal }} €</span>
                    </div>
                    <div v-else class="empty-purchases">
                        <i class="fas fa-shopping-cart"></i>
                        <p>You don't have any purchased tests yet</p>
                        <router-link to="/catalog" class="browse-catalog-btn">
                            Browse Catalog
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    `
};
