// konfigurator-page.js - Configurator logic with book-style popup

// Configuration modules
const MODULES = [
    {
        id: 'module1',
        title: 'Wo wollen Sie gelesen werden?',
        subtitle: 'Veröffentlichung & Markt',
        options: [
            { id: 'digital_global', label: 'Digital Global (E-Book)', description: 'Amazon Kindle, Apple, Tolino' },
            { id: 'print_de_eu', label: 'Print Deutschland & EU', description: 'Buchhandel, VLB, Amazon.de' },
            { id: 'print_tr_export', label: 'Print Türkei / Export', description: 'D&R, Idefix, Trendyol' },
            { id: 'print_tr_de_import', label: 'Print Türkei ➝ Deutschland / Import', description: 'POD in DE für TR-Titel' }
        ]
    },
    {
        id: 'module2',
        title: 'Wobei benötigen Sie Unterstützung?',
        subtitle: 'Text & Qualität',
        options: [
            { id: 'korrektorat', label: 'Korrektorat', description: 'Rechtschreibung' },
            { id: 'lektorat', label: 'Lektorat', description: 'Inhalt & Stil' },
            { id: 'translate_de_tr', label: 'Übersetzung: DE ➝ TR' },
            { id: 'translate_tr_de', label: 'Übersetzung: TR ➝ DE' },
            { id: 'translate_en', label: 'Übersetzung: Englisch' },
            { id: 'klappentext', label: 'Klappentext-Erstellung' },
            { id: 'ai_check', label: 'Kostenloser DVA AI-Check', description: 'Lade deine ersten 10 Seiten hoch', upload: true }
        ]
    },
    {
        id: 'module3',
        title: 'Wie soll Ihr Buch aussehen?',
        subtitle: 'Design & Format',
        options: [
            { id: 'cover_profi', label: 'Cover Design: Profi-Paket' },
            { id: 'cover_template', label: 'Cover Design: Template' },
            { id: 'cover_lokalisierung', label: 'Cover Lokalisierung' },
            { id: 'satz_roman', label: 'Buchsatz: Roman (Text)' },
            { id: 'satz_sachbuch', label: 'Buchsatz: Sachbuch (Visual)' },
            { id: 'hardcover', label: 'Hardcover Ausstattung' },
            { id: 'ebook_barrierefrei', label: 'Barrierefreies E-Book' }
        ]
    },
    {
        id: 'module4',
        title: 'Wie bauen wir Reichweite auf?',
        subtitle: 'Marketing',
        options: [
            { id: 'amazon_ads', label: 'Amazon Ads (EU)' },
            { id: 'social_ads', label: 'Social Media Ads', description: 'Diaspora Fokus' },
            { id: 'presse_de', label: 'Pressearbeit / Blogger DE' },
            { id: 'marktplatz_tr', label: 'Marktplatz Ads Türkei', description: 'Trendyol/Hepsiburada' },
            { id: 'buchhandel_tr', label: 'Buchhandels-Push Türkei', description: 'Kitapyurdu' },
            { id: 'influencer_tr', label: 'Influencer Seeding TR', disabled: true }
        ]
    },
    {
        id: 'module5',
        title: 'Mehr als nur ein Buch.',
        subtitle: 'Vision',
        options: [
            { id: 'fulfillment', label: 'Fulfillment & Lagerung', description: 'Nur DACH' },
            { id: 'stipendium', label: 'Bewerbung: "Brückenbauer"-Stipendium' },
            { id: 'netflix_pitch', label: 'Netflix / TV Scouting Pitch', disabled: true },
            { id: 'ai_audiobook', label: 'AI-Audiobook Produktion', disabled: true }
        ]
    }
];

let currentStep = 0;
let selectedOptions = {};
let uploadedFile = null;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    const openBtn = document.getElementById('openConfigBtn');
    const closeBtn = document.getElementById('closeConfigBtn');
    const prevBtn = document.getElementById('prevBtn');
    const overlay = document.getElementById('configOverlay');
    
    openBtn.addEventListener('click', openConfigurator);
    closeBtn.addEventListener('click', closeConfigurator);
    prevBtn.addEventListener('click', goToPrevious);
    
    // Close on overlay click
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            closeConfigurator();
        }
    });
    
    renderQuestion();
});

function openConfigurator() {
    document.getElementById('configOverlay').classList.add('is-open');
    document.body.style.overflow = 'hidden';
}

function closeConfigurator() {
    document.getElementById('configOverlay').classList.remove('is-open');
    document.body.style.overflow = '';
}

