<template>
  <div class="register-container">
    <div class="login-content">
      <div class="login-card">
        <h2>Register</h2>
        <form @submit.prevent="handleRegister">
          <label>
            Email:
            <input v-model="email" type="email" placeholder="Enter your email" required />
          </label>
          <label>
            Name:
            <input v-model="name" type="text" placeholder="Enter your name" required />
          </label>
          <label>
            Surname:
            <input v-model="surname" type="text" placeholder="Enter your surname" required />
          </label>
          <label>
            Phone Number:
            <input v-model="phone" type="tel" placeholder="(XXX) XXX-XXXX" required />
          </label>
          <label>
            Password:
            <input v-model="password" type="password" placeholder="Create a password" required />
          </label>
          <label>
            Confirm Password:
            <input v-model="confirmPassword" type="password" placeholder="Confirm your password" required />
          </label>
          <button type="submit">Register</button>
        </form>
      </div>
      <div class="login-footer">
        <p>Already have an account? <router-link to="/patient-login">Login here</router-link></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PatientRegister',
  data() {
    return {
      email: '',
      name: '',
      surname: '',
      phone: '',
      password: '',
      confirmPassword: ''
    };
  },
  methods: {
    handleRegister() {
      if (this.password !== this.confirmPassword) {
        alert("Passwords do not match!");
        return;
      }

      const existing = this.$patients.find(user => user.email === this.email);
      if (existing) {
        alert("Email already registered!");
        return;
      }

      const newUser = {
        email: this.email,
        name: this.name,
        surname: this.surname,
        phone: this.phone,
        password: this.password,
      };

      this.$patients.push(newUser); // Updates global list

      alert('Registration successful!');
      this.$router.push('/patient-login');
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