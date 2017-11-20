---
layout: tutorials
permalink: /tutorials/separate-0's-and-1's/
title: Separate 0's and 1's
---

<div class="note info">
  <h5>Separate the 0's and 1's in an array containing only 0's and 1's.</h5>
  <p></p>
</div>


<div class="note unreleased">
  <h5>Approach 1</h5>
  <p>
    Try to solve in only one iteration.
  </p>
</div>

**Use counting sort**:

We can maintain the count of either 0 or 1

Now we can override the elements of array with 0 and 1 respectively


### Code:


```c
#include<stdio.h>
#include<stdlib.h>

int zero_cnt(int *arr, int n)
{
    int i, cnt = 0;
    for (i = 0; i < n; ++i)
        if (arr[i] == 0)
            cnt++;
    return cnt;
}

void set_array_element(int *arr, int n, int z_cnt)
{
    int i;
    for (i = 0; i < z_cnt; ++i)
         arr[i] = 0;
    for (i = z_cnt; i < n; ++i)
        arr[i] = 1;
}

void print_array(int *arr, int n)
{
    int i;
    for (i = 0; i < n; ++i)
        printf("%d ", arr[i]);
}

int main()
{
    int i, n, *arr;
    scanf("%d", &n);
    arr = (int*) malloc(n*sizeof(int));
    for (i = 0; i < n; ++i)
        scanf("%d", &arr[i]);
    int z_cnt = zero_cnt(arr, n);
    set_array_element(arr, n, z_cnt);
    print_array(arr, n);
    return 0;
}
```


<div class="note unreleased">
  <h5>Approach 2</h5>
  <p>
    Think about other problems that can be solved using this algo
  </p>
</div>

Use partition algorith of quick sort, keep the pivot as 1 in the parition algorithm.

### Code:


```c
#include<stdio.h>
#include<stdlib.h>

void swap(int *arr, int a, int b)
{
    int t = arr[a];
    arr[a] = arr[b];
    arr[b] = t;
}

void swap2(int *a, int *b)
{
    int temp = *a;
    *a = *b;
    *b = temp;
}

int partition(int *arr, int n)
{
    int start = 0, end = n-1;
    int pivot = arr[end];
    int partitionIndex = start;
    int i;
    for (i = start; i < end; ++i)
    {
        if (!pivot && arr[i] <= pivot)
        {
            swap(arr, i, partitionIndex);
            //swap2(&arr[i], &arr[partitionIndex]);
            partitionIndex++;
        }
        else if (pivot && arr[i] < pivot)// check if last element if one then we just need to compare if arr[i] < pivot
        {
            swap(arr, i, partitionIndex);
            partitionIndex++;
        }
    }
    swap(arr, partitionIndex, end);
    //swap2(&arr[partitionIndex], &arr[end]);
    return partitionIndex;
}

int main()
{
    int i, *arr, n;
    scanf("%d", &n);
    arr = (int *)malloc(n * sizeof(int));
    for (i = 0; i < n; ++i)
        scanf("%d", &arr[i]);
    int zero_count = partition(arr, n)+1;
    printf("\n");
    for (i = 0; i < n; ++i)
        printf("%d ", arr[i]);
    return 0;
}

```

