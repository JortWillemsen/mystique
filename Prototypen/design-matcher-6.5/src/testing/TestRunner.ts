import Mocha from 'mocha';

export class TestRunner {
  suite: Mocha.Suite;

  constructor(name: string) {
    var instance = new Mocha();
    this.suite = Mocha.Suite.create(instance.suite, name);
  }

  addTest(name: string, test: () => void) {
    this.suite.addTest(new Mocha.Test(name, test));
  }

  run(): Mocha.reporters.Spec {
    var runner = new Mocha.Runner(this.suite);
    var reporter = new Mocha.reporters.Spec(runner);
    runner.run();

    return reporter;
  }
}