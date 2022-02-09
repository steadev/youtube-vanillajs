import App from './App.js';
import YoutubeDetail from './components/youtube-detail/YoutubeDetail.js';
import YoutubeMain from './components/youtube-main/YoutubeMain.js';

const app = new App(document.querySelector('#app'));

const router = () => {
  const routes = [
    { path: '/', page: YoutubeMain },
    { path: '/:id', page: YoutubeDetail }
  ];

  let currentPage;
  routes.forEach((route) => {
    if (location.pathname === route.path) {
      currentPage = route.page;
    }
  });

  if (currentPage !== undefined) {
    document.querySelector('#app').innerHTML = currentPage.render();
  }

}

