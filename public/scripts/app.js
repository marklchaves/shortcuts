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

let searchField;
let shortiesDiv;

function init() {
  // create an instance of the contact manager
  cm = new ShortcutManager();

  // TEST
  // cm.addTestData();
  // cm.printContactsToConsole();

  // Display shorties - stub out if testing
  cm.displayShortcuts("shortcuts");

  // Search
  searchField = document.querySelector("#searchField");
  shortiesDiv = document.querySelector("#shortcuts");
  
  // Event Listners
  const expSh = document.getElementById("exportShorties");
  expSh.addEventListener("click", exportToJsonFile, false);
  const impSh = document.getElementById("importShorties");
  impSh.addEventListener("click", importJsonFile, false);
  //const impText = document.getElementById("importTextArea");
  //impText.addEventListener("change", importJsonFile, false);

  loadList();

  // Stub out if testing.
  makeReadOnly("shorty-name");
  makeReadOnly("copy-link");
}

// To do: Make some of these static?

// Make all the input fields read-only when the page is loaded.
// To do: Change background color for read-only.
function makeReadOnly(toggleID) {
  for (let i = 1; i <= cm.listOfShorties.length; i++) {
    document.querySelector("input[id=" + toggleID + i + "]").readOnly = true;
    document.querySelector("input[id=" + toggleID + i + "]").classList.toggle('read-only'); 
  }
}

// Handle the toggling between edit and read-only.
// To do: Change background color for read-only. DONE ~mlc 24 Feb 2020
function toggle(checkboxID) {
  let checkbox = document.getElementById(checkboxID);
  let toggle;
  let toggleID = "shorty-name";
  for (let i = 1; i <= cm.listOfShorties.length; i++) {
    toggle = document.getElementById(toggleID + i);
    let updateToggle = checkbox.checked
      ? (toggle.readOnly = false)
      : (toggle.readOnly = true);
    document.querySelector("input[id=" + toggleID + i + "]").classList.toggle('read-only'); 
  }
  toggleID = "copy-link";
  for (let i = 1; i <= cm.listOfShorties.length; i++) {
    toggle = document.getElementById(toggleID + i);
    let updateToggle = checkbox.checked
      ? (toggle.readOnly = false)
      : (toggle.readOnly = true);
    document.querySelector("input[id=" + toggleID + i + "]").classList.toggle('read-only'); 
  }
}

function formSubmitted() {
  // Get the values from input fields
  let name = document.querySelector("#name");
  let url = document.querySelector("#url");
  let newShortcut = new Shortcut(name.value, url.value);
  cm.add(newShortcut);

  // To do: Refactor so don't loop through all inputs for one add.
  makeReadOnly("shorty-name");
  makeReadOnly("copy-link");

  // Empty the input fields
  name.value = "";
  url.value = "https://";

  // refresh the html table
  cm.sort();
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
  cm.sort();
  cm.displayShortcuts("shortcuts");
}

/* Added 19 Jan 2020 ~mlc */
function sort() {
  cm.sort();
  cm.displayShortcuts("shortcuts");
}

/* Added 20 Feb 2020 ~mlc */
function searchShorties() {
  // Display everything if nothing is entered.
  if (searchField.value.trim() === "") {
    cm.displayShortcuts("shortcuts");
    return;
  }
  const found = cm.listOfShorties.find(
    element => element.name === searchField.value.trim()
  );
  if (found) {
    shortiesDiv.innerHTML =
      cm.renderShortcut(1, found);
  } else {
    shortiesDiv.innerHTML = "<h2 style='text-align: center;'>Not Found</h2>";
  }
}

/* Added 21 Feb 2020 ~mlc */
function exportToJsonFile() {
  let jsonData = cm.listOfShorties;
  let dataStr = JSON.stringify(jsonData);
  let dataUri =
    "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);

  let exportFileDefaultName = "data.json";

  let linkElement = document.createElement("a");
  linkElement.setAttribute("href", dataUri);
  linkElement.setAttribute("download", exportFileDefaultName);
  linkElement.click();
}

