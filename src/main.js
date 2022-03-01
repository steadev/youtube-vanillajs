import YoutubeDetail from './components/youtube-detail/YoutubeDetail.js';
import YoutubeMain from './components/youtube-main/YoutubeMain.js';
import YoutubeService from './services/youtube.service.js';

export const navigateTo = url => {
  history.pushState(null, null, url);
  router();
};
const youtubeService = new YoutubeService('AIzaSyDQj5StsLFdWuxkY_sR9VtQWdTT_Qp5kgk');

export const router = async () => {
  console.log('???');
  const routes = [
    { path: '/', page: YoutubeMain },
    { path: '/:id', page: YoutubeDetail }
  ];

  let currentPage;
  routes.forEach((route) => {
    if (location.pathname === route.path) {
      currentPage = new route.page({youtubeService});
    }
    // TODO: 야매 코드.. regex 이용해서 수정 요망
    const pathArr = location.pathname.split('/');
    if (route.path.includes(':id') && pathArr[pathArr.length - 1]) {
      currentPage = new route.page({youtubeService, id: pathArr[pathArr.length - 1]});
    }
  });

  if (currentPage !== undefined) {
    document.querySelector('#app').innerHTML = (await currentPage.render()).innerHTML;
  }
}

window.addEventListener("popstate", router);

window.addEventListener('pushstate', () => {
  console.log('???');
})

window.addEventListener('DOMContentLoaded', () => {
  router();
});
