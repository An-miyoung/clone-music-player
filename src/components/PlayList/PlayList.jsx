import React, { useCallback } from "react";
import QueueMusic from "@mui/icons-material/QueueMusic";
import Close from "@mui/icons-material/Close";
import PlayListItem from "./PlayListItem";
import classNames from "classnames";
import "./PlayList.scss";
import { useSelector, useDispatch } from "react-redux";
import SortableList from "../../sortable/SortableList";
import {
  setCurrentIndex,
  updatePlayList,
} from "../../store/musicPlayerReducer";

const PlayList = ({ showPlayList, setShowPlayList }) => {
  const playList = useSelector((state) => state.playList);
  const dispatch = useDispatch();

  const onClose = useCallback(() => {
    setShowPlayList(false);
  }, [setShowPlayList]);

  const onDropItem = useCallback(
    (newPlayList) => {
      dispatch(updatePlayList(newPlayList));
    },
    [dispatch]
  );

  const onClickItem = useCallback(
    (index) => {
      dispatch(setCurrentIndex(index));
    },
    [dispatch]
  );

  const renderItem = useCallback(
    (item, index) => <PlayListItem item={item} index={index} />,
    []
  );

  return (
    <div className={classNames("play-list", { show: showPlayList })}>
      <div className="header">
        <div className="row">
          <QueueMusic className="list" />
          <span>Play list</span>
        </div>
        <Close sx={{ fontSize: 22, cursor: "pointer" }} onClick={onClose} />
      </div>
      <SortableList
        data={playList}
        onDropItem={onDropItem}
        onClickItem={onClickItem}
        renderItem={renderItem}
      />
    </div>
  );
};

export default PlayList;
