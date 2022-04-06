import HttpService from "./http.service.js";

export default class YoutubeService {

    _mostPopularPageToken;
    videoList = [];
  
    constructor(key) {
      this._request = new HttpService();
      this._request.create({
        baseURL: 'https://www.googleapis.com/youtube/v3',
        params: { key }
      })
    }

    async mostPopular() {
      const response = await this._request.get("videos", {
        part: "snippet",
        maxResults: 25,
        regionCode: "kr",
        chart: "mostPopular",
        pageToken: this._mostPopularPageToken
      });
      this._mostPopularPageToken = response.nextPageToken;
      const result = response?.items ?? [];
      this.videoList = [...this.videoList, ...result];
      return result;
    }
  
    async search(query) {
      const response = await this._request.get("search", {
        part: "snippet",
        maxResults: 25,
        type: "video",
        q: query,
      });
      const result = response?.items.map((item) => ({
        ...item,
        id: item.id.videoId,
      }));
      this.videoList = [...this.videoList, ...result];
      return result;
    }
  
    getDate(data) {
      const date = new Date(data);
      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate() + 1}`;
    }
  }
  