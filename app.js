const express = require("express");
const ejs = require("ejs");
const app = express();
const https = require("https");
const port = 3000;

app.use(express.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static("public"));

app.get("/", function(req, res) {
    res.sendFile(`${__dirname}/index.html`);
})

app.post("/pokemon", function(req, res) {

    const pokemonName = req.body.pokemonSearch.toLowerCase();

    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;

    https.get(url, function(response) {
        
        if(response.statusCode !== 200) {
            res.sendFile(`${__dirname}/error.html`);
            return
        }

        var result = "";
        response.on("data", function(data) {
            result += data;
        })
        response.on("end", function() {
            const pokemonData = JSON.parse(result);
            const backButton = "Back";
            res.render("pokemon", {pokemonData: pokemonData, backButton: backButton})
        })
    })

})

app.post("/random_pokemon", function(req, res) {
    
    const randomPokemonId = Math.floor(Math.random() * 500) + 1;

    const url = `https://pokeapi.co/api/v2/pokemon/${randomPokemonId}`;

    https.get(url, function(response) {
        
        if(response.statusCode !== 200) {
            res.sendFile(`${__dirname}/error.html`);
            return
        }

        var result = "";
        response.on("data", function(data) {
            result += data;
        })
        response.on("end", function() {
            const pokemonData = JSON.parse(result);
            const backButton = "Back";
            res.render("pokemon", {pokemonData: pokemonData, backButton: backButton})
        })
    })
})

app.post("/error", function(req, res) {
    res.redirect("/");
})

app.listen(process.env.PORT || port, function(req, res) {
    console.log(`Listening on port ${port}`);
})