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
  {
    $project: {
      _id: 0,
      titulo: "$title",
      avaliado: "$rated",
      notaIMDB: "$imdb.rating",
      votosIMDB: "$imdb.votes",
      ano: "$year",
    },
  },
  {
    $sort: {
      ano: -1,
      notaIMDB: -1,
      titulo: 1,
    },
  },
]);
