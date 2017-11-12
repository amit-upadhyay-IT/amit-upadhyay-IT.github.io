---
title: 'An editorial on finding the prime number with least time complexity'
date: 2016-05-22 12:01:40 +0200
author: amit-upadhyay-it
categories: [algorithm]
---

- The algorithm can be improved further by observing that all primes are of the form 6m ± 1, with the exception of 2 and 3.
- This is because all integers can be expressed as (6m + i) for some integer k and for i = −1, 0, 1, 2, 3, or 4; 2 divides (6m + 0), (6m + 2), (6m + 4); and 3 divides (6m + 3).
- So a more efficient method is to test if n is divisible by 2 or 3, then to check through all the numbers of form 6m ± 1 ≤ √n(sqrt(n)).
- This is 3 times as fast as testing all m up to √n.

```c
int CheckPrime(unsigned int number) {
    if (number <= 3 && number > 1) 
        return 1;            // as 2 and 3 are prime
    else if (number%2==0 || number%3==0) 
        return 0;     // check if number is divisible by 2 or 3
    else {
        unsigned int i;
        for (i=5; i*i<=number; i+=6) {
            if (number % i == 0 || number%(i + 2) == 0) 
                return 0;
        }
        return 1; 
    }
}
```

- This code is written in C, in java we don't have unsigned keyword(however in java 8 it is included).

Thank you 🎂 👏
