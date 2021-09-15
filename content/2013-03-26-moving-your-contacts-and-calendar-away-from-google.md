---
date: 2013-03-26
title: Moving your Contacts and Calendar Away from Google
thumbnail: ./images/moving-your-contacts-and-calendar-away-from-google.jpg
featuredImage: ./images/freedom.jpg
slug: moving-your-contacts-and-calendar-away-from-google
categories:
  - Google
tags:
  - Privacy
  - CalDAV
  - CardDAV
author: Mike Ratcliffe
authorAvatar: http://www.gravatar.com/avatar/7de9609bb8d1394e8f6236bd0fac2d7b.jpg
authorTwitter: ratcliffe_mike
---

For the past few years I have used Google Contacts to store my contacts and Google Calendar to store my calendars. These services really are excellent, particularly because they allow me to keep my data synchronized between my Android phone and numerous instances of Thunderbird on PCs and Laptops. Unfortunately, I have had issues with my contacts becoming duplicated and even disappearing altogether. I figure that out of roughly 500 contacts I have lost around 200. This really got me thinking, I mean, should I really rely on somebody else to look after my data?

I don't know exactly why Google run these services but that is part of the problem. They are an advertising company, after all, and the more data they can collect about me and the people I know the better they can target me with their adverts. Maybe I am paranoid but now that they are dropping Google Reader I just don't trust them to the extent that I once did.

