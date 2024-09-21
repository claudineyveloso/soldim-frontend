const baseURL =
  process.env.NODE_ENV === 'production'
    ? 'http://3.80.249.138:8888'
    : 'http://localhost:8080';

export default baseURL;
