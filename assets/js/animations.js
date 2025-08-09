// Modern Tech Portfolio Animations and Interactions

// Prevent scroll restoration and force top position immediately
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

// Force scroll to top before DOM loads
window.scrollTo(0, 0);

document.addEventListener('DOMContentLoaded', function() {
    
    // Prevent automatic scrolling to hash on page load
    // Temporarily disable smooth scrolling
    document.documentElement.style.scrollBehavior = 'auto';
    
    // Force scroll to top again
    window.scrollTo(0, 0);
    
    if (window.location.hash) {
        // Remove hash from URL without scrolling
        window.history.replaceState(null, null, window.location.pathname + window.location.search);
    }
    
    // Re-enable smooth scrolling after a longer delay
    setTimeout(() => {
        document.documentElement.style.scrollBehavior = 'smooth';
    }, 500);
    
    // Typing Animation
    const typingText = document.querySelector('.typing-text');
    if (typingText) {
        const phrases = [
            'Mathematician | Developer | Poet',
            'I Build Systems With Soul ✨',
            'Theory Meets Practice In My Lab',
            'Jetpack Compose + C++ + Python Wizardry',
            'Poetry, Code & Pure Logic 🎯'
        ];
        
        let currentPhrase = 0;
        let currentChar = 0;
        let isDeleting = false;
        
        function typeEffect() {
            const current = phrases[currentPhrase];
            
            if (isDeleting) {
                typingText.textContent = current.substring(0, currentChar - 1);
                currentChar--;
            } else {
                typingText.textContent = current.substring(0, currentChar + 1);
                currentChar++;
            }
            
            let typeSpeed = isDeleting ? 50 : 100;
            
            if (!isDeleting && currentChar === current.length) {
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && currentChar === 0) {
                isDeleting = false;
                currentPhrase = (currentPhrase + 1) % phrases.length;
            }
            
            setTimeout(typeEffect, typeSpeed);
        }
        
        typeEffect();
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Parallax effect for hero background
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroParticles = document.querySelector('.hero-particles');
        const heroGrid = document.querySelector('.hero-grid');
        
        if (heroParticles) {
            heroParticles.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
        
        if (heroGrid) {
            heroGrid.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
    
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animations
    document.querySelectorAll('.tech-category, .highlight-item, .stat-card, .about-text').forEach(el => {
        observer.observe(el);
    });
    
    // Tech item hover effects
    document.querySelectorAll('.tech-item').forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(5deg)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });
    
    // Dynamic particle animation
    function createParticles() {
        const particlesContainer = document.querySelector('.hero-particles');
        if (!particlesContainer) return;
        
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'floating-particle';
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 4 + 1}px;
                height: ${Math.random() * 4 + 1}px;
                background: rgba(99, 102, 241, ${Math.random() * 0.5 + 0.2});
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: floatParticle ${Math.random() * 10 + 10}s linear infinite;
                pointer-events: none;
            `;
            particlesContainer.appendChild(particle);
        }
    }
    
    // Add floating particle animation to CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatParticle {
            0% {
                transform: translateY(100vh) translateX(0);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100px) translateX(${Math.random() * 200 - 100}px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    createParticles();
    
    // Animate language progress bars on scroll
    const languageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBars = entry.target.querySelectorAll('.language-progress');
                progressBars.forEach(bar => {
                    const width = bar.style.width;
                    bar.style.width = '0%';
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 200);
                });
                languageObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    document.querySelectorAll('.github-stat-card').forEach(card => {
        languageObserver.observe(card);
    });
    
    // Counter animation for stats
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        function updateCounter() {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        }
        
        updateCounter();
    }
    
    // Animate stat numbers when they come into view
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                statNumbers.forEach(statNumber => {
                    const target = parseInt(statNumber.textContent);
                    statNumber.textContent = '0';
                    animateCounter(statNumber, target, 1500);
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    document.querySelectorAll('.github-stat-card').forEach(card => {
        statsObserver.observe(card);
    });
    
    // Copy email on click
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    emailLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const email = this.href.replace('mailto:', '');
            navigator.clipboard.writeText(email).then(() => {
                showToast('Email copied to clipboard!');
            });
        });
    });
    
    // Toast notification
    function showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: var(--primary-color);
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            box-shadow: var(--shadow-lg);
            z-index: 1000;
            animation: slideInUp 0.3s ease;
        `;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.animation = 'slideOutDown 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 3000);
    }
    
    // Add toast animations to CSS
    const toastStyle = document.createElement('style');
    toastStyle.textContent = `
        @keyframes slideInUp {
            from {
                transform: translateY(100%);
                opacity: 0;
            }
            to {
                transform: translateY(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutDown {
            from {
                transform: translateY(0);
                opacity: 1;
            }
            to {
                transform: translateY(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(toastStyle);
});

// Additional protection against unwanted scrolling
window.addEventListener('load', function() {
    // Force scroll to top one more time after everything loads
    window.scrollTo(0, 0);
});

// Lazy loading for images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ================================
// MODERN CODE BLOCK FUNCTIONALITY
// ================================

// Initialize code blocks with syntax highlighting and copy functionality
function initializeCodeBlocks() {
    console.log('Initializing code blocks...');
    
    // Transform existing code blocks
    const codeBlocks = document.querySelectorAll('pre code');
    console.log('Found', codeBlocks.length, 'code blocks');
    
    codeBlocks.forEach((codeElement, index) => {
        const preElement = codeElement.parentElement;
        
        // Skip if already processed
        if (preElement.closest('.code-block-container')) {
            return;
        }
        
        // NEW APPROACH: Extract language from the original markdown content
        let language = extractLanguageFromContext(preElement, codeElement);
        
        console.log('Detected language:', language, 'for code block', index);
        
        // Create modern code block container
        const container = document.createElement('div');
        container.className = `code-block-container language-${language}`;
        
        // Create header
        const header = createCodeBlockHeader(language, index);
        
        // Create content wrapper
        const contentWrapper = document.createElement('div');
        contentWrapper.className = 'code-content';
        
        // Clone the pre element before removing it
        const clonedPre = preElement.cloneNode(true);
        contentWrapper.appendChild(clonedPre);
        
        // Assemble the code block
        container.appendChild(header);
        container.appendChild(contentWrapper);
        
        // Replace the original pre element with the new container
        preElement.parentElement.replaceChild(container, preElement);
        
        // Add line numbers if code is long enough
        if (codeElement.textContent.split('\n').length > 5) {
            addLineNumbers(contentWrapper, clonedPre.querySelector('code'));
        }
        
        // Store code content for copying
        container.setAttribute('data-code', codeElement.textContent);
    });
}

// Extract language from markdown context by looking for ```language pattern
function extractLanguageFromContext(preElement, codeElement) {
    // Strategy 1: Check for language class on <code>, its parent <pre>, or ancestor wrappers (Jekyll/Rouge structure)
    let language = 'text';
    const codeContent = codeElement.textContent.trim();

    function extractFromClassList(el) {
        if (!el || !el.classList) return null;
        for (const cls of el.classList) {
            let m = cls.match(/^language-([\w\d\+\#]+)/i) || cls.match(/^lang-([\w\d\+\#]+)/i);
            if (m) return m[1].toLowerCase();
            // Rouge sometimes uses just the language name as a class on <code>
            const known = ['bash','shell','sh','python','javascript','js','json','html','css','yaml','yml','ini','conf','text','plaintext','cpp','c','java','sql','typescript','ts'];
            if (known.includes(cls.toLowerCase())) return cls.toLowerCase();
        }
        return null;
    }

    const direct = extractFromClassList(codeElement) || extractFromClassList(preElement) || extractFromClassList(codeElement.closest('[class*="language-"]')) || extractFromClassList(codeElement.closest('.highlight'));
    if (direct) {
        language = direct;
        if (language === 'sh' || language === 'shell') language = 'bash';
        if (language === 'plaintext' || language === 'text') language = 'text';
        if (language === 'yml') language = 'yaml';
        console.log('Found language from class hierarchy:', language);
        return language;
    }

    // Strategy 2: Look at the previous text content for language hints (nearby headings / list items)
    let element = preElement.previousElementSibling;
    let searchText = '';
    while (element && searchText.length < 200) {
        if (element.textContent) {
            searchText = element.textContent + ' ' + searchText;
        }
        element = element.previousElementSibling;
    }
    const languageHints = [
        { pattern: /python[\s\-:]/i, lang: 'python' },
        { pattern: /javascript[\s\-:]/i, lang: 'javascript' },
        { pattern: /css[\s\-:]/i, lang: 'css' },
        { pattern: /html[\s\-:]/i, lang: 'html' },
        { pattern: /json[\s\-:]/i, lang: 'json' },
        { pattern: /c\+\+[\s\-:]/i, lang: 'cpp' },
        { pattern: /java[\s\-:]/i, lang: 'java' },
        { pattern: /bash[\s\-:]/i, lang: 'bash' },
        { pattern: /shell[\s\-:]/i, lang: 'bash' },
        { pattern: /sql[\s\-:]/i, lang: 'sql' },
        { pattern: /yaml|yml[\s\-:]/i, lang: 'yaml' },
        { pattern: /typescript|\bts\b[\s\-:]/i, lang: 'typescript' },
        { pattern: /ini[\s\-:]/i, lang: 'ini' },
        { pattern: /conf[\s\-:]/i, lang: 'conf' },
        { pattern: /plaintext|text[\s\-:]/i, lang: 'text' }
    ];
    for (const hint of languageHints) {
        if (hint.pattern.test(searchText)) {
            language = hint.lang;
            console.log('Found language from context hint:', language);
            return language;
        }
    }
    // Strategy 3: Analyze code content for language-specific patterns & heuristics
    language = detectLanguageFromCode(codeContent);
    console.log('Detected language from code analysis:', language);
    return language;
}

// Detect language from code content patterns
function detectLanguageFromCode(code) {
    const patterns = [
        { regex: /import\s+\w+\s+as\s+\w+|def\s+\w+\(|print\(|\.py/i, lang: 'python' },
        { regex: /#include\s*<|std::|template\s*<|\.cpp|\.h/i, lang: 'cpp' },
        { regex: /const\s+|let\s+|var\s+|function\s*\(|=>\s*{|\.js/i, lang: 'javascript' },
        { regex: /public\s+class|private\s+|public\s+static\s+void\s+main|\.java/i, lang: 'java' },
        { regex: /<\w+[^>]*>|<\/\w+>|<!DOCTYPE/i, lang: 'html' },
        { regex: /\{[^}]*:[^}]*\}|"[\w-]+"\s*:/i, lang: 'json' },
        { regex: /--[\w-]+:|:root\s*{|\.[\w-]+\s*{|@media/i, lang: 'css' },
        { regex: /(^|\n)\s*(sudo\s+)?(apt|yum|dnf|pacman)\s+|sudo\s+systemctl\s+|#!/i, lang: 'bash' },
        { regex: /(^|\n)\s*echo\s+|(^|\n)\s*ls\s+|(^|\n)\s*cd\s+|(^|\n)\s*mkdir\s+|\$\w+/i, lang: 'bash' },
        { regex: /SELECT\s+|FROM\s+|WHERE\s+|INSERT\s+INTO/i, lang: 'sql' },
        { regex: /(\[[^\]]+\]\s*\n)|(^[A-Za-z0-9_.-]+\s*=\s*[^\n]+)/m, lang: 'ini' },
        { regex: /(acl\s+\w+|http_access|visible_hostname)/i, lang: 'conf' },
        { regex: /(---|\.\.\.)\n[\s\S]*?:\s|^\s*\w+:\s*$/m, lang: 'yaml' }
    ];
    
    for (const pattern of patterns) {
        if (pattern.regex.test(code)) {
            return pattern.lang;
        }
    }
    
    return 'text'; // fallback
}

// Create code block header with language indicator and copy button
function createCodeBlockHeader(language, index) {
    const header = document.createElement('div');
    header.className = 'code-block-header';
    
    // Left side - language info
    const titleDiv = document.createElement('div');
    titleDiv.className = 'code-block-title';
    
    // Language icon
    const iconDiv = document.createElement('div');
    iconDiv.className = `code-file-icon ${language}`;
    
    // Use actual language logos instead of text
    const iconSvg = getLanguageIconSvg(language);
    if (iconSvg) {
        iconDiv.innerHTML = iconSvg;
    } else {
        iconDiv.textContent = getLanguageIcon(language);
    }
    
    // Language label
    const langSpan = document.createElement('span');
    langSpan.className = 'code-language';
    langSpan.textContent = getLanguageLabel(language);
    
    titleDiv.appendChild(iconDiv);
    titleDiv.appendChild(langSpan);
    
    // Right side - terminal dots and copy button
    const controlsDiv = document.createElement('div');
    controlsDiv.style.display = 'flex';
    controlsDiv.style.alignItems = 'center';
    controlsDiv.style.gap = '1rem';
    
    // Terminal dots
    const dotsDiv = document.createElement('div');
    dotsDiv.className = 'terminal-dots';
    
    const dots = ['close', 'minimize', 'maximize'];
    dots.forEach(type => {
        const dot = document.createElement('div');
        dot.className = `terminal-dot ${type}`;
        dotsDiv.appendChild(dot);
    });
    
    // Copy button
    const copyButton = document.createElement('button');
    copyButton.className = 'copy-button';
    copyButton.innerHTML = `
        <svg class="copy-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
        </svg>
        <span>Copy</span>
    `;
    
    // Add click handler for copy functionality
    copyButton.addEventListener('click', () => copyCodeToClipboard(copyButton));
    
    controlsDiv.appendChild(dotsDiv);
    controlsDiv.appendChild(copyButton);
    
    header.appendChild(titleDiv);
    header.appendChild(controlsDiv);
    
    return header;
}

// Get language icon for display
function getLanguageIcon(language) {
    const icons = {
        'javascript': 'JS',
        'js': 'JS',
        'python': 'PY',
        'py': 'PY',
        'html': 'HTML',
        'css': 'CSS',
        'scss': 'SCSS',
        'sass': 'SASS',
        'json': 'JSON',
        'bash': 'SH',
        'shell': 'SH',
        'sh': 'SH',
        'sql': 'SQL',
        'yaml': 'YML',
        'yml': 'YML',
        'xml': 'XML',
        'cpp': 'C++',
        'c': 'C',
        'java': 'JAVA',
        'php': 'PHP',
        'ruby': 'RB',
        'rb': 'RB',
        'go': 'GO',
        'rust': 'RS',
        'rs': 'RS',
        'swift': 'SW',
        'typescript': 'TS',
        'ts': 'TS',
        'jsx': 'JSX',
        'tsx': 'TSX',
        'vue': 'VUE',
        'svelte': 'SV',
        'markdown': 'MD',
        'md': 'MD',
        'text': 'TXT',
        'txt': 'TXT'
    };
    
    const lowerLang = language.toLowerCase();
    return icons[lowerLang] || language.slice(0, 3).toUpperCase();
}

// Get actual language logo SVG
function getLanguageIconSvg(language) {
    const lowerLang = language.toLowerCase();
    
    const logoSvgs = {
        'python': `
            <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09-.33.22zM21.1 6.11l.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.88.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01h-8.22v.82h5.84l.01 2.76.02.36-.05.34-.11.31-.17.29-.25.25-.31.24-.38.2-.44.17-.51.15-.58.13-.64.09-.71.07-.77.04-.84.01-1.27-.04-1.07-.14-.9-.2-.73-.25-.59-.3-.45-.33-.34-.34-.25-.34-.16-.33-.1-.3-.04-.25-.02-.2.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.01zm-6.47 14.25l-.23.33-.08.41.08.41.23.33.33.23.41.08.41-.08.33-.23.23-.33.08-.41-.08-.41-.23-.33-.33-.23-.41-.08-.41.08-.33.23z"/>
            </svg>
        `,
        'py': `
            <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09-.33.22zM21.1 6.11l.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.88.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01h-8.22v.82h5.84l.01 2.76.02.36-.05.34-.11.31-.17.29-.25.25-.31.24-.38.2-.44.17-.51.15-.58.13-.64.09-.71.07-.77.04-.84.01-1.27-.04-1.07-.14-.9-.2-.73-.25-.59-.3-.45-.33-.34-.34-.25-.34-.16-.33-.1-.3-.04-.25-.02-.2.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.01zm-6.47 14.25l-.23.33-.08.41.08.41.23.33.33.23.41.08.41-.08.33-.23.23-.33.08-.41-.08-.41-.23-.33-.33-.23-.41-.08-.41.08-.33.23z"/>
            </svg>
        `,
        'javascript': `
            <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z"/>
            </svg>
        `,
        'js': `
            <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z"/>
            </svg>
        `,
        'css': `
            <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.855L12 19.288l5.373-1.53L18.59 4.414z"/>
            </svg>
        `,
        'html': `
            <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z"/>
            </svg>
        `,
        'json': `
            <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M5.843 8.588a.994.994 0 0 0-.35-.844.996.996 0 0 0-.702-.253H3.21v1.75h1.581c.264 0 .487-.081.67-.242.181-.162.272-.37.272-.624.01-.093-.02-.186-.073-.269a.506.506 0 0 0-.177-.218l1.42-.3zm.175 3.832a1.14 1.14 0 0 0-.77-.254H3.21v1.826h2.038c.294 0 .54-.091.736-.274.195-.182.293-.42.293-.712 0-.292-.097-.529-.292-.71a1.014 1.014 0 0 0-.967-.126z"/>
                <path d="M17.5 0h-15v24h19V4.5L17.5 0zM16 1.5l2.5 2.5H16V1.5zM4 22V2h11v3h3v17H4z"/>
                <path d="M12.25 13.5c0 .415-.335.75-.75.75s-.75-.335-.75-.75.335-.75.75-.75.75.335.75.75z"/>
            </svg>
        `,
        'cpp': `
            <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.394 6c-.167-.29-.398-.543-.652-.69L12.926.22c-.509-.294-1.34-.294-1.848 0L2.26 5.31c-.508.293-.923 1.013-.923 1.6v10.18c0 .294.104.62.271.91.167.29.398.543.652.69l8.816 5.09c.508.293 1.34.293 1.848 0l8.816-5.09c.254-.147.485-.4.652-.69.167-.29.27-.616.27-.91V6.91c.003-.294-.1-.62-.268-.91zM12 19.11c-3.92 0-7.109-3.19-7.109-7.11 0-3.92 3.19-7.11 7.109-7.11a7.133 7.133 0 0 1 6.156 3.553l-3.076 1.78a3.567 3.567 0 0 0-3.08-1.78A3.56 3.56 0 0 0 8.444 12 3.56 3.56 0 0 0 12 15.555a3.57 3.57 0 0 0 3.08-1.778l3.078 1.78A7.135 7.135 0 0 1 12 19.11zm7.11-6.715h-.79V11.61h-.79v.785h-.79v.79h.79v.785h.79v-.785h.79zm2.962 0h-.79V11.61h-.79v.785h-.79v.79h.79v.785h.79v-.785h.79z"/>
            </svg>
        `,
        'java': `
            <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M8.851 18.56s-.917.534.653.714c1.902.218 2.874.187 4.969-.211 0 0 .552.346 1.321.646-4.699 2.013-10.633-.118-6.943-1.149M8.276 15.933s-1.028.761.542.924c2.032.209 3.636.227 6.413-.308 0 0 .384.389.987.602-5.679 1.661-12.007.13-7.942-1.218M13.116 11.475c1.158 1.333-.304 2.533-.304 2.533s2.939-1.518 1.589-3.418c-1.261-1.772-2.228-2.652 3.007-5.688 0-.001-8.216 2.051-4.292 6.573M19.33 20.504s.679.559-.747.991c-2.712.822-11.288 1.069-13.669.033-.856-.373.75-.89 1.254-.998.527-.114.828-.093.828-.093-.953-.671-6.156 1.317-2.643 1.887 9.58 1.553 17.462-.7 14.977-1.82M9.292 13.21s-4.362 1.036-1.544 1.412c1.189.159 3.561.123 5.77-.062 1.806-.152 3.618-.477 3.618-.477s-.637.272-1.098.587c-4.429 1.165-12.986.623-10.522-.568 2.082-1.006 3.776-.892 3.776-.892M17.116 17.584c4.503-2.34 2.421-4.589.968-4.285-.355.074-.515.138-.515.138s.132-.207.385-.297c2.875-1.011 5.086 2.981-.928 4.562 0-.001.07-.062.09-.118M14.401 0s2.494 2.494-2.365 6.33c-3.896 3.077-.888 4.832-.001 6.836-2.274-2.053-3.943-3.858-2.824-5.539 1.644-2.469 6.197-3.665 5.19-7.627M9.734 23.924c4.322.277 10.959-.153 11.116-2.198 0 0-.302.775-3.572 1.391-3.688.694-8.239.613-10.937.168 0-.001.553.457 3.393.639"/>
            </svg>
        `,
        'bash': `
            <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M21.038 4.9l-7.577-4.498c-.914-.543-2.009-.543-2.923 0L2.96 4.9C2.046 5.443 1.5 6.398 1.5 7.5v9c0 1.102.546 2.057 1.46 2.6l7.578 4.498c.914.543 2.009.543 2.923 0l7.577-4.498c.914-.543 1.461-1.498 1.461-2.6v-9c0-1.102-.547-2.057-1.461-2.6zM10.59 11.938l1.666 2.796c.117.196.34.314.578.314.213 0 .414-.106.532-.284l.848-1.273 1.273.848c.178.118.38.177.584.177.243 0 .484-.102.65-.3l.55-.656c.284-.34.239-.843-.1-1.127l-2.026-1.701 2.026-1.701c.339-.284.384-.787.1-1.127l-.55-.656c-.166-.198-.407-.3-.65-.3-.204 0-.406.059-.584.177l-1.273.848-.848-1.273c-.118-.178-.319-.284-.532-.284-.238 0-.461.118-.578.314l-1.666 2.796c-.166.278-.166.626 0 .904z"/>
            </svg>
        `,
        'shell': `
            <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M21.038 4.9l-7.577-4.498c-.914-.543-2.009-.543-2.923 0L2.96 4.9C2.046 5.443 1.5 6.398 1.5 7.5v9c0 1.102.546 2.057 1.46 2.6l7.578 4.498c.914.543 2.009.543 2.923 0l7.577-4.498c.914-.543 1.461-1.498 1.461-2.6v-9c0-1.102-.547-2.057-1.461-2.6zM10.59 11.938l1.666 2.796c.117.196.34.314.578.314.213 0 .414-.106.532-.284l.848-1.273 1.273.848c.178.118.38.177.584.177.243 0 .484-.102.65-.3l.55-.656c.284-.34.239-.843-.1-1.127l-2.026-1.701 2.026-1.701c.339-.284.384-.787.1-1.127l-.55-.656c-.166-.198-.407-.3-.65-.3-.204 0-.406.059-.584.177l-1.273.848-.848-1.273c-.118-.178-.319-.284-.532-.284-.238 0-.461.118-.578.314l-1.666 2.796c-.166.278-.166.626 0 .904z"/>
            </svg>
        `,
        'typescript': `
            <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z"/>
            </svg>
        `,
        'ts': `
            <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z"/>
            </svg>
        `,
        'rust': `
            <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.836 8.794a.787.787 0 0 0-.117-.136l-1.018-.862a.787.787 0 0 0-1.043.06l-.786.786a.787.787 0 0 0-.06 1.043l.862 1.018a.787.787 0 0 0 .136.117 15.094 15.094 0 0 1 .813-1.026zm-3.56-5.077L21.305.688a.787.787 0 0 0-1.112 0l-1.019.862a.787.787 0 0 0-.06 1.043l.786.786a.787.787 0 0 0 1.043.06l1.018-.862a.787.787 0 0 0 .115-1.09zm-7.06 1.11c-.314-.314-.863-.314-1.177 0L9.6 7.266c-.157.157-.157.412 0 .569.314.314.863.314 1.177 0l2.44-2.44c.156-.157.156-.412 0-.569zm-1.177 7.86L9.6 10.248c-.157-.157-.412-.157-.569 0-.314.314-.314.863 0 1.177l2.44 2.44c.157.157.412.157.569 0 .314-.314.314-.863 0-1.177zm0-2.44l-2.44-2.44a.403.403 0 0 0-.569 0c-.314.314-.314.863 0 1.177l2.44 2.44c.157.157.412.157.569 0 .314-.314.314-.863 0-1.177z"/>
            </svg>
        `,
        'go': `
            <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M1.811 10.231c-.047 0-.058-.023-.035-.059.023-.035.081-.058.128-.058.047 0 .058.023.035.058-.023.036-.081.059-.128.059zm.81.025c-.047 0-.058-.023-.035-.058.023-.036.081-.059.128-.059.047 0 .058.023.035.059-.023.035-.081.058-.128.058zm.774-.012c-.058 0-.081-.035-.058-.081.023-.047.093-.07.151-.047.058.023.081.058.058.105-.023.047-.093.07-.151.023zM12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12zm5.628-11.814h-1.686c-.047 0-.081.023-.081.058v.116c0 .047.035.081.081.081h.662v.697c-.151.023-.302.035-.465.035-.616 0-1.151-.267-1.151-.952 0-.686.535-.964 1.151-.964.186 0 .372.023.546.07V10.15c-.174-.047-.36-.081-.546-.081-1.093 0-1.872.697-1.872 1.732 0 1.035.779 1.732 1.872 1.732.244 0 .5-.035.779-.093l.012-.012v-1.337h-.035-.314zm-4.314-.593c0-.628-.395-1.116-1.162-1.116-.767 0-1.162.488-1.162 1.116s.395 1.116 1.162 1.116c.767 0 1.162-.488 1.162-1.116zm-.651 0c0 .337-.14.604-.511.604s-.511-.267-.511-.604.14-.604.511-.604.511.267.511.604zM7.826 11.442c0-.663-.372-1.023-1.046-1.023h-1.035v2.093h.651v-.814h.372c.116 0 .221.035.302.14l.488.674h.802l-.651-.86c.302-.14.465-.442.465-.767zm-.651.023c0 .209-.14.314-.349.314h-.372v-.651h.372c.209 0 .349.128.349.337z"/>
            </svg>
        `,
        'yaml': `
            <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.276 6h-5.596L12.7 12h4.316c.29 0 .53.24.53.53v5.47c0 .29-.24.53-.53.53H6.984c-.29 0-.53-.24-.53-.53v-5.47c0-.29.24-.53.53-.53H11.3L7.32 6H1.724c-.29 0-.53-.24-.53-.53V.53c0-.29.24-.53.53-.53h20.552c.29 0 .53.24.53.53v4.94c0 .29-.24.53-.53.53z"/>
            </svg>
        `
    };
    
    return logoSvgs[lowerLang] || null;
}

// Get language label for display
function getLanguageLabel(language) {
    const labels = {
        'javascript': 'JavaScript',
        'js': 'JavaScript',
        'python': 'Python',
        'py': 'Python',
        'html': 'HTML',
        'css': 'CSS',
        'scss': 'SCSS',
        'sass': 'SASS',
        'json': 'JSON',
        'bash': 'Bash',
        'shell': 'Shell',
        'sh': 'Shell',
        'sql': 'SQL',
        'yaml': 'YAML',
        'yml': 'YAML',
        'xml': 'XML',
        'cpp': 'C++',
        'c': 'C',
        'java': 'Java',
        'php': 'PHP',
        'ruby': 'Ruby',
        'rb': 'Ruby',
        'go': 'Go',
        'rust': 'Rust',
        'rs': 'Rust',
        'swift': 'Swift',
        'typescript': 'TypeScript',
        'ts': 'TypeScript',
        'jsx': 'JSX',
        'tsx': 'TSX',
        'vue': 'Vue',
        'svelte': 'Svelte',
        'markdown': 'Markdown',
        'md': 'Markdown',
        'text': 'Plain Text',
        'txt': 'Plain Text'
    };
    
    const lowerLang = language.toLowerCase();
    return labels[lowerLang] || language.toUpperCase();
}

// Add line numbers to code block
function addLineNumbers(contentWrapper, codeElement) {
    contentWrapper.classList.add('with-line-numbers');
    
    const lines = codeElement.textContent.split('\n');
    const lineNumbersDiv = document.createElement('div');
    lineNumbersDiv.className = 'line-numbers';
    
    lines.forEach((line, index) => {
        const lineNumber = document.createElement('span');
        lineNumber.textContent = index + 1;
        lineNumbersDiv.appendChild(lineNumber);
    });
    
    contentWrapper.insertBefore(lineNumbersDiv, contentWrapper.firstChild);
}

// Copy code to clipboard with animation feedback
async function copyCodeToClipboard(button) {
    const container = button.closest('.code-block-container');
    const code = container.getAttribute('data-code');
    
    try {
        await navigator.clipboard.writeText(code);
        
        // Update button state
        const icon = button.querySelector('.copy-icon');
        const text = button.querySelector('span');
        
        // Store original content
        const originalIcon = icon.outerHTML;
        const originalText = text.textContent;
        
        // Show success state
        button.classList.add('copied');
        icon.innerHTML = `<path d="M20 6L9 17l-5-5"></path>`;
        text.textContent = 'Copied!';
        
        // Reset after 2 seconds
        setTimeout(() => {
            button.classList.remove('copied');
            icon.outerHTML = originalIcon;
            text.textContent = originalText;
        }, 2000);
        
    } catch (err) {
        console.error('Failed to copy code:', err);
        
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = code;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        
        // Show copied state even for fallback
        button.classList.add('copied');
        setTimeout(() => button.classList.remove('copied'), 2000);
    }
}

// Initialize code blocks when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeCodeBlocks);
} else {
    initializeCodeBlocks();
}

// Re-initialize code blocks for dynamically added content
const codeBlockObserver = new MutationObserver((mutations) => {
    let hasNewCodeBlocks = false;
    
    mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
                if (node.tagName === 'PRE' || node.querySelector('pre')) {
                    hasNewCodeBlocks = true;
                }
            }
        });
    });
    
    if (hasNewCodeBlocks) {
        initializeCodeBlocks();
    }
});

// Start observing for dynamic content
codeBlockObserver.observe(document.body, {
    childList: true,
    subtree: true
});

// Enhanced syntax highlighting for specific tokens
function enhanceSyntaxHighlighting() {
    const codeElements = document.querySelectorAll('pre code');
    
    codeElements.forEach(codeElement => {
        const language = codeElement.className.match(/language-(\w+)/);
        if (!language) return;
        
        const lang = language[1];
        let html = codeElement.innerHTML;
        
        // Apply language-specific highlighting patterns
        switch (lang) {
            case 'javascript':
            case 'js':
                html = highlightJavaScript(html);
                break;
            case 'python':
                html = highlightPython(html);
                break;
            case 'css':
                html = highlightCSS(html);
                break;
            case 'html':
                html = highlightHTML(html);
                break;
        }
        
        codeElement.innerHTML = html;
    });
}

// JavaScript syntax highlighting
function highlightJavaScript(html) {
    // Keywords
    html = html.replace(/\b(const|let|var|function|return|if|else|for|while|class|extends|import|export|from|async|await|try|catch|finally|throw|new|this|super|static|get|set)\b/g, '<span class="k">$1</span>');
    
    // Strings
    html = html.replace(/(["'`])((?:\\.|(?!\1)[^\\])*?)\1/g, '<span class="s">$1$2$1</span>');
    
    // Numbers
    html = html.replace(/\b(\d+\.?\d*)\b/g, '<span class="m">$1</span>');
    
    // Functions
    html = html.replace(/(\w+)(?=\()/g, '<span class="nf">$1</span>');
    
    return html;
}

// Python syntax highlighting
function highlightPython(html) {
    // Keywords
    html = html.replace(/\b(def|class|import|from|if|elif|else|for|while|try|except|finally|with|as|return|yield|lambda|and|or|not|in|is|None|True|False|self|cls)\b/g, '<span class="k">$1</span>');
    
    // Strings
    html = html.replace(/(["'])((?:\\.|(?!\1)[^\\])*?)\1/g, '<span class="s">$1$2$1</span>');
    
    // Numbers
    html = html.replace(/\b(\d+\.?\d*)\b/g, '<span class="m">$1</span>');
    
    // Functions and classes
    html = html.replace(/(\w+)(?=\()/g, '<span class="nf">$1</span>');
    
    return html;
}

// CSS syntax highlighting
function highlightCSS(html) {
    // Properties
    html = html.replace(/([a-z-]+)(?=\s*:)/g, '<span class="k">$1</span>');
    
    // Values
    html = html.replace(/:([^;{]+)/g, ':<span class="m">$1</span>');
    
    // Selectors
    html = html.replace(/^([^{]+)(?=\s*{)/gm, '<span class="nt">$1</span>');
    
    return html;
}

// HTML syntax highlighting
function highlightHTML(html) {
    // Tags
    html = html.replace(/(&lt;\/?)([\w-]+)/g, '$1<span class="nt">$2</span>');
    
    // Attributes
    html = html.replace(/(\w+)(?==)/g, '<span class="na">$1</span>');
    
    // Attribute values
    html = html.replace(/=("[^"]*"|'[^']*')/g, '=<span class="s">$1</span>');
    
    return html;
}

// Initialize enhanced syntax highlighting
setTimeout(enhanceSyntaxHighlighting, 100);
