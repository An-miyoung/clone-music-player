import React, {
  useImperativeHandle,
  useRef,
  forwardRef,
  useCallback,
  useState,
} from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import "./ProgressArea.scss";
import {
  nextMusic,
  playMusic,
  stopMusic,
} from "../../store/musicPlayerReducer";

function ProgressArea(props, ref) {
  // 실제 핸들링되는 ref: 새로운 ref 선언해서 js 가 제공하는 audio 에 붙인다.
  const audioRef = useRef();
  const progressBar = useRef();
  // 함수가 계속 rerender 되는 것을 막기 위해 shallowEqual 사용
  const { playList, currentIndex } = useSelector(
    (state) => ({ playList: state.playList, currentIndex: state.currentIndex }),
    shallowEqual
  );
  const dispatch = useDispatch();
  const [currentTime, setCurrentTime] = useState("00:00");
  const [duration, setDuration] = useState("00:00");

  // js 가 제공하는 audio 에 실질적인 명령
  useImperativeHandle(ref, () => ({
    play: () => {
      audioRef.current.play();
    },
    pause: () => {
      audioRef.current.pause();
    },
    changeVolume: (volume) => {
      audioRef.current.volume = volume;
    },
  }));

  const onPlay = useCallback(() => {
    dispatch(playMusic());
  }, [dispatch]);
  const onPause = useCallback(() => {
    dispatch(stopMusic());
  }, [dispatch]);

  const getTime = (time) => {
    const minute = `0${parseInt(time / 60, 10)}`;
    const seconds = `0${parseInt(time % 60)}`;
    // 뒤에서 2개만 잘라내서 취한다.
    return `${minute}:${seconds.slice(-2)}`;
  };

  const onTimeUpdate = useCallback((e) => {
    if (e.target.readyState === 0) return;
    // js 가 제공하는 메소드
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;

    const progressBarWidth = (currentTime / duration) * 100;
    progressBar.current.style.width = `${progressBarWidth}%`;
    setCurrentTime(getTime(currentTime));
    setDuration(getTime(duration));
  }, []);

  const onClickProgress = useCallback((e) => {
    const progressBarWidth = e.currentTarget.clientWidth;
    const offsetX = e.nativeEvent.offsetX;
    const duration = audioRef.current.duration;
    audioRef.current.currentTime = (offsetX / progressBarWidth) * duration;
  }, []);

  const onEnded = useCallback(() => {
    dispatch(nextMusic());
  }, [dispatch]);

  return (
    <div className="progress-area" onMouseDown={onClickProgress}>
      <div className="progress-bar" ref={progressBar}>
        <audio
          autoPlay
          onEnded={onEnded}
          ref={audioRef}
          src={playList[currentIndex].src}
          onPlay={onPlay}
          onPause={onPause}
          onTimeUpdate={onTimeUpdate}
        ></audio>
      </div>
      <div className="music-timer">
        <span>{currentTime}</span>
        <span>{duration}</span>
      </div>
    </div>
  );
}

export default forwardRef(ProgressArea);
