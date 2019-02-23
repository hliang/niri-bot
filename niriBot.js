var axios = require("axios");
var fs = require("fs");
var Spotify = require("node-spotify-api");
var moment = require('moment');
var keys = require("./keys.js");

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
                if (typeof response.data === "string") {
                    console.log("Oops, none found");
                    console.log("=".repeat(maxWidth));
                    return;
                }
                // select fileds and print to console
                response.data.slice(0, maxItem).forEach(item => {
                    concertData = [
                        moment(item.datetime).format("YYYY/MM/DD"),
                        "Location: " + item.venue.name,
                        "City: " + item.venue.city + ", " + item.venue.region,
                    ]
                    console.log(concertData.join("\t"));
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
    this.findSong = function (songName) {
        let maxItem = 3;
        // console.log("id=" + keys.spotify);
        var spotify = new Spotify(keys.spotify);

        spotify
            .search({ type: 'track', query: songName })
            .then(function (response) {
                // console.log(response.tracks.items);
                console.log("=".repeat(maxWidth));
                response.tracks.items.slice(0, maxItem).forEach(item => {
                    songData = [
                        "Song:    " + item.name,
                        "Album:   " + item.album.name,
                        "Artists: " + item.artists.map((x) => { return x.name }).join(", "),
                        "Preview: " + item.preview_url,
                    ];
                    console.log("-".repeat(maxWidth));
                    console.log(songData.join("\n"));
                });
                console.log("=".repeat(maxWidth));
            })
            .catch(function (err) {
                console.log(err);
            });
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
                    console.log("=".repeat(maxWidth));
                    return;
                }
                // get rotten tomato rating
                let tmtRaging = "";
                for (let i = 0; i < response.data.Ratings.length; i++) {
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
    this.runCmdInFile = function (fileName) {
        console.log("=".repeat(maxWidth));
        fs.readFile(fileName, "utf8", (err, data) => {
            if (err) {
                throw err;
            }
            let content = data.trim().split(",");
            let search = content[0];
            let term = content[1];
            switch (search) {
                case "concert-this":
                    console.log("Searching for concert: " + term);
                    this.findConcert(term);
                    break;
                case "spotify-this-song":
                    console.log("Searching for song: " + term);
                    if (term === "") { term = "The Sign"}
                    this.findSong(term);
                    break;
                case "movie-this":
                    console.log("Searching for movie: " + term);
                    if (term === "") { term = "Mr. Nobody"}
                    this.findMovie(term);
                    break;
                default:
                    console.log("use one of concert-this, spotify-this-song, movie-this, do-what-it-says");
            }
        })
    };
}

module.exports = NiriBot;