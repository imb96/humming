import { Provider, createStore } from "jotai";

const Providers = ({ children }: { children: React.ReactNode }) => {
  const songsStore = createStore();
  return <Provider store={songsStore}>{children}</Provider>;
};

export default Providers;
