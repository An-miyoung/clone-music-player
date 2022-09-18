import React, { useState, useEffect } from "react";
import classNames from "classnames";
import { useSelector } from "react-redux";

// 음악의 duration 은 src 에 metedata 로 갖고 있다.
// audio 객체가 만들어져 메타데이타가 전부 로드된후 audio.duration 에 접근해 가져올 수 있다.
const getDuration = (src) => {
  return new Promise((resolve) => {
    const audio = new Audio();
    audio.onloadedmetadata = () => {
      const minute = `0${parseInt(audio.duration / 60, 10)}`;
      const seconds = `0${parseInt(audio.duration % 60)}`;
      resolve(`${minute}:${seconds.slice(-2)}`);
    };
    audio.src = src;
  });
};

function PlayListItem({ item, index }) {
  const currentIndex = useSelector((state) => state.currentIndex);
  const [duration, setDuration] = useState("00:00");

  useEffect(() => {
    async function getDurationTime() {
      const durationTime = await getDuration(item.src);
      setDuration(durationTime);
    }

    getDurationTime();
  }, [item.src]);
  return (
    <>
      <div className={classNames("row", { playing: currentIndex === index })}>
        <span>{item.name}</span>
        <p>{item.artist}</p>
      </div>
      <span
        className={classNames("music-duration", {
          playing: currentIndex === index,
        })}
      >
        {duration}
      </span>
    </>
  );
}

export default PlayListItem;
