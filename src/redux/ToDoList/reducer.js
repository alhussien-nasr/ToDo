import { ADD_TO_DO, REMOVE_ITAM, START_LOADING, STOP_LOADING } from "./types";

const initialState = {
  list: [],
  loading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, loading: true };

    case ADD_TO_DO:
      return { ...state, list: [...state.list, action.payload] };
    case STOP_LOADING:
      return { ...state, loading: false };
    case REMOVE_ITAM:
      return {
        ...state,
        list: action.payload,
      };

    default:
      return state;
  }
};
