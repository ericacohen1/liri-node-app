var twitterKeys = require("./keys.js");
var Spotify = require('node-spotify-api');

var spotify = new Spotify({
    id: "30509a36ce5a4c8098ff8af25692ab72",
    secret: "d004df95247b45819873a5a274e310f1"
});

spotify.search({
    type: 'track',
    query: 'All the Small Things'
}, function (err, data) {
    if (err) {
        return console.log('Error occurred: ' + err);
    }

    console.log(data);
});




var action = process.argv[2];
var arguement = "";
whatAction(action, arguement);

// which action to take - using a swich
function whatAction(action, arguement) {
    switch (action) {
        case "my-tweets":
        // make function outside of switch and call it here
        break;

        case "spotify-this-song":
        // make function outside of switch and call it here
        break;
    }
}