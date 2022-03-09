export default function OrderDropDown({ setOrder }) {
  const handleOrderChange = (event) => {
    if (event.target.value === "---") {
      setOrder(null);
    } else {
      setOrder(event.target.value);
    }
  };

  return (
    <form onChange={handleOrderChange}>
      <label htmlFor="sortBy">Sort By:</label>
      <select name="sortBy" id="sortList">
        <option key="-" value="---">
          {"---"}
        </option>
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
