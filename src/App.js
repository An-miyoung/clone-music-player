import "./App.scss";
import Controls from "./components/Controls/Controls";
import PlayList from "./components/PlayList/PlayList";
import ProgressArea from "./components/PrograssArea/ProgressArea";
import SongDetail from "./components/SongDetail/SongDetail";

import React, { useCallback, useRef } from "react";

function App() {
  const audioRef = useRef();
  const onPlay = useCallback(() => {
    audioRef.current.play();
  }, []);
  const onPause = useCallback(() => {
    audioRef.current.pause();
  }, []);
  const changeVolume = useCallback((volume) => {
    audioRef.current.changeVolume(volume);
  }, []);
  return (
    <div className="App">
      <div className="container">
        <SongDetail />
        <ProgressArea ref={audioRef} />
        <Controls play={onPlay} pause={onPause} changeVolume={changeVolume} />
        <PlayList />
      </div>
    </div>
  );
}

export default App;

// Sortable test용 앱코드
// import "./App.css";
// import SortableList from "./sortable/SortableList";
// import { data } from "./testItem/testData.js";
// import TestItem from "./testItem/TestItem";

// function App() {
//   const onDropItem = (newList) => console.log(newList);
//   const onClickItem = (index) => alert(index);

//   return (
//     <SortableList
//       data={data}
//       onDropItem={onDropItem}
//       onClickItem={onClickItem}
//       renderItem={(item, index) => <TestItem data={item} index={index} />}
//     />
//   );
// }

// export default App;
