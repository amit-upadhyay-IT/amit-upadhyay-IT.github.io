---
layout: tutorials
permalink: /tutorials/backtracking/
title: Backtracking
---

{: .info .note}
**Finding solutions by trying partial solutions and then abandoning them if they are not suitable.**

- It is often implemented recursively.
- It is generally used when we the solution can be expressed as a set of tuples (or list of n elements)

Example:

- Producing all permutations of a set of values.
- Games: Suduko, word jumbles, etc
- Escaping from a maze.

**A general pseudo-code algorithm for backtracking problems:**

```yml
Explore(decisions):
  - if there are no more decisions to make: stop
  - else, let's handle one decision ourselves and rest by recursions
    for each available choice C for this decision.
      - choose C.
      - Explore the remaining decisions that could follow C.
      - Un-choose C.  # backtracking
```

Your code should have the above form. While writing the code there may be some little variations too.

**NOTE**: In case of backtracking usually the extra parameter that we add in the function is meant to remember things that we have chosen on previous calls.

The [dice roll problem](http://binomial.me/tutorials/exhaustive-search/#example-3-dice-rolls) can also be solved using backtracking concept where we choose (add to the list), explore (handle one case and call the same function for rest cases), and un-choose (remove our choice). Below is the example code.

```py
def dice_roll2(n, lis):
    if n == 0:
        print lis
    else:
        for i in xrange(1, 7):
            # choose
            lis.append(i)
            # explore
            dice_roll2(n-1, lis)
            # un-choose
            lis.pop()  # removing from last
```

The above code might make more sense as compared to the code written in the [example 3 of exhaustive search](http://binomial.me/tutorials/exhaustive-search/#example-3-dice-rolls) tutorial because here I am un-choosing the last explored choice.

But, do you think popping out the last element is required?
Actually, we have not used list `lis` after popping out the last element out of it. So, popping out is just another extra operation we are performing in above code. The updated value of `lis` list is going to persist in the recursion call stack, so it's better to update only if we need to use.

For example, when I append the `i` in the `lis` then I know that it is going to be used in the same recursion call stack, but after popping out the element, the `lis` isn't going to be used in that call stack as well as the subsequent call stacks.

I wouldn't like to use backtracking approach to solve this problem because here I need to explore every possibility thus, its like an exhaustive-search problem.

Let's look at a slightly modified problem statement.

{: .info .note}
Write a recursive function that accepts an integer (representing a number of 6-sided dice to roll) and a value (desired sum), and prints all the combinations that add up to exactly the desired sum.

To solve this problem one can just edit the above code and before printing the `lis` in the base case just check if the sum of elements in lis becomes equal to desired sum or not.

For example:

Input: n = 3, desired sum = 6

Output:
```
[1, 1, 4]
[1, 2, 3]
[1, 3, 2]
[1, 4, 1]
[2, 1, 3]
[2, 2, 2]
[2, 3, 1]
[3, 1, 2]
[3, 2, 1]
[4, 1, 1]
```

```py
def dice_sum_helper(n, desired_sum, lis):
    if n == 0:
        # checking if sum of elements in lis is equal to desired_sum
        if sum(lis) == desired_sum:
            print lis
    else:
        for i in xrange(1, 7):
            # choose
            lis.append(i)
            # explore
            dice_sum_helper(n-1, desired_sum, lis)
            # un-choose
            lis.pop()  # removing from last


def dice_sum(n, desired_sum):
    dice_sum_helper(n, desired_sum, [])


if __name__ == '__main__':
    dice_sum(3, 6)
```

But the above code is a very bad solution to the problem. Here we are exploring every possible branch. The above solution is inefficient. In backtracking problems we might need to explore a big tree of possiblities but it's really important to limit the possible options (if possible) because if you don't constraint yourself a little bit then the code will take long execution time.

If you make the decision tree or the recursion call stack tree, you will find many branches which are wasteful because they are not likely to lead to a successful outcome.

You can try counting the number of times the above function `dice_sum_helper` is being executed.
