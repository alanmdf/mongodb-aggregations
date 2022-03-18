db.movies.aggregate([
  {
    $match: {
      $and: [
        { "imdb.rating": { $gte: 7 } },
        { genres: { $not: { $elemMatch: { $in: ["Crime", "Horror"] } } } },
        { rated: { $in: ["PG", "G"] } },
        { languages: { $all: ["English", "Spanish"] } },
      ],
    },
  },
]);
