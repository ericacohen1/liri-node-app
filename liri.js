var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var fs = require('fs');
var request = require("request");

var spotify = new Spotify(keys.spotifyKeys);
var client = new Twitter(keys.twitterKeys);


var action = process.argv[2];
var arguement = process.argv[3];
whatAction(action, arguement);
var nodeArgs = process.argv;

// which action to take - using a swich
function whatAction(action, arguement) {
    switch (action) {
        case "my-tweets":
            myTweets();
            break;

        case "spotify-this-song":
            spotifyThisSong(arguement);
            break;

        case "movie-this":
            movieThis(arguement);
            break;

        case "do-what-it-says":
            doWhatItSays();
            break;

    }
}

function myTweets() {
    var params = {
        screen_name: 'EricaCohen15'
    };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {

        var forLoopLimit = 20;
        if (tweets.length < 20) {
            forLoopLimit = tweets.length;
        }

        if (!error) {
            for (var i = 0; i < forLoopLimit; i++) {
                console.log("Time: " + tweets[i].created_at);
                console.log("Tweet: " + tweets[i].text);
            }
        } else {
            console.log(error);
        }
    });
};

function spotifyThisSong() {
    spotify.search({
        type: 'track',
        query: 'All the Small Things'
    }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        fs.writeFile('data.json', JSON.stringify(data, null, 2), function (err) {
            console.log(true)
        });
        console.log("Artist:" + data.tracks.items[0].artists[0].name);
        console.log("Song Name:" + data.tracks.items[0].name);
        console.log("URL:" + data.tracks.items[0].uri);
        console.log("Album Name:" + data.tracks.items[0].album.name);
    });
};

function movieThis() {
    var movieName = process.argv[3];
    if (!movieName) {
        // single = is the assignment operator
        movieName = "Mr. Nobody";
    }
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
    console.log(queryUrl);
    request(queryUrl, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log("Movie Title: " + JSON.parse(body).Title);
            console.log("Year: " + JSON.parse(body).Year);
            console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
            console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
            console.log("Country produced: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
        }
    });
};

function doWhatItSays() {
    var fs = require("fs");
    // The code will store the contents of the reading inside the variable "data"
    fs.readFile("random.txt", "utf8", function(error, data) {
      // If the code experiences any errors it will log the error to the console.
      if (error) {
        return console.log(error);
      } 
      // We will then print the contents of data
      console.log(data);
      // Then split it by commas (to make it more readable)
      var dataArr = data.split(",");
      // We will then re-display the content as an array for later use.
      console.log(dataArr);
    });
};