import { useContext } from "react";

import Auth from "./pages/auth/Index";
import Home from "./pages/home/Index";
import { StateContext } from "./store/StateContext";

function App() {
  const { isLoggedIn } = useContext(StateContext);

  return <>{isLoggedIn ? <Home /> : <Auth />}</>;
}

export default App;
