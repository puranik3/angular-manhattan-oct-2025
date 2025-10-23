import { CalculatorService } from "./calculator.service";
import { LoggerService } from "./logger.service";

describe("Calculator service", () => {
  // possible to create sub groups of tests (test suite)
  // describe('', () => {

  // })

  // make the test fixture (all objects that you arrange)
  let ls: jasmine.SpyObj<LoggerService>, cs: CalculatorService;

  // before running any test, whatever code has to run (arrangment usually) is done here
  // every test must create a fresh fixture, which is why we create these in beforeEach function which is run before each test
  beforeEach(() => {
    // arrange
    // create mock log() function, i.e. spy - the actual log() function is substituted with the spy log() function
    // ls = new LoggerService();
    // spyOn(ls, "log");

    // create a mock service object with multiple methods (here we have only 1 method - log())
    ls = jasmine.createSpyObj("LoggerService", ["log" /*, "info", "error"*/]);

    cs = new CalculatorService(ls);
  });

  it("should add 2 numbers", () => {
    // act
    const result = cs.add(1, 2);

    expect(ls.log).toHaveBeenCalledTimes(1);
    expect(ls.log).toHaveBeenCalledWith("Addition operation called");

    // assert
    // withContext() or 2nd argument of matcher function can be used to give an error message - this is useful when have multiple expect() in a test
    expect(result)
      .withContext("calls expected to be 3")
      .toBe(3, "number of calls was not 3");
  });

  it("should subtract 2 numbers", () => {
    // act
    const result = cs.subtract(1, 2);

    // assert
    expect(result).toBe(-1);
  });
});
