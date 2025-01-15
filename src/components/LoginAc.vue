<template>
  <div class="container-fluid d-flex align-items-center justify-content-center vh-100 login-background">
    <div class="card text-center shadow-lg p-4 login-card">
      <img src="@/assets/vlogo.png" alt="Vulcan Logo" class="mx-auto mb-2" width="120" />
      <h5 class="font-weight-bold mb-3">SWIMMING POOL MANAGEMENT SYSTEM</h5>
      <p class="mb-4">WELCOME BACK!</p>

      <form @submit.prevent="handleLogin">
        <div class="form-group mb-3">
          <label for="employeeId" class="sr-only">Employee ID</label>
          <div class="input-group">
            <span class="input-group-text"><i class="bi bi-person"></i></span>
            <input
              v-model="employeeId"
              type="text"
              id="employeeId"
              class="form-control"
              placeholder="Employee ID"
              required
            />
          </div>
        </div>

        <div class="form-group mb-3">
          <label for="password" class="sr-only">Password</label>
          <div class="input-group">
            <span class="input-group-text"><i class="bi bi-lock"></i></span>
            <input
              v-model="password"
              type="password"
              id="password"
              class="form-control"
              placeholder="Password"
              required
            />
          </div>
        </div>

        <button type="submit" class="btn btn-primary w-100">LOGIN</button>
      </form>

      <div class="mt-4 small">
        <p>
          POWERED BY <span class="text-primary font-weight-bold">TECHBRIDGE DYNAMICS</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const employeeId = ref('');
const password = ref('');
const errorMessage = ref(null);

// Dummy user data for testing login
const users = ref([
  { id: 1, username: 'admin', password: 'admin', role: 'admin' },
  { id: 2, username: 'employee1', password: 'password456', role: 'employee' },
  { id: 3, username: 'fjb', password: '123', role: 'employee' },
]);

// Handle login
const handleLogin = () => {
  errorMessage.value = null;

  if (employeeId.value && password.value) {
    const user = users.value.find(
      (user) => user.username === employeeId.value && user.password === password.value
    );

    if (user) {
      // Save user data to localStorage
      localStorage.setItem('user', JSON.stringify(user));
      console.log('Login successful, redirecting to DashboardVS...');
      router.push('/DashboardVS'); // Redirect to Dashboard
    } else {
      errorMessage.value = 'Invalid Employee ID or Password.';
    }
  } else {
    errorMessage.value = 'Please enter both Employee ID and Password.';
  }
};

// Check if the user is already logged in on mount and prevent auto-trigger of modal
onMounted(() => {
  const loggedInUser = localStorage.getItem('user');
  if (loggedInUser) {
    console.log('User is already logged in, redirecting to DashboardVS...');
    router.push('/DashboardVS'); // Redirect to Dashboard if logged in
  }
});
</script>


<style scoped>
/* Background styling with vbbg.jpg and gradient overlay */
.login-background {
  background: linear-gradient(to right, rgba(77, 110, 151, 0.6), rgba(153, 193, 158, 0.6)), 
              url('@/assets/vbbg.jpg') no-repeat center center fixed;
  background-size: cover;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh; /* Ensure full height */
}

/* Overlay for opacity */
.login-background::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Adjust opacity as needed */
  z-index: 0; /* Ensure it stays below the content */
}

/* Card styling */
.login-card {
  max-width: 400px;
  border-radius: 15px;
  background: #ffffff;
  z-index: 1; /* Ensure it stays above the background */
  padding: 2rem;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

/* Focus state for input fields */
input:focus {
  box-shadow: none;
  border-color: #4d6e97;
}

/* Responsive design */
@media (min-width: 768px) and (max-width: 1024px) { /* iPads */
  .login-card {
    max-width: 500px; /* Slightly wider for iPad */
    padding: 2.5rem;
  }
}

@media (max-width: 767px) { /* Mobile devices */
  .login-card {
    width: 90%; /* Use most of the screen width */
    padding: 1.5rem;
  }
}

@media (min-width: 1025px) { /* Larger screens */
  .login-card {
    max-width: 450px;
  }
}
.modal-title {
    font-family: 'Montserrat', sans-serif;
    font-weight: bold;
}
</style>