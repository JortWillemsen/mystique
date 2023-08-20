import axios from "axios";
import { randomInt } from "crypto";

class FigmaApiService {
  state: number;

  constructor() {
    this.state = randomInt(0, 999999999);
  }

  async authenticate() {
    const open = require('open');

    await open(`https://www.figma.com/oauth?
    client_id=${process.env.FIGMA_OATH_CLIENT_ID}&
    redirect_uri=https://localhost:3000/authenticated&
    scope=file_read&
    state=${this.state}&
    response_type=code`)
  }
}