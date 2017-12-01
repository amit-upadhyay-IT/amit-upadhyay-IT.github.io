---
layout: tutorials
permalink: /tutorials/largest-difference-in-array/
title: Largest difference in array
---

<div class="note info">
  <h5>Find the maximum difference between two elements in an array such that larger element appears after the smaller number.</h5>
  <p></p>
</div>


<div class="note unreleased">
  <h5>Approach 1</h5>
  <p>
    Try to think about something better.
  </p>
</div>

**Naive approach**: Since we don't know which number could give us the maximum difference, thus we will try to find out for all numbers what is the maximum difference keeping in mind that greater number occurs later and we will save result.

We can iterate from last in the array and we go on finding the difference between elements, if we find that the new difference obtained is greater then we will update the max_difference.


### Code:


```c
#include<stdio.h>

int get_max_diff(int *arr, int n)
{
    int i, j, max_diff = 0;

    for (i = n-1; i >= 0; --i)
    {
        for (j = i-1; j >= 0; --j)
        {
            if (arr[i] - arr[j] > max_diff)
                max_diff = arr[i] - arr[j];
        }
    }
    return max_diff;
}

int main()
{
    int i, arr[100], n;
    scanf("%d", &n);
    for (i = 0; i < n; ++i)
        scanf("%d", &arr[i]);

    printf("\n%d is the maximum difference \n", get_max_diff(arr, n));
    return 0;
}
```


<div class="note unreleased">
  <h5>Approach 2</h5>
  <p>
    Try to look for simple approach like <code>kadane's algo</code> which can solve problem in linear time.
  </p>
</div>

Using kadane's algorithm to solve this problem:

- Simple idea in Kadane's algo is to look for all positive contiguous segments of the array(max_ending_here is used for this purpose).

- And keep track of maximum sum contiguous segment among all positive segments(max_so_far is used for this).

- Each time we get a positive sum, we compare it with max_so_far and update max_so_far if it is greater than max_so_far.


#### Algo:

**Initialize**:
```c
max_so_far = 0
max_ending_here = 0
```
Loop for each element of the array:

a)
```c
max_ending_here = max_ending_here+a[i];
if(max_ending_here<0) 
{
	max_ending_here = 0
}
```

c)

```c
if (max_so_far < max_ending_here)
{
	max_so_far = max_ending_here;
}

return max_so_far;
```
Above was a normal introduction to Kadane's algo for finding the maximum sum subarray.

Now we can use this approach to find maximum difference in the given array.

Step 1: Create difference array: it has elements as the difference between two successive elements i.e. `diff[i] = arr[i+1]-arr[i];`

Step 2: The maximum sum subarray in difference array is the maximum difference in original array where the greater element comes later than the smaller one.


### Code:


```c
#include<stdio.h>
#include<stdlib.h>

int* get_diff_arr(int *arr, int n)
{
    int i;
    int *diff;
    diff = (int*)malloc((n-1)*sizeof(int));
    for (i = 0; i < n-1; ++i)
    {
        diff[i] = arr[i+1] - arr[i];
    }
    return diff;
}

int get_max_sum_subarray(int *arr, int n)
{
    int max_so_far = 0, max_ending_here = 0, i;
    for (i = 0; i < n; ++i)
    {
        max_ending_here += arr[i];
        if (max_ending_here < 0)
            max_ending_here = 0;
        if (max_ending_here > max_so_far)
            max_so_far = max_ending_here;
    }
    return max_so_far;
}

int main()
{
    int n, i, *arr;
    scanf("%d", &n);
    arr = (int*)malloc(n*sizeof(int));
    for (i = 0; i < n; ++i)
        scanf("%d", &arr[i]);
    int *diff_arr = get_diff_arr(arr, n);// this will have length as one less than the original array.
    int res = get_max_sum_subarray(diff_arr, n-1);
    printf("\n result is %d \n", res);
    return 0;
}

// T.C = O(n)
// S.C = O(n) for diff_arr
```


<div class="note unreleased">
  <h5>Approach 3</h5>
  <p>
    Always to think for solution which works in one iteration for such type of questions.
  </p>
</div>

As we know that we have to find a pair (a, b) s.t. b-a has to be the maximum, the we can maintain we records of maximum difference so far and min previously occurred element as we iterate through the loop.

Eg:

```c
if (arr[i]<min_so_far) 
{
	min_so_far = arr[i];
}

if (arr[i]-min_so_far > max_diff_so_far) 
{
	max_diff_so_far = arr[i]-min_so_far;
}

return max_diff_so_far;
```

### Code:


```c
#include<stdio.h>

int get_max_diff(int *arr, int n)
{
    int i, min_so_far, max_diff_so_far = 0;
    min_so_far = arr[0];
    for (i = 1; i < n; ++i)
    {
        if (arr[i] < min_so_far)
            min_so_far = arr[i];
        if (arr[i] - min_so_far > max_diff_so_far)
            max_diff_so_far = arr[i] - min_so_far;
    }
    return max_diff_so_far;
}

int main()
{
    int i, n, *arr;
    scanf("%d", &n);
    for (i = 0; i < n; ++i)
        scanf("%d", &arr[i]);

    int max_diff = get_max_diff(arr, n);
    printf("\nThe maximum difference b/w two elements in array such that larger\
number appears after the smaller is %d\n", max_diff);
    return 0;
}
```




<div class="note unreleased">
  <h5>Approach 4</h5>
  <p>
    You should probably think of this solution after you think of 1st solution on this post, as in this approach you can solve the problem using auxilary array in linear time.
  </p>
</div>

If you analyse the first approach, you would find out that most of the time was going in search for the minimum element to the left of the current element in loop iteration, so for this purpose you can maintain an auxilary array which will store the minimum element by that position.

For example,
```py
arr = [4, 3, 10, 2, 9, 1, 6]
```

we can have the minimumArray as:

```py
mini = [4, 3, 3, 2, 2, 1, 1]
```

### Code in python:

```py
li = [4, 3, 10, 2, 9, 1, 6]


def makeMinCntArray(li):
    mini = [None]*len(li)
    mini[0] = li[0]
    minimum = li[0]
    for i in range(1, len(li)-1, 1):
        if li[i] < mini[i-1]:
            minimum = li[i]
        mini[i] = minimum
    return mini


def getDiff(li):
    maxDif = 0
    d = makeMinCntArray(li)
    # iterating from last index
    for i in range(len(li)-1, 1, -1):
        dif = li[i] - d[i-1]
        if dif > maxDif:
            maxDif = dif

    return maxDif


theMaxDif = getDiff(li)

print theMaxDif

# time is and extra space is linear
```
