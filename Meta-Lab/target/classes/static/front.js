const Home = {
    template: `
<div class="home-container">
    <section class="hero-block">
        <div class="hero-block__text">
            <h2>Инновационные лабораторные решения</h2>
            <p>Мы предлагаем передовое оборудование и технологии для вашей лаборатории. Наши решения помогают оптимизировать рабочие процессы и повысить эффективность исследований.</p>
        </div>
        <div class="hero-block__image">
            <img src="images/lab-automation.jpg" alt="Лабораторное оборудование" />
        </div>
    </section>
    
    <section class="hero-block reverse">
        <div class="hero-block__image">
            <img src="images/lab-automation.jpg" alt="Современные технологии" />
        </div>
        <div class="hero-block__text">
            <h2>Качество и надежность</h2>
            <p>Все наше оборудование соответствует международным стандартам качества и имеет необходимые сертификаты. Мы гарантируем надежность и долговечность поставляемых решений.</p>
        </div>
    </section>
</div>
    `
};

const About = {
    template: `
        <div class="about-container">
            <section class="about-hero">
                <h2>О нашей лаборатории</h2>
                <p class="about-subtitle">Инновации и качество с 2010 года</p>
            </section>

            <section class="about-section">
                <div class="about-content">
                    <h3>Наша история</h3>
                    <p>MetaLaboratory начала свою работу в 2010 году как небольшая частная лаборатория. За прошедшие годы мы выросли в современный диагностический центр, оснащенный передовым оборудованием и укомплектованный командой высококвалифицированных специалистов.</p>
                </div>
                <div class="about-image">
                    <img src="images/about-lab-1.jpg" alt="История лаборатории">
                </div>
            </section>

            <section class="about-section reverse">
                <div class="about-image">
                    <img src="images/about-lab-2.jpg" alt="Оборудование">
                </div>
                <div class="about-content">
                    <h3>Современное оснащение</h3>
                    <p>Мы используем только современное оборудование от ведущих мировых производителей. Все приборы регулярно проходят поверку и техническое обслуживание, что гарантирует точность и надежность результатов исследований.</p>
                </div>
            </section>

            <section class="about-advantages">
                <h3>Наши преимущества</h3>
                <div class="advantages-grid">
                    <div class="advantage-card">
                        <div class="advantage-icon">
                            <img src="images/icon-quality.svg" alt="Качество">
                        </div>
                        <h4>Высокая точность</h4>
                        <p>Современное оборудование и строгий контроль качества</p>
                    </div>
                    <div class="advantage-card">
                        <div class="advantage-icon">
                            <img src="images/icon-speed.svg" alt="Скорость">
                        </div>
                        <h4>Быстрые результаты</h4>
                        <p>Выдача результатов в кратчайшие сроки</p>
                    </div>
                    <div class="advantage-card">
                        <div class="advantage-icon">
                            <img src="images/icon-experts.svg" alt="Специалисты">
                        </div>
                        <h4>Опытные специалисты</h4>
                        <p>Команда квалифицированных врачей и лаборантов</p>
                    </div>
                </div>
            </section>

            <section class="about-section">
                <div class="about-content">
                    <h3>Гарантия качества</h3>
                    <p>Наша лаборатория имеет все необходимые лицензии и сертификаты. Мы регулярно участвуем в программах внешнего контроля качества и постоянно совершенствуем наши методики.</p>
                    <ul class="quality-list">
                        <li>Лицензия на медицинскую деятельность</li>
                        <li>Сертификаты ISO 9001:2015</li>
                        <li>Участие в международных программах контроля качества</li>
                        <li>Регулярное повышение квалификации персонала</li>
                    </ul>
                </div>
                <div class="about-image">
                    <img src="images/about-lab-3.jpg" alt="Сертификаты">
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
            <h2 class="catalog-title">Каталог анализов</h2>
            
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
            <h2 class="contacts-title">Контакты</h2>
            
            <div class="contacts-grid">
                <div class="contact-info">
                    <div class="info-block">
                        <h3>Адрес</h3>
                        <p>г. Москва, ул. Академика Королева, 12</p>
                        <p>Медицинский центр "MetaLaboratory"</p>
                        <p class="info-detail">5 минут от м. ВДНХ</p>
                    </div>
                    
                    <div class="info-block">
                        <h3>Телефоны</h3>
                        <p>
                            <a href="tel:+74951234567">+7 (495) 123-45-67</a>
                            <span class="info-detail">Общие вопросы</span>
                        </p>
                        <p>
                            <a href="tel:+74951234568">+7 (495) 123-45-68</a>
                            <span class="info-detail">Запись на анализы</span>
                        </p>
                    </div>
                    
                    <div class="info-block">
                        <h3>Режим работы</h3>
                        <p>Пн-Пт: 8:00 - 20:00</p>
                        <p>Сб: 9:00 - 18:00</p>
                        <p>Вс: 9:00 - 16:00</p>
                    </div>
                    
                    <div class="info-block">
                        <h3>Email</h3>
                        <p>
                            <a href="mailto:info@metalab.ru">info@metalab.ru</a>
                            <span class="info-detail">Общие вопросы</span>
                        </p>
                        <p>
                            <a href="mailto:support@metalab.ru">support@metalab.ru</a>
                            <span class="info-detail">Техническая поддержка</span>
                        </p>
                    </div>
                </div>
                
                <div class="contact-map">
                    <div class="map-placeholder">
                        <!-- Здесь будет карта -->
                        <p>Карта загружается...</p>
                    </div>
                </div>
            </div>
            
            <div class="contact-additional">
                <div class="transport-info">
                    <h3>Как добраться</h3>
                    <ul>
                        <li>От метро ВДНХ: пешком 5 минут по аллее Космонавтов</li>
                        <li>Автобусы: 15, 24, 85 (остановка "Улица Академика Королева")</li>
                        <li>Троллейбусы: 13, 69 (остановка "ВДНХ-Южная")</li>
                    </ul>
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