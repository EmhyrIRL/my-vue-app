<template>
  <div class="login-container">
    <div class="login-content">
      <div class="login-card">
        <h2>Login</h2>
        <form @submit.prevent="handleLogin">
          <label>
            Email:
            <input v-model="email" type="email" required />
          </label>
          <label>
            Password:
            <input v-model="password" type="password" required />
          </label>
          <button type="submit">Login</button>
        </form>
        <p v-if="loginError" style="color: red;">Invalid credentials. Please try again.</p>
        <p v-if="passwordError" style="color: red;">You have entered the wrong password.</p>
      </div>

      <div class="forgot-password-card">
        <router-link to="/patient-password-change">Forgot Password?</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PatientLogin',
  data() {
    return {
      email: '',
      password: '',
      loginError: false,
      passwordError: false,
    };
  },
  methods: {
    handleLogin() {
      this.loginError = false;
      this.passwordError = false;

      const patient = this.$patients.find(p => p.email === this.email);
      if (patient) {
        if (patient.password === this.password) {
          localStorage.setItem('userRole', 'patient');
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('userEmail', this.email);
          localStorage.setItem('loggedInPatient', JSON.stringify(patient));
          this.$router.push('/patient-dashboard');
        } else {
          this.passwordError = true;
        }
      } else {
        this.loginError = true;
      }
    }
  }
};
</script>

<style scoped>
label {
  display: block;
  text-align: left;
  margin-bottom: 10px;
  font-weight: 600;
  color: #333;
}

input {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.login-container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 40px;
  min-height: calc(100vh - 100px);
}

.login-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
}

.login-card,
.forgot-password-card {
  background: #fff;
  padding: 2rem;
  width: 100%;
  max-width: 400px;
  border-radius: 1rem;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.login-card h2 {
  margin-bottom: 1.5rem;
  color: #0077cc;
}

button {
  width: 100%;
  padding: 0.75rem;
  background-color: #0077cc;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

button:hover {
  background-color: #005fa3;
}

.forgot-password-card a {
  margin: 0 10px;
  padding: 8px 15px;
  border-radius: 8px;
  background-color: #0077cc;
  color: white;
  text-decoration: none;
  font-weight: bold;
}

.forgot-password-card a:hover {
  background-color: #005fa3;
}

</style>