import { useState } from "react";

export default function OrderDropDown({ setOrder, selected }) {
  const handleOrderChange = (event) => {
    setOrder(event.target.value);
  };

  return (
    <form onChange={handleOrderChange}>
      <label htmlFor="sortBy">Sort By:</label>
      <select name="sortBy" id="sortList" value={selected}>
        <option key="asc" value="asc">
          asc
        </option>
        <option key="desc" value="desc">
          desc
        </option>
      </select>
    </form>
  );
}
