<template>
  <header class="navbar navbar-expand-lg text-white py-3 header-bg">
    <div class="container-fluid d-flex justify-content-between align-items-center position-relative">
      <!-- Left Section: Logo and Greeting -->
      <div class="d-flex flex-column align-items-start">
        <!-- Logo -->
        <img src="@/assets/vlogo.png" alt="Logo" class="mb-2" style="width: 220px; height: auto;" />
        <!-- Greeting -->
        <div class="text-left">
          <h2 class="h5 mb-0">Good Morning, {{ userName }}</h2>
        </div>
      </div>

      <!-- Right Section: Date and Sign Out -->
      <div class="d-flex flex-column align-items-end">
        <!-- Date -->
        <span class="mb-2" style="font-size: 14px;">{{ currentDate }}</span>
        <!-- Log Out Button -->
        <button @click="signOut" class="btn btn-outline-light btn-sm">
          <i class="bi bi-box-arrow-right"></i>
        </button>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "HeaderComponent",
  data() {
    return {
      userName: "",  // Initially empty, will be set from localStorage
      currentDate: this.getCurrentDate(),
      currentTime: this.getCurrentTime(),
    };
  },
  methods: {
    getCurrentDate() {
      const now = new Date();
      return now.toLocaleDateString(); // Formats the date based on locale (e.g., "November 1, 2024")
    },
    getCurrentTime() {
      const now = new Date();
      return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    },
    signOut() {
      console.log("User signed out");
      // Remove user data from localStorage and navigate to login page
      localStorage.removeItem('user');
      this.$router.push({ name: 'LoginAc' });  // Redirect to login page
    },
  },
  mounted() {
    // Set username from localStorage if available
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.username) {
      this.userName = user.username;
    } else {
      this.userName = "Guest";  // Default if no user is logged in
    }

    // Update time every minute
    this.timeInterval = setInterval(() => {
      this.currentTime = this.getCurrentTime();
    }, 60000);
  },
  beforeUnmount() {
    clearInterval(this.timeInterval);
  },
};
</script>

<style scoped>
.header-bg {
  background: url('@/assets/vbbg.jpg') no-repeat center center;
  background-size: cover;
  position: relative;
}

.header-bg::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(129, 164, 62, 0.9); /* Adjust opacity with alpha value */
  z-index: 1;
}

.container-fluid {
  position: relative;
  z-index: 2; /* Ensure the content is above the overlay */
}

button {
  font-size: 14px;
}

.text-left {
  font-family: Montserrat;
  text-align: left;
}

.text-right {
  text-align: right;
}
</style>
