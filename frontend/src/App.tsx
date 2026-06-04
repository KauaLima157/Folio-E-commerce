import { RouterProvider } from "react-router-dom";
import { router } from "./routes";

import { AuthProvider } from "./context/authProvider";
import { CartProvider } from "./context/CartContext";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Toaster
          position="top-right"
          containerStyle={{
            zIndex: 999999,
          }}
        />
        <RouterProvider router={router} />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;