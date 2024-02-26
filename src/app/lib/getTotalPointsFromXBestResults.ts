import { Result } from "../api/types";

/**
 * Goes through an array of tournament results and returns total points from X best results.
 *
 * @param results array of tournament results
 * @param numberOfResultsToCount number of results to count
 * @returns total points of X best results
 */
export function getTotalPointsFromXBestResults(
  results: Array<Result>,
  numberOfResultsToCount: number
): number {
  return results
    .reduce<Array<number>>((acc, curr) => {
      // if array of results does not have 'numberOfResultsToCount' result yet, just add current result into it
      if (acc.length < numberOfResultsToCount) {
        return [...acc, curr.points];
      }
      // if array of result has 'numberOfResultsToCount' results
      // replace the lowest value from the result with the current value if the current value > lowest value from the result
      const lowestValue = Math.min(...acc);
      const highestValue = Math.max(...acc);
      if (lowestValue < curr.points) {
        return [curr.points, highestValue];
      }
      // return the current array of results if current value < lowest value from the result
      return acc;
    }, [])
    .reduce((acc, curr) => (acc += curr));
}
