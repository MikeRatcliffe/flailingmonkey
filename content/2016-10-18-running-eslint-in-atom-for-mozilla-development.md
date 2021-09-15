---
date: 2016-10-18
title: Running ESLint in Atom for Mozilla Development
thumbnail: ./images/Atom Logo.png
featuredImage: ./images/running-eslint-for-atom-development-featured-image.png
slug: running-eslint-in-atom-for-mozilla-development
categories:
  - Mozilla
tags:
  - ESLint
  - Atom
  - Web Development
author: Mike Ratcliffe
authorAvatar: http://www.gravatar.com/avatar/7de9609bb8d1394e8f6236bd0fac2d7b.jpg
authorTwitter: ratcliffe_mike
---

Due to some recent changes in the way that we use eslint to check that our coding style linting Mozilla source code in Atom has been broken for a month or two.

I have recently spent some time working on Atom's linter-eslint plugin making it possible to bring all of that linting goodness back to life!

From the root of the project type:

```shell
./mach eslint --setup
```

Install the linter-eslint package v.8.00 or above. Then go to the package settings and enable the following options:

<figure>

![Eslint Settings](images/Eslint-atom-settings.png)

  <figcaption>Figure 1: Eslint Settings in Atom</figcaption>
</figure>

Once done, you should see errors and warnings as shown in the screenshot below:

<figure>

![Eslint in Atom](images/Eslint-atom.png)

  <figcaption>Figure 1: Eslint in Atom</figcaption>
</figure>
