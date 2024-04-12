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
  dates: [string, string] | string;
  totalParticipants: number;
  difference: number;
  sharedParticipants?: Set<string>;
  participants1: Set<string>;
  participants2: Set<string> | null;
}
