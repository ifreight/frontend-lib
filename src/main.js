import Vue from 'vue';

import '@/styles/index.css';

import InputTelStore from './components/input-tel/store';

import App from './App.vue';

InputTelStore.setCountryList(
  fetch('https://api-dev.ifreight.id/api/v1/country', { methods: 'GET' })
    .then((response) => response.text())
    .then((response) => JSON.parse(response)),
);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');
