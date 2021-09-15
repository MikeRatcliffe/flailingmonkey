---
date: 2010-07-10
title: Firebug Inspector Improvements
thumbnail: ./images/firebug-inspector-improvements.jpg
featuredImage: ./images/firebug-highlighter-featured-image.png
slug: firebug-inspector-improvements
categories:
  - Mozilla
tags:
  - Web Development
  - Firebug
  - Developer Tools
author: Mike Ratcliffe
authorAvatar: http://www.gravatar.com/avatar/7de9609bb8d1394e8f6236bd0fac2d7b.jpg
authorTwitter: ratcliffe_mike
---

Almost a year since I last posted, I can't believe it. I am no longer spending time working on Firebug Lite, but am spending my spare time these days working on Firebug's inspector.

There are three versions of the inspector's highlighter:

1. The frame highlighter is the blue frame that appears around elements when you click the inspect button and move the mouse cursor around the screen.
2. The box highlighter appears when you mouse over HTML nodes in the HTML panel... this highlighter covers the element with a blue box, the element's margin with a yellow box etc. this is similar to the inspector used in the layout side panel except that the layout panel version can also display rulers in the elements parent.
3. The image map highlighter appears when you inspect an image that has a related image map.

There have been a whole host of bugs that we have worked on when it comes to the inspector. These bugs can be neatly divided into 4:

1. Inspector not playing nicely with framesets... because calculating the position of elements within framesets is much more difficult there are naturally a lot of offset problems.
2. People sometimes do some whacky things with web pages like setting the HTML tag to position absolute etc. This can affects the position of every element on a page, so we needed to make changes to get this working properly.
3. Disabled elements could not be inspected. Because inspected elements block all events, not only click events, no mouseover events are triggered, because the inspector needs this event to inspect an element this was not possible.
4. Because the inspector consists of a set of divs injected into a page the CSS styles from the page were often inherited by the inspector's divs.

Finding solutions for these problems took time and sanity. The solution to points 1 & 2 were simple enough... simply calculate offsets and apply them to the highlighter. The fix for point 3 was to add proxy elements to the page to enable disabled elements to be inspected, these proxies are transparent divs that are positioned directly over disabled elements. Inspecting these proxy divs simply passed the disabled element to the inspector so that it could be highlighted. The solution to point 4 was to add styles to the highlighters divs with !important to set margins, padding etc. to zero to cancel out any CSS that the inspector would inherit.

Since fixing these problems there have only been small issues with the inspector, so there has really not been very much for me to do but one thing has become very apparent... these fixes are not good enough! Apart from the fact that we should never be injecting elements into web pages there are many shortcomings to these fixes. The proxy elements are injected into a page when you click inspect, if a disabled element is moved after you begin inspecting then the proxy and highlighter will be in the wrong position. We could change this to monitor the disabled elements and update the proxies as appropriate but that would cause big performance issues on lots of pages. The biggest problem is with fix number 4...

By choosing CSS styles and setting them to 0 !important we effectively stop the elements from inheriting CSS styles, but the list of elements that we need to do this with is becoming much larger. One of the first styles that we blocked was `-moz-opacity` but then Firefox chose to support `opacity`. Then CSS transforms came along and whichever new CSS attributes come along all of the time. This is what Ryan Wolf discusses [here](http://web.archive.org/web/20111001031820/http://borderstylo.com/posts/177-adding-nodes-to-the-dom-with-style)... he is currently working on the Glass extension (now defunkt) and has had a similar set of experiences in making that extension inspector work.

I have known for a long time that we would ultimately need to stop injecting the highlighters into the target page and move them into the browsers chrome. It made sense to use a transparent panel and draw shapes on the panel as somebody inspects the page. To do this I created a prototype that used a canvas in a transparent panel to render the shapes and this appeared to work well minus a couple of performance problems. I hit another brick wall with canvas... it is not possible to use transforms on canvas. I had a discussion with a Firefox developer recently who said that it would make sense to use SVG instead because the canvas was just used for displaying geometric shapes. I have since discovered that SVG will also allow transforms to be applied to the shapes that are drawn on it, this is the direction that I am planning on taking the inspector. Here is how I would like it to work:

When a user clicks on inspect the web page is overlayed by a transparent panel that contains SVG content. This overlay will listen for mousemove events and use getElementFromPoint to get the element to be inspected. There will be three methods that the inspector calls and these will highlight the element using the SVG versions of the frame highlighter, the box highlighter or the image map highlighter. Using this transparent overlay has some great advantages that I had not really considered very much. One thing that people often request is the ability to inspect dynamic elements. As an example click inspect, go to a dropdown menu and select a dropdown menu item... when you inspect the item the menu detects the mouse leaving the menu area and the menu collapses. As as a result of the menu collapsing the highlighter highlights where the element was and not where it now is.

I am planning on making the inspector modular so that custom highlighters can be added. This will allow extensions to do some cool things like displaying lines when inspecting to show offsets etc.

With the transparent overlay we could optionally cancel events sent to the page and send events using an inspector specific context menu instead. The dynamic menu could now be highlighted by right-clicking the parent element, choosing mouseover then inspecting the child node that is now visible.

I think that using this technique will make Firebug's inspector much more powerful... I am also interested in your feedback about the idea would be much appreciated as you may be able to think about things that I have not considered.
