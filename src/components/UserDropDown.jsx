import { useEffect, useState } from "react";

export default function UserDropDown({ users }) {
  console.log(users);
  return (
    <div>
      <label classname="navlabel" htmlFor="user-dropdown">
        Username:
        <br />
      </label>
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
