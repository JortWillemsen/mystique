import { randomInt } from "crypto";
import { FigmaFile, FigmaFileHelper } from "../helpers/FigmaFileHelper.js";
import { MystiqueTest } from "./RunnerService.js";
import { AxiosHelper } from "./../helpers/AxiosHelper.js";
import { OpenWrapper } from "../wrappers/openWrapper.js";

export interface tokensResponse {
  access_token: string;
  refresh_token: string;
}

export class FigmaApiService {
  state: number;
  code: string;
  accessToken: string;
  refreshToken: string;
  axiosHelper: AxiosHelper;
  figmaFileHelper: FigmaFileHelper;
  open: OpenWrapper;
  fs: any;

  constructor(
    axiosHelper: AxiosHelper,
    figmaFileHelper: FigmaFileHelper,
    open: OpenWrapper,
    fs: any
  ) {
    this.state = randomInt(1, 999999999);
    this.axiosHelper = axiosHelper;
    this.figmaFileHelper = figmaFileHelper;
    this.open = open;
    this.fs = fs;
  }

  public static inject = [
    "axiosHelper",
    "figmaFileHelper",
    "open",
    "fs",
  ] as const;

  async authenticate(pat?: string) {
    if (pat !== undefined) {
      this.axiosHelper.pat = pat;
      return;
    }

    await this.open.openUrl(
      `https://www.figma.com/oauth?client_id=${"m40a1POrfcxCrCn9fOLYUy"}&redirect_uri=http://localhost:3000/authenticated&scope=file_read&state=${
        this.state
      }&response_type=code`
    );
  }

  async getAccessToken(): Promise<tokensResponse> {
    var tokens: tokensResponse = await this.axiosHelper
      .getTokens(
        "m40a1POrfcxCrCn9fOLYUy",
        "WyizmBWiFvEAQs3yzG1ao4tlzacFdo",
        this.code
      )
      .catch();

    this.accessToken = tokens.access_token;
    this.refreshToken = tokens.refresh_token;

    return tokens;
  }

  setCode(code: string) {
    this.code = code;
  }

  async findFile(key: string) {
    this.axiosHelper.setAxiosInstance(this.accessToken);

    const response = await this.axiosHelper.getRequest(`/files/${key}`);

    return response.data;
  }

  async generateTestsForFile(file: FigmaFile): Promise<MystiqueTest[]> {
    const tests = this.figmaFileHelper.findTests(file);
    console.log(tests);
    
    return tests;
  }
}
