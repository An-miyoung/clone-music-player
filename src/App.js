import "./App.css";
import SortableList from "./sortable/SortableList";
import { data } from "./testItem/testData.js";
import TestItem from "./testItem/TestItem";

function App() {
  const onDropItem = (newList) => console.log(newList);
  const onClickItem = (index) => alert(index);

  return (
    <SortableList
      data={data}
      onDropItem={onDropItem}
      onClickItem={onClickItem}
      renderItem={(item, index) => <TestItem data={item} index={index} />}
    />
  );
}

export default App;
