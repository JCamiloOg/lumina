import { RouterProvider } from "@tanstack/react-router";
import { router } from "./app/router/Router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

function App() {

  return (
    <>
      <RouterProvider router={router} />
      <TanStackRouterDevtools router={router} />
    </>
  );
}

export default App;
