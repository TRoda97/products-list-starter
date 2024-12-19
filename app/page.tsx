import Cards from "./components/Cards";
import Cart from "./components/Cart";
import ModalConfirmOrder from "./components/Modal";
import "./page.css";

export default function Home() {
  return (
    <div className="container">
      <ModalConfirmOrder />
      <Cards />
      <Cart />
    </div>
  );
}
