---
layout: tutorials
permalink: /tutorials/bit-manipulation-introduction/
title: Introduction to Bit Manipulation
---

{: .info .note}
**What is bit manipulation?**<br>Lets say we have a number (or any type of data), going into its bit level any trying to manipulate the bits is known as bit manipulation.


## Various Operations

#### 1. AND (`&`):

`pass`

#### 2. OR (`|`):

`pass`

#### 3. Exclusive-OR (XOR), (`^`):

It's also known as `modulo 2 sum` i.e. the remainder which comes after taking the sum of bits and dividing by 2.

```
    0 0 0 1 0 0 1
XOR 1 0 0 1 0 0 0
    -------------
    1 0 0 0 0 0 1
    ------------
```

> NOTE: You can see different numbers XORed results in 1, same number XORed results in 0.

#### 4. Left Shift (`<<`):

- The process of shifting bits to left is known as left shift.

The left shift opeartor causes the bits in the shift expression to be shifted to the left by the number of positions specified by the additive expression.

Eg:

```
		0 1 0 0 0 0 1 1 (67 in decimal)
		----------------
1 left shift:	1 0 0 0 0 1 1 0 (134 in decimal) [0 is added at end]
	      ------------------
2 left shift: 1 0 0 0 0 1 1 0 0 (268 in decimal) [there is increase in bit length, as the number has exceeded 8 bit size i.e. 256]
	      ------------------
```

**NOTES**:
- The bit posision that have neem vaccated by shift opaertor are zero-filled.

- On each shift, we are multiplying the number by 2.

- Left shifting a number with a signed bit number results in undefined behaviour (a garbage value). Ex: `4<<-1` is false statement.


## 5. Arithmetic Right Shift (`>>`):

**Shifting all bits to right**

It's also known as arithmetic shift right.

Eg:

```
		1 0 0 1 0 0 1 (73 in decimal)
		--------------
1 left shift:	0 1 0 0 1 0 0 (36 in decimal) [0 is added at beginning]
	      ----------------
2 left shift:   0 0 1 0 0 1 0 (18 in decimal) [0 is added at beginning]
	      ----------------
```

**NOTE:**

- For unsigned number the bit position that have been vaccated by the shift operation are zero filled.

- For signed number the signed bit is used to fill the vaccated bit positions, in other words, if number if `+ve` then `0` is used and if number is `-ve` then `1` is used.

- On each right shift the number gets divided by `2`.


## 6. Logical Right Shift (`>>>`):

- `>>>` is unsigned-shift i.e. it'll insert `0`.
- `>>` is signed, and will extend the sign bit.

**For example**:

`-2` represented in 8 bits would be `11111110` (because the most significant bit has negative weight). Shifting it right one bit using arithmetic shift would give you `11111111`, or `-1`.

Logical right shift, however, does not care that the value could possibly represent a signed number. It simply moves everything to the right and fills in from the left with `0s`. Shifting our `-2` right one bit using logical shift would give `01111111`.

## 7. Compliment (`~`):

This is like `1's` compliment i.e. whenever we have `0's` we replace it with `1` and vice-versa.






