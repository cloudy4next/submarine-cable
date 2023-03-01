require("./bootstrap");

window.Vue = require("vue").default;

// import { createApp } from 'vue';
import App from "./components/App.vue";
import routes from "./routes";
import { ValidationProvider } from "vee-validate/dist/vee-validate.full.esm";
import { ValidationObserver } from "vee-validate";
import LaravelPermissionToVueJS from 'laravel-permission-to-vuejs';
import Permissions from './mixins/Permissions';

// Chart
import { Bar } from 'vue-chartjs';
// import { Bar } from 'vue-chartjs/legacy'

// month picker
import { MonthPicker } from 'vue-month-picker';
import { MonthPickerInput } from 'vue-month-picker';


Vue.use(MonthPicker);
Vue.use(MonthPickerInput)

// datepicker
import Datepicker from 'vuejs-datepicker';
Vue.use(Datepicker);


import 'vue-event-calendar/dist/style.css' //^1.1.10, CSS has been extracted as one file, so you can easily update it.
import vueEventCalendar from 'vue-event-calendar'
// locale can be 'zh' , 'en' , 'es', 'pt-br', 'ja', 'ko', 'fr', 'it', 'ru', 'de', 'vi', 'ua', 'no, 'no-nn'
Vue.use(vueEventCalendar, { locale: 'en' });


// Vue.use(require('vue-resource'));

// Vue.component('pagination', require('laravel-vue-pagination'));

import VueCommaFilter from "vue-comma-filter";

Vue.use(VueCommaFilter);

// vue router
import VueRouter from "vue-router";
Vue.use(VueRouter);

Vue.component("app-component", require("./components/App.vue").default);


// 2nd convert Number to words
const converter2nd = require('taka-amount-to-word-js');

Vue.filter('toWords', function (value) {
    if (!value) return '';
    return converter2nd(value);
});




// 1st convert Number to words
// import { Converter, bnBD } from "any-number-to-words";
// const converter = new Converter();


// Vue.filter('toWords', function (value, currency = null) {
//     if (!value) return '';
//     if (currency === 'BDT')
//         return converter.toWords(value, bnBD);
//     else
//         return converter.toWords(value);
// });


Vue.filter('capitalize', function (value) {
    if (!value) return ''
    value = value.toString()
    return value.charAt(0).toUpperCase() + value.slice(1)
});

//sweetalert2
import Swal from "sweetalert2";
const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    onOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
});

window.Swal = Swal;
window.Toast = Toast;

//vee-validator
Vue.component("ValidationProvider", ValidationProvider);
Vue.component("ValidationObserver", ValidationObserver);

// vue
Vue.mixin(Permissions);

const router = new VueRouter({
    mode: "history",
    routes,
});

new Vue({
    render: (h) => h("app-component"),
    router,
}).$mount("#app");


// const app = createApp(App)
// app.use(LaravelPermissionToVueJS)
// app.mount('#second-app')

// const app = Vue(App)
// app.use(LaravelPermissionToVueJS);
// app.mount('#app');
