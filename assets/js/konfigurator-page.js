// konfigurator-page.js - Configurator logic with book-style popup

// Configuration modules - Neue Themen-Struktur
const MODULES = [
    {
        id: 'thema1',
        title: 'Start & Projekt-Setup',
        subtitle: 'Klarheit, Plan, saubere Abwicklung',
        options: [
            { id: 'eu_profi_check', label: 'EU-Profi-Check (Audit)', description: 'Marktfähigkeit prüfen & klare To-dos' },
            { id: 'projekt_roadmap', label: 'Projekt-Roadmap (EU)', description: 'Zeitplan: Text → Design → Produktion → Release' },
            { id: 'projektmanagement', label: 'Projektmanagement / Begleitung', description: 'Deadlines, Freigaben, Kommunikation' },
            { id: 'intake_tr_eu', label: 'Intake Türkei → EU (nur Route C)', description: 'Check von Rechten/Quelldaten/Dateien' },
            { id: 'eu_tr_koordination', label: 'EU + TR Koordination (nur Route B)', description: 'Release-Plan für zwei Märkte' }
        ]
    },
    {
        id: 'thema2',
        title: 'Text-Qualität',
        subtitle: 'Ein Text, der professionell wirkt',
        options: [
            { id: 'korrektorat', label: 'Korrektorat', description: 'Rechtschreibung/Grammatik/Zeichensetzung' },
            { id: 'stil_lektorat', label: 'Stil-Lektorat', description: 'Flow, Ton, Rhythmus' },
            { id: 'struktur_lektorat', label: 'Struktur-/Inhaltslektorat', description: 'Aufbau, Logik, Dramaturgie' },
            { id: 'konsistenz_check', label: 'Konsistenz-Check', description: 'Namen, Timeline, Fakten, Wiederholungen' },
            { id: 'final_qa', label: 'Final QA / Son Okuma (Vier-Augen)', description: 'Letzte Kontrolle vor Produktion' }
        ]
    },
    {
        id: 'thema3',
        title: 'Buchdesign',
        subtitle: 'Außen verkauft. Innen fühlt sich nach Verlag an',
        options: [
            { id: 'coverdesign_print', label: 'Coverdesign (Print)', description: 'Front + Rücken + Rückseite' },
            { id: 'cover_varianten', label: 'Cover-Varianten (A/B)', description: '2–3 Alternativen zum Vergleichen' },
            { id: 'innensatz', label: 'Innensatz / Layout (Print)', description: 'Buchsatz, Kapitelstruktur, Seitenbild' },
            { id: 'typografie', label: 'Typografie & Stilset', description: 'Schriften & Regeln passend zum Genre' },
            { id: 'illustration', label: 'Illustration / Grafiken (optional)', description: 'Individuelle Assets' }
        ]
    },
    {
        id: 'thema4',
        title: 'Print-Spezifikation & Produktion',
        subtitle: 'Print, der hochwertig aussieht und technisch sauber läuft',
        options: [
            { id: 'hardcover_softcover', label: 'Hardcover / Softcover', description: 'Bindung: Premium vs. klassisch' },
            { id: 'formatwahl', label: 'Formatwahl', description: 'Passend zu Genre, Lesbarkeit und Kosten' },
            { id: 'farbe_sw', label: 'S/W / Farbe / Mix', description: 'Optimierung: Qualität & Druckkosten' },
            { id: 'papier_veredelung', label: 'Papier & Veredelung (matt/glanz)', description: 'Haptik + Optik' },
            { id: 'proof', label: 'Proof / Musterexemplar', description: 'Vorabdruck zur Freigabe' },
            { id: 'print_tuev', label: 'Print-TÜV (Preflight)', description: 'Technik-Check: Beschnitt, Auflösung, Farbraum' }
        ]
    },
    {
        id: 'thema5',
        title: 'E-Book & digitale Formate',
        subtitle: 'Fehlerfrei auf Geräten & Shops',
        options: [
            { id: 'ebook_quick', label: 'E-Book Quick-Publish (Entry)', description: 'Schnellstart: 1 Datei, 1 Revision' },
            { id: 'epub', label: 'EPUB-Erstellung', description: 'Sauberer Export für gängige Reader/Shops' },
            { id: 'kindle', label: 'Kindle-Format', description: 'Optimiert fürs Kindle-Ökosystem' },
            { id: 'ebook_qa', label: 'E-Book QA / Fix', description: 'Fehler finden und reparieren' },
            { id: 'ebook_quality', label: 'E-Book Quality Upgrade', description: 'Premium-Optimierung' },
            { id: 'audiobook', label: 'Audiobook (Coming soon)', description: 'In Vorbereitung', disabled: true }
        ]
    },
    {
        id: 'thema6',
        title: 'Findbarkeit & Lokalisierung',
        subtitle: 'Inhalt bleibt türkisch – EU kann\'s finden & verstehen',
        options: [
            { id: 'de_en_beschreibung', label: 'DE/EN Produktbeschreibung (Shop-ready)', description: 'Verkaufstext für EU-Leser' },
            { id: 'de_en_keywords', label: 'DE/EN Keywords & Kategorien', description: 'Suchlogik & Auffindbarkeit' },
            { id: 'klappentext_opt', label: 'Klappentext-Optimierung (TR)', description: 'Schärfer, klarer, verkaufsstärker' },
            { id: 'uebersetzung', label: 'Übersetzung (optional)', description: 'Neue Sprache veröffentlichen' },
            { id: 'lokalisierung', label: 'Lokalisierung (optional)', description: 'Kultureller Feinschliff' }
        ]
    },
    {
        id: 'thema7',
        title: 'Release, Vertrieb & Marketing',
        subtitle: 'Sichtbarkeit + Verfügbarkeit + sauberer Launch',
        options: [
            { id: 'eu_shop_listing', label: 'EU-Shop Listing & Metadaten (Shop-ready)', description: 'Titel/Untertitel/Beschreibung/Bilder' },
            { id: 'distribution_eu', label: 'Distribution EU (Shop + Versand)', description: 'Versand- und Abwicklungsmodell' },
            { id: 'libri_handel', label: 'Libri / Handel-Readiness (Premium)', description: 'Buchhandel-Bestellbarkeit' },
            { id: 'marketing_kampagne', label: 'Marketing-Impact Kampagne', description: 'Zielgruppe, Creatives, Kanäle' },
            { id: 'review_launch', label: 'Review-Launch System (ethisch)', description: 'Leserfeedback aufbauen (ARC/Reader-Liste)' },
            { id: 'eu_tr_distribution', label: 'EU + TR Distribution Add-on (nur Route B)', description: 'Zweiter Markt als Upgrade' }
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
    
    // Setup Package Selection Buttons
    setupPackageSelectionButtons();
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
    const totalSteps = MODULES.length + 1; // 7 Themen + 1 Kontaktformular = 8 Schritte
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

// ==========================================
// PACKAGE SELECTION (Starter & Deluxe)
// ==========================================

function setupPackageSelectionButtons() {
    // Get all "Paket wählen" buttons (correct class!)
    const packageButtons = document.querySelectorAll('.btn-configure-underline[data-package]');
    
    console.log(`📦 Found ${packageButtons.length} package selection buttons`);
    
    packageButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const packageType = button.getAttribute('data-package');
            console.log(`🎯 Package button clicked: ${packageType}`);
            togglePackageContactForm(packageType);
        });
    });
    
    // Setup form submissions
    const quickForms = document.querySelectorAll('.quick-contact-form');
    quickForms.forEach(form => {
        form.addEventListener('submit', handleQuickFormSubmit);
    });
}

