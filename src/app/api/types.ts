export type Player = {
  name: string;
  playerId: string;
  playerUid: string;
  results: Result[];
};

export type Result = {
  rank: number;
  points: number;
  tournamentName: string;
  tournamentId: string;
  teamUid: string;
  teamName: string;
};

export enum TournamentID {
  The6467Afa0E37388Dfa8Ca611E = "6467afa0e37388dfa8ca611e",
  The6467Afb0E37388Dfa8Ca6157 = "6467afb0e37388dfa8ca6157",
  The6495Ddb0B5Ce109Aa99C65Ee = "6495ddb0b5ce109aa99c65ee",
  The64B4Fd0B0A7Ae52B0D47Cbf6 = "64b4fd0b0a7ae52b0d47cbf6",
  The64Ee22Ebcf79A5A5Cecd871C = "64ee22ebcf79a5a5cecd871c",
  The653183Fc0B5014F728461C23 = "653183fc0b5014f728461c23",
  The653184060B5014F728461C70 = "653184060b5014f728461c70",
}

export enum TournamentName {
  ETSChampionshipsPadua2023 = "ETS Championships Padua 2023",
  ETSLondon2023 = "ETS London 2023",
  ETSParis2023 = "ETS Paris 2023",
  ETSPragueSpikeballChallenger2023 = "ETS Prague - Spikeball Challenger 2023",
  ETSStockholm2023 = "ETS Stockholm 2023",
  ETSVienna2023 = "ETS Vienna 2023",
}
