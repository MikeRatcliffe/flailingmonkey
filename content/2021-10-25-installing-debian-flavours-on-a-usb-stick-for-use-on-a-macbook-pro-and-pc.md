---
date: 2021-10-25
title: Installing Debian Flavours on a USB Stick For Use on a MacBook Pro and PC
thumbnail: ./images/installing-debian-flavours-on-a-usb-stick-for-use-on-a-macbook-pro-and-pc.png
featuredImage: ./images/installing-debian-flavours-on-a-usb-stick-for-use-on-a-macbook-pro-and-pc-featured-image.png
slug: installing-debian-flavours-on-a-usb-stick-for-use-on-a-macbook-pro-and-pc
categories:
  - Linux
tags:
  - Debian
  - Kali
  - Parrot OS
  - Ubuntu
  - Linux Mint
author: Mike Ratcliffe
authorAvatar: https://www.gravatar.com/avatar/7de9609bb8d1394e8f6236bd0fac2d7b.jpg
authorTwitter: ratcliffe_mike
---

Before I begin let me just say that these instructions worked for me but if you break or lose anything then I am not responsible.

I recently tried running a bunch of "Live" Linux distributions from USB but was shocked to realize that you can't update them. I always thought that adding "persistence" would make this possible but that just adds a persistent partition to your USB stick. The operating system itself remains read-only.

This kind of limited "live" setup just isn't for me... I want a full Linux release that:

- Runs from a USB stick.
- Can be updated using `apt update`, `apt upgrade` and `app dist-upgrade`.
- Can be booted on PCs and my MacBook Pro Retina (2016 model).
- WIFI should work on most PCs and my MacBook Pro Retina (2016 model).

It really should be completely indistinguishable from Linux installed from the hard disk. Sure, it will run a little more slowly due to the thumb drives limitations but I want a useable OS.

This shouldn't be so hard should it? As it turns out, MacBooks make this hard. This is because they don't follow the same EFI model as other vendors, available drivers for their WIFI cards don't tend to come with Linux flavours by default.

Even when WIFI drivers exist they often don't work without you making modifications and there is very little information online explaining how this is to be done.

So, let's get started!

## Set Up Your USB Sticks

### You Will Need

- PC or Laptop - You will need this so that you can install the OS and boot into it to make changes.
- Mac - Our goal is to boot your new OS on your Mac, so you will need this.
- USB1 - We need to burn your Linux install ISO to this.
- USB2 - This is your target USB drive on which we will install the operating system. This should be at least 32G but you are better off using at least 128G in my opinion.

### 1. Flash Your Debian ISO to USB1

The first thing you will need to do is download the ISO:

