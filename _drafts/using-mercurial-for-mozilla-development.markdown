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

### Make Sublime Text your Default mq Text Editor
Add the following ling to the `[ui]` section of your .hgrc:
```
editor = /Applications/Sublime\ Text.app/Contents/SharedSupport/bin/subl --wait
```
If the `[ui]` section doesn't exist just create it.

### Remove a Bookmark
```
$ hg tag -l -r my-bookmark my-bookmark-tag
$ hg bookmark -d my-bookmark

# If you receive an immutable changeset error
# then you need to make the changeset mutable
# using:
#   hg phase --draft --force my-bookmark-tag

$ hg strip my-bookmark-tag
```

### Amend a Commit
```
$ hg update -r 273685
```
Make changes then:
```
$ hg commit --amend -m "Bug xxxxxx - Implement feature Y r?=chewbacca"
```

### Uncommit the Last Commit (not pushed)
```
$ hg uncommit -a
$ hg prune tip
```

### Go Back to a Previous Changeset

Say you want to go back to revision number 273176. Simply remove all the revisions after that one (note that this is the revision number **after** the one you want):
```
$ hg strip -r 273177: # back to rev. 273176
```

### Submit Changesets for Review

If you have a bookmark at at the top of your log and the changes you want reviewed all have the same bug number:
```
hg push review
```

If a bookmark contains commits that relate to multiple bugs you will need to cherrypick them for review:
```
hg push -c 273685 # push the single changeset 273685

or

hg push -r 273686::273688 review # push changesets 273686, 273687 & 273688
```

### My Workflow
