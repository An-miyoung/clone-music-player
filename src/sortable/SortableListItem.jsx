import React, { useRef } from "react";

function SortableListItem({
  index,
  draggable,
  children,
  onDragStart,
  onDropItem,
  onClickItem,
}) {
  const itemRef = useRef();

  const onDragStartItem = () => {
    itemRef.current.classList.add("dragstart");
    onDragStart(index);
  };
  const onDragEnd = () => {
    itemRef.current.classList.remove("dragstart");
    onDropItem(index);
  };
  const onDragEnter = () => itemRef.current.classList.add("dragover");

  const onDragLeave = () => itemRef.current.classList.remove("dragover");

  // onDrop event 가 일어나기 위해서는 onDragOver 에서 preventDefault 를 해줘야 한다.
  const onDragOver = (e) => e.preventDefault();

  const onDrop = () => {
    // border 를 없애준다
    itemRef.current.classList.remove("dragover");
    onDropItem(index);
  };
  const onClick = () => onClickItem(index);

  return (
    <li
      ref={itemRef}
      className="item"
      draggable={draggable ? draggable : false}
      onDragStart={onDragStartItem}
      onDragEnd={onDragEnd}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDragOver={onDragOver}
      onDrop={onDrop}
      onClick={onClick}
    >
      {children}
    </li>
  );
}

export default SortableListItem;
