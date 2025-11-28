// filters.js

let currentSubject = null;
let activeLevels = new Set();

const subfilterOptions = {
    kuaile: [
        { id: "grade1", label: "Grado 1" },
        { id: "grade2", label: "Grado 2" },
        { id: "grade3", label: "Grado 3" }
    ],
    math: [
        { id: "grade1", label: "Grado 1" },
        { id: "grade2", label: "Grado 2" }
    ],
    hsk: [
        { id: "hsk1", label: "HSK1" },
        { id: "hsk2", label: "HSK2" },
        { id: "hsk3", label: "HSK3" }
    ]
};

const subfilterContainer = document.getElementById("subfilters");

document.querySelectorAll(".subject-btn").forEach(btn => {
    btn.addEventListener("click", () => setSubject(btn));
});

function setSubject(button) {
    currentSubject = button.dataset.subject;
    activeLevels.clear();

    document.querySelectorAll(".subject-btn").forEach(b => b.classList.remove("active"));
    button.classList.add("active");

    generateLevelFilters(currentSubject);
    applyFilters();
}

function generateLevelFilters(subject) {
    subfilterContainer.innerHTML = "";
    subfilterOptions[subject].forEach(opt => createLevelButton(opt));
}

function createLevelButton(opt) {
    const btn = document.createElement("button");
    btn.className = "filter-btn sub-btn";
    btn.textContent = opt.label;
    btn.dataset.level = opt.id;

    btn.addEventListener("click", () => toggleLevelFilter(opt.id, btn));

    subfilterContainer.appendChild(btn);
}

function toggleLevelFilter(levelId, button) {
    if (activeLevels.has(levelId)) {
        activeLevels.delete(levelId);
        button.classList.remove("active");
    } else {
        activeLevels.add(levelId);
        button.classList.add("active");
    }
    applyFilters();
}

function applyFilters() {
    const cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        const subjectMatches = card.dataset.subject === currentSubject;
        const levelMatches = activeLevels.size === 0 || activeLevels.has(card.dataset.level);
        card.classList.toggle("hide", !(subjectMatches && levelMatches));
    });
}
