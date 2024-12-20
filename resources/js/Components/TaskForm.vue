<template>
  <v-container>
    <v-form ref="form" @submit.prevent="submitTask">
      <v-text-field 
        v-model="task.title" 
        label="Title" 
        required 
        :disabled="loading"
      ></v-text-field>
      
      <v-textarea 
        v-model="task.description" 
        label="Description" 
        :disabled="loading"
      ></v-textarea>
      
      <v-text-field 
        v-model="task.due_date" 
        label="Due Date" 
        type="date" 
        :disabled="loading"
      ></v-text-field>
      
      <v-btn 
        type="submit" 
        color="success" 
        :loading="loading" 
        :disabled="loading"
      >
        {{ id ? 'Update Task' : 'Create Task' }}
      </v-btn>
      
      <v-btn 
        @click="$router.push('/')" 
        color="secondary" 
        :disabled="loading"
      >
        Cancel
      </v-btn>
    </v-form>
    
    <!-- Error message display -->
    <v-alert v-if="error" type="error" dismissible @click:close="error = null">
      {{ error }}
    </v-alert>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  props: ['id'],
  data() {
    return {
      task: { title: '', description: '', due_date: '' },
      loading: false,
      error: null,
    };
  },
  mounted() {
    if (this.id) {
      this.fetchTask();
    }
  },
  methods: {
    fetchTask() {
      this.loading = true;
      this.error = null;
      axios
        .get(`/api/tasks/${this.id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        })
        .then(response => {
          this.task = response.data;
        })
        .catch(err => {
          this.error = 'Failed to load task details. Please try again.';
          console.error(err);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    submitTask() {
      this.loading = true;
      this.error = null;
      const request = this.id
        ? axios.put(`/api/tasks/${this.id}`, this.task, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          })
        : axios.post('/api/tasks', this.task, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          });

      request
        .then(() => {
          this.$router.push('/'); // Redirect to task list
        })
        .catch(err => {
          this.error = 'Failed to save the task. Please try again.';
          console.error(err);
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>
