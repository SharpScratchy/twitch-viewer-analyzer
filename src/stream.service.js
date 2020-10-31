const notifer = require("@sharpscratchy/notifier");

const StreamServiceFactory = () => {
  const [subscribeToIsStreamUp, setIsStreamUp] = notifer.create();
  setIsStreamUp(false);

  const isStreamUp = () => {
    return false;
  };

  return {
    isStreamUp,
    subscribeToIsStreamUp,
    setIsStreamUp,
  };
};

exports.factory = StreamServiceFactory;
exports.service = StreamServiceFactory();
