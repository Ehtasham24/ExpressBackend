import { useDispatch, useSelector } from "react-redux";
import {
  removeCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} from "../cartRedux/cartSlice";
import ReactToPrint from "react-to-print";
import PrintableCart from "components/Printable/printableCart";
import { useRef } from "react";

function CartCheckout({ isCartOpen, closeCheckout }) {
  const cart = useSelector((state) => state.cart.carts);
  const dispatch = useDispatch();
  const printRef = useRef();

  // Function to calculate the subtotal
  const calculateSubtotal = () => {
    return cart.reduce(
      (total, item) => total + item.sellingPrice * item.sellingQuantity,
      0
    );
  };

  // Function to handle checkout button click
  const handleCheckout = async () => {
    const subtotal = calculateSubtotal();

    // Prepare the sales data to be sent to the API
    const salesData = cart.map((item) => ({
      sellingPrice: item.sellingPrice,
      quantity: item.sellingQuantity,
      productID: item.id,
    }));

    try {
      const responses = await Promise.all(
        salesData.map(async (sale) => {
          const response = await fetch("http://localhost:4000/sales", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(sale),
          });

          if (!response.ok) {
            throw new Error("Failed to sell product");
          }
          return response.json();
        })
      );

      // console.log("RESPONSEEEEEEEEEEEE SALES DATA");
      // console.log(responses);

      console.log("cart", cart);

      dispatch(clearCart());
      closeCheckout();

      printRef.current && printRef.current();

      alert(
        `Total amount for checkout: PKR ${subtotal}\nProducts sold successfully!`
      );
    } catch (error) {
      alert(error.message);
    }
  };

  const handleRemove = (id) => {
    dispatch(removeCart(id));
  };

  const handleDecrease = (id) => {
    dispatch(decreaseQuantity({ id }));
  };

  const handleIncrease = (item) => {
    dispatch(increaseQuantity(item));
  };

  return (
    <>
      {isCartOpen && (
        <div
          className="relative z-10"
          aria-labelledby="slide-over-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="fixed inset-0 bg-white-A700 bg-opacity-75 transition-opacity"></div>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <div className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 bg-white-A700">
                      <div className="flex items-start justify-between">
                        <h2
                          className="text-lg font-medium text-gray-900"
                          id="slide-over-title"
                        >
                          Shopping cart
                        </h2>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="relative -m-2 p-2 bg-white-A700 hover:text-gray-500"
                            onClick={closeCheckout}
                          >
                            <span className="absolute -inset-0.5"></span>
                            <span className="sr-only">Close panel</span>
                            <svg
                              className="h-6 w-6"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>

                      <div className="mt-8">
                        <div className="flow-root">
                          <ul
                            role="list"
                            className="-my-6 divide-y divide-gray-200"
                          >
                            {cart.map((item) => (
                              <li key={item.id} className="flex py-6">
                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                  <img src="/images/cart_2.png" alt="cart" />
                                </div>

                                <div className="ml-4 flex flex-1 flex-col">
                                  <div>
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                      <h3>
                                        <a href="#">{item.productname}</a>
                                      </h3>
                                      <p className="ml-4">
                                        PKR {item.sellingPrice}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex flex-1 items-end justify-between text-sm">
                                    <h2>Quantity: </h2>
                                    <button
                                      onClick={() => handleDecrease(item.id)}
                                    >
                                      -
                                    </button>
                                    <p className="text-black">
                                      {item.sellingQuantity}
                                    </p>
                                    <button
                                      onClick={() => handleIncrease(item)}
                                    >
                                      +
                                    </button>
                                  </div>
                                  <div className="flex mt-3">
                                    <button
                                      type="button"
                                      className="font-medium text-indigo-600 hover:text-indigo-500 text-sm"
                                      onClick={() => handleRemove(item.id)}
                                    >
                                      Remove
                                    </button>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 bg-white-A700 px-4 py-6 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p>PKR {calculateSubtotal()}</p>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">
                        Shipping and taxes calculated at checkout.
                      </p>
                      <div className="mt-6 flex justify-center">
                        <button
                          onClick={handleCheckout}
                          className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white-A700 shadow-sm hover:bg-indigo-700"
                        >
                          Checkout
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CartCheckout;
