import {createApp} from 'vue';
import App from './App.vue';
import PrimeVue from 'primevue/config';
import router from "./router";
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

import "primeflex/primeflex.css";

const app = createApp(App);

app.use(router).mount("#app");
app.use(PrimeVue)
app.component('InputText',InputText)
app.component('Button',Button)
app.component('DataTable',DataTable)
app.component('Column',Column)