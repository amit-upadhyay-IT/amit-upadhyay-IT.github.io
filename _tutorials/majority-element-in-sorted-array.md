---
layout: tutorials
permalink: /tutorials/majority-element-in-sorted-array/
title: Majority element in sorted array
---

<div class="note info">
  <h5>Given a sorted array of size n, find an element that occurs more than n/2 times.</h5>
  <p></p>
</div>


<div class="note unreleased">
  <h5>Approach 1</h5>
  <p>
  </p>
</div>

Iterate `n/2` elements in array and while iterating check if `arr[i] == arr[i+half]`. Since array is sorted thus majority element occurrence has to be more than n/2

### Code:

```c
#include<stdio.h>

int check_for_more(int *arr, int n)
{
    int i;
    int flag = 0;
    int half = n/2;
    for (i = 0; i < n/2+1; ++i)
    {
        if (arr[i] == arr[i+half])
        {
            flag = 1;
            break;
        }
    }
    if (flag)
        return arr[i];
    else
        return -1;
}

int main()
{
    int arr[50], n, i;

    scanf("%d", &n);
    for (i = 0; i < n; ++i)
        scanf("%d", &arr[i]);

    printf("\n");
    int val = check_for_more(arr, n);
    if (val != -1)
        printf("\n %d occurred more than n/2\n", val);
    else
        printf("\n No number occurred more than n/2\n");

    return 0;
}

// T.C = O(n/2)
// S.C = O(1)
```


<div class="note unreleased">
  <h5>Approach 2</h5>
  <p>
  </p>
</div>

It is obvious that the majority element in sorted array would be present at the `mid position`. Thus check for the `first occurred` index and `last occurred` index. If The difference between first occurrence and last occurrence comes out to be greater than `n/2`, then it is the majority element.

### Code:

```c
#include<stdio.h>
#include<math.h>

int find_occurrance(int *arr, int n, int x, int first_search)
{
    int first = 0, last = n-1, mid, result = -1;
    while (first <= last)
    {
        mid = (first+last)/2;
        if (arr[mid] == x)
        {
            if (first_search)
                last = mid-1;
            else
                first = mid+1;
            result = mid;
        }
        else if (x < arr[mid])
            last = mid-1;
        else
            first = mid+1;
    }
    return result;
}

int main()
{
    int arr[50], n, i, x;

    scanf("%d", &n);
    for (i = 0; i < n; ++i)
        scanf("%d", &arr[i]);
    x = arr[(n-1)/2];
    int first_ret_val, last_ret_val;
    first_ret_val = find_occurrance(arr, n, x, 1);
    if (first_ret_val != -1)
    {
        last_ret_val = find_occurrance(arr, n, x, 0);

        if (last_ret_val - first_ret_val + 1 >= n/2)
            printf("\n %d occurred more than %d times ", x, n/2);
        else
            printf("\n No element occurred more than %d times ", n/2);
    }
    printf("\n");
    return 0;
}

// T.C = O(log n)
// S.C = O(1)
```

