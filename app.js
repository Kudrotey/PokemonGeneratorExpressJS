const express = require("express");
const app = express();
const https = require("https");
const port = 3000;

app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res) {
    res.sendFile(`${__dirname}/index.html`);
})

app.post("/pokemon", function(req, res) {

    const pokemonName = req.body.pokemonSearch.toLowerCase();

    if(pokemonName.length === 0) {
        res.sendFile(`${__dirname}/error.html`);
        return
    }

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
            res.send(`
                    <body style="background-color: rgb(250, 250, 250);">
                        <div style="width: 300px; text-align: center; margin: 0; position: absolute; top: 50%; left: 50%; -ms-transform: translate(-50%, -50%); transform: translate(-50%, -50%);">
                            <div style="border: 2px solid black; border-radius: 10px; font-family: monospace; box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);">
                                <h3 style="font-family: monospace; font-size: 20px;">${pokemonData.name.toUpperCase()}</h3>
                                <hr>
                                <img style="width: 180px;" src="${pokemonData.sprites.front_default}"/>
                                <hr>
                                <p style="font-size: 17px;">${pokemonData.stats[0].stat.name} : ${pokemonData.stats[0].base_stat}</p>
                                <hr>
                                <p style="font-size: 17px;">${pokemonData.stats[1].stat.name} : ${pokemonData.stats[1].base_stat}</p>
                                <hr>
                                <p style="font-size: 16px;">${pokemonData.stats[2].stat.name} : ${pokemonData.stats[2].base_stat}</p>
                                <hr>
                                <p style="font-size: 17px;">${pokemonData.stats[3].stat.name} : ${pokemonData.stats[3].base_stat}</p>
                                <hr>
                                <p style="font-size: 17px;">${pokemonData.stats[4].stat.name} : ${pokemonData.stats[4].base_stat}</p>
                                <hr>
                                <p style="font-size: 17px;">${pokemonData.stats[5].stat.name} : ${pokemonData.stats[5].base_stat}</p>
                            </div>    
                        <button style="margin-top: 30px; cursor: pointer; border-radius: 5px; font-family: monospace; background-color: rgb(63, 63, 63); color: white;" onClick="history.back()">${backButton}</button>
                        </div>
                    </body> 
                `);
        })
    })

})

app.post("/random_pokemon", function(req, res) {
    
    const randomPokemonId = Math.floor(Math.random() * 200) + 1;

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
            res.send(`
                    <body style="background-color: rgb(250, 250, 250);">
                        <div style="width: 300px; text-align: center; margin: 0; position: absolute; top: 50%; left: 50%; -ms-transform: translate(-50%, -50%); transform: translate(-50%, -50%);">
                            <div style="border: 2px solid black; border-radius: 10px; font-family: monospace; box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);">
                                <h3 style="font-family: monospace; font-size: 20px;">${pokemonData.name.toUpperCase()}</h3>
                                <hr>
                                <img style="width: 180px;" src="${pokemonData.sprites.front_default}"/>
                                <hr>
                                <p style="font-size: 17px;">${pokemonData.stats[0].stat.name} : ${pokemonData.stats[0].base_stat}</p>
                                <hr>
                                <p style="font-size: 17px;">${pokemonData.stats[1].stat.name} : ${pokemonData.stats[1].base_stat}</p>
                                <hr>
                                <p style="font-size: 16px;">${pokemonData.stats[2].stat.name} : ${pokemonData.stats[2].base_stat}</p>
                                <hr>
                                <p style="font-size: 17px;">${pokemonData.stats[3].stat.name} : ${pokemonData.stats[3].base_stat}</p>
                                <hr>
                                <p style="font-size: 17px;">${pokemonData.stats[4].stat.name} : ${pokemonData.stats[4].base_stat}</p>
                                <hr>
                                <p style="font-size: 17px;">${pokemonData.stats[5].stat.name} : ${pokemonData.stats[5].base_stat}</p>
                            </div>    
                            <button style="margin-top: 30px; cursor: pointer; border-radius: 5px; font-family: monospace; background-color: rgb(63, 63, 63); color: white;" onClick="history.back()">${backButton}</button>
                        </div>
                    </body>
                `);
        })
    })
})

app.post("/error", function(req, res) {
    res.redirect("/");
})

app.listen(process.env.PORT || port, function(req, res) {
    console.log(`Listening on port ${port}`);
})