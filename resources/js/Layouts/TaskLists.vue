<template>
  <v-container>
    <v-btn color="primary" dark @click="showCreateDialog = true">
      <v-icon left>mdi-plus</v-icon>Add Task
    </v-btn>

    <v-dialog v-model="showCreateDialog" max-width="500">
      <v-card>
        <v-card-title>
          <span class="text-h5">Add New Task</span>
        </v-card-title>
        <v-card-text>
          <v-form>
            <v-text-field label="Title" v-model="newTask.title" outlined></v-text-field>
            <v-textarea label="Description" v-model="newTask.description" outlined></v-textarea>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="createTask">Save</v-btn>
          <v-btn text color="secondary" @click="showCreateDialog = false">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-row>
      <v-col
        v-for="task in tasks"
        :key="task.id"
        cols="12"
        sm="6"
        md="4"
      >
        <v-card>
          <v-card-title>{{ task.title }}</v-card-title>
          <v-card-text>{{ task.description }}</v-card-text>
          <v-card-actions>
            <v-btn text color="primary" @click="editTask(task)">Edit</v-btn>
            <v-btn text color="error" @click="deleteTask(task.id)">Delete</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-dialog v-model="showEditDialog" max-width="500">
      <v-card>
        <v-card-title>Edit Task</v-card-title>
        <v-card-text>
          <v-text-field label="Title" v-model="currentTask.title" outlined></v-text-field>
          <v-textarea label="Description" v-model="currentTask.description" outlined></v-textarea>
        </v-card-text>
        <v-card-actions>
          <v-btn text color="primary" @click="updateTask">Save</v-btn>
          <v-btn text color="secondary" @click="showEditDialog = false">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      tasks: [],
      newTask: {
        title: '',
        description: '',
      },
      currentTask: {},
      showCreateDialog: false,
      showEditDialog: false,
    };
  },
  methods: {
    fetchTasks() {
      axios.get('/api/tasks').then((response) => {
        this.tasks = response.data;
      });
    },
    createTask() {
      axios.post('/api/tasks', this.newTask).then(() => {
        this.fetchTasks();
        this.newTask = { title: '', description: '' };
        this.showCreateDialog = false;
      });
    },
    editTask(task) {
      this.currentTask = { ...task };
      this.showEditDialog = true;
    },
    updateTask() {
      axios.put(`/api/tasks/${this.currentTask.id}`, this.currentTask).then(() => {
        this.fetchTasks();
        this.showEditDialog = false;
      });
    },
    deleteTask(id) {
      axios.delete(`/api/tasks/${id}`).then(() => {
        this.fetchTasks();
      });
    },
  },
  mounted() {
    this.fetchTasks();
  },
};
</script>
