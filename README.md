## Building SlackCoin Part 1: Introducing SlackCoin

*<strong>Could blockchain-based payments and artificial intelligence supercharge your team’s communication skills?</strong>*

*This series of seven articles describes a system architecture and economic model for SlackCoin, a new open-source experimental currency for users of the Slack messaging platform, designed to gain personal familiarity with blockchain-based contracts, speech classification, sentiment analysis, and signed social digraphs; to analyze the role of trust-less digital payments in a synthetic ecosystem; and to observe how collaborators respond to cash-like incentives designed to improve intra-team communications.*

###### Building SlackCoin, Part 1 of 7
### The Whys, Whats and Hows

----

#### Talk is…expensive

“Words are cheap, but a dram of grace is worth all the world.”  So wrote John Bunyan, the prolific Baptist author of the Pilgrim’s Progress, back in the 1680s. John Bunyan is cited as the first to write down the old proverb: that talking can be easy, especially when compared to taking action. But John Bunyan, as astute and as pious as he was, never attended a project meeting; John Bunyan never coordinated a multinational product rollout.  It turns out that talking, at least in the context of corporate teams, can get complicated, and as recent studies show, very expensive for companies that get it wrong.

SIS International, the New York-based research firm, recently estimated that a typical medium-to-large company wastes $26,041 per employee per year on poor communications within teams.  SIS tracked the top factors that prevent effective communications within companies: long waits for information, irrelevant or unwanted messages, insufficient coordination and hierarchical or political barriers between individual team members.

A study cited by the Harvard Business Review echoed the findings from SIS, and added more unhappy news: many corporate teams are hampered by a failure to communicate well across corporate boundaries; they suffer from blocking behaviors, such as aggression or negativity; and the worst teams engage in rampant triangulation—the gossipy morass that emerges when Mr. A mau-maus Ms. B to Mrs. C, leaving Ms. B haplessly unaware that everyone wants her fired, or killed, or worse.

There is hope, however, for terrible teams.  Another Harvard study tracked the talk habits of highly effective teams, and found that certain intra-team communication patterns were almost always correlated with success. Harvard found that frequent face-to-face communications were the best contributor to successful outcomes, but even when communications were confined to electronic exchanges, three factors predicted the performance of the winning teams:

1. Energy, or how often a team communicated;
2. Engagement, or how evenly distributed communications were among all team members; and,
3. Exploration, or how often a team engaged with individuals outside the core group.

The best performing teams consistently scored the trifecta on all three measures. The worst teams consistently screwed the pooch on communications in general, and then messed up their companies as well.

Clearly then, leaders can cultivate more effective teams by improving their communication skills. Conversely, leaders might weed out poorly performing teams by squelching their negative talk. But how, outside of a snooze-inducing seminar on corporate communications, can teams be taught these skills?

#### What gets measured gets…paid

Lord Kelvin, the 19th-century Irish physicist and namesake for the most badass measure of temperature in the universe, wrote that “if you cannot measure what you are speaking about and express it in numbers, then your knowledge is of a meagre and unsatisfactory kind.”  Peter Drucker, the 20th-century corporate svengali, rephrased it more succinctly for management-minded folks: “What gets measured gets improved.”

But how do we measure our teams’ communication skills? And assuming that we can assess those skills in a consistent and unobtrusive way, how do we encourage struggling teams to get better?

First, let’s skip over a debate about the best way to motivate a team.  Is intrinsic motivation, the joy of doing a job well, better than extrinsic motivation, the thrill of getting a special reward for same?  For the purposes of this article, I don’t care. We’re building a new currency after all, so our teams are getting paid in SlackCoin for getting better.

What if we could examine the communications among our teams, pay incentives for “good” messages, levy fines for “bad” messages, and assess the effect of these payments on team effectiveness? We’d need access to a source of real-time team communications, a private, secure, and easy way to monetize those communications, and a mechanism to measure improvements. Can it be done?

#### Ladies and gentlemen, we can rebuild them. We have the technology.

Fortunately, we have the technology to get the job done, and this series of articles will walk us through the process of setting it up.  We’ll call the whole stack SlackCoin, because I like that name, and no one else has claimed it.

We’ll use five free or mostly-free tools for our project: the Slack messaging platform, the Watson/AlchemyAPI platform from IBM, an Ethereum-based blockchain running on the eris:db platform, the OrientDB graph database, and an event based compute container infrastructure using Amazon AWS Lambda, Docker containers and Mesos.

#### Shh! The Bots can Hear Us: How to Bot Hack a Slack Chat Room


Slack, the corporate messaging platform, has the twin advantages of popularity (enterprise teams love it) and hackability (Slack allows developers to enhance its chat rooms via bots). So we’ll use our Slack-based teams as our enterprise guinea pigs. Specifically, we’ll create Slack bots that automatically analyze every message sent, use our A.I. backend to decide how “good” the message is, and use our blockchain-based currency to pay the message sender.

In Part 3: Shh! The Bots Can Hear Us!, I’ll discuss the nuts and bolts and share code for our Slack bots  We could have also used Facebook’s Messenger platform, which also allows autonomous bots, but Slack’s focus on corporate chatterers wins the day.

