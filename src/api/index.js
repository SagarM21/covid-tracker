import axios from 'axios'

const url = 'https://covid19.mathdro.id/api'

export const fetchData = async (country) => {

    let changeableUrl = url

    if(country){
        changeableUrl = `${url}/countries/${country}`
    }


    try {
        const { data: { confirmed, recovered, deaths, lastUpdate } } = await axios.get(changeableUrl);

        // const modifiedData = {
        //     confirmed,         you  can do like this or described below, 
                                //i have already destructured the object that's why didn't used the key value pair
        //     recovered,
        //     deaths,
        //     lastUpdate,
        // }
        return {confirmed, recovered, deaths, lastUpdate};
    } catch (error) {
                console.log(error);
    }
}

export const fetchDailyData = async () => {
    try {
        const {data} = await axios.get(`${url}/daily`)

        const modifiedData = data.map((dailyData) => ({
            confirmed: dailyData.confirmed.total,
            deaths: dailyData.deaths.total,
            date: dailyData.reportDate,
        }));
        return modifiedData;
    } catch (error) {
        console.log(error);
    }
}

export const fetchCountries = async () => {
    try {
        const {data:{ countries }} = await axios.get(`${url}/countries`)

        return countries.map((country) => country.name );
  
    } catch (error) {
        console.log(error);
    }
}