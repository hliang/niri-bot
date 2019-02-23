var axios = require("axios");
var fs = require("fs");
var Spotify = require("node-spotify-api");
var moment = require('moment');

var maxWidth = 79;

// NiriBot constructor
var NiriBot = function () {

    // find concert
    this.findConcert = function (artist) {
        console.log("=".repeat(maxWidth))
        // build url and get the data from bandsintown API
        let url = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
        // limit items to print
        let maxItem = 5;
        axios.get(url)
            .then(function (response) {
                // not found
                if (!response.data.isArray) {
                    console.log("Oops, none found");
                    console.log("=".repeat(maxWidth));
                    return;
                }
                // select fileds and print to console
                response.data.slice(0, maxItem).forEach(item => {
                    concertData = {
                        venue: item.venue.name,
                        location: item.venue.city + ", " + item.venue.region,
                        date: moment(item.datetime).format("YYYY/MM/DD"),
                    }
                    console.log(`${concertData.date}\t${concertData.venue}\t${concertData.location}`);
                });
                // more
                if (response.data.length > maxItem) {
                    console.log("... and " + (response.data.length - maxItem) + " more");
                }
                console.log("=".repeat(maxWidth))
            })
            .catch(function (error) {
                console.log(error);
            });
    };


    // find song
    this.findSong = function (term) {
        console.log("found song: " + term);
    };


    // find movie
    this.findMovie = function (movieName) {
        console.log("=".repeat(maxWidth))
        // Run a request with axios to the OMDB API with the movie specified
        var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
        axios.get(queryUrl)
            .then(function (response) {
                // error
                if (response.data.Error) {
                    console.log(response.data.Error);
                    console.log("=".repeat(maxWidth))
                    return;
                }
                // get rotten tomato rating
                let tmtRaging = "";
                for (let i=0; i < response.data.Ratings.length; i++) {
                    if (response.data.Ratings[i].Source == "Rotten Tomatoes") {
                        tmtRaging = response.data.Ratings[i].Value;
                        break;
                    }
                }

                movieData = ["Title: " + response.data.Title,
                "Year: " + response.data.Year,
                "Rating: " + response.data.imdbRating + "(IMDB), " + tmtRaging + "(Tomato)",
                "Country: " + response.data.Country,
                "Language: " + response.data.Language,
                "Plot: " + response.data.Plot,
                "Actors: " + response.data.Actors,
                ];
                console.log(movieData.join("\n"));
                console.log("=".repeat(maxWidth))
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    // run commands in file
    this.runCmdInFile = function (term) {
        console.log("found cmd: " + term);
    };
}

module.exports = NiriBot;