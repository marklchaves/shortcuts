/*
 * @license
 * Your First PWA Codelab (https://g.co/codelabs/pwa)
 * Copyright 2019 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License
 */
"use strict";

(function() {
  new Clipboard(".copy-button");
})();

window.onload = init;

// The shortcut manager as a global variable
let cm;

function init() {
  // create an instance of the contact manager
  cm = new ShortcutManager();

  // cm.addTestData();
  cm.printContactsToConsole();

  // Display shorties
  //cm.displayShortcuts("shortcuts");

  loadList();
}

function formSubmitted() {
  // Get the values from input fields
  let name = document.querySelector("#name");
  let url = document.querySelector("#url");
  let newShortcut = new Shortcut(name.value, url.value);
  cm.add(newShortcut);

  // Empty the input fields
  name.value = "";
  url.value = "https://";

  // refresh the html table
  cm.displayShortcuts("shortcuts");

  // do not let your browser submit the form using HTTP
  return false;
}

function emptyList() {
  cm.empty();
  cm.displayShortcuts("shortcuts");
}

function loadList() {
  cm.load();
  cm.displayShortcuts("shortcuts");
}

/* Added 19 Jan 2020 ~mlc */
function sort() {
  cm.sort();
  cm.displayShortcuts("shortcuts");
}

class Shortcut {
  constructor(name, url) {
    this.name = name;
    this.url = url;
  }
}

class ShortcutManager {
  constructor() {
    // when we build the shortcut manager, it
    // has an empty list of shortcuts
    this.listOfShorties = [];
  }

  /*
	addTestData() {
		var c1 = new Contact("Jimi Hendrix", "jimi@rip.com");
  		var c2 = new Contact("Robert Fripp", "robert.fripp@kingcrimson.com");
  		var c3 = new Contact("Angus Young", "angus@acdc.com");
  		var c4 = new Contact("Arnold Schwarzenneger", "T2@terminator.com");
		
		this.add(c1);
		this.add(c2);
		this.add(c3);
		this.add(c4);
		
		// Let's sort the list of contacts by Name
		this.sort();
	}
  */

  // Will erase all contacts
  empty() {
    this.listOfShorties = [];
  }

  add(shortcut) {
    this.listOfShorties.push(shortcut);
    this.sort();
    this.save();
  }

  remove(shortcut) {
    for (let i = 0; i < this.listOfShorties.length; i++) {
      var s = this.listOfShorties[i];

      if (s.url === shortcut.url) {
        // remove the shortcut at index i
        this.listOfShorties.splice(i, i);
        // stop/exit the loop
        break;
      }
    }
  }

  sort() {
    // As our array contains objects, we need to pass as argument
    // a method that can compare two contacts.
    // we use for that a class method, similar to the distance(p1, p2)
    // method we saw in the ES6 Point class in module 4
    // We always call such methods using the name of the class followed
    // by the dot operator
    this.listOfShorties.sort(ShortcutManager.compareByName);
  }

  // class method for comparing two contacts by name
  static compareByName(c1, c2) {
    // JavaScript has builtin capabilities for comparing strings
    // in alphabetical order
    if (c1.name < c2.name) return -1;

    if (c1.name > c2.name) return 1;

    return 0;
  }

  printContactsToConsole() {
    this.listOfShorties.forEach(function(c) {
      console.log(c.name);
    });
  }

  load() {
    if (localStorage.contacts !== undefined) {
      // the array of contacts is saved in JSON, let's convert
      // it back to a real JavaScript object.
      this.listOfShorties = JSON.parse(localStorage.contacts);
    }
  }

  save() {
    // We can only save strings in local Storage. So, let's convert
    // ou array of contacts to JSON
    localStorage.contacts = JSON.stringify(this.listOfShorties);
  }

  edSaveShorty(idx) {
    // Find the edited shorty and save it.
    let newUrl = document.querySelector("#copy-link" + idx);
    let itemIdx = parseInt(idx) - 1;
    this.listOfShorties[itemIdx] = newUrl.value;
    console.log("Updated list of shorties: " + this.listOfShorties[itemIdx]);
  }
  
  displayShortcuts(sContainer) {
    // empty the container that contains the results
    let container = document.querySelector("#" + sContainer);
    container.innerHTML = "";

    if (this.listOfShorties.length === 0) {
      container.innerHTML =
        "<p style='text-align: center;'>No shorties to display!</p>";
      // stop the execution of this method
      return;
    }

    var card = "";
    var idx = 0;

    // iterate on the array of users
    this.listOfShorties.forEach(function(currentShortcut) {
      /* row.innerHTML = "<td>" + currentContact.name + "</td>"
							+ "<td>" + currentContact.email + "</td>" */

      card +=
        '\n\n<div class="weather-card">' +
        "<p>" +
        currentShortcut.name +
        "</p>" +
        '<div class="copy-card">' +
        '<input id="copy-link' +
        ++idx +
        '" ' +
        'value="' +
        currentShortcut.url +
        '"' +
        "onchange='cm.edSaveShorty(" + idx + ");'>" +
        "&nbsp;&nbsp;" +
        '<button id="copy-button' +
        idx +
        '" ' +
        "onclick=\"alert('Copied')\" " +
        'class="copy-button" ' +
        'data-clipboard-target="#copy-link' +
        idx +
        '">Copy</button>' +
        "</div></div>";
    });

    // adds the table to the div
    container.innerHTML += card;

    /*
    console.log("card = " + card);
    */
  }

}
