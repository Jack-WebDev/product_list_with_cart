import { Button } from "./ui/button";
import { CartItem, useCart } from "@/context/CartContext";
import { CirclePlus } from "lucide-react";
import waffleThumbnail from "@/assets/image-waffle-thumbnail.jpg";
import waffleMobile from "@/assets/image-waffle-mobile.jpg";
import waffleTablet from "@/assets/image-waffle-tablet.jpg";
import waffleDesktop from "@/assets/image-waffle-desktop.jpg";
import cremeBruleeThumbnail from "@/assets/image-creme-brulee-thumbnail.jpg";
import cremeBruleeMobile from "@/assets/image-creme-brulee-mobile.jpg";
import cremeBruleeTablet from "@/assets/image-creme-brulee-tablet.jpg";
import cremeBruleeDesktop from "@/assets/image-creme-brulee-desktop.jpg";
import macaronThumbnail from "@/assets/image-macaron-thumbnail.jpg";
import macaronMobile from "@/assets/image-macaron-mobile.jpg";
import macaronTablet from "@/assets/image-macaron-tablet.jpg";
import macaronDesktop from "@/assets/image-macaron-desktop.jpg";
import tiramisuThumbnail from "@/assets/image-tiramisu-thumbnail.jpg";
import tiramisuMobile from "@/assets/image-tiramisu-mobile.jpg";
import tiramisuTablet from "@/assets/image-tiramisu-tablet.jpg";
import tiramisuDesktop from "@/assets/image-tiramisu-desktop.jpg";
import baklavaThumbnail from "@/assets/image-baklava-thumbnail.jpg";
import baklavaMobile from "@/assets/image-baklava-mobile.jpg";
import baklavaTablet from "@/assets/image-baklava-tablet.jpg";
import baklavaDesktop from "@/assets/image-baklava-desktop.jpg";
import meringueThumbnail from "@/assets/image-meringue-thumbnail.jpg";
import meringueMobile from "@/assets/image-meringue-mobile.jpg";
import meringueTablet from "@/assets/image-meringue-tablet.jpg";
import meringueDesktop from "@/assets/image-meringue-desktop.jpg";
import cakeThumbnail from "@/assets/image-cake-thumbnail.jpg";
import cakeMobile from "@/assets/image-cake-mobile.jpg";
import cakeTablet from "@/assets/image-cake-tablet.jpg";
import cakeDesktop from "@/assets/image-cake-desktop.jpg";
import brownieThumbnail from "@/assets/image-brownie-thumbnail.jpg";
import brownieMobile from "@/assets/image-brownie-mobile.jpg";
import brownieTablet from "@/assets/image-brownie-tablet.jpg";
import brownieDesktop from "@/assets/image-brownie-desktop.jpg";
import pannaCottaThumbnail from "@/assets/image-panna-cotta-thumbnail.jpg";
import pannaCottaMobile from "@/assets/image-panna-cotta-mobile.jpg";
import pannaCottaTablet from "@/assets/image-panna-cotta-tablet.jpg";
import pannaCottaDesktop from "@/assets/image-panna-cotta-desktop.jpg";

const products = [
  {
    "image": {
      "thumbnail": waffleThumbnail,
      "mobile": waffleMobile,
      "tablet": waffleTablet,
      "desktop": waffleDesktop
    },
    "name": "Waffle with Berries",
    "category": "Waffle",
    "price": 6.5
  },
  {
    "image": {
      "thumbnail": cremeBruleeThumbnail,
      "mobile": cremeBruleeMobile,
      "tablet": cremeBruleeTablet,
      "desktop": cremeBruleeDesktop
    },
    "name": "Vanilla Bean Crème Brûlée",
    "category": "Crème Brûlée",
    "price": 7.0
  },
  {
    "image": {
      "thumbnail": macaronThumbnail,
      "mobile": macaronMobile,
      "tablet": macaronTablet,
      "desktop": macaronDesktop
    },
    "name": "Macaron Mix of Five",
    "category": "Macaron",
    "price": 8.0
  },
  {
    "image": {
      "thumbnail": tiramisuThumbnail,
      "mobile": tiramisuMobile,
      "tablet": tiramisuTablet,
      "desktop": tiramisuDesktop
    },
    "name": "Classic Tiramisu",
    "category": "Tiramisu",
    "price": 5.5
  },
  {
    "image": {
      "thumbnail": baklavaThumbnail,
      "mobile": baklavaMobile,
      "tablet": baklavaTablet,
      "desktop": baklavaDesktop
    },
    "name": "Pistachio Baklava",
    "category": "Baklava",
    "price": 4.0
  },
  {
    "image": {
      "thumbnail": meringueThumbnail,
      "mobile": meringueMobile,
      "tablet": meringueTablet,
      "desktop": meringueDesktop
    },
    "name": "Lemon Meringue Pie",
    "category": "Pie",
    "price": 5.0
  },
  {
    "image": {
      "thumbnail": cakeThumbnail,
      "mobile": cakeMobile,
      "tablet": cakeTablet,
      "desktop": cakeDesktop
    },
    "name": "Red Velvet Cake",
    "category": "Cake",
    "price": 4.5
  },
  {
    "image": {
      "thumbnail": brownieThumbnail,
      "mobile": brownieMobile,
      "tablet": brownieTablet,
      "desktop": brownieDesktop
    },
    "name": "Salted Caramel Brownie",
    "category": "Brownie",
    "price": 4.5
  },
  {
    "image": {
      "thumbnail": pannaCottaThumbnail,
      "mobile": pannaCottaMobile,
      "tablet": pannaCottaTablet,
      "desktop": pannaCottaDesktop
    },
    "name": "Vanilla Panna Cotta",
    "category": "Panna Cotta",
    "price": 6.5
  }
]

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
