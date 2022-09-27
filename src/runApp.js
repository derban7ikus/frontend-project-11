import onChange from 'on-change';
import i18next from 'i18next';
import validate from './validate.js';
import render from './view.js';
import ru from './texts.js';

const runApp = () => {
  const state = {
    isInvalid: false,
    rssFeeds: [],
    errors: '',
  };
  i18next.init({ lng: 'ru', debug: true, resources: { ru } });

  const form = document.querySelector('.rss-form');
  const input = document.querySelector('.form-control');
  const feedback = document.querySelector('.feedback');

  const watchedState = onChange(state, () => {
    render(watchedState, input, form, feedback);
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const url = input.value;
    validate(url, watchedState)
      .then((result) => {
        watchedState.errors = '';
        watchedState.isInvalid = false;
        watchedState.rssFeeds.push(result);
      })
      .catch((error) => {
        watchedState.isInvalid = true;
        watchedState.errors = error.errors;
      });
    form.reset();
    input.focus();
  });
};

export default runApp;
