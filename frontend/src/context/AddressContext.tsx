import { createContext } from "react";

type AddressContextType = {
  address: string;
  setAddress: (value: string) => void;
};

export const AddressContext = createContext<AddressContextType>({
  address: "",
  setAddress: () => {},
});
