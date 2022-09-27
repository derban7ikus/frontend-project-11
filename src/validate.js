import i18next from 'i18next';
import { setLocale, string } from 'yup';

const validate = (url, state) => {
  setLocale({
    mixed: {
      notOneOf: i18next.t('errors.duplicate'),
    },
    string: {
      url: i18next.t('errors.notValid'),
    },
  });

  const schema = string().notOneOf([ state.rssFeeds ]).url();
  return schema.validate(url);
};

export default validate;
