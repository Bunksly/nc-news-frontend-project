import { useEffect, useState } from "react";

export default function UserDropDown({ users }) {
  console.log(users);
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
