---
title: 'Painless threading [part 1]'
date: 2016-09-08 21:31:40 +0200
author: amit-upadhyay-it
categories: [java]
---

**Thread** – is an independent path of execution within a program. Many threads can run concurrently within a program and that way we say that multithreading refers to two or more task executing concurrently within a single program.


[**Thread class (java.lang.Thread)**](https://docs.oracle.com/javase/7/docs/api/java/lang/Thread.html)

Every Thread in java is created and controlled by the `java.lang.Thread` class. Whenever we create an object of Thread class then we say that we have created a Thread. Suppose that I have created 3 objects of Thread class `t1`, `t2`, `t3` then we can say that we have created 3 threads. The important thing is to assign code to these threads, i.e. the codes which will get executed by these threads.

Before learning how to attach segment/snippet of code with a thread we will see way to create a Thread.

**Benefits of creating Thread**

Normally program gets executed sequentially, so after execution of first statement the second statement will get executed and so on. Now if the first statement and second statement are independent from each other then we can even run them parallel. This will save the time in execution of the program.

**Creating Thread**

There are two ways to create Thread in java

* Implement the Runnable interface. (java.lang.Runnable),
* By extending the Thread class (java.lang.Thread).

**Steps involved to implement the concept of Thread**

* Create the object of Thread class.
* Attach the segment of code with the object of Thread class which should run on execution of the Thread.

**NOTE**: We use multithreading for the concurrent execution of segments which are totally independent from each other.😄


Threads using Runnable Interface
Our objective –
- Create Thread
- Attach code to Thread
- Executing Thread

**a) Create Thread**

```java
Thread t1 = new Thread(..); // .. represent arguments
Thread t2 = new Thread(..); // .. represent arguments
```

Now the process of creation of thread is done, next objective is to attach the code snippet to the
Thread.

**b) Attaching code**

For this we make a class:

Example:
```java
class A
{
	function(){}
}
```

Suppose that I want the code inside function() method to get attached with the Thread. For this we need to create object of class A and then pass that object in the constructor of Thread class which create the Thread.

Now the question is **Since the Thread class is already predefined, so what type of argument does
the constructor of Thread class takes?**

One thing is clear that we need to pass the object of class A in the constructor of Thread class but the class A has been created now in our program. And passing the reference of class A as argument in constructor of Thread may result in type mismatching.

Now for this reason we use interface. We have Runnable interface (a predefined interface). There is only one method declared inside Runnable interface and that is **run()** method.

Now class A will implement the Runnable interface so it is important to **override the run()** method.

So we have to write the class A as :

```java
class A
{
  public void run()
  {
  	function(){}
  }
}
```
or we can just replace the body of method function() with the body of run() function.


**Benefits of implementing Runnable interface**

Since A implements, the Runnable interface, so any reference variable of Runnable interface can be
kept in the reference variable of class A (i.e. object of class A).

i.e.
```java
 Runnable r1 = new A();
```

Since Runnable is predefined so we can say that constructor of Thread class can receive a Runnable
type of value. i.e. we can pass the object which has implemented the Runnable interface into the
constructor of Thread class.

So we can say that one of the constructor of Thread class could be something like :

```java
Thread (Runnable r1)
{
}
```

**c) To execute Thread**

`t1.start(); // this will start execution of Thread t1`

Example Program :

```java

class A implements Runnable
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
class B implements Runnable
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
    Thread t1 = new Thread(new A());
    Thread t2 = new Thread(new B());
    
    t1.start();
    t2.start();
  }
}

```

Sample output:
```
Thread A 1
Thread A 2
Thread B 1
Thread B 2
Thread B 3
Thread B 4
Thread B 5
Thread B 6
Thread B 7
Thread A 3
Thread A 4
Thread A 5
Thread A 6
Thread A 7
Thread A 8
Thread A 9
Thread A 10
Thread B 8
Thread B 9
Thread B 10
```

[Continue reading...](http://localhost:4000/news/2016/09/08/painless-threading-part2/)
