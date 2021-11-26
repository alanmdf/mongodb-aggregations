db.trips.aggregate([
  {
    $addFields: {
      travelTime: { $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 1000 * 60 * 60] } },
  },
  {
    $group: {
      _id: "$usertype",
      duracaoViagem: { $avg: "$travelTime" },
    },
  },
  {
    $project: {
      _id: 0,
      tipo: "$_id",
      duracaoMedia: { $round: ["$duracaoViagem", 2] },
    },
  },
  {
    $sort: {
      duracaoMedia: 1,
    },
  },
]);
