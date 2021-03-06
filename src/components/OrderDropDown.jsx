export default function OrderDropDown({ setOrder, selected }) {
  const handleOrderChange = (event) => {
    setOrder(event.target.value);
  };

  return (
    <form>
      <label className="navlabel" htmlFor="orderList">
        Order:
        <br />
      </label>
      <select
        onChange={handleOrderChange}
        name="order"
        id="orderList"
        value={selected}
      >
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
