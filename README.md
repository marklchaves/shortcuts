# Shorties Shortcut App

Nice shorties! Quickly copy/paste your fave URLs without going to bookmarks or the browser. 

[Install](https://shorties.caughtmyeye.cc)

Based on [Your First Progressive Web App][codelab] codelab.

Proudly built on Glitch and proudly hosted on Netlify.

![Glitch Badge](https://badge.glitch.me/shorties)

[![Netlify Status](https://api.netlify.com/api/v1/badges/afb67eaf-5385-474a-ae89-c70a7ad186c2/deploy-status)](https://app.netlify.com/sites/shorties/deploys)

---

## Motivation

We need to share links all the time. This PWA will help save you time if are tired of:

1. Bringing up a browser, typing in a URL, and waiting for the page to load just to copy the link.
2. Brining up a browser, opening up the bookmarks manager, searching for a bookmark and hoping it's in there, then finally copying the link of the bookmark.

## Features

1. Full CRUD (create, read, update, delete) support.
2. Export/import _shorties_ in JSON (JavaScript Object Notation) format. This means you can backup, restore, share, or sync your shortcut links with one file.
3. Search.
4. Lightweight PWA (Progressive Web App).
5. Streamlined interface. E.g. auto saves once input field focus changes.
6. Freely available--no store purchase required.
7. Open source.

## Screen Grabs

![List of Shorties](https://raw.githubusercontent.com/marklchaves/shortcuts/master/screen-grabs/shorties-list-of-shorties.png "List of Shorties")

Listing

---

![Add New Shorty Modal](https://raw.githubusercontent.com/marklchaves/shortcuts/master/screen-grabs/shorties-add-new-modal.png "Add New Shorty Modal")

Add

---

![Import JSON File](https://raw.githubusercontent.com/marklchaves/shortcuts/master/screen-grabs/shorties-import-json.png "Import JSON File")

Import

---

![Copying a Shorty--What it's all about!](https://raw.githubusercontent.com/marklchaves/shortcuts/master/screen-grabs/shorties-copied-shorty.png "Copying a Shorty--What it's all about!")

Copying

---

![Edit Mode](https://raw.githubusercontent.com/marklchaves/shortcuts/master/screen-grabs/shorties-edit-shorty.png "Edit Mode")

Edit Mode

---

![Search](https://raw.githubusercontent.com/marklchaves/shortcuts/master/screen-grabs/shorties-search.png "Search")

Simple Search

---

## Instructions

### Add

1. Click the `+` icon in the lower right hand corner of the app.
1. Enter a Name and URL.
1. Click small + icon or hit enter

### Import

**Import will overwrite everything. Export what you have first as a backup if needed.**

1. Click the `+` icon in the lower right hand corner of the app.
1. Copy the contents of a properly formatted Shorties data [JSON file](shorties-example-data.json).
1. Click Import.

### Copy

1. Click the Copy Button next to any Shorty.
1. Hit enter or click ok on the alert popup. The alert popup must be aknowledge for the Shorty to be copied to your clipboard.

### Edit

1. Click the Edit toggle slider. The slider background turns orange. The background colour of the Name and URL fields turn white and now are editable.
2. Hit the Tab key to save.

Note: The list will automagically be sorted by the Shorty Name.

### Search

Type in the complete Shorty Name. Hit the Tab key. Clear the search field and hit tab to see the full list.

### Export

Click the Export button. Save the file.

### Delete

**You might want to export your list first.**

Click the small `x` icon next any Shorty Name. The delete will take place immediately. There is **no** undo.

## Known Issues

Check the repo's [issues](https://github.com/marklchaves/shortcuts/issues) list.

There are two known issues at the time of this writing.

1. Editing a search result creates a new entry instead of updating the existing. 
2. Dupe names and URLs are currently allows. The search will only return the first hit on the name field only. Try to keep the names unique.

## License

Copyright 2020 Caught My Eye, Dev.

Licensed to the Apache Software Foundation (ASF) under one or more contributor
license agreements. See the NOTICE file distributed with this work for
additional information regarding copyright ownership. The ASF licenses this
file to you under the Apache License, Version 2.0 (the “License”); you may not
use this file except in compliance with the License. You may obtain a copy of
the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed
under the License is distributed on an “AS IS” BASIS, WITHOUT WARRANTIES OR
CONDITIONS OF ANY KIND, either express or implied. See the License for the
specific language governing permissions and limitations under the License.

---

## I'll Drink to That ;-)

<a href='https://ko-fi.com/D1D7YARD' target='_blank'><img height='36' style='border:0px;height:36px;' src='https://az743702.vo.msecnd.net/cdn/kofi5.png?v=2' border='0' alt='Buy Me a Coffee at ko-fi.com' /></a>

[codelab]: https://codelabs.developers.google.com/codelabs/your-first-pwapp/
