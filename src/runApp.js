import onChange from 'on-change';
import i18next from 'i18next';
import axios from 'axios';
import rssParser from './rssParser.js';
import validate from './validate.js';
import { render, renderFeed, renderPosts } from './view.js';
import ru from './texts.js';

const runApp = () => {
  const state = {
    form: {
      isInvalid: false,
      rssFeeds: [],
      errors: '',
    },
    feeds: [],
    posts: [],
  };
  i18next.init({ lng: 'ru', debug: true, resources: { ru } });

  const form = document.querySelector('.rss-form');
  const input = document.querySelector('.form-control');
  const feedback = document.querySelector('.feedback');
  const feeds = document.querySelector('.feeds');
  const posts = document.querySelector('.posts');

  const watchedState = onChange(state, () => {
    console.log(state);
    render(watchedState, input, form, feedback);
    renderFeed(watchedState, feeds);
    renderPosts(watchedState, posts);
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const url = input.value;
    validate(url, watchedState)
      .then(() => axios.get(`https://allorigins.hexlet.app/get?url=${encodeURIComponent(`${url}`)}`))
      .then((response) => {
        if (!response.data.contents.includes('</rss>')) throw new Error('String is not RSS');
        watchedState.form.errors = '';
        watchedState.form.isInvalid = false;
        watchedState.form.rssFeeds.push(url);
        const parsedData = rssParser(response);
        watchedState.feeds.push(parsedData.feed);
        watchedState.posts.push(...parsedData.posts);
      })
      .catch((error) => {
        watchedState.form.isInvalid = true;
        if (error.message === 'Network Error') {
          watchedState.form.errors = i18next.t('errors.network');
        } else if (error.message === 'String is not RSS') {
          watchedState.form.errors = i18next.t('errors.notRss');
        } else watchedState.form.errors = error.errors;
      });
    form.reset();
    input.focus();
  });
};

export default runApp;
