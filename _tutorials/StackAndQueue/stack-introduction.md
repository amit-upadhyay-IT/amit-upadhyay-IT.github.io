---
layout: tutorials
permalink: /tutorials/stack-introduction/
title: Stack Introduction
---

{: .info .note}
**What is Stack?**<br>LIFO (Last In First Out) data structure. A stack is same as list but with the restriction that the insertion and deletion can be performed only from one end of the list. That end is also known as top of stack.


## Applications of stack:

- Parsing, eg: [compiler parsing the indentation in python](http://www.secnetix.de/olli/Python/block_indentation.hawk)
- Recursion
- Infix to postfix
- Editors
- Browsers
- Tree and Graph traversals


## Implementation of stack

#### 1. Array

Array implementation has a issue, which is we should always know the maximum size upto which the stack should be grown. So if we are able to predict the worst case size of the stack then we should go with Array implementation. Advantage of using stack is that its implementation is faster.


**POINTS**:

- Various operations being performed on stack are a constant time operation.

#### Various operations:

- Push
- Pop
- Top
- IsEmpty

#### Operations (array implementation)

#### Push

To insert into the stack we just need to 

```c
void push(int data)
{
    top == (MAX_SIZE-1) ? printf("\nOverflow"):(arr[++top] = data);
}
```

`top` indicates the top index of the stack.

#### Pop

To remove from the stack we just need to decrement the index which is representing the top of the stack.

```c
void pop()
{
    top == -1?printf("\nUnderflow"):top--;
}
```

#### Top

```c
int top()
{
    return (top == -1)? 0:(arr[top]);

}
```

#### IsEmpty

```c
int is_empty()
{
    return top == -1?1:0;
}
```

#### PrintStack

```c
void print_stack()
{
    for (int i = 0; i <= top; ++i)
        printf("%d ", arr[i]);
    printf("\n");
}
```

If you do it `pythonic way` then the above mentioned code is not at all for use because python has it's own implementation of list which are dynamic in nature (i.e. you can add or remove elements as per your requirement).

#### 2. Linked List (heap memory) implemenetation

If we don't know the size of the stack required then we sould use the linked list implementation because we can do dynamic memory allocation of structures.

Here we have two optaions: insert or delete from beginning or from end. But as we know that the opeartions on stack are constant time operations so insertion and deleting from beginning of the linked list is preferable. `head` of the linked list would be the top of the stack.

#### C++ implementation:

```cpp
#include<iostream>
#include<stdlib.h>

struct node{
    int data;
    struct node*  next;
};

class Stack
{
    private:
        struct node* top;
    public:
        Stack()
        {
            top = NULL;
        }

        void push(int data)
        {
            node* new_node = new node;
            new_node->next = top;
            new_node->data = data;
            top = new_node;
        }

        void pop()
        {
            if (!top)
                return ;
            struct node* temp = top;
            top = top->next;
            free(temp);
        }

        int is_empty()
        {
            return top == NULL;
        }

        int Top()
        {
            return top->data;
        }

        void print_stack()
        {
            struct node* temp = top;
            while (temp)
            {
                std::cout<<temp->data<<" ";
                temp = temp->next;
            }
            std::cout<<std::endl;
        }
};

int main()
{
    Stack s1;
    s1.push(10);
    s1.push(20);
    s1.push(30);

    s1.print_stack();

    s1.pop();
    s1.print_stack();
}
```
