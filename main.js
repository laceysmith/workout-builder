// define data
const features = [
  {
    title: "Your busy schedule",
    image: "Images/calendar.jpg",
    alt: "A calendar",
  },
  {
    title: "Your fitness goals",
    image: "Images/Swimracestart.jpg",
    alt: "A start of a triathlon",
  },
  {
    title: "Your favorite activities",
    image: "Images/running.jpg",
    alt: "Someone running",
  },
  {
    title: "The weather and time of year",
    image: "Images/raining.jpeg",
    alt: "Raining out the window",
  },
];

console.log(features);


// be able to iterate over our data

// create our html in JS

function createFeature(featureData) {
  const div = document.createElement('div');
  
  const h3 = document.createElement('h3');
  h3.textContent = featureData.title;
  div.appendChild(h3);
  
  const image = document.createElement('img');
  image.src = featureData.image;
  image.alt = featureData.alt;
  div.appendChild(image);
  
  
  return div;
}

console.log(createFeature(features[0]));


// add to the page

const featuresSection = document.querySelector('#features-section');
const section = document.createElement('section');
section.classList.add("features");

for(let i = 0; i < features.length; i++) {
  section.appendChild(createFeature(features[i]));
}

if (featuresSection != null ){
  featuresSection.appendChild(section);
}


const weekSummary = document.querySelectorAll('.week-summary div');
console.log(weekSummary);


// https://www.digitalocean.com/community/tutorials/js-drag-and-drop-vanilla-js
// https://stackoverflow.com/questions/10368367/counting-the-number-of-divs-placed-into-a-div-via-drag-and-drop

let dropzones = document.querySelectorAll('[id^=dropzone]');
let dropzone = null;


function onDragStart(event) {
    event
    .dataTransfer
    .setData('text/plain', event.target.id);

  event
    .currentTarget
    .style
    // .border = 'thick dotted';
    // .borderStyle = "thick double";

    console.log("start happening")
}

function onDragOver (event) {
    console.log(event);
    event.preventDefault();
    dropzone = document.getElementById(event.target.id);
    console.log(dropzone);
    if(!dropzone.id.startsWith('dropzone')) {
      dropzone = document.getElementById(dropzone.parentNode.id);
    }

    console.log("drag happening")
}
// 1. add prefix to the id for day of week
function reorderDraggedElements() {
    const draggedElements = document.querySelectorAll('[id^=dragged]');

    for(let i = 0; i < draggedElements.length; i++) {
      draggedElements[i].id = `dragged-${i+1}`;
    }
  }

function onDrop (event) {
    const id = event
    .dataTransfer
    .getData('text');

    // console.log(document.getElementById(id));
 
    const draggableElement = document.getElementById(id);
    const droppedElement = document.createElement('p');
    droppedElement.textContent = draggableElement.getElementsByTagName('h4')[0].innerHTML;
    droppedElement.classList.add("listedOptions")

    dropzone.appendChild(droppedElement);
    
    reorderDraggedElements();

    draggableElement.style
      .backgroundColor = '#F6f6f6';
    
    event
    .dataTransfer
    .clearData();

    // const nodeCopy = document.getElementById(id).cloneNode(true);
    // nodeCopy.id = "newID";
    // event.target.appendChild(nodeCopy);

    console.log("drop happening");
}

// lets connect what want happen with what is on the page
const draggableElements = document.querySelectorAll('.workout-options-bucket');

for(let i = 0; i < draggableElements.length; i++) {
  draggableElements[i].addEventListener('dragstart', onDragStart);
}


for(let i = 0; i < dropzones.length; i++) {
  dropzones[i].addEventListener('dragover',onDragOver);
  dropzones[i].addEventListener('drop', onDrop);
}


