import open from "open";

export class OpenWrapper {
  openUrl(url: string) {
    open(url);
  }
}
