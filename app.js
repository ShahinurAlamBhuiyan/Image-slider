const imagesArea = document.querySelector('.images');
const gallery = document.querySelector('.gallery');
const galleryHeader = document.querySelector('.gallery-header');
const searchBtn = document.getElementById('search-btn');
const sliderBtn = document.getElementById('create-slider');
const sliderContainer = document.getElementById('sliders');
const input = document.getElementById('search');
// selected image 
let sliders = [];


// If this key doesn't work
// Find the name in the url and go to their website
// to create your own api key
const KEY = '15674931-a9d714b6e9d654524df198e00&q';

// show images 
const showImages = (images) => {
  const inputValue = document.getElementById('search').value;
  if (images.length == 0) {
    toggleShow();
    alert('put a valid item...');
  }
  else if (inputValue == '' ) {
    toggleShow();
    alert('put a name for image...');
  }
  else {
    toggleShow();
    imagesArea.style.display = 'block';
    gallery.innerHTML = '';
    // show gallery title
    galleryHeader.style.display = 'flex';
    images.forEach(image => {
      let div = document.createElement('div');
      div.className = 'col-lg-3 col-md-4 col-xs-6 img-item mb-2';
      div.innerHTML = ` <img class="img-fluid img-thumbnail" onclick=selectItem(event,"${image.webformatURL}") src="${image.webformatURL}" alt="${image.tags}">`;
      gallery.appendChild(div);
    })
  }
  input.value = '';
}

const getImages = async (query) => {
  toggleShow();
  const url = `https://pixabay.com/api/?key=${KEY}=${query}&image_type=photo&pretty=true`
  const res = await fetch(url)
  const data = await res.json()
  showImages(data.hits)
}

let slideIndex = 0;
const selectItem = (event, img) => {
  let element = event.target;
  element.classList.add('added');

  let item = sliders.indexOf(img);
  if (item === -1) {
    sliders.push(img);
  }
  else{
      delete sliders[item];
      element.classList.toggle('added');
  }
}
var timer
const createSlider = () => {
  // check slider image length
  if (sliders.length < 2) {
    alert('Select at least 2 image.')
  }
  const duration = document.getElementById('duration').value || 1000;
  document.getElementById('duration').value = '';
  if (duration < 0) {
    alert("Duration value can't be negative! Please, enter a positive value" );
    return;
  }
  else {
    // crate slider previous next area
    sliderContainer.innerHTML = '';
    const prevNext = document.createElement('div');
    prevNext.className = "prev-next d-flex w-100 justify-content-between align-items-center";
    prevNext.innerHTML = ` 
    <span class="prev" onclick="changeItem(-1)"><i class="fas fa-chevron-left"></i></span>
    <span class="next" onclick="changeItem(1)"><i class="fas fa-chevron-right"></i></span>
    `;

    sliderContainer.appendChild(prevNext)
    document.querySelector('.main').style.display = 'block';
    // hide image aria
    imagesArea.style.display = 'none';
    sliders.forEach(slide => {
      let item = document.createElement('div')
      item.className = "slider-item";
      item.innerHTML = `<img class="w-100"
    src="${slide}"
    alt="">`;
      sliderContainer.appendChild(item)
    })
    changeSlide(0)
    timer = setInterval(function () {
      slideIndex++;
      changeSlide(slideIndex);
    }, duration);
  }
}

// change slider index 
const changeItem = index => {
  changeSlide(slideIndex += index);
}

// change slide item
const changeSlide = (index) => {
  const items = document.querySelectorAll('.slider-item');
  if (index < 0) {
    slideIndex = items.length - 1
    index = slideIndex;
  };
  if (index >= items.length) {
    index = 0;
    slideIndex = 0;
  }
  items.forEach(item => {
    item.style.display = "none"
  })
  items[index].style.display = "block"
}

// Search button clicked & 'Enter' button active...
searchBtn.addEventListener('click', function () {
  document.querySelector('.main').style.display = 'none';
  clearInterval(timer);
  const search = document.getElementById('search');
  getImages(search.value)
  sliders.length = 0;
})
input.addEventListener("keypress", function (event) {
  if (event.key === 'Enter') {
    document.getElementById("search-btn").click();
  }
});

// to click the 'create slider' button...
sliderBtn.addEventListener('click', function () {
  createSlider()
})

// Function : To display Spinner...
const toggleShow = () => {
  const spinner = document.getElementById("spinnerDiv");
  spinner.classList.toggle('d-none');
}

// Click Home Button ....
document.getElementById("homeClicked").addEventListener('click', function () {
  document.getElementById("sliderImg").style.display = 'none';
  document.getElementById("allData").style.display = 'block';
})