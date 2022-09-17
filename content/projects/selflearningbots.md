---
title: "SelfLearningBots: AlphaZero-like AI"
date: 2022-09-16T19:21:58-04:00
project: true
summary:
    "'SelfLearningBots' is a library to create your own AlphaZero-like AI. The library allows one
    to train reinforcement learning AI for any deterministic two player game. Like many other game playing AIs,
    the library uses a tree search algorithm to plan ahead; however, unlike most other AIs, the tree search is pruned
    using a machine learning model which predicts the desiriablity of moves available to the player.
    "
picture: /imgs/projects/selflearningbots.gif
caption:  I tested the library on connect4. This is a game the AI (red) played against me (yellow). The bot puts me into an unwinnable position.
more: https://github.com/saqibali-2k/SelfLearningBots
tags: ["pytorch", "tensorflow", "google-cloud-platform"]
---
## Features
- Uses multiprocessing to run multiple instances of self-play
- Uses multithreading to parallelize the tree search algorithm (Monte Carlo Tree Search w/ Virtual Loss)
- The whole training process is automated, you can leave it running
- Can plug into any machine learning framework (given you implement the specified interfaces).
- Provides a default ResNet architecture (the one used by the folks at DeepMind for the original implementation).

## Challenge(s)
- Exceedingly long edit-compile-debug cycle (!!)
- No official implementation to reference
- Limited resources for training (free GCP credits)
- Generation of data is slow with python (plan on using a statically-typed language)
- Current approach does not take advantage of distributed systems (but it can, see [note](/notes/ml-containerization/))
