// index.js - Efeitos visuais para o Hub

document.addEventListener('DOMContentLoaded', function() {
    // Criar estrelas flutuantes adicionais
    createFloatingStars();
    
    // Adicionar efeitos de hover nos cards
    const navCards = document.querySelectorAll('.nav-card');
    
    navCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.card-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.card-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });
    
    // Efeito de digitação no título (opcional)
    typeWriterEffect();
});

// Criar estrelas flutuantes no fundo
function createFloatingStars() {
    const starContainer = document.querySelector('.starry-background');
    if (!starContainer) return;
    
    // Adicionar algumas estrelas maiores que se movem
    for (let i = 0; i < 8; i++) {
        const star = document.createElement('div');
        star.className = 'floating-star';
        star.style.cssText = `
            position: absolute;
            width: ${2 + Math.random() * 3}px;
            height: ${2 + Math.random() * 3}px;
            background: ${Math.random() > 0.5 ? '#ffd54f' : '#ffecb3'};
            border-radius: 50%;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            opacity: ${0.3 + Math.random() * 0.4};
            animation: floatStar ${15 + Math.random() * 20}s infinite linear;
            z-index: -1;
        `;
        
        // Definir keyframes para animação
        const style = document.createElement('style');
        style.textContent = `
            @keyframes floatStar {
                0% {
                    transform: translate(0, 0) rotate(0deg);
                    opacity: ${0.3 + Math.random() * 0.4};
                }
                25% {
                    transform: translate(${Math.random() * 50 - 25}px, ${Math.random() * 50 - 25}px) rotate(90deg);
                    opacity: ${0.5 + Math.random() * 0.3};
                }
                50% {
                    transform: translate(${Math.random() * 50 - 25}px, ${Math.random() * 50 - 25}px) rotate(180deg);
                    opacity: ${0.3 + Math.random() * 0.4};
                }
                75% {
                    transform: translate(${Math.random() * 50 - 25}px, ${Math.random() * 50 - 25}px) rotate(270deg);
                    opacity: ${0.5 + Math.random() * 0.3};
                }
                100% {
                    transform: translate(0, 0) rotate(360deg);
                    opacity: ${0.3 + Math.random() * 0.4};
                }
            }
        `;
        
        document.head.appendChild(style);
        starContainer.appendChild(star);
    }
}

// Efeito de digitação no título (opcional)
function typeWriterEffect() {
    const title = document.querySelector('.site-title');
    if (!title) return;
    
    const originalText = title.textContent;
    title.textContent = '';
    
    let i = 0;
    const speed = 100; // Velocidade em ms
    
    function typeWriter() {
        if (i < originalText.length) {
            title.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        }
    }
    
    // Iniciar após um breve delay
    setTimeout(typeWriter, 500);
}