---
layout: tutorials
permalink: /tutorials/majority-element-in-array/
title: Majority element in array
---

<div class="note info">
  <h5>Given an array A of size n, find an element that occurs more than n/2 times?</h5>
  <p></p>
</div>


<div class="note unreleased">
  <h5>Approach 1</h5>
  <p>
    2nd part of MVA is must.
  </p>
</div>

The problem can be solved using Moore Voting Algorithm (MVA).

In this algorithm every element will try to up-vote itself.

This is a two step process: 

a) First part of running MVA only gives you a candidate which occurs most number of time in the given array. Notice 'MOST' here.

b) In second part, we need to iterate over the array once again to determine if this candidate occurs more than n/2 or not.

For implementation, we just need to maintain two variables `voter` and `votes`.

The voter may cancel someone's else vote or it may up-vote itself. If the votes become zero, then we change the voter to the current element. So simple, right?

### Code:


```c
/*
 * moore voting algo
 * two steps: find major candidate, check if thats the majority or not
 * */
#include<stdio.h>
#include<stdlib.h>

int get_majority_candidate(int *arr, int n)
{
    int i;
    int current_element = arr[0], element_vote = 1;

    for (i = 1; i < n; ++i)
    {
        if (arr[i] == current_element)
            element_vote++;
        else
        {
            // now two cases may aries, element_vote can be greater than 0 or can be 0; if it is 0
            // then change the current_element to arr[i];
            if (element_vote == 0)
            {
                 current_element = arr[i];
                 element_vote++;
            }
            else
                element_vote--;
        }
    }
    return current_element;
}

int check_if_major(int *arr, int n, int candidate)
{
    int i, count = 0;
    for (i = 0; i < n; ++i)
        if (arr[i] == candidate)
            count++;
    return (count > n/2)?1:0;
}

int main()
{
    int *arr, n, i;
    scanf("%d", &n);
    arr = (int*) malloc(n*sizeof(int));
    for (i = 0; i < n; ++i)
        scanf("%d", &arr[i]);
    int majority_candidate = get_majority_candidate(arr, n);
    int val = check_if_major(arr, n, majority_candidate);
    if (val)
        printf("\n%d is the majority candidate \n", majority_candidate);
    else
        printf("\nThere are no majority element in the array \n");
    return 0;
}
```
