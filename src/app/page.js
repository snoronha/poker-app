"use client";
import React, {useState, useRef, useEffect} from 'react';
import YouTube from 'react-youtube';
import Image from 'next/image'

export default function Home() {
  const [elapsed, setElapsed] = useState(0);
  const playerRef = useRef();

  useEffect(() => {
    const interval = setInterval(async () => {
      const elapsed_sec = await playerRef.current.internalPlayer.getCurrentTime(); // this is a promise. dont forget to await
      console.log("CURRENT:", elapsed_sec);

      // calculations
      const elapsed_ms = Math.floor(elapsed_sec * 1000);
      const ms = elapsed_ms % 1000;
      const min = Math.floor(elapsed_ms / 60000);
      const seconds = Math.floor((elapsed_ms - min * 60000) / 1000);

      setElapsed(
        min.toString().padStart(2, '0') +
          ':' +
          seconds.toString().padStart(2, '0') +
          ':' +
          ms.toString().padStart(3, '0'),
      );
    }, 1000); // 100 ms refresh. increase it if you don't require millisecond precision

    return () => {
      clearInterval(interval);
    };
  }, []);

  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  const _onReady= (event) => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  };

  return (
    <div class="flex flex-row">
      <div class="w-4/5 ml-10 mt-10">
        <YouTube videoId="2g811Eo7K8U" opts={opts} ref={playerRef} onReady={_onReady} />
      </div>
      <div class="w-1/5 flex flex-col ml-10 mt-10 mb-10 items-start">

        <div class="ml-4"><b>Wager Amount</b></div>
        <div class="ml-4 mt-4"><b>$</b> __________</div>

        <div class="ml-4 mt-4">
          <span>Player A</span>
          <span class="ml-4">
            <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
              BET
            </button>
          </span>
        </div>

        <div class="ml-4 mt-4">
          <span>Player B</span>
          <span class="ml-4">
            <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
              +240
            </button>
          </span>
        </div>

        <div class="ml-4 mt-4">
          <span>Player C</span>
          <span class="ml-4">
            <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
              28%
            </button>
          </span>
        </div>

        <div class="ml-4 mt-4">
          <span>Player D</span>
          <span class="ml-4">
            <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
              5/2
            </button>
          </span>
        </div>

        <div class="ml-4 mt-4">
          <span>Player E</span>
          <span class="ml-4">
            <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
              2.4x
            </button>
          </span>
        </div>


        <div class="ml-4 mt-4">
          <span>Player F</span>
          <span class="ml-4">
            <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
              BET
            </button>
          </span>
        </div>

      </div>
    </div>
  )
}
