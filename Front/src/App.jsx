import React, { Suspense } from "react";

import { useStateContext } from "./hooks/useStateContext";
import Auth from "./pages/auth/Index";
const Home = React.lazy(() => import("./pages/home/Index"));
import Loader from "./utils/Loader";

function App() {
  const { isLoggedIn } = useStateContext();

  return (
    <main className="screen-center">
      {isLoggedIn ? (
        <Suspense fallback={<Loader />}>
          <Home />
        </Suspense>
      ) : (
        <Auth />
      )}
    </main>
  );
}

export default App;
