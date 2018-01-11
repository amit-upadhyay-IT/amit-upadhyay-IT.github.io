---
layout: tutorials
permalink: /tutorials/linkedlist-introduction/
title: Linked List
---

{: .info .note}
**The structure of a linked list is self-referential, i.e. every structure has a pointer inside it and that pointer will point to the structure of the same type.**

Example:

```c
struct node
{
    int data;
    struct node* next;
};
```

This is a singly linked list (`SLL`) because every structure is having only one link (i.e. `next` pointer). Using that link we can move only in one direction.

**POINTS**:

- The identity of a linked list is given by a pointer of type `node`, which is generally known as head. This `head` pointer gives us the access to the first node of the linked list and using the first node of the linked list we can traverse the complete linked list.
- Unlike an array, the linked list have sequential access. i.e. in order to reach an element, we have to start from the beginning and then go to that element.

## Operations on SLL

- Traverse
- Insert
- Delete


## Traversing a SLL

- We can traverse using the `head` pointer itself, but we generally use a `temp` pointer which initially points to the `head` and use `temp` to traverse the list (`temp` is just used because we want to maintain one copy of the `head` safe, if we change `head` then later we would not have anything to access the `LinkedList`).

Example:

```c
void traverse_ll(struct node* head)
{
    struct node* temp = head;
    while (temp)
    {
        printf("%d ", temp->data);
        temp = temp->link;
    }
}
```

Note the condition `while (temp)` (or `while (temp != NULL)`), give focus to the fact that we are completely going to finish the `SLL`(the reason is we want to print each element of SLL). So we make sure that the `temp` pointer should be pointing at `null` in the end.



## Inserting in SLL

Before we insert any element we are supposed to create it (i.e. allocate memory to the node).

To allocate memory we write:

```c
malloc(sizeof(struct node));
```