function togglePackageContactForm(packageType) {
    const formId = packageType + 'ContactForm';
    const form = document.getElementById(formId);
    const button = document.querySelector(`.btn-configure-underline[data-package="${packageType}"]`);
    
    console.log(`🔄 Toggling form: ${formId}`, { form, button });
    
    if (!form) {
        console.error(`❌ Form not found: ${formId}`);
        return;
    }
    
    // Toggle visibility
    if (form.style.display === 'none' || form.style.display === '') {
        // Close other forms first
        document.querySelectorAll('.package-contact-form').forEach(f => {
            f.style.display = 'none';
        });
        
        // Reset all buttons
        document.querySelectorAll('.btn-configure-underline[data-package]').forEach(btn => {
            btn.textContent = 'Paket wählen';
        });
        
        // Open this form
        form.style.display = 'block';
        if (button) button.textContent = 'Abbrechen';
        
        console.log(`✅ Form opened: ${formId}`);
        
        // Scroll to form
        setTimeout(() => {
            form.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
    } else {
        // Close this form
        form.style.display = 'none';
        if (button) button.textContent = 'Paket wählen';
        console.log(`✅ Form closed: ${formId}`);
    }
}

async function handleQuickFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const packageName = form.getAttribute('data-package-name');
    const formData = new FormData(form);
    const submitButton = form.querySelector('.btn-quick-submit');
    const originalText = submitButton.textContent;
    
    // Show loading state
    submitButton.textContent = 'Wird gesendet...';
    submitButton.disabled = true;
    
    try {
        // Prepare data for Netlify
        const data = new URLSearchParams();
        data.append('form-name', 'package-selection');
        data.append('package', packageName);
        data.append('name', formData.get('name'));
        data.append('email', formData.get('email'));
        data.append('message', formData.get('message') || '');
        
        // Submit to Netlify
        await fetch('/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: data.toString()
        });
        
        // Show success message
        const formContainer = form.closest('.package-contact-form');
        formContainer.classList.add('success');
        formContainer.innerHTML = `
            <p class="success-message-inline">
                <strong>Vielen Dank!</strong><br>
                Ihre Anfrage für das Paket "${packageName}" wurde erfolgreich versendet. 
                Wir melden uns in Kürze bei Ihnen.
            </p>
        `;
        
        // Reset after 5 seconds
        setTimeout(() => {
            formContainer.style.display = 'none';
            formContainer.classList.remove('success');
            formContainer.innerHTML = form.outerHTML;
            
            // Re-attach event listener
            const newForm = formContainer.querySelector('.quick-contact-form');
            if (newForm) {
                newForm.addEventListener('submit', handleQuickFormSubmit);
            }
            
            // Reset button text
            const button = document.querySelector(`[data-package]`);
            if (button) button.textContent = 'Paket wählen';
        }, 5000);
        
    } catch (error) {
        console.error('Submission error:', error);
        submitButton.textContent = 'Fehler - Bitte erneut versuchen';
        
        setTimeout(() => {
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 3000);
    }
}