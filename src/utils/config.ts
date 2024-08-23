const baseURL =
  process.env.NODE_ENV === "production"
    ? "https://soldim-api-344942c665db.herokuapp.com"
    : "http://localhost:8080";

export default baseURL;
