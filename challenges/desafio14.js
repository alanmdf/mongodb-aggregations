db.trips.aggregate([
  {
    $addFields: {
      duracaoViagem: { $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 1000 * 60] } },
  },
  {
    $group: {
      _id: "$bikeid",
      duracaoMedia: { $avg: "$duracaoViagem" },
    },
  },
  {
    $sort: {
      duracaoMedia: -1,
    },
  },
  {
    $limit: 5,
  },
  {
    $project: {
      _id: 0,
      bikeId: "$_id",
      duracaoMedia: { $ceil: "$duracaoMedia" },
    },
  },
]);
