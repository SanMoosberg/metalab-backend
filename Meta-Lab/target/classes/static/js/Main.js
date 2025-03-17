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
