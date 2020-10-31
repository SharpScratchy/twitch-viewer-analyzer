const ToggleServiceFactory = require("../src/toggle.service").factory;
const notifier = require("@sharpscratchy/notifier");

describe("ToggleService", () => {
  it("Nothing append", () => {
    const service = ToggleServiceFactory();

    const [subscribeToTestValue, setTestValue] = notifier.create();

    const cb = {
      up: () => null,
      down: () => null,
    };
    spyOn(cb, "up");
    spyOn(cb, "down");

    service.watch(subscribeToTestValue, cb.up, cb.down);

    expect(cb.down).toHaveBeenCalled();
    expect(cb.up).not.toHaveBeenCalled();
  });

  it("Stream is up then down", () => {
    const service = ToggleServiceFactory();

    const [subscribeToTestValue, setTestValue] = notifier.create();

    const cb = {
      up: () => null,
      down: () => null,
    };
    spyOn(cb, "up");
    spyOn(cb, "down");

    // (cb: (v) => void) => void
    service.watch(subscribeToTestValue, cb.up, cb.down);

    setTestValue(true);
    setTestValue(false);

    expect(cb.up).toHaveBeenCalled();
    expect(cb.down).toHaveBeenCalledTimes(2);
  });

  it("Stream is up", () => {
    const service = ToggleServiceFactory();

    const [subscribeToTestValue, setTestValue] = notifier.create();

    const cb = {
      up: () => null,
      down: () => null,
    };
    spyOn(cb, "up");
    spyOn(cb, "down");

    service.watch(subscribeToTestValue, cb.up, cb.down);

    setTestValue(true);

    expect(cb.up).toHaveBeenCalled();
    expect(cb.down).toHaveBeenCalled();
  });

  it("Stream is up should not retrigger callback", () => {
    const service = ToggleServiceFactory();

    const [subscribeToTestValue, setTestValue] = notifier.create();

    const cb = {
      up: () => null,
      down: () => null,
    };
    spyOn(cb, "up");
    spyOn(cb, "down");

    service.watch(subscribeToTestValue, cb.up, cb.down);

    setTestValue(true);
    setTestValue(true);
    setTestValue(true);
    setTestValue(true);

    expect(cb.up).toHaveBeenCalledTimes(1);
  });
});
