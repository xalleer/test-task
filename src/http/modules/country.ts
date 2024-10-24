import axios from "../api.ts";


function aviableCounries() {
    return axios.get("/AvailableCountries");
}

export default {
    aviableCounries
};