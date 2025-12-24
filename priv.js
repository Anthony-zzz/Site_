/**
 * PRIVACIDADE.JS - Sem áudio, todas as animações mantidas
 * Script robusto para a página de privacidade
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('🔒 Página de Privacidade carregada - O segredo está seguro');
    
    // 1. ELEMENTOS PRINCIPAIS
    const elements = {
        image: document.querySelector('.privacy-image'),
        imageContainer: document.getElementById('imageContainer'),
        mainCaption: document.getElementById('mainCaption'),
        privacyLevel: document.getElementById('privacyLevel'),
        viewCount: document.getElementById('viewCount'),
        detailsModal: document.getElementById('detailsModal'),
        closeModal: document.getElementById('closeModal'),
        viewDetailsBtn: document.getElementById('viewDetails'),
        toggleEffectsBtn: document.getElementById('toggleEffects'),
        protectImageBtn: document.getElementById('protectImage'),
        revealCaptionBtn: document.getElementById('revealCaption'),
        animateCaptionBtn: document.getElementById('animateCaption'),
        shareCaptionBtn: document.getElementById('shareCaption'),
        acceptStatementBtn: document.getElementById('acceptStatement'),
        resolutionInfo: document.getElementById('resolutionInfo'),
        sizeInfo: document.getElementById('sizeInfo'),
        formatInfo: document.getElementById('formatInfo')
    };
    
    // 2. ESTADO DA APLICAÇÃO
    let state = {
        imageLoaded: false,
        captionRevealed: false,
        effectsActive: false,
        protectedMode: false,
        viewCount: localStorage.getItem('privacyViews') ? parseInt(localStorage.getItem('privacyViews')) : 0,
        accepted: localStorage.getItem('statementAccepted') === 'true',
        currentEffect: null
    };
    
    // 3. INICIALIZAÇÃO
    function init() {
        // Incrementa contador de visualizações
        incrementViewCount();
        
        // Carrega a imagem
        loadImage();
        
        // Configura event listeners
        setupEventListeners();
        
        // Efeitos iniciais
        startInitialEffects();
        
        // Mostra mensagem no console
        showPrivacyMessage();
    }
    
    // 4. CARREGAMENTO DA IMAGEM
    function loadImage() {
        if (!elements.image) return;
        
        // Configura listener para quando a imagem carregar
        elements.image.onload = function() {
            state.imageLoaded = true;
            revealImage();
            analyzeImage();
        };
        
        // Fallback para caso a imagem já esteja carregada
        if (elements.image.complete) {
            state.imageLoaded = true;
            revealImage();
            analyzeImage();
        }
        
        // Timeout de segurança
        setTimeout(() => {
            if (!state.imageLoaded) {
                console.warn('Imagem demorando para carregar...');
                revealImage(); // Revela mesmo assim
            }
        }, 3000);
    }
    
    function revealImage() {
        if (!elements.image) return;
        
        // Remove loader
        const loader = document.querySelector('.image-loader');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }
        
        // Animação de entrada da imagem
        elements.image.style.opacity = '1';
        elements.image.style.transition = 'opacity 1.5s ease, transform 1s ease';
        
        // Efeito de zoom sutil
        setTimeout(() => {
            elements.image.style.transform = 'scale(1.02)';
            
            setTimeout(() => {
                elements.image.style.transform = 'scale(1)';
            }, 300);
        }, 500);
        
        // Ativa elementos flutuantes
        activateFloatingElements();
    }
    
    function analyzeImage() {
        if (!elements.image) return;
        
        // Obtém informações da imagem
        const width = elements.image.naturalWidth || 1200;
        const height = elements.image.naturalHeight || 800;
        
        // Atualiza informações no modal
        if (elements.resolutionInfo) {
            elements.resolutionInfo.textContent = `${width} × ${height}`;
        }
        
        if (elements.formatInfo) {
            const src = elements.image.src.toLowerCase();
            if (src.includes('.jpg') || src.includes('.jpeg')) {
                elements.formatInfo.textContent = 'JPEG';
            } else if (src.includes('.png')) {
                elements.formatInfo.textContent = 'PNG';
            } else if (src.includes('.webp')) {
                elements.formatInfo.textContent = 'WebP';
            } else {
                elements.formatInfo.textContent = 'Imagem';
            }
        }
        
        // Simula tamanho (apenas para demonstração)
        if (elements.sizeInfo) {
            const approxSize = Math.round((width * height * 3) / (1024 * 1024) * 10) / 10;
            elements.sizeInfo.textContent = `${approxSize} MB (aprox)`;
        }
    }
    
    // 5. CONTADOR DE VISUALIZAÇÕES
    function incrementViewCount() {
        state.viewCount++;
        localStorage.setItem('privacyViews', state.viewCount);
        
        if (elements.viewCount) {
            animateCounter(elements.viewCount, state.viewCount);
        }
    }
    
    function animateCounter(element, target) {
        const current = parseInt(element.textContent);
        if (current === target) return;
        
        let currentValue = current;
        const increment = target > current ? 1 : -1;
        
        const interval = setInterval(() => {
            currentValue += increment;
            element.textContent = currentValue;
            
            // Efeito visual (sem som)
            element.style.transform = 'scale(1.1)';
            setTimeout(() => {
                element.style.transform = 'scale(1)';
            }, 100);
            
            if (currentValue === target) {
                clearInterval(interval);
            }
        }, 50);
    }
    
    // 6. ELEMENTOS FLUTUANTES
    function activateFloatingElements() {
        const floatingElements = document.querySelectorAll('.floating-element');
        
        floatingElements.forEach((el, index) => {
            // Delay diferente para cada elemento
            setTimeout(() => {
                el.style.opacity = '0.3';
            }, index * 500);
        });
    }
    
    // 7. CONTROLES DA IMAGEM
    function setupImageControls() {
        // Detalhes da imagem
        elements.viewDetailsBtn.addEventListener('click', () => {
            showImageDetails();
        });
        
        // Efeitos
        elements.toggleEffectsBtn.addEventListener('click', () => {
            toggleImageEffects();
        });
        
        // Proteger imagem
        elements.protectImageBtn.addEventListener('click', () => {
            protectImage();
        });
    }
    
    function showImageDetails() {
        elements.detailsModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function toggleImageEffects() {
        state.effectsActive = !state.effectsActive;
        
        if (state.effectsActive) {
            // Ativa efeitos
            activateAdvancedEffects();
            elements.toggleEffectsBtn.innerHTML = '<i class="fas fa-magic"></i><span class="btn-text">Desativar</span>';
            
            // Feedback visual
            elements.toggleEffectsBtn.style.background = 'rgba(255, 213, 79, 0.2)';
            elements.toggleEffectsBtn.style.borderColor = 'var(--gold-star)';
            elements.toggleEffectsBtn.style.color = 'var(--gold-star)';
        } else {
            // Desativa efeitos
            deactivateEffects();
            elements.toggleEffectsBtn.innerHTML = '<i class="fas fa-magic"></i><span class="btn-text">Efeitos</span>';
            
            // Volta ao normal
            elements.toggleEffectsBtn.style.background = '';
            elements.toggleEffectsBtn.style.borderColor = '';
            elements.toggleEffectsBtn.style.color = '';
        }
    }
    
    function protectImage() {
        state.protectedMode = !state.protectedMode;
        
        if (state.protectedMode) {
            // Ativa modo protegido
            activateProtectionMode();
            elements.protectImageBtn.innerHTML = '<i class="fas fa-lock-open"></i><span class="btn-text">Desproteger</span>';
            
            // Atualiza nível de privacidade
            if (elements.privacyLevel) {
                elements.privacyLevel.textContent = 'Máximo';
                animatePrivacyLevel();
            }
        } else {
            // Desativa modo protegido
            deactivateProtectionMode();
            elements.protectImageBtn.innerHTML = '<i class="fas fa-lock"></i><span class="btn-text">Proteger</span>';
            
            // Atualiza nível de privacidade
            if (elements.privacyLevel) {
                elements.privacyLevel.textContent = 'Alto';
            }
        }
    }
    
    // 8. EFEITOS AVANÇADOS
    function activateAdvancedEffects() {
        // Adiciona classes de efeito
        if (elements.imageContainer) {
            elements.imageContainer.classList.add('advanced-effects');
            
            // Cria partículas adicionais
            createEffectParticles();
            
            // Adiciona brilho extra
            const extraGlow = document.createElement('div');
            extraGlow.className = 'extra-glow';
            extraGlow.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: radial-gradient(circle at center, 
                    rgba(255, 213, 79, 0.1) 0%,
                    transparent 70%);
                z-index: 4;
                pointer-events: none;
                animation: pulseGlow 2s infinite alternate;
            `;
            
            elements.imageContainer.appendChild(extraGlow);
            
            // Adiciona CSS para animação
            const style = document.createElement('style');
            style.textContent = `
                @keyframes pulseGlow {
                    0% { opacity: 0.3; }
                    100% { opacity: 0.7; }
                }
                
                .advanced-effects .privacy-image {
                    filter: brightness(1.1) contrast(1.1);
                    transition: filter 0.5s ease;
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    function deactivateEffects() {
        // Remove classes de efeito
        if (elements.imageContainer) {
            elements.imageContainer.classList.remove('advanced-effects');
            
            // Remove brilho extra
            const extraGlow = elements.imageContainer.querySelector('.extra-glow');
            if (extraGlow) {
                extraGlow.remove();
            }
            
            // Remove partículas de efeito
            const effectParticles = document.querySelectorAll('.effect-particle');
            effectParticles.forEach(particle => particle.remove());
            
            // Restaura imagem ao normal
            if (elements.image) {
                elements.image.style.filter = '';
            }
        }
    }
    
    function createEffectParticles() {
        const colors = ['#ffd54f', '#26a69a', '#ff8a8a'];
        
        for (let i = 0; i < 15; i++) {
            const particle = document.createElement('div');
            particle.className = 'effect-particle';
            
            const size = Math.random() * 8 + 4;
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            particle.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: ${color};
                border-radius: 50%;
                top: ${Math.random() * 100}%;
                left: ${Math.random() * 100}%;
                opacity: 0;
                pointer-events: none;
                z-index: 5;
                filter: blur(1px);
            `;
            
            elements.imageContainer.appendChild(particle);
            
            // Animação
            const duration = Math.random() * 3 + 2;
            const delay = Math.random() * 2;
            
            particle.animate([
                { opacity: 0, transform: 'scale(0)' },
                { opacity: 0.7, transform: 'scale(1)' },
                { opacity: 0, transform: 'scale(0)' }
            ], {
                duration: duration * 1000,
                delay: delay * 1000,
                iterations: Infinity,
                easing: 'ease-in-out'
            });
        }
    }
    
    // 9. MODO DE PROTEÇÃO
    function activateProtectionMode() {
        // Adiciona sobreposição de proteção
        const protectionOverlay = document.createElement('div');
        protectionOverlay.className = 'protection-overlay';
        protectionOverlay.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: repeating-linear-gradient(
                45deg,
                rgba(10, 25, 49, 0.7),
                rgba(10, 25, 49, 0.7) 10px,
                rgba(38, 166, 154, 0.3) 10px,
                rgba(38, 166, 154, 0.3) 20px
            );
            z-index: 6;
            pointer-events: none;
            animation: protectionMove 20s infinite linear;
        `;
        
        elements.imageContainer.appendChild(protectionOverlay);
        
        // Adiciona ícones de proteção
        const protectionIcons = ['fa-shield-alt', 'fa-lock', 'fa-user-secret'];
        
        protectionIcons.forEach((icon, index) => {
            const protectionIcon = document.createElement('div');
            protectionIcon.innerHTML = `<i class="fas ${icon}"></i>`;
            protectionIcon.style.cssText = `
                position: absolute;
                font-size: 2rem;
                color: var(--swirl-teal);
                opacity: 0.5;
                z-index: 7;
                pointer-events: none;
            `;
            
            // Posições diferentes
            const positions = [
                { top: '20%', left: '20%' },
                { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' },
                { top: '80%', left: '80%' }
            ];
            
            Object.assign(protectionIcon.style, positions[index]);
            
            elements.imageContainer.appendChild(protectionIcon);
            
            // Animação de pulsação
            protectionIcon.animate([
                { opacity: 0.3, transform: positions[index].transform ? 'translate(-50%, -50%) scale(1)' : 'scale(1)' },
                { opacity: 0.7, transform: positions[index].transform ? 'translate(-50%, -50%) scale(1.2)' : 'scale(1.2)' },
                { opacity: 0.3, transform: positions[index].transform ? 'translate(-50%, -50%) scale(1)' : 'scale(1)' }
            ], {
                duration: 2000,
                delay: index * 500,
                iterations: Infinity,
                easing: 'ease-in-out'
            });
        });
        
        // Adiciona CSS para animação
        const protectionStyle = document.createElement('style');
        protectionStyle.textContent = `
            @keyframes protectionMove {
                0% { background-position: 0 0; }
                100% { background-position: 40px 40px; }
            }
        `;
        document.head.appendChild(protectionStyle);
    }
    
    function deactivateProtectionMode() {
        // Remove sobreposição de proteção
        const protectionOverlay = elements.imageContainer.querySelector('.protection-overlay');
        if (protectionOverlay) {
            protectionOverlay.remove();
        }
        
        // Remove ícones de proteção
        const protectionIcons = elements.imageContainer.querySelectorAll('div:has(.fa-shield-alt), div:has(.fa-lock), div:has(.fa-user-secret)');
        protectionIcons.forEach(icon => {
            if (icon.classList.contains('protection-overlay')) return;
            icon.remove();
        });
    }
    
    // 10. CONTROLES DA LEGENDA
    function setupCaptionControls() {
        // Revelar legenda
        elements.revealCaptionBtn.addEventListener('click', () => {
            revealCaption();
        });
        
        // Animar legenda
        elements.animateCaptionBtn.addEventListener('click', () => {
            animateCaption();
        });
        
        // Compartilhar legenda
        elements.shareCaptionBtn.addEventListener('click', () => {
            shareCaption();
        });
        
        // Aceitar declaração
        elements.acceptStatementBtn.addEventListener('click', () => {
            acceptStatement();
        });
    }
    
    function revealCaption() {
        if (state.captionRevealed) return;
        
        state.captionRevealed = true;
        elements.mainCaption.classList.add('revealed');
        
        // Efeito de digitação
        typeCaption();
        
        // Atualiza botão
        elements.revealCaptionBtn.innerHTML = '<i class="fas fa-eye"></i> Revelado';
        elements.revealCaptionBtn.style.background = 'rgba(130, 201, 30, 0.2)';
        elements.revealCaptionBtn.style.borderColor = '#82c91e';
        elements.revealCaptionBtn.style.color = '#82c91e';
    }
    
    function typeCaption() {
        const caption = elements.mainCaption;
        const originalText = caption.textContent;
        caption.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < originalText.length) {
                caption.textContent += originalText.charAt(i);
                i++;
                
                // Velocidade variável (sem som)
                const speed = Math.random() * 40 + 30;
                setTimeout(typeWriter, speed);
            } else {
                // Efeito de conclusão
                caption.style.animation = 'captionComplete 1s ease';
                setTimeout(() => {
                    caption.style.animation = '';
                }, 1000);
                
                // Adiciona CSS para animação
                const style = document.createElement('style');
                style.textContent = `
                    @keyframes captionComplete {
                        0%, 100% { 
                            text-shadow: 0 0 10px rgba(255, 213, 79, 0.3); 
                        }
                        50% { 
                            text-shadow: 0 0 20px rgba(255, 213, 79, 0.6); 
                        }
                    }
                `;
                document.head.appendChild(style);
            }
        };
        
        setTimeout(typeWriter, 300);
    }
    
    function animateCaption() {
        const caption = elements.mainCaption;
        
        // Animação de "pulo"
        caption.style.animation = 'captionJump 0.8s ease';
        
        // Efeito de partículas
        createCaptionParticles();
        
        setTimeout(() => {
            caption.style.animation = '';
        }, 800);
        
        // Adiciona CSS para animação
        const style = document.createElement('style');
        style.textContent = `
            @keyframes captionJump {
                0%, 100% { transform: translateY(0); }
                25% { transform: translateY(-10px); }
                50% { transform: translateY(5px); }
                75% { transform: translateY(-5px); }
            }
        `;
        document.head.appendChild(style);
    }
    
    function createCaptionParticles() {
        const particlesCount = 20;
        
        for (let i = 0; i < particlesCount; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: fixed;
                width: 6px;
                height: 6px;
                background: var(--gold-star);
                border-radius: 50%;
                top: 50%;
                left: 50%;
                opacity: 0;
                pointer-events: none;
                z-index: 1000;
            `;
            
            document.body.appendChild(particle);
            
            // Animação radial
            const angle = (i / particlesCount) * Math.PI * 2;
            const distance = Math.random() * 100 + 50;
            const targetX = Math.cos(angle) * distance;
            const targetY = Math.sin(angle) * distance;
            
            particle.animate([
                { 
                    opacity: 1,
                    transform: 'translate(-50%, -50%) scale(1)' 
                },
                { 
                    opacity: 0,
                    transform: `translate(calc(-50% + ${targetX}px), calc(-50% + ${targetY}px)) scale(0)` 
                }
            ], {
                duration: 1000,
                easing: 'ease-out'
            }).onfinish = () => particle.remove();
        }
    }
    
    function shareCaption() {
        const text = "eu jogo melhor que você, aceite heehehe";
        const url = window.location.href;
        
        if (navigator.share) {
            navigator.share({
                title: 'Declaração de Superioridade',
                text: text,
                url: url
            });
        } else {
            // Fallback: copia para área de transferência
            navigator.clipboard.writeText(`${text} - ${url}`).then(() => {
                // Feedback visual
                elements.shareCaptionBtn.innerHTML = '<i class="fas fa-check"></i> Copiado!';
                
                setTimeout(() => {
                    elements.shareCaptionBtn.innerHTML = '<i class="fas fa-share-alt"></i> Compartilhar';
                }, 1500);
            });
        }
    }
    
    function acceptStatement() {
        state.accepted = true;
        localStorage.setItem('statementAccepted', 'true');
        
        // Animação do botão
        elements.acceptStatementBtn.innerHTML = '<i class="fas fa-check-circle"></i> Verdade Aceita';
        elements.acceptStatementBtn.style.animation = 'acceptAnimation 1s ease';
        
        // Efeitos especiais
        createAcceptanceEffects();
        
        setTimeout(() => {
            elements.acceptStatementBtn.style.animation = '';
        }, 1000);
    }
    
    function createAcceptanceEffects() {
        // Cria anel de aceitação
        const acceptanceRing = document.createElement('div');
        acceptanceRing.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 100px;
            height: 100px;
            border: 3px solid var(--swirl-teal);
            border-radius: 50%;
            z-index: 999;
            pointer-events: none;
            opacity: 0.7;
        `;
        
        document.body.appendChild(acceptanceRing);
        
        acceptanceRing.animate([
            { 
                transform: 'translate(-50%, -50%) scale(1)', 
                opacity: 0.7,
                borderWidth: '3px'
            },
            { 
                transform: 'translate(-50%, -50%) scale(3)', 
                opacity: 0,
                borderWidth: '1px'
            }
        ], {
            duration: 1500,
            easing: 'ease-out'
        }).onfinish = () => acceptanceRing.remove();
        
        // Texto flutuante
        const floatText = document.createElement('div');
        floatText.textContent = 'ACEITO';
        floatText.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-family: 'Playfair Display', serif;
            font-size: 2rem;
            font-weight: 700;
            color: var(--swirl-teal);
            z-index: 1000;
            pointer-events: none;
            opacity: 0;
        `;
        
        document.body.appendChild(floatText);
        
        floatText.animate([
            { opacity: 0, transform: 'translate(-50%, -50%) scale(0.5)' },
            { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
            { opacity: 0, transform: 'translate(-50%, -50%) scale(1.5)' }
        ], {
            duration: 2000,
            easing: 'ease-out'
        }).onfinish = () => floatText.remove();
    }
    
    // 11. ANIMAÇÃO DO NÍVEL DE PRIVACIDADE
    function animatePrivacyLevel() {
        if (!elements.privacyLevel) return;
        
        elements.privacyLevel.style.animation = 'privacyLevelPulse 1s ease';
        
        setTimeout(() => {
            elements.privacyLevel.style.animation = '';
        }, 1000);
        
        // Adiciona CSS se não existir
        if (!document.querySelector('#privacy-level-styles')) {
            const style = document.createElement('style');
            style.id = 'privacy-level-styles';
            style.textContent = `
                @keyframes privacyLevelPulse {
                    0%, 100% { 
                        color: var(--text-primary); 
                        transform: scale(1);
                    }
                    50% { 
                        color: var(--swirl-teal); 
                        transform: scale(1.2);
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    // 12. EFEITOS INICIAIS
    function startInitialEffects() {
        // Anima os anéis do ícone
        setTimeout(() => {
            const rings = document.querySelectorAll('.icon-ring');
            rings.forEach(ring => {
                ring.style.opacity = '0.3';
            });
        }, 500);
        
        // Auto-revela a legenda após 2 segundos
        setTimeout(() => {
            if (!state.captionRevealed) {
                revealCaption();
            }
        }, 2000);
    }
    
    // 13. MODAL
    function setupModal() {
        elements.closeModal.addEventListener('click', () => {
            closeModal();
        });
        
        // Fecha modal ao clicar fora
        elements.detailsModal.addEventListener('click', (e) => {
            if (e.target === elements.detailsModal) {
                closeModal();
            }
        });
        
        // Fecha com ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && elements.detailsModal.classList.contains('active')) {
                closeModal();
            }
        });
    }
    
    function closeModal() {
        elements.detailsModal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // 14. MENSAGEM NO CONSOLE
    function showPrivacyMessage() {
        console.log('%c🔐 POLÍTICA DE PRIVACIDADE ULTRA-SECRETA 🔐', 
            'color: #26a69a; font-size: 18px; font-weight: bold; text-shadow: 0 0 10px rgba(38, 166, 154, 0.5);');
        console.log('%c"eu jogo melhor que você, aceite heehehe"', 
            'color: #ffd54f; font-size: 16px; font-style: italic;');
        console.log('%c→ Esta página é tão privada que nem nós sabemos o que tem aqui', 
            'color: #ffecb3;');
        console.log('%c→ Mas a legenda é verdadeira, aceite!', 
            'color: #ffecb3;');
        console.log('   🎮 🏆 😎 🎮 🏆');
    }
    
    // 15. CONFIGURAÇÃO DE EVENT LISTENERS
    function setupEventListeners() {
        setupImageControls();
        setupCaptionControls();
        setupModal();
        
        // Interação com a imagem
        if (elements.image) {
            elements.image.addEventListener('click', () => {
                // Efeito de clique na imagem
                createImageClickEffect();
            });
        }
    }
    
    function createImageClickEffect() {
        // Cria efeito de ondulação
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 10px;
            height: 10px;
            border: 2px solid rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            z-index: 10;
            pointer-events: none;
        `;
        
        elements.imageContainer.appendChild(ripple);
        
        ripple.animate([
            { 
                width: '10px',
                height: '10px',
                opacity: 1,
                borderWidth: '2px'
            },
            { 
                width: '300px',
                height: '300px',
                opacity: 0,
                borderWidth: '0px'
            }
        ], {
            duration: 1000,
            easing: 'ease-out'
        }).onfinish = () => ripple.remove();
    }
    
    // 16. INICIALIZAÇÃO FINAL
    init();
});