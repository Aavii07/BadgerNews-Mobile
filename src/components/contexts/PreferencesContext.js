import React, { createContext, useState } from 'react';

export const PreferencesContext = createContext();

export const PreferencesProvider = ({ children }) => {
  const [preferences, setPreferences] = useState({}); // implement as key-value pairs of tag and boolean

  const togglePreference = (tag) => {
    setPreferences((prevPrefs) => ({
      ...prevPrefs,
      [tag]: !prevPrefs[tag]
    }));
  };

  // accept all tags by defualt
  const initializePreferences = (tags) => {
    const initPref = {};
    tags.forEach(tag => {
      initPref[tag] = true; 
    });
    setPreferences(initPref);
  }

  return (
    // better to pass togglePreference and intializePreferences than preferences and setPreferences
    <PreferencesContext.Provider value={{ preferences, togglePreference, initializePreferences }}>
      {children}
    </PreferencesContext.Provider>
  );
};
