import { useState } from "react";
import InputTodo from "./todo/input.todo";

const App = () => {
  const [listTodo, setListTodo] = useState([
    "todo 1",
    "todo 2",
    "todo 3",
    "todo 4",
    "todo 5",
    "todo 6",
    "todo 7",
    "todo 8",
  ]);

  const name = "Hỏi dân IT";
  const age = 25;
  const info = {
    gender: "male",
    address: "HN",
  };

  // const handleTest = (name: string) => {
  //   alert(`handle test with name = ${name}`);
  // };

  return (
    <>
      <div className="parent">
        <div className="children"></div>
      </div>
      <InputTodo
        name={name}
        age={age}
        hoidanit={info}
        // ericFunction={handleTest}
        listTodo={listTodo}
        setListTodo={setListTodo}
      />
      <br />
      <ul>
        {listTodo.map((item, index) => {
          return <li key={index}>{item}</li>;
        })}
      </ul>
    </>
  );
};

export default App;
