const toggleService = require("./toggle.service").service;
const streamService = require("./stream.service").service;
const aggregationService = require("./aggregation.service").service;
const twitchService = require("./twitch.service").service;

toggleService.watch(
  streamService.subscribeToIsStreamUp,
  aggregationService.startAggregation,
  aggregationService.stopAggregation
);

setInterval(() => {
  twitchService.getStream().then((streamObj) => {
    streamService.setIsStreamUp(streamObj.stream !== null);
  });
}, 60000);
