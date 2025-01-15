<template>
    <div class="modal fade" :id="poolCapacityModalId" tabindex="-1" aria-labelledby="capacityModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="capacityModalLabel">Pool Capacity</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form>
              <!-- Row for Capacity ID and Employee -->
              <div class="row mb-3">
                <div class="col-md-6">
                  <label for="capacityId" class="form-label">Capacity ID</label>
                  <input
                    type="text"
                    class="form-control"
                    id="capacityId"
                    v-model="formData.capacityId"
                    readonly
                  />
                </div>
                <div class="col-md-6">
                  <label for="employeeId" class="form-label">Employee ID / Name</label>
                  <input type="text" class="form-control" id="employeeId" v-model="formData.employeeId" disabled />
                </div>
              </div>
  
              <!-- Row for Date and Time -->
              <div class="row mb-3">
                <div class="col-md-6">
                  <label for="capacityDate" class="form-label">Capacity Date</label>
                  <input
                    type="date"
                    class="form-control"
                    id="capacityDate"
                    v-model="formData.capacityDate"
                  />
                </div>
                <div class="col-md-6">
                  <label for="time" class="form-label">Time</label>
                  <div class="d-flex gap-2">
                    <select class="form-select" id="timeHour" v-model="formData.timeHour">
                      <option v-for="hour in 12" :key="hour" :value="hour">{{ hour }}</option>
                    </select>
                    <select class="form-select" id="timeMinute" v-model="formData.timeMinute">
                      <option v-for="minute in minutes" :key="minute" :value="minute">
                        {{ minute }}
                      </option>
                    </select>
                    <select class="form-select" id="timePeriod" v-model="formData.timePeriod">
                      <option value="AM">AM</option>
                      <option value="PM">PM</option>
                    </select>
                  </div>
                </div>
              </div>
  
              <!-- Row for Capacity Count -->
              <div class="mb-3">
                <label for="capacityCount" class="form-label">Capacity Count</label>
                <input type="number" class="form-control" id="capacityCount" v-model="formData.capacityCount" />
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <span v-if="lastUpdatedUser && lastUpdatedTime" class="ms-2 text-muted">
              Last updated by {{ lastUpdatedUser }} at {{ lastUpdatedTime }}
            </span>
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            <button type="button" class="btn btn-primary" @click="confirmPoolCapacity">OK</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { Modal } from "bootstrap";
  
  export default {
    data() {
      return {
        poolCapacityModalId: "poolCapacityModalId",
        modalInstance: null,
        loggedInUser: "",
        lastUpdatedUser: "",
        lastUpdatedTime: "",
        formData: {
          capacityId: "20242001",
          employeeId: "",
          capacityDate: "",
          timeHour: "9",
          timeMinute: "00",
          timePeriod: "AM",
          capacityCount: 0,
        },
        minutes: Array.from({ length: 60 }, (_, i) => String(i).padStart(2, "0")),
      };
    },
    mounted() {
      this.modalInstance = new Modal(
        document.getElementById(this.poolCapacityModalId)
      );
      this.setLoggedInUser();
  
      const lastUpdate = localStorage.getItem("lastPoolCapacityUpdate");
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
      setLoggedInUser() {
        const loggedInUser = JSON.parse(localStorage.getItem("user"));
        if (loggedInUser && loggedInUser.username) {
          this.loggedInUser = loggedInUser.username;
          this.formData.employeeId = this.loggedInUser;
        } else {
          this.loggedInUser = "Unknown";
          this.formData.employeeId = "Unknown";
        }
      },
      confirmPoolCapacity() {
        this.lastUpdatedUser = this.loggedInUser;
        this.lastUpdatedTime = new Date().toLocaleTimeString();
  
        localStorage.setItem(
          "lastPoolCapacityUpdate",
          JSON.stringify({
            user: this.lastUpdatedUser,
            time: this.lastUpdatedTime,
          })
        );
  
        alert("Pool capacity updated successfully!");
        this.closeModal();
      },
    },
  };
  </script>
  
  <style scoped>
  .modal-title {
    font-family: "Montserrat", sans-serif;
    font-weight: bold;
  }
  </style>
  