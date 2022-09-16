import * as yup from 'yup';
import onChange from 'on-change';

const runApp = () => {
  const state = {
    isInvalid: false,
    rssFeeds: [],
    errors: [],
  };
  const form = document.querySelector('.rss-form')
  const input = document.querySelector('.form-control');

  const render = (state) => {
    input.classList.remove('is-invalid');
    input.value = '';
    input.focus();
    if (state.isInvalid) {
      input.classList.add('is-invalid');
    };
  };

  const watchedState = onChange(state, () => {
    console.log(state.rssFeeds);
    render(watchedState);
  });

  const schema = yup.string().notOneOf([ state.rssFeeds ]).url();

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    watchedState.isInvalid = false;
    const formData = new FormData(e.target);
    const url = formData.get('url');
    schema.validate(url)
      .then((result) => watchedState.rssFeeds.push(result))
      .catch((error) => {
        watchedState.errors.push(error);
        watchedState.isInvalid = true;
      });
  })
};

export default runApp;
