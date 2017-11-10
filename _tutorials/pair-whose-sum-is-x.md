---
layout: tutorials
permalink: /tutorials/pair-whose-sum-is-x/
title: Pair whose sum is X
---

<div class="note info">
  <h5>Given an array A and a number X, find a pair (a, b) s.t a+b=X.</h5>
  <p></p>
</div>


<div class="note unreleased">
  <h5>Approach 1</h5>
  <p>
    Brute Force: Time can be reduced further by optimizing the search
  </p>
</div>

Comparing every single possible pair with X.In other words we can say that at each position of array i, we are searching for element 'x-arr[i]', since the array is unsorted so we can only apply linear search.

### Code:


```c
#include<stdio.h>
#include<math.h>

// to get pairs in array whose sum is x
void get_pairs(int arr[], int x, int n)
{
    int i, j;
    // use brute force
    for (i = 0; i < n; ++i)
    {
        for (j = i; j < n; ++j)
            if (arr[i]+arr[j] == x)
            {
                printf("(%d , %d)\n", arr[i], arr[j]);
            }
    }
}

int main()
{
    int arr[20], n, i, x;

    scanf("%d", &n);
    for (i = 0; i < n; ++i)
        scanf("%d", &arr[i]);
    printf("\n");

    printf("\n Enter element x : \n");
    scanf("%d", &x);

    get_pairs(arr, x, n);

    return 0;
}

// T.C = O(n^2)
// S.C = O(1)
```


<div class="note unreleased">
  <h5>Approach 2</h5>
  <p>
    Time can be reduced further by improving the search technique.
  </p>
</div>

"Assuming the array is sorted, if not sorted then we can sort the array\n\nIf you are at arr[i], just search for the occurrence of x-arr[i] in the array using binary search."

### Code:


```c
#include<stdio.h>
// NOTE: array input has to be sorted for correct output.
void check_pair(int *, int, int);

int main()
{
    int arr[50], i, n;
    scanf("%d", &n);
    for (i = 0; i < n; ++i)
        scanf("%d", &arr[i]);
    int x;
    scanf("%d", &x);
    check_pair(arr, n, x);
    return 0;
}

int binary_search(int *arr, int key, int first, int last)
{
    int mid;
    while (first <= last)
    {
        mid = (first+last)/2;
        if (arr[mid] == key)
            return 1;
        else if (arr[mid] < key)
            first = mid+1;
        else
            last = mid-1;
    }
    return 0;
}

void check_pair(int *arr, int n, int x)
{
    int i;
    for (i = 0; i < n; ++i)
         if (binary_search(arr, x-arr[i], 0, n-1))
            printf("(%d , %d)", arr[i], x-arr[i]);
}

// T.C = O(n log n)
// S.C = O(1)
```

<div class="note unreleased">
  <h5>Approach 3</h5>
  <p>
    Assuming the given array is sorted
  </p>
</div>

Take two pointers which will point to the first and last position of the array, if the sum of the elements at these two positions are less that X, the we increment first_pointer by 1.If the sum of the elements at these two positions is greater than X, then decrement the value of last_pointer by 1. If they are equal just display Otherwise there are no such pairs.

### Code:


```c
#include<stdio.h>
// NOTE: array input has to be sorted for correct output.
void check_pair(int *, int, int);

int main()
{
    int arr[50], i, n;
    scanf("%d", &n);
    for (i = 0; i < n; ++i)
        scanf("%d", &arr[i]);
    int x;
    scanf("%d", &x);
    check_pair(arr, n, x);
    return 0;
}

void check_pair(int *arr, int n, int x)
{
    // take firstpos and lastpos and store element value there.
    int first_pos = 0;
    int last_pos = n-1;
    while (first_pos <= last_pos)
    {
        if (arr[first_pos]+arr[last_pos] < x)
            first_pos = first_pos+1;
        else if (arr[first_pos] + arr[last_pos] > x)
            last_pos = last_pos - 1;
        else
        {
            printf("(%d , %d)\n", arr[first_pos], arr[last_pos]);
            first_pos += 1;
            last_pos -= 1;
        }
    }
}

// T.C = O(n)
// S.C = O(1)
```

<div class="note unreleased">
  <h5>Approach 4</h5>
  <p>
    For C programming language the hash can't done at -ve elements, so in C we can implement it for negative elements
  </p>
</div>

We can perform the search operation in less time by using hash table. Insert all element in hash, for each element 'a' in array search 'b' in hash.

### Code:


```c
#include<stdio.h>

void show_pairs(int *arr, int n, int x)
{
    int i, temp;
    // create a hashtable and store the number as the indices of table.
    int hash_tab[50] = {0};// inserted 0 into all
    for (i = 0; i < n; ++i)
    {
        temp = x - arr[i];// will see what is the required element to add up the sum
        if (temp >= 0 && hash_tab[temp] == 1)
            printf("(%d, %d)\n", arr[i], x-arr[i]);
        hash_tab[arr[i]] = 1;
    }
}

int main()
{
    int n, arr[50], x, i;
    scanf("%d", &n);
    for (i = 0; i < n; ++i)
        scanf("%d", &arr[i]);
    printf("\n Enter required sum : \n");
    scanf("%d", &x);
    show_pairs(arr, n, x);
    return 0;
}

// T.C = O(n) -> works for unsorted array too.
// S.C = O(n) -> for hashtable
```

