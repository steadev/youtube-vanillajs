import AbstractPage from "../AbstractPage";

export default class YoutubeDetail extends AbstractPage {
  constructor() {
    super()
  }

  render() {
    const origin = `http://localhost:3000`;
    const src = `http://www.youtube.com/embed/${id}?enablejsapi=1&origin=${origin}`;
    return `
      <iframe
        id="player"
        style="margin-right: '2rem'"
        width="1280"
        height="680"
        src=${src}
      ></iframe>`;
  }
}