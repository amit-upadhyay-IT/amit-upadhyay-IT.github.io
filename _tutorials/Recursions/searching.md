---
layout: tutorials
permalink: /tutorials/searching/
title: Searching
---

A sequential search in an array takes `O(n)` time in case of sorted data or un-sorted data both. The searching time can be further reduced by using some additional data structures like Binary Search Tree, Dictionary, etc.

Let's suppose that the data given is in sorted order, then we can reduce the searching time even without using any additional data structure.

Let's say you want to search an element `key` in the given sorted list. Also, as the data is in sorted order then we can simply have a look on to the middle element, if the key is greater than the middle element then we can say that the key is present after the middle element in the list. So we can discard the first half of the list and just focus on the second half. We again repeat the same process where we just consider the second half of the list as the main list. This process is also known as `binary search`.

If you observe the operations being done in order to search an element, then you can see the self-similar nature. Since we have self-similarity in the problem thus, I am gonna write a recursive solution for binary search.

- Base case: When we found the key to be present in the middle of the list or sub-list. Also, there can be a case where we don't have `key` present in the list, then, in this case, the size of the list will become `0` at some point of time, so return some value to indicate that element wasn't found.

- Recursive case: The case which is self-similar, i.e. searching will still take place in this case but on a smaller part of the list. So based on the comparison of `key` and middle element in the list we decide which part to strip out.

{: .info .note}
**Example code**

```py
def binary_search_helper(arr, key, first, last):
    # get middle
    mid = first + (last-first)/2
    if first <= last:
        if key == arr[mid]:
            return mid
        elif key < arr[mid]:
            # present in first half
            return binary_search_helper(arr, key, first, mid-1)
        else:
            # present in second half
            return binary_search_helper(arr, key, mid+1, last)


def binary_search(arr, key):
    return binary_search_helper(arr, key, 0, len(arr)-1)


if __name__ == '__main__':
    ret = binary_search([1, 3, 5, 7, 9, 11, 13, 15, 18, 21, 45, 66, 999], 66)
    if ret is not None:
        print 'found at index: ' + str(ret)
    else:
        print 'element not found'
```

{: .info .note}
**Ternary Search code**

```py
def ternary_search_helper(arr, left, right, key):
    if right >= left:
        # getting first partitioning index
        mid1 = left + (right - left)/3
        # getting second partitioning index
        mid2 = right - (right - left)/3

        if arr[mid1] == key:
            return mid1
        elif arr[mid2] == key:
            return mid2
        elif key < arr[mid1]:
            return ternary_search_helper(arr, left, mid1-1, key)
        elif key > arr[mid2]:
            return ternary_search_helper(arr, mid2+1, right, key)
        else:
            return ternary_search_helper(arr, mid1+1, mid2-1, key)


def ternary_search(arr, key):
    return ternary_search_helper(arr, 0, len(arr)-1, key)


if __name__ == '__main__':
    ret = ternary_search([1, 3, 4, 5, 56, 78, 7894, 56753735, 34523535345], 656646)
    if ret:
        print 'element found at index: ', ret
    else:
        print 'element not found'
```

**Time complexity = O(log3(n))**

