<template>
  <div id="app">
    <div class="page-container">
      <h1>Hospital Management System</h1>
      <nav>
        <div class="nav-links">
          <router-link v-if="!isLoggedIn" to="/">Home</router-link>
          <router-link v-if="!isLoggedIn" to="/patient-login">Patient Login</router-link>
          <router-link v-if="!isLoggedIn" to="/staff-login">Staff Login</router-link>
          <router-link v-if="!isLoggedIn" to="/patient-register">Patient Register</router-link>
        </div>
        <button v-if="isLoggedIn" @click="logout" class="nav-link-button">Logout</button>
      </nav>
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      isLoggedIn: localStorage.getItem('isLoggedIn') === 'true',
    };
  },
  methods: {
    logout() {
      localStorage.clear();
      this.isLoggedIn = false;
      this.$router.push('/');
    },
  },
  watch: {
    '$route'(to, from) {
      this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    }
  }
};
</script>

<style scoped>
.page-container {
  min-height: 100vh;
  background: linear-gradient(to right, #83a4d4, #b6fbff);
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

h1 {
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 20px;
}

nav {
  background-color: #ffffff;
  padding: 15px;
  border-radius: 12px;
  margin-bottom: 30px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-links {
  display: flex;
  gap: 10px;
}

nav a {
  padding: 8px 15px;
  border-radius: 8px;
  background-color: #0077cc;
  color: white;
  text-decoration: none;
  font-weight: bold;
}

nav a:hover {
  background-color: #005fa3;
}

button.nav-link-button {
  padding: 8px 15px;
  border-radius: 8px;
  background-color: #0077cc;
  color: white;
  border: none;
  font-weight: bold;
  cursor: pointer;
  font-size: 1rem;
  line-height: 1.5;
}

button.nav-link-button:hover {
  background-color: #005fa3;
}

form {
  background-color: #ffffff;
  padding: 20px;
  margin: 20px auto;
  max-width: 400px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
}

input {
  width: 90%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 8px;
}

button {
  padding: 10px 20px;
  background-color: #28a745;
  color: white;
  border: none;
  margin-top: 10px;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
}

button:hover {
  background-color: #218838;
}

ul {
  list-style: none;
  padding: 0;
}

ul li {
  background-color: #ffffff;
  margin: 10px;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

ul li a {
  text-decoration: none;
  color: #333;
  font-weight: bold;
}

ul li a:hover {
  color: #0077cc;
}

.router-link-active {
  background-color: #005fa3;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.2);
}
</style>
