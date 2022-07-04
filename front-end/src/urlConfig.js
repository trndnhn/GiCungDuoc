const baseUrl = "http://whatever-rest-server.herokuapp.com";
// const baseUrl ="http://locahost:2000"

export const api = `${baseUrl}/api`;
export const generatePublicUrl = (fileName) => {
  return `${baseUrl}/public/${fileName}`;
};
