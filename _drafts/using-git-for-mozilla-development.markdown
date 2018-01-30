---
title: Using Git for Mozilla Development
date: '2017-01-26 10:14:00'
tags:
- Mozilla
---

### Workflow

In Github Fork the repo then:

```
git clone git@github.com:MikeRatcliffe/devtools-core.git
git remote add upstream git@github.com:devtools-html/devtools-core.git
```

### Pull a Pull Request from Another Person's Repo

Sometimes you need to base your work on somebody elses pull request:

```
git branch pull-5200
git checkout pull-5200
git fetch git@github.com:devtools-html/debugger.html.git pull/5200/head
git merge FETCH_HEAD
```

### Rebase changes

```
git checkout master
git pull --rebase upstream master
git push -f origin master --no-verify
```
