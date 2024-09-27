const baseURL =
  process.env.NODE_ENV === 'production'
    ? 'http://18.208.175.110:8888'
    : 'http://localhost:8080';

export default baseURL;

/*
 *     ? 'http://18.208.175.110:8888'
 *         ? 'https://soldim-api-344942c665db.herokuapp.com'
 */
