---
date: 2013-10-17
title: Firefox Developer Tools Highlighter
thumbnail: ./images/firefox-developer-tools-highlighter.png
featuredImage: ./images/firefox-developer-tools-highlighter-featured-image.png
slug: firefox-developer-tools-highlighter
categories:
  - Mozilla
tags:
  - Web Development
  - Developer Tools
  - Firefox
author: Mike Ratcliffe
authorAvatar: http://www.gravatar.com/avatar/7de9609bb8d1394e8f6236bd0fac2d7b.jpg
authorTwitter: ratcliffe_mike
---

When it comes to the Firefox Developer Tools Inspector one of our most common requests is that our highlighter should support box model highlighting. We are working on implementing this but before we get into full swing we need to know exactly what you want it to look like and how you would like it to act.

Please take a look at how current tools behave and let us know what you would like our box model highlighting to look and behave.

The examples on this page show the different methods of inspecting this div in Firefox Developer Tools, Firebug, Chrome DevTools and Opera Dragonfly:

<div style="width: -moz-fit-content; margin: 0px auto;">
  <div style="width:220px; padding:10px; border: 10px dashed green; margin:10px; font: 14px/13px sans-serif;">
    This is a div with:<br><br>

- padding: 10px;
- border: 10px dashed green;
- margin: 10px;

  </div>

</div>

## Inspection by mousing over content

This is the mode that most people are familiar with. You click the inspect button and move the mouse over the content area to highlight a node.

Firefox Developer Tools use a subtle outline around the border of the hovered element. In addition, a node infobar appears. This infobar allows you to set pseudoclasses such as :hover, delete the node, copy HTML etc. This is currently the only highlight mode used by the tools:

<figure>

![Mouse Inspection (Firefox)](images/mouse-inspection-firefox.png)

  <figcaption>Mouse inspection Firefox</figcaption>
</figure>

Firebug uses a blue outline:

<figure>

![Mouse Inspection (Firebug)](images/mouse-inspection-firebug.png)

  <figcaption>Mouse inspection Firebug</figcaption>
</figure>

Chrome DevTools highlights content, padding, border and margin areas even when inspecting via the mouse. They also display simple node information e.g. node name, width and height:

<figure>

![Mouse Inspection (Chrome)](images/mouse-inspection-chrome.png)

  <figcaption>Mouse inspection Chrome</figcaption>
</figure>

Opera Dragonfly also highlights content, padding, border and margin areas even when inspecting via the mouse. In addition it shows guides outlining the border of the element:

<figure>

![Mouse Inspection (Opera)](images/mouse-inspection-opera.png)

  <figcaption>Mouse Inspection Opera</figcaption>
</figure>

## Inspection by mousing over the layout (box model) panel

Firebug brings out the big guns here and highlights all of the different layout components. It also outlines the node's active container in a dashed red line and adds rulers to it (useful for absolutely positioned elements). In case this is not enough it adds guides around the section being hovered (content, border etc.):

<figure>

![Box model content hover (Firebug)](images/box-model-content-hover-firebug.png)

  <figcaption>Box model content hover Firebug</figcaption>
</figure>

Chrome DevTools highlights only the content, padding, border or margin depending on which is being hovered:

<figure>

![Box model content hover (Chrome)](images/box-model-content-hover-chrome.png)

  <figcaption>Box model content hover Chrome</figcaption>
</figure>

## Inspection by mousing over the nodes in the Markup (HTML) panel

Firebug shows the box model (content, padding, border and margin):

<figure>

![HTML Panel node hover (Firebug)](images/html-panel-node-hover-firebug.png)

  <figcaption>HTML Panel node hover Firebug</figcaption>
</figure>

Chrome DevTools and Opera Dragonfly act exactly the same as when mousing over content.

So the question is what would you like the Firefox Developer Tools highlighter to look like and how should it act in each of the situations above. It doesn't need to act like any other highlighter so be creative!
