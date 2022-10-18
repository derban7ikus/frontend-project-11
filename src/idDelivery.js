import _ from 'lodash';

const idDelivery = (state, data) => {
  let currentId = state.list.length + 1;
  const result = [];
  data.forEach((element) => {
    const clone = _.clone(element);
    clone.id = currentId;
    result.push(clone);
    currentId += 1;
  });
  return result;
};

export default idDelivery;
