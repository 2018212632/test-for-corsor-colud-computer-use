/**
 * Subagent B Output - JavaScript utilities and benchmarks
 * Contains: quicksort, debounce, EventEmitter, and performance benchmark
 */

// ============ Quicksort Implementation ============
function quicksort(arr) {
  if (arr.length <= 1) return arr;
  const pivot = arr[Math.floor(arr.length / 2)];
  const left = arr.filter((x) => x < pivot);
  const middle = arr.filter((x) => x === pivot);
  const right = arr.filter((x) => x > pivot);
  return [...quicksort(left), ...middle, ...quicksort(right)];
}

// ============ Debounce Utility ============
function debounce(fn, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), delay);
  };
}

// ============ EventEmitter Class ============
class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(event, listener) {
    if (!this.events[event]) this.events[event] = [];
    this.events[event].push(listener);
    return this;
  }

  emit(event, ...args) {
    if (!this.events[event]) return false;
    this.events[event].forEach((listener) => listener(...args));
    return true;
  }

  off(event, listenerToRemove) {
    if (!this.events[event]) return this;
    this.events[event] = this.events[event].filter((l) => l !== listenerToRemove);
    return this;
  }
}

// ============ Performance Benchmark ============
function benchmarkQuicksort() {
  const sizes = [100, 1000, 10000];
  console.log("Quicksort Performance Benchmark");
  console.log("==============================\n");

  for (const size of sizes) {
    const arr = Array.from({ length: size }, () => Math.floor(Math.random() * 10000));
    const start = performance.now();
    quicksort(arr);
    const end = performance.now();
    const duration = (end - start).toFixed(3);
    console.log(`Array size ${size}: ${duration} ms`);
  }
  console.log("\nBenchmark complete.");
}

// Run benchmark
benchmarkQuicksort();
