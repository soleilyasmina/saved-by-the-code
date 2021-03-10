import { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import axios from "axios";
import Form from "./components/Form";
import Navbar from "./components/Navbar";
import Sitcom from "./components/Sitcom";
import { baseURL, config } from "./services";
import "./App.css";

function App() {
  const [sitcoms, setSitcoms] = useState([]);
  const [toggleFetch, setToggleFetch] = useState(false);

  useEffect(() => {
    const makeMeLaugh = async () => {
      const resp = await axios.get(baseURL, config);
      setSitcoms(resp.data.records);
    };
    makeMeLaugh();
  }, [toggleFetch]);

  return (
    <div className="App">
      <Navbar />
      <Route exact path="/">
        <div className="sitcoms-container">
          {sitcoms.map((sitcom) => (
            <Sitcom
              key={sitcom.id}
              sitcom={sitcom}
              setToggleFetch={setToggleFetch}
            />
          ))}
        </div>
      </Route>
      <Route path="/new">
        <Form sitcoms={sitcoms} setToggleFetch={setToggleFetch} />
      </Route>
      <Route path="/edit/:id">
        <Form sitcoms={sitcoms} setToggleFetch={setToggleFetch} />
      </Route>
    </div>
  );
}

export default App;
