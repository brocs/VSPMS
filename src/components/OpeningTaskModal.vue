<template>
  <div class="modal fade" :id="openingTaskModalId" tabindex="-1" aria-labelledby="taskModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="taskModalLabel">Opening Task List</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <table class="table table-striped">
            <thead>
              <tr>
                <th>Task</th>
                <th>Status</th>
                <th>Initials</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(task, index) in openingTasks" :key="index">
                <td>{{ task.name }}</td>
                <td>
                  <button
                    class="btn btn-sm"
                    :class="task.completed ? 'btn-success' : 'btn-danger'"
                    @click="toggleOpeningTask(index)"
                  >
                    <i :class="task.completed ? 'bi bi-check-circle-fill' : 'bi bi-x-circle-fill'"></i>
                  </button>
                </td>
                <td>{{ task.completed ? task.initials : '-' }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="modal-footer">
          <span v-if="lastUpdatedUser && lastUpdatedTime" class="ms-2 text-muted">
            Last updated by {{ lastUpdatedUser }} at {{ lastUpdatedTime }}
          </span>
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
          <button type="button" class="btn btn-primary" @click="confirmOpeningTask">OK</button>
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
      openingTaskModalId: 'openingTaskModal',  // Unique ID for opening task modal
      modalInstance: null,
      loggedInUser: '',
      lastUpdatedUser: '',  // For storing the last updated user
      lastUpdatedTime: '',  // For storing the last updated time
      openingTasks: [  // Unique task list for opening tasks
        { name: "Turn On Lights", completed: false, initials: "" },
        { name: "Unlock Doors", completed: false, initials: "" },
        { name: "Turn On Computers & Printers", completed: false, initials: "" },
        { name: "Water Test", completed: false, initials: "" },
        { name: "Write Hot Tub Temp On Sign", completed: false, initials: "" },
        { name: "Put In Lane Ropes", completed: false, initials: "" },
        { name: "Open Gate", completed: false, initials: "" },
        { name: "Put Out Trauma Kit And Spine Board", completed: false, initials: "" },
        { name: "Count & Put Float In Cash Drawer", completed: false, initials: "" },
        { name: "Unlock Equipment Cabinets", completed: false, initials: "" },
        { name: "Check Changerooms For Tidiness", completed: false, initials: "" },
        { name: "Check Bathrooms For Tidiness", completed: false, initials: "" },
        { name: "Sweep Decks Of Debris", completed: false, initials: "" }
      ]
    };
  },
  mounted() {
    // Initialize the modal instance
    this.modalInstance = new Modal(document.getElementById(this.openingTaskModalId));

    // Fetch the logged-in user's initials
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    if (loggedInUser && loggedInUser.username) {
      this.loggedInUser = loggedInUser.username;
    } else {
      this.loggedInUser = "Unknown"; // Fallback
    }

    // Load opening tasks from localStorage
    const savedOpeningTasks = localStorage.getItem("openingTasks");
    if (savedOpeningTasks) {
      this.openingTasks = JSON.parse(savedOpeningTasks);
    }

    // Retrieve last update information from localStorage
    const lastUpdate = localStorage.getItem("lastOpeningTaskUpdate");
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
    toggleOpeningTask(index) {
      const task = this.openingTasks[index];
      task.completed = !task.completed;
      task.initials = task.completed ? this.loggedInUser : "";

      // Update the last updated details
      const currentTime = new Date().toLocaleTimeString();
      this.lastUpdatedUser = this.loggedInUser;
      this.lastUpdatedTime = currentTime;

      // Save the last updated details to localStorage
      localStorage.setItem("lastOpeningTaskUpdate", JSON.stringify({
        user: this.lastUpdatedUser,
        time: this.lastUpdatedTime
      }));

      // Save updated opening tasks to localStorage
      localStorage.setItem("openingTasks", JSON.stringify(this.openingTasks));
    },
    confirmOpeningTask() {
      alert("Opening tasks confirmed");
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
