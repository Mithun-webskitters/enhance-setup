"use client";

import { useCounterStore } from "@/store/useCounterStore";

export default function Counter() {
  const { count, decrease, increase, reset } = useCounterStore();
  return (
    <div className="p-4 border rounded-xl w-64 mx-auto mt-10 text-center">
      <h2 className="text-lg font-semibold mb-3">Counter: {count}</h2>
      <div className="flex justify-center gap-3">
        <button
          onClick={decrease}
          className="px-3 py-1 bg-red-500 text-white rounded"
        >
          -
        </button>
        <button
          onClick={reset}
          className="px-3 py-1 bg-gray-400 text-white rounded"
        >
          Reset
        </button>
        <button
          onClick={increase}
          className="px-3 py-1 bg-green-500 text-white rounded"
        >
          +
        </button>
      </div>
    </div>
  );
}
