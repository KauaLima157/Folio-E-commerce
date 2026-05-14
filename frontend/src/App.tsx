import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { ChatWidget } from "./components/ChatWidget";

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ChatWidget />
    </>
  );
}

export default App;