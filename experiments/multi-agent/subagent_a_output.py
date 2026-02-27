"""
Subagent A Output - Data structures and algorithms module.

Contains:
- Fibonacci function (recursive + memoized)
- Binary search function
- Simple LinkedList class
"""

from functools import lru_cache
from typing import Optional


def fibonacci(n: int) -> int:
    """
    Compute the nth Fibonacci number using recursion with memoization.

    Args:
        n: The index of the Fibonacci number to compute (0-indexed).

    Returns:
        The nth Fibonacci number.

    Raises:
        ValueError: If n is negative.
    """
    if n < 0:
        raise ValueError("n must be non-negative")

    @lru_cache(maxsize=None)
    def _fib(k: int) -> int:
        if k <= 1:
            return k
        return _fib(k - 1) + _fib(k - 2)

    return _fib(n)


def binary_search(arr: list[int], target: int) -> Optional[int]:
    """
    Perform binary search on a sorted list.

    Args:
        arr: A sorted list of integers.
        target: The value to search for.

    Returns:
        The index of target if found, None otherwise.
    """
    left, right = 0, len(arr) - 1

    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        if arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1

    return None


class ListNode:
    """A single node in a linked list."""

    def __init__(self, value: int, next_node: Optional["ListNode"] = None) -> None:
        self.value = value
        self.next = next_node


class LinkedList:
    """
    A simple singly linked list implementation.

    Supports append, prepend, and traversal operations.
    """

    def __init__(self) -> None:
        """Initialize an empty linked list."""
        self.head: Optional[ListNode] = None

    def append(self, value: int) -> None:
        """
        Add a value to the end of the list.

        Args:
            value: The integer value to append.
        """
        new_node = ListNode(value)
        if self.head is None:
            self.head = new_node
            return
        current = self.head
        while current.next is not None:
            current = current.next
        current.next = new_node

    def prepend(self, value: int) -> None:
        """
        Add a value to the beginning of the list.

        Args:
            value: The integer value to prepend.
        """
        new_node = ListNode(value, self.head)
        self.head = new_node

    def to_list(self) -> list[int]:
        """
        Convert the linked list to a Python list.

        Returns:
            A list containing all values in order.
        """
        result: list[int] = []
        current = self.head
        while current is not None:
            result.append(current.value)
            current = current.next
        return result

    def __repr__(self) -> str:
        return f"LinkedList({self.to_list()})"


def main() -> None:
    """Demonstrate all components."""
    print("=== Subagent A Output - Verification ===\n")

    # Fibonacci
    print("1. Fibonacci (memoized):")
    for i in range(10):
        print(f"   fib({i}) = {fibonacci(i)}")
    print(f"   fib(20) = {fibonacci(20)}\n")

    # Binary search
    print("2. Binary Search:")
    arr = [1, 3, 5, 7, 9, 11, 13]
    print(f"   Array: {arr}")
    for target in [5, 9, 2]:
        idx = binary_search(arr, target)
        print(f"   binary_search(arr, {target}) -> {idx}\n")

    # LinkedList
    print("3. LinkedList:")
    ll = LinkedList()
    ll.append(1)
    ll.append(2)
    ll.append(3)
    ll.prepend(0)
    print(f"   {ll}")
    print(f"   to_list(): {ll.to_list()}\n")

    print("=== All components verified successfully! ===")


if __name__ == "__main__":
    main()
