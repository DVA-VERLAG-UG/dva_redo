// footer.js - Footer upload form functionality

export function initFooter() {
  // Update year dynamically
  const yearElement = document.getElementById('footer-year');
  if (yearElement) {
    const year = new Date().getFullYear();
    yearElement.innerHTML = `
      © ${year} DVAYD ·
      <a href="/de/datenschutz.html">Privacy Policy</a> ·
      <a href="/de/impressum.html">Impressum</a>
    `;
  }

  // Setup upload form
  setupUploadForm();
}

function setupUploadForm() {
  const fileInput = document.getElementById('u_files');
  const fileList = document.getElementById('fileList');
  const uploadForm = document.querySelector('.upload-form');
  const uploadLoading = document.getElementById('uploadLoading');
  const resetBtn = document.getElementById('u_reset');

  if (!fileInput || !fileList) return;

  // Display selected files
  fileInput.addEventListener('change', (e) => {
    const files = Array.from(e.target.files);
    
    if (files.length === 0) {
      fileList.innerHTML = '';
      return;
    }

    fileList.innerHTML = files
      .map(file => {
        const sizeKB = (file.size / 1024).toFixed(1);
        return `<div class="file-pill">${file.name} (${sizeKB} KB)</div>`;
      })
      .join('');
  });

  // Handle form submission
  if (uploadForm) {
    uploadForm.addEventListener('submit', (e) => {
      // Show loading overlay
      if (uploadLoading) {
        uploadLoading.classList.add('is-on');
        uploadLoading.setAttribute('aria-hidden', 'false');
      }

      // Netlify Forms will handle the actual submission
      // The loading overlay will show until redirect happens
    });
  }

  // Handle reset
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      fileList.innerHTML = '';
      if (uploadLoading) {
        uploadLoading.classList.remove('is-on');
        uploadLoading.setAttribute('aria-hidden', 'true');
      }
    });
  }

  // Drag and drop visual feedback
  const dropzone = document.getElementById('dropzone');
  if (dropzone) {
    ['dragenter', 'dragover'].forEach(eventName => {
      dropzone.addEventListener(eventName, (e) => {
        e.preventDefault();
        dropzone.style.borderColor = 'rgba(139, 92, 246, 0.6)';
        dropzone.style.background = 'rgba(139, 92, 246, 0.1)';
      });
    });

    ['dragleave', 'drop'].forEach(eventName => {
      dropzone.addEventListener(eventName, (e) => {
        e.preventDefault();
        dropzone.style.borderColor = '';
        dropzone.style.background = '';
      });
    });
  }
}