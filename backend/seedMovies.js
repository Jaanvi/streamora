require("dotenv").config();

const mongoose = require("mongoose");
const Movie = require("./models/Movie");

const movies = [

{
title:"Avengers Endgame",
description:"Marvel superheroes fight Thanos to save the universe.",
image:"https://image.tmdb.org/t/p/original/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
genre:"Action",
year:2019,
rating:9
},

{
title:"The Dark Knight",
description:"Batman faces Joker in Gotham City.",
image:"https://image.tmdb.org/t/p/original/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
genre:"Action",
year:2008,
rating:9.1
},

{
title:"Inception",
description:"A thief enters people's dreams to steal secrets.",
image:"https://image.tmdb.org/t/p/original/edv5CZvWj09upOsy2Y6IwDhK8bt.jpg",
genre:"Thriller",
year:2010,
rating:8.8
},

{
title:"Interstellar",
description:"Astronauts travel through a wormhole in space.",
image:"https://image.tmdb.org/t/p/original/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
genre:"Sci-Fi",
year:2014,
rating:8.7
},







{
title:"Spider-Man No Way Home",
description:"Spider-Man faces villains from other universes.",
image:"https://image.tmdb.org/t/p/original/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
genre:"Action",
year:2021,
rating:8.3
},

{
title:"Doctor Strange",
description:"A surgeon becomes the Sorcerer Supreme.",
image:"https://image.tmdb.org/t/p/original/uGBVj3bEbCoZbDjjl9wTxcygko1.jpg",
genre:"Action",
year:2016,
rating:7.8
},

{
title:"Guardians of the Galaxy",
description:"A group of intergalactic criminals save the universe.",
image:"https://image.tmdb.org/t/p/original/r7vmZjiyZw9rpJMQJdXpjgiCOk9.jpg",
genre:"Action",
year:2014,
rating:8
},

{
title:"Black Panther",
description:"The king of Wakanda protects his nation.",
image:"https://image.tmdb.org/t/p/original/uxzzxijgPIY7slzFvMotPv8wjKA.jpg",
genre:"Action",
year:2018,
rating:7.9
},

{
title:"Iron Man",
description:"Tony Stark becomes a powerful armored hero.",
image:"https://image.tmdb.org/t/p/original/78lPtwv72eTNqFW9COBYI0dWDJa.jpg",
genre:"Action",
year:2008,
rating:8
},

{
title:"Captain America Civil War",
description:"Avengers split into two factions.",
image:"https://image.tmdb.org/t/p/original/rAGiXaUfPzY7CDEyNKUofk3Kw2e.jpg",
genre:"Action",
year:2016,
rating:7.8
},

{
title:"Thor Ragnarok",
description:"Thor battles to save Asgard from destruction.",
image:"https://image.tmdb.org/t/p/original/rzRwTcFvttcN1ZpX2xv4j3tSdJu.jpg",
genre:"Action",
year:2017,
rating:7.9
},

{
title:"The Matrix",
description:"A hacker discovers the reality is a simulation.",
image:"https://image.tmdb.org/t/p/original/aoiJkpg4mdM9ZQx2h0zkw1Xh2hH.jpg",
genre:"Sci-Fi",
year:1999,
rating:8.7
},

{
title:"Matrix Reloaded",
description:"Neo continues the fight against machines.",
image:"https://image.tmdb.org/t/p/original/9TGHDvWrqKBzwDxDodHYXEmOE6J.jpg",
genre:"Sci-Fi",
year:2003,
rating:7.2
},

{
title:"The Matrix Resurrections",
description:"Neo returns to the Matrix world.",
image:"https://image.tmdb.org/t/p/original/8c4a8kE7PizaGQQnditMmI1xbRp.jpg",
genre:"Sci-Fi",
year:2021,
rating:6.8
},

{
title:"The Shawshank Redemption",
description:"Two prisoners form an unlikely friendship.",
image:"https://image.tmdb.org/t/p/original/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
genre:"Drama",
year:1994,
rating:9.3
},

{
title:"Forrest Gump",
description:"The story of a man witnessing historical events.",
image:"https://image.tmdb.org/t/p/original/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg",
genre:"Drama",
year:1994,
rating:8.8
},

{
title:"Fight Club",
description:"An underground fight club changes lives.",
image:"https://image.tmdb.org/t/p/original/bptfVGEQuv6vDTIMVCHjJ9Dz8PX.jpg",
genre:"Thriller",
year:1999,
rating:8.8
},

{
title:"The Godfather",
description:"The rise of a powerful crime family.",
image:"https://image.tmdb.org/t/p/original/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
genre:"Drama",
year:1972,
rating:9.2
},

{
title:"The Godfather Part II",
description:"The Corleone family's legacy continues.",
image:"https://image.tmdb.org/t/p/original/hek3koDUyRQk7FIhPXsa6mT2Zc3.jpg",
genre:"Drama",
year:1974,
rating:9
},

{
title:"The Conjuring",
description:"Paranormal investigators help a haunted family.",
image:"https://image.tmdb.org/t/p/original/wVYREutTvI2tmxr6ujrHT704wGF.jpg",
genre:"Horror",
year:2013,
rating:7.5
},

{
title:"Annabelle",
description:"A possessed doll terrorizes a family.",
image:"https://image.tmdb.org/t/p/original/yAgxX9R6u3Wzq9R8s3vF7gXG6De.jpg",
genre:"Horror",
year:2014,
rating:6.5
},

{
title:"It",
description:"A shape-shifting clown hunts children.",
image:"https://image.tmdb.org/t/p/original/9E2y5Q7WlCVNEhP5GiVTjhEhx1o.jpg",
genre:"Horror",
year:2017,
rating:7.3
},

{
title:"Deadpool",
description:"A mercenary with humor and healing powers.",
image:"https://image.tmdb.org/t/p/original/inVq3FRqcYIRl2la8iZikYYxFNR.jpg",
genre:"Action",
year:2016,
rating:8
},

{
title:"Deadpool 2",
description:"Deadpool forms a team to protect a young mutant.",
image:"https://image.tmdb.org/t/p/original/to0spRl1CMDvyUbOnbb4fTk3VAd.jpg",
genre:"Action",
year:2018,
rating:7.7
},

{
title:"John Wick",
description:"A retired assassin returns for revenge.",
image:"https://image.tmdb.org/t/p/original/fZPSd91yGE9fCcCe6OoQr6EfbV4.jpg",
genre:"Action",
year:2014,
rating:7.9
},

{
title:"John Wick Chapter 2",
description:"John Wick is forced back into the assassin world.",
image:"https://image.tmdb.org/t/p/original/hXWBc0ioZP3cN4zCu6SN3YHXZVO.jpg",
genre:"Action",
year:2017,
rating:7.5
},

{
title:"John Wick Chapter 3",
description:"John Wick fights to survive after a bounty is placed.",
image:"https://image.tmdb.org/t/p/original/ziEuG1essDuWuC5lpWUaw1uXY2O.jpg",
genre:"Action",
year:2019,
rating:7.4
},

{
title:"The Wolf of Wall Street",
description:"A stockbroker rises and falls in greed.",
image:"https://image.tmdb.org/t/p/original/34m2tygAYBGqA9MXKhRDtzYd4MR.jpg",
genre:"Drama",
year:2013,
rating:8.2
},

{
title:"The Social Network",
description:"The story behind the creation of Facebook.",
image:"https://image.tmdb.org/t/p/original/n0ybibhJtQ5icDqTp8eRytcIHJx.jpg",
genre:"Drama",
year:2010,
rating:7.7
},

{
title:"Gladiator",
description:"A Roman general seeks revenge.",
image:"https://image.tmdb.org/t/p/original/ty8TGRuvJLPUmAR1H1nRIsgwvim.jpg",
genre:"Action",
year:2000,
rating:8.5
},

{
title:"The Prestige",
description:"Two rival magicians battle for supremacy.",
image:"https://image.tmdb.org/t/p/original/bdN3gXuIZYaJP7ftKK2sU0nPtEA.jpg",
genre:"Thriller",
year:2006,
rating:8.5
},

{
title:"Shutter Island",
description:"A detective investigates a mysterious asylum.",
image:"https://image.tmdb.org/t/p/original/kve20tXwUZpu4GUX8l6X7Z4jmL6.jpg",
genre:"Thriller",
year:2010,
rating:8.2
},

{
title:"La La Land",
description:"A jazz musician and actress fall in love.",
image:"https://image.tmdb.org/t/p/original/uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg",
genre:"Romance",
year:2016,
rating:8
},

{
title:"The Notebook",
description:"A romantic story spanning decades.",
image:"https://image.tmdb.org/t/p/original/qom1SZSENdmHFNZBXbtJAU0WTlC.jpg",
genre:"Romance",
year:2004,
rating:7.8
},














{
title:"Joker",
description:"Origin story of Gotham's villain Joker.",
image:"https://image.tmdb.org/t/p/original/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg",
genre:"Thriller",
year:2019,
rating:8.5
},

{
title:"Titanic",
description:"Romantic story aboard the Titanic ship.",
image:"https://image.tmdb.org/t/p/original/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg",
genre:"Romance",
year:1997,
rating:8.4
}

];

const seedMovies = async () => {

try{

await mongoose.connect(process.env.MONGO_URI);

console.log("MongoDB Connected");

await Movie.deleteMany();

await Movie.insertMany(movies);

console.log("Movies inserted successfully");

process.exit();

}catch(error){

console.log(error);

process.exit(1);

}

};

seedMovies();