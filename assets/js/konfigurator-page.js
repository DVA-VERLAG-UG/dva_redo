// konfigurator-page.js
// Nur: Package Selection Forms (Starter & Deluxe)
// Config-Display wird vollständig von flipbook-popup.js / FlipbookPopup.displaySelections() übernommen

document.addEventListener('DOMContentLoaded', () => {
    setupPackageSelectionButtons();
});

// ==========================================
// PACKAGE SELECTION (Starter & Deluxe)
// ==========================================

function setupPackageSelectionButtons() {
    const packageButtons = document.querySelectorAll('.btn-configure-underline[data-package]');

    packageButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const packageType = button.getAttribute('data-package');
            togglePackageContactForm(packageType);
        });
    });

    // Form submissions
    const quickForms = document.querySelectorAll('.quick-contact-form');
    quickForms.forEach(form => {
        form.addEventListener('submit', handleQuickFormSubmit);
    });
}

function togglePackageContactForm(packageType) {
    const formId = packageType + 'ContactForm';
    const form = document.getElementById(formId);
    const button = document.querySelector(`.btn-configure-underline[data-package="${packageType}"]`);

    if (!form) return;

    const isOpen = form.style.display === 'block';

    // Alle anderen Forms schließen
    document.querySelectorAll('.package-contact-form').forEach(f => {
        f.style.display = 'none';
    });
    document.querySelectorAll('.btn-configure-underline[data-package]').forEach(btn => {
        btn.textContent = 'Paket wählen';
    });

    if (!isOpen) {
        form.style.display = 'block';
        if (button) button.textContent = 'Abbrechen';
        setTimeout(() => {
            form.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
    }
}

async function handleQuickFormSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const packageName = form.getAttribute('data-package-name');
    const formData = new FormData(form);
    const submitButton = form.querySelector('.btn-quick-submit');
    const originalText = submitButton.textContent;

    submitButton.textContent = 'Wird gesendet...';
    submitButton.disabled = true;

    try {
        const data = new URLSearchParams();
        data.append('form-name', 'package-selection');
        data.append('package', packageName);
        data.append('name', formData.get('name'));
        data.append('email', formData.get('email'));
        data.append('message', formData.get('message') || '');

        await fetch('/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: data.toString()
        });

        const formContainer = form.closest('.package-contact-form');
        formContainer.classList.add('success');
        formContainer.innerHTML = `
            <p class="success-message-inline">
                <strong>Vielen Dank!</strong><br>
                Ihre Anfrage für das Paket "${packageName}" wurde erfolgreich versendet.
                Wir melden uns in Kürze bei Ihnen.
            </p>
        `;

        // Reset nach 5 Sekunden
        setTimeout(() => {
            formContainer.style.display = 'none';
            formContainer.classList.remove('success');
            formContainer.innerHTML = form.outerHTML;

            const newForm = formContainer.querySelector('.quick-contact-form');
            if (newForm) newForm.addEventListener('submit', handleQuickFormSubmit);

            document.querySelectorAll('.btn-configure-underline[data-package]').forEach(btn => {
                btn.textContent = 'Paket wählen';
            });
        }, 5000);

    } catch (error) {
        console.error('Submission error:', error);
        submitButton.textContent = 'Fehler – Bitte erneut versuchen';
        setTimeout(() => {
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 3000);
    }
}