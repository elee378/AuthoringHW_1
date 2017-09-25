(function(){
	"use strict";
	console.log("SEAF Fired");

	var theImages = document.querySelectorAll('.image-holder'),
			theHeading = document.querySelector('.heading'),
			theSubhead = document.querySelector('.main-copy h2'),
			theSeasonText = document.querySelector('.main-copy p'),
			appliedClass;

			// i want to change all the content on the page
			function changeElements(){
				//debugger; //this is a special term that stops code execution, can be used for testing
				let subImages = document.querySelector('.subImagesContainer');
				let objectIndex = dynamicContent[this.id];

				//remove duplicate images
				while (subImages.firstChild) {
					subImages.removeChild(subImages.firstChild);
				}

				//add the images to the bottom of the page
				objectIndex.images.forEach(function(image, index) {
					//create and image element
					let newSubImg = document.createElement('img');
					//add a css class to it
					newSubImg.classList.add('thumb');
					//set the src
					newSubImg.src = "images/" + objectIndex.images[index];
					//add it to the page
					subImages.appendChild(newSubImg);
				});

				//remove the colours we applied on the last click
				theSubhead.classList.remove(appliedClass);
				theHeading.classList.remove(appliedClass);

				//change the text using the values of the properties in the object
				theSubhead.firstChild.nodeValue = objectIndex.headline;
				theSeasonText.firstChild.nodeValue = objectIndex.text;

				//adding the content from contentObject.js
				theSubhead.classList.add(this.id);
				theHeading.classList.add(this.id);

				appliedClass = this.id;
			}

			theImages.forEach(function (image, index){ //for loop for "theImages"
				//add an event handler for each image
				image.addEventListener('click', changeElements, false);
			});

			//trigger spring on page load
			//document.querySelector('#spring').click();
			changeElements.call(document.querySelector('#spring'));

})();
