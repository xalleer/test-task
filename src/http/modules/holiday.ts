import axios from "../api.ts";


function nextPublicHoliday(countryCode: string) {
    return axios.get(`/NextPublicHolidays/${countryCode}`);
}
function publicHoliday(years: number, countryCode: string) {
    return axios.get(`/PublicHolidays/${years}/${countryCode}`);
}

export default {
    nextPublicHoliday,
    publicHoliday
};