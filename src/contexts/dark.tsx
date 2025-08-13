import { createContext } from "react";

const DarkModeContext = createContext<[boolean, React.Dispatch<React.SetStateAction<boolean>>]>([false, () => {}]);

export default DarkModeContext;
