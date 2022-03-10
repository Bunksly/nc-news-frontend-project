import { useEffect, useState, useContext } from "react";
import { UserContext } from "../contexts/user-context";
import { fetchUsers, fetchUserbyUsername } from "../api";

export default function Profile() {
  const defaultUserPic =
    "https://st4.depositphotos.com/1000507/24488/v/600/depositphotos_244889634-stock-illustration-user-profile-picture-isolate-background.jpg";

  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userSelected, setUserSelected] = useState("-------");
  const [userPic, setUserPic] = useState(defaultUserPic);
  const { loggedIn, setLoggedIn } = useContext(UserContext);

  useEffect(() => {
    setIsLoading(true);
    fetchUsers().then((res) => {
      setUsers(res);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    if (loggedIn === "-------") {
      setUserPic(defaultUserPic);
    } else {
      fetchUserbyUsername(loggedIn).then((res) => {
        setUserPic(res.avatar_url);
      });
    }
  }, [loggedIn]);

  const handleUserChange = (event) => {
    setUserSelected(event.target.value);
    setLoggedIn(event.target.value);
  };

  if (isLoading) return <p>loading...</p>;
  return (
    <div className="user-select-area">
      <form className="select-user">
        <label htmlFor="user-dropdown">User: </label>
        <br />
        <select
          onChange={handleUserChange}
          id="user-dropdown"
          value={userSelected}
        >
          <option key="-" value="-------">
            {"-------"}
          </option>
          {users.map(({ username }) => {
            return (
              <option key={username} value={username}>
                {username}
              </option>
            );
          })}
        </select>
      </form>
      <img className="user-pic" src={userPic}></img>
    </div>
  );
}
