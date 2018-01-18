---
title: Installing VPN from the Linux Command Line
date: '2015-09-02 20:55:56'
tags:
- Mozilla
current: installingvpnfromthelinuxcommandline
featuredimage: installing-vpn-from-the-linux-command-line.jpg
---

To stop people snooping on what we are doing on the internet or when restrictive governments prevent people from accessing popular websites you can use a VPN to protect your privacy and allow you to access the internet without restrictions.

Most VPN providers provide simple step-by-step instructions to get VPN set up on most operating systems but many fail to give instructions about how to autostart a VPN in a non graphical environment.

The following will work with the files provided by most VPN providers with a couple of small changes:

Of course, the url that your provider uses may be different:

<figure markdown="1">
```powershell
# Get the Files from your Provider
$ cd /tmp
$ wget https://www.privateinternetaccess.com/openvpn/openvpn.zip
$ unzip openvpn.zip

# Copy Certificates to /etc/openvpn
$ cp ca.crt /etc/openvpn/
$ cp crl.pem /etc/openvpn/

# Enable Autologin
$ nano /etc/openvpn/login.conf

# Edit file to contain your username and password on the first two lines:
your-privateinternetaccess-username
your-privateinternetaccess-password

<ctrl><x> to exit and Y to save.

$ chmod 400 /etc/openvpn/login.conf

# Point OpenVPN Towards the Right Files. The .ovpn files may
# not be by country so substitute them as appropriate.
$ nano Country.ovpn

# Edit the file to prefix the pem and crt paths with:
/etc/openvpn/

# Change the auth-user-pass line to read:
auth-user-pass /etc/openvpn/login.conf

<ctrl><x> to exit and Y to save.

$ cp Country.ovpn /etc/openvpn/Country.conf

# Autostart the VPN. "Country" is the name of your .conf file without
# any extension so in my case Country.conf (see the previous steps).
$ nano /etc/default/openvpn

# Edit the file so it contains:
AUTOSTART="Country"

# Check that Autostart is Working
$ reboot
```
  <figcaption>Installing VPN from the Linux command line</figcaption>
</figure>

To check if the VPN is running open lynx and go to google.com. It should take you to the specific countries site.

That is it, you are done!
