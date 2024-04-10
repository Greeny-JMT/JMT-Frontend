import { DateCombination, VotedDateInfos, Votes } from '@/types';

export function shuffleArray<T>(array: Array<T>): Array<T> {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

export function getDifference<T>(setA: Set<T>, setB: Set<T>) {
  const resultSet = new Set(setA);
  const iterTarget = Array.from(setB);
  iterTarget.forEach((elem) => resultSet.delete(elem));
  return resultSet;
}

export function getVotedDateInfos(votes: Votes) {
  const duplicateChecker = new Set<string>();

  return votes.reduce((acc, { date, person }) => {
    const checkKey = `${date}/${person}`;
    if (duplicateChecker.has(checkKey)) {
      return acc;
    }
    duplicateChecker.add(checkKey);
    if (!acc[date]) acc[date] = new Set<string>();
    acc[date].add(person);
    return acc;
  }, {} as VotedDateInfos);
}

function getDateCombinations(votedDateInfos: VotedDateInfos) {
  const dates = Object.keys(votedDateInfos);
  const dateCombinations: DateCombination[] = [];
  for (let i = 0; i < dates.length - 1; i++) {
    for (let j = i + 1; j < dates.length; j++) {
      const date1Participants = new Set([
        ...Array.from(votedDateInfos[dates[i]]),
      ]);
      const date2Participants = new Set([
        ...Array.from(votedDateInfos[dates[j]]),
      ]);

      const sharedParticipants = [...Array.from(date1Participants)].filter(
        (x) => date2Participants.has(x),
      );

      // 교집합에서 참여자를 랜덤하게 섞음
      const shuffledsharedParticipants = shuffleArray(sharedParticipants);

      const date1Only = getDifference(
        date1Participants,
        new Set(sharedParticipants),
      );
      const date2Only = getDifference(
        date2Participants,
        new Set(sharedParticipants),
      );

      // 교집합 참여자를 균등하게 분배
      shuffledsharedParticipants.forEach((participant: string) => {
        const randomNumber = Math.random();
        if (date1Only.size < date2Only.size) {
          date1Only.add(participant);
        } else if (date2Only.size < date1Only.size) {
          date2Only.add(participant);
        } else if (randomNumber < 0.5) {
          date1Only.add(participant);
        } else {
          date2Only.add(participant);
        }
      });

      dateCombinations.push({
        id: crypto.randomUUID(),
        dates: [dates[i], dates[j]],
        totalParticipants: date1Only.size + date2Only.size, // 총 참여자 수 업데이트
        difference: Math.abs(date1Only.size - date2Only.size),
        participants1: date1Only,
        participants2: date2Only,
      });
    }
  }
  return dateCombinations;
}

export function getBestDates(votedDateInfos: VotedDateInfos) {
  const dateCombinations = getDateCombinations(votedDateInfos);
  dateCombinations.sort((a, b) => {
    if (a.totalParticipants === b.totalParticipants) {
      return a.difference - b.difference;
    }
    return b.totalParticipants - a.totalParticipants;
  });

  const bestDates = dateCombinations.slice(0, 10);
  return bestDates;
}
