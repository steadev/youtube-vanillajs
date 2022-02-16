import YoutubeDetail from './components/youtube-detail/YoutubeDetail.js';
import YoutubeMain from './components/youtube-main/YoutubeMain.js';
console.log("what the..")
// const app = new App(document.querySelector('#app'));
const youtubeService = new YoutubeService('AIzaSyDQj5StsLFdWuxkY_sR9VtQWdTT_Qp5kgk');
const router = () => {
  const routes = [
    { path: '/', page: YoutubeMain },
    { path: '/:id', page: YoutubeDetail }
  ];

  let currentPage;
  routes.forEach((route) => {
    if (location.pathname === route.path) {
      currentPage = new route.page(youtubeService);
    }
  });

  if (currentPage !== undefined) {
    document.querySelector('#app').innerHTML = currentPage.render();
  }
}
window.addEventListener('DOMContentLoaded', () => {
  console.log('???');
  router();
});
