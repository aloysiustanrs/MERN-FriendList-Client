import "./App.css";
import { useState, useEffect } from "react";
const axios = require("axios").default;

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);

  const [listOfFriends, setListOfFriends] = useState([]);

  // axios route to '/addfriend' from [server folder's index.js]
  const addFriend = () => {
    // axios.post(link,object)
    axios
      .post("https://mern-friend-list.herokuapp.com/addfriend", {
        name: name,
        age: age,
      })
      .then((response) => {
        setListOfFriends([
          ...listOfFriends,
          { _id: response.data._id, name: name, age: age },
        ]);
      });
  };

  const updateFriend = (id) => {
    const newAge = prompt("Enter new age:");

    axios
      .put("https://mern-friend-list.herokuapp.com/update", {
        newAge: newAge,
        id: id,
      })
      .then(() => {
        setListOfFriends(
          listOfFriends.map((val) => {
            return val._id === id
              ? { _id: id, name: val.name, age: newAge }
              : val;
          })
        );
      });
  };

  const deleteFriend = (id) => {
    axios
      .delete(`https://mern-friend-list.herokuapp.com/delete/${id}`)
      .then(() => {
        setListOfFriends(
          listOfFriends.filter((friend) => {
            return friend._id !== id;
          })
        );
      });
  };

  // in useEffect, axios gets the data from backend
  // useEffect runs on every render and runs setListOfFriends() to response from data
  useEffect(() => {
    axios
      .get("https://mern-friend-list.herokuapp.com/read")
      .then((response) => {
        setListOfFriends(response.data);
      })
      .catch(() => {
        console.log("error");
      });
  }, []);

  return (
    <div className="App">
      <div className="inputs">
        <input
          type="text"
          placeholder="Friend Name"
          onChange={(event) => {
            setName(event.target.value);
          }}
        ></input>
        <input
          type="number"
          placeholder="Age"
          onChange={(event) => {
            setAge(event.target.value);
          }}
        ></input>

        <button onClick={addFriend}>Add Friend</button>
      </div>
      <div className="listOfFriends">
        {listOfFriends.map((friend) => {
          return (
            <div className="friendContainer">
              <div className="friend">
                Name: {friend.name} &nbsp; Age: {friend.age}
              </div>
              <button
                onClick={() => {
                  updateFriend(friend._id);
                }}
              >
                Update
              </button>
              <button
                id="removeBtn"
                onClick={() => {
                  deleteFriend(friend._id);
                }}
              >
                X
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
