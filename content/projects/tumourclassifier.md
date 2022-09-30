---
title: "Tumour Classifier"
date: 2020-09-10T00:21:23-04:00
project: true
summary:
    " A webapp that predicts whether a skin tumour is benign or malignant from an image.
    "
picture: /imgs/projects/tumourclassifier.gif
more: https://github.com/saqibali-2k/TumourClassifier
tags: ["TensorFlow", "React", "Flask"]
---

## Features
- Trained a ResNet neural net architecture to classify [benign and malignant tumours](https://www.kaggle.com/datasets/fanconic/skin-cancer-malignant-vs-benign).
- Deployed the model using Python Flask and preprocessed images with PIL.
- Created a frontend with React to communicate with Flask API.

## Challenge(s)
Although the model achieved a test accuracy of 83%, it performed poorly with real world data. This can be attributed to a variety of reasons:
1. Poor preprocessing: most images needed to be resized to a significantly smaller size which resulted in a loss of information
2. Poor model choice: in hindsight, a ResNet model doesn't fit here; a better choice would have been to add some max pooling layers (similar to VGG)
    - Since max pooling layers down sample the previous layer, the model becomes more robust to changing image orientations and loss of information due to preprocessing

[Github Link](https://github.com/saqibali-2k/TumourClassifier)

