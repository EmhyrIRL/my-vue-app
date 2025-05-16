<template>
  <div class="admin-dashboard">
    <h2>Admin Dashboard</h2>

    <!-- Add Doctor Section -->
    <div class="box-section">
      <h3>Add a New Doctor</h3>
      <form @submit.prevent="addDoctor">
        <div class="form-group">
          <label for="doctorName">First Name:</label>
          <input id="doctorName" v-model="newDoctor.name" type="text" required />
        </div>
        <div class="form-group">
          <label for="doctorSurname">Last Name:</label>
          <input id="doctorSurname" v-model="newDoctor.surname" type="text" required />
        </div>
        <div class="form-group">
          <label for="doctorEmail">Email:</label>
          <input id="doctorEmail" v-model="newDoctor.email" type="email" required />
        </div>
        <div class="form-group">
          <label for="doctorPassword">Password:</label>
          <input id="doctorPassword" v-model="newDoctor.password" type="password" required />
        </div>
        <div class="form-group">
          <label for="clinicSelect">Clinic:</label>
          <select id="clinicSelect" v-model="selectedClinicName" required>
            <option disabled value="">Select a clinic</option>
            <option v-for="clinic in clinics" :key="clinic.id" :value="clinic.name">
              {{ clinic.name }}
            </option>
          </select>
        </div>
        <button type="submit">Add Doctor</button>
        <p v-if="addSuccess" class="success-msg">Doctor added successfully.</p>
        <p v-if="addError" class="error-msg">Failed to add doctor. Please check all fields.</p>
      </form>
    </div>

    <!-- Remove Doctor Section -->
    <div class="box-section">
      <h3>Remove a Doctor</h3>
      <ul>
        <li v-for="doctor in doctors" :key="doctor.email">
          {{ doctor.name }} {{ doctor.surname }} ({{ doctor.email }}) - Clinic ID: {{ doctor.clinicId }}
          <button @click="removeDoctor(doctor.email)">Remove</button>
        </li>
      </ul>
    </div>

    <!-- Appointments Section -->
    <div class="box-section">
      <h3>All Appointments</h3>
      <ul v-if="appointments.length">
        <li v-for="(appt, index) in appointments" :key="index">
          <strong>Patient:</strong> {{ appt.patientEmail }}<br />
          <strong>Doctor:</strong> {{ appt.doctorEmail }}<br />
          <strong>Date:</strong> {{ appt.date }} at {{ appt.time }}<br />
          <strong>Reason:</strong> {{ appt.reason }}
        </li>
      </ul>
      <p v-else>No appointments in the system.</p>
    </div>

    <!-- Alerts Section (Placeholder) -->
    <div class="box-section">
      <h3>Alerts:</h3>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminDashboard',
  data() {
    return {
      newDoctor: {
        name: '',
        surname: '',
        email: '',
        password: '',
      },
      selectedClinicName: '',
      addSuccess: false,
      addError: false,
    };
  },
  computed: {
    doctors() {
      return this.$doctors || [];
    },
    clinics() {
      return this.$clinics || [];
    },
    appointments() {
      return this.$appointments || [];
    }
  },
  methods: {
    addDoctor() {
      const clinic = this.clinics.find(c => c.name === this.selectedClinicName);
      if (!clinic) {
        this.addError = true;
        this.addSuccess = false;
        return;
      }

      const doctorToAdd = {
        ...this.newDoctor,
        clinicId: clinic.id
      };

      this.$doctors.push(doctorToAdd);

      this.newDoctor = { name: '', surname: '', email: '', password: '' };
      this.selectedClinicName = '';
      this.addSuccess = true;
      this.addError = false;
    },
    removeDoctor(email) {
      const index = this.$doctors.findIndex(doc => doc.email === email);
      if (index !== -1) this.$doctors.splice(index, 1);
    }
  }
};
</script>

<style scoped>
.admin-dashboard {
  max-width: 600px;
  margin: 40px auto;
  font-family: 'Segoe UI', sans-serif;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

.box-section {
  background: white;
  padding: 20px 25px;
  border-radius: 8px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
}

.box-section h3 {
  color: #007bff;
  margin-bottom: 15px;
}

.form-group {
  margin-bottom: 15px;
}

input,
select {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

button {
  padding: 10px 15px;
  margin-top: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

.success-msg {
  margin-top: 10px;
  color: green;
}

.error-msg {
  margin-top: 10px;
  color: red;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  margin-bottom: 15px;
  background: #f8f9fa;
  padding: 10px;
  border-radius: 5px;
}
</style>