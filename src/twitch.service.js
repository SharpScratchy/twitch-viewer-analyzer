const fetch = require("node-fetch");

const TwitchServiceFactory = () => {
  const streamer = process.env.STREAMER || "skyyart";
  const channelId = process.env.CHANNEL_ID || "70298660";

  const getStream = async () => {
    const response = await fetch(
      `https://api.twitch.tv/kraken/streams/${channelId}`,
      {
        headers: {
          Accept: "application/vnd.twitchtv.v5+json",
          "Client-ID": "gfe2nqpqtygbd7qwevidm6dojdzbu5",
        },
      }
    );

    return response.json();
  };

  const getUsersInChat = async () => {
    const response = await fetch(
      `https://tmi.twitch.tv/group/user/${streamer}/chatters`
    );
    const obj = await response.json();
    return [...obj.chatters.viewers, ...obj.chatters.broadcaster];
  };

  return {
    getStream,
    getUsersInChat,
  };
};

exports.factory = TwitchServiceFactory;
exports.service = TwitchServiceFactory();
