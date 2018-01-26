---
title: Using Git for Mozilla Development
date: '2017-01-26 10:14:00'
tags:
- Mozilla
---

### Pull from a repos pull request

Sometimes you need to base your work on somebody elses pull request:

```
git branch pull-5200
git checkout pull-5200
git fetch git@github.com:devtools-html/debugger.html.git pull/5200/head
git merge FETCH_HEAD
```
