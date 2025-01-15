<template>
  <div>
    <div>
      <HeaderComponent />
      <main>
        <!-- Page Content -->
         
      </main>
    </div>

    <div class="row">
      <!-- Left Sidebar for Buttons (on larger screens) -->
      <div class="col-md-3 col-12">
        <!-- BUTTONS -->
        <div class="container mt-4">
          <div class="d-grid gap-3">
            <button class="btn btn-success btn-lg" id="openingTaskButton" @click="openModal('opening')">Opening Task</button>
          </div>
        </div>

        <div class="container mt-4">
          <div class="d-grid gap-3">
            <button class="btn btn-success btn-lg" id="modalToggle" @click="openModal('daily')">Daily Routine Task</button>
          </div>
        </div>

        <div class="container mt-4">
          <div class="d-grid gap-3">
            <button class="btn btn-success btn-lg" id="modalToggle" @click="openModal('adhoc')">Adhoc Reports</button>
          </div>
        </div>

        <div class="container mt-4">
          <div class="d-grid gap-3">
            <button class="btn btn-success btn-lg" id="modalToggle" @click="openModal('closing')">Closing Task</button>
          </div>
        </div>

        <div class="container mt-4">
          <div class="d-grid gap-3">
            <button class="btn btn-success btn-lg" id="modalToggle" @click="openModal('cap')">Capacity</button>
          </div>
        </div>

        <div class="container mt-4">
          <div class="d-grid gap-3">
            <button class="btn btn-success btn-lg" id="modalToggle" @click="openModal('test')">Pool Water Test</button>
          </div>
        </div>

        <div class="container mt-4">
          <div class="d-grid gap-3">
            <button class="btn btn-success btn-lg" id="modalToggle" @click="openModal('otherclosing')">Other Closing Task</button>
          </div>
        </div>

        <!-- Modals -->
        <OpeningTaskModal ref="openingModal" />
        <DailyTaskModal ref="dailyModal" />
        <AdhocTaskModal ref="adhocModal" />
        <ClosingTaskModal ref="closingModal" />
        <OtherClosingTaskModal ref="otherclosingModal" />
        <PoolCapacityModal ref="capModal" />
        <WaterTestModal ref="testModal" />
        <!-- End of Modals -->
        
      </div>

      <!-- Main Content -->
      <div class="col-md-9 col-12">
        <div class="row">
          <!-- Daily Routine Task Card -->
          <div class="col-lg-3 col-md-4 col-sm-6">
            <div class="card mb-3">
              <div class="card-header bg-primary text-white">Daily Routine Task</div>
              <ul class="list-group list-group-flush">
                <li class="list-group-item d-flex justify-content-between">
                  Pool Water Check <span class="badge bg-warning text-dark">Pending</span>
                </li>
                <li class="list-group-item d-flex justify-content-between">
                  Counter People <span class="badge bg-warning text-dark">Pending</span>
                </li>
                <li class="list-group-item d-flex justify-content-between">
                  Bathroom Check <span class="badge bg-warning text-dark">Pending</span>
                </li>
                <li class="list-group-item d-flex justify-content-between">
                  Sanitary Check <span class="badge bg-warning text-dark">Pending</span>
                </li>
                <li class="list-group-item d-flex justify-content-between">
                  Changing Room Check <span class="badge bg-warning text-dark">Pending</span>
                </li>
              </ul>
            </div>
          </div>

          <!-- Task Progress Cards -->
          <div class="col-md-9">
            <div class="row u">
              <div class="col-4">
                <div class="card text-center mb-3 huge-height">
                  <div class="card-body">
                    <h5 class="card-title progNum">80%</h5>
                    <p class="card-text">Opening Task Done</p>
                  </div>
                </div>
              </div>
              <div class="col-4">
                <div class="card text-center mb-3 huge-height">
                  <div class="card-body">
                    <h5 class="card-title progNum">85%</h5>
                    <p class="card-text">Throughout The Day Task Done</p>
                  </div>
                </div>
              </div>
              <div class="col-4">
                <div class="card text-center mb-3 huge-height">
                  <div class="card-body">
                    <h5 class="card-title progNum">90%</h5>
                    <p class="card-text">Closing Task Done</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-4">
                <div class="card text-center bg-danger text-white huge-height">
                  <div class="card-body">
                    <h5 class="card-title progNum desc">160</h5>
                    <p class="card-text progNumdesc">Customer Capacity</p>
                  </div>
                </div>
              </div>
              <div class="col-4">
                <div class="card text-center bg-primary text-white huge-height">
                  <div class="card-body">
                    <h5 class="card-title progNum desc">7.2</h5>
                    <p class="card-text progNumdesc">pH Level</p>
                  </div>
                </div>
              </div>
              <div class="col-4">
                <div class="card text-center bg-primary text-white huge-height">
                  <div class="card-body">
                    <h5 class="card-title progNum desc">4</h5>
                    <p class="card-text progNumdesc">Chlorine Level</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted } from 'vue';  // Import onMounted hook
