import axios from "axios";
import { Link } from "react-router-dom";
import { baseURL, config } from "../services";

function Sitcom(props) {
  const { description, name, numOfSeasons } = props.sitcom.fields;

  const cancel = async () => {
    // we have to make our url (baseURL + our sitcom's id)
    const sitcomURL = `${baseURL}/${props.sitcom.id}`;
    // axios delete request to our new url, with the config
    await axios.delete(sitcomURL, config);
    // fire the useEffect so our GET request shows the updated table
    props.setToggleFetch((curr) => !curr);
  }

  return (
    <div>
      <h3>{name}</h3>
      <h4>{description}</h4>
      <p>{numOfSeasons} Seasons</p>
      <button onClick={cancel}>Cancelled!</button>
      <Link to={`/edit/${props.sitcom.id}`}>
        <button>Try Again!</button>
      </Link>
    </div>
  )
}

export default Sitcom;