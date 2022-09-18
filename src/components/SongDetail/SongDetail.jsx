import React from "react";
import "./SongDetail.scss";
import img1 from "../../images/music-1.jpg";
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

export default SongDetail;
