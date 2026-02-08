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
            { id: 'korrektorat', label: 'Korrektur / Lektorat', description: 'Rechtschreibung & Stil' },
            { id: 'lektorat', label: 'Intensiv-Lektorat', description: 'Inhalt & Stil' },
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
            { id: 'cover_design', label: 'Cover Design', description: 'Premium oder Template' },
            { id: 'cover_lokalisierung', label: 'Cover Lokalisierung' },
            { id: 'satz', label: 'Satz (Buchlayout)', description: 'Print & eBook' },
            { id: 'ebook_konvertierung', label: 'eBook-Konvertierung (ePUB)', description: 'Professionell' },
            { id: 'hardcover', label: 'Hardcover Ausstattung' },
            { id: 'ebook_barrierefrei', label: 'Barrierefreies E-Book' }
        ]
    },
    {
        id: 'module4',
        title: 'Wie bauen wir Reichweite auf?',
        subtitle: 'Marketing & Distribution',
        options: [
            { id: 'distribution', label: 'Distribution', description: 'Amazon KDP + Aggregator' },
            { id: 'marketing', label: 'Marketing', description: 'Launch-Kampagne' },
            { id: 'amazon_ads', label: 'Amazon Ads (EU)' },
            { id: 'social_ads', label: 'Social Media Ads', description: 'Diaspora Fokus' },
            { id: 'presse_de', label: 'Pressearbeit / Blogger DE' },
            { id: 'marktplatz_tr', label: 'Marktplatz Ads Türkei', description: 'Trendyol/Hepsiburada' }
        ]
    },
    {
        id: 'module5',
        title: 'Mehr als nur ein Buch.',
        subtitle: 'Vision & Services',
        options: [
            { id: 'isbn', label: 'ISBN', description: 'Eigen oder Verlag' },
            { id: 'print', label: 'Print-Veröffentlichung' },
            { id: 'rechte', label: 'Rechte', description: '100% beim Autor' },
            { id: 'fulfillment', label: 'Fulfillment & Lagerung', description: 'Nur DACH' },
            { id: 'stipendium', label: 'Bewerbung: "Brückenbauer"-Stipendium' }
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
    
    if (openBtn) openBtn.addEventListener('click', openConfigurator);
    if (closeBtn) closeBtn.addEventListener('click', closeConfigurator);
    if (prevBtn) prevBtn.addEventListener('click', goToPrevious);
    
    // Close on overlay click
    if (overlay) {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                closeConfigurator();
            }
        });
    }
    
    // Lade gespeicherte Konfiguration
    loadConfigurationFromLocalStorage();
    
    renderQuestion();
});

function openConfigurator() {
    const overlay = document.getElementById('configOverlay');
    if (overlay) {
        overlay.classList.add('is-open');
        document.body.style.overflow = 'hidden';
    }
}

function closeConfigurator() {
    const overlay = document.getElementById('configOverlay');
    if (overlay) {
        overlay.classList.remove('is-open');
        document.body.style.overflow = '';
    }
}

function updateProgress() {
    const totalSteps = MODULES.length + 1; // +1 for contact form
    const progress = ((currentStep + 1) / totalSteps) * 100;
    
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    
    if (progressBar) progressBar.style.width = progress + '%';
    if (progressText) progressText.textContent = `Schritt ${currentStep + 1} von ${totalSteps}`;
    
    // Update prev button
    const prevBtn = document.getElementById('prevBtn');
    if (prevBtn) prevBtn.disabled = currentStep === 0;
}

function renderQuestion() {
    const container = document.getElementById('questionsContainer');
    if (!container) return;
    
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
        const slide = container.querySelector('.question-slide');
        if (slide) slide.classList.add('active');
    }, 50);
}

function updateAnsweredQuestions() {
    const leftPage = document.getElementById('leftPage');
    if (!leftPage) return;
    
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
    const prevBtn = document.getElementById('prevBtn');
    if (prevBtn) prevBtn.addEventListener('click', goToPrevious);
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
    
    const nextBtn = slide.querySelector('#nextBtn');
    if (nextBtn) nextBtn.addEventListener('click', goToNext);
    
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
    if (form) form.addEventListener('submit', handleSubmit);
    
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
    
    // Update custom config display
    updateCustomConfigDisplay();
}

function handleFileUpload(e) {
    uploadedFile = e.target.files[0];
}

function goToNext() {
    const currentSlide = document.querySelector('.question-slide.active');
    if (currentSlide) {
        currentSlide.classList.remove('active');
        currentSlide.classList.add('prev');
    }
    
    currentStep++;
    
    setTimeout(() => {
        renderQuestion();
    }, 200);
}

function goToPrevious() {
    if (currentStep === 0) return;
    
    const currentSlide = document.querySelector('.question-slide.active');
    if (currentSlide) currentSlide.classList.remove('active');
    
    currentStep--;
    
    setTimeout(() => {
        renderQuestion();
    }, 200);
}

