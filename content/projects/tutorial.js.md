---
title: "Tutorial.js"
date: 2020-12-10T22:45:32-04:00
project: true
summary:
    " The App Attention Index 2017 showed that 60% of users deleted an app 
    after one attempt of trying to use it and 80% will lose interest if they continue
    to run into problems.
    'Tutorial.js' is a library for onboarding new users to minimize frustration.
    "
picture: /imgs/projects/tutorial.js.png
more: https://saqib-ali.com/tutorial.js
tags: ["JavaScript", "Bootstrap"]
---
## Features
- Library is lightweight as it has no dependencies (vanilla JS and CSS)
- Supports three different tutorial formats: Basic, Timeline, TimedSequence
- Fully documented

## Challenge(s)
- Logic for tooltip positioning needed tweaking to feel natural
- Library classes needed to be designed with callbacks to allow for customization (ie. composed classes)
- There are still some bugs with tooltip DOM manupilation that need to be ironed out
    - TODO: use observer pattern to make tooltip trailing more robust.
    - Currently when an element moves while the tooltip is trailing it, tooltip does not update

[Github Link](https://github.com/saqibali-2k/tutorial.js)

[Demo and Documentation](https://saqib-ali.com/tutorial.js)