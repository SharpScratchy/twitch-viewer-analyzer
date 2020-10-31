const AggregationServiceFactory = require("../src/aggregation.service").factory;

describe("AggregationService", () => {
  beforeEach(function () {
    jasmine.clock().install();
  });

  afterEach(function () {
    jasmine.clock().uninstall();
  });

  describe("aggregate", () => {
    it("should aggregate into countByViewer and countHistory", () => {
      const service = AggregationServiceFactory();
      const countByViewers = {};
      const countHistory = {};
      const date = new Date("2020-11-04");
      const days = 7;

      service.aggregate(countByViewers, countHistory, date, days, "toto");

      expect(countByViewers.toto).toBe(1);
      expect(countHistory["2020-11-04"].toto).toBe(1);
    });

    it("when day is in past should remove it and update counters", () => {
      const service = AggregationServiceFactory();
      const countByViewers = {
        toto: 13,
      };
      const countHistory = {
        "2020-10-10": {
          toto: 10,
        },
        "2020-10-11": {
          toto: 3,
        },
      };
      const date = new Date("2020-10-17");
      const days = 7;

      service.aggregate(countByViewers, countHistory, date, days, "toto");

      expect(countByViewers.toto).toBe(4);
      expect(countHistory["2020-10-17"].toto).toBe(1);
    });
  });

  describe("startAggregation", () => {
    it("default", () => {
      const twitchService = mockTwitchService();
      spyOn(twitchService, "getUsersInChat").and.returnValue(
        Promise.resolve(["toto", "tutu", "tata"])
      );

      const service = AggregationServiceFactory(twitchService);

      service.startAggregation();
      jasmine.clock().tick(61000);

      expect(twitchService.getUsersInChat).toHaveBeenCalledTimes(1);
      jasmine.clock().uninstall();

      setTimeout(() => {
        const aggreg = service.getCount();
        expect(aggreg.toto).toBe(1);
        expect(aggreg.tutu).toBe(1);
        expect(aggreg.tata).toBe(1);
        done();
      }, 100);
    });
  });

  describe("stopAggregation", () => {
    it("default", () => {
      const twitchService = mockTwitchService();
      spyOn(twitchService, "getUsersInChat");
      const service = AggregationServiceFactory(twitchService);

      service.startAggregation();
      service.stopAggregation();
      jasmine.clock().tick(61000);

      expect(twitchService.getUsersInChat).toHaveBeenCalledTimes(0);
    });
  });
});

const mockTwitchService = () => ({
  getStream: () => null,
  getUsersInChat: () => null,
});
