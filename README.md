# liri-node-app

This is a node.js command line app

# installations
npm install twitter
npm install fs
npm install request
npm install spotify

# running applicaion and commands

node liri.js my-tweets

    This will show your last 20 tweets and when they were created at in your terminal/bash window.

node liri.js spotify-this-song '<song name here>'

    This will show the following information about the song in your terminal/bash window: artist, songs name, preview link from spotify, and the album the song is from

node liri.js movie-this '<movie name here>'

    This will output the following information to your terminal/bash window: title of the movie, year the movie came out, IMDB Rating of the movie, rotten Tomatoes Rating of the movie, country where the movie was produced, language of the movie, plot of the movie, actors in the movie.

node liri.js do-what-it-says

    Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.

    It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.
