import faceDownPortraitCard from './components/assets/facedown-portrait.png';
import faceDownLandscapeCard from './components/assets/facedown-landscape.png';

const preloadResources = () => {
  const cards = [0, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'J', 'Q', 'K'];
  const suits = ['C', 'D', 'H', 'S'];

  const urls = [
    faceDownLandscapeCard,
    faceDownPortraitCard,
  ];
  for(const card of cards) {
    for (const suit of suits) {
      urls.push(`https://deckofcardsapi.com/static/img/${card}${suit}.png`);
    }
  }

  return Promise.all(urls.map(image => loadImage(image)));
};

const loadImage = (url) => new Promise(resolve => {
  const img = new Image();
  img.src = url;
  img.onload = () => resolve(img);
  img.onerror = (error) => {
    console.error(error);
    resolve();
  };
});

export default preloadResources;
