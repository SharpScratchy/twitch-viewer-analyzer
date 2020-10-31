const ToggleServiceFactory = () => {
  let prevValue;
  const watch = (subscribe, isUpCB, isDownCB) => {
    subscribe((newValue) => {
      if (newValue === prevValue) {
        return ;
      }

      if (newValue) {
        isUpCB();
      } else {
        isDownCB();
      }

      prevValue = newValue;
    });
  };

  return {
    watch,
  };
};

exports.factory = ToggleServiceFactory;
exports.service = ToggleServiceFactory();
