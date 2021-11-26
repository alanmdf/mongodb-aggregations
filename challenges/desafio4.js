db.movies.aggregate([
  {
    $sort: {
      title: 1,
    },
  },
  {
    $project: {
      _id: 0,
      title_spĺit: { $split: ["$title", " "] },
    },
  },
  {
    $match: {
      title_spĺit: { $size: 1 },
    },
  },
]);
