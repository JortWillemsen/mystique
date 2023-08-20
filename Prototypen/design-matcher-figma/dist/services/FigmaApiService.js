import { randomInt } from "crypto";
import open from "open";
import { getRequest, getTokens } from "../helpers/AxiosHelper.js";
export class FigmaApiService {
    state;
    code;
    accessToken;
    refreshToken;
    constructor() {
        this.state = randomInt(0, 999999999);
    }
    async authenticate() {
        await open(`https://www.figma.com/oauth?client_id=${process.env.FIGMA_OAUTH_CLIENT_ID}&redirect_uri=http://localhost:3000/authenticated&scope=file_read&state=${this.state}&response_type=code`);
    }
    async getAccessToken() {
        var tokens = await getTokens(process.env.FIGMA_OAUTH_CLIENT_ID, process.env.FIGMA_OAUTH_SECRET, this.code).catch(err => console.log(err));
        this.accessToken = tokens.access_token;
        this.refreshToken = tokens.refresh_token;
        return tokens;
    }
    setCode(code) {
        this.code = code;
    }
    async findFile(key) {
        const response = await getRequest(this.accessToken, `/files/${key}`);
        return response.data;
    }
}
//# sourceMappingURL=FigmaApiService.js.map