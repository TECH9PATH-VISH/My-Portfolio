document.addEventListener('DOMContentLoaded', () => {

    // 1. Mobile Menu Toggle
    const hamburger = document.getElementById('hamburger-toggle');
    const navLinks = document.getElementById('nav-links');
    const links = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
        hamburger.setAttribute('aria-expanded', !isExpanded);
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking a link
    links.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.setAttribute('aria-expanded', 'false');
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // 2. Navbar Background Transition on Scroll
    const navbar = document.getElementById('navbar');
    
    const handleNavbarScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleNavbarScroll);
    // Initial check in case user refreshes partway down
    handleNavbarScroll();

    // 3. Dynamic Terminal Typing Effect
    const typingTarget = document.getElementById('typing-target');
    const fullText = "C:\\Users\\Vishal> run full_stack_dev.exe";
    const promptText = "C:\\Users\\Vishal> ";
    let charIndex = 0;
    let isDeleting = false;

    const typeEffect = () => {
        if (!isDeleting) {
            // Typing mode
            typingTarget.textContent = fullText.substring(0, charIndex + 1);
            charIndex++;

            if (charIndex === fullText.length) {
                // Fully typed, pause for 3.5s before deleting command
                isDeleting = true;
                setTimeout(typeEffect, 3500);
            } else {
                // Type prompt fast (30ms), command at normal speed (100ms) with minor variance
                let speed = charIndex < promptText.length ? 30 : 100;
                if (charIndex >= promptText.length) {
                    speed += Math.random() * 60 - 30; // realistic typing jitter
                }
                setTimeout(typeEffect, speed);
            }
        } else {
            // Deleting mode (delete back to command prompt)
            typingTarget.textContent = fullText.substring(0, charIndex - 1);
            charIndex--;

            if (charIndex === promptText.length) {
                // Back to prompt, pause for 1.2s before typing command again
                isDeleting = false;
                setTimeout(typeEffect, 1200);
            } else {
                setTimeout(typeEffect, 40); // Deleting is fast and steady
            }
        }
    };

    // Start typing effect
    if (typingTarget) {
        setTimeout(typeEffect, 800);
    }

    // 4. Reveal-on-Scroll Intersection Observer
    const revealElements = document.querySelectorAll('.hidden');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                // Stop observing once revealed
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // 5. Back-to-Top Button
    const backToTopBtn = document.getElementById('back-to-top');

    const handleBackToTopScroll = () => {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    };

    window.addEventListener('scroll', handleBackToTopScroll);
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // 6. Interactive Contact Form Submission Simulation
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Temporary disable button and change visual state
            submitBtn.disabled = true;
            submitBtn.textContent = 'TRANSMITTING...';
            submitBtn.style.background = 'transparent';
            submitBtn.style.borderColor = 'var(--accent-green)';
            submitBtn.style.color = 'var(--accent-green)';
            submitBtn.style.boxShadow = '0 0 15px rgba(0, 255, 135, 0.4)';

            setTimeout(() => {
                // Change state to successful transmission
                submitBtn.textContent = 'SECURELY SENT!';
                
                // Show floating notification on success
                const notification = document.createElement('div');
                notification.style.position = 'fixed';
                notification.style.bottom = '20px';
                notification.style.left = '50%';
                notification.style.transform = 'translateX(-50%) translateY(100px)';
                notification.style.background = 'rgba(12, 13, 18, 0.9)';
                notification.style.color = 'var(--accent-green)';
                notification.style.border = '1px solid var(--accent-green)';
                notification.style.boxShadow = '0 0 20px rgba(0, 255, 135, 0.2)';
                notification.style.padding = '16px 32px';
                notification.style.borderRadius = '8px';
                notification.style.zIndex = '10000';
                notification.style.fontFamily = 'var(--font-mono)';
                notification.style.fontSize = '0.9rem';
                notification.style.transition = 'all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)';
                notification.textContent = 'SYSTEM MESSAGE: Message successfully routed.';
                
                document.body.appendChild(notification);
                
                // Animate notification in
                setTimeout(() => {
                    notification.style.transform = 'translateX(-50%) translateY(0)';
                }, 100);

                // Clear input fields
                contactForm.reset();

                // Reset button and notification after delay
                setTimeout(() => {
                    notification.style.transform = 'translateX(-50%) translateY(100px)';
                    notification.style.opacity = '0';
                    setTimeout(() => {
                        notification.remove();
                    }, 500);

                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Send Message';
                    submitBtn.style.background = 'var(--accent-cyan)';
                    submitBtn.style.borderColor = 'var(--accent-cyan)';
                    submitBtn.style.color = 'var(--bg-base)';
                    submitBtn.style.boxShadow = '0 4px 15px rgba(0, 240, 255, 0.2)';
                }, 4000);

            }, 1500);
        });
    }

    // 7. Neon Scroll Progress Bar
    const scrollProgress = document.getElementById('scroll-progress');
    if (scrollProgress) {
        window.addEventListener('scroll', () => {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrollPercentage = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
            scrollProgress.style.width = `${scrollPercentage}%`;
        });
    }

    // 7b. VS Code-Style Minimap Scrollbar
    const minimapTrack = document.getElementById('minimap-track');
    const minimapThumb = document.getElementById('minimap-thumb');
    const markers = document.querySelectorAll('.minimap-marker');
    
    const minimapSections = {
        hero: document.getElementById('hero'),
        education: document.getElementById('education'),
        projects: document.getElementById('projects'),
        contact: document.getElementById('contact')
    };

    const updateMarkerPositions = () => {
        if (!minimapTrack || !minimapThumb) return;
        const trackHeight = minimapTrack.clientHeight;
        const thumbHeight = minimapThumb.clientHeight;
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;

        if (scrollHeight <= 0) return;

        markers.forEach(marker => {
            const sectionId = marker.getAttribute('data-section');
            const sectionEl = minimapSections[sectionId];
            if (sectionEl) {
                // Get absolute Y position of section top relative to document
                const sectionTop = sectionEl.getBoundingClientRect().top + window.scrollY;
                const ratio = Math.max(0, Math.min(1, sectionTop / scrollHeight));
                // Center the marker where the thumb center would be at this ratio
                const markerCenterY = ratio * (trackHeight - thumbHeight) + (thumbHeight / 2);
                marker.style.top = `${markerCenterY}px`;
            }
        });
    };

    const updateThumbPosition = () => {
        if (!minimapTrack || !minimapThumb) return;
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = scrollHeight > 0 ? scrollTop / scrollHeight : 0;

        const trackHeight = minimapTrack.clientHeight;
        const thumbHeight = minimapThumb.clientHeight;
        
        // Position of the thumb (translateY value)
        const thumbTop = scrollPercent * (trackHeight - thumbHeight);
        minimapThumb.style.transform = `translate(-50%, ${thumbTop}px)`;

        // Overlap detection
        const thumbBottom = thumbTop + thumbHeight;

        markers.forEach(marker => {
            const markerTopStyle = marker.style.top;
            if (markerTopStyle) {
                const markerCenter = parseFloat(markerTopStyle);
                const markerHeight = marker.clientHeight || 6;
                const markerTop = markerCenter - (markerHeight / 2);
                const markerBottom = markerCenter + (markerHeight / 2);

                // Check overlap
                const overlaps = thumbTop <= markerBottom && thumbBottom >= markerTop;

                if (overlaps) {
                    marker.classList.add('active-pulse');
                } else {
                    marker.classList.remove('active-pulse');
                }
            }
        });
    };

    let isScrollingMinimap = false;
    const onScrollMinimap = () => {
        if (!isScrollingMinimap) {
            window.requestAnimationFrame(() => {
                updateThumbPosition();
                isScrollingMinimap = false;
            });
            isScrollingMinimap = true;
        }
    };

    window.addEventListener('scroll', onScrollMinimap);

    // Initial calculations
    updateMarkerPositions();
    updateThumbPosition();

    // Recalculate on load/resize/layout shifts
    window.addEventListener('load', () => {
        updateMarkerPositions();
        updateThumbPosition();
    });
    window.addEventListener('resize', () => {
        updateMarkerPositions();
        updateThumbPosition();
    });
    
    // Periodically run for a short duration after DOM ready to catch lazy images/fonts
    setTimeout(updateMarkerPositions, 500);
    setTimeout(updateMarkerPositions, 1500);

    // Click on track interaction
    if (minimapTrack) {
        minimapTrack.addEventListener('click', (e) => {
            if (e.target === minimapThumb) return;

            const rect = minimapTrack.getBoundingClientRect();
            const clickY = e.clientY - rect.top;
            const trackHeight = rect.height;
            const thumbHeight = minimapThumb.clientHeight;

            let ratio = (clickY - thumbHeight / 2) / (trackHeight - thumbHeight);
            ratio = Math.max(0, Math.min(1, ratio));

            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            const targetScrollY = ratio * scrollHeight;

            window.scrollTo({
                top: targetScrollY,
                behavior: 'smooth'
            });
        });
    }

    // Drag thumb interaction
    let isDraggingThumb = false;
    let startDragY = 0;
    let startScrollY = 0;

    const startDrag = (clientY) => {
        isDraggingThumb = true;
        startDragY = clientY;
        startScrollY = window.scrollY;
        document.body.style.userSelect = 'none';
        minimapThumb.style.cursor = 'grabbing';
    };

    const doDrag = (clientY) => {
        if (!isDraggingThumb) return;

        const deltaY = clientY - startDragY;
        const trackHeight = minimapTrack.clientHeight;
        const thumbHeight = minimapThumb.clientHeight;
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const trackRange = trackHeight - thumbHeight;

        if (trackRange <= 0) return;

        const scrollDelta = deltaY * (scrollHeight / trackRange);
        window.scrollTo(0, startScrollY + scrollDelta);
    };

    const stopDrag = () => {
        if (isDraggingThumb) {
            isDraggingThumb = false;
            document.body.style.userSelect = '';
            minimapThumb.style.cursor = 'grab';
        }
    };

    if (minimapThumb) {
        minimapThumb.addEventListener('mousedown', (e) => startDrag(e.clientY));
        minimapThumb.addEventListener('touchstart', (e) => startDrag(e.touches[0].clientY), { passive: true });
    }

    window.addEventListener('mousemove', (e) => doDrag(e.clientY));
    window.addEventListener('touchmove', (e) => {
        if (isDraggingThumb) {
            e.preventDefault();
            doDrag(e.touches[0].clientY);
        }
    }, { passive: false });

    window.addEventListener('mouseup', stopDrag);
    window.addEventListener('touchend', stopDrag);

    // 8. Custom Glowing Cursor
    const customCursor = document.getElementById('custom-cursor');
    if (customCursor && window.matchMedia('(pointer: fine)').matches) {
        let hasMoved = false;
        window.addEventListener('mousemove', (e) => {
            if (!hasMoved) {
                customCursor.style.display = 'block';
                document.body.classList.add('has-custom-cursor');
                hasMoved = true;
            }
            customCursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
        });

        // Event delegation for clickable/hoverable elements
        document.addEventListener('mouseover', (e) => {
            if (e.target.closest('a, button, select, textarea, input, .nav-link, .btn, .project-link, .social-link, .hamburger, [role="button"], .easter-egg-greeting')) {
                customCursor.classList.add('hover');
            }
        });
        document.addEventListener('mouseout', (e) => {
            if (e.target.closest('a, button, select, textarea, input, .nav-link, .btn, .project-link, .social-link, .hamburger, [role="button"], .easter-egg-greeting')) {
                customCursor.classList.remove('hover');
            }
        });
    }

    // 9. Multi-Language Easter Egg Greeting
    const greetingTrigger = document.getElementById('greeting-trigger');
    const greetings = [
        "Hi",          // English
        "こんにちは",    // Japanese
        "नमस्ते"        // Hindi
    ];
    let greetingIndex = 0;

    if (greetingTrigger) {
        greetingTrigger.addEventListener('click', () => {
            greetingIndex = (greetingIndex + 1) % greetings.length;
            
            // Transition effect
            greetingTrigger.style.opacity = '0';
            greetingTrigger.style.transform = 'scale(0.95)';
            
            setTimeout(() => {
                greetingTrigger.textContent = greetings[greetingIndex];
                greetingTrigger.style.opacity = '1';
                greetingTrigger.style.transform = 'scale(1)';
            }, 200);
        });
    }

    // 10. 3D Glassmorphic Card Tilt with Glare
    const cards = document.querySelectorAll('.project-card, .achievement-card');
    cards.forEach(card => {
        // Create glare overlay
        const glare = document.createElement('div');
        glare.className = 'card-glare';
        card.style.position = 'relative';
        card.style.overflow = 'hidden';
        card.appendChild(glare);

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const maxTilt = 8; // Max rotation in degrees
            const rotateX = ((centerY - y) / centerY) * maxTilt;
            const rotateY = ((x - centerX) / centerX) * maxTilt;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            card.style.transition = 'transform 0.05s linear'; // fast tracking transition

            // Update glare position
            glare.style.opacity = '1';
            glare.style.setProperty('--glare-x', `${(x / rect.width) * 100}%`);
            glare.style.setProperty('--glare-y', `${(y / rect.height) * 100}%`);
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
            card.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)';
            glare.style.opacity = '0';
        });
    });

    // 11. Interactive Flashlight Grid Background Tracker
    window.addEventListener('mousemove', (e) => {
        document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
        document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    });

    // 12. Easter Egg Terminal Keylogger
    const secretCode = "root";
    let typedBuffer = "";
    const terminalOverlay = document.getElementById('secret-terminal-overlay');
    const closeTop = document.getElementById('terminal-close-top');
    const closeBottom = document.getElementById('terminal-close-bottom');

    window.addEventListener('keydown', (e) => {
        // Prevent keylogger recording when user is typing in form input/textarea
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
            return;
        }

        typedBuffer += e.key.toLowerCase();
        
        // Match only the trailing characters of the buffer matching keycode length
        if (typedBuffer.length > secretCode.length) {
            typedBuffer = typedBuffer.slice(-secretCode.length);
        }

        if (typedBuffer === secretCode) {
            typedBuffer = ""; // Reset buffer
            
            // Trigger sudden screen glitch
            document.body.classList.add('glitch-active');
            
            setTimeout(() => {
                document.body.classList.remove('glitch-active');
                if (terminalOverlay) {
                    terminalOverlay.classList.add('active');
                    document.body.classList.add('terminal-active');
                }
            }, 600);
        }
    });

    // Close logic
    const closeTerminal = () => {
        if (terminalOverlay) {
            terminalOverlay.classList.remove('active');
            document.body.classList.remove('terminal-active');
        }
    };

    if (closeTop) closeTop.addEventListener('click', closeTerminal);
    if (closeBottom) closeBottom.addEventListener('click', closeTerminal);

    // 14. Levitating Data Core & Reactive Neural Nodes (Disabled to use pure CSS animations)
    /*
    const profileWrapper = document.getElementById('profile-interactive-wrapper');
    const dot1 = document.getElementById('dot-1');
    const dot2 = document.getElementById('dot-2');
    const dot3 = document.getElementById('dot-3');

    if (profileWrapper && dot1 && dot2 && dot3) {
        // Node state array
        const nodes = [
            {
                element: dot1,
                radius: 160, // Outer ring radius
                speed: 0.015,
                angle: 0,
                x: 0,
                y: 0,
                targetX: 0,
                targetY: 0
            },
            {
                element: dot2,
                radius: 135, // Middle ring radius
                speed: -0.011, // Counter-clockwise
                angle: Math.PI * 0.66,
                x: 0,
                y: 0,
                targetX: 0,
                targetY: 0
            },
            {
                element: dot3,
                radius: 110, // Inner ring radius
                speed: 0.008,
                angle: Math.PI * 1.33,
                x: 0,
                y: 0,
                targetX: 0,
                targetY: 0
            }
        ];

        // Cursor position tracking variables
        let cursorX = 0;
        let cursorY = 0;
        let isNear = false;

        profileWrapper.addEventListener('mousemove', (e) => {
            const rect = profileWrapper.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            // Cursor offset coordinates relative to center
            const dx = e.clientX - centerX;
            const dy = e.clientY - centerY;

            // Straight line distance
            const dist = Math.sqrt(dx * dx + dy * dy);

            // Pull dots if within 150px proximity
            if (dist < 150) {
                isNear = true;
                cursorX = dx;
                // De-project Y coordinate to compensate for rotateX(75deg) tilt (cos(75deg) = 0.2588)
                cursorY = dy / 0.2588;
            } else {
                isNear = false;
            }
        });

        profileWrapper.addEventListener('mouseleave', () => {
            isNear = false;
        });

        // Animation update loop
        function updateNodes() {
            nodes.forEach((node) => {
                // Increment default orbiting angle
                node.angle += node.speed;

                // Orbit target location inside the tilted space
                const orbitX = node.radius * Math.cos(node.angle);
                const orbitY = node.radius * Math.sin(node.angle);

                if (isNear) {
                    // Pull neural nodes to follow the cursor with a spring pull weighting
                    const pullWeight = 0.8;
                    node.targetX = orbitX * (1 - pullWeight) + cursorX * pullWeight;
                    node.targetY = orbitY * (1 - pullWeight) + cursorY * pullWeight;
                } else {
                    node.targetX = orbitX;
                    node.targetY = orbitY;
                }

                // Spring physics lerp interpolation
                node.x += (node.targetX - node.x) * 0.1;
                node.y += (node.targetY - node.y) * 0.1;

                // Position the dot relative to the wrapper center inside the rotateX container
                node.element.style.transform = `translate3d(${node.x}px, ${node.y}px, 0) translate(-50%, -50%)`;
            });

            requestAnimationFrame(updateNodes);
        }

        // Pre-initialize node positions
        nodes.forEach((node) => {
            node.x = node.radius * Math.cos(node.angle);
            node.y = node.radius * Math.sin(node.angle);
        });
    }
    */

    // 8. Ambient Parallax Shift Background Effect
    const auroraBg = document.querySelector('.aurora-bg');
    if (auroraBg) {
        let ticking = false;

        const updateParallax = () => {
            const currentScrollY = window.scrollY;
            // 0.25 parallax factor: moves 25% of scroll distance
            const shift = currentScrollY * 0.25; 
            const bgYValue = 50 - (shift / window.innerHeight) * 100;
            
            auroraBg.style.setProperty('--bg-y', `${bgYValue}%`);
            ticking = false;
        };

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        });
        
        // Run initial update on load
        updateParallax();
    }

});
