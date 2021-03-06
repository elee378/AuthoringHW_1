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

					newSubImg.dataset.index = index;

					//add an event handler to trigger a lightbox
					newSubImg.addEventListener('click', function() { popLightbox(index, objectIndex); }, false);

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

			//trigger the lightbox
			function popLightbox(currentIndex, currentObject){
				//debugger;
				//move the window to the top every time we click - quick bug fix
				window.scrollTo(0, 0);
				document.body.style.overflow = "hidden";
				let lightbox = document.querySelector('.lightbox');
				let lightboxImg = lightbox.querySelector('img');
				let lightboxDesc = lightbox.querySelector('p');
				let lightBoxClose = document.querySelector('.close-lightbox');

				lightbox.style.display = "block";
				lightboxImg.src = "images/" + currentObject.images[currentIndex];
				lightboxDesc.innerHTML = currentObject.imageDescription[currentIndex];

				lightBoxClose.addEventListener('click', closeLightbox, false);
			}

			function closeLightbox(){
				//reset everything, close the lightbox
				//debugger;
				document.body.style.overflow = null;
				let lightbox = document.querySelector('.lightbox');
				let lightboxImg = lightbox.querySelector('img');
				let lightboxDesc = lightbox.querySelector('p');

				lightbox.style.display = "none";
				lightboxImg.src = "#";
				lightboxDesc.innerHTML = "";
			}

			//trigger spring on page load
			//document.querySelector('#spring').click();
			changeElements.call(document.querySelector('#spring'));

})();
