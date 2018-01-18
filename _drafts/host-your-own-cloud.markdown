---
title: Host Your Own Cloud
date: '2009-05-05 20:54:00'
tags:
- Mozilla
---

Firstly, the N36L, N40L and N54L are identical apart from their processors so any BIOS mods and hardware mode for one model will work on all three.

The MicroServer is HP’s entry-level server, and as a result is missing several features of higher-end models, in particular hot-swap drive bays. This is a fake restriction put in place by HP – and it can be removed by installing a modified BIOS. Doing so also allows all the SATA ports to run at 3Gb/s – two are limited to 1.5Gb/s by default – and fixes a flaw in the original BIOS that prevents the NIC from operating under certain operating systems.

The BIOS Mod gives you:

* Hot-swappable HDD Bays
* SATA II (3.0GBps on all SATA ports)
* ACPI v3.0

Instructions for upgrading the BIOS are [here](http://terfmop.co.uk/blog/2013/07/31/hp-proliant-n54l-bios-modification-guide-allow-hot-plug-sata-and-5th-sata-port/). As always, be aware that you upgrade the BIOS at your own risk.

When upgrading the memory (2 x 8 Gig is recommended) then go for memory from the [N40L wiki](http://n40l.wikia.com/wiki/Memory)!

When upgrading your hard drive go for a disk from [this page](http://n40l.wikia.com/wiki/Hard_drives). I recommend WD Red drives.

You can also install an SSD or fifth HDD in your server's optical bay. There is a decent article that explains how [here](https://paulroberts69.wordpress.com/2012/01/22/installing-a-hdd-in-the-optical-drive-bay-on-an-hp-microserver-n40l/).

Plug an ethernet cable into **both** of your Microserver's ethernet sockets.

Download the installation ISO from:
http://download.freenas.org/latest/x64/

Burn the ISO to DVD or USB stick using the utility of your choice.

Put the disks that you wish to install to in your MicroServer. The screws and "screwdriver" are attached to the door:
<figure markdown="1">
  ![Screws in Microserver's Door]({{ site.baseurl }}/assets/images/screws-in-microservers-door.jpg)
  <figcaption>Screws in microservers door</figcaption>
</figure>

Plug your thumb drive that you want to use to hold the OS into the USB port on your MicroServer motherboard.

Now boot from your installation DVD / Thumb.

