---
title: 'Painless threading [part 2]'
date: 2016-09-08 21:31:40 +0200
author: amit-upadhyay-it
categories: [java]
---

## **Threading using Thread class**

Here we will extend the Thread class. Again objective will be same :

1. Creating Thread
1. Attaching code to thread
1. Executing Thread.


Here our class will inherit Thread class and override the run() method. The code snippet which we need to run of the Thread will be inside the run() method.

```java
class A extends Thread
{
  public void run()
  {
  	function(){}
  }
}
```

The object of class A is also a Thread. So to create a new Thread we can write:

`A obj = new A();`

And now we can call the method of Thread class using object subclass of Thread class (i.e. object of A) So to start a Thread we can write :

`obj.start();`


This seems to be little bit simple, but there is difference in implementing Thread through Runnable interface and extending Thread class.

Example :

```java
class A extends Thread
{
  @Override
  public void run()
  {
    for(int i = 1; i <= 10; ++i)
    {
    	System.out.println("Thread A "+i);
    }
  }
}

class B extends Thread
{
  @Override
  public void run()
  {
    for (int i = 1; i <= 10; ++i)
    {
    	System.out.println("Thread B "+i);
    }
  }
}


public class ExampleThreading {
  public static void main(String arp[])
  {
    A t1 = new A();
    B t2 = new B();
    
    t1.start();
    t2.start();
  }
}

```

**Difference between implementing Runnable and extending Thread**

Implementing Runnable to use Threading is better because in Java we don't have multiple inheritance, so here as Thread is parent class of A, so it is not possible to have any other parent of A where as if we use Runnable interface then we can even have a parent of class A (other than the Thread class).



[Continue reading...](http://localhost:4000/news/2016/09/08/painless-threading-part3/)
