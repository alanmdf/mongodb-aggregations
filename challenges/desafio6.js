// Referência para utilizar os operadores no $group: https://stackoverflow.com/questions/32076382/mongodb-how-to-get-max-value-from-collections

// Referência para testar o regex: https://regex101.com/

db.movies.aggregate([
  {
    $match: {
      awards: { $regex: /[(won)]\s[\d]\s[(oscar)]/ig },
    },
  },
  {
    $group: {
      _id: null,
      maior_rating: { $max: "$imdb.rating" },
      menor_rating: { $min: "$imdb.rating" },
      media_rating: { $avg: "$imdb.rating" },
      desvio_padrao: { $stdDevSamp: "$imdb.rating" },
    },
  },
  {
    $project: {
      _id: 0,
      maior_rating: 1,
      menor_rating: 1,
      media_rating: { $round: ["$media_rating", 1] },
      desvio_padrao: { $round: ["$desvio_padrao", 1] },
    },
  },
]);
