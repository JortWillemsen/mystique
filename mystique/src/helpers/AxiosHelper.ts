import { AxiosInstance, AxiosStatic } from "axios";

export class AxiosHelper {
  axios: AxiosStatic;
  pat: string;
  instance: AxiosInstance;

  constructor(axios: AxiosStatic) {
    this.axios = axios;
  }

  public static inject = ["axios"] as const;

  async setAxiosInstance(token: string) {
    const headers = this.pat !== undefined ? { "X-Figma-Token": this.pat} : { Authorization: `Bearer ${token}` }

    this.instance = this.axios.create({
      baseURL: "https://api.figma.com/v1/",
      timeout: 2000,
      headers: headers,
    });
  }

  async getRequest(url: string) {
    var response = await this.instance.get(url);

    return response;
  }

  async getTokens(client_id: string, client_secret: string, code: string) {
    const instance = this.axios.create({
      baseURL: "https://www.figma.com/api",
      timeout: 2000,
    });

    const response = await instance.post(
      `/oauth/token?client_id=${client_id}&client_secret=${client_secret}&redirect_uri=http://localhost:3000/authenticated&code=${code}&grant_type=authorization_code`,
      {}
    );

    return response.data;
  }
}
