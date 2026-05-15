import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { ChatWidget } from "./components/ChatWidget";
import { AuthProvider } from "./context/authProvider";

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
      <ChatWidget />
    </AuthProvider>
    
  );
}

export default App;