import React, { memo } from "react";
import "./SongDetail.scss";
import { useSelector } from "react-redux";

function SongDetail() {
  // shalowEqual 을 쓰지 않고 rerender를 막으려면 필요한 state를 각각 부른다.
  const playingState = useSelector((state) => state.playingState);
  const playList = useSelector((state) => state.playList);
  const currentIndex = useSelector((state) => state.currentIndex);

  return (
    <>
      <div className="header">
        <span>{playingState ? "Now Playing" : "Not Playing"}</span>
      </div>
      <div className="img-area">
        <img
          src={playList[currentIndex].img}
          alt={playList[currentIndex].name}
        />
      </div>
      <div className="music-info">
        <p className="song">{playList[currentIndex].name}</p>
        <p className="artist">{playList[currentIndex].artist}</p>
      </div>
    </>
  );
}
// app.js 의 showPlayList 에 따라 불필요하게 컴포넌트들이 다시 그려지는 걸 막기 위해
export default memo(SongDetail);
