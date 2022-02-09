import YoutubeMain from './components/youtube-main/YoutubeMain.js';
import { YoutubeService } from './services/youtube.service.js';

const youtubeService = new YoutubeService('AIzaSyDQj5StsLFdWuxkY_sR9VtQWdTT_Qp5kgk');
export default class App {
  constructor($target) {
    new YoutubeMain({$target, youtubeService});
  }
}