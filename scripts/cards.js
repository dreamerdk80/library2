const domainName = window.location.hostname
const homeBtn = document.querySelectorAll(".home")
const langDescription = document.querySelector(".lang-description")
const cards = document.querySelector(".cards")
const langBtn = document.querySelectorAll(".lang-btn")
const popup = document.querySelector(".popup")
const container = document.querySelector(".container")
const popupDialog = document.querySelector(".popup-dialog")
const reader = document.querySelector(".reader")
let result

window.addEventListener("load", async () => {
    result = await fetch("json/cards.json")
        .then(res => res.json())

    generateCards()

    
})

function generateDescriptionHTML(card) {
    return `
        <div class="description">
            <figure class="title">
                <img src="${card.icon}" alt="">

                <figcaption>
                    <h1>${card.title}</h1>
                </figcaption>
            </figure>

            ${card.text}
        </div>
    `
}

function generateCardHTML(card) {
    return `
        <figure class="card">
            <img src="${card.image}" alt="">

            <figcaption>
                <p class="card-author">${card.author}</p>

                <h2 class="card-name">${card.title}</h2>

                <div class="btns">
                    <button onclick='generatePopupHTML("${card.title}", "${card.author}", "${card.description}")' class="details">
                        Подробнее
                    </button>

                    <button onclick='generateReadBookHTML("${card.file}")' class="details">
                        Читать
                    </button>
                </div>
            </figcaption>
        </figure>
    `
}

function generatePopupHTML(title, author, description) {
    popup.innerHTML =  `
        <h5>${title}</h5>
        <h6>${author}</h6>
        <span></span>
        <p>${description}</p>
        <button class="popup-close-btn" onclick="closeModalWindow()">Закрыть</button>
    `
    popup.style.display = "flex"
    popup.showModal()
    popup.scrollTo(0, 0)
}

function closeModalWindow() {
    window.closeModal.close()
    popup.style.display = "none"
}

function generateReadBookHTML(file) {
    let srcBook = "https://" + domainName + file
    reader.innerHTML = `
        <iframe class="reader-iframe" src="${srcBook}"></iframe>
        <button class="reader-close-btn" onclick="closeReader()">Закрыть</button>
    `
    console.log(domainName)
    reader.style.display = "flex"
    reader.showModal()
}

function closeReader() {
    window.closeModalBook.close()
    reader.style.display = "none"
}

function generateCards() {
    for (let i = 0; i < langBtn.length; i++) {
        langBtn[i].addEventListener("click", () => {
            const language = langBtn[i].id
            const card = result[language]
            cards.innerHTML = ""
            
            if (links.style.top == "92px") {
                links.style.top = "-3000px"
            }
            
            window.scrollTo(0, 0)

            langDescription.innerHTML = generateDescriptionHTML(card[0])

            for (let j = 1; j < card.length; j++) {
                cards.innerHTML += generateCardHTML(card[j])
            }

            container.classList.add("container-hidden")
        })
    }
}

homeBtn.forEach(home => {
    home.addEventListener("click", () => {
        container.classList.remove("container-hidden")
        langDescription.innerHTML = ""
        cards.innerHTML = ""

        window.scrollTo(0, 0)
    })
})