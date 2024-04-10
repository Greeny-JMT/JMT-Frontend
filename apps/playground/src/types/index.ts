export interface Vote {
  id: string;
  date: string;
  person: string;
}

export type Votes = Vote[];

export interface VotedDateInfos {
  [key: string]: Set<string>;
}

export interface DateCombination {
  id: string;
  dates: [string, string];
  totalParticipants: number;
  difference: number;
  participants1: Set<string>;
  participants2: Set<string>;
}
