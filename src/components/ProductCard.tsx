import products from "@/json/data.json";
import { Button } from "./ui/button";
import { CartItem, useCart } from "@/context/CartContext";
import { CirclePlus } from "lucide-react";

export default function ProductCard() {
  const { state, dispatch } = useCart();

  const addItem = (product: CartItem) => {
    const existingItem = state.items.find((item) => item.name === product.name);

    if (existingItem) {
      dispatch({
        type: "UPDATE_QUANTITY",
        payload: { id: existingItem.id, quantity: existingItem.quantity + 1 },
      });
    } else {
      dispatch({
        type: "ADD_ITEM",
        payload: {
          ...product,
          quantity: 1,
          id: Math.floor(Math.random() * 1000),
        },
      });
    }
  };

  const removeItem = (product: CartItem) => {
    const existingItem = state.items.find((item) => item.name === product.name);

    if (existingItem && existingItem.quantity > 1) {
      dispatch({
        type: "UPDATE_QUANTITY",
        payload: { id: existingItem.id, quantity: existingItem.quantity - 1 },
      });
    } else if (existingItem) {
      dispatch({
        type: "REMOVE_ITEM",
        payload: { id: existingItem.id },
      });
    }
  };

  const getItemQuantity = (product: CartItem) => {
    const item = state.items.find((cartItem) => cartItem.name === product.name);
    return item ? item.quantity : 0;
  };

  return (
    <div className="grid w-full">
      <h2 className="text-4xl font-medium text-primary my-4">Desserts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((item) => (
          <div
            key={item.name}
            className="flex flex-col items-center text-center"
          >
            <img
              src={item.image.mobile}
              srcSet={`
                      ${item.image.mobile} 480w,
                      ${item.image.tablet} 768w,
                      ${item.image.desktop} 1200w
                  `}
              sizes="(max-width: 768px) 100vw, 
                         (max-width: 1024px) 50vw, 
                         33vw"
              alt={item.name}
              className="w-full h-auto object-cover rounded-xl"
            />
            <h3 className="mt-2 text-lg font-semibold">{item.name}</h3>
            <p className="text-sm text-gray-600">{item.category}</p>
            <p className="text-base font-medium text-gray-800">
              R{item.price.toFixed(2)}
            </p>

            {/* Quantity Controls */}
            <div className="flex items-center mt-2">
              {getItemQuantity(item) > 0 ? (
                <>
                  <Button
                    onClick={() => removeItem(item)}
                    className="text-white hover:text-primary hover:bg-transparent hover:border hover:border-primary"
                  >
                    -
                  </Button>
                  <span className="mx-2 text-lg">{getItemQuantity(item)}</span>
                  <Button
                    onClick={() => addItem(item)}
                    className="text-white hover:text-primary hover:bg-transparent hover:border hover:border-primary"
                  >
                    +
                  </Button>
                </>
              ) : (
                <Button
                  onClick={() => addItem(item)}
                  className="text-white hover:text-primary hover:bg-transparent hover:border hover:border-primary"
                >
                  <CirclePlus/> Add to Cart
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
