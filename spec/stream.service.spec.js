const StreamServiceFactory = require("../src/stream.service").factory;

describe("StreamService", () => {
  it("Should allow to subscribe to isStreamUp modification", () => {
    let updatedValue;

    const service = StreamServiceFactory();
    const unsubscribe = service.subscribeToIsStreamUp(
      (newValue) => (updatedValue = newValue)
    );
    expect(updatedValue).toBeFalse();

    service.setIsStreamUp(true);
    expect(updatedValue).toBeTrue();

    service.setIsStreamUp(false);
    expect(updatedValue).toBeFalse();
  });
});
