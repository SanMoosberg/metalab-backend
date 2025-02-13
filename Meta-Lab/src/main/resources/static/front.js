const Home = {
    template: `
        <div class="home-container">
            <section class="content-section beige">
                <div class="section-content">
                    <div class="text-block">
                        <h2>Современная лабораторная диагностика</h2>
                        <p>MetaLaboratory – это инновационный медицинский центр, оснащенный передовым оборудованием для проведения всех видов лабораторных исследований. Мы предлагаем широкий спектр анализов и диагностических процедур с максимальной точностью результатов.</p>
                        <button class="primary-button">Узнать больше</button>
                    </div>
                    <div class="image-block">
                        <img src="images/lab1.jpg" alt="Современная лаборатория">
                    </div>
                </div>
            </section>

            <section class="content-section white">
                <div class="section-content reverse">
                    <div class="text-block">
                        <h2>Широкий спектр исследований</h2>
                        <p>В нашей лаборатории вы можете пройти более 1000 видов различных исследований: от простого анализа крови до сложных генетических тестов. Мы используем современные методики и оборудование экспертного класса для обеспечения максимальной точности результатов.</p>
                        <button class="primary-button">Смотреть каталог</button>
                    </div>
                    <div class="image-block">
                        <img src="images/lab2.jpg" alt="Лабораторные исследования">
                    </div>
                </div>
            </section>

            <section class="content-section light-pink">
                <div class="section-content">
                    <div class="text-block">
                        <h2>Экспертная команда специалистов</h2>
                        <p>Наши врачи и лаборанты – профессионалы высочайшего класса с многолетним опытом работы. Мы постоянно повышаем квалификацию и внедряем новейшие методики исследований для обеспечения максимальной точности результатов.</p>
                    </div>
                    <div class="image-block">
                        <img src="images/lab3.jpg" alt="Команда специалистов">
                    </div>
                </div>
            </section>

            <section class="content-section white">
                <div class="section-content reverse">
                    <div class="text-block">
                        <h2>Комфорт и безопасность</h2>
                        <p>Мы создали максимально комфортные условия для наших пациентов. Современное оборудование, уютные помещения и внимательный персонал сделают ваше посещение приятным и безопасным. Результаты исследований доступны в личном кабинете сразу после готовности.</p>
                    </div>
                    <div class="image-block">
                        <img src="images/lab4.jpg" alt="Комфортные условия">
                    </div>
                </div>
            </section>
        </div>
    `
};

const About = {
    template: `
        <div class="about-container">
            <section class="about-section">
                <div class="about-content">
                    <h3>Наша история</h3>
                    <p>MetaLaboratory начала свою работу в 2010 году как небольшая частная лаборатория. За прошедшие годы мы выросли в современный диагностический центр, оснащенный передовым оборудованием и укомплектованный командой высококвалифицированных специалистов.</p>
                </div>
                <div class="about-image">
                    <img src="images/about-lab-1.jpg" alt="История лаборатории">
                </div>
            </section>

            <section class="about-section">
                <div class="about-image">
                    <img src="images/about-lab-2.jpg" alt="Миссия">
                </div>
                <div class="about-content">
                    <h3>Наша миссия</h3>
                    <p>Мы стремимся сделать высококачественную лабораторную диагностику доступной для каждого. Наша миссия - помогать врачам и пациентам получать точную и своевременную информацию о здоровье, используя передовые технологии и профессиональный опыт.</p>
                    <ul class="mission-list">
                        <li>Обеспечение высочайшего качества исследований</li>
                        <li>Внедрение инновационных методик</li>
                        <li>Постоянное совершенствование сервиса</li>
                        <li>Забота о здоровье каждого пациента</li>
                    </ul>
                </div>
            </section>

            <section class="about-section">
                <div class="about-content">
                    <h3>Наши цели</h3>
                    <p>Мы постоянно развиваемся и ставим перед собой амбициозные цели для улучшения качества медицинской диагностики в России.</p>
                    <ul class="mission-list">
                        <li>Внедрение новейших методов диагностики и автоматизации процессов</li>
                        <li>Расширение сети лабораторий и пунктов забора анализов</li>
                        <li>Развитие профессиональных компетенций медицинского персонала</li>
                        <li>Укрепление партнерских отношений с медицинскими учреждениями</li>
                    </ul>
                </div>
                <div class="about-image">
                    <img src="images/about-lab-3.jpg" alt="Наши цели">
                </div>
            </section>
        </div>
    `
};

