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

Write a function that accepts a string and returns `true` if it reads the same forward as backward.

First, think that **How is this problem self-similar?**

Can you answer this question by knowing whether some smaller part of the string is palindrome or not?

One way could be comparing the first and the last character in the string, if both of them matches then move forward and compare the second and the second last character in the string, and go on repeating this until you see that left pointer gets equal or exceeds the right pointer.

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

{: .info .note}
Why do you think that I have written `return` before `is_palindome(s, first+1, last-1)`?

The reason for writing `return` is that we want to return the value `True` or `False` to the parent in the recursion call stack. And if we don't return or simply call the function `is_palindrome(s, first+1, last-1)` then there will be a recursion stack which will return `None` to its parent and thus the parent will return `None` to its parent and so on. In the end, you will end up receiving a `None` instead of `True` or `False` from the function.


The recursive nature can also be observed in a way that, we can slice of the first letter and the last letter from the string and compare them if found un-equal then return false otherwise again slice off the first letter and last letter from that string and compare the letters. At some point we have to stop this process, i.e. the base case. **What strings are easy to know if they are palindromes or not?** We can say that one character or an empty string is a palindrome. So, the base case would be if the length of string gets less than 2 we return `true`.

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

## Exercise4: Print Binary

Given an integer, print its binary equivalent.

Example: print_binary(81) = 1010001.

To solve this problem, you wanna ask **How is this problem self-similar?**

- If you solve this problem on paper, then you would get to know the self-similar nature of this problem (and that is division by two and printing `0` or `1` as required)

When we write recursive code, then we usually split our solutions into two cases, the base case and the recursive case. The base case is the easy case, i.e. you have to find which numbers binary are easy to get.

- We know that the binary of `0` is `0` and binary of `1` is `1`. That is, if `n` is less than `2` then I can just print it and this is our base case.
- The recursive case: Think about the chunk of work that a particular call might handle. Here in each call, we can print one digit of the binary representation. And next call will do all but one bit in the remaining representation. Now **Which digit should I print?**

In the example of printing 81's binary equivalent, I want to split `1010001` into two parts where first part would be `101000` and another part would be `1`. So you wanna get the last base 2 digits of a number and print it in the recursion call. For this, you can get the remainder from `2` i.e. if the number is odd the last digit should be `1` else the last digit should be `0`. The rest of the digits would be number divided by `2`.

Example code:

```py
def decimal_to_binary(n):
    # check for negative numbers
    if n < 0:
        print '-',
        # since, I am recusive, so call me
        decimal_to_binary(-n)
    elif n < 2:
        # coz, these number has the same binary representation as the decimal
        print n,
    else:
        decimal_to_binary(n/2)
        print n % 2,  # backtracking here as we print in reverse order


if __name__ == '__main__':
    decimal_to_binary(81)
    print
    decimal_to_binary(-81)
```

Time complexity of the above function is `O(log2(n))` where `n` is the number passed as the argument in the function. The complexity is `O(log2(n))` because in each function call I am reducing the problem size by half. Also, you can try making the recursion call stack using a Tree and then you yourself can observe the number of calls being made. The space complexity is again `O(log2(n))` because here the recursion stack will go `log2(n)` times deeper.

## Exercise5: Reverse Lines

Write a recursive function that accepts a file input stream and prints the line of that file in reverse order.

Example:

Input:

```sh
wo jab hume
aajmate chale gye,
janaab apni hi mushkil
badhate chale gye
```

Output:

```sh
badhate chale gye
janaab apni hi mushkil
aajmate chale gye,
wo jab hume
```
To solve this problem just use recursion.

Once you know that **how the problem is self-similar?** then try to get the two cases (base case and recursive case).

- Base case: **what is a file that is easy to reverse?** It's the file containing one line of no line in it.

- Recursive case: we can print one line in one call of the function and leave the rest to the later calls.

Example code:

```py
'''
print the lines in reverse order, where we are given with set of lines
'''


def print_reverse_lines_helper(content, cnt):
    if cnt >= len(content)-1:
        print content[cnt]
    else:
        print_reverse_lines_helper(content, cnt+1)
        print content[cnt]


def print_reverse_lines(s):
    with open(s) as f:
        content = f.readlines()
    # remove the newlines from list content
    content = [x.strip() for x in content]
    print_reverse_lines_helper(content, 0)


if __name__ == '__main__':
    print_reverse_lines('./textfile.md')
```

In cpp:

```cpp
#include<iostream>
#include<fstream>

void reverse_lines(std::ifstream& input)
{
    std::string line;
    if (std::getline(input, line))
    {
        // there is a line
        reverse_lines(input);
        std::cout<<line<<std::endl;  // backtracking
    }
}

int main()
{
    std::string path = "./../python/textfile.md";
    std::ifstream reading_file;
    reading_file.open(path);
    reverse_lines(reading_file);
}
```

Time complexity = `O(n)`, where `n` is the number of lines in the file, here `n` number of function calls takes place.

Space complexity = `O(n)`

## Exercise6: Crawl

Write a function that accepts a file name as a parameter and prints information about that file.

- If the filename represents a normal file then just print its name.
- If the name represents a directory, print its name and information about every file/ directory inside it, indented.

Example:

Input:

```sh
/home/aupadhyay/next-py/graphs
```

Output:

```sh
     graphs.pyc
     test_cases
         test5_haspath.py
         test4_topological.py
         test3_graphs.py
         test6_has_cycle_undirected.py
         test1_graphs.py
         test2_graphs.py
     graphs.py
     README.md

```

This problem is self-similar in the way that a directory can have another directory and which can have other directories.

The base case in this problem would be printing the file name if it's not a directory.

If the filename is a directory, then print all the stuff inside that directory and note that you again need to `crawl` (i.e. recursively call) on the directories.

Example code:

```py
'''
print information about this file,
and (if it's a directory) any files inside it print them
'''
from __future__ import print_function
import os
import os.path


def indent(n):
    for i in range(n):
        print ('    ', end='')


def crawl(filename, indent):
    # indent(indent_cnt)
    print (indent, os.path.basename(filename))
    # base case, when we encounter a file path we should be printing it
    if os.path.isfile(filename):
        pass
    else:
        # since, its a directory so do recusive call
        # a dir can have file and sub dirs into it, so call crawl on all
        # the contents inside the dir

        # ignoring .git dir
        if '.git' in filename:
            return
        files = os.listdir(filename)
        for f in files:
            # print the file name (f) and call crawl passing them
            # print f
            # NOTE: pass the complete path, if you just pass 'f' then
            # you will face OSError exception as just 'f' won't be a file
            # and thus when os.listdir() is called on 'f', so it will throw
            # exception
            crawl(filename + '/' + f, indent+'    ')


if __name__ == '__main__':
    # dirname = './../'
    dirname = '/home/aupadhyay/next-py/'
    crawl(dirname, '')
```
