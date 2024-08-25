import { create } from "zustand";

export type Item = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

const INITIAL_STATE = {
  inventory: <Item[]>[
    {
      id: 1,
      name: "item 1",
      price: 1,
      quantity: 10,
    },
    {
      id: 2,
      name: "item 2",
      price: 1.5,
      quantity: 15,
    },
    {
      id: 3,
      name: "item 3",
      price: 2,
      quantity: 7,
    },
  ],
  cart: <Item[]>[],
  totalPrice: 0,
};

export interface InventoryStore {
  inventory: Item[];

  returnToInventory: (item: Item) => void;
  getFromInventory: (item: Item) => void;
}

export interface CartStore {
  cart: Item[];
  totalPrice: number;

  addToCart: (item: Item) => void;
  removeFromCart: (item: Item) => void;
}

// using inventory store here in place of a database or program to manage the inventory
export const useInventoryStore = create<InventoryStore>((set, get) => ({
  inventory: INITIAL_STATE.inventory,

  getFromInventory: (item: Item) => {
    const inventory = get().inventory;
    const inventoryProduct = inventory.find((x) => x.id === item.id)!;

    if (inventoryProduct.quantity > 0) {
      const updatedInventory = inventory.map((x) => {
        if (x.id === item.id) {
          return { ...x, quantity: x.quantity - 1 };
        }

        return item;
      });

      set(() => ({
        inventory: updatedInventory,
      }));
    }

    return;
  },
  returnToInventory: (item: Item) => {
    const inventory = get().inventory;

    const updatedInventory = inventory.map((x) => {
      if (x.id === item.id) {
        return { ...x, quantity: x.quantity + 1 };
      }

      return x;
    });

    set(() => ({
      inventory: updatedInventory,
    }));
  },
}));

export const useAppStore = create<CartStore>((set, get) => ({
  cart: INITIAL_STATE.cart,
  totalPrice: INITIAL_STATE.totalPrice,

  addToCart: (item: Item) => {
    const inventoryStore = useInventoryStore.getState();
    const inventory = inventoryStore.inventory;
    const inventoryItem = inventory.find((x) => x.id === item.id)!;

    if (inventoryItem.quantity <= 0) {
      return;
    }

    const cart = get().cart;
    const cartItem = cart.find((x) => x.id === item.id);

    let updatedCart: Item[] = [];

    if (cartItem) {
      updatedCart = cart.map((x) => {
        if (x.id === item.id) {
          return { ...x, quantity: x.quantity + 1 };
        }

        return x;
      });
    } else {
      updatedCart.push({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: 1,
      });
    }

    const totalPrice = updatedCart
      .map((x) => x.price * x.quantity)
      .reduce((result, current) => result + current, 0);

    inventoryStore.getFromInventory(item);

    set(() => ({ cart: updatedCart, totalPrice: totalPrice }));
  },
  removeFromCart: (item: Item) => {
    const cart = get().cart;
    const cartItem = cart.find((x) => x.id === item.id);

    if (!cartItem) {
      return;
    }

    const inventoryStore = useInventoryStore.getState();

    let updatedCart: Item[] = [];

    if (cartItem.quantity > 1) {
      updatedCart = cart.map((x) => {
        if (x.id === item.id) {
          return { ...x, quantity: x.quantity - 1 };
        }

        return x;
      });
    } else {
      updatedCart = cart.filter((x) => x.id !== item.id);
    }

    const totalPrice = updatedCart
      .map((x) => x.price * x.quantity)
      .reduce((result, current) => result + current, 0);

    inventoryStore.returnToInventory(item);

    set(() => ({ cart: updatedCart, totalPrice: totalPrice }));
  },

  clearCart: () => {
    set(() => ({
      cart: INITIAL_STATE.cart,
      totalPrice: INITIAL_STATE.totalPrice,
    }));
  },
}));
