import i18next from 'i18next';

/* eslint-disable no-param-reassign */
const render = (state, input, form, feedback) => {
  if (state.form.isInvalid) {
    input.classList.add('is-invalid');
    feedback.classList.add('text-danger');
    feedback.textContent = state.form.errors;
  }
  if (!state.form.isInvalid) {
    input.classList.remove('is-invalid');
    feedback.classList.remove('text-danger');
    feedback.textContent = state.form.errors;
  }
};

const renderFeed = (state, feeds) => {
  feeds.innerHTML = '';
  const card = document.createElement('div');
  const cardBody = document.createElement('div');
  const ul = document.createElement('ul');
  ul.classList.add('list-group', 'border-0', 'rounded-0');
  card.classList.add('card', 'border-0');
  cardBody.classList.add('card-body');
  cardBody.innerHTML = `<h2 class="card-title h4">${i18next.t('headers.feeds')}</h2>`;
  card.append(cardBody);
  feeds.append(card);
  state.feeds.forEach((element) => {
    const li = document.createElement('li');
    li.classList.add('list-group-item', 'border-end-0', 'border-0');
    const h3 = document.createElement('h3');
    const p = document.createElement('p');
    h3.classList.add('h6', 'm-0');
    p.classList.add('m-0', 'small', 'text-black-50');
    h3.textContent = element.feedTitle;
    p.textContent = element.feedDescription;
    li.append(h3, p);
    ul.append(li);
    feeds.appendChild(ul);
  });
};

const renderPosts = (state, posts) => {
  posts.innerHTML = '';
  const card = document.createElement('div');
  const cardBody = document.createElement('div');
  const ul = document.createElement('ul');
  ul.classList.add('list-group', 'border-0', 'rounded-0');
  card.classList.add('card', 'border-0');
  cardBody.classList.add('card-body');
  cardBody.innerHTML = `<h2 class="card-title h4">${i18next.t('headers.posts')}</h2>`;
  card.append(cardBody);
  posts.append(card);
  state.posts.forEach((post) => {
    const li = document.createElement('li');
    li.classList.add('list-group-item', 'border-end-0', 'border-0');
    const a = document.createElement('a');
    a.classList.add('fw-bold');
    a.textContent = post.itemTitle;
    a.href = post.itemLink;
    li.append(a);
    ul.append(li);
  });
  posts.append(ul);
};

export { render, renderFeed, renderPosts };
