require("dotenv").config();

var keys = require("./keys.js");
var axios = require("axios");
var fs = require("fs");
var Spotify = require('node-spotify-api');
var moment = require('moment');

var spotify = new Spotify(keys.spotify);

var nodeArgs = process.argv;

var liriCommand = process.argv[2];

var term = "";

for (var i = 3; i < nodeArgs.length; i++) {

  term = term + "" + nodeArgs[i];
}
console.log(term);

switch (process.argv[2]) {

  case 'movie-this':
    getMovie();
    break;

  case 'concert-this':
    getMyBands();
    break;

  case 'spotify-this-song':
    callSpotify();
    break
  case 'do-what-it-says':
      doThing();
    break
}






//Bands in Town API
function getMyBands() {
  var queryURL = "https://rest.bandsintown.com/artists/" + term + "/events?app_id=codingbootcamp";

  axios.get(queryURL).then(
    function (response) {
      
      var concertData = response.data;
     

      if (!concertData.length) {
        console.log("No results found for " + term);
        return;
      }

      console.log("Upcoming concerts for " + term + ":");

      for (var i = 0; i < concertData.length; i++) {
        var show = concertData[i];

       

        // Print data about each concert
        // If a concert doesn't have a region, display the country instead
        // Use moment to format the date
        console.log(
          show.venue.city +
          "," +
          (show.venue.region || show.venue.country) +
          " at " +
          show.venue.name +
          " " +
          moment(show.datetime).format("MM/DD/YYYY")
        );
      }
      
    }
  );
};


//Spotify API
var getArtistNames = function (artist) {
  return artist.name;
};

// Function for running a Spotify search - Command is spotify-this-song
function callSpotify() {
  if (term === "") {
    term = "The Sign";
  

  spotify.search({
      type: "track",
      query: term
    },
    function (err, data) {
      if (err) {
        console.log("Error occurred: " + err);
        return;
      }

      var songs = data.tracks.items;

      for (var i = 0; i < songs.length; i++) {
        console.log(i);
        console.log("artist(s): " + songs[i].artists.map(getArtistNames));
        console.log("song name: " + songs[i].name);
        console.log("preview song: " + songs[i].preview_url);
        console.log("album: " + songs[i].album.name);
        console.log("-----------------------------------");
      }
    }
  );}
  else {
    spotify.search({
      type: "track",
      query: term
    },
    function (err, data) {
      if (err) {
        console.log("Error occurred: " + err);
        return;
      }

      var songs = data.tracks.items;

      for (var i = 0; i < songs.length; i++) {
        console.log(i);
        console.log("artist(s): " + songs[i].artists.map(getArtistNames));
        console.log("song name: " + songs[i].name);
        console.log("preview song: " + songs[i].preview_url);
        console.log("album: " + songs[i].album.name);
        console.log("-----------------------------------");
      }
    }
  );












  }
};




//OMDB API


function getMovie() {
  if(term===""){
    console.log("-----------------------");
    console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
    console.log("It's on Netflix!");
  } else{
  

  var queryUrl = "http://www.omdbapi.com/?t=" + term + "&y=&plot=short&apikey=trilogy";

  // This line is just to help us debug against the actual URL.
  console.log(queryUrl);

  axios.get(queryUrl).then(
    function (response) {
      console.log("Title: " + response.data.Title);
      console.log("Release Year: " + response.data.Year);
      console.log("IMdB Rating: " + response.data.imdbRating);
      console.log("Country: " + response.data.Country);
      console.log("Language: " + response.data.Language);
      console.log("Plot: " + response.data.Plot);
      console.log("Actors: " + response.data.Actors);
      console.log("Rotten Tomatoes Rating: " + response.data.Ratings[2].Value);
    }
  );
  }
}



  function doThing(){
    fs.readFile('random.txt', "utf8", function(error, data){
      var yerp = data.split(',');
  console.log(yerp);
      callSpotify(yerp[1]);
    });

}

