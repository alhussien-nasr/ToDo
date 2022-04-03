import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { NavigationStack } from "./src/navigation/NavigationStack";
import { store, persistor } from "./src/redux";

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationStack />
      </PersistGate>
    </Provider>
  );
}
