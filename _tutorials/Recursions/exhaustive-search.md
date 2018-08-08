---
layout: tutorials
permalink: /tutorials/exhaustive-search/
title: Exhaustive Search
---

{: .info .note}
**Exploring every possible combination from a set of choices or values.**

The linear search is also an example of exhaustive search because here we are looking at all the numbers present in the list. Sometimes its hard to enumerate all of the choices. For example, printing all possible groups in a list of integers where each group may consist up to 15 elements.

Recursion is a really good algorithmic pattern for performing an exhaustive search.

Famous application:- Producing all permutations of a set of values.

### General pattern:


```yml
Search(decisions, prefix):
  - if there are no more decisions to make: stop and print prefix
  - else, let's handle one decision ourselves i.e. update prefix (as the prefix
    is the one which stores one of the possibilities), and rest by recursions
    for each available choice C for this decision.
      - choose C and add or append it to the prefix.
      - Search the remaining decisions that could follow C.
```

**What is prefix above?**

`prefix` is really important thing. It is some data storage entity, it can be a string or a vector and any other type which may store one of the possible output in some call stack out of many call stacks. This parameter is remembering a set of choices we have made before the current call. If the prefix has `3` characters in it that means there were `3` calls before the current call of the function and those characters of that string (or set) represent the choices that were made by those calls. And I am gonna use the `prefix` and the current solution (number or char of the current subproblem) to contribute overall answer to the problem. At some point you get to the point where `prefix` is whole answer.

- Often the search space consists of many decisions, each of which has several available choices. Example: When enumerating all 5-letter string, each of the 5-letter is a decision, and each of those decision has 26 possible choices.


## Example 1: print binary

{: .info .note}
Write a recursive function that accepts an integer number of digits and prints all binary number that have exactly that many digits.

If input = 3,

then, output:

```
000
001
010
011
100
101
110
111
```

The task is to print all the binary numbers of exactly `3` length.

To solve such problems, you can think of the self-similarity in the problem and then write the recursive case, i.e. how is printing `3` digit binary numbers similar to printing `2` digit binary number.

**Example**:

<div class="mobile-side-scroller">
<table>
  <thead>
    <tr>
      <th>2 digit binary number</th>
      <th>3 digit binary number</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><p><code>00</code></p></td>
      <td><p>

    <code>000</code>

      </p></td>
    </tr>
    <tr>
      <td><p><code>01</code></p></td>
      <td><p>

       <code>001</code>

      </p></td>
    </tr>
    <tr>
      <td><p><code>10</code></p></td>
      <td><p>
    <code>010</code>

      </p></td>
    </tr>

    <tr>
      <td><p><code>11</code></p></td>
      <td><p>
    <code>011</code>

      </p></td>
    </tr>

    <tr>
      <td><p><code>10</code></p></td>
      <td><p>
    <code>010</code>

      </p></td>
    </tr>

    <tr>
      <td><p><code></code></p></td>
      <td><p>
    <code>100</code>

      </p></td>
    </tr>

    <tr>
      <td><p><code></code></p></td>
      <td><p>
    <code>101</code>

      </p></td>
    </tr>

    <tr>
      <td><p><code></code></p></td>
      <td><p>
    <code>110</code>

      </p></td>
    </tr>

    <tr>
      <td><p><code></code></p></td>
      <td><p>
    <code>111</code>

      </p></td>
    </tr>
  </tbody>
</table>
</div>

Observe that the `2nd` and `3rd` digit of 3 digit binary numbers are nothing but the 2 digit binary numbers, so we can say that the 3 digit binary number is nothing but the 2 digit binary number but preceded by either `0` or `1`. Now, you can easily write the recursive case.

Let's look at the base case, we can keep a counter which will keep count of the number of digits required to print the output and as soon as the counter becomes equal to the required length binary digit then print the output. But, I know you would ask what is `output`? The `output` is a storage entity which will store the possible binary numbers.

With this much of hint try to solve the problem on your own.

If you have solved it then you are doing great. But if you are stuck it's okay because it's a different kind of recursion problem where you might need the help of the above general proposed algorithm.

Also, there is one more interesting approach which I like very much. In this approach, you create a tree which will represent the solution and then write the code for that.

Example:

The solution in form of a tree can be represented as:

