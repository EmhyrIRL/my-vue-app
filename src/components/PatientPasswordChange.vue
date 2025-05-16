<template>
  <div class="password-change-container">
    <h2>Change Your Password</h2>
    <form>
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" placeholder="Enter your email" required />
      </div>

      <div class="form-group">
        <label for="phone">Phone Number:</label>
        <input type="text" id="phone" v-model="phone" placeholder="Enter your phone number" required />
      </div>

      <router-link to="/" class="confirm-button">
        <button type="button">Confirm</button>
      </router-link>
    </form>
  </div>
</template>

<script>
export default {
  name: 'PatientPasswordChange',
  data() {
    return {
      email: '',
      phone: ''
    };
  }
};
</script>

<style scoped>
.password-change-container {
  max-width: 500px;
  margin: 0 auto;
  padding: 30px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  font-family: 'Segoe UI', sans-serif;
}

h2 {
  margin-bottom: 20px;
  color: #333;
  text-align: center;
}

.form-group {
  margin-bottom: 20px;
}

label {
  font-size: 1rem;
  color: #555;
  display: block;
  margin-bottom: 8px;
}

input {
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

input:focus {
  border-color: #007bff;
  outline: none;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  font-size: 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0069d9;
}

.confirm-button {
  text-decoration: none; /* Remove underline from the link */
}
</style>