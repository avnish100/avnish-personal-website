---
title: "What is CAP Theorem"
date: "2024-09-03"
tags: ["Distributed Systems","Theory"]
---

# Understanding the CAP Theorem: A Friendly Guide with Analogies

This is my attempt at explaining CAP theorem as an analogy after all the biggest indicator of knowledge is wether we can break the concept down and make it easily understandable to everyone. This is going to be the part of my series of explanations of key distributed systems concepts and i aim to explain as i go on learning these concepts. Big shoutout to [mwhittaker.github.io](https://mwhittaker.github.io) for the beautiful proof see [Proof](https://mwhittaker.github.io/blog/an_illustrated_proof_of_the_cap_theorem/)

## The CAP Theorem: The Basics

Before we jump into our analogy, let's quickly define what the CAP theorem actually is:

The CAP theorem, also known as Brewer's theorem, states that in a distributed data store, it's impossible to simultaneously guarantee all three of the following properties:

- **Consistency (C)**: Every read receives the most recent write or an error.
- **Availability (A)**: Every request receives a response, without guarantee that it contains the most recent version of the information.
- **Partition Tolerance (P)**: The system continues to operate despite arbitrary partitioning due to network failures.

In essence, the theorem argues that in the case of a network partition, you have to choose between consistency and availability.

![Cap Theorem](https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/CAP_Theorem_Venn_Diagram.png/220px-CAP_Theorem_Venn_Diagram.png)


## The Analogy: Welcome to CAP High School!

Imagine you're the principal of CAP High School, a school so large it's spread across three different campuses in the city. Your job is to manage the school's central announcement system. Let's see how this relates to our CAP theorem:

### Consistency (C): The Accurate Announcements

In our school system, consistency would mean that every campus always has the exact same, up-to-date announcements. If there's a change (like a snow day), either all campuses get the update immediately, or none do until we can ensure they all have the same information.

### Availability (A): Always Open for Business

Availability in our school would mean that students can always check the announcement board at any campus, at any time. The board is never "down for maintenance" or "temporarily unavailable".

### Partition Tolerance (P): Handling Communication Breakdowns

Now, imagine a massive snowstorm hits the city (ie. network partition!). Roads are closed, and phone lines are down between campuses. Partition tolerance would mean our announcement system keeps functioning even when campuses can't communicate with each other.

## The CAP Dilemma

Here's where it gets tricky. According to the CAP theorem, when a partition occurs (our snowstorm), we have to choose between consistency and availability. Let's see how this plays out:

1. **CP (Consistency + Partition Tolerance)**: 
   We prioritize having the same, accurate information across all campuses. During the snowstorm, if we can't reach a campus to update its announcements, we shut down that campus's board entirely. It's better to show no information than potentially wrong information.

2. **AP (Availability + Partition Tolerance)**:
   We keep all announcement boards up and running, even during the snowstorm. This means some campuses might have outdated information, but at least students can always check the board.

3. **CA (Consistency + Availability)**:
   In a world where we could guarantee no snowstorms (perfect network), we could have both consistency and availability. But remember, the "P" in CAP theorem is non-negotiable in distributed systems. In the real world, we must prepare for partitions.


## Real-World Examples

Now that we've explored our school analogy, let's look at some real-world systems and how they handle the CAP trade-off:

1. **Banks (CP systems)**: They prioritize consistency over availability. If there's a network issue, they might decline transactions rather than risk inconsistent account balances.

2. **Social Media Platforms (AP systems)**: These often choose availability over strict consistency. That's why you might sometimes see an old version of a post or a comment that later disappears.

3. **Domain Name System (DNS) (AP system)**: DNS favors availability. It's designed to always give you an answer about which IP address belongs to a domain name, even if that answer might occasionally be slightly outdated.

## Wrapping Up

So what does this mean for us? We get to understand that, in the world of distributed systems, you can't have your cake and eat it too. When network partitions occur (and they will), you'll have to choose between consistency and availability.

When designing distributed we need to make a decision about what tradeoffs we are willing to make. Are we willing to give users stale data on occasion? The correct answer always depends on the business implementation and priorities. 

