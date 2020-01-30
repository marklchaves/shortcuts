/*
 * @license
 * Based on Your First PWA Codelab (https://g.co/codelabs/pwa)
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
		var sh1 = new Shortcut("cme dev", "https://caughtmyeye.dev");
		
		this.add(sh1);
		
		// Let's sort the list of shortcuts by Name
		this.sort();
	}
  */

  // Will erase all shortcuts
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
  
  delete(idx) {
    let itemIdx = parseInt(idx) - 1;
    console.log("Deleting idx = " + itemIdx);
    this.listOfShorties.splice(itemIdx, 1);
    this.sort();
    this.save();
    this.displayShortcuts("shortcuts");
  }

  sort() {
    // As our array contains objects, we need to pass as argument
    // a method that can compare two shortcuts.
    // we use for that a class method, similar to the distance(p1, p2)
    // method we saw in the ES6 Point class in module 4
    // We always call such methods using the name of the class followed
    // by the dot operator
    this.listOfShorties.sort(ShortcutManager.compareByName);
  }

  // class method for comparing two shorties by name
  static compareByName(s1, s2) {
    // JavaScript has builtin capabilities for comparing strings
    // in alphabetical order
    if (s1.name < s2.name) return -1;

    if (s1.name > s2.name) return 1;

    return 0;
  }

  printContactsToConsole() {
    this.listOfShorties.forEach(function(sh) {
      console.log(sh.name);
    });
  }

  load() {
    if (localStorage.contacts !== undefined) {
      // the array of shortcuts is saved in JSON, let's convert
      // it back to a real JavaScript object.
      // TO DO: change name to shortcuts
      this.listOfShorties = JSON.parse(localStorage.contacts);
    }
  }

  save() {
    // We can only save strings in local Storage. So, let's convert
    // ou array of shortcuts to JSON
    localStorage.contacts = JSON.stringify(this.listOfShorties);
  }

  edSaveShorty(idx) {
    let newName = document.querySelector("#shorty-name" + idx);
    if (newName.value.trim() === '') {
      alert('Please name me.');
      return;
    }
    let newUrl = document.querySelector("#copy-link" + idx);
    if (newUrl.value.trim() === '') {
      alert('Can\'t have a blank URL.');
      return;
    }
    let itemIdx = parseInt(idx) - 1;
    this.listOfShorties[itemIdx].name = newName.value;
    this.listOfShorties[itemIdx].url = newUrl.value;
    localStorage.contacts = JSON.stringify(this.listOfShorties);
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

    // iterate on the array of shortcuts
    // To do: Add confirmation modal for delete.
    this.listOfShorties.forEach(function(currentShortcut) {
      card +=
        '\n\n<div class="weather-card">' +
        "<input id='shorty-name" + ++idx + "' type='text' value='" +
        currentShortcut.name + 
        "' onchange='cm.edSaveShorty(" + idx + ");' " +
        "title='Edit Shorty Name' required>" + 
        '&nbsp;<button id="del-button' + idx + '"' + 
        'onclick="cm.delete(' + idx + ');" ' +
        'class="std-button del-button" title="Delete Shorty">&times;</button>' +
        '<div class="copy-card">' +
        '<input id="copy-link' +
        idx +
        '" ' +
        'value="' +
        currentShortcut.url +
        '"' +
        "onchange='cm.edSaveShorty(" + idx + ");' title='Edit Shorty Link' type='url' required>" +
        "&nbsp;" +
        '<button id="copy-button' +
        idx +
        '" ' +
        "onclick=\"alert('Copied')\" " +
        'class="copy-button" ' +
        'data-clipboard-target="#copy-link' +
        idx +
        '" title="Copy to Clipboard">Copy</button>' +
        "</div></div>";
    });

    // adds the table to the div
    container.innerHTML += card;

    /*
    console.log("card = " + card);
    */
  }

}