Don't get me wrong, I am not a Google hater, I truly believe that their search engine is excellent and that nothing else comes close to providing such accurate search results, at least when I am not logged in.
There are a number of services that allow this kind of synchronization but I have chosen to use [ownCloud](https://owncloud.org/ "ownCloud") as it appears to be the most capable open source solution. I have included installation instructions here for the good of the web.

## Installing ownCloud

### If you own your own server

Follow the instructions [here](http://software.opensuse.org/download/package?project=isv:ownCloud:community&package=owncloud "Installing ownCloud on your own server").

### Shared hosting

- In your hosts control panel select the latest version of PHP, for JustHost this is in CPanel under PHP Config.
- Right-click [here](https://download.owncloud.com/download/community/setup-owncloud.php "ownCloud installer") and save the file to your computer.
- Copy the file to http://yourdomain.com/setup-owncloud.php
- Open http://yourdomain.com/setup-owncloud.php in your browser.
- Add a username and password but **do not click "Next."**
- Click <kbd>Advanced</kbd> and select your database options. A MySQL DB will be way faster than a SQLite DB.
- Accept the default options.

## Exporting Contacts from Google Contacts

At the time of writing, exporting contacts from Google Contacts as a .vcf file only exports one name, phone number and email address per contact. Fortunately, if you export your contacts from an Android phone you will keep all of your contact information including mugshots. To do this:

- From a Home or All Apps screen, touch the People icon.
- Select <kbd>Menu</kbd> &rarr; <kbd>Import / Export</kbd>.
- Select <kbd>Export to storage</kbd>.
- Touch "OK" to confirm.

A file with the .vcf extension will be saved to the root directory of your phone's internal storage. This file contains all of your contacts including their photos. Transfer this file to your computer via a USB cable or email.

- Go to http://yourdomain.com/owncloud/
- Click <kbd>Contacts</kbd> &rarr; <kbd>Import</kbd>.
- Select the file .vcf file that you copied to your computer and click OK to import.

## Importing Calendar to ownCloud

- Go to [http://www.google.com/calendar/](http://www.google.com/calendar/ "Google Calendar")
- Click <kbd>&#9881;</kbd> &rarr; <kbd>Settings</kbd> &rarr; <kbd>Calendars</kbd> &rarr; <kbd>Export Calendar</kbd>.
- Save the .ics file to your computer.
- Go to http://yourdomain.com/owncloud/
- Click Files and drag the .ics file into the files window in order to upload it.
- Click on the .ics file.
- In the Import calendar dialog that appears select "Default calendar" and click import.
- When the calendar has been imported close the dialog and delete the .ics file.

## Configure Thunderbird

### Configure Calendar

- Uninstall the Provider for Google Calendar add-on.
- Install [SOGo Connector](http://www.sogo.nu/files/downloads/SOGo/Thunderbird/ "SOGo Connector").
- Install [MoreFunctionsForAddressBook](http://nic-nac-project.org/~kaosmos/morecols-en.html "MoreFunctionsForAddressBook").
- Install the [Lightning extension](https://addons.mozilla.org/en-US/thunderbird/addon/lightning/ "Lightning").
- In your owncloud calendar copy your calendar's CalDAV link.
- Back in Thunderbird open the calendar.
- Click <kbd>File</kbd> &rarr; <kbd>New Calendar</kbd> &rarr; <kbd>On the Network</kbd> &rarr; <kbd>Next</kbd> &rarr; <kbd>CalDAV</kbd>.
- Type the following into the location field:
- http://yourdomain/owncloud/remote.php/caldav/calendars/USERNAME/CALENDARNAME (the default calendar name is defaultcalendar).
- Check <kbd>Offline Support</kbd>.
- Click <kbd>Next</kbd>
- Give your calendar a name and an email address. The email address is used for email notifications.

### Configure Contacts

- Uninstall the Google Contacts addon.
- Install [SOGo Connector](http://www.sogo.nu/files/downloads/SOGo/Thunderbird/ "SOGo Connector").
- In Thunderbird open the Address Book.
- <kbd>File</kbd> &rarr; <kbd>New</kbd> &rarr; <kbd>Remote Address Book</kbd>.
- Give your address book a name.
- Type the URL into the appropriate field. The URL is found in your OwnCloud Contacts area, that little Gear symbol in the bottom left of the Contacts View (same symbol as found in the top right in the Calendar view). Click on the little world (CardDAV Link) symbol and it will display the URL you need for your installation to work.
- Click <kbd>OK</kbd>.
- Right-click the newly created address book and choose synchronize and your contacts should download.

## Configure Android Phone

### Clear Current Google Apps

- Go to <kbd>Application Manager</kbd> &rarr; <kbd>All</kbd>
- <kbd>Google Calendar Sync</kbd> &rarr; <kbd>Clear Data</kbd> &rarr; <kbd>OK</kbd> &rarr; <kbd>Disable</kbd> &rarr; <kbd>OK</kbd>.
- <kbd>Google Contacts Sync</kbd> &rarr; <kbd>Clear Data</kbd> &rarr; <kbd>OK</kbd> &rarr; <kbd>Disable</kbd> &rarr; <kbd>OK</kbd>.

### Contacts

1. Go to <kbd>People</kbd>.
2. Choose <kbd>Settings</kbd> &rarr; <kbd>Accounts</kbd> &rarr; <kbd>Your Google account</kbd>.
3. Clear the checkbox so that Google Contacts are no longer synchronized.
4. Install CardDAV from the Google Play Store. There is a free version CardDAV-Sync free beta and a paid version called CardDAV-Sync beta. The paid version syncs more contact fields. You can start with the free and upgrade later.
5. Run CardDAV-Sync and use these settings:
6. Server URL: &lt;servername&gt;/owncloud/remote.php/carddav/
   - Use SSL: check accordingly.
   - Username: your login name.
   - Password: your password.
7. Click <kbd>OK</kbd>.
8. Go back to People.
9. Choose <kbd>Settings</kbd> &rarr; <kbd>Contacts to display</kbd> &rarr; <kbd>Customize</kbd>.
10. Expand your Google account and clear all of it's checkboxes.
11. Expand your CardDAV account and check all of of it's checkboxes.
12. Click <kbd>OK</kbd> and your contacts will be synchronized.

### Calendar

1. Install CalDAV from the Google Play Store. There is a free version called CalDAV-Sync free beta and a paid version called CalDAV-Sync beta, both written by Marten Gajda.
2. Open Calendar.
3. Choose <kbd>&#9881;</kbd> &rarr; <kbd>Settings</kbd> &rarr; <kbd>Your Google account</kbd>.
4. Clear the checkbox so that Google Calendar is no longer synchronized.
5. Click <kbd>Add Account</kbd> &rarr; <kbd>CalDAV</kbd> and use these settings.
6. Server URL: &lt;servername&gt;/owncloud/remote.php/caldav/
   - Use SSL: check accordingly.
   - Username: your login name.
   - Password: your password.
   - Click Next.
7. Under "Select accounts to sync" select all appropriate calendars.
8. Click <kbd>Next</kbd>.
9. Enter the email address. The email address is used for email notifications.
10. Click OK and your calendar(s) will be synchronized.
11. Go to <kbd>phone Settings</kbd> &rarr; <kbd>Accounts</kbd> &rarr; <kbd>Google</kbd> &rarr; Select the Google account with the sync icon next to it &rarr; Uncheck <kbd>calendar</kbd>.

Congratulations, you now no longer need an external service to synchronize your contacts and calendar. As a bonus there are a bunch of ownCloud add-ons that give you much more power than you previously had.