function updateProgress() {
    const totalSteps = MODULES.length + 1; // +1 for contact form
    const progress = ((currentStep + 1) / totalSteps) * 100;
    
    document.getElementById('progressBar').style.width = progress + '%';
    document.getElementById('progressText').textContent = `Schritt ${currentStep + 1} von ${totalSteps}`;
    
    // Update prev button
    document.getElementById('prevBtn').disabled = currentStep === 0;
}

function renderQuestion() {
    const container = document.getElementById('questionsContainer');
    
    // Clear previous
    container.innerHTML = '';
    
    if (currentStep < MODULES.length) {
        // Render module question
        const module = MODULES[currentStep];
        const slide = createModuleSlide(module);
        container.appendChild(slide);
    } else {
        // Render contact form
        const slide = createContactSlide();
        container.appendChild(slide);
    }
    
    // Update left page with answered questions
    updateAnsweredQuestions();
    
    updateProgress();
    
    // Animate in
    setTimeout(() => {
        container.querySelector('.question-slide').classList.add('active');
    }, 50);
}

function updateAnsweredQuestions() {
    const leftPage = document.getElementById('leftPage');
    
    // Build answered questions list
    let answeredHTML = '';
    let hasAnswers = false;
    
    for (let i = 0; i < currentStep; i++) {
        const module = MODULES[i];
        const answers = selectedOptions[module.id];
        
        if (answers && answers.length > 0) {
            hasAnswers = true;
            const answerLabels = answers.map(optionId => {
                const option = module.options.find(o => o.id === optionId);
                return option ? option.label : '';
            }).filter(Boolean).join(', ');
            
            answeredHTML += `
                <div class="answered-item">
                    <div class="answered-title">${module.title}</div>
                    <div class="answered-value">${answerLabels}</div>
                </div>
            `;
        }
    }
    
    if (hasAnswers) {
        leftPage.innerHTML = `
            <h2>Deine Auswahl</h2>
            <div class="answered-questions">
                ${answeredHTML}
            </div>
            <div class="konfig-navigation">
                <button class="btn-nav btn-prev" id="prevBtn" ${currentStep === 0 ? 'disabled' : ''}>
                    ← Zurück
                </button>
            </div>
        `;
    } else {
        leftPage.innerHTML = `
            <h2>Jetzt anfragen</h2>
            <p>Beantworte ein paar Fragen und wir erstellen dir ein maßgeschneidertes Angebot.</p>
            <div class="konfig-navigation">
                <button class="btn-nav btn-prev" id="prevBtn" disabled>
                    ← Zurück
                </button>
            </div>
        `;
    }
    
    // Re-attach event listener
    document.getElementById('prevBtn').addEventListener('click', goToPrevious);
}

function createModuleSlide(module) {
    const slide = document.createElement('div');
    slide.className = 'question-slide';
    
    let html = `
        <h3 class="question-title">${module.title}</h3>
        <p class="question-subtitle">${module.subtitle}</p>
        <div class="question-options">
    `;
    
    module.options.forEach(option => {
        const isDisabled = option.disabled ? 'disabled' : '';
        const isChecked = selectedOptions[module.id]?.includes(option.id) ? 'checked' : '';
        
        html += `
            <label class="option-item ${isDisabled}" data-option="${option.id}">
                <input 
                    type="checkbox" 
                    class="option-checkbox" 
                    value="${option.id}"
                    data-module="${module.id}"
                    ${isChecked}
                    ${isDisabled ? 'disabled' : ''}
                >
                <div class="option-label">
                    <strong>${option.label}</strong>
                    ${option.description ? `<br><small>${option.description}</small>` : ''}
                </div>
            </label>
        `;
        
        // Add upload field if needed
        if (option.upload) {
            html += `
                <div class="upload-area">
                    <div class="upload-label">Upload (Optional)</div>
                    <p class="upload-subtext">Word/PDF, erste 10 Seiten</p>
                    <input type="file" accept=".pdf,.doc,.docx" id="fileUpload">
                </div>
            `;
        }
    });
    
    html += `
        </div>
        <button class="btn-next" id="nextBtn">Weiter →</button>
    `;
    
    slide.innerHTML = html;
    
    // Add event listeners
    slide.querySelectorAll('.option-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', handleOptionChange);
    });
    
    slide.querySelector('#nextBtn').addEventListener('click', goToNext);
    
    // File upload
    const fileInput = slide.querySelector('#fileUpload');
    if (fileInput) {
        fileInput.addEventListener('change', handleFileUpload);
    }
    
    return slide;
}

