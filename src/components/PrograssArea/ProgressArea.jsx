import React, { useImperativeHandle, useRef, forwardRef } from "react";
import "./ProgressArea.scss";

function ProgressArea(props, ref) {
  // 실제 핸들링되는 ref: 새로운 ref 선언해서 js 가 제공하는 audio 에 붙인다.
  const audioRef = useRef();

  // 엡에서 내려준 ref를 받는다.
  useImperativeHandle(ref, () => ({
    play: () => {
      audioRef.current.play();
    },
    pause: () => {
      audioRef.current.pause();
    },
  }));
  return (
    <div className="progress-area">
      <div className="progress-bar">
        <audio autoPlay ref={audioRef}></audio>
      </div>
      <div className="music-timer">
        <span>00:00</span>
        <span>00:00</span>
      </div>
    </div>
  );
}

export default forwardRef(ProgressArea);
