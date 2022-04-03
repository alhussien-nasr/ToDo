import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers, createStore, compose, applyMiddleware } from "redux";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import thunk from "redux-thunk";
import toDoReducer from "./ToDoList/reducer";

export const reducers = combineReducers({
  toDo: toDoReducer,
});

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["toDo"],
};
const persistedReducer = persistReducer(persistConfig, reducers);
const isDev = process.env.NODE_ENV === "development";
const composeEnhancers =
  (isDev &&
    typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;
const middlewares = [thunk];
export const store = createStore(
  persistedReducer,
  {},
  composeEnhancers(applyMiddleware(...middlewares))
);
export const persistor = persistStore(store);
