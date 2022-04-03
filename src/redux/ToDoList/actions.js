import { ADD_TO_DO, START_LOADING, STOP_LOADING, REMOVE_ITEM } from "./types";
export const addToDoItem = (data) => {
  try {
    return async (dispatch, getState) => {
      console.log("getState", getState());
      console.log("list", getState().toDo.list);

      dispatch({
        type: START_LOADING,
      });
      dispatch({
        type: ADD_TO_DO,
        payload: data,
      });
      dispatch({
        type: STOP_LOADING,
      });
    };
  } catch (error) {}
};

export const removeItem = (id) => {
  try {
    return async (dispatch, getState) => {
      console.log("action", getState().toDo.list.filter((item) => item.id !== id));
      dispatch({
        type: REMOVE_ITEM,
        payload: getState().toDo.list.filter((item) => item.id !== id),
      });
    };
  } catch (error) {}
};
