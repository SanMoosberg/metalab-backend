const Booking = {
    data() {
        return {
            currentWeek: '',
            weekDates: [],
            timeSlots: {},
            bookings: {},
            isAdmin: false,
            isAuthenticated: false,
            client: null,
            showNotification: false,
            notificationText: '',
            notificationType: '',
            timeIntervals: []
        };
    },
    async created() {
        const token = localStorage.getItem("jwtToken");
        if (token) {
            this.isAuthenticated = true;
            const profileResponse = await axios.get("/api/auth/profile", {
                headers: { Authorization: `Bearer ${token}` },
            });
            this.client = profileResponse.data;
            this.isAdmin = profileResponse.data.role === "ADMIN";
        }

        for (let hour = 8; hour < 18; hour++) {
            this.timeIntervals.push(
                `${hour.toString().padStart(2, '0')}:00`,
                `${hour.toString().padStart(2, '0')}:30`
            );
        }
        this.setCurrentWeek(new Date());
    },
    methods: {
        setCurrentWeek(date) {
            const curr = new Date(date);
            const first = curr.getDate() - curr.getDay() + 1; // Monday (locale-dependent)
            this.weekDates = Array(7).fill().map((_, i) => {
                const day = new Date(curr.setDate(first + i));
                return this.formatDate(day);
            });

            this.loadWeekSlots();
        },
        formatDate(date) {
            return date.toISOString().split('T')[0];
        },
        canCancelBooking(slot) {
            if (!slot || slot.status !== 'BOOKED' || !this.client) {
                return false;
            }
            const booking = this.bookings[slot.id];
            if (!booking) {
                return false;
            }
            return booking.clientId === this.client.id;
        },
        async loadWeekSlots() {
            this.bookings = {};
            for (const date of this.weekDates) {
                try {
                    const response = await axios.get(`/api/main/slots`, {
                        params: { date: date }
                    });
                    const slots = response.data;
                    for (const slot of slots) {
                        if (slot.status === 'BOOKED') {
                            try {
                                const bookingResponse = await axios.get(`/api/main/bookings/${slot.id}`);
                                const booking = bookingResponse.data;
                                this.$set(this.bookings, slot.id, booking);
                            } catch (error) {
                                console.error(`Error getting booking for slot ${slot.id}:`, error);
                            }
                        }
                    }
                    this.$set(this.timeSlots, date, slots);
                } catch (error) {
                    console.error(`Error getting slots for date ${date}:`, error);
                }
            }
        },
        async generateSlots(date) {
            try {
                await axios.post(`/api/main/slots/generate`, null, {
                    params: { date: date }
                });

                const response = await axios.get(`/api/main/slots`, { params: { date: date } });
                this.timeSlots[date] = response.data;
                this.showToast('Slots generated successfully', 'success');
            } catch (error) {
                console.error('Error generating slots:', error);
                this.showToast('Error generating slots', 'error');
            }
        },
        async blockSlot(slotId) {
            try {
                await axios.post(`/api/main/slots/${slotId}/block`);
                this.showToast('Slot blocked', 'success');
                await this.loadWeekSlots();
            } catch (error) {
                console.error('Error blocking slot:', error);
                this.showToast('Error blocking slot', 'error');
            }
        },
        async bookSlot(slotId) {
            if (!this.isAuthenticated) {
                this.$router.push('/login');
                return;
            }
            try {
                const response = await axios.post(`/api/main/book`, null, {
                    params: {
                        slotId: slotId,
                        clientId: this.client.id
                    }
                });
                const booking = response.data;
                this.$set(this.bookings, slotId, booking);
                this.showToast('Time booked successfully', 'success');
                await this.loadWeekSlots();
            } catch (error) {
                console.error('Error during booking:', error);
                this.showToast('Error during booking', 'error');
            }
        },
        async cancelBooking(bookingId) {
            try {
                await axios.delete(`/api/main/bookings/${bookingId}`);
                this.showToast('Booking cancelled', 'success');
                await this.loadWeekSlots();
            } catch (error) {
                console.error('Error cancelling booking:', error);
                this.showToast('Error cancelling booking', 'error');
            }
        },
        showToast(text, type) {
            this.notificationText = text;
            this.notificationType = type;
            this.showNotification = true;
            setTimeout(() => {
                this.showNotification = false;
            }, 3000);
        },
        getSlotForTime(time, date) {
            const slots = this.timeSlots[date] || [];
            return slots.find(slot => slot.startTime.slice(0, 5) === time);
        },
        navigateWeek(direction) {
            const firstDate = new Date(this.weekDates[0]);
            firstDate.setDate(firstDate.getDate() + (direction * 7));
            this.setCurrentWeek(firstDate);
        },
        formatDayDate(dateStr) {
            const date = new Date(dateStr);
            const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            return `${days[date.getDay()]}, ${date.getDate()}`;
        },
        isToday(dateStr) {
            const today = this.formatDate(new Date());
            return dateStr === today;
        },
        isPastDate(dateStr) {
            const today = this.formatDate(new Date());
            return dateStr < today;
        }
    },
    template: `
        <div class="booking-container">
            <!-- Notification -->
            <div v-if="showNotification" 
                 :class="['notification', notificationType]">
                {{ notificationText }}
            </div>

            <div class="week-navigation">
                <button @click="navigateWeek(-1)" class="nav-btn">
                    <i class="fas fa-chevron-left"></i> Previous Week
                </button>
                <h2>{{ formatDayDate(weekDates[0]) }} - {{ formatDayDate(weekDates[6]) }}</h2>
                <button @click="navigateWeek(1)" class="nav-btn">
                    Next Week <i class="fas fa-chevron-right"></i>
                </button>
            </div>

            <div class="weekly-calendar">
                <div class="calendar-header">
                    <div class="time-column"></div>
                    <div v-for="date in weekDates" 
                         :key="date" 
                         :class="['date-column', { 
                             'today': isToday(date),
                             'past-date': isPastDate(date)
                         }]">
                        <div class="date-header">
                            {{ formatDayDate(date) }}
                            <button v-if="isAdmin && !isPastDate(date)" 
                                    @click="generateSlots(date)"
                                    class="generate-slots-btn">
                                Generate Times
                            </button>
                        </div>
                    </div>
                </div>

                <div class="calendar-body">
                    <div v-for="time in timeIntervals" 
                         :key="time" 
                         class="time-row">
                        <div class="time-label">{{ time }}</div>
                        <div v-for="date in weekDates" 
                             :key="date"
                             class="slot-cell">
                            <div v-if="getSlotForTime(time, date)"
                                 :class="['time-slot', {
                                     'free': getSlotForTime(time, date).status === 'FREE',
                                     'booked': getSlotForTime(time, date).status === 'BOOKED',
                                     'blocked': getSlotForTime(time, date).status === 'ADMIN_BLOCKED'
                                 }]">
                                <div class="slot-content">
                                    <span class="slot-time">{{ time }}</span>
                                    <div class="slot-actions" v-if="!isPastDate(date)">
                                        <button 
                                            v-if="isAdmin && getSlotForTime(time, date).status === 'FREE'"
                                            @click="blockSlot(getSlotForTime(time, date).id)"
                                            class="block-btn">
                                            Block
                                        </button>
                                        <button 
                                            v-else-if="getSlotForTime(time, date).status === 'FREE' && isAuthenticated"
                                            @click="bookSlot(getSlotForTime(time, date).id)"
                                            class="book-btn">
                                            Book
                                        </button>
                                        <button 
                                            v-else-if="getSlotForTime(time, date).status === 'BOOKED' && canCancelBooking(getSlotForTime(time, date))"
                                            @click="cancelBooking(bookings[getSlotForTime(time, date).id].id)"
                                            class="cancel-btn">
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
};
