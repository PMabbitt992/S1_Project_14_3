"use strict";

/*
   New Perspectives on HTML5, CSS3, and JavaScript 6th Edition
   Tutorial 12
   Case Problem 3

   Author: Paige Mabbitt
   Date: 4.8.19  

   Filename: js_tree.js

   Global Variables:
   nodeCount
      Running count of all nodes in the source document
   elementCount
      Running count of all element nodes in the source document
   textCount
      Running count of all text nodes in the source document
   wsCount
      Running count of all white space text nodes in the source document


   Functions List:
   makeTree() 
      Sets up and places the node tree within the HTML document and
      displays the node counts from the document

   makeBranches(treeNode, nestedList)
      Makes a list item or an ordered list based on the contents and type
      of node from the sourceNode parameter and then appends that list
      item or ordered list to nestedList. The function recursively calls 
      itself to navigate throught the node tree of the source document.

   isWhiteSpaceNode(tString)
      Returns true if tString represents the text of a white space text
      node and false if it doesn't
*/


//Global variable declaration
var nodeCount = 0;
var elemCount = 0;
var textCount = 0;
var wsCount = 0;
//Run makeTree when the window loads
window.onload = makeTree;

//makeTree function
function makeTree() {
      // aside element with id treeBox and h1 element containing the text "Node Tree"
      var aside = document.createElement("aside");
      aside.setAttribute("id", "treeBox");
      var h1 = document.createElement("h1");
      h1.textContent = "Node Tree";
      //attach h1 to aside and aside to the main section
      aside.appendChild(h1);
      document.getElementById("main").appendChild(aside);
      // ordered list element appended to aside
      var nodeList = document.createElement("ol");
      aside.appendChild(nodeList);
      //SOurce article is equal to the article element within the element with id main
      var sourceArticle = document.querySelector("#main article");
      //run makeBranches with sourceArticle and nodeList
      makeBranches(sourceArticle, nodeList);
      //span with each individual id equal the amount specified in each variable
      document.getElementById("totalNodes").innerHTML = nodeCount;
      document.getElementById("elemNodes").innerHTML = elemCount;
      document.getElementById("textNodes").innerHTML = textCount;
      document.getElementById("wsNodes").innerHTML = wsCount;
}

function makeBranches(treeNode, nestedList) {
      //node count goes up, an li is created with a span attached
      nodeCount += 1;
      var liElem = document.createElement("li");
      liElem.innerHTML = "+--";
      var spanElem = document.createElement("span");
      liElem.appendChild(spanElem);
      nestedList.appendChild(liElem);

      //id the treeNode is an element node, it will be classified as such and the name will be displayed
      if (treeNode.nodeType === 1) {
            elemCount += 1;
            spanElem.setAttribute("class", "elementNode");
            spanElem.textContent = "<" + treeNode.nodeName + ">";
            //if its a text node, textcount will go up 1 and continue to the next if statment
      } else if (treeNode.nodeType === 3) {
            textCount += 1;
            var textString = treeNode.nodeValue;
            //is there is whitespace, it will be displayed as #text and classified as whitespace
            if (isWhiteSpaceNode(textString)) {
                  wsCount += 1;
                  spanElem.setAttribute("class", "whiteSpaceNode");
                  spanElem.textContent = "#text";
                  //if not, it will be classified as a text node
            } else {
                  spanElem.setAttribute("class", "textNode");
                  spanElem.textContent = textString;
            }
      }
      //for the amount of child nodes, an ol element with | inside will be created and makeBranches will be run with n and newList
      if (treeNode.childNodes.length > 0) {
            var newList = document.createElement("ol");
            newList.textContent = "|";
            nestedList.appendChild(newList);
            for (var n = treeNode.firstChild; n != null; n = n.nextSibiling) {
                  makeBranches(n, newList);
            }
      }
}




function isWhiteSpaceNode(tString) {
      return !(/[^\t\n\r ]/.test(tString));
}