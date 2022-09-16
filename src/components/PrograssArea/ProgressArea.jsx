import React, {
  useImperativeHandle,
  useRef,
  forwardRef,
  useCallback,
} from "react";
import { useDispatch } from "react-redux";
import "./ProgressArea.scss";
import music1 from "../../music/music-1.mp3";
import { playMusic, stopMusic } from "../../store/musicPlayerReducer";

function ProgressArea(props, ref) {
  // 실제 핸들링되는 ref: 새로운 ref 선언해서 js 가 제공하는 audio 에 붙인다.
  const audioRef = useRef();
  const dispatch = useDispatch();

  // js 가 제공하는 audio 에 실질적인 명령
  useImperativeHandle(ref, () => ({
    play: () => {
      audioRef.current.play();
    },
    pause: () => {
      audioRef.current.pause();
    },
  }));

  const onPlay = useCallback(() => {
    dispatch(playMusic());
  }, [dispatch]);
  const onPause = useCallback(() => {
    dispatch(stopMusic());
  }, [dispatch]);

  return (
    <div className="progress-area">
      <div className="progress-bar">
        <audio
          autoPlay
          ref={audioRef}
          src={music1}
          onPlay={onPlay}
          onPause={onPause}
        ></audio>
      </div>
      <div className="music-timer">
        <span>00:00</span>
        <span>00:00</span>
      </div>
    </div>
  );
}

export default forwardRef(ProgressArea);
