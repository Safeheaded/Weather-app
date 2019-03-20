const express = require("express");
const path = require("path");
const hbs = require("hbs");

const geocode = require("./utils/geocode");
const weather = require("./utils/weather");
const app = express();

// Set express config paths
const publicDirecotyPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

const port = process.env.PORT || 3000;

// Sets view engines
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialsPath);

// Starts serving static files
app.use(express.static(publicDirecotyPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "WeatherApp",
    name: "Patryk Marczak"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Page",
    name: "Patryk Marczak"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpMessage: "This is some help message",
    title: "Help Page",
    name: "Patryk Marczak"
  });
});

app.get("/weather", (req, res) => {
  const address = req.query.address;
  if (!address) {
    return res.send({ errorMessage: "You must provide an address" });
  }
  geocode(address)
    .then(({lat, lng, location}) => {
      weather(lat, lng)
        .then(data => res.send({temperature: data}))
        .catch(error => res.send(error));
    })
    .catch(error => res.send(error));
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({ errorMessage: "You must provide search term" });
  }
  res.send({
    products: []
  });
});  

app.get("/help/*", (req, res) => {
  res.render("404", {
    errorMessage: "Article not found",
    title: "404"
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    errorMessage: "Page not found",
    title: "404"
  });
});

app.listen(port, () => {
  console.log(`Sever started, listening on ${port}`);
});
