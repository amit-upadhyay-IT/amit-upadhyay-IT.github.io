---
layout: tutorials
permalink: /tutorials/recursion-introduction/
title: All about Recursions
---

{: .info .note}
**In order to understand recursion you must first understand recursion**

**Recursion:** Defining an opration in terms of itself. 

**Recursive Programming:** Writing functions that call themselves to solve problem recursively. 

- With recursion you can solve the problem by solving the smaller occurrences of the problem. Recursions can help solve certain kind of problems.


## Example1: Count people in a column.

Suppose that you are sitting in a first row and you want to know how many people are sitting behind you. But you can see the person sitting on the last person so you are allowed to ask the person sitting just behind you. How would you count the number of people sitting behind you?

If you want to solve this problem recursively then you need to describe the task in terms of itself i.e. ask the problem to the person sitting next to you. He will ask the same problem to the person sitting next to him and so on... The person sitting at the end will know that there is nobody sitting behind so he/she will reply `0` to the person ahead and the second last person will reply 1 to the person sitting ahead. In this way, we first person will get to know how many people are sitting behind. If you ask someone "How many people are behind you?", then they answer that by asking someone else "How many people are behind you?", i.e. they describe the solution to their problem interms of the same problem itself.

Each recursive algorithm involves two cases:

1. **Base case**: A simple occurrence that can be answered directly.
2. **Recursive case**: A more complex occurrence of the problem that cannot be directly answered, but can insted be described in terms of smaller occurrences of the same problem.

Note that the base case in this recursion is when the last person says that there is nobody behind me.

{: .info .note}
**Ask yourself, `How is this task self-similar?`**

So, let's try to implement this in a program.

```py
import random


# count consequitive ones
def count_it(li, ind):
    # base case: when we found that next number if zero
    if li[ind] == 0:
        return 0
    else:
        # val = count_it(li, ind+1)
        # val = val + 1  # backtracking
        # return val  # backtracking
        return 1 + count_it(li, ind+1)


if __name__ == '__main__':
    n = random.randint(3, 66)
    li = [0]*2*n
    li[0:n] = [1]*n  # 1 represents the people in the row, among 2n capacities
    if n == count_it(li, 0):
        print 'success'
    else:
        print 'its not possible'
```

## Exercise2: Power function

Write a recursive function to find the `y`th power of a number `x`.

- Here the base case would be the one whose answer you already know. We know the 0th power of any number is one.
- The recursive case would describing the problem interms of itself, i.e. asking the power of the number one less than the current number and multiplying that with the current number.

The recurrence relation would look like:

```sh
pow (n) = n*pow (n-1)
```

Let's write the code for this:

```py

# calculates x^y
def power(x, y):
    if y == 0:
        return 1
    else:
        ret = power(x, y-1)
        ret = ret * x  # backtracking
        return ret  # backtracking
        # return x * power(x, y-1)
```

Well, this recursive function is slower. Its **time complexity is O(n)**.

Let's try to see the call stack made interms of a tree.

```
              6^7	-----------> returns 6*46656 to main function
              /
            6^6		-----------> returns 6*7776
            /
          6^5		-----------> returns 6*1296
          /
        6^4		-----------> returns 6*216
        /
      6^3		-----------> returns 6*36
      /
    6^2			-----------> return 6*6
    /
  6^1			-----------> return 6*1
  /
6^0 			-----------> returns 1 to the parent node
```

We can optimize this above program more.

Note that to calculate `6^4`, you don't need to calculate all `6^3`, `6^2`, `6^1` and `6^0`. You can just calculate `6^2` and multiply it with itself i.e. `6^2`.

Here is recursive cases will get split into two parts:

- When the exponent is odd.
- When the exponent is even.

In case of odd exponent we will try to make it even, as any odd number is nothing but `1 + some even number`.

Example code:

```py
def power(x, y):
    if y == 0:
        return 1
    elif y & 1:  # i.e. odd
        return x * power(x, y-1)
    else:  # even power
        return power(x, y/2) * power(x, y/2)
```

The time complexity will still be the same i.e. **O(n)** because we are still computing the same number of opreations, but the recursion stack space will get reduces to **O(log2(n))**. We can reduce the time complexity to **O(log2(n))** by computing the value just once and storing the computed value in the same stack.

Let's look at the recursion stack using a binary tree (as two branches can be formed).


```
                      6^21
                      /
                     6^20
                  /       \
               6^10       6^10
              /    \      /  \
            6^5    6^5   6^5  6^5 
            / \     /\  /\    /\
          6^4 6^4  6^4 ............
          /  \ 
        6^2  6^2 ............
        / \
      6^1  6^1 ............
```

The more optimized code with time complexity **O(log2(n))**:

```py
# time = O(log2(n))
def power_optimized(x, y):
    if y == 0:
        return 1
    p = power_optimized(x, y/2)
    if y & 1:  # i.e. odd
        return x * p * p
    else:
        return p * p
```

Here the value gets computed only once and it can be used again in the same stack at the time of backtracking. So time complexity is **O(log2(n))**.

## Example 3: Palindrome

Write a function that accepts a string and returns `ture` if it reads the same forward as backwards.

First, think that **How is this problem self-similar?**

Can you answer this question by knowing whether some smaller part of the string is palindrome or not?

One way could be comparing the first and the last character in the string, if both of them matches then move forward and compare the second and the second last character in the string, and go on repeating this untill you see that left pointer gets equal or exceeds the right pointer.

So, the base case might be the case when we see that the left pointer exceeds the right pointer. The `left` and `right` pointer is nothing but two pointers pointing to the left character and right character of the string.

Example in python:

```py
def is_palindome(s, first, last):
    s = s.lower()
    if s[first] != s[last]:
        return False
    elif first >= last:
        return True
    else:
        return is_palindome(s, first+1, last-1)
```
The recursive nature can also be observed in a way that, we can slice of the first letter and the last letter from the string and compare them, if found un-equal then return false otherwise again slice of the first letter and last letter from that string and compare the letters. At some point we have to stop this process, i.e. the base case. **What strings are easy to know if they are palindromes or not?** We can say that a one character or an empty string is palindrome. So, the base case would be if the length of string gets less than 2 we return `true`.

Example code:

```py
def is_palin(s):
    s = s.lower()
    if len(s) < 2:
        return True
    else:
        f_char = s[0]
        l_char = s[-1]
        if f_char is l_char:
            return is_palin(s[1:-1])
        else:
            return False
```

The **time complexity** for the above function is `O(n)`, where `n` is the length of the string to be checked.

Also, if you make the recursion call stack using the tree, then you will find that a skewed tree will be formed (as there is single recursion involved). So **Space complexity** is `O(n)`, note that is the space which is being formed by the programming stack.
