// eslint-disable-next-line @typescript-eslint/no-var-requires
const Sequencer = require("@jest/test-sequencer").default;

class TestSequencer extends Sequencer {
  #order = ["copy", "updateOne", "updateMany", "delete"];

  #skip = [
    // "delete" // uncomment to skip delete e2e test
  ];

  /**
   * Select tests for shard requested via --shard=shardIndex/shardCount
   * Sharding is applied before sorting
   */
  shard(tests, { shardIndex, shardCount }) {
    const shardSize = Math.ceil(tests.length / shardCount);
    const shardStart = shardSize * (shardIndex - 1);
    const shardEnd = shardSize * shardIndex;

    return [...tests]
      .sort((a, b) => (a.path > b.path ? 1 : -1))
      .slice(shardStart, shardEnd);
  }

  /**
   * Sort test to determine order of execution
   * Sorting is applied after sharding
   */
  sort(tests) {
    // Test structure information
    // https://github.com/jestjs/jest/blob/6b8b1404a1d9254e7d5d90a8934087a9c9899dab/packages/jest-runner/src/types.ts#L17-L21
    const copyTests = Array.from(tests).filter((test) => {
      console.log(test.path);
      const isTestSkipped = this.#skip.some((module) => {
        return test.path.includes(module);
      });

      return !isTestSkipped;
    });

    const sortedTests = copyTests.sort((testA, testB) => {
      const testAModuleIndex = this.#order.findIndex((module) => {
        return testA.path.includes(module);
      });
      const testBModuleIndex = this.#order.findIndex((module) => {
        return testB.path.includes(module);
      });

      return testAModuleIndex > testBModuleIndex ? 1 : -1;
    });

    return sortedTests;
  }
}

module.exports = TestSequencer;
