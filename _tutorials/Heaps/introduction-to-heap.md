---
layout: tutorials
permalink: /tutorials/heap-introduction/
title: Introduction to Heap
---

{: .info .note}
**Why Heap?**<br>The way we store data into a data structure and provide input to an algorithm makes a lots of difference in the computation time of the algorithm. So to optimize the computation time for a set of particular algorithm we prefer using heaps.

An algorithm may require operations like inserting, finding minimum, deleting minimum then in that case we would always want that all these opeartions can be performed optimally. Thus if we used a sorted array (ascending order) for this algorithm we would see that insertion and deletion of minimum element would take in `O(n)` time. Even if we take linked list or un-sorted array still one of the operation mentioned above will take atleast `O(n)` time.

Thus in this case we can use `heap`. A `min-heap` would take `O(log n)` time for insertion, `O(1)` time for finding minimum and `O(log n)` time for deleting minimum.


## What is heap?

Of course a data structure for optimizing few operations mentioned above. A heap can be implemented as a binary tree or a 3-ary (ternary) tree or in general n-ary tree.

Here I will discuss about binary heap, i.e. its implementation would be done using binary tree.

Every binary heap is a almost complete binary tree. You should remember that:
```
complete binary tree ⊂ almost complete binary tree
```

**Almost complete binary tree**: Leaves should be present only in the last level and the last but 1 level. And the leaves should be filled from left to right.

Thus, almost complete binary tree can be used as a heap.



## Types of heap

#### 1. Max-heap

A type of heap in which the root node should always be maximum.
```
Eg : [100, 10, 20, 1, 4, 3]
```
If you construct a binary tree from the above heap, you will find that every root is greater than its sub-tree root.

> A sorted array in descending order is always a max-heap.

#### 2. Min-heap:

A type of heap in which the root node should always be minimum.

```
Eg : [1, 10, 20, 100, 200]
```
> A sorted array in ascending order is always a min-heap.



## Implementation of heap

Even though it is a tree, we need not actually consturct a tree to implement it. We can do so, but we need a lots of storage thus we should rather prefer using the property that `a heap is almost complete binary tree`.

Now you should be able to understand how a almost complete binary tree would help in storage?

We know that if height of a complete binary tree is `h` then it has `2^(h+1) - 1` nodes. Thus, we have kind of fixed number of nodes which is propotional to height of tree, so we are sure about count( or size) of blocks retuired to store the tree and this makes sure that we don't waste any memory in the array (i.e. no empty block would be there in array if we represent the tree).

Thus, we prefer storing all the elements in the array and we can interpret the array as a binary tree or heap.

```
         100
       /    \
      10     20
     /  \   /
    1    4 3

```

Consider the above tree lets use heap to represent the tree.

> NOTE: Assume that the array is indexed from `1` to `n`. Where `n` is the nodes in tree.

Heap representation:

```
heap:		[100, 10, 20, 1, 4, 3]
index:		  1 ,  2,  3, 4, 5, 6
```

## Heap property:

Assume `i` is index of parent node, then


- Index of left child = `i * 2`
- Index of right child = `i * 2 + 1`


Assume `ind` to be index of either left child or index of right child.

then:

- Root index = `floor (ind/2)`


**POINTS**:

- In order to get the index of left child node, multiply parent's node index with 2.
- In order to get the index of right child node, multiply parent's node index with 2 then add 1.
- In order to get the index of parent node, divide the index of any of the child by 2 then take floor of the output.

> The above formula is valid if root is starting at 1st index.

#### IMPORTANT NOTE:

- Multiplying with `2` is nothing but `1 left shift`, and dividing by `2` is nothing but `1 right shift`, therefore it is very easy and optimal to implement in a computer i.e. performing this task in computer are quite easy and efficient. This is also one reason for storing the heap (or almost complete binary tree) in an array.

## Properties of complete binary tree:

```
        *	=> Height = 2
       / \
      *	  *	=> Height = 1
     / \ / \
    *  * *  *	=> Height = 0
```

{: .info .note}
**Height of a node**: The number of edges from that node to the left node with longest possible length. i.e. longest possible number of edges from that node to any leaf.

