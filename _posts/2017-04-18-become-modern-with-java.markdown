---
title: 'Become modern with Java 8'
date: 2017-04-18 12:01:40 +0100
author: amit-upadhyay-it
categories: [java]
---

**Do you still have a habit of writing the Java programs in old fashion?** It's okay if you have, but I would suggest you become modern with `Java8`. You must be knowing that `Java8` came with the concept of `lambdas` and `stream APIs` and these things have been introduced long before.

{: .info .note}
**Why prefer lambdas?**


Lambdas let us write code in more readable and concise way. With the use of lambdas, we avoid writing `Anonymous classes`. Now as you know each anonymous class will result in the formation of a `.class` file which will result in the increase of `zar` file(built project). So if you have 10 anonymous classes that are 10 more classes in the final jar.

In Java 1.7 a new `JVM Opcode` was released named `invokedynamic` and Java 8 `Lambda` uses this. Java 8 lambda uses `invokedynamic` to call lambdas thus if you have 10 lambdas it will not result in any anonymous classes.

**Lets consider an example app where you have a list of people and you want to**:

- `sort` according to last name.
- print them.
- print people who have last name beginning with `P`.

### Programming:

- We need to create a blueprint of `Person`.

```java
public class Person {

	private String firstName, lastName;
	int age;
	public Person(String firstName, String lastName, int age) {
		super();
		this.firstName = firstName;
		this.lastName = lastName;
		this.age = age;
	}
	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public int getAge() {
		return age;
	}
	public void setAge(int age) {
		this.age = age;
	}
	@Override
	public String toString() {
		return "Person [firstName=" + firstName + ", lastName=" + lastName + ", age=" + age + "]";
	}
}
```

- Now as you know, we have to print the names according to the conditions and the conditions might be different, thus I need to create a contract (a common understanding, i.e. an interface).

```java
public interface Condition {
	boolean test(Person p); // `p` is the person on which the particular condition will be applied.
}
```

- Now a old fashioned Java programmer would like the code something like:

```java
public class TraditionalWay {

	public static void main(String[] args) {
		
		java.util.List<Person> list = java.util.Arrays.asList(
				new Person("Amit", "Upadhyay", 20),
				new Person("Katrina", "Kaif", 21),
				new Person("Deepika", "Padukone", 22),
				new Person("Naina", "Bhatiya", 19),
				new Person("Sonal", "Peru", 19)
				);
		
		// step1: sort according to last name
		java.util.Collections.sort(list, new java.util.Comparator<Person>() {

					@Override
					public int compare(Person o1, Person o2) {
						
						return o1.getLastName().compareTo(o2.getLastName());
					}
		});
		
		// step2: print them
		System.out.println("Printing all names");
		System.out.println();
		printLists(list);

		// step3: print people who have last name beginning with P
		System.out.println();
		System.out.println("Printing names whose first character of last name is P");
		System.out.println();
		printConditionally(list, new Condition() {
			@Override
			public boolean test(Person p)
			{
				return p.getLastName().startsWith("P");
			}
		});
	}

	private static void printConditionally(java.util.List<Person> list, Condition c) {
		
		for (Person p: list)
			if (c.test(p))
			{
				System.out.println(p);
			}
		
	}

	private static void printLists(java.util.List<Person> list) {

		for (Person p: list)
			System.out.println(p);// this will call the toString method defined in Person class.	
	}
}
```

The above code creates Anonymous class just to pass a behaviour. Lets see how a modern programmer would write the code:

```java
public class Java8Way {

	public static void main(String[] args) {
		
		java.util.List<Person> list = java.util.Arrays.asList(
				new Person("Amit", "Upadhyay", 20),
				new Person("Katrina", "Kaif", 21),
				new Person("Deepika", "Padukone", 22),
				new Person("Naina", "Bhatiya", 19),
				new Person("Sonal", "Peru", 19)
				);
		
		// step1: sort according to last name
		java.util.Collections.sort(list, (Person o1, Person o2) -> o1.getLastName().compareTo(o2.getLastName()));
		
		// step2: print them
		System.out.println("Printing all names");
		System.out.println();
		printLists(list);

		// step3: print people who have last name beginning with P
		System.out.println();
		System.out.println("Printing names whose first character of last name is P");
		System.out.println();
		printConditionally(list, p -> p.getLastName().startsWith("P"));
	}

	private static void printConditionally(java.util.List<Person> list, Condition c) {
		for (Person p: list)
			if (c.test(p))
			{
				System.out.println(p);
			}
	}

	private static void printLists(java.util.List<Person> list) {
		for (Person p: list)
			System.out.println(p);// this will call the toString method defined in Person class.	
	}
}
```

In the code you can see the difference.

Thank you 👏
