const twitchService = require("./twitch.service").service;

const AggregationFactory = (twitchService) => {
  let intervalId;
  const countByViewers = {};
  const countHistory = {};

  const aggregate = async (countByViewers, countHistory, date, maxDay, viewerName) => {
    const dateKey = date.toISOString().split("T")[0];

    if (!countByViewers[viewerName]) {
      countByViewers[viewerName] = 0;
    }

    if (!countHistory[dateKey]) {
      countHistory[dateKey] = {}
    }

    if (!countHistory[dateKey][viewerName]) {
      countHistory[dateKey][viewerName] = 0
    }

    var limit = new Date(date.getTime());
    limit.setDate(limit.getDate() - maxDay);
    var limitKey = limit.toISOString().split("T")[0];
    if (countHistory[limitKey]) {
      const viewers = Object.keys(countHistory[limitKey]);
      viewers.forEach(viewerName => {
        countByViewers[viewerName] -= countHistory[limitKey][viewerName];
      })
      delete countHistory[limitKey];
    }

    countByViewers[viewerName] += 1;
    countHistory[dateKey][viewerName] += 1;
  };

  const startAggregation = () => {
    intervalId = setInterval(async () => {
      const date = new Date();
      const viewerList = await twitchService.getUsersInChat();
      viewerList.forEach(viewer => {
        aggregate(countByViewers, countHistory, date, 7, viewer)
      })
    }, 60000);
  };

  const stopAggregation = () => {
    if (intervalId) {
      clearInterval(intervalId);
    }
  };

  return {
    aggregate,
    startAggregation,
    stopAggregation,
    getCount: () => countByViewers
  };
};

exports.factory = AggregationFactory;
exports.service = AggregationFactory(twitchService);
