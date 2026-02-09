/* ==========================================
   PROJEKTE PAGE - INTERACTIVE FUNCTIONALITY
   ========================================== */

// Sample project data (in production, this would come from a CMS or API)
const projects = [
    {
        id: 'projekt1',
        title: 'Die vergessene Zeit',
        author: 'Maria Schmidt',
        category: 'roman',
        cover: '../assets/images/projekte/placeholder-cover-1.jpg',
        year: '2024',
        pages: '324',
        isbn: '978-3-16-148410-0',
        description: 'Ein fesselnder Roman über Liebe, Verlust und die Kraft der Erinnerung. Maria Schmidt entführt uns in eine Welt voller Emotionen und unerwarteter Wendungen.'
    },
    {
        id: 'projekt2',
        title: 'Digital Marketing Essentials',
        author: 'Thomas Weber',
        category: 'fachbuch',
        cover: '../assets/images/projekte/placeholder-cover-2.jpg',
        year: '2024',
        pages: '256',
        isbn: '978-3-16-148411-7',
        description: 'Der ultimative Guide für modernes Marketing. Thomas Weber teilt praktische Strategien und bewährte Methoden für den digitalen Erfolg.'
    },
    {
        id: 'projekt3',
        title: 'Mein Weg zum Erfolg',
        author: 'Andreas Müller',
        category: 'biografie',
        cover: '../assets/images/projekte/placeholder-cover-3.jpg',
        year: '2023',
        pages: '412',
        isbn: '978-3-16-148412-4',
        description: 'Eine inspirierende Lebensgeschichte über Durchhaltevermögen, Mut und den Weg vom Tellerwäscher zum Millionär.'
    },
    {
        id: 'projekt4',
        title: 'Schatten über Berlin',
        author: 'Laura Fischer',
        category: 'roman',
        cover: '../assets/images/projekte/placeholder-cover-4.jpg',
        year: '2024',
        pages: '398',
        isbn: '978-3-16-148413-1',
        description: 'Ein spannender Thriller in der Hauptstadt. Laura Fischer kreiert eine atmosphärische Geschichte voller Spannung und Intrigen.'
    },
    {
        id: 'projekt5',
        title: 'Der kleine Drache Felix',
        author: 'Sophie Klein',
        category: 'kinderbuch',
        cover: '../assets/images/projekte/placeholder-cover-5.jpg',
        year: '2024',
        pages: '48',
        isbn: '978-3-16-148414-8',
        description: 'Ein zauberhaftes Kinderbuch über Freundschaft und Abenteuer. Perfekt für kleine Leser ab 4 Jahren.'
    },
    {
        id: 'projekt6',
        title: 'Worte im Wind',
        author: 'Michael Berg',
        category: 'lyrik',
        cover: '../assets/images/projekte/placeholder-cover-6.jpg',
        year: '2023',
        pages: '128',
        isbn: '978-3-16-148415-5',
        description: 'Eine poetische Sammlung über Leben, Liebe und die Vergänglichkeit. Berührende Verse, die zu Herzen gehen.'
    },
    {
        id: 'projekt7',
        title: 'Führung 4.0',
        author: 'Dr. Christina Wolf',
        category: 'fachbuch',
        cover: '../assets/images/projekte/placeholder-cover-7.jpg',
        year: '2024',
        pages: '312',
        isbn: '978-3-16-148416-2',
        description: 'Moderne Führungsmethoden für die digitale Ära. Ein Must-Read für Manager und Team-Leader.'
    },
    {
        id: 'projekt8',
        title: 'Sommerregen',
        author: 'Julia Hoffmann',
        category: 'roman',
        cover: '../assets/images/projekte/placeholder-cover-8.jpg',
        year: '2023',
        pages: '276',
        isbn: '978-3-16-148417-9',
        description: 'Eine warmherzige Geschichte über Neuanfänge und zweite Chancen in einem kleinen Dorf an der Küste.'
    },
    {
        id: 'projekt9',
        title: 'Zwischen zwei Welten',
        author: 'Ahmed Hassan',
        category: 'biografie',
        cover: '../assets/images/projekte/placeholder-cover-9.jpg',
        year: '2024',
        pages: '344',
        isbn: '978-3-16-148418-6',
        description: 'Die bewegende Geschichte eines Mannes zwischen zwei Kulturen und seine Suche nach Identität.'
    },
    {
        id: 'projekt10',
        title: 'Luna und die Sterne',
        author: 'Emma Schneider',
        category: 'kinderbuch',
        cover: '../assets/images/projekte/placeholder-cover-10.jpg',
        year: '2024',
        pages: '56',
        isbn: '978-3-16-148419-3',
        description: 'Eine magische Reise durch das Universum für junge Entdecker ab 6 Jahren.'
    },
    {
        id: 'projekt11',
        title: 'Gedanken in Versen',
        author: 'Lisa Bauer',
        category: 'lyrik',
        cover: '../assets/images/projekte/placeholder-cover-11.jpg',
        year: '2023',
        pages: '96',
        isbn: '978-3-16-148420-9',
        description: 'Zeitgenössische Lyrik über das moderne Leben, Beziehungen und die Suche nach Bedeutung.'
    },
    {
        id: 'projekt12',
        title: 'Der letzte Sommer',
        author: 'Max Richter',
        category: 'roman',
        cover: '../assets/images/projekte/placeholder-cover-12.jpg',
        year: '2024',
        pages: '368',
        isbn: '978-3-16-148421-6',
        description: 'Ein Coming-of-Age-Roman über Freundschaft, erste Liebe und das Erwachsenwerden.'
    }
];

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    console.log('🎨 Projekte page initializing...');
    
    renderProjects();
    initializeFilters();
    initializeModal();
    initializeContactPopup();
    
    console.log('✅ Projekte page initialized');
});

