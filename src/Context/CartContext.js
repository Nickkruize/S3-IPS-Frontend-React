import { createContext } from "react";
import { getLocalStorageCart } from "../modules/cart";

const ctx = createContext(getLocalStorageCart());

export default ctx;