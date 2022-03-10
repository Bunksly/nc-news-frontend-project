export default function ErrorPage({ error }) {
  if (error === "path") {
    return <h3>Path not found</h3>;
  }
  if (error.hasOwnProperty("topic")) {
    return <h3>Topic {error.topic} not found</h3>;
  }
  if (error.hasOwnProperty("id")) {
    return <h3>Article with ID: {error.id} not found</h3>;
  }
  return <h3>Page not found</h3>;
}
