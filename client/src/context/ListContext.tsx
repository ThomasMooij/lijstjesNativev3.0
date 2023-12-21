import React, { createContext, useContext, FC } from 'react';

interface ListContextProps {
  refetchLists: () => void;
}

const ListContext = createContext<ListContextProps | null>(null);

export const useListContext = () => {
  const context = useContext(ListContext);
  if (!context) {
    throw new Error('useListContext must be used within a ListProvider');
  }
  return context;
};

interface ListProviderProps {
  refetchLists: () => void;
  children: React.ReactNode;
}

export const ListProvider: FC<ListProviderProps> = ({ refetchLists, children }) => {
  return <ListContext.Provider value={{ refetchLists }}>{children}</ListContext.Provider>;
};

export default ListContext;
