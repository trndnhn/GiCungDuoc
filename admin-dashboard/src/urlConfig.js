// const baseUrl = "https://whatever-rest-server.herokuapp.com";
// const baseUrl = "http://localhost:2000";
const baseUrl = process.env.API || "http://whatever-rest-server.herokuapp.com";

export const api = `${baseUrl}/api`;
// ok

export const generatePublicUrl = (fileName) => {
  return `${baseUrl}/public/${fileName}`;
};
