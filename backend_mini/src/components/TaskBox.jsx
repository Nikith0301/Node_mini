import React, { useState } from "react";

export default function TaskBox({ works, handleDelete, handleEdit }) {
  return (
    <>
      <ul>
        {" "}
        {works.map((work, index) => (
          <li key={work.id}>
            <Task
              task={work}
              id={work.id}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            />
          </li>
        ))}
      </ul>
    </>
  );
}

function Task({ task, text, id, handleDelete, handleEdit }) {
  const [editable, setEditable] = useState(false);

  let Content;

  if (editable) {
    Content = (
      <>
        <input
          value={task.name||task.text}
          onChange={(event) =>
            handleEdit({ ...task, text: event.target.value })
          }
        />

        <button
          onClick={() => {
            setEditable(false);
          }}
        >
          Save
        </button>
      </>
    );
  } else {
    Content = (
      <>
        {task.text||task.name}

        <button
          onClick={() => {
            setEditable(true);
          }}
        >
          Edit
        </button>
      </>
    );
  }

  return (
    <>
      <input type="checkbox" />
      {Content}
      <button onClick={() => handleDelete(id)}>Delete</button>
    </>
  );
}
