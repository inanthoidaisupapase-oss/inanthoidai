'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';

export type CartItem = {
  slug: string;
  name: string;
  image: string;
  /** Số lượng hộp khách chọn (template giá theo bậc 100/200/300/400/500) */
  packSize: number;
  /** Giá tương ứng bậc số lượng đã chọn, đơn vị VND */
  price: number;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  count: number;
  total: number;
  add: (item: CartItem) => void;
  remove: (slug: string, packSize: number) => void;
  setQuantity: (slug: string, packSize: number, quantity: number) => void;
  clear: () => void;
  ready: boolean;
};

const STORAGE_KEY = 'iatd-cart-v1';
const CartContext = createContext<CartState | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [ready, setReady] = useState(false);

  // Đọc giỏ hàng đã lưu. localStorage có thể ném lỗi (cửa sổ ẩn danh, chặn site
  // data) nên luôn bọc try/catch và vẫn render bình thường khi không đọc được.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw) as CartItem[]);
    } catch {
      /* bỏ qua: giỏ hàng chỉ là tiện ích phía trình duyệt */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* bỏ qua */
    }
  }, [items, ready]);

  const value = useMemo<CartState>(() => {
    const sameLine = (i: CartItem, slug: string, packSize: number) =>
      i.slug === slug && i.packSize === packSize;

    return {
      items,
      ready,
      count: items.reduce((sum, i) => sum + i.quantity, 0),
      total: items.reduce((sum, i) => sum + i.price * i.quantity, 0),
      add: (item) =>
        setItems((prev) => {
          const found = prev.find((i) => sameLine(i, item.slug, item.packSize));
          if (!found) return [...prev, item];
          return prev.map((i) =>
            sameLine(i, item.slug, item.packSize) ? { ...i, quantity: i.quantity + item.quantity } : i,
          );
        }),
      remove: (slug, packSize) =>
        setItems((prev) => prev.filter((i) => !sameLine(i, slug, packSize))),
      setQuantity: (slug, packSize, quantity) =>
        setItems((prev) =>
          quantity <= 0
            ? prev.filter((i) => !sameLine(i, slug, packSize))
            : prev.map((i) => (sameLine(i, slug, packSize) ? { ...i, quantity } : i)),
        ),
      clear: () => setItems([]),
    };
  }, [items, ready]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartState {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart phải được dùng bên trong <CartProvider>');
  return ctx;
}

/** Định dạng tiền VND thống nhất toàn site */
export function formatVnd(value: number): string {
  return value.toLocaleString('vi-VN') + ' ₫';
}
