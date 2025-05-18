<template>
  <div class="dashboard-container">
    <h2>Welcome {{ name }} {{ surname }}!</h2>

    <p class="appointment-created" v-if="appointmentCreated">Appointment created successfully!</p>

    <div class="top-section">
      <!-- Clinic selection on the left -->
      <div class="clinic-selection-box">
        <div class="clinic-selection">
          <label for="clinic-select">Select a Clinic:</label>
          <select id="clinic-select" v-model="selectedClinicId">
            <option disabled value="">-- Please choose a clinic --</option>
            <option v-for="clinic in $clinics" :key="clinic.id" :value="clinic.id">
              {{ clinic.name }}
            </option>
          </select>
        </div>
      </div>

      <!-- Doctor list on the right -->
      <div class="doctor-list-box" v-if="selectedClinicId">
        <div class="doctor-list">
          <h3>Doctors:</h3>
          <ul>
            <li
              v-for="doctor in filteredDoctors"
              :key="doctor.email"
              @click="selectDoctor(doctor)"
              class="doctor-item"
            >
              {{ doctor.name }} {{ doctor.surname }}
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Appointment form below -->
    <div v-if="selectedDoctor" class="appointment-form">
      <h3>Make Appointment with Dr. {{ selectedDoctor.name }} {{ selectedDoctor.surname }}</h3>
      <form @submit.prevent="submitAppointment">
        <label for="appointment-date">Date:</label>
        <input id="appointment-date" type="date" v-model="appointmentDate" required />

        <label for="appointment-time">Time:</label>
        <select id="appointment-time" v-model="appointmentTime" required>
          <option disabled value="">-- Select Time --</option>
          <option v-for="time in availableTimes" :key="time" :value="time">
            {{ time }}
          </option>
        </select>

        <label for="appointment-reason">Reason:</label>
        <textarea
          id="appointment-reason"
          v-model="appointmentReason"
          required
          placeholder="Write the reason for your visit..."
        ></textarea>

        <button type="submit">Create Appointment</button>
      </form>
    </div>

    <div class="medical-history-box">
      <p>Other information about the patient (i.e. age, weight, height etc.) go here</p>
      <button @click="toggleMedicalHistory">{{ showMedicalHistory ? 'Hide Medical History' : 'See Medical History' }}</button>
      <div v-if="showMedicalHistory" class="medical-history-list">
        <h4>Medical History:</h4>
        <ul>
          <li v-for="history in filteredMedicalHistory" :key="history.notes">
            <p>{{ history.notes }}</p>
          </li>
        </ul>
      </div>
    </div>
    
  </div>
</template>

<script>
export default {
  name: 'PatientDashboard',
  data() {
    return {
      name: '',
      surname: '',
      phone: '',
      selectedClinicId: '',
      selectedDoctor: '',
      appointmentDate: '',
      appointmentTime: '',
      appointmentReason: '',
      showMedicalHistory: false,
      appointmentCreated: false,
    };
  },
  computed: {
    filteredDoctors() {
      return this.$doctors.filter(
        doctor => doctor.clinicId === Number(this.selectedClinicId)
      );
    },
    availableTimes() {
      const times = [];
      const startHour = 9;
      const endHour = 17;

      // Generate times from 09:00 to 17:00 in 15-minute intervals
      for (let hour = startHour; hour < endHour; hour++) {
        for (let minute = 0; minute < 60; minute += 15) {
          const formattedTime = `${this.formatTime(hour)}:${this.formatTime(minute)}`;
          times.push(formattedTime);
        }
      }
      return times;
    },
    filteredMedicalHistory() {
      const email = localStorage.getItem('userEmail');
      return this.$medicalHistories.filter(history => history.patientEmail === email);
    },
  },
  created() {
    this.setUserData();
  },
  methods: {
    setUserData() {
      const patientData = JSON.parse(localStorage.getItem('loggedInPatient'));

      if (patientData) {
        this.name = patientData.name;
        this.surname = patientData.surname;
        this.phone = patientData.phone;
      } else {
        alert("Something went wrong. Can't find user data!");
      }
    },
    selectDoctor(doctor) {
      this.selectedDoctor = doctor;
      this.appointmentDate = '';
      this.appointmentTime = '';
      this.appointmentReason = '';
    },
    submitAppointment() {
      const newAppointment = {
        patientEmail: localStorage.getItem('userEmail'),
        doctorEmail: this.selectedDoctor.email,
        date: this.appointmentDate,
        time: this.appointmentTime,
        reason: this.appointmentReason
      };

      this.$appointments.push(newAppointment);
      this.appointmentCreated = true;
      this.selectedDoctor = null;
    },
    formatTime(value) {
      return value < 10 ? `0${value}` : value;
    },
    toggleMedicalHistory() {
      this.showMedicalHistory = !this.showMedicalHistory;
    },
  }
};
</script>

<style scoped>
.dashboard-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 30px;
  font-family: 'Segoe UI', sans-serif;
}

h2 {
  margin-bottom: 20px;
  color: #333;
}

.top-section {
  display: flex;
  justify-content: space-between;
  gap: 40px;
  margin-bottom: 30px;
  flex-wrap: wrap;
}

.clinic-selection-box,
.doctor-list-box {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  flex: 1;
  min-width: 250px;
}

.clinic-selection,
.doctor-list {
  margin-bottom: 20px;
}

select {
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.doctor-list ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.doctor-item {
  background-color: #f4f6fa;
  padding: 10px;
  margin-bottom: 8px;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.doctor-item:hover {
  background-color: #dfeaff;
}

.appointment-form {
  margin-top: 30px;
  background-color: #f9fbff;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #ddd;
}

.appointment-form h3 {
  margin-bottom: 15px;
}

.appointment-created {
  color:green
}

form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

input,
textarea {
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

textarea {
  resize: vertical;
  min-height: 80px;
}

button {
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

.medical-history-box {
  margin-top: 30px;
  background-color: #f9fbff;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #ddd;
}

.medical-history-list {
  margin-top: 20px;
}

.medical-history-list ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.medical-history-list li {
  background-color: #f4f6fa;
  padding: 10px;
  margin-bottom: 8px;
  border-radius: 6px;
}

</style>