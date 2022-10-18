/* eslint-disable no-param-reassign */
import axios from 'axios';
import { differenceBy } from 'lodash';
import rssParser from './rssParser.js';
import idDelivery from './idDelivery.js';

const autoUpdate = (feedsState, postsState) => {
  setTimeout(function run() {
    console.log('yeah');
    const promises = feedsState.list.map((feed) => axios.get(`https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(`${feed.feedURL}`)}`));
    Promise.all(promises)
      .then((data) => {
        data.forEach((response) => {
          const parsedData = rssParser(response);
          const comparedData = differenceBy(parsedData.posts, postsState.list, 'itemLink');
          console.log(comparedData);
          const comparedWithId = idDelivery(postsState, comparedData);
          postsState.list.push(...comparedWithId);
        });
      })
      .catch((e) => console.log(e));
    setTimeout(run, 5000);
  }, 5000);
};

export default autoUpdate;
