// ***** JS AJAX HOMEWORK *****

// WHAT SHOULD YOU DO ?

// - Use https://dog.ceo/dog-api/ API

// - Create a page which should have one select field, where you could choose between 5 dog breeds

// - When breed is selected, page should load random image from that breed, every 5 seconds

// STEPS:

// STEP 1:

// Create HTML page, with select field predefined. It should contain 5 options, and each of them should be one breed. Each option should have a value (make sure that those values of breeds exist in that format on Dog API). First option should be defined by default.

// STEP 2:

// Create global variable for breed, and by default set it's value to value of first option inside select

// STEP 3:

// Add event listener on select, for changing a value. Each time value is changed you should get event target value, and set it as a value of already defined breed variable.

// STEP 4:

// Create new HTTP request, open it, and create load function that should handle response. When you open request, you should pass there an url, however, since we want to have different breeds, so url will be dynamic.

// First find needed URL structure on Dog API website.

// Then, in request open method, define url like this:

//   "Part of an url" + breed + "Part of an url"

// STEP 5:

// Create a function that should get image url as an argument, if there is no dog image on the page it should add it, and if it exist, it should change it's src to value you get as an parameter.

// STEP 6:

// Call this function inside of request load method, and pass image URL into this function as an parameter. You should first JSON.parse response in order to get image url from it.

// STEP 7:

// Set interval, which should, every 5 seconds, send request

var breed = document.querySelector("option").value;
var select = document.querySelector("select");
var timer = null;

select.addEventListener("change", function (e) {
  breed = e.target.value;
  return getBreed(breed, createDogImage); // When value is changed we want picture of that breed
});

select.addEventListener("mouseover", function () {
  var h1 = document.querySelector("h1");
  h1.textContent = "Woof Woof";
  // stop interval
  clearInterval(timer);
});

select.addEventListener("mouseleave", function () {
  var h1 = document.querySelector("h1");
  h1.innerHTML = "&#128062 Select your favorite breed &#128062";
  // Start interval again
  timer = setInterval(() => {
    getBreed(breed, createDogImage);
  }, 5000);
});

function getBreed(breed, createDogImage) {
  var request = new XMLHttpRequest();
  var requestUrl = "https://dog.ceo/api/breed/" + breed + "/images/random";

  request.open("GET", requestUrl);

  request.onload = function () {
    if (request.status === 200 || request.status === 201) {
      var getUrl = JSON.parse(request.responseText).message;
      createDogImage(getUrl);
    }
  };
  request.send();
}

function createDogImage(url) {
  var body = document.querySelector("body");
  var img = document.createElement("img");
  var getImg = document.querySelector("img");

  if (!getImg) {
    img.setAttribute("src", url);
    body.append(img);
  } else {
    getImg.setAttribute("src", url);
  }
}

// Change image on 5 s
timer = setInterval(() => {
  getBreed(breed, createDogImage);
}, 5000);

getBreed(breed, createDogImage); // Inital create image on page load
