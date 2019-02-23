require("dotenv").config();

var NiriBot = require("./niriBot.js");

// Grab search command line argument
var search = process.argv[2];
// Joining the remaining arguments since a query may contain spaces
var term = process.argv.slice(3).join(" ");

// Create a new bot object
var bot = new NiriBot();

// Print whether searching for a song, movie or concert, print the term as well
switch (search) {
    case "concert-this":
        console.log("Searching for concert: " + term);
        bot.findConcert(term);
        break;
    case "spotify-this-song":
        console.log("Searching for song: " + term);
        if (term === "") { term = "The Sign"}
        bot.findSong(term);
        break;
    case "movie-this":
        console.log("Searching for movie: " + term);
        if (term === "") { term = "Mr. Nobody"}
        bot.findMovie(term);
        break;
    case "do-what-it-says":
        console.log("do commands in the txt file: " + term);
        if (term === "") { term = "random.txt"}
        bot.runCmdInFile(term);
        break;
    default:
        console.log("use one of concert-this, spotify-this-song, movie-this, do-what-it-says");
}

