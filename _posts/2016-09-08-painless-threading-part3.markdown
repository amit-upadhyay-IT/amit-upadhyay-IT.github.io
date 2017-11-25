---
title: 'Painless threading [part 3]'
date: 2016-09-08 21:31:40 +0200
author: amit-upadhyay-it
categories: [java]
---


## Thread States

A java Thread is always in one of the several states which could be :

1. New Thread
1. Runnable
1. Not Runnable
1. Dead

So, there are 4 stages of thread in its whole life

#### **1 st state : New Thread**

A Thread is in this state when the instantiate of a Thread object gets created but doesn't get started.] A Thread starts life in the Ready-to-run state. You can call only the start() or stop() method when the thread is in this state. Calling any method besides start() or stop() cause an IllegalThreadStateException ( A descendant class of RuntimeException)

#### **2 nd state: Runnable**

When the start() method is invoked on a new Thread() it gets to the runnable state r running state by calling run() method.

A Runnable thread may actually be running or may be waiting its turn to run.


#### **3 rd state: Not Runnable**

A Thread becomes Not Runnable when one of the following four events occurs:

1. When sleep() method is invoked and it sleeps for a specified amount of time.
1. When suspend() method is invoked.
1. When wait() method is invoked and the thread waits for notification of few resource or waits for the completion of another thread or wait to acquire a lock of an object.
1. Thread is blocking an I/O and waits for its completion.



- sleep() is a method in Thread class and the argument of sleep is time in milliseconds.
- suspend() method is not used these days.

**Switching from Not Runnable to Runnalb state**

- If a thread has been put to sleep, then specified number of milliseconds must elapse ( or it must be interrupted).
- If a thread has been suspended, then its resume() method must be invoked.
- If a thread is waiting on a condition variable, whatever object owns the variable must relinquish it by calling either notify() or notifyAll().
- If a thread is blocked or I/O, then I/O must be completed.

#### **4 th state: Dead State**

A thread enters this state when run() method has finished executing or when the stop() method is
invoked or when any exception occurs. Once in this state, the thread can not ever run again.


### **Thread Priority**

In java we can specify the priority of each thread relative to the other thread. Those threads having higher priority get grated access to the available resources. The thread priority is specified as a integer number.

By default there is some priority number set for a thread even if we don't set any priority to a thread.


- **Thread priority is inherited**

A java Thread inherits its priority from the thread that created it.
By default our program runs into a thread whose priority number is 5. So each thread that we make is a child thread of parent thread. We can change the priority level if we want.

#### - **Setting thread priority**

We can modify a thread's priority at any time after its creation using a method setPriority() and retrieve the thread priority by using a method `getPriority()`.

The following static final integer constant are defined in the Thread class.

```java
MIN_PRIORITY(0) : lowest priority
NORM_PRIORITY(5) : default priority
MAX_PRIORITY(10) : highest priority
```

[Continue reading...](http://localhost:4000/news/2016/09/08/painless-threading-part4/)
