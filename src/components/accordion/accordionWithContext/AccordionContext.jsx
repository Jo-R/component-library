import React from "react";
import { createContext, useCallback, useMemo } from "react";

export const AccordionDescendantContext = createContext();

export const AccordionDescendantProvider = ({items, set, children}) => {
  
  const registerDescendant = useCallback((element) => {
    // TODO with the null check in just get 2x null and it stops
    // without it get an infinite loop of doom (cos descendants is always changing...)
    console.log(element);
    if (!element) {
        return;
    }
    // keep this simple, Reach does a lot more than this but this is just for demo so
    const updated = [...items, element];
    set(updated.map((item, index) => ({ ...item, index })));
  }, [items, set]);
  
  const unregisterDescendant = useCallback((element) => {
    const updated = (descendents) => descendents.filter((item) => element !== item.element);
    set(updated.map((item, index) => ({ ...item, index })))
  }, [set]);

  return(
    <AccordionDescendantContext.Provider value={useMemo(() => {
        return {
          descendants: items,
          registerDescendant,
          unregisterDescendant,
        };
      }, [items, registerDescendant, unregisterDescendant])}>
      {children}
    </AccordionDescendantContext.Provider>
  );
};

