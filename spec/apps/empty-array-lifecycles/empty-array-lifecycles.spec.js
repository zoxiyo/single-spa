import * as singleSpa from "single-spa";

describe(`empty-array-lifecycles`, () => {
  let myApp;

  beforeAll(() => {
    singleSpa.registerApplication(
      "./empty-array-lifecycles.app.js",
      () => import("./empty-array-lifecycles.app.js"),
      (location) => location.hash === "#empty-array-lifecycles"
    );
    singleSpa.start();
  });

  beforeEach(() => {
    location.hash = "#empty-array-lifecycles";

    return import("./empty-array-lifecycles.app.js").then(
      (app) => (myApp = app)
    );
  });

  it(`works just fine even though it's got empty arrays`, () => {
    return singleSpa.triggerAppChange().then(() => {
      expect(singleSpa.getMountedApps()).toEqual([
        "./empty-array-lifecycles.app.js",
      ]);

      location.hash = "#not-empty-array-lifecycles";

      return singleSpa.triggerAppChange().then(() => {
        expect(singleSpa.getMountedApps()).toEqual([]);
      });
    });
  });
});
