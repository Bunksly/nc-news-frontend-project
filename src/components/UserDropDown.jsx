import { useEffect, useState } from "react";
import { fetchUsers } from "../api";

export default function UserDropDown() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers().then((res) => {
      setUsers(res);
    });
  }, []);

  return (
    <div>
      <label htmlFor="user-dropdown">Username: </label>
      <select id="user-dropdown">
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
    </div>
  );
}
