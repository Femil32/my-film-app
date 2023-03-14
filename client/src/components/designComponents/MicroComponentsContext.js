import { createContext } from "react";

const MicroComponentsContext = createContext({})

export default MicroComponentsContext;

export const { Provider, Consumer } = MicroComponentsContext;
