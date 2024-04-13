'use client';

import foodLottie from '../../public/lottie/food_rotate_lottie.json';
import Link from 'next/link';

import Lottie from 'react-lottie-player';

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#e2d2d2] px-12 py-12">
      <div className="flex flex-wrap w-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-lg">
        <div className="w-full md:w-3/5 p-8 bg-primaryColor-500 rounded-t-lg md:rounded-tr-none md:rounded-l-lg flex flex-col items-center justify-center">
          <h2 className="text-3xl font-bold text-center text-white">
            Sign in to JMT
          </h2>
          <form className="mt-12 w-full flex flex-col items-center">
            <div className="flex justify-center w-2/3">
              <input
                className="w-full px-4 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-pink-500 rounded-lg"
                id="username"
                placeholder="이름"
                type="text"
              />
            </div>
            <div className="flex justify-center w-2/3 mt-6">
              <input
                className="w-full px-4 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-pink-500 rounded-lg"
                id="password"
                placeholder="사번"
                type="password"
              />
            </div>
            <div className="flex justify-center mt-8">
              <Link
                className="px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-[#de7e73] border border-transparent rounded-lg active:bg-[#de7e73] hover:bg-[#9b5850] focus:outline-none focus:shadow-outline-pink"
                href="/schedule"
              >
                Login
              </Link>
            </div>
          </form>
        </div>
        <div className="w-full md:w-2/5 bg-white flex rounded-b-lg md:rounded-bl-none md:rounded-r-lg">
          <div className="flex items-center justify-center h-full p-8 w-full">
            <div className="max-w-xs text-center flex flex-col items-center justify-center w-full">
              <h2 className="text-2xl font-semibold text-gray-700">JMT는요</h2>
              <p className="mt-3 text-gray-500">
                정자역 근방의 맛집을 돌아다니며
              </p>
              <p className="text-gray-500">
                힐링하고 친목을 도모하는 그리니 입니다
              </p>
              {/* Lottie 파일을 감싸는 div에 flex와 justify-center 클래스를 추가하여 가운데 정렬합니다. */}
              <div className="flex justify-center w-full">
                <Lottie
                  className="w-2/3 mt-4"
                  loop
                  animationData={foodLottie}
                  play
                />
              </div>
              <div className="mt-6">
                <p className="mt-4 text-sm text-gray-400">
                  그리니에 가입하고 싶으시다면
                </p>
                <p className="text-sm text-gray-400">
                  기존 회원에게 문의해주세요
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
