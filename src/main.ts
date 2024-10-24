import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia, PiniaPluginContext } from 'pinia';
import './style.css';

const app = createApp(App);
const pinia = createPinia();

// Плагін для Pinia
pinia.use((context: PiniaPluginContext) => {
    const storeId = context.store.$id;

    console.log(storeId);

    // Об'єкт для серіалізації/десеріалізації
    const serializer = {
        serialize: JSON.stringify,
        deserialize: (value: string) => JSON.parse(value),
    };

    // Отримання даних з localStorage, перевірка на null
    const storedValue = window.localStorage.getItem(storeId);
    const fromStorage = storedValue ? serializer.deserialize(storedValue) : null;

    if (fromStorage) {
        context.store.$patch(fromStorage);
    }

    // Підписка на зміни стану
    context.store.$subscribe((mutation, state) => {
        window.localStorage.setItem(storeId, serializer.serialize(state));
    });
});

// Використання Pinia та маршрутизатора
app.use(pinia);
app.use(router);
app.mount('#app');