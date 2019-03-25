---
title: Using Mercurial for Mozilla Development
date: '2009-05-05 20:54:00'
tags:
- Mozilla
---

* You're reading a book. 1 page = 1 changeset.
* A tag is sticking a sticky note on a page you find interesting. It stays on the same page and can be used to find that page easily.
* A named branch is a chapter. Every page has a chapter number written in the margin. This groups related pages together.
* A bookmark is a bookmark. As you move from page to page, you move the bookmark forward with you. You can use multiple bookmarks to keep track of progress through different parts of the book.

### Make VSCode your Default mq Text Editor

Add the following ling to the `[ui]` section of your .hgrc:
```
editor = code -n -w # VSCode Standard Edition
editor = code-insiders -n -w # VSCode Insiders Edition
```
If the `[ui]` section doesn't exist just create it.

### Make Sublime Text your Default mq Text Editor

Add the following ling to the `[ui]` section of your .hgrc:
```
editor = /Applications/Sublime\ Text.app/Contents/SharedSupport/bin/subl --wait
```
If the `[ui]` section doesn't exist just create it.

### Remove a Bookmark
```
$ hg bookmark -d my-bookmark
```

### Amend a Commit
```
$ hg update -r <revision>
```
Make changes then:
```
$ hg commit --amend -m "Bug xxxxxx - Implement feature Y r?chewbacca!"
```
or if you don't want to change the commit message:
```
hg amend
```

### Uncommit the Last Commit (not pushed)

```
$ hg uncommit -a
$ hg prune tip
```

### Uncommit all changes from the Current Commit

```
hg uncommit .
```

### Go back to a Specific Date

```
hg update --date 2012-04-04
```

### Submit Changesets for Review

```
hg up revision
moz-phab push <revision>
```

### My Workflow
