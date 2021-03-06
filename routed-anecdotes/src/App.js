import React, { useState } from "react";
import { Table } from "react-bootstrap";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useHistory,
} from "react-router-dom";
import { useField } from "./hooks";

const Menu = () => {
  const padding = {
    paddingRight: 5,
  };
  return (
    <div>
      <a href="/" style={padding}>
        Anecdotes
      </a>
      <a href="/createnew" style={padding}>
        create new
      </a>
      <a href="/about" style={padding}>
        about
      </a>
    </div>
  );
};

const AnecdoteList = ({ anecdotes, notification }) => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <h3>{notification}</h3>
      <ul>
        {anecdotes.map((anecdote) => (
          <li key={anecdote.id}>
            <Link to={`/anecdote/${anecdote.id}`}>{anecdote.content}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Anecdote = ({ anecdotes }) => {
  const id = useParams().id;
  const anecdote = anecdotes.find((n) => n.id === id);
  return (
    <div>
      <h1>{anecdote.content}</h1>
      <p> Author: {anecdote.author}</p>
      <h3>more info: {anecdote.info}</h3>
    </div>
  );
};
const About = () => (
  <div>
    <Table striped>
      <tbody>
        <h2>About anecdote app</h2>
        <p>According to Wikipedia:</p>

        <em>
          An anecdote is a brief, revealing account of an individual person or
          an incident. Occasionally humorous, anecdotes differ from jokes
          because their primary purpose is not simply to provoke laughter but to
          reveal a truth more general than the brief tale itself, such as to
          characterize a person by delineating a specific quirk or trait, to
          communicate an abstract idea about a person, place, or thing through
          the concrete details of a short narrative. An anecdote is "a story
          with a point."
        </em>

        <p>
          Software engineering is full of excellent anecdotes, at this app you
          can find the best and add more.
        </p>
      </tbody>
    </Table>
  </div>
);

const Footer = () => (
  <div>
    Anecdote app for{" "}
    <a href="https://courses.helsinki.fi/fi/tkt21009">
      Full Stack -websovelluskehitys
    </a>
    . See{" "}
    <a href="https://github.com/fullstack-hy/routed-anecdotes/blob/master/src/App.js">
      https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js
    </a>{" "}
    for the source code.
  </div>
);

const CreateNew = (props) => {
  const history = useHistory();
  const content = useField("text");
  const author = useField("text");
  const info = useField("text");

  const conClone = (({ resetfield, ...content }) => content)(content);
  const authClone = (({ resetfield, ...author }) => author)(author);
  const infoClone = (({ resetfield, ...info }) => info)(info);

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push("/");

    props.addNew({
      content: content.value,
      authore: author.value,
      info: info.value,
      votes: 0,
    });
  };

  return (
    <div className="container">
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        content:
        <input {...conClone} />
        <br />
        author
        <input {...authClone} />
        <br />
        url for more info
        <input {...infoClone} />
        <br />
        <button type="submit">create</button>
      </form>
      <button
        onClick={() => {
          content.resetfield();
          author.resetfield();
          info.resetfield();
        }}
      >
        reset
      </button>
      <div>
        {content.value} {author.value} {info.value}
      </div>
    </div>
  );
};

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: "If it hurts, do it more often",
      author: "Jez Humble",
      info: "https://martinfowler.com/bliki/FrequencyReducesDifficulty.html",
      votes: 0,
      id: "1",
    },
    {
      content: "Premature optimization is the root of all evil",
      author: "Donald Knuth",
      info: "http://wiki.c2.com/?PrematureOptimization",
      votes: 0,
      id: "2",
    },
  ]);

  const [notification, setNotification] = useState("");

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0);
    setAnecdotes(anecdotes.concat(anecdote));
    setNotification(`New Anecdote ${anecdote.content}  created`);
    setTimeout(() => {
      setNotification(null);
    }, 10000);
  };

  const anecdoteById = (id) => anecdotes.find((a) => a.id === id);

  const vote = (id) => {
    const anecdote = anecdoteById(id);

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };

    setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)));
  };

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Router>
        <Menu />
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/anecdote/:id">
            <Anecdote anecdotes={anecdotes} />
          </Route>
          <Route path="/createnew">
            <CreateNew addNew={addNew} />
          </Route>
          <Route path="/">
            <AnecdoteList anecdotes={anecdotes} notification={notification} />
          </Route>
        </Switch>
      </Router>
      <Footer />
    </div>
  );
};

export default App;
