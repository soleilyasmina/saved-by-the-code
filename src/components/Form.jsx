import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import { baseURL, config } from "../services";

function Form(props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [numOfSeasons, setNumOfSeasons] = useState(1);
  const history = useHistory();
  const params = useParams();

  useEffect(() => {
    if (params.id && props.sitcoms.length > 0) {
      const sitcom = props.sitcoms.find((sitcom) => sitcom.id === params.id);
      if (sitcom) {
        setName(sitcom.fields.name);
        setDescription(sitcom.fields.description);
        setNumOfSeasons(sitcom.fields.numOfSeasons);
      }
    }
  }, [props.sitcoms, params.id])

  const handleSubmit = async (e) => {
    e.preventDefault();
    // create a new object called newSitcom with properties for each of the states
    const newSitcom = {
      name,
      description,
      numOfSeasons,
    }
    // axios post request with a url of baseURL, a data field of { fields: newSitcom }, and a config of config
    if (params.id) {
      const recordURL = `${baseURL}/${params.id}`;
      await axios.put(recordURL, { fields: newSitcom }, config)
    } else {
      await axios.post(baseURL, { fields: newSitcom }, config);
    }
    props.setToggleFetch((curr) => !curr);
    history.push("/");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name:</label>
      <input
        required
        id="name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label htmlFor="description">Description:</label>
      <input
        required
        id="description"
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <label htmlFor="numOfSeasons">Number of Seasons:</label>
      <input
        required
        id="numOfSeasons"
        type="number"
        value={numOfSeasons}
        onChange={(e) => setNumOfSeasons(e.target.valueAsNumber)}
      />
      <button type="submit">Let's Watch</button>
    </form>
  );
}

export default Form;
