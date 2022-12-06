import Vue from 'vue';

import App from './App.vue';
import InputTelStore from './components/input-tel/store';

import '@/styles/index.css';

InputTelStore.setCountryList(
  fetch('https://api-dev.ifreight.id/api/v1/country', { methods: 'GET' })
    .then((response) => response.text())
    .then((response) => JSON.parse(response)),
);

new Vue({
  render: (h) => h(App),
}).$mount('#app');