function createContactSlide() {
    const slide = document.createElement('div');
    slide.className = 'question-slide';
    
    slide.innerHTML = `
        <h3 class="question-title">Fast geschafft!</h3>
        <p class="question-subtitle">Ihre Kontaktdaten</p>
        
        <form class="contact-form" id="contactForm" name="konfigurator" method="POST" data-netlify="true">
            <input type="hidden" name="form-name" value="konfigurator">
            <input type="hidden" name="configuration" id="configData">
            
            <div class="form-row">
                <div class="form-group">
                    <label class="form-label">Vorname *</label>
                    <input type="text" name="vorname" class="form-input" required>
                </div>
                <div class="form-group">
                    <label class="form-label">Nachname *</label>
                    <input type="text" name="nachname" class="form-input" required>
                </div>
            </div>
            
            <div class="form-row">
                <div class="form-group">
                    <label class="form-label">E-Mail *</label>
                    <input type="email" name="email" class="form-input" required>
                </div>
                <div class="form-group">
                    <label class="form-label">Telefon</label>
                    <input type="tel" name="telefon" class="form-input">
                </div>
            </div>
            
            <div class="form-group">
                <label class="form-label">Nachricht</label>
                <textarea name="nachricht" class="form-textarea" placeholder="Weitere Anmerkungen..."></textarea>
            </div>
            
            <button type="submit" class="btn-next">
                JETZT STRATEGIE-ANGEBOT ANFORDERN
            </button>
        </form>
    `;
    
    const form = slide.querySelector('#contactForm');
    form.addEventListener('submit', handleSubmit);
    
    return slide;
}

function handleOptionChange(e) {
    const moduleId = e.target.dataset.module;
    const optionId = e.target.value;
    
    if (!selectedOptions[moduleId]) {
        selectedOptions[moduleId] = [];
    }
    
    if (e.target.checked) {
        selectedOptions[moduleId].push(optionId);
    } else {
        selectedOptions[moduleId] = selectedOptions[moduleId].filter(id => id !== optionId);
    }
}

function handleFileUpload(e) {
    uploadedFile = e.target.files[0];
}

function goToNext() {
    const currentSlide = document.querySelector('.question-slide.active');
    currentSlide.classList.remove('active');
    currentSlide.classList.add('prev');
    
    currentStep++;
    
    setTimeout(() => {
        renderQuestion();
    }, 200);
}

function goToPrevious() {
    if (currentStep === 0) return;
    
    const currentSlide = document.querySelector('.question-slide.active');
    currentSlide.classList.remove('active');
    
    currentStep--;
    
    setTimeout(() => {
        renderQuestion();
    }, 200);
}

async function handleSubmit(e) {
    e.preventDefault();
    
    // Prepare configuration data
    const configData = JSON.stringify(selectedOptions, null, 2);
    document.getElementById('configData').value = configData;
    
    // Submit via Netlify Forms
    const form = e.target;
    const formData = new FormData(form);
    
    try {
        await fetch('/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams(formData).toString()
        });
        
        showSuccessMessage();
        updateCustomConfig();
        
        setTimeout(() => {
            closeConfigurator();
            resetConfigurator();
        }, 3000);
        
    } catch (error) {
        console.error('Submit error:', error);
        alert('Fehler beim Senden. Bitte versuche es erneut.');
    }
}

function showSuccessMessage() {
    const container = document.getElementById('questionsContainer');
    container.innerHTML = `
        <div class="question-slide active">
            <div class="success-message">
                <div class="success-icon">✓</div>
                <h3 class="success-title">Danke!</h3>
                <p class="success-text">
                    Deine Konfiguration ist sicher eingegangen. Unser Expertenteam prüft deine Daten 
                    (und ggf. deine Leseprobe). Du erhältst dein Strategie-Angebot innerhalb von 24 Stunden.
                </p>
            </div>
        </div>
    `;
}

function updateCustomConfig() {
    const display = document.getElementById('custom-config-display');
    
    let html = '';
    let count = 0;
    
    Object.entries(selectedOptions).forEach(([moduleId, options]) => {
        options.forEach(optionId => {
            const module = MODULES.find(m => m.id === moduleId);
            const option = module.options.find(o => o.id === optionId);
            
            html += `
                <div class="config-item-row">
                    <span class="config-item-label">${option.label}</span>
                    <span class="config-item-value">✓ Ausgewählt</span>
                </div>
            `;
            count++;
        });
    });
    
    if (count === 0) {
        display.className = 'custom-config-empty';
        display.innerHTML = `
            <p class="empty-message">Noch keine Services ausgewählt</p>
            <p class="empty-hint">Klicke auf "Jetzt konfigurieren" um zu starten</p>
        `;
    } else {
        display.className = '';
        display.innerHTML = html;
    }
}

function resetConfigurator() {
    currentStep = 0;
    selectedOptions = {};
    uploadedFile = null;
    renderQuestion();
}