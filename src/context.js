import { useState, useContext, createContext } from "react";
import useFetch from "./useFetch";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [query, setQuery] = useState('negroni');
  const [scroolPosition, setScroolPosition] = useState(0);
  const {isLoading, data, isError, count} = useFetch(`s=${query}`);
  const openSidebar = () => {
    setIsSidebarOpen(true);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };
  const searchCocktail = (input) => {
    setQuery(input);
  }

  const getScrollPosition = (value) => {
    setScroolPosition(value);
  }

  const deleteScrollPosition = (value) => {
    setScroolPosition(0);
  }

  return (
    <AppContext.Provider
      value={{
        isSidebarOpen,
        openSidebar,
        closeSidebar,
        query,
        isLoading,
        data,
        isError,
        count,
        searchCocktail,
        getScrollPosition,
        deleteScrollPosition,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider, useGlobalContext };
