<script setup lang="ts">
import {country} from "../stores/country.ts";
import {onMounted, ref} from "vue";
import router from "../router";

const CountryStore = country()
const flagUrl = 'https://flagcdn.com/'
const selectedYear = ref(new Date().getFullYear())
onMounted(async () => {
  await CountryStore.publicHolidays(2024, CountryStore.selectedCountry.countryCode)
})
</script>

<template>
  <header class="header">
    <div class="back-button" @click="router.replace('/main/home')">
      <img src="https://cdn-icons-png.flaticon.com/512/0/340.png" width="32" height="32">
      <p>Back</p>
    </div>
    <img class="flag-image" :src="flagUrl + CountryStore.selectedCountry.countryCode.toLowerCase() + '.svg'">
      <p>
      {{ CountryStore.selectedCountry.name }}
      </p>
  </header>
  <div class="container">


    <section class="main-content">
      <div class="holidays-info">
        <div class="holiday" v-for="holiday in CountryStore.publicHolidaysList" :key="holiday.name">
          <h1>{{ holiday.name }}</h1>
          <p>{{ holiday.date }}</p>
        </div>
      </div>
    </section>

    <div class="calendar-block">
      <div class="calendar" :class="{ 'selected-date': selectedYear === (2019 + index) }" v-for="index in 11"
           :key="index" @click="CountryStore.publicHolidays(2019 + index, CountryStore.selectedCountry.countryCode); selectedYear = 2019 + index">
          {{ 2019 + index }}
      </div>
    </div>
  </div>

</template>

<style lang="scss" scoped>
.header{
  background: var(--green-main);
  height: 80px;
  padding: 16px;
  display: flex;
  align-items: center;
  font-weight: bold;
  text-transform: capitalize;
  gap: 16px;

  & .back-button{
    cursor: pointer;
    display: flex;
    flex-direction: column;

    & p{
      margin: 0;
    }
  }
  & .flag-image{
    width: 75px;
    height: 50px;
    object-fit: contain;
  }
}
.container {
  padding: 16px;
  position: relative;
  background: var(--milkshake-color);


  & .main-content{
    width: 100%;
    display: flex;

    & .holidays-info{
      width: 40%;

      & .holiday{
        background: var(--green-main);
        box-shadow: inset 0px 1px 1px 1px rgba(255, 255, 255, 0.5), inset 0px -2px 1px 0px rgba(0, 0, 0, 0.25), 0px 4px 8px 0px rgba(169, 163, 157, 0.25), 0px -2px 8px 0px rgba(0, 0, 0, 0.04);
        border-radius: 16px;
        color: var(--milkshake-color);
        margin: 16px 0;
        padding: 8px;
      }

      & .holiday:last-child{
        margin-bottom: 48px;
      }
    }
  }

  & .calendar-block{
    display: flex;
    gap: 8px;
    justify-content: center;
    position: fixed;
    bottom: 16px;
    left: 50%;
    transform: translate(-50%, -50%);

    & .calendar{
      cursor: pointer;
      background: var(--green-main);
      border: 1px solid var(--milkshake-color);
      padding: 4px 8px;
      border-radius: 16px;
    }

    & .selected-date{
      background: var(--milkshake-color) !important;
      border: 1px solid var(--green-main) !important;
      color: var(--green-main);
    }
  }
}
</style>