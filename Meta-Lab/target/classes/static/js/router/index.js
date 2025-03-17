
const routes = [
    { path: '/', component: Home },
    { path: '/about', component: About },
    { path: '/catalog', component: Catalog },
    { path: '/contacts', component: Contacts },
    { path: '/login', component: Auth },
    { path: '/profile', component: Profile },
    { path: '/booking', component: Booking }
];


const router = new VueRouter({
    routes
});