Let, input = 3
```

                      3
                   /     \
                  0       1
                 / \     / \
                0   1   0   1
               / \ / \ / \ / \
              0  1 0 1 0 1 0 1
```

Now, if you see there are total `8` leaves, thus there are `8` three-digit possible binary numbers that can be formed. You can get the solution on traversing from the root to the leaf node. Now, writing code for this becomes very easy.

The possiblities are:
```
    000
    001
    010
    011
    100
    101
    110
    111
```

To get the possible solutions, you can have a counter which will take care for the number of levels reached in the tree (this variable is referred as `decision` in the above general algorithm) and you need one more storage entity which will store the previous occurrences (i.e. `0` and `1` occurrent in the path from root to leaf. Also, this is referred as `prefix` in the above proposed general algorithm).

`prefix` is really important thing. This parameter is remembering a set of choices we have made before the current call. If the prefix has `2` characters in it that means there were `2` calls before the current call of the function and those characters of that string represent the choices that were made by those calls. And now you can use the `prefix` and the current number to contribute overall answer to the problem. At some point you will see that `prefix` will be the `3` digit binary number and that would be the base case.

Example code:

```py
def indent(n):
    for i in xrange(n):
        print '    ',


def print_binary(n, prefix):
    indent(len(prefix))  # indentation purpose i.e. for better understanding
    # printing the call stack
    print 'print_binary(', n, ',', prefix, ')'
    # base case, when n becomes 0 i.e. prefix will have length = actual n
    if n == 0:
        print prefix
    else:
        # form the two branches of the tree, i.e one for 0 and other for 1
        print_binary(n-1, prefix + '0')
        print_binary(n-1, prefix + '1')


if __name__ == '__main__':
    print_binary(3, '')
```

Let me give you a simple way to observe such recursions more deeply. You can print the recursion stack on the console and observe how the function calls are being made. Below is an example:

```
print_binary( 3 ,  )
     print_binary( 2 , 0 )
          print_binary( 1 , 00 )
               print_binary( 0 , 000 )
000
               print_binary( 0 , 001 )
001
          print_binary( 1 , 01 )
               print_binary( 0 , 010 )
010
               print_binary( 0 , 011 )
011
     print_binary( 2 , 1 )
          print_binary( 1 , 10 )
               print_binary( 0 , 100 )
100
               print_binary( 0 , 101 )
101
          print_binary( 1 , 11 )
               print_binary( 0 , 110 )
110
               print_binary( 0 , 111 )
111
```

In the recursion call stack `print_binary( 1 , 00 )` mean that `1` number of digit is left to be accounted for. If you are left with `print_binary( 0 , 000 )`, it means that the `prefix` contains all the necessary digits and there are `0` of them left, so this is why I consider `n == 0` as the base case.

- Time complexity = `O(2^n)`, where `n` is the number of digits in binary number.

You can say this time complexity just by watching the above recrusion tree as there are `2^n` possible output and to get to each output you need `O(n)` time, i.e. overall time complexity would be `O(n*2^n)` or you can ignore `n` and say time complexity = `O(2^n)`.

Still, I want to write a recurrence relation for the above function and solve it and get the time complexity.

Recurrence relation:

```
T(n) = 1; n is 0
     = T(n-1) + T(n-1); otherwise
```

or

```
T(n) = 1; n is 0
     = 2*T(n-1); otherwise
```

Now you can easily solve this recurrence relation (or use Masters theorem for the fast solution). You will get the time complexity as **O(2^n)**.

Solving the recurrence relation:

```
T(n) = 2T(n-1)
     = 2(2T(n-1-1) = 4T(n-2)
     = 4(2T(n-3)
     = 8T(n-3)
     = 2^k T(n-k), for some integer `k` ----> equation 1
```

Now we are given the base case where n is 0, so let,

```
n-k = 0 , i.e. k = n;
```

Put k = n in equation 1,

```
T(n) = 2^n * T(n-n)
     = 2^n * T(0)
     = 2^n * 1; // as T(0) is 1
     = 2^n
```

So, **T.C = O(2^n)**


- Space complexity = `O(n)` because there are `n` level deep recursion being made.


## Example 2: Print Decimal

{: .info .note}
Write a recursive function that accepts an integer number of digits and prints all binary number that have exactly that many digits.

