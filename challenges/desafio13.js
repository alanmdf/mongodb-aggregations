// Referência para filtrar por data no formato ISODate: https://stackoverflow.com/questions/19819870/date-query-with-isodate-in-mongodb-doesnt-seem-to-work

db.trips.aggregate([
  {
    $match: {
      startTime: {
        $gte: new Date("2016-03-10T00:00:00Z"),
        $lt: new Date("2016-03-11T00:00:00Z"),
      },
    },
  },
  {
    $addFields: {
      duracaoViagem: { $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 1000 * 60] } },
  },
  {
    $group: {
      _id: null,
      duracaoMediaEmMinutos: { $avg: "$duracaoViagem" },
    },
  },
  {
    $project: {
      _id: 0,
      duracaoMediaEmMinutos: { $ceil: "$duracaoMediaEmMinutos" },
    },
  },
]);
