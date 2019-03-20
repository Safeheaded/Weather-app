const request = require("request");

const mapboxToken =
  "pk.eyJ1Ijoic2FmZWhlYWRlZCIsImEiOiJjanRmbm8waWcxdXNnNDZwN3lscjVob29nIn0.k0e0hg1u_GHOJ1PtBKqFHA";

const geocode = address => {
  return new Promise((resolve, reject) => {
    request(
      {
        url: `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${mapboxToken}`,
        json: true
      },
      (error, response, body) => {
        if (error) {
          reject(error);
          return;
        } else if (body.features.length === 0) {
          reject("No results");
        } else {
          const [lng, lat] = body.features[0].center;
          const location = body.features[0].place_name;
          resolve({ lat, lng, location });
        }
      }
    );  
  }); 
};

module.exports = geocode;

