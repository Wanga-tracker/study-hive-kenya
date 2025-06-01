const db = firebase.firestore();
const auth = firebase.auth();
const userId = auth.currentUser ? auth.currentUser.uid : null;

auth.onAuthStateChanged(user => {
  if (!user) window.location.href = 'index.html';
});

document.querySelector('.hamburger').addEventListener('click', () => {
  document.querySelector('.sidebar').classList.toggle('open');
});

document.querySelectorAll('.sidebar a').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const sectionId = link.getAttribute('href').substring(1);
    document.querySelectorAll('.section').forEach(section => {
      section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');
  });
});

if (userId) {
  db.collection('users').doc(userId).get().then(doc => {
    if (!doc.data().hasSeenSimulation) {
      showSimulation();
    }
  });
}

function showSimulation() {
  const modal = document.getElementById('simulation-modal');
  modal.style.display = 'flex';
  fetch('assets/simulation.json')
    .then(response => response.json())
    .then(slides => {
      const swiperWrapper = document.querySelector('.swiper-wrapper');
      slides.forEach(slide => {
        const slideDiv = document.createElement('div');
        slideDiv.classList.add('swiper-slide');
        slideDiv.innerHTML = `<h2>${slide.title}</h2><p>${slide.content}</p>`;
        swiperWrapper.appendChild(slideDiv);
      });
      new Swiper('.swiper-container', {
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      });
    });
  // db.collection('users').doc(userId).update({ hasSeenSimulation: true });
}
