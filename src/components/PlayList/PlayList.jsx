import React from "react";
import QueueMusic from "@mui/icons-material/QueueMusic";
import Close from "@mui/icons-material/Close";
import PlayListItem from "./PlayListItem";
import classNames from "classnames";
import "./PlayList.scss";
import { useSelector } from "react-redux";

const PlayList = ({ showMusicList, setShowMusicList }) => {
  const playList = useSelector((state) => state.playList);
  return (
    <div className={classNames("play-list")}>
      <div className="header">
        <div className="row">
          <QueueMusic className="list" />
          <span>Play list</span>
        </div>
        <Close sx={{ fontSize: 22, cursor: "pointer" }} />
      </div>
      <ul>
        {playList.map((item, index) => (
          <li key={index}>
            <PlayListItem item={item} index={index} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlayList;
