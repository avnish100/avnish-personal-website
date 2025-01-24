---
title: "Building belbullets.run : Lessons from crafting a community website"
date: "2025-01-03"
tags: ["Product","Community"]
---

# Behind the Scenes of belbullets.run: Lessons in Building a Runner-Friendly Website  

When I set out to create **belbullets.run**, the goal wasn’t just to have a website—it was to craft a seamless experience for our running club. Every interaction needed to feel smooth, intuitive, and useful, whether you were checking the next club run or exploring our community’s own leaderboard to foster a healthy competition and keep members engaged.  

But behind those smooth interactions was a mountain of challenges. From handling data refreshes to overcoming gateway timeouts and choosing the right tools, here’s what I learned about building something simple on the surface but robust under the hood.  

---

## 1. Designing for User Interaction 
Having myself be frustrated by the previous iteration of the website (no shade xD), I decided to take things into my own hands. I prioritized **how users interact with the site once they’re here**.  

- **Intuitive Navigation**: Ensured users could find the most critical information—like upcoming runs and club stats—in just one or two clicks.  
- **Responsive Design**: The site was optimized for mobile, knowing that most users check details on the go.  
- **Clear Feedback Loops**: Every interaction, like clicking a button or submitting a form, was paired with instant visual feedback and clear visual hierarchy to ensure minimal cognitive load and make sure the website is a joy to use.

This taught me the importance of **crafting for the user in front of you**, not an abstract idea of “what works.” The success lies in building and optimizing for your user and take realtime feedback constantly on what their points of frustration might be. 

---

## 2. The Refreshing Data Saga: Cron Jobs & Gateway Timeouts  
Integrating with the Strava API to pull club stats and achievements was both exciting and—let’s just say—character-building. The main challenge? Ensuring the data stayed up-to-date as close to realtime as possible and still stay within budget.  

- **Cron Jobs for Scheduled Updates**: I implemented cron jobs to periodically refresh the data. This worked well at first, but as the dataset grew, so did the load on the server.  
- **Gateway Timeouts**: Some API requests took too long to process, leading to dreaded timeouts. To handle this:  
  - Broke down data-fetching into smaller, more manageable chunks.  
  - Implemented retries and fallback mechanisms to avoid losing key updates.  
- **Strava API**: Earlier versions of the site had one particular quirk that ticked me off. A user would need to authorize strava everytime they hit the website. Fixing this and ensuring our website was seamless and user friendly involved deep dives into OAuth standards and best practices. This ended up being the most satisfying kink that I ironed out.

Dealing with these challenges taught me to respect the constraints of third-party systems and the importance of designing for scalability, even for smaller projects.

---

## 3. Architecture: Choosing Supabase and Structuring for Scale  
From the beginning, I knew the architecture needed to balance speed of development, scalability, and affordability. Enter **Supabase**, the backend solution that became the backbone of belbullets.run.  

- **Why Supabase?**  
  - Easy integration with the frontend.  
  - Built-in support for PostgreSQL, which offered flexibility for querying our data.  
  - Real-time capabilities for future enhancements, like live updates during events.  

- **Structuring the Database**  
  I designed tables to mirror key aspects of our running club:  
  - **Users**: To track member profiles and participation.  
  - **Activities**: To log upcoming and past events.  
  - **Stats**: For aggregated Strava data, like total miles run and leaderboards. 

With things like triggers, and managed auth states. This managed PostgreSQL solution indeed got me up and running in no time and let me focus on the core functionality rather than having to fiddle with my own local database.

---

## Key Takeaways  
Building **belbullets.run** wasn’t just a lesson in web development—it was a crash course in crafting rich user friendly products.

1. **Put the user first**: Always start with understanding what people actually need (and be ready to adjust when you’re wrong).  
2. **Constraints fuel creativity**: A limited budget forces you to focus on what really matters.  
3. **APIs are great—until they aren’t**: Integration is powerful but requires careful planning and jugaad.  
4. **Design for scale**: Even small projects benefit from scalable architectures and modular design.  

---

Building belbullets.run wasn’t just about creating a website. It was about learning to solve real problems, communicate effectively, and make decisions with limited resources—all while supporting a community I care about.  

