import axios from "axios";

function getAxiosInstance(token: string) {
  return axios.create({
    baseURL: 'https://api.figma.com/v1/',
    timeout: 2000,
    headers: { 'Authorization': `Bearer ${token}` }
  });
}
export async function getRequest(code: string, url: string) {
  var response = await getAxiosInstance(code).get(url);

  return response;
}

export async function getTokens(
  client_id: string,
  client_secret: string,
  code: string) {

  const instance = axios.create({
    baseURL: 'https://www.figma.com/api',
    timeout: 2000,
  });

  const response = await instance.post(
    `/oauth/token?client_id=${client_id}&client_secret=${client_secret}&redirect_uri=http://localhost:3000/authenticated&code=${code}&grant_type=authorization_code`
    , {})

  return response.data;
}