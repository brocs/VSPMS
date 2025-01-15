<template>
  <div class="modal fade" id="closingTaskModal" tabindex="-1" aria-labelledby="closingTaskModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="closingTaskModalLabel">Closing Routine Log</h5>
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

            <!-- First Row: Women's Bathroom and Men's Bathroom -->
            <div class="row">
              <div class="col-md-6">
                <h6>Women's Bathroom</h6>
                <table class="table table-striped">
                  <thead>
                    <tr>
                      <th>Task</th>
                      <th>Status</th>
                      <th>Initial</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(task, index) in womenBTasks" :key="index">
                      <td>{{ task.name }}</td>
                      <td>
                        <button type="button" class="btn btn-sm" :class="task.completed ? 'btn-success' : 'btn-danger'" @click="toggleTask(index, 'womenBTasks')">
                          <i :class="task.completed ? 'bi bi-check-circle-fill' : 'bi bi-x-circle-fill'"></i>
                        </button>
                      </td>
                      <td>{{ task.completed ? task.initials.join(', ') : '-' }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div class="col-md-6">
                <h6>Men's Bathroom</h6>
                <table class="table table-striped">
                  <thead>
                    <tr>
                      <th>Task</th>
                      <th>Status</th>
                      <th>Initial</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(task, index) in menBTasks" :key="index">
                      <td>{{ task.name }}</td>
                      <td>
                        <button type="button" class="btn btn-sm" :class="task.completed ? 'btn-success' : 'btn-danger'" @click="toggleTask(index, 'menBTasks')">
                          <i :class="task.completed ? 'bi bi-check-circle-fill' : 'bi bi-x-circle-fill'"></i>
                        </button>
                      </td>
                      <td>{{ task.completed ? task.initials.join(', ') : '-' }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- Second Row: Changing Room -->
            <div class="row">
              <div class="col-md-6">
                <h6>Changingroom Bathrooms</h6>
                <table class="table table-striped">
                  <thead>
                    <tr>
                      <th>Task</th>
                      <th>Status</th>
                      <th>Initial</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(task, index) in changingrBTasks" :key="index">
                      <td>{{ task.name }}</td>
                      <td>
                        <button type="button" class="btn btn-sm" :class="task.completed ? 'btn-success' : 'btn-danger'" @click="toggleTask(index, 'changingrBTasks')">
                          <i :class="task.completed ? 'bi bi-check-circle-fill' : 'bi bi-x-circle-fill'"></i>
                        </button>
                      </td>
                      <td>{{ task.completed ? task.initials.join(', ') : '-' }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div class="col-md-6">
                <h6>Changingroom</h6>
                <table class="table table-striped">
                  <thead>
                    <tr>
                      <th>Task</th>
                      <th>Status</th>
                      <th>Initial</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(task, index) in changingrTasks" :key="index">
                      <td>{{ task.name }}</td>
                      <td>
                        <button type="button" class="btn btn-sm" :class="task.completed ? 'btn-success' : 'btn-danger'" @click="toggleTask(index, 'changingrTasks')">
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
              <button type="button" class="btn btn-primary" @click="confirmClosingTask">OK</button>
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
      closingTaskModalId: 'closingTaskModal',
      modalInstance: null,
      loggedInUser: '', // Initially empty, to be set dynamically
      taskData: {
        taskLogId: '',
        employeeId: '',
        taskCategory: 'Closing',
        taskName: '',
        time: { hour: 9, minute: 0, ampm: 'AM' },
      },
      womenBTasks: [
        { name: 'Sweep Floor', completed: false, initials: [] },
        { name: 'Disinfect & Mop Floors', completed: false, initials: [] },
        { name: 'Pick drains of hair/debris', completed: false, initials: [] },
        { name: 'Disinfect counter & sinks', completed: false, initials: [] },
        { name: 'Clean mirrors', completed: false, initials: [] },
        { name: 'Clean inside and outside of toilet', completed: false, initials: [] },
        { name: 'Wipe down stall partitions', completed: false, initials: [] },
        { name: 'Wipe down stainless steel', completed: false, initials: [] },
        { name: 'Empty all the bins and stalls', completed: false, initials: [] },
        { name: 'Check toiletries', completed: false, initials: [] },
      ],
      menBTasks: [
        { name: 'Sweep Floor', completed: false, initials: [] },
        { name: 'Disinfect & Mop Floors', completed: false, initials: [] },
        { name: 'Pick drains of hair/debris', completed: false, initials: [] },
        { name: 'Disinfect counter & sinks', completed: false, initials: [] },
        { name: 'Clean mirrors', completed: false, initials: [] },
        { name: 'Clean inside and outside of toilet', completed: false, initials: [] },
        { name: 'Wipe down stall partitions', completed: false, initials: [] },
        { name: 'Wipe down stainless steel', completed: false, initials: [] },
        { name: 'Empty all the bins and stalls', completed: false, initials: [] },
        { name: 'Check toiletries', completed: false, initials: [] },
      ],
      changingrBTasks: [
        { name: 'Disinfect & Mop Floors', completed: false, initials: [] },
        { name: 'Pick drains of hair/debris', completed: false, initials: [] },
        { name: 'Disinfect counter & sinks', completed: false, initials: [] },
        { name: 'Swipe Floors', completed: false, initials: [] },
        { name: 'Clean mirrors', completed: false, initials: [] },
        { name: 'Clean inside and outside of toilet', completed: false, initials: [] },
        { name: 'Wipe down stainless steel', completed: false, initials: [] },
        { name: 'Empty all the bins and stalls', completed: false, initials: [] },
        { name: 'Check toiletries', completed: false, initials: [] },
      ],
      changingrTasks: [
        { name: 'Disinfect & Mop Floors', completed: false, initials: [] },
        { name: 'Pick drains of hair/debris', completed: false, initials: [] },
        { name: 'Wipe down stainless steel in showers', completed: false, initials: [] },
        { name: 'EWipe down benches', completed: false, initials: [] },
      ],
    };
  },
  mounted() {
    const modalElement = document.getElementById(this.closingTaskModalId);
    this.modalInstance = new Modal(modalElement);

    // Set the logged-in user dynamically based on your authentication logic
    this.setLoggedInUser();

    // Load tasks from localStorage
    this.loadTasks();
  },
  methods: {
    openModal() {
      this.modalInstance.show();
    },
    closeModal() {
      this.modalInstance.hide();
    },
    setLoggedInUser() {
      const loggedInUser = JSON.parse(localStorage.getItem("user"));
      if (loggedInUser && loggedInUser.username) {
        this.loggedInUser = loggedInUser.username;
        this.taskData.employeeId = this.loggedInUser;
      } else {
        this.loggedInUser = "Unknown";
        this.taskData.employeeId = "Unknown";
      }
    },
    loadTasks() {
      const savedTasks = JSON.parse(localStorage.getItem("tasks"));
      if (savedTasks) {
        this.womenBTasks = savedTasks.womenBTasks || this.womenBTasks;
        this.menBTasks = savedTasks.menBTasks || this.menBTasks;
        this.changingrBTasks = savedTasks.changingrBTasks || this.changingrBTasks;
        this.changingrTasks = savedTasks.changingrTasks || this.changingrTasks;
      }
    },
    saveTask() {
      // Save tasks to localStorage when any task is modified
      const tasks = {
        womenBTasks: this.womenBTasks,
        menBTasks: this.menBTasks,
        changingrBTasks: this.changingrBTasks,
        changingrTasks: this.changingrTasks,
      };
      localStorage.setItem("tasks", JSON.stringify(tasks));
    },
    toggleTask(index, taskList) {
      let taskLists = {
        womenBTasks: this.womenBTasks,
        menBTasks: this.menBTasks,
        changingrBTasks: this.changingrBTasks,
        changingrTasks: this.changingrTasks,
      };

      const task = taskLists[taskList][index];
      task.completed = !task.completed;
      if (task.completed) {
        task.initials.push(this.loggedInUser);
      } else {
        task.initials = task.initials.filter(initial => initial !== this.loggedInUser);
      }
    },
    confirmClosingTask() {
      // Save tasks to localStorage when confirmed
      this.saveTask();
      alert("Closing tasks confirmed");
      this.closeModal();
    },
  },
};
</script>
