import { createApp } from 'vue'
import App from "./App.vue";
import router from './router'
import {createPinia} from 'pinia'
import './style.css'
const app = createApp(App);
const pinia = createPinia()

pinia.use((context) => {
    const storeId = context.store.$id

    console.log(storeId)

    const serilizer = {
        serialize: JSON.stringify,
        deserialize: JSON.parse
    }

    const fromStorage = serilizer.deserialize(window.localStorage.getItem(storeId))

    if(fromStorage){
        context.store.$patch(fromStorage)
    }

    context.store.$subscribe((mutation, state) => {
        window.localStorage.setItem(storeId, serilizer.serialize(state))
    })
})


app.use(pinia)
app.use(router)
app.mount('#app')
