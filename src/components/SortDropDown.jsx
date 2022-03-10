export default function SortDropDown({ setSortBy, selected }) {
  const handleSortChange = (event) => {
    if (event.target.value === "-------") {
      setSortBy(null);
    } else {
      setSortBy(event.target.value);
    }
  };

  return (
    <form onChange={handleSortChange}>
      <label htmlFor="sortBy">Sort By:</label>
      <select name="sortBy" id="sortList" value={selected}>
        <option key="-" value="-------">
          {"-------"}
        </option>
        <option key="date" value="created_at">
          date created
        </option>
        <option key="title" value="title">
          title A-Z
        </option>
        <option key="topic" value="topic">
          topic A-Z
        </option>
        <option key="author" value="author">
          author A-Z
        </option>
        <option key="votes" value="votes">
          vote count
        </option>
        <option key="comment" value="comment_count">
          comment count
        </option>
      </select>
    </form>
  );
}
