import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App);

const patients = [
  { email: 'emirhan.cicekli@tedu.edu.tr', name: 'Emirhan', surname: 'Çiçekli', phone: '123-456-7890', password: 'pa' },
  { email: 'ibrahim.koyuncu@tedu.edu.tr', name: 'İbrahim Başar', surname: 'Koyuncu', phone: '098-765-4321', password: 'pa' },
];

const doctors = [
  { email: 'muhammedanildoni@doctor.com', name: 'Muhammed Anıl', surname: 'Doni', password: 'pa', clinicId: 0o001 },
  { email: 'muslumturkerkirtiz@doctor.com', name: 'Müslüm Türker', surname: 'Kırtız', password: 'pa', clinicId: 0o002 },
];

const admins = [
  { email: 'yaren.atilgan@tedu.edu.tr', name: 'Admin', password: 'pa' },
];

const clinics = [
  { name: 'Primary Care Clinic', id: 0o001 },
  { name: 'Neurology Clinic', id: 0o002 },
];

const appointments = [
  { patientEmail: 'emirhan.cicekli@tedu.edu.tr', doctorEmail: 'muhammedanildoni@doctor.com', date: '2025-05-20', time: '14:30', reason: 'Suffering from success...' },
  { patientEmail: 'emirhan.cicekli@tedu.edu.tr', doctorEmail: 'muslumturkerkirtiz@doctor.com', date: '2025-06-10', time: '10:00', reason: 'Headache.'},
  { patientEmail: 'ibrahim.koyuncu@tedu.edu.tr', doctorEmail: 'muslumturkerkirtiz@doctor.com', date: '2025-06-09', time: '13:45', reason: 'A very sensible reason.'},
];

const medicalHistories = [
  { patientEmail: 'emirhan.cicekli@tedu.edu.tr', notes: 'Suffered from failure on 30.12.2023, other notes from doctor go here.' },
  { patientEmail: 'ibrahim.koyuncu@tedu.edu.tr', notes: 'Visited the doctor for shoulder pain. Other doctor notes go here.' },
];

app.config.globalProperties.$patients = patients;
app.config.globalProperties.$doctors = doctors;
app.config.globalProperties.$admins = admins;
app.config.globalProperties.$clinics = clinics;
app.config.globalProperties.$appointments = appointments;
app.config.globalProperties.$medicalHistories = medicalHistories;

app.use(router).mount('#app');
