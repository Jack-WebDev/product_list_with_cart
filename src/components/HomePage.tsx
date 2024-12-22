import ProductCard from "./ProductCard";
import CartItems from "./CartItems";

export default function HomePage() {
  return (
    
    <div className="flex flex-col md:flex-row items-start justify-between gap-8 p-4 md:p-8">
      <ProductCard />
      <CartItems />
    </div>
  );
}
