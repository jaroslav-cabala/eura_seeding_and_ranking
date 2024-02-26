import { useGetPlayersSortedByPointsOfTwoBestResults } from "../api/useGetPlayersSortedByPointsOfTwoBestResults";

export default function Dashboard() {
  const playersSortedByTopTwoResults = useGetPlayersSortedByPointsOfTwoBestResults();

  return (
    <p>
      <ol>
        {playersSortedByTopTwoResults.map((player, index) => (
          <li key={player.playerId}>
            {index + 1}. {player.name}&nbsp;{player.points}
          </li>
        ))}
      </ol>
    </p>
  );
}
