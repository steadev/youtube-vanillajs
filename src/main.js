import YoutubeDetail from './components/youtube-detail/YoutubeDetail.js';
import YoutubeMain from './components/youtube-main/YoutubeMain.js';
import YoutubeService from './services/youtube.service.js';

// const app = new App(document.querySelector('#app'));
const youtubeService = new YoutubeService('AIzaSyDQj5StsLFdWuxkY_sR9VtQWdTT_Qp5kgk');
const router = async () => {
  const routes = [
    { path: '/', page: YoutubeMain },
    { path: '/:id', page: YoutubeDetail }
  ];

  let currentPage;
  routes.forEach((route) => {
    if (location.pathname === route.path) {
      currentPage = new route.page({youtubeService});
    }
  });

  if (currentPage !== undefined) {
    document.querySelector('#app').innerHTML = (await currentPage.render()).innerHTML;
    console.log(currentPage.render().innerHTML);
  }
}
window.addEventListener('DOMContentLoaded', () => {
  router();
});
