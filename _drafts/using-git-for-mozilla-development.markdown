---
title: Using Git for Mozilla Development
date: '2017-01-26 10:14:00'
tags:
- Mozilla
---

### Pull a Pull Request from Another Person's Repo

Sometimes you need to base your work on somebody elses pull request:

```
git branch pull-5200
git checkout pull-5200
git fetch git@github.com:devtools-html/debugger.html.git pull/5200/head
git merge FETCH_HEAD
```

### Rebase a Pull Request

```
git checkout master
git pull git@github.com:devtools-html/debugger.html.git
git checkout <branch name>
git rebase master
git merge-base origin/master head
git push -f origin <branch name> --no-verify
```
