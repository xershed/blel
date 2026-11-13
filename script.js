function toggleExpand(titleElement) {
    const sectionContent = titleElement.nextElementSibling;
    if (!sectionContent || !sectionContent.classList.contains('expandable-content')) return;

    // Quando clicchi un titolo, questa riga apre o chiude il blocco sotto di esso.
    sectionContent.classList.toggle('active');

    // Se clicco h2, allora chiudo anche l'h3 che sta sotto.
    if (titleElement.tagName === 'H2') {
        const thirdTitle = titleElement.parentElement.querySelector('h3.expandable');
        const thirdSectionContent = thirdTitle ? thirdTitle.nextElementSibling : null;

        if (thirdSectionContent) {
            const shouldOpen = sectionContent.classList.contains('active');
            thirdSectionContent.classList.toggle('active', shouldOpen);
        }

        const sectionImage = document.querySelector('.box-image');
        if (sectionImage) sectionImage.classList.toggle('active', sectionContent.classList.contains('active'));
    }
}

function openHeadingSection(titleElement) {
    // Questa funzione apre il contenuto collegato a un titolo specifico.
    // È usata sia dal click che dal trigger automatico dello scroll.
    if (!titleElement) return;

    const sectionContent = titleElement.nextElementSibling;
    if (!sectionContent || !sectionContent.classList.contains('expandable-content')) return;

    sectionContent.classList.add('active');

    // Se sto aprendo un h2, faccio comparire anche l'immagine della sezione.
    if (titleElement.tagName === 'H2') {
        const sectionImage = document.querySelector('.box-image');
        if (sectionImage) sectionImage.classList.add('active');
    }
}

function revealSecondBox() {
    // Questa funzione viene chiamata ogni volta che c'è uno scroll.
    const sectionBox = document.getElementById('box');
    if (!sectionBox) return;

    // Trovo il primo h2 dentro la sezione box.
    const secondTitle = sectionBox.querySelector('h2.expandable');
    if (!secondTitle) return;

    // getBoundingClientRect() mi dice la posizione dell'elemento rispetto alla finestra del browser.
    const titlePosition = secondTitle.getBoundingClientRect();
    if (titlePosition.top < window.innerHeight - 100) {
        // Quando h2 entra nella vista, lo apro e subito dopo apro anche h3 dopo 800ms.
        openHeadingSection(secondTitle);

        const thirdTitle = sectionBox.querySelector('h3.expandable');
        if (thirdTitle) {
            setTimeout(() => openHeadingSection(thirdTitle), 800);
        }

        // Una volta aperto, tolgo l'evento scroll perché non serve più.
        window.removeEventListener('scroll', revealSecondBox);
    }
}


function revealfourthBox() {
  const thirdBox = document.querySelector('h4.expandable');
  if (!thirdBox) return;
const titlePosition = thirdTitle.getBoundingClientRect();
if (titlePosition.top < window.innerHeight - 100) {
    openHeadingSection(thirdBox);
  window.addEventListener('scroll', revealfourthBox);
revealfourthBox();
  }
}

// Qui si registra un ascoltatore: ogni volta che la pagina viene scrollata, chiama revealSecondBox().
window.addEventListener('scroll', revealSecondBox);

// Eseguo subito la funzione anche all'inizio per controllare se la sezione è già in vista.
revealSecondBox();
