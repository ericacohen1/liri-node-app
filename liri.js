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

    if (movieName === undefined) {
        movieName === "Mr. Nobody";
    } else {
        movieName === process.argv[3];
    }


    var movieName = process.argv[3];
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
    request(queryUrl, function(error, response, body) {
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

};