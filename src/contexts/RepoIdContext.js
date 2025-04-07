import { createContext, useContext, useState } from 'react';

const RepoContext = createContext();

export const useRepoId = () => {
    return useContext(RepoContext);
};

export const RepoProvider = ({ children }) => {
    const [repoId, setRepoId] = useState('');

    return (
      <RepoContext.Provider value={{ repoId, setRepoId }}>
        {children}
      </RepoContext.Provider>
    );
  };