import HomePage from "./components/HomePage";
import { CartProvider } from "./context/CartContext";

export default function App() {
  return (
    <CartProvider>
      <HomePage />
    </CartProvider>
  );
}