const Catalog = {
    data() {
        return {
            products: [],
            newProduct: { name: "", description: "", price: 0 },
            isAdmin: false,
        };
    },
    async created() {
        const response = await axios.get("/api/products");
        this.products = response.data;

        const token = localStorage.getItem("jwtToken");
        if (token) {
            const profileResponse = await axios.get("/api/profile", {
                headers: { Authorization: `Bearer ${token}` },
            });
            this.isAdmin = profileResponse.data.role === "ADMIN";
        }
    },
    methods: {
        async addProduct() {
            try {
                const token = localStorage.getItem("jwtToken");
                await axios.post("/api/products", this.newProduct, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                this.newProduct = { name: "", description: "", price: 0 };
                const response = await axios.get("/api/products");
                this.products = response.data;
            } catch (error) {
                alert("Ошибка при добавлении продукта: " + error.response.data.message);
            }
        },
        async deleteProduct(id) {
            try {
                const token = localStorage.getItem("jwtToken");
                await axios.delete(`/api/products/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                // Обновляем список продуктов после удаления
                const response = await axios.get("/api/products");
                this.products = response.data;
            } catch (error) {
                alert("Ошибка при удалении продукта: " + (error.response?.data?.message || error.message));
            }
        },
        async buyProduct(product) {
            // Здесь будет логика покупки
            alert(`Заказ анализа "${product.name}" оформлен`);
        }
    },
    template: `
        <div class="catalog-container">
            <div class="products-grid">
                <div v-for="product in products" :key="product.id" class="product-card">
                    <div class="product-content">
                        <h3 class="product-title">{{ product.name }}</h3>
                        <p class="product-description">{{ product.description }}</p>
                        <div class="product-footer">
                            <span class="product-price">{{ product.price }} ₽</span>
                            <button class="buy-button" @click="buyProduct(product)">Заказать</button>
                        </div>
                    </div>
                    <button v-if="isAdmin" 
                            class="delete-button" 
                            @click="deleteProduct(product.id)">
                        Удалить
                    </button>
                </div>
            </div>

            <div v-if="isAdmin" class="admin-panel">
                <h3>Панель администратора</h3>
                <form @submit.prevent="addProduct" class="admin-form">
                    <div class="form-group">
                        <input v-model="newProduct.name" 
                               placeholder="Название анализа" 
                               required 
                               class="admin-input" />
                    </div>
                    <div class="form-group">
                        <textarea v-model="newProduct.description" 
                                 placeholder="Описание" 
                                 required 
                                 class="admin-input"></textarea>
                    </div>
                    <div class="form-group">
                        <input v-model.number="newProduct.price" 
                               placeholder="Цена" 
                               required 
                               type="number" 
                               class="admin-input" />
                    </div>
                    <button type="submit" class="admin-button">Добавить анализ</button>
                </form>
            </div>
        </div>
    `,
};

const Contacts = {
    template: `
        <div class="contacts-container">
            <div class="contacts-grid">
                <div class="info-grid">
                    <div class="info-card">
                        <h3>Адрес</h3>
                        <div class="address-content">
                            <p>г. Москва, ул. Академика Королева, 12</p>
                            <p>Медицинский центр "MetaLaboratory"</p>
                            <p class="metro"><i class="fas fa-subway"></i> 5 минут от м. ВДНХ</p>
                            <div class="transport-info">
                                <div class="transport-item">
                                    <i class="fas fa-walking"></i>
                                    <span>От метро ВДНХ: 5-7 минут пешком по аллее Космонавтов, мимо фонтана "Дружба народов"</span>
                                </div>
                                <div class="transport-item">
                                    <i class="fas fa-bus"></i>
                                    <span>Автобусы: 15, 24, 85 (остановка "Улица Академика Королева")</span>
                                </div>
                                <div class="transport-item">
                                    <i class="fas fa-car"></i>
                                    <span>Личный транспорт: бесплатная парковка на территории центра</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="info-card">
                        <h3>Телефоны</h3>
                        <div class="contact-content">
                            <div class="contact-item">
                                <a href="tel:+74951234567">+7 (495) 123-45-67</a>
                                <span>Общие вопросы и консультации</span>
                                <p class="contact-details">Ответим на все вопросы о наших услугах, ценах и акциях. Поможем выбрать удобное время для посещения.</p>
                            </div>
                            <div class="contact-item">
                                <a href="tel:+74951234568">+7 (495) 123-45-68</a>
                                <span>Запись на анализы и исследования</span>
                                <p class="contact-details">Запись на все виды лабораторных исследований, включая срочные анализы и комплексную диагностику.</p>
                            </div>
                        </div>
                    </div>

                    <div class="info-card">
                        <h3>Email</h3>
                        <div class="contact-content">
                            <div class="contact-item">
                                <a href="mailto:info@metalab.ru">info@metalab.ru</a>
                                <span>Общие вопросы и информация</span>
                                <p class="contact-details">Отправьте нам email для получения подробной информации об услугах, корпоративном обслуживании или сотрудничестве.</p>
                            </div>
                            <div class="contact-item">
                                <a href="mailto:support@metalab.ru">support@metalab.ru</a>
                                <span>Техническая поддержка</span>
                                <p class="contact-details">Решение вопросов с личным кабинетом, получением результатов онлайн и работой сайта.</p>
                            </div>
                        </div>
                    </div>

                    <div class="info-card">
                        <h3>Режим работы</h3>
                        <div class="schedule-content">
                            <div class="schedule-item">
                                <span class="day">Пн-Пт:</span>
                                <span class="time">8:00 - 20:00</span>
                            </div>
                            <div class="schedule-item">
                                <span class="day">Сб:</span>
                                <span class="time">9:00 - 18:00</span>
                            </div>
                            <div class="schedule-item">
                                <span class="day">Вс:</span>
                                <span class="time">9:00 - 16:00</span>
                            </div>
                            <div class="schedule-note">
                                <p>Забор анализов: ежедневно с 8:00 до 11:00</p>
                                <p>Срочные анализы: в течение всего рабочего дня</p>
                                <p>Выдача результатов: круглосуточно в личном кабинете</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="map-section">
                    <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2092.347992602746!2d26.678260577264577!3d58.37066788738478!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46eb3708ae89c8c5%3A0x9ee86db8e6696d74!2sArhitekti%20tn%2010%2C%2050407%20Tartu!5e0!3m2!1set!2see!4v1739274113884!5m2!1set!2see" 
                        allowfullscreen="" 
                        loading="lazy" 
                        referrerpolicy="no-referrer-when-downgrade">
                    </iframe>
                </div>
            </div>
        </div>
    `
};

const Auth = {
    data() {
        return {
            isLogin: true,
            email: '',
            username: '',
            password: '',
            confirmPassword: '',
            errorMessage: '',
            successMessage: ''
        };
    },
    methods: {
        async login() {
            try {
                const response = await axios.post('/api/auth/login', {
                    username: this.username,
                    password: this.password
                });

                if (response.status === 200) {
                    const token = response.data.token;
                    localStorage.setItem('jwtToken', token);
                    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                    this.$root.updateAuthState();
                    this.$router.push('/profile');
                }
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    this.errorMessage = 'Неправильное имя пользователя или пароль';
                } else {
                    this.errorMessage = 'Произошла ошибка при попытке входа.';
                }
            }
        },

        async register() {
            if (this.password !== this.confirmPassword) {
                this.errorMessage = "Пароли не совпадают";
                return;
            }

            try {
                const response = await axios.post('/api/auth/register', {
                    username: this.username,
                    password: this.password,
                    email: this.email
                });

                this.successMessage = "Регистрация успешна! Вы можете войти.";
                this.errorMessage = '';
                this.isLogin = true;
            } catch (error) {
                if (error.response && error.response.status === 400) {
                    if (error.response.data && typeof error.response.data === 'object') {
                        this.errorMessage = Object.values(error.response.data).join('. ');
                    } else {
                        this.errorMessage = 'Ошибка регистрации. Попробуйте еще раз.';
                    }
                } else {
                    this.errorMessage = 'Произошла ошибка при попытке регистрации. Попробуйте еще раз.';
                }
                this.successMessage = '';
            }
        },
        toggleForm() {
            this.isLogin = !this.isLogin;
            this.errorMessage = '';
            this.successMessage = '';
        }
    },
    template: `
    <div class="auth-container">
        <div class="auth-card">
            <div class="auth-header">
                <h2>{{ isLogin ? 'Вход в систему' : 'Регистрация' }}</h2>
                <p class="auth-subtitle">
                    {{ isLogin ? 'Войдите в свой аккаунт для доступа к услугам' : 'Создайте аккаунт для доступа к услугам' }}
                </p>
            </div>

            <form @submit.prevent="isLogin ? login() : register()" class="auth-form">
                <div class="form-group">
                    <label for="username">Имя пользователя</label>
                    <input 
                        id="username"
                        type="text" 
                        v-model="username" 
                        required
                        class="auth-input"
                        placeholder="Введите имя пользователя"
                    >
                </div>

                <div v-if="!isLogin" class="form-group">
                    <label for="email">Электронная почта</label>
                    <input 
                        id="email"
                        type="email" 
                        v-model="email" 
                        required
                        class="auth-input"
                        placeholder="Введите email"
                    >
                </div>

                <div class="form-group">
                    <label for="password">Пароль</label>
                    <input 
                        id="password"
                        type="password" 
                        v-model="password" 
                        required
                        class="auth-input"
                        placeholder="Введите пароль"
                    >
                </div>

                <div v-if="!isLogin" class="form-group">
                    <label for="confirmPassword">Подтверждение пароля</label>
                    <input 
                        id="confirmPassword"
                        type="password" 
                        v-model="confirmPassword" 
                        required
                        class="auth-input"
                        placeholder="Повторите пароль"
                    >
                </div>

                <div class="auth-messages">
                    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
                    <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
                </div>

                <button type="submit" class="auth-button">
                    {{ isLogin ? 'Войти' : 'Зарегистрироваться' }}
                </button>
            </form>

            <div class="auth-footer">
                <p>
                    {{ isLogin ? 'Нет аккаунта?' : 'Уже есть аккаунт?' }}
                    <a href="#" @click.prevent="toggleForm">
                        {{ isLogin ? 'Зарегистрируйтесь' : 'Войдите' }}
                    </a>
                </p>
            </div>
        </div>
    </div>
    `
};

const Profile = {
    data() {
        return {
            user: null,
        };
    },
    methods: {
        async fetchUserProfile() {
            try {
                const response = await axios.get('/api/profile');
                this.user = response.data;
            } catch (error) {
                console.error('Ошибка при загрузке профиля:', error);
            }
        },
        logout() {
            localStorage.removeItem('jwtToken');
            delete axios.defaults.headers.common['Authorization'];
            this.$root.updateAuthState();
            this.$router.push('/login');
        }
    },
    mounted() {
        this.fetchUserProfile();
    },
    template: `
        <div class="profile-container">
            <div class="profile-card">
                <div class="profile-header">
                    <h2>Личный кабинет</h2>
                </div>
                
                <div v-if="user" class="profile-content">
                    <div class="profile-avatar">
                        <div class="avatar-circle">
                            {{ user.username.charAt(0).toUpperCase() }}
                        </div>
                    </div>
                    
                    <div class="profile-info">
                        <div class="info-group">
                            <label>Имя пользователя</label>
                            <p>{{ user.username }}</p>
                        </div>
                        <div class="info-group">
                            <label>Email</label>
                            <p>{{ user.email }}</p>
                        </div>
                    </div>
                    
                    <button @click="logout" class="logout-button">
                        Выйти из аккаунта
                    </button>
                </div>
                
                <div v-else class="profile-loading">
                    <p>Загрузка данных...</p>
                </div>
            </div>
        </div>
    `
};

const routes = [
    { path: '/', component: Home },
    { path: '/about', component: About },
    { path: '/catalog', component: Catalog },
    { path: '/contacts', component: Contacts },
    { path: '/login', component: Auth },
    { path: '/profile', component: Profile }
];

const router = new VueRouter({
    routes
});

axios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('jwtToken');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

new Vue({
    el: '#app',
    router,
    data() {
        return {
            isAuthenticated: !!localStorage.getItem('jwtToken')
        };
    },
    methods: {
        updateAuthState() {
            this.isAuthenticated = !!localStorage.getItem('jwtToken');
        }
    },
});