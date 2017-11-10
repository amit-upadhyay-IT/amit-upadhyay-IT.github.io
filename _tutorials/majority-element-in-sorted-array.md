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

Iterate n/2 elements in array and which iterating check if arr[i] == arr[i+half]. Since array is sorted thus majority element occurrence has to be more than n/2

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

It is obvious that the majority element in sorted array would be present at the mid position. Thus check for the first occurred index and last occurred index. If The difference between first occurrence and last occurrence comes out to be greater than n/2, then it is the majority element.

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

