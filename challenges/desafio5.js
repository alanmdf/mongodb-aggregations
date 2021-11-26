db.movies.aggregate([
  {
    $match: {
      $and: [
        { countries: { $all: ["USA"] } },
        { "tomatoes.viewer.rating": { $gte: 3 } },
      ],
    },
  },
  {
    $addFields: {
      cast_matches: {
        $setIntersection: [
          ["Sandra Bullock", "Tom Hanks", "Julia Roberts", "Kevin Spacey", "George Clooney"],
          "$cast"],
      },
    },
  },
  {
    $match: {
      cast_matches: { $ne: null },
    },
  },
  {
    $addFields: {
      num_favs: { $size: "$cast_matches" },
    },
  },
  {
    $sort: {
      num_favs: -1,
      "tomatoes.viewer.rating": -1,
      title: -1,
    },
  },
  {
    $skip: 24,
  },
  {
    $limit: 1,
  },
  {
    $project: {
      _id: 0,
      title: 1,
    },
  },
]);
