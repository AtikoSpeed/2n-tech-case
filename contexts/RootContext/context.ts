import { createContext } from "react";
import { RootContextType } from "./types";

const RootContext = createContext<RootContextType | null>(null);
export default RootContext;
