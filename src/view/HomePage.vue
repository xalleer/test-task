<script setup lang="ts">
import {country} from "../stores/country.ts";
import {computed, onMounted, reactive} from "vue";
import router from "../router";

const flagUrl = 'https://flagcdn.com/'
const CountryStore = country()
const searchQuery = reactive({ text: "" });
const nowYear = new Date().getFullYear()

const filteredCountries = computed(() =>
    CountryStore.allCountries.filter((c) =>
        c.name.toLowerCase().includes(searchQuery.text.toLowerCase())
    )
);

const selectCountry = (country: object) => {
  CountryStore.selectedCountry = country
  router.replace('/main/selected-country')
  CountryStore.publicHolidays(nowYear, CountryStore.selectedCountry.countryCode)
}

onMounted(async () => {
  await CountryStore.aviableCounries()
  await CountryStore.getRandomCountries()
})
</script>

<template>
  <header class="header">
    <div class="search-block">
      <input class="search" type="search" v-model="searchQuery.text" placeholder="Search country" />
    </div>

  </header>
  <div class="container">


    <section class="main-content">
      <div class="countries">
        <p>Countries list</p>
        <div class="country" v-for="country of filteredCountries" :key="country.name" @click="selectCountry(country)">
          <img :src="flagUrl + country.countryCode.toLowerCase() + '.svg'" class="flag-image">
          <h1>{{ country.name }}</h1>
        </div>
      </div>

      <div class="holidays">
        <p>Random countries</p>
      <div
          class="country-holiday"
          v-for="randomCountry of CountryStore.randomCountries"
          :key="randomCountry.countryCode"
          @click="selectCountry(randomCountry)"
      >

        <div class="country-info">
          <img :src="flagUrl + randomCountry.countryCode.toLowerCase() + '.svg'" class="flag-image-random">
          <h1>{{ randomCountry.name }}</h1>

        </div>
        <span> {{ CountryStore.holidaysByCountry[randomCountry.countryCode]?.name || 'No holiday available' }}</span>
        <span>{{  CountryStore.holidaysByCountry[randomCountry.countryCode]?.date || 'Null'}}</span>
      </div>
      </div>

    </section>
  </div>

</template>

<style lang="scss" scoped>
.header{
  height: 80px;
  background: var(--green-main);
  width: 100%;
  display: flex;
  align-items: center;
  padding: 16px;
  justify-content: flex-start;
  gap: 8px;

  & .search-block{
    width: 40%;

    & .search{
      background: transparent;
      border-radius: 16px;
      width: 100%;
      padding: 8px 16px;
      outline: none;
      border: var(--milkshake-color) 1px solid;



    }
  }

}
.search::placeholder{
  color: var(--milkshake-color);
}
.container {
  padding: 16px;
  background: var(--milkshake-color);
}

.main-content{
  height: 100vh;
  overflow: hidden;
  display: flex;
  justify-content: flex-start;
  gap: 8px;

  & .countries{
    overflow: auto;
    width: 40%;
    padding: 8px;

    & p{
      color: var(--green-main);
      font-weight: bold;
      text-align: center;
    }

    & .country{
      background: var(--green-main);
      border-radius: 16px;
      display: flex;
      padding: 8px;
      margin: 8px 0;
      color: var(--milkshake-color);
      gap: 16px;
      box-shadow: inset 0px 1px 1px 1px rgba(255, 255, 255, 0.5), inset 0px -2px 1px 0px rgba(0, 0, 0, 0.25), 0px 4px 8px 0px rgba(169, 163, 157, 0.25), 0px -2px 8px 0px rgba(0, 0, 0, 0.04);

      & .flag-image{

        width: 100px;
        height: 75px;
        object-fit: cover;
      }

    }
  }
  & .holidays{
    width: 60%;
    padding: 8px;

    & p{
      text-align: center;
      color: var(--green-main);
      font-weight: bold;
    }

    & .country-holiday{
      display: flex;
      flex-direction: column;
      padding: 8px;
      margin: 8px 0;
      box-shadow: inset 0px 1px 1px 1px rgba(255, 255, 255, 0.5), inset 0px -2px 1px 0px rgba(0, 0, 0, 0.25), 0px 4px 8px 0px rgba(169, 163, 157, 0.25), 0px -2px 8px 0px rgba(0, 0, 0, 0.04);
      background: var(--green-main);
      color: var(--milkshake-color);
      border-radius: 16px;

      & .country-info{
        display: flex;
        gap: 16px;
        & .flag-image-random{
          width: 75px;
          object-fit: contain;
          height: 75px;
        }
      }
    }
  }
}
</style>