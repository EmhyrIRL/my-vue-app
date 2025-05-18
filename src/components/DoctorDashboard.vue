<template>
  <div class="doctor-dashboard-container">
    <h2>Welcome, Dr. {{ doctor.name }} {{ doctor.surname }}!</h2>
    
    <!-- Appointments List -->
    <div class="box-section" v-if="appointments.length > 0">
      <h3>Your Appointments</h3>
      <ul>
        <li v-for="appointment in appointments" :key="appointment.id">
          <p><strong>Patient:</strong> {{ appointment.patientName }}</p>
          <p><strong>Date:</strong> {{ appointment.date }}</p>
          <p><strong>Time:</strong> {{ appointment.time }}</p>
          <p><strong>Reason:</strong> {{ appointment.reason }}</p>
        </li>
      </ul>
    </div>

    <!-- If no appointments -->
    <p v-else>No upcoming appointments.</p>

    <!-- Medical History Form -->
    <div class="box-section">
      <h3>Record a Medical History for a Patient</h3>
      <form @submit.prevent="handleMedicalHistorySubmit">
        <div class="form-group">
          <label for="patientName">Patient's Name (First Last):</label>
          <input id="patientName" v-model="patientName" type="text" required />
        </div>
        <div class="form-group">
          <label for="medicalNotes">Medical Notes:</label>
          <textarea id="medicalNotes" v-model="medicalNotes" required></textarea>
        </div>
        <button type="submit">Add Medical History</button>
      </form>
      <p v-if="historySuccess" style="color: green;">Medical history successfully added.</p>
      <p v-if="historyError" style="color: red;">Failed to add medical history. Patient not found.</p>
    </div>

    <!-- Search for a Patient's Medical History -->
    <div class="box-section">
      <h3>Search for a Patient's Medical History</h3>
      <form @submit.prevent="findPatientMedicalHistory">
        <div class="form-group">
          <label for="searchPatientName">Patient's Name:</label>
          <input id="searchPatientName" v-model="searchPatientName" type="text" required />
        </div>
        <button type="submit">Search</button>
      </form>
    </div>

    <!-- View Medical History -->
    <div class="box-section" v-if="viewingHistory">
      <h3>View Medical History for {{ viewingHistory.name }}</h3>
      <div v-if="patientHistory.length > 0">
        <ul>
          <li v-for="history in patientHistory" :key="history.id">
            <p><strong>Notes:</strong> {{ history.notes }}</p>
          </li>
        </ul>
      </div>
      <p v-else>No medical history found for this patient.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DoctorDashboard',
  data() {
    return {
      doctor: null,
      appointments: [],
      patientName: '',
      medicalNotes: '',
      historySuccess: false,
      historyError: false,
      searchPatientName: '',
      patientHistory: [],
      viewingHistory: null,
    };
  },
  created() {
    this.findDoctor();
    this.findAppointments();
  },
  methods: {
    findDoctor() {
      const userEmail = localStorage.getItem('userEmail');
      this.doctor = this.$doctors.find(doctor => doctor.email === userEmail);
    },
    findAppointments() { // Chatgpt wrote this, I'm not sure how it works exactly...
      const userEmail = localStorage.getItem('userEmail');
      this.appointments = this.$appointments.filter(appointment => appointment.doctorEmail === userEmail)
                                             .map(appointment => ({
                                                ...appointment,
                                                patientName: this.$patients.find(patient => patient.email === appointment.patientEmail).name
                                              }));
    },
    // Handle medical history form submission
    handleMedicalHistorySubmit() {

      this.historySuccess = false;
      this.historyError = false;

      // Split the full name into first name and surname
      const inputName = this.patientName.trim().toLowerCase();

      const patient = this.$patients.find(patient =>
        (patient.name.trim().toLowerCase() + ' ' + patient.surname.trim().toLowerCase()) === inputName
      );

      if (patient) {
        // Add the new medical history to the $medicalHistories array
        const newMedicalHistory = {
          patientEmail: patient.email, // Use the patient's email
          notes: this.medicalNotes,
        };

        // Update the $medicalHistories array (simulated here by pushing to global properties)
        this.$medicalHistories.push(newMedicalHistory);

        // Clear the form
        this.patientName = '';
        this.medicalNotes = '';

        // Show success message
        this.historySuccess = true;
        this.historyError = false;
      } else {
        // If the patient is not found
        this.historyError = true;
        this.historySuccess = false;
      }
    },

    // Find and display a patient's medical history
    findPatientMedicalHistory() {
      
      this.viewingHistory = null;

      const inputName = this.searchPatientName.trim().toLowerCase();

      // Find the patient by their full name
      const patient = this.$patients.find(patient =>
        (patient.name.trim().toLowerCase() + ' ' + patient.surname.trim().toLowerCase()) === inputName
      );

      if (patient) {
        // Set the patient to be viewed
        this.viewingHistory = patient;
        // Get the patient's medical history
        this.patientHistory = this.$medicalHistories.filter(history => history.patientEmail === patient.email);
      } else {
        this.viewingHistory = null;
        this.patientHistory = [];
        alert('Patient not found.');
      }
    },
  },
};
</script>

<style scoped>
.doctor-dashboard-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 30px;
  font-family: 'Segoe UI', sans-serif;
}

h2 {
  text-align: center;
  color: #333;
}

.box-section {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
}

h3 {
  margin-bottom: 15px;
  color: #007bff;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

li {
  background-color: #f4f6fa;
  padding: 10px;
  margin-bottom: 12px;
  border-radius: 6px;
}

p {
  margin: 5px 0;
}

strong {
  color: #333;
}

.form-group {
  margin-bottom: 15px;
}

input, textarea {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

button {
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 15px;
}

button:hover {
  background-color: #0056b3;
}
</style>
