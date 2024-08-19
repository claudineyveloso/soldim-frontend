const baseURL =
  process.env.NODE_ENV === "production"
    ? "https://soldim-api-a62e9b25ff95.herokuapp.com"
    : "http://localhost:8080";

export default baseURL;
