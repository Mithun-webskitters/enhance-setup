import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ICounterState {
  increase: () => void;
  decrease: () => void;
  count: number;
  reset: () => void;
}

{
  /*without persist*/
}
// export const useCounterStore = create<CounterState>((set) => ({
//   count: 0,
//   increase: () => set((state) => ({ count: state.count + 1 })),
//   decrease: () => set((state) => ({ count: state.count - 1 })),
//   reset: () => set({ count: 0 }),
// }));

export const useCounterStore = create<ICounterState>()(
  persist(
    (set) => ({
      count: 0,
      increase: () => set((state) => ({ count: state.count + 1 })),
      decrease: () => set((state) => ({ count: state.count - 1 })),
      reset: () => set({ count: 0 }),
    }),
    {
      name: "counter-storage",
    }
  )
);