**NOTE**:
- in almost complete binary tree, the nodes at same level can also have different height
- height of tree = height of root node.

**Homework**:

- Derive equation which can give the number of nodes present in `complete binary tree` or `almost complete binary tree`.
- Derive equation which can give the number of nodes present in `complete 3-ary tree`.
- Derive equation which can give the number of nodes present in `complete n-ary tree`.
- Derive equation which can give the height of `complete binary tree` or `almost complete binary tree`, suppose that number of nodes are `N`.


## Process of building heap

**Given an array of elements, how would you build a heap out of array?**

Let's make a max-heap.

- One approach for making a max-heap is to sort the array in descending order.
- Time taken would be O(n*log2(n)), but I would want to perform the task of construction in less time.

Consider the below example which is a almost complete binary tree and try to construct a max-heap

```
        1
       / \
      2   3
     / \
    4   5
```

In a almost complete binary tree:

- The starting index of the leaf is : `floor(n/2) + 1`
- The ending index of leaf is : `n`

So in the above tree we have leafs from index 3 to index 5 (where indexing starts from 1)

**Why are we interested in finding out the leaf?**

Every leaf is nothing but a tree with one node and every tree with one node is already a heap (either min-heap or max-heap), so we can say that the building blocks of the heap are the leaf in the tree.

We will use the building blocks (i.e. leaf) to form the heap.

First let's look at defination of Heapify: **The process of converting a binary tree into a Heap data structure.**

So we can say that one way to construct a heap is **going to each node from the end and then converting the node into a heap (i.e. Heapify).** But, note that the leafs are already heap, so we need to start this process of Heapify from the first non-leaf node i.e. from `floor(n/2)` to `1`.

Below you will study more about Heapify.


## Algorithm to heapify

Heapify is an important step used in the construction of heap (min-heap or max-heap).

Given that the left and right child of a node `'n'` in a binary tree are heap (min-heap or max-heap) then heapify is the process of converting the node `'n'` into a heap.

**Max-heapify in C**

```c
struct Heap
{
    int heapSize;
    int *arr;
};


void max_heapify(struct Heap *h, int i)
{
    int l = 2*i;
    int r = 2*i + 1;
    int largest = -1;

    if (l <= h->heapSize && h->arr[l] > h->arr[i])
        largest = l;
    else
        largest = i;

    if (r <= h->heapSize && h->arr[r] > h->arr[largest])
        largest = r;

    if (largest != i) // need for heapify
    {
        int t = h->arr[i];
        h->arr[i] = h->arr[largest];
        h->arr[largest] = t;

        max_heapify(h, largest);
    }
}
```

**Time Complexity Analysis**:

- In worst case scenario, the root might come to the leaf(if found that the root is smallest). So the root might have to travel the complete height of the tree, i.e. `log2(n)`.

- In order to perform one swapping operation I need to do two comparisions, i.e. to just move one level down I need 2 comparisions therefore total number of comparisions required would be `(2*log2(n))`

So,
```
Time complexity = O(log2(n))
```

**Space Complexity Analysis**:

Since its a recursive function, we need to take care of recursive calls being made. In worst case, the number of recursive calls that can be made gets equal to the number of levels in tree. i.e. `log2(n)`

So,
```
Space complexity = O(log2(n))
```

{: .info .note}
**Why is 'n' in the time and space complexity above?**<br>Remember we pass two arguments in the heapify function, the second argument is the index of the node about which we are going to heapify the tree. So `n` represents the number of nodes in the subtree for which `i` (the second argument) is the root.

**Min-heapify in Python**

For python lovers, I wrote the below code in python. BTW, the function below has slight changes from the above function (max-heapify).

```py
class MinHeap:

    heapSize = 0
    heapList = list()

    def __init__(self, heapSize=None, heapList=None):
        self.heapSize = heapSize
        self.heapList = heapList

    def min_heapify(self, index):
        left = index*2
        right = index*2 + 1

        smallest = -1

        if left <= self.heapSize and self.heapList[left] < self.heapList[index]:
            smallest = left
        else:
            smallest = index

        if right <= self.heapSize and self.heapList[right] < self.heapList[smallest]:
            smallest = right

        if smallest != index:
            self.heapList[smallest], self.heapList[index] = self.heapList[index], self.heapList[smallest]
            self.min_heapify(smallest)
```

