import React from "react";
import { useResource, useField } from "./hooks";

const App = () => {
  const content = useField("text");
  const name = useField("text");
  const number = useField("text");

  const conClone = (({ resetfield, ...content }) => content)(content);
  const nameClone = (({ resetfield, ...name }) => name)(name);
  const numbClone = (({ resetfield, ...number }) => number)(number);

  const [notes, noteService] = useResource("http://localhost:3005/notes");

  const [persons, personService] = useResource("http://localhost:3005/persons");

  console.log("SETDATA");

  const handleNoteSubmit = (event) => {
    event.preventDefault();
    noteService.create({ content: content.value });
    content.resetfield();
  };

  const handlePersonSubmit = (event) => {
    event.preventDefault();
    personService.create({ name: name.value, number: number.value });
    name.resetfield();
    number.resetfield();
  };

  return (
    <div>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...conClone} />
        <button>create</button>
      </form>
      {notes.map((n) => (
        <p key={n.id}>{n.content}</p>
      ))}

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input {...nameClone} /> <br />
        number <input {...numbClone} />
        <button>create</button>
      </form>
      {persons.map((n) => (
        <p key={n.id}>
          {n.name} {n.number}
        </p>
      ))}
    </div>
  );
};

export default App;