/* Added 22 Feb 2020 ~mlc */
function importJsonFile() {
  let importedJSONText = document.getElementById("importTextArea").value;
  let importedJSON;
  if (importedJSONText.trim()) {
    try {
      importedJSON = JSON.parse(importedJSONText.trim());
    } catch (e) {
      alert(e);
    }
    if (importedJSON) {
      cm.listOfShorties = importedJSON;
      cm.sort();
      cm.save();
      cm.displayShortcuts("shortcuts");
      
      makeReadOnly("shorty-name");
      makeReadOnly("copy-link");

      alert("Imported " + Object.keys(importedJSON).length + " objects!");
      console.log("Imported!");
      document.getElementById("importTextArea").value = '';
    }
  } else {
    alert("Nothing to import.");
  }
}


/**
 * || Class
 */
class Shortcut {
  constructor(name, url) {
    this.name = name;
    this.url = url;
  }
}

/**
 * || Class
 */
class ShortcutManager {
  constructor() {
    // when we build the shortcut manager, it
    // has an empty list of shortcuts
    this.listOfShorties = [];
  }

  /* TEST */
  addTestData() {
    var sh = new Shortcut("cme dev", "https://caughtmyeye.dev");
    this.add(sh);

    sh = new Shortcut("cme webdev", "https://caughtmyeye.dev/webdev/");
    this.add(sh);

    // Let's sort the list of shortcuts by Name
    this.sort();
  }

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
    this.listOfShorties.sort(ShortcutManager.compareByName);
  }

  // Class method for comparing two shorties by name.
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
    if (localStorage.shorties !== undefined) {
      // the array of shortcuts is saved in JSON, let's convert
      // it back to a real JavaScript object.
      // TO DO: change name to shortcuts
      this.listOfShorties = JSON.parse(localStorage.shorties);
    }
  }

  save() {
    // We can only save strings in local Storage. So, let's convert
    // ou array of shortcuts to JSON
    localStorage.shorties = JSON.stringify(this.listOfShorties);
  }

  edSaveShorty(idx) {
    let newName = document.querySelector("#shorty-name" + idx);
    if (newName.value.trim() === "") {
      alert("Please name me.");
      return;
    }
    let newUrl = document.querySelector("#copy-link" + idx);
    if (newUrl.value.trim() === "") {
      alert("Can't have a blank URL.");
      return;
    }
    let itemIdx = parseInt(idx) - 1;
    this.listOfShorties[itemIdx].name = newName.value;
    this.listOfShorties[itemIdx].url = newUrl.value;
    localStorage.shorties = JSON.stringify(this.listOfShorties);
    this.sort();
    this.displayShortcuts("shortcuts");
  }

  // Render one shortcut.
  renderShortcut(idx, sc) {

    // console.log('idx = ' + idx);
    
    let card = 
      '\n\n<div id="shorties-list" class="weather-card">' +
      "<input id='shorty-name" +
      idx +
      "' type='text' value='" +
      sc.name +
      "' onchange='cm.edSaveShorty(" +
      idx +
      ");' " +
      "title='Edit Shorty Name' required>" +
      '&nbsp;<button id="del-button' +
      idx +
      '"' +
      'onclick="cm.delete(' +
      idx +
      ');" ' +
      'class="std-button del-button" title="Delete Shorty">&times;</button>' +
      '<div class="copy-card">' +
      '<input id="copy-link' +
      idx +
      '" ' +
      'value="' +
      sc.url +
      '"' +
      "onchange='cm.edSaveShorty(" +
      idx +
      ");' title='Edit Shorty Link' type='url' required>" +
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

    return card;

  }

  // To do: Refactor to be reusable. Maybe public static.
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

    for (let i = 0; i < this.listOfShorties.length; i++) {
      // console.log('displayShortcuts idx = ' + idx);
      card += this.renderShortcut(++idx, this.listOfShorties[i]);
    }

    // adds the table to the div
    container.innerHTML += card;

    // console.log("card = " + card);    
  }
}
