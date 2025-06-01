fetch('assets/facts.json')
  .then(response => response.json())
  .then(facts => {
    const factWidget = document.getElementById('fact-widget');
    let index = 0;
    setInterval(() => {
      factWidget.textContent = facts[index].text;
      index = (index + 1) % facts.length;
    }, 30000);
  })
  .catch(err => console.error('Error loading facts:', err));
