<template>
    <v-container>
        <v-btn color="primary" @click="$router.push('/task/new')">Create Task</v-btn>
        <v-btn color="secondary" @click="logout">Logout</v-btn>
        <v-data-table :items="tasks" :headers="headers" class="elevation-1">
            <template v-slot:top>
                <v-toolbar flat>
                    <v-toolbar-title>Task List</v-toolbar-title>
                </v-toolbar>
            </template>
            <template v-slot:body="{ items }">
                <tr v-for="task in items" :key="task.id">
                    <td>{{ task.title }}</td>
                    <td>{{ task.description }}</td>
                    <td>{{ task.due_date }}</td>
                    <td>
                        <v-btn icon @click="$router.push(`/task/${task.id}/edit`)">
                            <v-icon>mdi-pencil</v-icon>
                        </v-btn>
                        <v-btn icon @click="deleteTask(task.id)">
                            <v-icon>mdi-delete</v-icon>
                        </v-btn>
                    </td>
                </tr>
            </template>
        </v-data-table>
    </v-container>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            tasks: [],
            headers: [
                { text: 'Title', value: 'title' },
                { text: 'Description', value: 'description' },
                { text: 'Due Date', value: 'due_date' },
                { text: 'Actions', value: 'actions', sortable: false },
            ],
        };
    },
    mounted() {
        this.fetchTasks();
    },
    methods: {
        fetchTasks() {
            axios
                 .get('/api/tasks', {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        })
        .then(response => {
            this.tasks = response.data;
        })
        .catch(error => {
            console.error('Error fetching tasks:', error);
        });
        },
        deleteTask(id) {
            axios
                .delete(`/api/tasks/${id}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                })
                .then(() => {
                    this.fetchTasks();
                })
                .catch(error => {
                    console.error('Error deleting task:', error);
                });
        },
        logout() {
            axios
                .post('/logout', {}, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                })
                .then(() => {
                    localStorage.removeItem('token');
                    this.$router.push('/login');
                })
                .catch(error => {
                    console.error('Error logging out:', error);
                });
        },
    },
};
</script>
