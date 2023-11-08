// Scroll section
let sections = document.querySelectorAll('section');
let navlinks = document.querySelectorAll('nav ul li a');

// Smooth scrolling function
function smoothScroll(target, duration) {
  let targetElement = document.querySelector(target);
  let targetPosition = targetElement.offsetTop;
  let startPosition = window.pageYOffset;
  let distance = targetPosition - startPosition;
  let startTime = null;

  function animation(currentTime) {
    if (startTime === null) startTime = currentTime;
    let timeElapsed = currentTime - startTime;
    let run = ease(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, run);
    if (timeElapsed < duration) requestAnimationFrame(animation);
  }

  function ease(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  }

  requestAnimationFrame(animation);
}

// Add click event listener to nav links
navlinks.forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    let target = link.getAttribute('href');
    smoothScroll(target, 500);
  });
});

// Scrolling
window.onscroll = () => {
  sections.forEach((sec) => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 100;
    let height = sec.offsetHeight;
    let id = sec.getAttribute('id');

    if (top >= offset && top < offset + height) {
      // Remove active class from all nav bar links
      navlinks.forEach((link) => {
        link.classList.remove('active');
      });

      // Add active class to the corresponding nav bar link
      document.querySelector('nav ul li a[href*=' + id + ']').classList.add('active');
    }
  });

  // Sticky header
  let header = document.querySelector('.header');
  header.classList.toggle('sticky', window.scrollY > 200);
};

// document.querySelector('#dark').addEventListener("click", function(){
//   document.querySelector('body').style.backgroundColor = "black";
//   document.querySelector('body').style.color = "white";


// });
