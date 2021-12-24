const axios = require("axios");

const baseUrl = "https://celeste-restuarant.herokuapp.com"; // http://localhost:5000

const menu_calls = {
    root: () => axios.get(baseUrl),
    tasting: (index, prop) => {
        if (index === undefined)
            return axios.get(`${baseUrl}/tasting-menu/all`);
        
        if (prop === undefined)
            return axios.get(`${baseUrl}/tasting-menu/${index}`);

        return axios.get(`${baseUrl}/tasting-menu/${index}/${prop}`);
    },
    a_la_carte: (type, index, prop) => {
        if (type === undefined)
            return axios.get(`${baseUrl}/a-la-carte-menu/all`);

        if (index === undefined)
            return axios.get(`${baseUrl}/a-la-carte-menu/${type}`);

        if (prop === undefined)
            return axios.get(`${baseUrl}/a-la-carte-menu/${type}/${index}`);

        return axios.get(`${baseUrl}/a-la-carte-menu/${type}/${index}/${prop}`);
    }
}

module.exports = menu_calls;