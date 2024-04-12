'use client';

import PersonSelectors from './_components/person-selectors';

import { useState } from 'react';

import { Friend, friends } from '@/app/friends';
import { DateCombination, Vote, Votes } from '@/types';
import { getBestDates, getVotedDateInfos } from '@/utils';

export default function ScheduleHome() {
  const [votes, setVotes] = useState<Votes>([]);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [persons, setPersons] = useState<Friend[]>(friends);
  const [bestDates, setBestDates] = useState<DateCombination[]>([]);

  const selectedPersons = persons.filter((p) => p.selected);

  const handleAddVote = () => {
    if (selectedDate && selectedPersons.length >= 1) {
      const voteList: Votes = [];
      selectedPersons.forEach((person) => {
        const newVote: Vote = {
          id: crypto.randomUUID(),
          date: selectedDate,
          person: person.name,
        };
        voteList.push(newVote);
      });
      setVotes([...votes, ...voteList]);
      setSelectedDate('');
      setPersons(friends);
    }
  };

  const handleDelete = (id: string) => {
    setVotes(votes.filter((vote) => vote.id !== id));
  };

  const handleFriendSelect = (id: number) => {
    const newFriends = persons.map((f) => {
      if (f.id === id) {
        return {
          ...f,
          selected: !f.selected,
        };
      }
      return f;
    });
    setPersons(newFriends);
  };

  const handleFindBestDates = () => {
    const votedDateInfos = getVotedDateInfos(votes);
    const votedDates = Object.keys(votedDateInfos);
    if (votedDates.length <= 0) {
      return;
    }
    if (votedDates.length === 1) {
      alert(`${votedDates[0]}에 만나요~`);
      return;
    }
    const bestDatesInfo = getBestDates(votedDateInfos);
    setBestDates(bestDatesInfo);
  };

  const handleReset = () => {
    setVotes([]);
    setSelectedDate('');
    setPersons(friends);
    setBestDates([]);
  };

  return (
    <main>
      <div className="p-4">
        <PersonSelectors
          persons={persons}
          onClickHandler={(id) => {
            handleFriendSelect(id);
          }}
        />
        <div className="mb-2">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="border p-2 mr-2"
          />
          <button
            onClick={handleAddVote}
            className={`px-4 py-2 rounded text-white ${
              selectedDate === '' || selectedPersons.length <= 0
                ? 'bg-gray-500 opacity-50 cursor-not-allowed'
                : 'bg-pGreen-500'
            }`}
            disabled={selectedDate === '' || selectedPersons.length <= 0}
          >
            추가
          </button>
        </div>
        <div className="mb-4">
          <div className="flex overflow-auto text-xs">
            {votes.map(({ date, person, id }) => (
              <div
                key={id}
                className="flex flex-col relative mr-2 py-3 px-6 border rounded shadow bg-white flex-shrink-0"
                style={{ width: '160px' }}
              >
                <div className="mb-1">{date}</div>
                <div className="flex-grow">{person}</div>
                <button
                  className="absolute top-1 right-0 mt-2 mr-2 font-bold"
                  onClick={() => {
                    handleDelete(id);
                  }}
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex">
            <div className="mr-4">
              <button
                onClick={() => handleFindBestDates()}
                className="bg-pGreen-500 text-white px-4 py-2 rounded mb-4 font-bold"
              >
                언제 만날까?
              </button>
            </div>
            <div>
              <button
                onClick={handleReset}
                className="bg-pGreen-500 text-white px-4 py-2 rounded mb-4 font-bold"
              >
                초기화
              </button>
            </div>
          </div>
          {bestDates.length > 0 && (
            <div>
              <h2 className="text-lg mb-4 font-semibold">
                아래중에 하루 선택! 🎉
              </h2>
              {bestDates.map((dateCombination, index) => {
                const {
                  id,
                  dates,
                  totalParticipants,
                  difference,
                  sharedParticipants,
                  participants1,
                  participants2,
                } = dateCombination;

                // 첫 번째 카드에만 특별한 스타일 적용
                const cardClass = index === 0 ? 'card first-card' : 'card';

                return (
                  <div key={id} className={`${cardClass}`}>
                    <div className="mb-1">
                      <span className="font-bold highlight">선택된 날짜:</span>{' '}
                      {Array.isArray(dates)
                        ? `${dates[0]} & ${dates[1]}`
                        : dates}
                    </div>
                    <div className="mb-1">
                      <span className="font-bold">총 참여인원:</span>{' '}
                      {totalParticipants}명
                    </div>
                    <div className="mb-4">
                      <span className="font-bold">참여자 수 차이:</span>{' '}
                      {difference}명
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="font-bold">
                          {Array.isArray(dates) ? dates[0] : dates} 참여자:
                        </div>
                        <ul className="list-disc pl-5">
                          {Array.from(participants1).map((participant) =>
                            sharedParticipants?.has(participant) ? (
                              <li className="text-pGreen-500" key={participant}>
                                {participant}
                              </li>
                            ) : (
                              <li key={participant}>{participant}</li>
                            ),
                          )}
                        </ul>
                      </div>
                      {participants2 && (
                        <div>
                          <div className="font-bold">{dates[1]} 참여자:</div>
                          <ul className="list-disc pl-5">
                            {Array.from(participants2).map((participant) =>
                              sharedParticipants?.has(participant) ? (
                                <li
                                  className="text-pGreen-500"
                                  key={participant}
                                >
                                  {participant}
                                </li>
                              ) : (
                                <li key={participant}>{participant}</li>
                              ),
                            )}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