This is similar to the above problem except the fact that here we need to form `10` branches in the recursion tree insted of `2`.

Example code:

```py
def indent(n):
    for i in xrange(n):
        print '    ',


def print_decimal(n, prefix):
    # indent(len(prefix))  # indentation purpose i.e. for better understanding
    # printing the call stack
    # print 'print_decimal(', n, ',', prefix, ')'
    # base case, when n becomes 0 i.e. prefix will have length = actual n
    if n == 0:
        print prefix
    else:
        # form the ten branches of the tree, i.e one for 0 and other for 1
        for i in range(10):
            print_decimal(n-1, prefix + str(i))


if __name__ == '__main__':
    print_decimal(5, '')
```

- Time complexity = `O(10^n)`, where `n` is the number of digits in decimal number.

You can say this time complexity just by watching the above recrusion tree as there are `10^n` possible output and to get to each output you need `O(n)` time, i.e. overall time complexity would be `O(n*10^n)` or you can ignore `n` and say time complexity = `O(10^n)`.

Recurrence relation:

```
T(n) = 1; n is 0
     = T(n-1) + T(n-1) + T(n-1) + T(n-1) ..... + T(n-1).... 10 times ; otherwise
```

or

```
T(n) = 1; n is 0
     = 10*T(n-1); otherwise
```

Now you can easily solve this recurrence relation (or use Masters theorem for the fast solution). You will get the time complexity as **O(2^n)**.

Solving the recurrence relation:

```
T(n) = 10T(n-1)
     = 10(10T(n-1-1) = 100T(n-2)
     = 100(10T(n-3)
     = 1000T(n-3)
     = 10^k T(n-k), for some integer `k` ----> equation 1
```

Now we are given the base case where n is 0, so let,

```
n-k = 0 , i.e. k = n;
```

Put k = n in equation 1,

```
T(n) = 10^n * T(n-n)
     = 10^n * T(0)
     = 10^n * 1; // as T(0) is 1
     = 10^n
```

So, **T.C = O(10^n)**


- Space complexity = `O(n)` because there are `n` level deep recursion being made.


## Example 3: Dice rolls

{: .info .note}
Write a recursive function that accepts an integer representing a number of 6-sided dice to roll, and output all the possible combinations of values that could appear on the dice.

Example:

Input = 2

Output:

```
[1, 1] [1, 2] [1, 3] [1, 4] [1, 5] [1, 6] [2, 1] [2, 2] [2, 3] [2, 4] [2, 5] [2, 6]
[3, 1] [3, 2] [3, 3] [3, 4] [3, 5] [3, 6] [4, 1] [4, 2] [4, 3] [4, 4] [4, 5] [4, 6]
[5, 1] [5, 2] [5, 3] [5, 4] [5, 5] [5, 6] [6, 1] [6, 2] [6, 3] [6, 4] [6, 5] [6, 6]
```

Here we want to generate all possible sequence of values.

```cpp
for (each possible first die value):
    for (each possible second die value):
        for (each possible third die value):
	    ----
		print
```

This is like **depth-first-search**.

- You may think that for loops can be used to solve this problem, but you don't know how many for loops are needed.

Also, there are large search space so exploring them is difficult using for loops.

Example of search space using tree:

```
                    -
            /   /  / \  \   \
           1   2  3   4  5   6
        / / /\ \ \
       1,2,3,4,5,6.......... each node is going to have 6 child.
```

This is a huge search space. This is also a type of exhaustive search problem. So you can first make the recursion tree and then code it.

Here, I will use `prefix` to store the task done by previous calls and as soon as the counter gets to `0` from `n` I will print the `prefix`.

Example code:

```py
def dice_roll(n, prefix):
    # base case, i.e. n goes down to 0
    if n == 0:
        print prefix.rstrip(',')  # for stripping out the righmost ,
    else:
        # call the same function 6 times with each possible value of prefix
        for i in range(1, 7):
            dice_roll(n-1, prefix + str(i) + ',')


if __name__ == '__main__':
    dice_roll(2, '')
```

- Time complexity = `O(6^n)`, where `n` is the number of dice rolled.

You can say this by looking at the recursion tree, also, you can get t.c using recurrence relation as I have done above.

- Space complexity = `O(n)` because there are `n` level deep recursion being made.
