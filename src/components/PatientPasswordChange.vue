<template>
  <div class="password-change-container">
    <h2>Change Your Password</h2>
    <form @submit.prevent="handleChangePasswordRequest">
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" placeholder="Enter your email" required />
      </div>

      <button type="submit">Confirm</button>
      <p v-if="emailNotFound" style="color: red;">Email not found!</p>
      <p v-if="successMessage" style="color: green;">Password reset message has been sent to your phone.</p>
    </form>
  </div>
  <br>
  <div class="password-change-container" v-if="successMessage">
    <h4>The placeholder SMS code is: 1111</h4>
    <form @submit.prevent="handleChangePassword">
      <div class="form-group">
        <label for="code">SMS Code:</label>
        <input type="text" id="code" v-model="code" placeholder="Enter the SMS sent to your phone" required />
        <label for="newPassword">New Password:</label>
        <input type="password" id="newPassword" v-model="newPassword" required />
        <label for="passwordRepeat">Confirm Password:</label>
        <input type="password" id="passwordRepeat" v-model="passwordRepeat" required />
      </div>

      <button type="submit">Confirm</button>
      <p v-if="codeIncorrect" style="color: red;">The SMS code you entered is incorrect</p>
      <p v-if="passwordMatchError" style="color: red;">The passwords do not match!</p>
      <p v-if="passwordChanged" style="color: green;">Your password has been reset.</p>
    </form>
  </div>
</template>

<script>
export default {
  name: 'PatientPasswordChange',
  data() {
    return {
      email: '',
      code: '',
      emailNotFound: false,
      successMessage: false,
      codeIncorrect: false,
      passwordChanged: false,
      newPassword: '',
      passwordRepeat: '',
      passwordMatchError: false,
    };
  },
  methods: {
    handleChangePasswordRequest() {
      this.emailNotFound = false;
      this.successMessage = false;

      const patient = this.$patients.find(p => p.email === this.email);
      const doctor = this.$doctors.find(d => d.email === this.email);

      if (patient || doctor) {
        this.successMessage = true;
      } else {
        this.emailNotFound = true;
      }
    },
    handleChangePassword() {
      this.codeIncorrect = false;
      this.passwordChanged = false;
      this.passwordMatchError = false;
      
      const patient = this.$patients.find(p => p.email === this.email);
      const doctor = this.$doctors.find(d => d.email === this.email);

      if (!(this.code === '1111')) {
        this.codeIncorrect = true;
      } else if (this.newPassword != this.passwordRepeat) {
        this.passwordMatchError = true;
      } else {
        if (patient) {
          patient.password = this.newPassword;
        } else if (doctor) {
          doctor.password = this.newPassword;
        }
        this.passwordChanged = true;
      }


    }
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