<template>
  <div class="modal fade" id="dailyTaskModal" tabindex="-1" aria-labelledby="dailyTaskModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="dailyTaskModalLabel">Daily Routine Log</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="closeModal"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="saveTask">
            <div class="row">
              <div class="col-md-6 mb-3">
                <label for="taskLogId" class="form-label">Task Log ID</label>
                <input type="text" class="form-control" id="taskLogId" v-model="taskData.taskLogId" />
              </div>
              <div class="col-md-6 mb-3">
                <label for="employeeIdName" class="form-label">Employee ID / Name</label>
                <input type="text" class="form-control" id="employeeId" v-model="taskData.employeeId" disabled />
              </div>
            </div>
            <div class="row">
              <!-- Morning Tasks -->
              <div class="col-md-4">
                <h6>Morning</h6>
                <table class="table table-striped">
                  <thead>
                    <tr>
                      <th>Task</th>
                      <th>Status</th>
                      <th>Initial</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(task, index) in morningTasks" :key="'morning-' + index">
                      <td>{{ task.name }}</td>
                      <td>
                        <button type="button" class="btn btn-sm" :class="task.completed ? 'btn-success' : 'btn-danger'" @click="toggleTask('morning', index)">
                          <i :class="task.completed ? 'bi bi-check-circle-fill' : 'bi bi-x-circle-fill'"></i>
                        </button>
                      </td>
                      <td>{{ task.completed ? task.initials.join(', ') : '-' }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!-- Afternoon Tasks -->
              <div class="col-md-4">
                <h6>Afternoon</h6>
                <table class="table table-striped">
                  <thead>
                    <tr>
                      <th>Task</th>
                      <th>Status</th>
                      <th>Initial</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(task, index) in afternoonTasks" :key="'afternoon-' + index">
                      <td>{{ task.name }}</td>
                      <td>
                        <button type="button" class="btn btn-sm" :class="task.completed ? 'btn-success' : 'btn-danger'" @click="toggleTask('afternoon', index)">
                          <i :class="task.completed ? 'bi bi-check-circle-fill' : 'bi bi-x-circle-fill'"></i>
                        </button>
                      </td>
                      <td>{{ task.completed ? task.initials.join(', ') : '-' }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!-- Evening Tasks -->
              <div class="col-md-4">
                <h6>Evening</h6>
                <table class="table table-striped">
                  <thead>
                    <tr>
                      <th>Task</th>
                      <th>Status</th>
                      <th>Initial</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(task, index) in eveningTasks" :key="'evening-' + index">
                      <td>{{ task.name }}</td>
                      <td>
                        <button type="button" class="btn btn-sm" :class="task.completed ? 'btn-success' : 'btn-danger'" @click="toggleTask('evening', index)">
                          <i :class="task.completed ? 'bi bi-check-circle-fill' : 'bi bi-x-circle-fill'"></i>
                        </button>
                      </td>
                      <td>{{ task.completed ? task.initials.join(', ') : '-' }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" @click="closeModal">Cancel</button>
              <button type="button" class="btn btn-primary" @click="confirmOpeningTask">OK</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Modal } from 'bootstrap';

export default {
  data() {
    return {
      dailyTaskModalId: 'dailyTaskModal',
      modalInstance: null,
      loggedInUser: '',
      taskData: {
        taskLogId: '',
        employeeId: '',
      },
      morningTasks: [
        { name: 'Spot Mop', completed: false, initials: [] },
        { name: 'Swipe Floors', completed: false, initials: [] },
        { name: 'Check Bathrooms', completed: false, initials: [] },
        { name: 'Check Change Rooms', completed: false, initials: [] },
        { name: 'Squeegee Floors', completed: false, initials: [] },
        { name: 'Check Pool Debris', completed: false, initials: [] },
      ],
      afternoonTasks: [
        { name: 'Spot Mop', completed: false, initials: [] },
        { name: 'Swipe Floors', completed: false, initials: [] },
        { name: 'Check Bathrooms', completed: false, initials: [] },
        { name: 'Check Change Rooms 1', completed: false, initials: [] },
        { name: 'Check Change Rooms 2', completed: false, initials: [] },
        { name: 'Squeegee Floors 1', completed: false, initials: [] },
        { name: 'Squeegee Floors 1', completed: false, initials: [] },
        { name: 'Check Pool Debris', completed: false, initials: [] },
      ],
      eveningTasks: [
        { name: 'Check Bathrooms', completed: false, initials: [] },
        { name: 'Check Change Rooms', completed: false, initials: [] },
        { name: 'Squeegee Floors', completed: false, initials: [] },
        { name: 'Check Pool Debris', completed: false, initials: [] },
      ],
    };
  },
  mounted() {
    const modalElement = document.getElementById(this.dailyTaskModalId);
    this.modalInstance = new Modal(modalElement);
    this.setLoggedInUser();
    this.loadUserTasks();
  },
  methods: {
    openModal() {
      this.modalInstance.show();
    },
    closeModal() {
      this.modalInstance.hide();
    },
    setLoggedInUser() {
      const loggedInUser = JSON.parse(localStorage.getItem('user'));
      if (loggedInUser && loggedInUser.username) {
        this.loggedInUser = loggedInUser.username;
        this.taskData.employeeId = this.loggedInUser;
      }
    },
    loadUserTasks() {
      const tasks = localStorage.getItem('tasks');
      if (tasks) {
        const { morningTasks, afternoonTasks, eveningTasks } = JSON.parse(tasks);
        this.morningTasks = morningTasks || this.morningTasks;
        this.afternoonTasks = afternoonTasks || this.afternoonTasks;
        this.eveningTasks = eveningTasks || this.eveningTasks;
      }
    },
    toggleTask(timeOfDay, index) {
      const taskList = this[`${timeOfDay}Tasks`];
      const task = taskList[index];
      task.completed = !task.completed;

      if (task.completed && !task.initials.includes(this.loggedInUser)) {
        task.initials.push(this.loggedInUser);
      } else if (!task.completed) {
        task.initials = [];
      }

      this.saveTask();
    },
    saveTask() {
      const tasks = {
        morningTasks: this.morningTasks,
        afternoonTasks: this.afternoonTasks,
        eveningTasks: this.eveningTasks,
      };
      localStorage.setItem('tasks', JSON.stringify(tasks));
    },
    confirmOpeningTask() {
      alert('Tasks confirmed!');
      this.closeModal();
    },
  },
};
</script>

<style scoped>
.modal-title {
  font-family: 'Montserrat', sans-serif;
  font-weight: bold;
}
@media (max-width: 768px) {
  .modal-dialog {
    max-width: 100%;
  }
}
</style>
