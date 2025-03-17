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
                    this.errorMessage = 'Incorrect username or password';
                } else {
                    this.errorMessage = 'An error occurred while trying to log in.';
                }
            }
        },

        async register() {
            if (this.password !== this.confirmPassword) {
                this.errorMessage = "Passwords do not match";
                return;
            }

            try {
                const response = await axios.post('/api/auth/register', {
                    username: this.username,
                    password: this.password,
                    email: this.email
                });

                this.successMessage = "Registration successful! You can now log in.";
                this.errorMessage = '';
                this.isLogin = true;
            } catch (error) {
                if (error.response && error.response.status === 400) {
                    if (error.response.data && typeof error.response.data === 'object') {
                        this.errorMessage = Object.values(error.response.data).join('. ');
                    } else {
                        this.errorMessage = 'Registration error. Please try again.';
                    }
                } else {
                    this.errorMessage = 'An error occurred while trying to register. Please try again.';
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
                <h2>{{ isLogin ? 'Log In' : 'Sign Up' }}</h2>
                <p class="auth-subtitle">
                    {{ isLogin ? 'Sign in to your account to access services' : 'Create an account to access services'}}
                </p>
            </div>

            <form @submit.prevent="isLogin ? login() : register()" class="auth-form">
                <div class="form-group">
                    <label for="username">Username</label>
                    <input 
                        id="username"
                        type="text" 
                        v-model="username" 
                        required
                        class="auth-input"
                        placeholder="Enter username"
                    >
                </div>

                <div v-if="!isLogin" class="form-group">
                    <label for="email">Email</label>
                    <input 
                        id="email"
                        type="email" 
                        v-model="email" 
                        required
                        class="auth-input"
                        placeholder="Enter email"
                    >
                </div>

                <div class="form-group">
                    <label for="password">Password</label>
                    <input 
                        id="password"
                        type="password" 
                        v-model="password" 
                        required
                        class="auth-input"
                        placeholder="Enter password"
                    >
                </div>

                <div v-if="!isLogin" class="form-group">
                    <label for="confirmPassword">Confirm Password</label>
                    <input 
                        id="confirmPassword"
                        type="password" 
                        v-model="confirmPassword" 
                        required
                        class="auth-input"
                        placeholder="Repeat password"
                    >
                </div>

                <div class="auth-messages">
                    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
                    <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
                </div>

                <button type="submit" class="auth-button">
                    {{ isLogin ? 'Sign In' : 'Sign Up' }}
                </button>
            </form>

            <div class="auth-footer">
                <p>
                    {{ isLogin ? "Don't have an account?" : "Already have an account?" }}
                    <a href="#" @click.prevent="toggleForm">
                        {{ isLogin ? 'Sign Up' : 'Sign In' }}
                    </a>
                </p>
            </div>
        </div>
    </div>
    `
};
