const request = require("request");

const weather = (lat, lng) => {
  return new Promise((resolve, reject) => {
    const url = `https://api.darksky.net/forecast/92d13798e167fb57802c1e9345efd498/${lat},${lng}?units=auto`;
    request({ url, json: true }, (error, response, body) => {
      if (error) {
        reject(error);
      } else if (body.error) {
        reject(body.error);
      } else {
        const results = {
          temperature: body.currently.temperature, 
          apparentTemperature: body.currently.apparentTemperature
        };
        resolve(results);
      }  
    }); 
  }); 
};

module.exports = weather;
