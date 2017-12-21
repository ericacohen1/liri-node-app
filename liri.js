var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');

var spotify = new Spotify(keys.spotifyKeys);
var client = new Twitter(keys.twitterKeys);


var action = process.argv[2];
var arguement = process.argv[3];
whatAction(action, arguement);

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
            for (var i=0; i<forLoopLimit; i++) {
            console.log(tweets[i].created_at);
            console.log(tweets[i].text);
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
        console.log(data);
    });
};

function movieThis() {

};

function doWhatItSays() {

};