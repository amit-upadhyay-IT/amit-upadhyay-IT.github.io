---
layout: tutorials
permalink: /tutorials/element-occurring-odd-times/
title: Element occurring odd times
---

<div class="note info">
  <h5>Find the number occurring odd number of times in an array given that exactly one number occurs odd number of times.</h5>
  <p></p>
</div>


<div class="note unreleased">
  <h5>Approach 1</h5>
  <p>
    Think if extra memory can help you to decress time.
  </p>
</div>
**Naive approach**: For every element in array, you can count the total occurrence of that element by scanning the entire array.

Once you get element occurring odd number of times just return true from the function.

### Code:


```c
/*
 *for each element in the array we will iterate through the array
 and check the count of arr[i] and if comes out to be odd then we return
 true from the function.
 */

#include<stdio.h>
#include<stdlib.h>

int get_odd_occurred_ele(int *arr, int n)
{
    int i, j;
    int count = 0;
    for (i = 0; i < n; ++i)
    {
        int index = i;
        for (j = 0; j < n; ++j)
        {
            if (arr[index] == arr[j])
                count++;
        }
        if (count % 2 != 0)
            return arr[index];
        count = 0;// after each complete iteration we need to start count with 0
    }
    return 0;
}

int main()
{
    int *arr, n, i;
    scanf("%d", &n);
    arr = (int *)malloc(n*sizeof(int));
    for (i = 0; i < n; ++i)
        scanf("%d", &arr[i]);
    int ret_val = get_odd_occurred_ele(arr, n);
    if (ret_val)
        printf("\n %d occurred odd number of times ", ret_val);
    else
        printf("\n No number occurred odd number of times\n");
    return 0;

}

// T.C = O(n^2)
// S.C = O(1)
```


<div class="note unreleased">
  <h5>Approach 2</h5>
  <p>
    Think of some mathematical operators.
  </p>
</div>

Use hash table to store the count of each element, now again go through the hash table and see of the any value in hash table is odd. If yes, then return the index of hash table.

### Code:
```c
/*
 * using hashing to solve problem
 */
#include<stdio.h>
#include<stdlib.h>

int get_odd_occurred_element(int *arr, int n)
{
    int hash_set[1000] = {0}, i;// no element can be greater then 1000
    for (i = 0; i < n; ++i)
    {
        hash_set[arr[i]]++;
    }
    // iterating over hash_set to see oddly occurred element
    for (i = 0; i < n; ++i)
        if (hash_set[arr[i]] & 1)
            return arr[i]; // return the element which occurred odd times
    return 0;

}

int main()
{
    int n, *arr, i;
    scanf("%d", &n);
    arr = (int *)malloc(n*sizeof(int));
    for (i = 0; i < n; ++i)
        scanf("%d", &arr[i]);
    int ret_val = get_odd_occurred_element(arr, n);
    if (ret_val)
        printf("\n%d element occurred odd times\n", ret_val);
    else
        printf("\n No element occurred odd times\n");
    return 0;
}

// T.C = O(n)
// S.C = O(n)
```

<div class="note unreleased">
  <h5>Approach 3</h5>
  <p>
    Try to think about more problems which can be solved by bitwise xor
  </p>
</div>

Using bitwise xor to get oddly occurred element...

### Code:

```c
/*
 * using bitwise xor to get oddly occurred element
 */

#include<stdio.h>

int get_odd_occurred_ele(int *arr, int n)
{
    int i;
    int ret_val = arr[0];
    for (i = 1; i < n; ++i)
        ret_val = arr[i]^ret_val;
    return ret_val;
}

int main()
{
    int i, n, arr[100];
    scanf("%d", &n);
    for (i = 0; i < n; ++i)
        scanf("%d", &arr[i]);
    int ret_val = get_odd_occurred_ele(arr, n);
    if (ret_val)
        printf("\n %d element occurred odd times\n", ret_val);
    else
        printf("\n No elements occurred odd times\n");
    return 0;
}

```
