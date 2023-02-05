import { GlobalProviderProps } from "types/providers/GlobalProviderProps";
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

interface GlobalContextType {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  activeNavbarItem: string;
  setActiveNavbarItem: React.Dispatch<React.SetStateAction<string>>;
};

const GlobalContext = createContext<GlobalContextType>({
  title: "",
  setTitle: () => {},
  activeNavbarItem: "",
  setActiveNavbarItem: () => {}
});

export const useGlobalContext = () => {
  return useContext(GlobalContext);
}

const GlobalProvider = (props: GlobalProviderProps) => {
  const {children} = props;
  const [title, setTitle] = useState("Dashboard");
  const [activeNavbarItem, setActiveNavbarItem] = useState("dashboard");
  const router = useRouter();

  const getPage = (pathname: string) => {
    switch (pathname) {
      case "dashboard":
        setActiveNavbarItem("dashboard");
        setTitle("Dashboard");
        break;
      case "user":
        setActiveNavbarItem("user");
        setTitle("User");
        break;
      case "admin":
        setActiveNavbarItem("admin");
        setTitle("Admin");
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    const pathname = router.pathname.replace("/", "");
    getPage(pathname);
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        title,
        setTitle,
        activeNavbarItem,
        setActiveNavbarItem
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

export default GlobalProvider;