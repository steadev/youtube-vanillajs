import YoutubeDetail from './components/youtube-detail/YoutubeDetail.js';
import YoutubeMain from './components/youtube-main/YoutubeMain.js';
import YoutubeService from './services/youtube.service.js';

const youtubeService = new YoutubeService('AIzaSyDQj5StsLFdWuxkY_sR9VtQWdTT_Qp5kgk');

export const router = async (path) => {
  history.pushState(null, null, path ?? '/');
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
    try {
      const pageInfo = await currentPage.render();
      document.querySelector('#app').innerHTML = pageInfo.html.innerHTML;
      if (Array.isArray(pageInfo.actions)) {
        pageInfo.actions.forEach((action) => {
          action();
        })
      }
    } catch (error) {
      console.error(error);
    }
  }
}

export const navigateTo = url => {
  history.pushState(null, null, url);
  router();
};

window.onpopstate = function(event) {
  router(window.location.pathname);
};

window.addEventListener('DOMContentLoaded', () => {
  router();
});
