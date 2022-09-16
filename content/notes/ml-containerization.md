---
title: "Containerizing a Reinforcement Learning Pipeline"
date: 2022-07-17T03:34:58-04:00
draft: false
tags: ['work', 'personal']
---

After spending roughly 14 months at Red Hat working with a container focused team on container-focused projects, I've had a lot of fun. I've learned plenty too. I've got some new ideas about past projects floating around in my head; so let's get them down on paper.
<!--more-->
# Proposal

I spent the better part of a summer working on [SelfLearningBots](https://github.com/saqibali-2k/SelfLearningBots) (I could've picked a better name 😞). The idea was to provide a tool to make your own [Alpha-Zero](https://en.wikipedia.org/wiki/AlphaZero) like AI.
The user provides the game environment described by an interface, and as long as the game is two-player and non-deterministic, the AI will learn through self-play.

I've come to realize that containerizing this application can:
* Decouple two important steps in the training process
* Introduce two asynchronous agents
* Allow the tool to be used efficiently with container-orchestration systems

The changes above will allow for an overall faster training process, not to mention the development headaches containers save.

## Current Layout
![Current Layout](/imgs/containerizing-ml/Before.png "Current Layout")

Tha main process launches `self-play` processes. These agents are responsible for the `self-play` part of the training loop as they produce the training data. When sufficient data is gathered, the self-play agents *halt*, and the main process begins training the model using the generated data. This process is repeated until the developers are satisfied. 

Self-play agents stopping is a bottleneck in the pipeline. This leads to a periods where new data is not being produced and periods where the GPU is not being used for training. When the self-play agent and model trainer agent are decoupled, they may run asynchronously; and training data is produced and consumed continuously.

Once this is achieved, we can containerize our two independent agents. 

## New Layout

Thus far, containers haven't been a requirement. We don't need containers to decouple our two agents, and we don't need containers to run them asyncronously. However, containers save the day in deployment. Many GPU-enabled machine learning workflows require developers to run their pipelines on remote instances using providers like GCP and AWS. Developers don't want to setup dependencies like [CUDA toolkit](https://developer.nvidia.com/cuda-toolkit) over and over everytime  compute instances are changed slightly. Besides, containers let us use tools like kubernetes. 

![New Layout](/imgs/containerizing-ml/After.png "New Layout")

With a container orchestration system, we can tune the ratio of trainer agents to self-play agents. The training process is easily adjusted to our hardware.

# Conclusion

These posts also serve as personal notes so lets lay it all out:
1. We decoupled the self-play and model trainer agents
    * This resulted in a more optimal resource usage, as both agents are constantly producing and consuming
1. Decoupling allows us to containerize our two agents
1. We can now use a container orchestration system to deploy our containerized agents