import { useRouter } from 'vue-router';  // Import useRouter for routing

import HeaderComponent from "@/components/HeaderComponent.vue";
import OpeningTaskModal from '@/components/OpeningTaskModal.vue';
import DailyTaskModal from '@/components/DailyTaskModal.vue';
import AdhocTaskModal from '@/components/AdhocTaskModal.vue';
import ClosingTaskModal from '@/components/ClosingTaskModal.vue';
import OtherClosingTaskModal from '@/components/OtherClosingTaskModal.vue';
import PoolCapacityModal from '@/components/PoolCapacityModal.vue';

export default {
  components: {
    HeaderComponent,
    OpeningTaskModal,
    DailyTaskModal,
    AdhocTaskModal,
    ClosingTaskModal,
    OtherClosingTaskModal,
    PoolCapacityModal,
  },
  data() {
    return {
      currentDate: new Date().toLocaleDateString('en-CA', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
      modalTitle: '',
      employeeId: '',
      password: '',
      users: [],  // Make sure to populate this array with actual user data
      errorMessage: null
    };
  },
  methods: {
    openModal(modalType) {
      this.$refs[`${modalType}Modal`].openModal();
    },
    
    handleLogin() {
      this.errorMessage = null;
      if (this.employeeId && this.password) {
        const user = this.users.find(
          (user) => user.username === this.employeeId && user.password === this.password
        );

        if (user) {
          localStorage.setItem("user", JSON.stringify(user));
          this.$router.push({ name: 'Dashboard' });  // Using named route (recommended)
        } else {
          this.errorMessage = "Invalid Employee ID or Password.";
        }
      } else {
        this.errorMessage = "Please enter your Employee ID and Password.";
      }
    }
  },
  setup() {
    const router = useRouter();

    onMounted(() => {
      if (localStorage.getItem('user')) {
        router.push({ name: 'Dashboard' });  // Redirect to Dashboard if user is logged in
      }
    });
  }
};
</script>

<style scoped>
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
}

.container, .row, .col-md-3, .col-md-9 {
  margin: 0;
  padding: 0;
}

header {
  margin-bottom: 0;
}

main {
  padding-top: 0;
}

.card {
  cursor: pointer;
  transition: transform 0.2s ease;
}

.card-body {
  padding: 50px;
  height: 100%;
  text-align: center;
}

.progNum {
  font-size: 3vw;  /* Use relative font sizing for responsiveness */
  font-weight: bold;
  color: rgba(16, 168, 84, 1);
  font-family: Montserrat;
}

.huge-height {
  height: 250px;
}

@media (max-width: 1024px) {
  .col-md-3 {
    margin-bottom: 20px;
  }
}

@media (max-width: 768px) {
  .col-lg-3 {
    flex: 1 0 100%;
  }

  .btn-lg {
    font-size: 1rem;
    padding: 10px;
  }

  .card-body {
    padding: 20px;
  }

  .progNum {
    font-size: 4vw;  /* Slightly larger for smaller devices */
  }

  .huge-height {
    height: 200px; /* Reduce height for smaller screens */
  }

  .card-body {
    padding: 10px;
  }
}
</style>
