// konfigurator-page.js
// Package Selection Forms (Starter & Deluxe) — multilingual

// ── Language detection ────────────────────────────────────────────────────────
function getLang() {
  const p = window.location.pathname;
  if (p.includes('/en/')) return 'en';
  if (p.includes('/tr/')) return 'tr';
  if (p.includes('/fr/')) return 'fr';
  return 'de';
}

// ── UI strings ────────────────────────────────────────────────────────────────
const KONFIG_STRINGS = {
  de: {
    choosePackage: 'Paket wählen',
    cancel:        'Abbrechen',
    sending:       'Wird gesendet...',
    successTitle:  'Vielen Dank!',
    successBody:   (pkg) => `Ihre Anfrage für das Paket "${pkg}" wurde erfolgreich versendet. Wir melden uns in Kürze bei Ihnen.`,
    errorBtn:      'Fehler – Bitte erneut versuchen',
  },
  en: {
    choosePackage: 'Choose Package',
    cancel:        'Cancel',
    sending:       'Sending...',
    successTitle:  'Thank you!',
    successBody:   (pkg) => `Your request for the "${pkg}" package was sent successfully. We'll be in touch shortly.`,
    errorBtn:      'Error – Please try again',
  },
  tr: {
    choosePackage: 'Paketi Seç',
    cancel:        'İptal',
    sending:       'Gönderiliyor...',
    successTitle:  'Teşekkürler!',
    successBody:   (pkg) => `"${pkg}" paketi için talebiniz başarıyla gönderildi. Kısa süre içinde size döneceğiz.`,
    errorBtn:      'Hata – Lütfen tekrar deneyin',
  },
  fr: {
    choosePackage: 'Choisir le Forfait',
    cancel:        'Annuler',
    sending:       'Envoi en cours...',
    successTitle:  'Merci !',
    successBody:   (pkg) => `Votre demande pour le forfait « ${pkg} » a été envoyée avec succès. Nous vous contacterons bientôt.`,
    errorBtn:      'Erreur – Veuillez réessayer',
  },
};

const s = KONFIG_STRINGS[getLang()] || KONFIG_STRINGS.de;

// ── Init ──────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  setupPackageSelectionButtons();
});

// ── Package Selection ─────────────────────────────────────────────────────────
function setupPackageSelectionButtons() {
  const packageButtons = document.querySelectorAll('.btn-configure-underline[data-package]');

  packageButtons.forEach(button => {
    button.textContent = s.choosePackage;
    button.addEventListener('click', (e) => {
      e.preventDefault();
      togglePackageContactForm(button.getAttribute('data-package'));
    });
  });

  document.querySelectorAll('.quick-contact-form').forEach(form => {
    form.addEventListener('submit', handleQuickFormSubmit);
  });
}

function togglePackageContactForm(packageType) {
  const formId = packageType + 'ContactForm';
  const form   = document.getElementById(formId);
  const button = document.querySelector(`.btn-configure-underline[data-package="${packageType}"]`);

  if (!form) return;

  const isOpen = form.style.display === 'block';

  // Close all first
  document.querySelectorAll('.package-contact-form').forEach(f => {
    f.style.display = 'none';
  });
  document.querySelectorAll('.btn-configure-underline[data-package]').forEach(btn => {
    btn.textContent = s.choosePackage;
  });

  if (!isOpen) {
    form.style.display = 'block';
    if (button) button.textContent = s.cancel;
    setTimeout(() => {
      form.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
  }
}

async function handleQuickFormSubmit(e) {
  e.preventDefault();

  const form        = e.target;
  const packageName = form.getAttribute('data-package-name');
  const formData    = new FormData(form);
  const submitBtn   = form.querySelector('.btn-quick-submit');
  const originalTxt = submitBtn.textContent;

  submitBtn.textContent = s.sending;
  submitBtn.disabled    = true;

  try {
    const data = new URLSearchParams();
    data.append('form-name', 'package-selection');
    data.append('package',   packageName);
    data.append('name',      formData.get('name'));
    data.append('email',     formData.get('email'));
    data.append('message',   formData.get('message') || '');

    await fetch('/', {
      method:  'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body:    data.toString(),
    });

    const formContainer = form.closest('.package-contact-form');
    formContainer.classList.add('success');
    formContainer.innerHTML = `
      <p class="success-message-inline">
        <strong>${s.successTitle}</strong><br>
        ${s.successBody(packageName)}
      </p>
    `;

    setTimeout(() => {
      formContainer.style.display = 'none';
      formContainer.classList.remove('success');
      formContainer.innerHTML = form.outerHTML;

      const newForm = formContainer.querySelector('.quick-contact-form');
      if (newForm) newForm.addEventListener('submit', handleQuickFormSubmit);

      document.querySelectorAll('.btn-configure-underline[data-package]').forEach(btn => {
        btn.textContent = s.choosePackage;
      });
    }, 5000);

  } catch (error) {
    console.error('Submission error:', error);
    submitBtn.textContent = s.errorBtn;
    setTimeout(() => {
      submitBtn.textContent = originalTxt;
      submitBtn.disabled    = false;
    }, 3000);
  }
}