async function handleSubmit(e) {
    e.preventDefault();
    
    // Prepare configuration data
    const configData = JSON.stringify(selectedOptions, null, 2);
    const configDataInput = document.getElementById('configData');
    if (configDataInput) configDataInput.value = configData;
    
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
        
        // WICHTIG: Update Custom Config Display (Services bleiben sichtbar)
        updateCustomConfigDisplay();
        
        setTimeout(() => {
            closeConfigurator();
            // NICHT resetConfigurator() aufrufen - Auswahl bleibt erhalten!
        }, 3000);
        
    } catch (error) {
        console.error('Submit error:', error);
        alert('Fehler beim Senden. Bitte versuche es erneut.');
    }
}

function showSuccessMessage() {
    const container = document.getElementById('questionsContainer');
    if (!container) return;
    
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

function updateCustomConfigDisplay() {
    const display = document.getElementById('custom-config-display');
    if (!display) return;
    
    let html = '';
    let count = 0;
    
    Object.entries(selectedOptions).forEach(([moduleId, options]) => {
        options.forEach(optionId => {
            const module = MODULES.find(m => m.id === moduleId);
            const option = module?.options.find(o => o.id === optionId);
            
            if (option) {
                html += `
                    <div class="config-item-row">
                        <span class="config-item-label">${option.label}</span>
                        <span class="config-item-value">✓ Ausgewählt</span>
                    </div>
                `;
                count++;
            }
        });
    });
    
    if (count === 0) {
        display.className = 'custom-config-empty';
        display.innerHTML = `
            <p class="empty-message">Noch keine Services ausgewählt</p>
            <p class="empty-hint">Klicke auf "Jetzt konfigurieren" um zu starten</p>
        `;
    } else {
        display.className = 'custom-config-filled';
        display.innerHTML = html;
        
        // Optional: Füge "Auswahl löschen" Button hinzu
        // Kommentiere diese Zeile aus, wenn du den Button NICHT willst
        addClearButton();
    }
    
    // Highlight matching services in other packages
    highlightMatchingServices();
    
    // WICHTIG: Speichere die Auswahl in localStorage, damit sie persistent bleibt
    saveConfigurationToLocalStorage();
}

// Speichere Konfiguration in localStorage
function saveConfigurationToLocalStorage() {
    try {
        localStorage.setItem('dvayd_custom_config', JSON.stringify(selectedOptions));
    } catch (e) {
        console.error('Could not save configuration:', e);
    }
}

// Lade Konfiguration aus localStorage beim Start
function loadConfigurationFromLocalStorage() {
    try {
        const saved = localStorage.getItem('dvayd_custom_config');
        if (saved) {
            selectedOptions = JSON.parse(saved);
            updateCustomConfigDisplay();
        }
    } catch (e) {
        console.error('Could not load configuration:', e);
    }
}

function highlightMatchingServices() {
    const allRows = document.querySelectorAll('.package-row');
    
    allRows.forEach(row => {
        const label = row.querySelector('.package-label');
        if (!label) return;
        
        const serviceName = label.textContent.trim();
        
        // Check if any selected option matches this service
        let isMatched = false;
        Object.values(selectedOptions).forEach(options => {
            options.forEach(optionId => {
                MODULES.forEach(module => {
                    const option = module.options.find(o => o.id === optionId);
                    if (option && option.label === serviceName) {
                        isMatched = true;
                    }
                });
            });
        });
        
        if (isMatched) {
            row.classList.add('service-highlighted');
        } else {
            row.classList.remove('service-highlighted');
        }
    });
}

// Reset Konfiguration (nur wenn explizit gewünscht - z.B. durch "Reset" Button)
function resetConfigurator() {
    currentStep = 0;
    selectedOptions = {};
    uploadedFile = null;
    
    // Lösche aus localStorage
    try {
        localStorage.removeItem('dvayd_custom_config');
    } catch (e) {
        console.error('Could not clear configuration:', e);
    }
    
    renderQuestion();
    updateCustomConfigDisplay();
}

// Optional: Füge einen "Auswahl löschen" Button hinzu
function addClearButton() {
    const display = document.getElementById('custom-config-display');
    if (!display || display.classList.contains('custom-config-empty')) return;
    
    // Prüfe ob Button schon existiert
    if (document.getElementById('clearConfigBtn')) return;
    
    const clearBtn = document.createElement('button');
    clearBtn.id = 'clearConfigBtn';
    clearBtn.className = 'btn-clear-config';
    clearBtn.textContent = 'Auswahl löschen';
    clearBtn.onclick = () => {
        if (confirm('Möchten Sie wirklich alle ausgewählten Services löschen?')) {
            resetConfigurator();
        }
    };
    
    display.appendChild(clearBtn);
}