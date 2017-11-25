---
title: 'Painless threading [part 4]'
date: 2016-09-08 21:31:40 +0200
author: amit-upadhyay-it
categories: [java]
---

##  Synchronizing multiple thread

We have created more than one thread know as multiple threading, but multiple threading has an issue which is :

When we start two or more threads within a program, there may be a situation when multiple threads
try to access the same resource. Whenever multiple threads are trying to access a same object, then we have to synchronize the thread such that unless the work of thread one gets completely executed for the object, no other thread should interfere its execution.

`Synchronous – in sequence
Asynchronous – parallel execution
`

**NOTE** : when we start two or more threads within a program there may be a situation when multiple threads try to access the same resource.

So there is need to synchronize the action of multiple threads and make sure that only one thread can access the resource at a given point of time.


### **Example of unsynchronized thread**

```java
class Account
{
  private int balance;
  
  public Account(int balance){ this.balance = balance; }
  
  public boolean isSufficient(int amt)
  {
    if (amt > balance)
    return false;
    else
    return true;
  }
  public void withdrawel(int amt)
  {
    balance -= amt;
    System.out.println("The money withdrawn is "+amt);
    System.out.println("Available balance is "+balance);
  }
}

class Customer implements Runnable
{
  private String name;
  private Account account;
  public Customer(Account account, String name)
  {
    this.name = name;
    this.account = account;
  }
  @Override
  public void run()
  {
    java.util.Scanner scanner = new java.util.Scanner(System.in);
    System.out.println("Enter amount to widhdraw : ");
    int amount = scanner.nextInt();
    if(account.isSufficient(amount))
    	account.withdrawel(amount);
    else
    	System.out.println("Insufficient balance");
    scanner.close();
  }
}


public class ExampleThreading {
  public static void main(String []args)
  {
    Account a = new Account(1000);
    Customer c1 = new Customer(a, "Amit"), c2 = new Customer(a, "Kat");
    
    Thread t1 = new Thread(c1), t2 = new Thread(c2);
    t1.start(); t2.start();
  }
}
```


Now lets see how to synchronize the threads.

We want to synchronize the code written inside the run() method. For this we write keyword `synchronized(){}`

**NOTE**: Syntax of synchronized may look like a method, but it is a keyword in java.

**Argument inside the synchronized**

Again, I choose wrong word because synchronized is not a function. But I need to write the “shared
resource” (i.e. the object that is getting shared) inside the parenthesis. Now all the code that we want to synchronize will be written inside the curly braces.

Eg :

```java
@Override
public void run()
{
  java.util.Scanner scanner = new java.util.Scanner(System.in);
  System.out.println("Enter amount to widhdraw : ");
  int amount = scanner.nextInt();
  synchronized (account)
  {
    if(account.isSufficient(amount))
    	account.withdrawel(amount);
    else
    	System.out.println("Insufficient balance");
  }
  scanner.close();
}
```

Thank you 🎂 👏
