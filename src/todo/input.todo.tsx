import { useState } from "react";

interface IProps {
  name: string;
  age: number;
  hoidanit: {
    gender: string;
    address: string;
  };
  abc?: string;
  // ericFunction: (name: string) => void;
  listTodo: string[];
  setListTodo: (value: string[]) => void;
  children: React.ReactNode;
}

const InputTodo = (props: IProps) => {
  const { listTodo, setListTodo } = props;

  const [todo, setTodo] = useState("");

  const handleClick = () => {
    if (!todo) {
      alert("Empty todo");
      return;
    }
    setListTodo([...listTodo, todo]);
    setTodo("");
    // ericFunction(todo);
  };

  return (
    <div style={{ border: "1px solid red" }}>
      <div>Add new todo</div>
      {props.children}
      <input
        type="text"
        value={todo}
        onChange={(event) => {
          setTodo(event.target.value);
        }}
      />
      &nbsp; &nbsp;
      <button
        onClick={() => {
          handleClick();
        }}
      >
        Save
      </button>
    </div>
  );
};

export default InputTodo;
