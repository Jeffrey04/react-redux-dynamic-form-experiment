export default function(state = {}, action) {
  let result;

  switch (action.type) {
    case "PUBLICATION_UPDATE":
      result = reduce_publication_update(state, action);
      break;
    default:
      result = state;
  }

  return result;
}

function reduce_publication_update(state, action) {
  return Object.assign({}, state, {
    publications: action.revision.map(item => Object.assign({}, item))
  });
}
