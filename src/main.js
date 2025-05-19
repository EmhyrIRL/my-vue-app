import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App);

const patients = [
  { email: 'emirhan@example', name: 'Emirhan', surname: 'Çiçekli', phone: '123-456-7890', password: 'password' },
  { email: 'basar@example', name: 'İbrahim Başar', surname: 'Koyuncu', phone: '098-765-4321', password: 'password' },
];

/*
Patient 1
Email: emirhan.cicekli@tedu.edu.tr
Password: password

Patient 2
Email: ibrahim.koyuncu@tedu.edu.tr
Password: password
*/

const doctors = [
  { email: 'anil@example', name: 'Muhammed Anıl', surname: 'Doni', password: 'password', clinicId: 0o001 },
  { email: 'turker@example', name: 'Müslüm Türker', surname: 'Kırtız', password: 'password', clinicId: 0o002 },
];

/*
Doctor 1
Email: muhammedanildoni@doctor.com
Password: password
Doctor 2
Email: muslumturkerkirtiz@doctor.com
Password: password
*/

const admins = [
  { email: 'yaren@example', name: 'Admin', password: 'password' },
];

/*
Admin 1
Email: yaren@example
Password: password
*/

const clinics = [
  { name: 'Primary Care Clinic', id: 0o001 },
  { name: 'Neurology Clinic', id: 0o002 },
];

const appointments = [
  { patientEmail: 'emirhan@example', doctorEmail: 'anil@example', date: '2025-05-20', time: '14:30', reason: 'Suffering from success...' },
  { patientEmail: 'emirhan@example', doctorEmail: 'turker@example', date: '2025-06-10', time: '10:00', reason: 'Headache.'},
  { patientEmail: 'basar@example', doctorEmail: 'turker@example', date: '2025-06-09', time: '13:45', reason: 'A very sensible reason.'},
];

const medicalHistories = [
  { patientEmail: 'emirhan@example', notes: 'Suffered from failure on 30.12.2023, other notes from doctor go here.' },
  { patientEmail: 'basar@example', notes: 'Visited the doctor for shoulder pain. Other doctor notes go here.' },
];

app.config.globalProperties.$patients = patients;
app.config.globalProperties.$doctors = doctors;
app.config.globalProperties.$admins = admins;
app.config.globalProperties.$clinics = clinics;
app.config.globalProperties.$appointments = appointments;
app.config.globalProperties.$medicalHistories = medicalHistories;

app.use(router).mount('#app');
