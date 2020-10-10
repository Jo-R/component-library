import React from "react";
import { useEffect, useState } from "react";
import { createContext, useCallback, useMemo, useContext } from "react";

/**
 * Forces a re-render, similar to `forceUpdate` in class components.
 */
export function useForceUpdate() {
  let [, dispatch] = useState(Object.create(null));
  return useCallback(() => {
    dispatch(Object.create(null));
  }, []);
}

export const useDescendent = (element) => {
  const { registerDescendant, descendants, unregisterDescendant } = useContext(AccordionDescendantContext);
  const forceUpdate = useForceUpdate();
  let index =  descendants.findIndex((item) => item.element === element);
  
  useEffect(() => {
    if (!element) forceUpdate();
    registerDescendant(element);

    return () => unregisterDescendant(element);
  }, [element, registerDescendant, index, forceUpdate, unregisterDescendant]);
  
  return index;
}

export const AccordionDescendantContext = createContext();
export const AccordionItemContext = createContext();

export const AccordionDescendantProvider = ({items, set, children}) => {

  const registerDescendant = useCallback((element) => {
    if (!element) {
        return;
    }
    // TODO improve more per the Reach on to get the order right always
    // using this way of using items avoids it being a dep and the infinite loop
    set((items) => {
      let updated;
      if (items.find((item) => item === element)) {
        updated = items;
      } else {
        updated = [...items, element];
      }
      return updated.map((item, index) => ({ ...item, index }));
    });
  }, [set]);
  
  const unregisterDescendant = useCallback((element) => {
    set((items) => {
       const updated = items.filter((item) => element !== item.element);
       return updated.map((item, index) => ({ ...item, index }));
    });
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

