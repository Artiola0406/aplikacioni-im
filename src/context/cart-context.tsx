import { createContext, useContext, useMemo, useReducer } from 'react';

import type { CartItem, MenuItem } from '@/types';

type CartState = {
  items: CartItem[];
  restaurantId: string | null;
};

type CartAction =
  | { type: 'ADD_ITEM'; item: MenuItem; restaurantId: string }
  | { type: 'UPDATE_QTY'; itemId: string; delta: number }
  | { type: 'REMOVE_ITEM'; itemId: string }
  | { type: 'CLEAR'; }
  | { type: 'SET_RESTAURANT'; restaurantId: string | null };

const initialState: CartState = { items: [], restaurantId: null };

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find(item => item.id === action.item.id);
      if (existing) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.item.id ? { ...item, quantity: item.quantity + 1 } : item
          ),
          restaurantId: action.restaurantId,
        };
      }
      return {
        ...state,
        items: [
          ...state.items,
          { ...action.item, quantity: 1, restaurantId: action.restaurantId },
        ],
        restaurantId: action.restaurantId,
      };
    }
    case 'UPDATE_QTY': {
      const updated = state.items
        .map(item =>
          item.id === action.itemId
            ? { ...item, quantity: Math.max(0, item.quantity + action.delta) }
            : item
        )
        .filter(item => item.quantity > 0);
      return {
        ...state,
        items: updated,
        restaurantId: updated.length > 0 ? state.restaurantId : null,
      };
    }
    case 'REMOVE_ITEM': {
      const nextItems = state.items.filter(item => item.id !== action.itemId);
      return {
        ...state,
        items: nextItems,
        restaurantId: nextItems.length > 0 ? state.restaurantId : null,
      };
    }
    case 'CLEAR':
      return initialState;
    case 'SET_RESTAURANT':
      return { ...state, restaurantId: action.restaurantId };
    default:
      return state;
  }
}

type CartContextValue = {
  items: CartItem[];
  restaurantId: string | null;
  itemCount: number;
  subtotalCents: number;
  addItem: (item: MenuItem, restaurantId: string) => void;
  updateQuantity: (itemId: string, delta: number) => void;
  removeItem: (itemId: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const itemCount = useMemo(
    () => state.items.reduce((sum, item) => sum + item.quantity, 0),
    [state.items]
  );

  const subtotalCents = useMemo(
    () => state.items.reduce((sum, item) => sum + item.priceCents * item.quantity, 0),
    [state.items]
  );

  const addItem = (item: MenuItem, restaurantId: string) => {
    dispatch({ type: 'ADD_ITEM', item, restaurantId });
  };

  const updateQuantity = (itemId: string, delta: number) => {
    dispatch({ type: 'UPDATE_QTY', itemId, delta });
  };

  const removeItem = (itemId: string) => {
    dispatch({ type: 'REMOVE_ITEM', itemId });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR' });
  };

  const value = useMemo<CartContextValue>(
    () => ({
      items: state.items,
      restaurantId: state.restaurantId,
      itemCount,
      subtotalCents,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
    }),
    [itemCount, state.items, state.restaurantId, subtotalCents]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used inside CartProvider');
  }
  return context;
}
