import { ADD, REMOVE, EDIT, CHECK } from "./types";

export const addToList = (id, data, check, date) => {
  console.log(id, data);
  return {
    type: ADD,
    payload: {
      id,
      data,
      check,
      date
    },
  };
};

export const removeFromList = (id) => {
  return {
    type: REMOVE,
    payload: id,
  };
};

export const editListItem = (id, data) => {
  return {
    type: EDIT,
    payload: { id, data },
  };
};

export const checkItem = (id) => {
    return{
        type: CHECK,
        payload: id
    }
}
