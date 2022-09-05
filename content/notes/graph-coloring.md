---
title: "A Graph Coloring Problem in the Wild"
date: 2022-03-25T14:06:46-04:00
draft: false
tags: ['work']
---

Let's face it: we learn a lot of things in school that we never use in the real world.
It could've been while integrating some exceedingly complicated function or implementing a self-balancing tree - the individual experience varies, but the the thought is always the same. 

> When am I ever going to use this?
<!--more-->

Well, the stars aligned and I spotted a graph coloring problem in the wild (AKA my internship at Red Hat 🙂).

# The Task

The [CoreOS](https://github.com/coreos/) team at Red Hat ships container focused operating systems [Fedora CoreOS](https://getfedora.org/en/coreos) and [RHEL CoreOS](https://docs.openshift.com/container-platform/4.10/architecture/architecture-rhcos.html). To ship stable software on schedule, the team needs robust CI and complete testing which comes with its own unique challenges. We need to run tests on virtual machines to test the complete process (provisioning, boot, various tasks, etc.). So the CoreOS folks created their own tooling: [Kola](https://coreos.github.io/coreos-assembler/kola/). 

Kola runs each test in its own VM to avoid test conflicts. Consider a test verfies that a default user is setup, while another test disables the default user. These two tests will conflict and one test will cause the other to fail so we need to separate them into different VMs. This is resource intensive. Can we resolve conflicts and use fewer VMs?

# Where Graph Coloring comes in

A quick recap:

> A graph coloring is an assignment of labels, called colors, to the vertices of a graph such that no two adjacent vertices share the same color.

Let's say we have four tests labeled A to D. Test A conflicts with tests B and C, while B conflicts with test D. Lets draw an edge between each of the conflicting tests:

{{< figure src="/imgs/graph-coloring/graph-coloring-2.png" alt="Conflicts" >}}

So if we can assign a different VM to tests that have an edge between them .. aha! This is a graph coloring problem where assigning an color to a test, is the same as assigning a VM to that test. In that case, a valid graph coloring should give us a solution.

{{< figure src="/imgs/graph-coloring/graph-coloring-3.png" alt="A valid solution." >}}

Finally, we ended up using only two VMs instead of the original four. 

{{< figure src="/imgs/graph-coloring/graph-coloring-4.png" alt="Final Result" height="auto" width="1000px">}}

# Coding it out

Given the nature of the problem, the solution was actually easy to implement. Since we didn't expect to run a large number of test, we didn't need the most efficient solution. We also didn't need to use the absolute minimum number of VMs; just "fewer VMs" sufficed. 

This pointed towards a simple greedy solution:
``` julia
# Pseudocode
testVMs = []
for currTest in testArray:
  assigned = False
  for VM in test testVMs:
    if not VM.containsConflict(currTest):
      VM.add(currTest)
      assigned = True
  if not assigned:
    VM = testVms.createNewVM()
    VM.add(currTest)

return testVMs
```

In terms of saving resources, this implementation does a great job. It guarantees that we use at most one more than the maximum number of conflicts of any test. For example, if a test conflicts with five other tests, the algorithm will use six or less VMs.

Although this solution is not the most optimal, it is optimal enough. The readability and maintainability of the solution is worth its cons.   

For the full changes, see [coreos-assembler#2516](https://github.com/coreos/coreos-assembler/pull/2516). Isn't open-sourced great?