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
  const { registerDescendant, descendants } = useContext(AccordionDescendantContext);
  const forceUpdate = useForceUpdate();
  let index =  descendants.findIndex((item) => item.element === element);
  
  useEffect(() => {
    console.log(element);
    if (!element) forceUpdate();
    registerDescendant(element);
  }, [element, registerDescendant, index, forceUpdate]);
  
  return index;
}

export const AccordionDescendantContext = createContext();
export const AccordionItemContext = createContext();

export const AccordionDescendantProvider = ({items, set, children}) => {
  const registerDescendant = useCallback((element) => {
    // TODO  infinite loop of doom 
    if (!element || items.find((item) => item === element)) {
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

