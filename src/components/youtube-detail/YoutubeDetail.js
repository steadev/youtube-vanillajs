export default class YoutubeDetail {
  constructor({youtubeService, id}) {
    this._elem = document.createElement('div');
    this._id = id;
  }

  render() {
    const origin = `http://localhost:8080`;
    const src = `https://www.youtube.com/embed/${this._id}?enablejsapi=1&origin=${origin}`;
    this._elem.innerHTML = `
      <iframe id="player" width="1280" height="680" src="${src}"></iframe>`;
    // <iframe width="420" height="315" src="https://www.youtube.com/embed/039nv45oth8" frameborder="0" allowfullscreen></iframe>

    return {
      html: this._elem
    }
  }
}