- [Debian](https://www.debian.org/download)
- [Parrot OS](https://www.parrotsec.org/download/)
- [Kali Linux (bare metal version)](https://www.kali.org/get-kali/#kali-bare-metal)
- [Ubuntu](https://ubuntu.com/download)
- [Linux Mint](https://linuxmint.com/download.php)
- [MX Linux](https://mxlinux.org/download-links/)
- [Antix (antiX-xx.y_x64-full.iso)](https://sourceforge.net/projects/antix-linux/files/Final/)

Now burn the ISO to USB1 using your favourite tool. I suggest using [Balena Etcher](https://www.balena.io/etcher/).

### 2. Install your Debian Flavour to USB2

So you now have an source USB stick (USB1) and a USB stick on which you want to install the operating system (USB2). This is fairly simple if you follow these steps:

1. Using a PC, delete all partitions on the target USB stick (USB2). This is necessary for some Debian flavours so that the installer can see the target USB stick.
2. Insert your source USB stick (USB1) into a PC and boot from it.
3. As soon as it boots, stick the target USB stick into a second USB port.
4. Run through the steps like you would if you were installing to a hard disk but when you are at the disk selection stage it is very important to choose your target USB drive (USB2).
5. There is usually an option to use the whole drive so you should choose that.
6. Traditionally, Linux uses different partitions for `/home`, `/var` and `/tmp`. There is no need to do this when installing onto a single disk (or USB stick) although you may choose to install `/home` to its own partition if you want to encrypt it.
7. After the installation shut down your PC and unplug the source USB stick(USB1). You should now be able to boot your new operating system from your target USB stick (USB2).

## Make Changes to Make Your Installation Work on a MacBook Pro

### Fix OSX Boot

Whilst most vendors are flexible in their approach to EFI booting their operating systems, Apple are very rigid. OSX can only see a startup disk if it has an `EFI/boot/bootx64.efi` file on the EFI System partition.

For some reason, Debian installers don't seem to create a `bootx64.efi` file in that path but the fix is fairly simple: copy and rename the file from the vendors folder to the OSX supported path.

#### 1. Identify the EFI Partition

To do this you will need to use `sudo fdisk -l`. Here you can see my thumb drive is `/dev/sdc` and my `EFI System` is `/dev/sdc1`.

```shell
Disk /dev/sdc: 114.61 GiB, 123060879360 bytes, 240353280 sectors
Disk model:  SanDisk 3.2Gen1
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disklabel type: gpt
Disk identifier: 33781042-B5EE-E342-933B-AA857D5FFCC7

Device      Start       End   Sectors   Size Type
/dev/sdc1    4096    618495    614400   300M EFI System
/dev/sdc2  618496 240348464 239729969 114.3G Linux filesystem
```

#### 2. Mount and Fix the EFI Partition

```shell
sudo mount /dev/sdc1 /mnt
cd /mnt/EFI/
sudo mkdir boot
```

The next command will vary according to your particular flavour of Debian. In a nutshell we just need to `cp your-debian-flavour/grubx64.efi boot/bootx64.efi`:

```shell
# Debian
sudo cp Debian/grubx64.efi boot/bootx64.efi

# Parrot OS
sudo cp Parrot/grubx64.efi boot/bootx64.efi

# Kali Linux
sudo cp kali/grubx64.efi boot/bootx64.efi

# Ubuntu & Linux Mint
sudo cp ubuntu/grubx64.efi boot/bootx64.efi

# MX Linux & Antix (the folder varies... MX15, MX17 etc.)
sudo cp MX15/grubx64.efi boot/bootx64.efi
```

That's it, you should now be able to boot from the USB stick on your MacBook Pro by inserting the USB stick and booting whilst holding down the `[Option]` key and then choosing the `EFI Boot` option.

Just don't expect your WIFI to work though. If it does then you are lucky enough to have a supported WIFI card but chances are that you will need to fix it.

### Fix WIFI

Linux WIFI on a MacBook Pro is famously unreliable. Chances are that you either won't be able to see your WIFI card or that if you can then you probably can't authenticate with your access point. Let's fix that.

#### 1. Identify Your Network Card

```shell
# Run the following command to get the name, hardware ID and version of your network card
sudo lspci -nn | grep Network

# This is the output on my laptop

03:00.0 Network controller [0280]: Broadcom Inc. and subsidiaries BCM43602 802.11ac Wireless LAN SoC [14e4:43ba] (rev 02)
```

There are a bunch of different network cards used in MacBooks and I can't cover them all here. If your Network Card is a BCM43602 with a hardware ID of 14e4:43ba then these instructions apply.

If your card isn't a BCM43602 then this procedure is also likely to work as long as you have a Broadcom card.

If it doesn't work then you should follow instructions for your card starting [here](https://wiki.debian.org/bcm43xx#Drivers) instead.

#### 2. Add "non-free" Repositories

Add a "non-free" component to `/etc/apt/sources.list` for your Debian version, for example:

```shell
# Debian 9 "Stretch"
deb http://deb.debian.org/debian stretch-backports main contrib non-free

# Debian 10 "Buster"
deb http://deb.debian.org/debian buster-backports main contrib non-free
```

#### 3. Install the Relevant linux-image, linux-headers and broadcom-sta-dkms Packages

```shell
sudo apt update
sudo apt install linux-image-$(uname -r|sed 's,[^-]*-[^-]*-,,') linux-headers-$(uname -r|sed 's,[^-]*-[^-]*-,,') broadcom-sta-dkms
```

#### 4. Rescue if Install fails in Previous Step (Optional)

```shell
sudo apt install -f
sudo dpkg-reconfigure broadcom-sta-dkms
```

#### 5. Check the Built DKMS Kernel Modules

Check all the built DKMS kernel modules. There should be `wl.ko` in the list.

```shell
sudo find /lib/modules/$(uname -r)/updates
```

#### 6. Unload Conflicting Modules

```shell
sudo modprobe -r b44 b43 b43legacy ssb brcmsmac bcma
```

#### 7. Load the wl Module

```shell
sudo modprobe wl
```

#### 8. Install and Tweak Firmware

This is the firmware config file for the BCM43602 card only. If this is not your card then there is no need to install it.

```shell
cd /tmp
wget https://gist.githubusercontent.com/MikeRatcliffe/9614c16a8ea09731a9d5e91685bd8c80/raw/38180b6a0ce552e1a3a2826ffea2bf1f52d05e9f/brcmfmac43602-pcie.txt
```

Open `brcmfmac43602-pcie.txt` and populate `macaddr=xx:xx:xx:xx:xx:xx` in the file with your Mac's real mac address.

```shell
sudo apt install firmware-brcm80211
sudo cp ~/Desktop/brcmfmac43602-pcie.txt /lib/firmware/brcm/brcmfmac43602-pcie.txt
sudo rmmod brcmfmac
sudo modprobe brcmfmac
```

And then you will need to restart your network services. It's probably best to just reboot to make sure it takes.

From this point on you should have full wireless access... hopefully!
