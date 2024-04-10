'use client';

import { Friend } from '@/app/friends';

interface PersonSelectorsProps {
  persons: Friend[];
  onClickHandler: (id: number) => void;
}

export default function PersonSelectors({
  persons,
  onClickHandler,
}: PersonSelectorsProps) {
  return (
    <div className="mb-4">
      {persons.map((person: Friend) => (
        <button
          key={person.id}
          onClick={() => onClickHandler(person.id)}
          // 상태에 따라 클래스를 동적으로 변경
          className={`py-2 px-4 mr-2 mb-2 border rounded ${
            person.selected ? 'bg-pGreen-500 text-white' : 'bg-white'
          }`}
          // border-radius 적용
          style={{ borderRadius: '8px' }}
        >
          {person.name}
        </button>
      ))}
    </div>
  );
}