## Algorithm to build max-heap

```c
// the heap array is pre-initialized with element value and size in main-function.
void buildMaxHeap(struct Heap *h)
{
    int i;
    for (i = h->heapSize/2; i >= 1; --i)
        max_heapify(h, i);
}
```

We need to traverse through every non-leaf one by one, while traversing make sure that you start from the largest non-leaf index in the heap list.

## Discussion on time and space complexity:

You might think that heapify take log2(n) time and we are nearly calling n times the heapify function. So T.C should be O(n*log2(n)), but this is not the way to analyse the time complexity for this algorithm.

Consider these points:

- There are around `n/2 (or 2^h)` nodes with height `0` (i.e. leaf).
- There would be `2^(h-1)` nodes with height `1`.
- There would be `2^(h-2)` nodes with height `2`.
- There would be `2^1` nodes with height `h-1`
- There would be `2^0` node with height `h`.

{: .info .note}
**How many nodes of height 'h' can be present in complete binary tree?**<br>If there are `n` nodes in a tree, then ceil `(n/2^(h+1))` will have height `h`.

We know that we need not call `heapify` function on he leaf (as a leaf is considered to be a heap), i.e. we are leaving `n/2` elements. Also there is just one element with height `h`(i.e. the root) so this one call would take `O(h)` time (i.e. `O(log2(n))`, rest of the calls on heapify would also take `O(h)` time but the `h` itself has been reduced for the rest of the node. So it wouldn't be appropriate to say the time complexity goes to `O(n*log2(n))`.

Derivation:

Heapify will take time equal to height of node:

```
Total work done = from h=0 to h=log2(n) Σ ceil(n/2^(h+1)) O(h) ;
		= from h=0 to h=log2(n) Σ ceil(n/2^(h+1)) * (ch) ; // O(h) -> ch 
		= (cn/2) * from h=0 to h=log2(n) Σ ceil(h/2^(h+1)) ; // taking constant out
		= (cn/2) * from h=0 to h=∞ Σ ceil(h/2^(h+1)) ; Σ will be computed to 2
		= (cn/2) * 2 ;
		= O(n) 
```

Thus, time taken to build a heap is `O(n)`. Therefore, it is better than sorting approach.

**Space Complexity**: We are going to call `max_heapify()` one by one thus, S.C will be the maximum S.C taken by `max_heapify()`. i.e. `log2(n)`

## Deleting maximum from max-heap

First think how would you delete the maximum from heap? You would definately replace the root with something from the tree then reduce the size of the tree (or heap) and the just heapify about the root, right?

Yes, that's all you need to perform.

```c
int delMax(struct Heap *h)
{
    if (h->heapSize < 1)
    {
        printf("Heap underflow");
        return -1;
    }
    int max = h->arr[1];

    // swapping root node and last node
    h->arr[1] = h->arr[h->heapSize];

    h->heapSize -= 1;

    max_heapify(h, 1);

    return max;
}
```

- Time complexity would be time taken to heapify, i.e. `log2(n)`.
- Space complexity would be the stacks created due to the recursion involved in the program. So, Space complexity = `O(log2(n))`.

## Increase key value in max-heap

**How would you approach this one?**

Assume that `heap`, `index` and `key` are passed to you as arguments in the function, then:

- First update heap at given `index` with the `key`.
- Now see if the updated node's parent is still following the property of heap. i.e. in case of max-heap the node at index/2 should be greater than node at index.
- If not then swap the value at these two nodes.
- Again repeat point number 2, unless you reach the root or find parent is appropriate.

**Example code**:

```c
void increase_key(struct Heap* h, int index, int key)
{
    if (key <= h->arr[index])
    {
        printf("\nError\n");
        return;
    }

    h->arr[index] = key;

    // as we have increased the value of node, so property of max heap will still be maintained, so just see if parent node has been disturbed or not

    while (index > 1 && h->arr[index/2] < h->arr[index])
    {
        // swap parent and child
        int temp = h->arr[index];
        h->arr[index] = h->arr[index/2];
        h->arr[index/2] = temp;

        index /= 2;
    }
}
```

- **Time Complexity**: `O(log2(n))`

- **Space Complexity**: `O(1)` // no recusion is involved

## Decrease key value in max-heap

In order to decrease the key in the max-heap, we just need to change the value at index `i`. After decreasing value, the left subtree and right subtree will still follow the property of max-heap, but the root might not follow the max-heap property. Thus, we just need to call the `max_heapify()` function about the root node.

```c
void increase_key(struct Heap* h, int index, int key)
{
    if (key >= h->arr[index])
    {
        printf("\nError\n");
        return;
    }

    h->arr[index] = key;

	max_heapify(h);
}
```

- **Time Complexity**: `O(log2(n))`

- **Space Complexity**: `O(log2(n))` // recusion is involved due to `max_heapify`

## Insert a key into heap (max and min heap)

- Increase the heap size by 1.
- Insert the key at last position.
- Now compare the value of key with the parent of the insert node.
- In case of max-heap, if parent is lesser then swap child and parent.
- Repeaet 3rd point again unless you reach the root or you find that parent is appropriate.

```c
void insertIntoHeap(struct Heap* h, int key)
{
    /*
     increasing the heapsize and then inserting the element there
    */

    h->heapSize += 1;

    h->arr[h->heapSize] = key;

    int index = h->heapSize;

    while (index > 1 && h->arr[index/2] < h->arr[index])
    {
        // swapping the parent and child
        int temp = h->arr[index];
        h->arr[index] = h->arr[index/2];
        h->arr[index/2] = temp;

        index /= 2;
    }
}
```
- **Time Complexity**: In worst case the element might travel from leaf to root, so time complexity would be `O(log2(n))`

- **Space Complexity**: `O(1)`


## Heap sort

Let's assume you wanna sort this list in ascending order:

[75, 23, 86, 110, 77, 65, 84]

- Now, I will build a max-heap out of it.

[110, 77, 86, 23, 75, 65, 84]

- As we want to sort in ascending order, the the maximum element should be at the end. Thus, we take out the root (i.e. the max element) and then swap it with the last element in the heap.

[84, 77, 86, 23, 75, 65, 110]

- After swapping I decrease the size of the heap, so that the last element (the greatest one) would no longer be part of the heap, but it would the part of the array.

- Again I heapify the heap about the root so that the maximum would again come to the root.

i.e. [86, 77, 84, 23, 75, 65]

- Now again I put the root to the last of heap and decrease the size of heap. Then heapify.

- I keep on performing the same task unless just one element is left in the heap.

So in the end, there would just be one element left in the heap and that would be the smallest element. You would also notice that the heap list is sorted in ascening order.

**Code**:

```c
void heapSort(struct Heap *h)
{
    buildMaxHeap(h);

    int i;
    for (i = h->heapSize; i >= 2; --i)
    {
        // swap the root with last
        int temp = h->arr[h->heapSize];
        h->arr[h->heapSize] = h->arr[1];
        h->arr[1] = temp;

        h->heapSize--;

        max_heapify(h, 1);
    }
}
```

A complete heap sort program can be seen [here](https://github.com/amit-upadhyay-IT/probable-octo-disco/blob/master/heap/c/heap_sort.c).

 * time complexity = O(n*log n)
 * space complexity = O(logn)

{: .info .note}
**Why is time complexity = O(n*logn)?**<br>Point is that, every time we call `max-heapify()` the size of the problem is reduced by `1`. Initial call to `max_heapify()` has `n` nodes, second call has `n-1` nodes and so on for the consecutive calls the size of heap decreases. But if you observe that we are going to call the `max_heapify()` on the tree of level `log2(n)` at-least as many time as the leaves are their in the tree (because we delete last node in each iteration). <br><br> Which means until I delete all the leaves from the tree or until one complete level is completely deleted, whenever I call `max_heapify()`, I get `log2(n)` time only.<br><br> So, nearly `n/2` leaves will be there and for them `log2(n)` time will be consumed for `max_heapify()`


