<template>
  <div class="modal fade" :id="otherClosingTaskModalId" tabindex="-1" aria-labelledby="otherClosingTaskModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="otherClosingTaskModalLabel">Closing Task List</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <!-- Left Column for the first 19 tasks -->
            <div class="col-6">
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th>Task</th>
                    <th>Status</th>
                    <th>Initials</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(task, index) in otherClosingTasks.slice(0, 13)" :key="index">
                    <td>{{ task.name }}</td>
                    <td>
                      <button
                        class="btn btn-sm"
                        :class="task.completed ? 'btn-success' : 'btn-danger'"
                        @click="toggleClosingTask(index)"
                      >
                        <i :class="task.completed ? 'bi bi-check-circle-fill' : 'bi bi-x-circle-fill'"></i>
                      </button>
                    </td>
                    <td>{{ task.completed ? task.initials : '-' }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <!-- Right Column for the rest of the tasks -->
            <div class="col-6">
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th>Task</th>
                    <th>Status</th>
                    <th>Initials</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(task, index) in otherClosingTasks.slice(13)" :key="index + 13">
                    <td>{{ task.name }}</td>
                    <td>
                      <button
                        class="btn btn-sm"
                        :class="task.completed ? 'btn-success' : 'btn-danger'"
                        @click="toggleClosingTask(index + 13)"
                      >
                        <i :class="task.completed ? 'bi bi-check-circle-fill' : 'bi bi-x-circle-fill'"></i>
                      </button>
                    </td>
                    <td>{{ task.completed ? task.initials : '-' }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <span v-if="lastUpdatedUser && lastUpdatedTime" class="ms-2 text-muted">
            Last updated by {{ lastUpdatedUser }} at {{ lastUpdatedTime }}
          </span>
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
          <button type="button" class="btn btn-primary" @click="confirmClosingTask">OK</button>
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
      otherClosingTaskModalId: 'otherClosingTaskModal',  // Unique ID for closing task modal
      modalInstance: null,
      loggedInUser: '',
      lastUpdatedUser: '',  // For storing the last updated user
      lastUpdatedTime: '',  // For storing the last updated time
      otherClosingTasks: [  // Unique task list for closing tasks
        { name: "Check all toys are removed from the pool", completed: false, initials: "" },
        { name: "Remove lane ropes", completed: false, initials: "" },
        { name: "Tidy equipment cabinet", completed: false, initials: "" },
        { name: "Tidy pool deck", completed: false, initials: "" },
        { name: "Take in spinal board & Trauma kit", completed: false, initials: "" },
        { name: "Put away rescue cans", completed: false, initials: "" },
        { name: "Turn off water slides", completed: false, initials: "" },
        { name: "Turn off spray features", completed: false, initials: "" },
        { name: "Lock gate & outdoor cabinets Equipment Cabinets", completed: false, initials: "" },
        { name: "Sweep offices", completed: false, initials: "" },
        { name: "Sweep entry", completed: false, initials: "" },
        { name: "Sweep hallways", completed: false, initials: "" },
        { name: "Mop offices", completed: false, initials: "" },
        { name: "Mop entry", completed: false, initials: "" },
        { name: "Mop hallways", completed: false, initials: "" },
        { name: "Disinfect benches", completed: false, initials: "" },
        { name: "Wash & put away dishes", completed: false, initials: "" },
        { name: "Utility mops & brooms put away", completed: false, initials: "" },
        { name: "Check changerooms for patrons", completed: false, initials: "" },
        { name: "Put garbages by deck door", completed: false, initials: "" },
        { name: "Set answering machine", completed: false, initials: "" },
        { name: "Cash out & put money away", completed: false, initials: "" },
        { name: "Turn off computers * printer", completed: false, initials: "" },
        { name: "Turn off spray features", completed: false, initials: "" },
        { name: "Turn off lights & lock the doors", completed: false, initials: "" },
        { name: "Umbrellas put away", completed: false, initials: "" },
        { name: "Lifeguard room tidy", completed: false, initials: "" }
      ]
    };
  },
  mounted() {
    // Initialize the modal instance
    this.modalInstance = new Modal(document.getElementById(this.otherClosingTaskModalId));

    // Fetch the logged-in user's initials
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    if (loggedInUser && loggedInUser.username) {
      this.loggedInUser = loggedInUser.username;
    } else {
      this.loggedInUser = "Unknown"; // Fallback
    }

    // Load closing tasks from localStorage
    const savedClosingTasks = localStorage.getItem("otherClosingTasks");
    if (savedClosingTasks) {
      this.otherClosingTasks = JSON.parse(savedClosingTasks);
    }

    // Retrieve last update information from localStorage
    const lastUpdate = localStorage.getItem("lastClosingTaskUpdate");
    if (lastUpdate) {
      const { user, time } = JSON.parse(lastUpdate);
      this.lastUpdatedUser = user;
      this.lastUpdatedTime = time;
    }
  },
  methods: {
    openModal() {
      this.modalInstance.show();
    },
    closeModal() {
      this.modalInstance.hide();
    },
    toggleClosingTask(index) {
      const task = this.otherClosingTasks[index];
      task.completed = !task.completed;
      task.initials = task.completed ? this.loggedInUser : ""; // Set initials when completed

      // Update the last updated details
      const currentTime = new Date().toLocaleTimeString();
      this.lastUpdatedUser = this.loggedInUser;
      this.lastUpdatedTime = currentTime;

      // Save the last updated details to localStorage
      localStorage.setItem("lastClosingTaskUpdate", JSON.stringify({
        user: this.lastUpdatedUser,
        time: this.lastUpdatedTime
      }));

      // Save updated closing tasks to localStorage
      localStorage.setItem("otherClosingTasks", JSON.stringify(this.otherClosingTasks));
    },
    confirmClosingTask() {
      alert("Closing tasks confirmed");
      this.closeModal();
    }
  }
};
</script>

<style scoped>
.modal-title {
  font-family: 'Montserrat', sans-serif;
  font-weight: bold;
}

.table {
  margin-bottom: 0;
}
</style>
