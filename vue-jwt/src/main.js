import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import jwt_decode from "jwt-decode";

createApp(App)
  .use(store)
  .use(router, axios, jwt_decode)
  .use(VueSweetalert2)
  .mount("#app");
