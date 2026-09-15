'use client';

import { createContext, useCallback, useContext, useMemo, useSyncExternalStore } from 'react';

export type CartItem = {
  slug: string;
  name: string;
  image: string;
  /** Số hộp trong một lô (site gốc bán theo bậc 100/200/300/400/500) */
  packSize: number;
  /** Giá của bậc số lượng đã chọn, VND. 0 = chưa có giá niêm yết, sẽ báo giá riêng. */
  price: number;
  /** Số lô khách đặt */
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
  /** false ở lần render đầu trên server và trước khi hydrate xong */
  ready: boolean;
};

const STORAGE_KEY = 'iatd-cart-v1';

/* -----------------------------------------------------------------------------
 * Giỏ hàng lưu trong localStorage và được đọc qua useSyncExternalStore thay vì
 * useEffect + setState. Lý do:
 *  - không gây cascading render (React lint chặn setState đồng bộ trong effect)
 *  - tự đồng bộ giữa nhiều tab đang mở nhờ sự kiện "storage"
 * localStorage có thể ném lỗi (cửa sổ ẩn danh, chặn site data) nên mọi truy cập
 * đều bọc try/catch và luôn có giá trị mặc định.
 * -------------------------------------------------------------------------- */

const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());

function subscribe(listener: () => void) {
  listeners.add(listener);
  window.addEventListener('storage', listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener('storage', listener);
  };
}

function getSnapshot(): string {
  try {
    return window.localStorage.getItem(STORAGE_KEY) ?? '';
  } catch {
    return '';
  }
}

/** Trên server không có localStorage — trả chuỗi rỗng để khớp với lần hydrate đầu */
const getServerSnapshot = () => '';

function write(items: CartItem[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    /* bỏ qua: giỏ hàng chỉ là tiện ích phía trình duyệt */
  }
  emit();
}

function parse(raw: string): CartItem[] {
  if (!raw) return [];
  try {
    const value = JSON.parse(raw);
    return Array.isArray(value) ? (value as CartItem[]) : [];
  } catch {
    return [];
  }
}

const CartContext = createContext<CartState | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const raw = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const items = useMemo(() => parse(raw), [raw]);
  const ready = useSyncExternalStore(subscribe, () => true, () => false);

  const sameLine = (i: CartItem, slug: string, packSize: number) =>
    i.slug === slug && i.packSize === packSize;

  const add = useCallback((item: CartItem) => {
    const current = parse(getSnapshot());
    const found = current.find((i) => sameLine(i, item.slug, item.packSize));
    write(
      found
        ? current.map((i) => (sameLine(i, item.slug, item.packSize) ? { ...i, quantity: i.quantity + item.quantity } : i))
        : [...current, item],
    );
  }, []);

  const remove = useCallback((slug: string, packSize: number) => {
    write(parse(getSnapshot()).filter((i) => !sameLine(i, slug, packSize)));
  }, []);

  const setQuantity = useCallback((slug: string, packSize: number, quantity: number) => {
    const current = parse(getSnapshot());
    write(
      quantity <= 0
        ? current.filter((i) => !sameLine(i, slug, packSize))
        : current.map((i) => (sameLine(i, slug, packSize) ? { ...i, quantity } : i)),
    );
  }, []);

  const clear = useCallback(() => write([]), []);

  const value = useMemo<CartState>(
    () => ({
      items,
      ready,
      count: items.reduce((sum, i) => sum + i.quantity, 0),
      total: items.reduce((sum, i) => sum + i.price * i.quantity, 0),
      add,
      remove,
      setQuantity,
      clear,
    }),
    [items, ready, add, remove, setQuantity, clear],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartState {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart phải được dùng bên trong <CartProvider>');
  return ctx;
}
