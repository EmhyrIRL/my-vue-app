import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../components/HomePage.vue';
import StaffLogin from '../components/StaffLogin.vue';
import PatientLogin from '../components/PatientLogin.vue';
import PatientRegister from '../components/PatientRegister.vue';
import PatientDashboard from '../components/PatientDashboard.vue';
import DoctorDashboard from '../components/DoctorDashboard.vue';
import AdminDashboard from '../components/AdminDashboard.vue';
import PatientPasswordChange from '../components/PatientPasswordChange.vue';

const routes = [
  { path: '/', component: HomePage },
  { path: '/patient-password-change', component: PatientPasswordChange },
  { path: '/patient-register', component: PatientRegister },
  { path: '/staff-login', component: StaffLogin },
  { path: '/patient-login', component: PatientLogin },
  { path: '/patient-dashboard', component: PatientDashboard },
  { path: '/doctor-dashboard', component: DoctorDashboard },
  { path: '/admin-dashboard', component: AdminDashboard },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;