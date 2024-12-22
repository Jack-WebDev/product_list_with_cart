import { useCart } from "@/context/CartContext";
import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

export default function CartItems() {
  const { state, dispatch } = useCart();

  const totalAmount = state.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, x: 50 },
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-lg w-full md:w-1/3 mt-12 border border-gray-100">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 flex items-center justify-between">
        Your Cart
        <span className="text-sm font-medium bg-gray-100 px-3 py-1 rounded-full">
          {state.items.length} items
        </span>
      </h2>

      {state.items.length === 0 ? (
        <div className="text-gray-500 text-center py-12 bg-gray-50 rounded-xl">
          <div className="mb-3">🛒</div>
          <p className="font-medium">Your cart is empty</p>
          <p className="text-sm mt-1">Start adding some items!</p>
        </div>
      ) : (
        <>
          <ul className="space-y-4 mb-6">
            {state.items.map((item) => (
              <motion.li
                key={item.id}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={itemVariants}
                layout
                className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200"
              >
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <img
                      src={item.image.thumbnail}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-xl"
                    />
                    <span className="absolute -top-2 -right-2 bg-primary text-white text-xs font-bold px-2 py-1 rounded-full">
                      {item.quantity}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{item.name}</h3>
                    <p className="text-gray-500 text-sm">
                      R{item.price.toFixed(2)} per item
                    </p>
                  </div>
                </div>
                <button
                  onClick={() =>
                    dispatch({ type: "REMOVE_ITEM", payload: { id: item.id } })
                  }
                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200"
                >
                  <Trash2 size={18} />
                </button>
              </motion.li>
            ))}
          </ul>
          <div className="mt-6 border-t border-gray-100 pt-6">
            <div className="flex justify-between items-center mb-6">
              <span className="text-gray-600">Total Amount:</span>
              <span className="text-2xl font-bold text-primary">
                R{totalAmount.toFixed(2)}
              </span>
            </div>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full bg-primary text-white hover:text-primary rounded-xl py-6 font-medium transition-all duration-200 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30">
                Confirm Order
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] p-8 bg-white rounded-2xl">
              <DialogHeader className="mb-6">
                <DialogTitle className="text-2xl font-bold text-gray-900">
                  Order Confirmed ✨
                </DialogTitle>
                <DialogDescription className="text-gray-600 mt-2">
                  Thank you for your purchase! Your order details are below.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                {state.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center border-b border-gray-100 pb-4"
                  >
                    <div>
                      <p className="font-medium text-gray-900">{item.name}</p>
                      <p className="text-sm text-gray-500">
                        R{item.price.toFixed(2)} × {item.quantity}
                      </p>
                    </div>
                    <p className="font-semibold text-gray-900">
                      R{(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="flex justify-between items-center">
                  <span className="text-lg text-gray-600">Total:</span>
                  <span className="text-2xl font-bold text-primary">
                    R{totalAmount.toFixed(2)}
                  </span>
                </div>
              </div>
              <DialogFooter className="mt-8">
                <Button
                  type="submit"
                  className="w-full bg-primary text-white hover:text-primary rounded-xl py-6 font-medium transition-all duration-200"
                  onClick={() => {
                    dispatch({ type: "CLEAR_CART" });
                  }}
                >
                  Start New Order
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </>
      )}
    </div>
  );
}
