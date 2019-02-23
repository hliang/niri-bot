require("dotenv").config();
var keys = require("./keys.js");

var NiriBot = require("./niriBot.js");

// Create a new concert/song/movie object
var bot = new NiriBot();

// Grab search command line argument
var search = process.argv[2];
// Joining the remaining arguments since a query may contain spaces
var term = process.argv.slice(3).join(" ");


// Print whether searching for a song, movie or concert, print the term as well
switch (search) {
    case "concert-this":
        console.log("Searching for concert");
        bot.findConcert(term);
        break;
    case "spotify-this-song":
        console.log("Searching for song");
        bot.findSong(term);
        break;
    case "movie-this":
        console.log("Searching for movie");
        bot.findMovie(term);
        break;
    case "do-what-it-says":
        console.log("do commands in the txt file");
        bot.runCmdInFile(term);
        break;
    default:
        console.log("use one of concert-this, spotify-this-song, movie-this, do-what-it-says");
}

