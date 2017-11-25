---
title: 'Get familiar with strings'
date: 2016-02-01 12:01:40 +0200
author: amit-upadhyay-it
categories: [python]
---

In python, consecutive sequence of characters is known as a string. An individual character in a string is accessed using a subscript (index). The subscript should always be an integer (positive or negative). A subscript starts from 0.

```sh
# Declaring a string in python
>>>myfirst=“Save Earth”
>>>print myfirst
```

To access the last character of the string

```sh
>>>print myfirst[-1]
h
```

To access the third last character of the string

```sh
>>>print myfirst[-3]
r
```
**Important points about accessing elements in the strings using subscripts**

- Positive subscript helps in accessing the string from the beginning.
- Negative subscript helps in accessing the string from the end.
- Subscript 0 or –ve n(where n is length of the string) displays the first element.
- Subscript 1 or –ve (n-1) displays the second element.

> **Note**: Python does not support character data type. A string of size 1 can be treated as characters.

### Creating and initializing strings

A literal/constant value to a string can be assigned using:
- single quotes
- double quotes
- triple quotes.
- By invoking raw_input() method

Example:

```sh
>>>raw_input()
Right to education
'Right to education'
```
As soon as the interpreter encounters `raw_input` method, it waits for the user to key in the input from a standard input device (keyboard) and press Enter key. The input is converted to a string and displayed on the screen.

- By invoking input() method.

Example:

```sh
>>>str=input("Enter the string")
Enter the string hello
NameError: name 'hello' is not defined
```

Python interpreter was not able associate appropriate data type with the entered data. So a `NameError` is shown. The error can be rectified by enclosing the given input i.e. hello in quotes as shown below.

```sh
>>>str=input("Enter the String")
Enter the String "Hello"
>>> print str
Hello
```

### Strings are immutable

Strings are immutable means that the contents of the string cannot be changed after it is created.

Let us understand the concept of immutability with help of an example.

```sh
>>>str='honesty'
>>>str[2]='p'
# TypeError: 'str' object does not support item assignment

```

Python does not allow the programmer to change a character in a string. As shown in the above example, `str` has the value `honesty`. An attempt to replace `n` in the string by `p` displays a `TypeError`.

### Traversing a string
Traversing a string means accessing all the elements of the string one after the other by using the subscript. A string can be traversed using: for loop or while loop.

#### String traversal using for loop

```sh
A=‟Welcome‟
>>>for i in A:
	print i
```

#### String traversal using while loop

```sh
A=‟Welcome‟
>>>i=0
>>>while i<len(A)
	print A[i]
```

### Strings Operations

- `+` (Concatenation)
- `*` (Repetition ) : The * operator repeats the string on the left hand side times the value on right hand side.
- `in` (Membership)
- `not in`
- `range (start, stop[,step])`: This function is already discussed in previous chapter.
- `Slice[n:m]`: The Slice[n : m] operator extracts sub parts from the strings.

#### More on string Slicing

Consider the given string

```py
A = 'Save Earth'
```

Let's understand Slicing in strings with the help of few examples.

```sh
>>>A=‟Save Earth‟
>>> print A[1:3]
av
```
The print statement prints the substring starting from subscript 1 and ending at subscript 3 .

```sh
>>>print A[3:]
'e Earth'
```
Omitting the second index, directs the python interpreter to extract the substring till the end of the string.

```sh
>>>print A[:3]
Sav
```
Omitting the first index, directs the python interpreter to extract the substring before the second index starting from the beginning.

```sh
>>>print A[:]
'Save Earth'
```
Omitting both the indices, directs the python interpreter to extract the entire string
starting from 0 till the last index

```sh
>>>print A[-2:]
'th'
```

For negative indices the python interpreter counts from the right side (also shown
above). So the last two letters are printed.

```sh
>>>Print A[:-2]
'Save Ear'
```

Omitting the first index, directs the python interpreter to start extracting the substring form the beginning. Since the negative index indicates slicing from the end of the string. So the entire string except the last two letters is printed.


#### String methods & built in functions

- len()
- capitalize()
- find(sub[,start[, end]])
- isalnum()
- isalpha()
- isdigit()
- lower()
- islower()
- upper()
- isupper()
- lstrip()
- rstrip()
- isspace()
- istitle()
- replace(old, new)
- join ()
- swapcase()
- partition(sep)
- split([sep[,maxsplit]])


> **Note**: In the table given above, len( ) is a built in function and so we don‟t need import the string module. For all other functions import string statement is required for their successful execution.


### Lets discuss some interesting strings constants defined in string module:

`string.ascii_uppercase`:

The command displays a string containing uppercase characters .

`string.ascii_lowercase`:

The command displays a string containing all lowercase characters .

`string.ascii_letters`:

The command displays a string containing both uppercase and lowercase characters.

`string.digits`:

The command displays a string containing digits.

`string.hexdigits`:

The command displays a string containing hexadecimal characters.

`string.octdigits`:

The command displays a string containing octal characters.

`string.punctuations`:

The command displays a string containing all the punctuation characters.

`string.whitespace`:

The command displays a string containing all ASCII characters that are considered whitespace. This includes the characters space, tab, linefeed, return, formfeed, and vertical tab.

`string.printable`:

The command displays a string containing all characters which are considered printable like letters, digits, punctuations and whitespaces.

>Note: Import string module to get the desired results with the commands mentioned above.


Thank you 🎂 👏
