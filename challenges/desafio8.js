db.air_alliances.aggregate([
  {
    $unwind: "$airlines",
  },
  {
    $lookup: {
      from: "air_routes",
      let: { airline_name: "$airlines" },
      pipeline: [
        {
          $match: {
            $expr: {
              $and: [
                { $eq: ["$airline.name", "$$airline_name"] },
                { $in: ["$airplane", ["747", "380"]] },
              ],
            },
          },
        },
      ],
      as: "airlines_routes",
    },
  },
  {
    $match: {
      "airlines_routes.0": { $exists: true },
    },
  },
  {
    $addFields: {
      totalRotas: { $size: "$airlines_routes" },
    },
  },
  {
    $project: {
      _id: "$name",
      totalRotas: 1,
    },
  },
  {
    $group: {
      _id: "$_id",
      totalRotas: { $sum: "$totalRotas" },
    },
  },
  {
    $sort: {
      totalRotas: -1,
    },
  },
  {
    $limit: 1,
  },
]);
