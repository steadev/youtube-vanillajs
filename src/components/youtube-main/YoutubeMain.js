import { router } from "../../main.js";
import { appendCss } from "../../utils.js";

export default class YoutubeMain {

  constructor({youtubeService}) {
    appendCss(`src/components/youtube-main/YoutubeMain.css`);
    this._youtube = youtubeService;
  }

  youtubeList = [];

  setBaseElem() {
    this._elem = document.createElement('div');
    this._elem.className = 'youtube-main-container';
    this.drawSearchBar();
    this.drawYoutubeListBase();
  }

  drawSearchBar() {
    this._searchElem = document.createElement('div');
    this._searchElem.className = 'search-bar-container'
    this._searchElem.innerHTML = `
      <img src="https://kr.seaicons.com/wp-content/uploads/2015/10/YouTube-icon.png" />
      <div class="search-content-wrapper">
        <input type="text">
        <button><img src="https://littledeep.com/wp-content/uploads/2020/09/magnifying-icon-style.png"></button>
      </div>
    `;
    this._elem.appendChild(this._searchElem);
  }

  drawYoutubeList(video) {
    const { snippet, id } = video;
    const elemId = `video-item-${id}`;
    const videoElem = `
      <div id="${elemId}" class="video-item">
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

  drawYoutubeListBase() {
    this._listElem = document.createElement('div');
    this._listElem.className = 'main-list-wrapper';
    this._listElem.innerHTML = '';
    this._elem.appendChild(this._listElem);
  }

  async getYoutubeList() {
    this.youtubeList = await this._youtube.mostPopular();
    if (Array.isArray(this.youtubeList)) {
      this.youtubeList.forEach((video) => {
        this.drawYoutubeList(video);
      })
    }
  }

  async getSearchedYoutubeList(searchInput) {
    this.drawYoutubeListBase();
    this.youtubeList = await this._youtube.search(searchInput);
    if (Array.isArray(this.youtubeList)) {
      this.youtubeList.forEach((video) => {
        this.drawYoutubeList(video);
      })
    }
    const mainListWrapper = document.querySelector('.main-list-wrapper');
    mainListWrapper.innerHTML = this._listElem.innerHTML;
  }

  async render() {
    this.setBaseElem();
    await this.getYoutubeList();
    return {
      html: this._elem,
      actions: [
        () => {
          const searchInput = document.querySelector(`.search-content-wrapper input`);
          const searchButton = document.querySelector(`.search-content-wrapper button`);
          searchButton.addEventListener('click', () => {
            this.getSearchedYoutubeList(searchInput.value);
          });
          if (Array.isArray(this.youtubeList)) {
            this.youtubeList.forEach((video) => {
              const { id } = video;
              const elemId = `video-item-${id}`;
              const videoElem = document.querySelector(`#${elemId}`);
              videoElem.addEventListener('click', () => router(id));
            })
          };
        }
      ]
    }
  }
}