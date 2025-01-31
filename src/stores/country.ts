import {defineStore} from "pinia";
import CountryApi from '../http/modules/country.ts'
import HolidayApi from '../http/modules/holiday.ts'
interface Country {
    countryCode: string;
    name: string;
}
interface State {
    allCountries: any [],
    randomCountries: any[],
    holidaysByCountry: { [key: string]: any },
    selectedCountry: { [key: string]: any },
    publicHolidaysList: any [],
}

export const country = defineStore('country', {
    state: () : State => ({
        allCountries: [],
        randomCountries: [],
        holidaysByCountry: {},
        selectedCountry: {},
        publicHolidaysList: []
    }),

    actions: {
        async aviableCounries(){
            try {
                const res = await CountryApi.aviableCounries()
                this.allCountries = res.data as Country[];
            } catch (e) {
                console.log(e)
            }
        },

        async getRandomCountries() {
            const countries = [...this.allCountries] as Country[];
            this.randomCountries = [];
            this.holidaysByCountry = {};

            for (let i = 0; i < 3; i++) {
                const randomIndex = Math.floor(Math.random() * countries.length);
                const randomCountry = countries.splice(randomIndex, 1)[0];
                this.randomCountries.push(randomCountry);

                await this.fetchNextHoliday(randomCountry.countryCode);
            }
        },

        async fetchNextHoliday(countryCode: string) {
            try {
                const res = await HolidayApi.nextPublicHoliday(countryCode);
                this.holidaysByCountry[countryCode] = res.data[0] || null;
            } catch (e) {
                console.log(e);
                this.holidaysByCountry[countryCode] = { name: 'No holiday found' };
            }
        },
        async publicHolidays(years: number, countryCode: string) {
            try {
                const res = await HolidayApi.publicHoliday(years, countryCode);
                this.publicHolidaysList = res.data
            } catch (e) {
                console.log(e)
            }
        }
    }
})