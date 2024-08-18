const baseURL =
  process.env.NODE_ENV === "production"
    ? "https://soldim-api-8f2829dc6d42.herokuapp.com"
    : "http://localhost:8080";

export default baseURL;