If you are allocating memory in C++, then you would need to typecast the malloc, see [why you don't need to typecast malloc in c](https://stackoverflow.com/questions/605845/do-i-cast-the-result-of-malloc/605858#605858)

For c++

```cpp
(struct node*)malloc(sizeof(struct node));
```

Consider this:

```c
struct node* get_new_node()
{
    return malloc(sizeof(struct node));
}


struct node* head = get_new_node();
```

The above code makes a pointer `head` which is pointing to a memory location of the `node` and the node contains two fields.

There are several places where this node can be inserted:

- Beginning
- End
- Between Start and End node


### Inserting at Beginning

The first thing that you might think is to store the address of the newNode into the head, but if you do so, you will end up losing the address of the actual linked list (because it's address will get replaced by the address of newNode).

Thus, first of all, we need to make sure that the newNode is linked with the rest of the node. And to do so, we need to write 

```c
new_node->link = head;
```

And now we can update the value of the heap pointer.

Example:

```c
struct node* insert_at_beginning(struct node* head, int data)
{
    struct node* new_node = get_new_node();
    new_node->data = data;
    new_node->link = head;
    head = new_node;
    return head;
}
```

### Inserting at End

Here we should be able to know where the end node is, i.e. we need to do the traversal of the SLL.

**The main question is how would you do traversal of the SLL?**

like this?

```c
while (temp)
    temp = temp->link;
```

Of course not, as told previously that the above loop which makes temp point to `NULL`, but we want to be present to the last node so that we can link the last node with the newNode, right?

If we are present at `NULL` then how could we ever link the newNode to the main SLL? Thus the loop should be written like this:

```c
while (temp->link)
    temp = temp->link;
```

Now once you are at the last node, all you would wanna do is, link the last's node next pointer to the newNode. i.e.:

```c
temp->link = new_node;
```

Thus the code should look like:

```c
struct node* temp = head;
while (temp->link)
    temp = temp->link;
struct node* new_node = get_new_node();
temp->link = new_node;
new_node->data = data;
new_node->link = NULL;
```

Also, we may need to take care of the case when no node is present in SLL.

Example code of insertion at end:

```c
struct node* insert_at_end(struct node* head, int data)
{
    if (!head)// when no node are in ll
    {
         struct node* t = (struct node*)malloc(sizeof(struct node));
         t->data= data;
         t->link = NULL;
         head = t;
         return head;
    }
    struct node* temp;
    temp = head;
    while (temp->link)
        temp = temp->link;
    struct node* new_node = get_new_node();
    temp->link = new_node;
    new_node->data = data;
    new_node->link = NULL;
    return head;
}
```

### Inserting in between

For inserting a node in between a SLL, you might be given with a value after which you are asked to insert (or want to insert). For this, you have to stop exactly at the node whose value is given to you. i.e. you need to write loop something like this:

```c
while (temp->data != value) // value is the data in the node after which you wanna insert the newNode.
    temp = temp->link;
```

Again you might first think of linking the `temp` node to the `newNode`, but if you do it first then you will lose the nodes after the `temp` node. So, it is important to link the rest of the nodes (nodes after temp node) to the newNode that then link the newNode to the temp node.

Example:
```c
struct node* insert_in_between(struct node* head, int data, int value)
{
    struct node* temp = head;
    while (temp->data != value)
        temp = temp->link;
    struct node* new_node = get_new_node();
    new_node->link = temp->link;
    temp->link = new_node;
    new_node->data = data;
    return head;
}
```

## Deleting a node

- From beginning
- From end
- From the middle of SLL.

{: .info .note}
**The main applications of deleting the node form the head or tail is: when you try to implement either a stack or a queue using a SLL, then we might have to delete the node from the heap or tail**

## Deleting from beginning

To delete you can just advance the `head` pointer by one.

**NOTE**: don't forget to free up space.

So, first, we need to store the address of the node which needs to be free from the heap somewhere i.e. `struct node* temp = head;`. Then advance the head pointer i.e. `head = head->link;` then finally do `free(temp);`.

Example:

```c
struct node* delete_from_beginning(struct node* head)
{
    if (head == NULL)// the linked list is empty and it has nothing to delete
        return head;
    else
    {
        struct node* temp = head;
        head = head->link;
        free(temp);
        return head;
    }
}
```

## Deleting from tail

If you wanna delete the tail (i.e. last node) then where do you think you should be standing? The last node or the last but one node?

If you stand at the last node, then all you can do is free up the memory of the last node, but you can't actually delete it from the SLL because the second last node would point to the location which doesn't exist.

So, you have to stand at the last but one node.

By now, you must have known how should the loop be written.

For going to the last node we write:

```c
while (temp->link != NULL)
    temp = temp->link;
```
So, for stopping at last but one node we need to write:

```c
    while (temp->link->link != NULL)
        temp = temp->link;
```

Now, after we reached to last but one node, we would wanna store the address of the last node somewhere so that we can free it. Also, we have to point the `next` pointer of the second last node to null.

Thus the code would be written something like this:

```c
struct node* delete_from_end(struct node* head)
{
    if (head == NULL)
        return NULL;
    else if(head -> link == NULL)// there is only one element in ll
    {
        free(head);
        return NULL;
    }
    else
    {
        struct node* temp = head;
        while (temp->link->link != NULL)
            temp = temp->link;
        free(temp->link);
        temp->link = NULL;
        return head;
    }
}
```
> **NOTE**: to delete any node, you stop one node ahead.

## Deleting from in-between

Here is particular value might be given to you which you have to delete from SLL. So as you know you would have to stand one node before the node to be deleted.

So, the loop we need to write is:

```c
while (temp->link->data != x)
{
    temp = temp->link;
}
```

**IMPORTANT NOTE:** There might be a corner case which you need to take care of when the element is not found (i.e. there is no node which contains the `X` into it). So, in this case, how would you stop?

To stop you can write another condition which will check for the `next` pointer (if the next->next pointer is reached to NULL or not), as soon as we find that we have reached to a second last node then we will stop there itself.

Example:

```c
while (temp->link->data != x)
{
    if (temp->link->link == NULL)// traversing of ll is over and yet we didn't found x
    {
        flag = 1;
        break;
    }
    temp = temp->link;
}
if (flag)
{
    printf("\n there is no such element \n");
    return head;
}
```

A complete function for deletion from middle is:

```c
struct node* delete_from_middle(struct node* head, int x)
{
    if (head == NULL)
        return NULL;
    else if (head->link == NULL && head->data != x)// checks if ll has only one element and that is not the element to be deleted
    {
        printf("\n There is no such node\n");
        return head;
    }
    else if (head->data == x)// to delete the first node of ll
    {
        struct node* temp = head;
        head = head->link;
        free(temp);
        return head;
    }
    else
    {
        int flag = 0;
        struct node* temp = head;
        while (temp->link->data != x)
        {
            if (temp->link->link == NULL)// traversing of ll is over and yet we didn't found x
            {
                flag = 1;
                break;
            }
            temp = temp->link;
        }
        if (flag)
        {
            printf("\n there is no such element \n");
            return head;
        }
        struct node* t1 = temp->link;
        temp->link = temp->link->link;
        free(t1);
        return head;
    }
}
```

{: .info .note}
**Move last node to first node in singly linked list**

First, we need to go to last but one node, but why? Because, if we are at last but one node, then we can change the `next` pointer of that node to NULL.
i.e.
```c
while (temp->link->link != NULL)
{
    temp = temp->link;
}
```

Also, we want to make the last node as the first node, we would want to do something like this:

```c
temp->link->link = head;
```
Now the head itself has to point to the last node, i.e.:
```c
head = temp->link;
```
In the end, we would make the `next` pointer of the second last node to null.

Example code:
```c
struct node* rearrange_ll(struct node* head)
{
    struct node* temp;
    temp = head;
    while (temp->link->link != NULL)
    {
        temp = temp->link;
    }
    temp->link->link = head;
    head = temp->link;
    temp->link = NULL;
    return head;
}
```

## Reverse a SLL (Iterative)

The idea of reversing the linked list is, reversing all the pointers from the next node to the previous node. So we need to reverse the `next` pointers (i.e. they should be pointing to the previous node instead of pointing to the next node).

For this, we can iterate over the SLL once, and in each pass in the iteration, we will try to reverse the link of one node (i.e. current node). I mean to say that for the first time, I will reverse the first node's `next` pointer and the second time I will reverse the second node's `next` pointer and so on.

**Now, how can we reverse the first node's `next` pointer?**

For this we would need to store the `firstNode->next` (i.e. nodes after the first node) somewhere safe, right? i.e. something like this:

```c
next_node = curr->link; // next_node is a pointer pointing to next of the curr
```
Then we can have a `prev` pointer pointing to a node just previous that the `current` node and we can do something like this:

```c
curr->link = prev;
```

Atlast we would want to advance our pointers, i.e. `prev = curr;` and `curr = next_node;`

Now, one more question is **"How long do you want to repeat this process of reversing the `next` pointer?"**

Until the `prev` points to the last node in the linked list i.e. that time the `curr` would be pointing to `NULL`.

**CODE**:

```c
struct node* reverse_ll(struct node* head)
{
    struct node* prev = NULL, *next_node = NULL;
    while (head)
    {
        next_node = head->link;
        head->link = prev;
        prev = head;
        head = next_node;
    }
    return prev;
}
```

## Reverse a SLL (Recursive)

### Approach 1

The idea behind this would be going to the last node, then linking the last node's `next` pointer to the node just previous to it. Remember here that if you went to the last node, then you can't point the last node's `next` pointer to the previous one, so for this purpose, you have to go to last but one node. Now once you are at last but one node, then you can do something like this:

```c
secondLastNode->link->link = secondLastNode;
```
Now we have successfully pointed last node's `next` pointer to the node previous to it.

Now, don't you think that if we can do this for all the nodes in the SLL then our task would be kinda done? Yes, it would be. Now we should be using recursion stacks to move to the last node.

i.e.

```c
struct node* rest = recursive_reverse(first->link);
```

We need to write the exit condition for the above recursion, and the exit condition would be written in such a way that recursion should stop at last but one node. i.e.

```c
if (first->link == NULL)// ll has only one node
    return first;
```

If you see the above loop, you would say that the recursion is stopping at the last node. Ans yes, you are right. The recursion above will be stopping at the last node, but remember that the after returning `first`, we are finishing the space allocated in the recursion stack. And now the control will go to the next top space present in recursion stack where `first` would be pointing to last but one node and `rest` would be pointing to the last node.

We need to take care of one more thing and that is making the last node's `next` pointer point to `NULL`.

The above algorithm can also be summarized as:

- Divide the SLL into 2 parts, first node and rest of the list. (two parts are the last node and last but one node at the end of the recursion).
- Recursively call the reverse function for the rest of the list.    (i.e. `recursive_reverse(first->link);`)
- Link the rest to first. (i.e. `first->link->link = first;`)
- Fix head pointer. (i.e. making the last node's `next` pointer point to `NULL`.


Example code:

```c
struct node* recursive_reverse(struct node* first)
{
    if (first == NULL)// ll has no nodes
        return first;
    if (first->link == NULL)// ll has only one node
        return first;
    struct node* rest = recursive_reverse(first->link);
    first->link->link = first;
    first->link = NULL;
    return rest;
}
```

{: .note}
**Some more recursive programs on SLL**



{: .info .note}
**Printing from first node:**

```c
void f (struct node* head)
{
    if (head)
    {
         printf("%d ", head->data);
         f(head->link);
    }
}
```

{: .info .note}
**Printing from last node:**

```c
void g (struct node* head)
{
    if (head)
    {
        g(head->link);
        printf("%d ", head->data);
    }
}
```






