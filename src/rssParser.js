/* eslint-disable computed-property-spacing */
const rssParser = (data) => {
  const parsedData = new DOMParser().parseFromString(data.data.contents, 'text/html');
  const title = parsedData.querySelector('title');
  const description = parsedData.querySelector('description');
  const items = parsedData.querySelectorAll('item');

  const feed = {
    feedTitle: title.textContent,
    feedDescription: description.textContent,
  };
  const posts = [];

  items.forEach((item) => {
    const itemTitle = item.querySelector('title').textContent;
    const itemDescription = item.querySelector('description').textContent;
    const regexURL = /https?:\/\/[^" ]+/i;
    const itemLink = item.textContent.match(regexURL)[ 0 ];
    const post = {
      itemTitle,
      itemDescription,
      itemLink,
    };
    posts.push(post);
  });

  return { feed, posts };
};

export default rssParser;
