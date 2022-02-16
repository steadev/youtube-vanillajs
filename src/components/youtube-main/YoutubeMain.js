import { appendCss } from "../../utils.js";
import AbstractPage from "../AbstractPage.js";

export default class YoutubeMain extends AbstractPage {

  constructor({youtubeService}) {
    super();
    appendCss(`src/components/youtube-main/YoutubeMain.css`);
    this._youtube = youtubeService;
    this.getYoutubeList();
    this.render();
  }

  appendListElem() {
    this._elem = document.createElement('div');
    this._listElem = document.createElement('div');
    this._listElem.className = 'main-list-warpper';
    this._listElem.innerHTML = '';
    this._elem.appendChild(this._listElem);
  }

  getYoutubeList() {
    this._youtube.mostPopular() //
      .then((res) => {
        if (Array.isArray(res)) {
          res.forEach((video) => {
            this.drawYoutubeList(video)
          })
        }
      });
  }

  drawYoutubeList(video) {
    const { snippet } = video;
    const videoElem = `
      <div class="video-item">
        <div class="video-item--thumbnail">
          <img src="${snippet.thumbnails.high.url}" alt="thumbnail" />
        </div>
        <h3>
          <div class="video-item--title">${snippet.title}</div>
        </h3>
        <div class="video-item--channel-name">${snippet.channelTitle}</div>
        <div class="video-item--published-at">
          ${this._youtube.getDate(snippet.publishedAt)}
        </div>
      </div>
    `;
    this._listElem.innerHTML += videoElem;
  }

  render() {
    return this._elem;
  }
}