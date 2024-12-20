import { createRouter, createWebHistory } from 'vue-router';
import TaskList from '../components/TaskList.vue';
import TaskForm from '../components/TaskForm.vue';
import Login from '../components/Login.vue';
import Register from '../components/Register.vue';

const routes = [
    {
        path: '/',
        name: 'Dashboard',
        component: TaskList,
    },
    {
        path: '/task/new',
        name: 'AddTask',
        component: TaskForm,
    },
    {
        path: '/task/:id/edit',
        name: 'EditTask',
        component: TaskForm,
        props: true,
    },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
];

export default createRouter({
    history: createWebHistory(),
    routes,
});
