import onChange from 'on-change';
import i18next from 'i18next';
import axios from 'axios';
import rssParser from './rssParser.js';
import validate from './validate.js';
import {
  render, renderFeed, renderPosts,
} from './view.js';
import ru from './texts.js';
import idDelivery from './idDelivery.js';
import autoUpdate from './autoUpdate.js';

const runApp = () => {
  const state = {
    form: {
      isInvalid: false,
      rssFeeds: [],
      errors: '',
    },
    feeds: {
      list: [],
    },
    posts: {
      list: [],
      clicked: [],
    },
  };
  i18next.init({ lng: 'ru', debug: true, resources: { ru } });

  const form = document.querySelector('.rss-form');
  const input = document.querySelector('.form-control');
  const feedback = document.querySelector('.feedback');
  const feeds = document.querySelector('.feeds');
  const posts = document.querySelector('.posts');
  const modal = document.getElementById('modal');

  const watchedForm = onChange(state.form, () => {
    render(watchedForm, input, form, feedback);
  });
  const watchedFeeds = onChange(state.feeds, () => {
    renderFeed(watchedFeeds, feeds);
  });
  const watchedPosts = onChange(state.posts, () => {
    renderPosts(watchedPosts, posts);
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const url = input.value;
    if (state.feeds.list.length === 0) {
      autoUpdate(watchedFeeds, watchedPosts);
    }
    validate(url, watchedForm)
      .then(() => axios.get(`https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(`${url}`)}`))
      .then((response) => {
        if (!response.data.contents.includes('</rss>')) throw new Error('String is not RSS');
        watchedForm.errors = i18next.t('errors.true');
        watchedForm.isInvalid = false;
        watchedForm.rssFeeds.push(url);
        const parsedData = rssParser(response);
        const feedsWithId = idDelivery(watchedFeeds, parsedData.feed);
        const postsWithId = idDelivery(watchedPosts, parsedData.posts);
        watchedFeeds.list.push(...feedsWithId);
        watchedPosts.list.push(...postsWithId);
      })
      .catch((error) => {
        watchedForm.isInvalid = true;
        if (error.message === 'Network Error') {
          watchedForm.errors = i18next.t('errors.network');
        } else if (error.message === 'String is not RSS') {
          watchedForm.errors = i18next.t('errors.notRss');
        } else watchedForm.errors = error.errors;
      });
    form.reset();
    input.focus();
  });

  modal.addEventListener('show.bs.modal', (event) => {
    const button = event.relatedTarget;
    const buttonId = Number(button.dataset.id);
    watchedPosts.clicked.push(buttonId);
    const modalTitle = modal.querySelector('.modal-title');
    const modalBody = modal.querySelector('.modal-body');
    const fullArticle = modal.querySelector('.full-article');
    const clickedObj = state.posts.list.find(({ id }) => id === buttonId);
    modalTitle.textContent = clickedObj.itemTitle;
    modalBody.textContent = clickedObj.itemDescription;
    fullArticle.href = clickedObj.itemLink;
  });
};

export default runApp;