#### But How Does The Terminator Feel? Object Classification and Sentiment Analysis with IBM Watson

For our message analysis, we’ll turn first to IBM’s Watson A.I., which, based on IBM’s lackluster marketing, has come across (at least to me) as a heap of technologies in search of a purpose.  For our purpose though, Watson exposes powerful sentiment analysis capabilities through its new AlchemyAPI.  We’ll feed our Slack messages through Watson, and based on what Watson thinks, we'll assign a score to each message.

I’ll discuss the factors that go into our sentiment scoring in Part 5: But How Does the Terminator Feel?  We could have also used Microsoft’s Text Analytics API, or one of very many other open language processing tools (including a “Russian Sentiment Analysis” API (http://semanticanalyzer.info/blog/), which sounds so deliciously 19th-century: https://www.youtube.com/watch?v=wdGEtrpKlAw)

#### Can’t We Just Be Friends? Signed and Directed Social Graphs in OrientDB

As smart as Watson seems, its sentiment analysis is only one part of our communications scoring algorithm, and really, only the negative part. To build effective teams, we want to measure not just their sentiment, but their energy (quantity of communications), engagement (distribution of communications), and exploration (engagement with outsiders).  For those measures, we’re going to need a social graph database that can store both the directionality and the positive/negative score of our Slack chats. Here, we’ll use OrientDB.

We’ll discuss the data schema and how to store and query signed digraphs in Part 4: Can’t We Be Friends. We could have also used Neo4J, a more popular graph database for this project, but OrientDB's language support, capabilities, licensing and robustness make it the better choice.

#### Let’s Build A Bank! Creating A New Currency on an Eris/Ethereum Blockchain

Using a custom blockchain-based currency for SlackCoin isn’t the most obvious choice. After all, we could easily save our users' scores and associated payments into any plain old database.  However, a normal database won’t gain us the unique advantages of a blockchain data store, which include:

- an independently verifiable record of user identities and transactions that doesn’t rely on a central authority; and,
- a transparent record of account balances that should motivate other users to do better

Both of these design goals—disintermediation and transparency—could be achieved using BitCoin's public blockchain, but our project has three other important limiting factors:

- We’re building an autarky, or a self-sufficient closed economy, that can survive without outside influence;
- We want to control the creation and destruction of cash in our economy, so that we can manage inflation; and,
- I don’t want to splash out any real money to fund this new bank.

Given these constraints, we’ll need to stay away from currencies like BitCoin and public blockchains like Ethereum.

In Part 2: Let’s Build A Bank!, I'll cover our economic model in depth, contrast SlackCoin against other alternate currencies, and detail why (and how) we’ll develop our currency on top of a private blockchain using the open-source eris:db platform.

#### Event-based Container Infrastructure: AWS Lambda / Docker / Mesos

Applications that deal with conversations and payments can be difficult to provision and scale because they tend to be clumpy—that is, on large scale deployments, compute resources are needed in unpredictable bursts, and in our case, each conversation requires low-latency coordination between multiple compute services.

Architecturally, we want the SlackCoin platform to be quick, portable, fault tolerant, easy to deploy, inexpensive (or free), and scalable with as little active babysitting as possible (no pager duty!)

In Part 6: Money From Nothing, And It’s (Almost) Free), I describe how we'll treat our Slack conversations as event queues that will use AWS Lambda and Docker containers coordinated by Mesos to spin up (or down) our containerized compute resources as needed. As a bonus, you’ll be able to deploy and run your own open-source SlackCoin instances to your heart’s content.

#### Wrap up and Analysis

Once we’ve built out all the SlackCoin components, we’ll put it in place to see if it actually helps teams communicate better.

In Part 7: Look Who’s Talking Now, we’ll analyze the communications of several real corporate teams, and test our hypothesis: the teams and individuals who’ve earned the most SlackCoin at the end of our run should also be the teams and individuals who are most effective at their tasks.

By the way, we’ll also have the all the digital currency infrastructure needed to spin up a new  “WagerCoin" and bet on how well our teams did!

I hope you’ll join me for the remaining articles in this series. All of the code used in the project will be available on GitHub, and our Docker containers will be available on DockerHub so that you can tinker with SlackCoin on your own.

Of course SlackCoin has a Slack channel (where you’ll be able to earn SlackCoin for your participation!)

Sign up here to be notified when other articles come online.  This series will also be available as an eBook — reserve your copy now.

###### Building SlackCoin: A Seven-Part Series

* Introducing SlackCoin
* Let’s Build A Bank! Creating A New Currency on an Eris/Ethereum Blockchain
* Shhh! The Bots Can Hear Us! How to Bot Hack a Slack Chat Room
* Can’t We Just Be Friends (Directed Social Graphs in OrientDB)
* But How Does The Terminator Feel? (Object Classification and Sentiment Analysis with IBM Watson)
* Money From Nothing, And It’s (Almost) Free (Event-based Infrastructure with AWS Lambda & Mesos)
* Look Who’s Talking Now: Summary and Results
