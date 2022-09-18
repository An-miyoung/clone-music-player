import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import RepeatIcon from "@mui/icons-material/Repeat";
import RepeatOneIcon from "@mui/icons-material/RepeatOne";
import PauseIcon from "@mui/icons-material/Pause";
import SkipPrevious from "@mui/icons-material/SkipPrevious";
import PlayArrow from "@mui/icons-material/PlayArrow";
import SkipNext from "@mui/icons-material/SkipNext";
import QueueMusic from "@mui/icons-material/QueueMusic";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import "./Controls.scss";
import {
  nextMusic,
  prevMusic,
  setRepeat,
} from "../../store/musicPlayerReducer";

// repeat을 제어할 컴포넌트를 내부에서 선언하고 <RepeatButton > 으로 불러 사용한다.
// ...props 를 통해 onClick 이벤트도 붙여준다.
const RepeatButton = ({ repeat, ...props }) => {
  switch (repeat) {
    case "ALL":
      return <RepeatIcon sx={{ fontSize: 30, cursor: "pointer" }} {...props} />;
    case "ONE":
      return (
        <RepeatOneIcon sx={{ fontSize: 30, cursor: "pointer" }} {...props} />
      );
    case "SHUFFLE":
      return (
        <ShuffleIcon sx={{ fontSize: 30, cursor: "pointer" }} {...props} />
      );
    default:
      return <RepeatIcon sx={{ fontSize: 30, cursor: "pointer" }} {...props} />;
  }
};

const Controls = ({
  showMusicList,
  setShowMusicList,
  resetDuration,
  play,
  pause,
  changeVolume,
}) => {
  const { playingState } = useSelector((state) => state);
  const repeat = useSelector((state) => state.repeat);
  const dispatch = useDispatch();

  const onClickPlay = useCallback(() => {
    play();
  }, [play]);
  const onClickPause = useCallback(() => {
    pause();
  }, [pause]);

  const onChangeVolume = (e) => {
    changeVolume(e.target.value);
  };

  const onClickPrev = useCallback(() => {
    dispatch(prevMusic());
  }, [dispatch]);

  const onClickNext = useCallback(() => {
    dispatch(nextMusic());
  }, [dispatch]);

  const onClickRepeat = useCallback(() => {
    dispatch(setRepeat());
  }, [dispatch]);

  return (
    <div className="control-area">
      <QueueMusic sx={{ fontSize: 30, cursor: "pointer" }} />
      <RepeatButton repeat={repeat} onClick={onClickRepeat} />

      <SkipPrevious
        sx={{ fontSize: 30, cursor: "pointer" }}
        onClick={onClickPrev}
      />
      {playingState ? (
        <PauseIcon
          sx={{ fontSize: 30, cursor: "pointer" }}
          onClick={onClickPause}
        />
      ) : (
        <PlayArrow
          className="play"
          sx={{ fontSize: 30, cursor: "pointer" }}
          onClick={onClickPlay}
        />
      )}
      <SkipNext
        sx={{ fontSize: 30, cursor: "pointer" }}
        onClick={onClickNext}
      />
      <div className="volume-container">
        <VolumeUpIcon sx={{ fontSize: 20 }} />
        <input
          type="range"
          style={{ cursor: "pointer" }}
          defaultValue={1}
          min="0"
          max="1"
          step="0.1"
          onChange={onChangeVolume}
        />
      </div>
    </div>
  );
};

export default Controls;