// Render all projects
function renderProjects(filter = 'all') {
    const grid = document.getElementById('projectsGrid');
    if (!grid) return;
    
    const filteredProjects = filter === 'all' 
        ? projects 
        : projects.filter(p => p.category === filter);
    
    grid.innerHTML = filteredProjects.map(project => `
        <article class="projekt-card" data-category="${project.category}">
            <div class="projekt-cover" onclick="openProjectModal('${project.id}')">
                <img src="${project.cover}" alt="${project.title}" loading="lazy" 
                     onerror="this.src='../assets/images/projekte/placeholder.jpg'">
                <div class="projekt-overlay">
                    <button class="projekt-view-btn">
                        Details ansehen
                    </button>
                </div>
            </div>
            <div class="projekt-info">
                <div class="projekt-category">${getCategoryName(project.category)}</div>
                <h3 class="projekt-title">${project.title}</h3>
                <p class="projekt-author">von ${project.author}</p>
            </div>
        </article>
    `).join('');
    
    updateProjectCount(filteredProjects.length);
}

// Get category display name
function getCategoryName(category) {
    const names = {
        'roman': 'Roman',
        'fachbuch': 'Fachbuch',
        'biografie': 'Biografie',
        'kinderbuch': 'Kinderbuch',
        'lyrik': 'Lyrik'
    };
    return names[category] || category;
}

// Update project count
function updateProjectCount(count) {
    const countEl = document.getElementById('projectCount');
    if (countEl) {
        countEl.textContent = count;
    }
}

// Initialize filter buttons
function initializeFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');
            
            // Update active state
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Filter projects with animation
            filterProjects(filter);
        });
    });
}

// Filter projects with animation
function filterProjects(filter) {
    const cards = document.querySelectorAll('.projekt-card');
    
    cards.forEach((card, index) => {
        const category = card.getAttribute('data-category');
        const shouldShow = filter === 'all' || category === filter;
        
        setTimeout(() => {
            if (shouldShow) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        }, index * 30);
    });
    
    // Update count
    const visibleCount = filter === 'all' 
        ? projects.length 
        : projects.filter(p => p.category === filter).length;
    updateProjectCount(visibleCount);
}

// Initialize modal functionality
function initializeModal() {
    const modal = document.getElementById('projektModal');
    const closeBtn = modal?.querySelector('.projekt-modal-close');
    const overlay = modal?.querySelector('.projekt-modal-overlay');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeProjectModal);
    }
    
    if (overlay) {
        overlay.addEventListener('click', closeProjectModal);
    }
    
    // Close on ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal?.classList.contains('is-open')) {
            closeProjectModal();
        }
    });
}

// Open project modal
function openProjectModal(projectId) {
    const modal = document.getElementById('projektModal');
    const modalBody = document.getElementById('modalBody');
    const project = projects.find(p => p.id === projectId);
    
    if (!modal || !modalBody || !project) return;
    
    modalBody.innerHTML = `
        <div class="modal-cover">
            <img src="${project.cover}" alt="${project.title}"
                 onerror="this.src='../assets/images/projekte/placeholder.jpg'">
        </div>
        
        <h2 class="modal-title">${project.title}</h2>
        <p class="modal-author">von ${project.author}</p>
        
        <div class="modal-meta">
            <div class="modal-meta-item">
                <span class="modal-meta-label">Kategorie</span>
                <span class="modal-meta-value">${getCategoryName(project.category)}</span>
            </div>
            <div class="modal-meta-item">
                <span class="modal-meta-label">Jahr</span>
                <span class="modal-meta-value">${project.year}</span>
            </div>
            <div class="modal-meta-item">
                <span class="modal-meta-label">Seiten</span>
                <span class="modal-meta-value">${project.pages}</span>
            </div>
            <div class="modal-meta-item">
                <span class="modal-meta-label">ISBN</span>
                <span class="modal-meta-value">${project.isbn}</span>
            </div>
        </div>
        
        <p class="modal-description">${project.description}</p>
        
        <div class="modal-actions">
            <button class="modal-btn modal-btn-primary" onclick="window.open('https://www.amazon.de/s?k=${encodeURIComponent(project.isbn)}', '_blank')">
                Bei Amazon ansehen
            </button>
            <button class="modal-btn modal-btn-secondary" onclick="closeProjectModal()">
                Schließen
            </button>
        </div>
    `;
    
    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
}

// Close project modal
function closeProjectModal() {
    const modal = document.getElementById('projektModal');
    if (modal) {
        modal.classList.remove('is-open');
        document.body.style.overflow = '';
    }
}

// Initialize contact popup
function initializeContactPopup() {
    const contactOverlay = document.getElementById('contactOverlay');
    const projekteCTABtn = document.getElementById('projekteCTABtn');
    const closeBtn = contactOverlay?.querySelector('.contact-close');
    
    if (projekteCTABtn && contactOverlay) {
        projekteCTABtn.addEventListener('click', () => {
            contactOverlay.classList.add('is-open');
            document.body.style.overflow = 'hidden';
        });
    }
    
    if (closeBtn && contactOverlay) {
        closeBtn.addEventListener('click', () => {
            contactOverlay.classList.remove('is-open');
            document.body.style.overflow = '';
        });
    }
    
    contactOverlay?.addEventListener('click', (e) => {
        if (e.target === contactOverlay) {
            contactOverlay.classList.remove('is-open');
            document.body.style.overflow = '';
        }
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && contactOverlay?.classList.contains('is-open')) {
            contactOverlay.classList.remove('is-open');
            document.body.style.overflow = '';
        }
    });
}

// Make functions globally available
window.openProjectModal = openProjectModal;
window.closeProjectModal = closeProjectModal;