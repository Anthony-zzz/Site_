/**
 * Script para a página "Sobre" - Versão Romântico-Chaveco
 * Interações descontraídas mas com coração
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('Página "Sobre" carregada! ❤️');
    
    // 1. Efeito de digitação para o subtítulo
    const subtitle = document.querySelector('.about-subtitle');
    if (subtitle) {
        const originalText = subtitle.textContent;
        subtitle.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < originalText.length) {
                subtitle.textContent += originalText.charAt(i);
                i++;
                
                // Velocidade natural
                const speed = Math.random() * 30 + 20;
                setTimeout(typeWriter, speed);
            } else {
                // Adiciona um coração no final
                const heart = document.createElement('span');
                heart.innerHTML = ' ❤️';
                heart.style.opacity = '0';
                heart.style.transition = 'opacity 0.5s';
                subtitle.appendChild(heart);
                
                setTimeout(() => {
                    heart.style.opacity = '1';
                }, 300);
            }
        };
        
        setTimeout(typeWriter, 800);
    }
    
    // 2. Animação para os ícones do separador
    const iconSeparator = document.querySelector('.icon-separator');
    if (iconSeparator) {
        const icons = iconSeparator.querySelectorAll('i');
        
        // Efeito de pulsação suave
        setInterval(() => {
            icons.forEach((icon, index) => {
                setTimeout(() => {
                    icon.style.transform = 'scale(1.2)';
                    icon.style.transition = 'transform 0.3s ease';
                    
                    setTimeout(() => {
                        icon.style.transform = 'scale(1)';
                    }, 300);
                }, index * 200);
            });
        }, 4000);
    }
    
    // 3. Efeito de revelação suave para as seções
    const sections = document.querySelectorAll('.about-section, .quote-card');
    
    const revealSections = () => {
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight * 0.75) {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Configuração inicial
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Revela as seções
    window.addEventListener('load', revealSections);
    window.addEventListener('scroll', revealSections);
    
    // 4. Efeito interativo nos cards de valor
    const valueItems = document.querySelectorAll('.value-item');
    
    valueItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const icon = item.querySelector('.value-icon');
            if (icon) {
                // Animação suave
                icon.style.transform = 'scale(1.15) rotate(5deg)';
                
                // Efeito de brilho suave
                const glow = document.createElement('div');
                glow.style.position = 'absolute';
                glow.style.top = '0';
                glow.style.left = '0';
                glow.style.width = '100%';
                glow.style.height = '100%';
                glow.style.background = 'radial-gradient(circle at center, rgba(255, 213, 79, 0.08), transparent)';
                glow.style.borderRadius = '15px';
                glow.style.zIndex = '1';
                glow.style.pointerEvents = 'none';
                item.appendChild(glow);
                
                // Remove o brilho depois
                setTimeout(() => {
                    if (glow.parentNode === item) {
                        item.removeChild(glow);
                    }
                }, 400);
            }
        });
        
        item.addEventListener('mouseleave', () => {
            const icon = item.querySelector('.value-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });
    
    // 5. Botão "Tomar um sorvete" interativo
    const iceCreamButton = document.querySelector('.extra-button');
    if (iceCreamButton) {
        iceCreamButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Animação do botão
            this.style.transform = 'scale(0.95)';
            this.innerHTML = '<i class="fas fa-ice-cream"></i> Pegando...';
            
            // Cria efeito visual do sorvete
            const iceCreamEffect = document.createElement('div');
            iceCreamEffect.innerHTML = '🍦';
            iceCreamEffect.style.position = 'fixed';
            iceCreamEffect.style.top = '50%';
            iceCreamEffect.style.left = '50%';
            iceCreamEffect.style.transform = 'translate(-50%, -50%) scale(0)';
            iceCreamEffect.style.fontSize = '80px';
            iceCreamEffect.style.zIndex = '1000';
            iceCreamEffect.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
            iceCreamEffect.style.textShadow = '0 0 20px rgba(255, 213, 79, 0.7)';
            document.body.appendChild(iceCreamEffect);
            
            // Anima o sorvete
            setTimeout(() => {
                iceCreamEffect.style.transform = 'translate(-50%, -50%) scale(1)';
            }, 50);
            
            // Cria pequenos corações ao redor
            for (let i = 0; i < 8; i++) {
                setTimeout(() => {
                    const heart = document.createElement('div');
                    heart.innerHTML = '❤️';
                    heart.style.position = 'fixed';
                    heart.style.top = '50%';
                    heart.style.left = '50%';
                    heart.style.fontSize = '20px';
                    heart.style.zIndex = '1001';
                    heart.style.opacity = '0';
                    document.body.appendChild(heart);
                    
                    // Posição aleatória ao redor do sorvete
                    const angle = (i / 8) * Math.PI * 2;
                    const distance = 100;
                    const x = Math.cos(angle) * distance;
                    const y = Math.sin(angle) * distance;
                    
                    // Anima o coração
                    heart.animate([
                        { 
                            transform: 'translate(-50%, -50%) scale(0)', 
                            opacity: 0 
                        },
                        { 
                            transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(1)`, 
                            opacity: 0.7 
                        },
                        { 
                            transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(0)`, 
                            opacity: 0 
                        }
                    ], {
                        duration: 1500,
                        easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
                    });
                    
                    // Remove após animação
                    setTimeout(() => {
                        if (heart.parentNode) {
                            heart.remove();
                        }
                    }, 1500);
                }, i * 100);
            }
            
            // Remove o sorvete e volta o botão
            setTimeout(() => {
                iceCreamEffect.style.transform = 'translate(-50%, -50%) scale(0)';
                iceCreamEffect.style.opacity = '0';
                
                this.style.transform = '';
                this.innerHTML = '<i class="fas fa-ice-cream"></i> Tomar um sorvete';
                
                // Remove o elemento
                setTimeout(() => {
                    if (iceCreamEffect.parentNode) {
                        document.body.removeChild(iceCreamEffect);
                    }
                }, 500);
                
                // Mensagem no console
                console.log('%c🍦 Sorvete virtual servido! 🍦', 'color: #ffd54f; font-size: 18px; font-weight: bold;');
                console.log('Porque as melhores coisas da vida são simples, doces e compartilhadas ❤️');
            }, 2000);
        });
    }
    
    // 6. Efeito de partículas românticas
    if (!(/Mobi|Android/i.test(navigator.userAgent))) {
        const romanticParticles = ['❤️', '✨', '🌟', '🎵', '🍦', '🎬', '📖', '🎧', '🌙', '⭐'];
        
        const createParticle = () => {
            if (Math.random() > 0.6) return;
            
            const particle = document.createElement('div');
            const emoji = romanticParticles[Math.floor(Math.random() * romanticParticles.length)];
            particle.textContent = emoji;
            particle.style.position = 'fixed';
            particle.style.left = Math.random() * 100 + 'vw';
            particle.style.top = '-50px';
            particle.style.fontSize = Math.random() * 20 + 20 + 'px';
            particle.style.opacity = '0';
            particle.style.zIndex = '0';
            particle.style.pointerEvents = 'none';
            particle.style.userSelect = 'none';
            particle.style.textShadow = '0 0 15px rgba(255, 213, 79, 0.5)';
            document.body.appendChild(particle);
            
            // Animação suave
            const duration = Math.random() * 10 + 8;
            const startX = parseFloat(particle.style.left);
            const endX = startX + (Math.random() * 100 - 50); // Movimento lateral leve
            
            particle.animate([
                { 
                    transform: 'translateY(0) rotate(0deg)', 
                    opacity: 0,
                    left: startX + 'vw'
                },
                { 
                    transform: 'translateY(20px) rotate(0deg)', 
                    opacity: 0.7,
                    left: startX + 'vw'
                },
                { 
                    transform: `translateY(${window.innerHeight + 100}px) rotate(${Math.random() * 180}deg)`, 
                    opacity: 0,
                    left: endX + 'vw'
                }
            ], {
                duration: duration * 1000,
                easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
            });
            
            // Remove após animação
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.remove();
                }
            }, duration * 1000);
        };
        
        // Cria partículas periodicamente
        setInterval(createParticle, 2500);
        
        // Cria algumas no início
        setTimeout(() => {
            for (let i = 0; i < 6; i++) {
                setTimeout(createParticle, i * 400);
            }
        }, 1500);
    }
    
    // 7. Efeito especial para citações
    const quoteCard = document.querySelector('.quote-card');
    if (quoteCard) {
        quoteCard.addEventListener('mouseenter', () => {
            // Adiciona um brilho suave
            quoteCard.style.boxShadow = '0 0 40px rgba(255, 213, 79, 0.2)';
        });
        
        quoteCard.addEventListener('mouseleave', () => {
            quoteCard.style.boxShadow = '';
        });
    }
    
    // 8. Atualiza o ano no rodapé
    const currentYear = new Date().getFullYear();
    const copyrightElement = document.querySelector('.copyright');
    if (copyrightElement) {
        copyrightElement.innerHTML = copyrightElement.innerHTML.replace('2023', currentYear);
    }
    
    // 9. Mensagem no console no estilo romântico-descontraído
    console.log('%c💫 Bem-vindo ao lado que todo mundo tem 💫', 'color: #ffd54f; font-size: 20px; font-weight: bold; text-shadow: 0 0 10px rgba(255, 213, 79, 0.5);');
    console.log('%cAquele lado que gosta de coisas com significado, mesmo sendo descontraído.', 'color: #ffecb3;');
    console.log('%cPorque no final, todo mundo quer algo que toque o coração. ❤️', 'color: #26a69a; font-style: italic;');
    console.log('   🌟 ❤️ 🎵 🍦 ✨');
    
    // 10. Efeito de corações nos títulos das seções ao passar o mouse
    const sectionTitles = document.querySelectorAll('.section-title');
    
    sectionTitles.forEach(title => {
        title.addEventListener('mouseenter', () => {
            const icon = title.querySelector('i');
            if (icon) {
                icon.style.color = '#ff8a8a'; // Vermelho mais quente
                icon.style.transform = 'scale(1.2)';
                icon.style.transition = 'color 0.3s, transform 0.3s';
            }
        });
        
        title.addEventListener('mouseleave', () => {
            const icon = title.querySelector('i');
            if (icon) {
                icon.style.color = ''; // Volta para a cor original
                icon.style.transform = '';
            }
        });
    });
});