import { create } from "zustand";

export type Product = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

const INITIAL_STATE = {
  inventory: <Product[]>[
    {
      id: 1,
      name: "product 1",
      price: 0.0005,
      quantity: 10,
    },
    {
      id: 2,
      name: "product 2",
      price: 0.0002,
      quantity: 15,
    },
    {
      id: 3,
      name: "product 3",
      price: 0.0003,
      quantity: 7,
    },
  ],
  cart: <Product[]>[],
  totalPrice: 0,
};

interface InventoryStore {
  inventory: Product[];

  returnToInventory: (product: Product) => void;
  removeFromInventory: (product: Product) => void;
}

interface CartStore {
  cart: Product[];
  totalPrice: number;

  addToCart: (product: Product) => void;
  removeFromCart: (product: Product) => void;
}

interface TransactionState {
  transactionInProgress: boolean;

  setTransactionInProgress: (inProgress: boolean) => void;
}

interface QrCodeState {
  isQrCodeVisible: boolean;
  url: string | undefined;

  setIsQrCodeVisible: (visible: boolean) => void;
  setUrl: (url: string) => void;
}

interface PaymentState {
  reference: string | undefined;

  setReference: (reference: string | undefined) => void;
}

// using inventory store here in place of a database or program to manage the inventory
export const useInventoryStore = create<InventoryStore>((set, get) => ({
  inventory: INITIAL_STATE.inventory,

  removeFromInventory: (product: Product) => {
    const inventory = get().inventory;
    const inventoryProduct = inventory.find((x) => x.id === product.id)!;

    if (inventoryProduct.quantity > 0) {
      const updatedInventory = inventory.map((x) => {
        if (x.id === product.id) {
          return { ...x, quantity: x.quantity - 1 };
        }

        return x;
      });

      set(() => ({
        inventory: updatedInventory,
      }));
    }

    return;
  },
  returnToInventory: (product: Product) => {
    const inventory = get().inventory;

    const updatedInventory = inventory.map((x) => {
      if (x.id === product.id) {
        return { ...x, quantity: x.quantity + 1 };
      }

      return x;
    });

    set(() => ({
      inventory: updatedInventory,
    }));
  },
}));

export const useCartStore = create<CartStore>((set, get) => ({
  cart: INITIAL_STATE.cart,
  totalPrice: INITIAL_STATE.totalPrice,

  addToCart: (product: Product) => {
    const inventoryStore = useInventoryStore.getState();
    const inventory = inventoryStore.inventory;
    const inventoryItem = inventory.find((x) => x.id === product.id)!;

    if (inventoryItem.quantity <= 0) {
      return;
    }

    const cart = get().cart;
    const cartItem = cart.find((x) => x.id === product.id);

    let updatedCart: Product[] = [];

    if (cartItem) {
      updatedCart = cart.map((x) => {
        if (x.id === product.id) {
          return { ...x, quantity: x.quantity + 1 };
        }

        return x;
      });
    } else {
      updatedCart = [...cart];

      updatedCart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
      });
    }

    const totalPrice = updatedCart
      .map((x) => x.price * x.quantity)
      .reduce((result, current) => result + current, 0);

    inventoryStore.removeFromInventory(product);

    set(() => ({
      cart: updatedCart,
      totalPrice: Number(totalPrice.toFixed(9)),
    }));
  },
  removeFromCart: (product: Product) => {
    const cart = get().cart;
    const cartItem = cart.find((x) => x.id === product.id);

    if (!cartItem) {
      return;
    }

    const inventoryStore = useInventoryStore.getState();

    let updatedCart: Product[] = [];

    if (cartItem.quantity > 1) {
      updatedCart = cart.map((x) => {
        if (x.id === product.id) {
          return { ...x, quantity: x.quantity - 1 };
        }

        return x;
      });
    } else {
      updatedCart = cart.filter((x) => x.id !== product.id);
    }

    const totalPrice = updatedCart
      .map((x) => x.price * x.quantity)
      .reduce((result, current) => result + current, 0);

    inventoryStore.returnToInventory(product);

    set(() => ({
      cart: updatedCart,
      totalPrice: Number(totalPrice.toFixed(9)),
    }));
  },

  clearCart: () => {
    set(() => ({
      cart: INITIAL_STATE.cart,
      totalPrice: INITIAL_STATE.totalPrice,
    }));
  },
}));

export const useTransactionStateStore = create<TransactionState>((set) => ({
  transactionInProgress: false,

  setTransactionInProgress: (inProgress) =>
    set(() => ({ transactionInProgress: inProgress })),
}));

export const useQrCodeStateStore = create<QrCodeState>((set) => ({
  isQrCodeVisible: false,
  url: undefined,

  setIsQrCodeVisible: (visible) =>
    set((state) => ({ ...state, isQrCodeVisible: visible })),
  setUrl: (url) => set((state) => ({ ...state, url: url })),
}));

export const usePaymentStateStore = create<PaymentState>((set) => ({
  reference: undefined,

  setReference: (reference) =>
    set((state) => ({ ...state, reference: reference })),
}));
