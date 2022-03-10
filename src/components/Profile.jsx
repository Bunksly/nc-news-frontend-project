import { useEffect, useState, useContext } from "react";
import { UserContext } from "../contexts/user-context";
import { fetchUsers } from "../api";

export default function Profile() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userSelected, setUserSelected] = useState("-------");
  const { loggedIn, setLoggedIn } = useContext(UserContext);

  useEffect(() => {
    setIsLoading(true);
    fetchUsers().then((res) => {
      setUsers(res);
      setIsLoading(false);
    });
  }, []);

  const handleUserChange = (event) => {
    setUserSelected(event.target.value);
    setLoggedIn(event.target.value);
  };

  if (isLoading) return <p>loading...</p>;
  return (
    <form className="select-user">
      <label htmlFor="user-dropdown">User: </label>
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
  );
}
