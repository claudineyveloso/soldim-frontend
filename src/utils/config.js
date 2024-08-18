const baseURL =
  process.env.NODE_ENV === "production"
    ? "https://soldim-4dc6480ce821.herokuapp.com"
    : "http://localhost:8080";

export default baseURL;
