import React from "react";
import { createContext, useCallback, useMemo } from "react";

export const AccordionDescendantContext = () => {
  const descendents = [];
  const registerDescendent = () => {};
  const unregisterDescendent = () => {};
  const name = "AccordionDescendantContext";
  return createContext(descendents, registerDescendent, unregisterDescendent);
};

// todo create these - COPY PASTE LINE 46 OF REACH ACCORDION
// const AccordionContext = createNamedContext<InternalAccordionContextValue>(
//   "AccordionContext",
//   {} as InternalAccordionContextValue
// );
// const AccordionItemContext = createNamedContext<
//   InternalAccordionItemContextValue
// >("AccordionItemContext", {} as InternalAccordionItemContextValue);

// SOME COPY PASTE FROM REACH DESCENDENTS.TS
export function DescendantProvider({ context: Ctx, children, items, set }) {
  let registerDescendant = useCallback(
    ({
      element,
      index: explicitIndex,
      ...rest
    }: Omit<DescendantType, "index"> & { index?: number | undefined }) => {
      if (!element) {
        return;
      }

      set((items) => {
        let newItems;
        if (explicitIndex != null) {
          newItems = [
            ...items,
            {
              ...rest,
              element,
              index: explicitIndex,
            },
          ];
        } else if (items.length === 0) {
          // If there are no items, register at index 0 and bail.
          newItems = [
            ...items,
            {
              ...rest,
              element,
              index: 0,
            },
          ];
        } else if (items.find((item) => item.element === element)) {
          // If the element is already registered, just use the same array
          newItems = items;
        } else {
          // When registering a descendant, we need to make sure we insert in
          // into the array in the same order that it appears in the DOM. So as
          // new descendants are added or maybe some are removed, we always know
          // that the array is up-to-date and correct.
          //
          // So here we look at our registered descendants and see if the new
          // element we are adding appears earlier than an existing descendant's
          // DOM node via `node.compareDocumentPosition`. If it does, we insert
          // the new element at this index. Because `registerDescendant` will be
          // called in an effect every time the descendants state value changes,
          // we should be sure that this index is accurate when descendent
          // elements come or go from our component.
          let index = items.findIndex((item) => {
            if (!item.element || !element) {
              return false;
            }
            // Does this element's DOM node appear before another item in the
            // array in our DOM tree? If so, return true to grab the index at
            // this point in the array so we know where to insert the new
            // element.
            return Boolean(
              item.element.compareDocumentPosition(element) &
                Node.DOCUMENT_POSITION_PRECEDING
            );
          });

          let newItem = {
            ...rest,
            element,
            index,
          };

          // If an index is not found we will push the element to the end.
          if (index === -1) {
            newItems = [...items, newItem];
          } else {
            newItems = [
              ...items.slice(0, index),
              newItem,
              ...items.slice(index),
            ];
          }
        }
        return newItems.map((item, index) => ({ ...item, index }));
      });
    },
    // set is a state setter initialized by the useDescendants hook.
    // We can safely ignore the lint warning here because it will not change
    // between renders.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  let unregisterDescendant = useCallback(
    (element) => {
      if (!element) {
        return;
      }

      set((items) => items.filter((item) => element !== item.element));
    },
    // set is a state setter initialized by the useDescendants hook.
    // We can safely ignore the lint warning here because it will not change
    // between renders.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <Ctx.Provider
      value={useMemo(() => {
        return {
          descendants: items,
          registerDescendant,
          unregisterDescendant,
        };
      }, [items, registerDescendant, unregisterDescendant])}
    >
      {children}
    </Ctx.Provider>
  );
}
