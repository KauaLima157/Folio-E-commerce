import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { ChatWidget } from "./components/ChatWidget";
import { AuthProvider } from "./context/authProvider";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <AuthProvider>
      <Toaster
        position="top-right"
        containerStyle={{
          zIndex: 999999,
        }}
      />
      <RouterProvider router={router} />
      <ChatWidget />
    </AuthProvider>
  );
}

export default App;