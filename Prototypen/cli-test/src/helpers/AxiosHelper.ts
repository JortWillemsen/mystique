import axios from "axios";

function getAxiosInstance() {
  return axios.create({
    baseURL: 'https://api.figma.com/v1/',
    timeout: 1000,
    headers: { 'X-Figma-Token': process.env.FIGMA_ACCESS_TOKEN }
  });
}
async function getRequest(url: string) {
  var response = await getAxiosInstance().get(url);

  return response;
}