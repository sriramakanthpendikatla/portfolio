// script.js
        // Theme Toggle
        const themeToggle = document.getElementById('theme-toggle');
        const themeIcon = document.getElementById('theme-icon');
        const body = document.body;

        // Check for saved theme preference
        const savedTheme = localStorage.getItem('theme') || 'dark';
        body.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);

        themeToggle.addEventListener('click', () => {
            const currentTheme = body.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            body.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
        });

        function updateThemeIcon(theme) {
            if (theme === 'light') {
                themeIcon.className = 'fas fa-moon';
            } else {
                themeIcon.className = 'fas fa-sun';
            }
        }

        // Loading Screen
        window.addEventListener('load', () => {
            setTimeout(() => {
                document.getElementById('loading').classList.add('hidden');
            }, 1000);
        });

        // Particles
        function createParticles() {
            const particlesContainer = document.getElementById('particles');
            const particleCount = 50;

            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.animationDelay = Math.random() * 20 + 's';
                particle.style.animationDuration = (Math.random() * 20 + 20) + 's';
                particlesContainer.appendChild(particle);
            }
        }

        createParticles();

        // Navbar Scroll Effect
        window.addEventListener('scroll', () => {
            const navbar = document.getElementById('navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }

            // Scroll to Top Button
            const scrollTop = document.getElementById('scrollTop');
            if (window.scrollY > 300) {
                scrollTop.classList.add('visible');
            } else {
                scrollTop.classList.remove('visible');
            }
        });

        // Smooth Scrolling
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

        // Scroll to Top
        document.getElementById('scrollTop').addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Intersection Observer for Animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe elements
        document.querySelectorAll('.skill-card, .project-card, .cert-card, .about-container > div').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'all 0.6s ease';
            observer.observe(el);
        });

        // Form submission
        const form = document.querySelector('form');
        form.addEventListener('submit', function(e) {
            const button = this.querySelector('.form-button');
            button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            button.disabled = true;
        });

        // Mobile Menu Toggle
        const mobileMenu = document.getElementById('mobile-menu');
        const navLinks = document.querySelector('.nav-links');

        mobileMenu.addEventListener('click', () => {
            navLinks.classList.toggle('mobile-active');
        });

        // Certificate Modal
        const certificateModal = document.getElementById('certificate-modal');
        const modalClose = document.getElementById('modal-close');
        const modalTitle = document.getElementById('modal-title');
        const modalIssuer = document.getElementById('modal-issuer');
        const certIframe = document.getElementById('cert-iframe');
        const modalDownload = document.getElementById('modal-download');
        const certError = document.getElementById('cert-error');
        const errorDownloadBtn = document.getElementById('error-download-btn');

        // Certificate data - in a real application, this would come from a database or API
        const certificates = {
            'python-hackerrank': {
                title: 'Python Programming Certification',
                issuer: 'HackerRank',
                pdfUrl: 'C:\\Users\\srira\\OneDrive\\Desktop\\sriram\\sriram\\python_basic certificate.pdf',
                downloadUrl: 'https://www.hackerrank.com/certificates/iframe/fc7c97396744',
                filename: 'python_basic certificate.pdf'
            },
             'Python for Data Science': {
                title: 'Python for Data Science',
                issuer: 'NPTEL',
                pdfUrl: 'https://archive.nptel.ac.in/content/noc/NOC24/SEM2/Ecertificates/106/noc24-cs68/Course/NPTEL24CS68S24960096902760142.pdf',
                downloadUrl: 'https://archive.nptel.ac.in/content/noc/NOC24/SEM2/Ecertificates/106/noc24-cs68/Course/NPTEL24CS68S24960096902760142.pdf',
                filename: 'Python for Data Science.pdf'
            },
            'data-science-nptel': {
                title: 'Data Science with Python',
                issuer: 'NPTEL',
                pdfUrl: 'https://internalapp.nptel.ac.in/NOC/NOC25/SEM1/Ecertificates/106/noc25-cs40/Course/NPTEL25CS40S66000323004325258.pdf',
                downloadUrl: 'https://internalapp.nptel.ac.in/NOC/NOC25/SEM1/Ecertificates/106/noc25-cs40/Course/NPTEL25CS40S66000323004325258.pdf',
                filename: 'Introduction to Database Systems.pdf'
            },
            'ui-ux-skillup': {
                title: 'Basics of UI/UX',
                issuer: 'Simplilearn - SkillUp',
                pdfUrl: 'https://simpli-web.app.link/e/idvSi3iJJTb',
                downloadUrl: 'https://simpli-web.app.link/e/idvSi3iJJTb',
                filename: '7489129_1729787243.pdf'
            },
            'generative-ai-google': {
                title: 'Generative AI in Google Cloud',
                issuer: 'Skill Boost Program',
                pdfUrl: 'https://www.credly.com/badges/9c81841b-bc3a-4cdf-a659-919aa314675c/public_url',
                downloadUrl: 'https://www.credly.com/badges/9c81841b-bc3a-4cdf-a659-919aa314675c/public_url',
                filename: 'develop-genai-apps-with-gemini-and-streamlit-skill-.pdf'
            },
            'prompt-engineering-ibm': {
                title: 'Introduction to Prompt Engineering',
                issuer: 'IBM - edX',
                // Local PDF path (make sure the PDF is in your project folder and the path is correct)
                pdfUrl: 'prompt_engineering_ibm_certificate.pdf',
                // Online certificate link
                downloadUrl: 'https://courses.edx.org/certificates/e241bf37550e4e0580d29fec5d3ca904?_gl=1*10udd1d*_gcl_au*MTgxMTg0Nzc3Ny4xNzQ4NDQyNTg0*_ga*MTY1NzIxNjEzOS4xNzQ4NDQyNTg0*_ga_D3KS4KMDT0*czE3NDg0NDI1ODQkbzEkZzEkdDE3NDg0NDI3NTIkajM0JGwwJGgw',
                filename: 'prompt_engineering_ibm_certificate.pdf'
            },
            'google-analytics': {
                title: 'Google Analytics Certification',
                issuer: 'Google',
                pdfUrl: 'https://www.africau.edu/images/default/sample.pdf',
                downloadUrl: 'https://www.africau.edu/images/default/sample.pdf',
                filename: 'Google_Analytics_Certification.pdf'
            },
            'azure-sql': {
                title: 'Build AI Apps with Azure SQL',
                issuer: 'Microsoft',
                pdfUrl: 'https://www.africau.edu/images/default/sample.pdf',
                downloadUrl: 'https://www.africau.edu/images/default/sample.pdf',
                filename: 'Azure_SQL_AI_Apps.pdf'
            },
            'startup-idea': {
                title: 'First Place - Startup Idea',
                issuer: 'Anurag University National Student Forum 2.0',
                pdfUrl: 'https://drive.google.com/file/d/1ELftv0FU0Sv2r-5LL16-mBl21wHWzEUN/view?usp=drive_link',
                downloadUrl: 'https://drive.google.com/file/d/1ELftv0FU0Sv2r-5LL16-mBl21wHWzEUN/view?usp=drive_link',
                filename: 'Pendikatla Sri Rama Kanth.pdf'
            }
            
        };

        // Helper function to handle downloads (addresses cross-origin issues)
        async function downloadCertificate(url, filename) {
            try {
                const response = await fetch(url);
                const blob = await response.blob();
                const downloadUrl = window.URL.createObjectURL(blob);
                
                const tempLink = document.createElement('a');
                tempLink.href = downloadUrl;
                tempLink.setAttribute('download', filename);
                tempLink.click();
                
                window.URL.revokeObjectURL(downloadUrl);
                return true;
            } catch (error) {
                console.error('Download failed:', error);
                // If fetch fails, try direct download as fallback
                return false;
            }
        }

        // Add click handlers to download buttons
        modalDownload.addEventListener('click', function(e) {
            const certId = this.getAttribute('data-cert-id');
            if (certId && certificates[certId]) {
                e.preventDefault();
                downloadCertificate(certificates[certId].downloadUrl, certificates[certId].filename);
            }
        });

        errorDownloadBtn.addEventListener('click', function(e) {
            const certId = this.getAttribute('data-cert-id');
            if (certId && certificates[certId]) {
                e.preventDefault();
                downloadCertificate(certificates[certId].downloadUrl, certificates[certId].filename);
            }
        });

        // Open modal when clicking on a certificate
        document.querySelectorAll('.cert-card').forEach(card => {
            card.addEventListener('click', function() {
                const certId = this.getAttribute('data-cert');
                const certData = certificates[certId];
                
                if (certData) {
                    modalTitle.textContent = certData.title;
                    modalIssuer.textContent = 'Issuer: ' + certData.issuer;
                    
                    // Hide error message initially
                    certError.style.display = 'none';
                    certIframe.style.display = 'block';
                    
                    // Set iframe src and download links
                    certIframe.src = certData.pdfUrl;
                    
                    // Configure download links
                    modalDownload.href = certData.downloadUrl;
                    modalDownload.setAttribute('download', certData.filename);
                    modalDownload.setAttribute('data-cert-id', certId);
                    
                    errorDownloadBtn.href = certData.downloadUrl;
                    errorDownloadBtn.setAttribute('download', certData.filename);
                    errorDownloadBtn.setAttribute('data-cert-id', certId);
                    
                    certificateModal.classList.add('active');
                    // Allow modal to scroll but not the background
                    document.body.style.overflow = 'hidden';
                    certificateModal.scrollTop = 0; // Reset scroll position
                }
            });
        });

        // Handle iframe load errors
        certIframe.addEventListener('load', function() {
            // Success - PDF loaded
            certError.style.display = 'none';
        });

        certIframe.addEventListener('error', function() {
            // Error - PDF failed to load
            certIframe.style.display = 'none';
            certError.style.display = 'flex';
        });

        // Close modal
        modalClose.addEventListener('click', () => {
            certificateModal.classList.remove('active');
            document.body.style.overflow = ''; // Restore body scrolling
            setTimeout(() => {
                certIframe.src = '';
                certError.style.display = 'none';
            }, 300);
        });

        // Close modal when clicking outside
        certificateModal.addEventListener('click', (e) => {
            if (e.target === certificateModal) {
                modalClose.click();
            }
        });

        // Close modal with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && certificateModal.classList.contains('active')) {
                modalClose.click();
            }
        });

        // Enhanced UI animations
        const sections = document.querySelectorAll('section');
        const navHeight = document.querySelector('nav').offsetHeight;

        // Highlight active section in navigation
        window.addEventListener('scroll', () => {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop - navHeight - 50;
                const sectionHeight = section.offsetHeight;
                
                if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });
            
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });

        // Add a slight parallax effect to hero section
        const heroSection = document.querySelector('.hero');
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            if (scrollY < heroSection.offsetHeight) {
                heroSection.style.backgroundPositionY = scrollY * 0.5 + 'px';
            }
        });