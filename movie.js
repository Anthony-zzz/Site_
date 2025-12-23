/*
 * JavaScript mínimo para página de indicações
 * Apenas funcionalidades básicas
 */

document.addEventListener('DOMContentLoaded', function() {
    // Apenas uma função simples para mostrar que o filme foi visto
    marcarComoVisto();
    
    // Adiciona um efeito sutil de entrada para os filmes
    animarEntradaFilmes();
});

function marcarComoVisto() {
    // Encontra todos os itens de filme
    const filmes = document.querySelectorAll('.filme-item');
    
    // Adiciona evento de clique simples
    filmes.forEach(filme => {
        filme.addEventListener('click', function() {
            // Alterna uma classe simples para marcar como visto
            this.classList.toggle('visto');
            
            // Adiciona um check visual
            if (this.classList.contains('visto')) {
                this.style.opacity = '0.7';
                this.style.borderLeft = '3px solid #2ecc71';
                console.log('Filme marcado como visto');
            } else {
                this.style.opacity = '1';
                this.style.borderLeft = 'none';
                console.log('Filme desmarcado');
            }
        });
    });
}

function animarEntradaFilmes() {
    // Anima a entrada dos filmes um por um
    const filmes = document.querySelectorAll('.filme-item');
    
    filmes.forEach((filme, index) => {
        // Começa invisível
        filme.style.opacity = '0';
        filme.style.transform = 'translateY(20px)';
        filme.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        // Anima com delay
        setTimeout(() => {
            filme.style.opacity = '1';
            filme.style.transform = 'translateY(0)';
        }, 100 + (index * 100));
    });
}
// ===================================
// BOTÃO ELEGANTE "VOLTAR AO HUB"
// Versão simples e funcional
// ===================================

(function() {
    'use strict';
    
    // Aguardar o DOM carregar
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    function init() {
        // Não criar botão na página do hub
        if (isHubPage()) return;
        
        // Criar botão
        createBackButton();
        
        // Adicionar efeitos interativos
        addButtonEffects();
        
        console.log('✨ Botão "Voltar ao Hub" carregado com sucesso');
    }
    
    // Verificar se está na página do hub
    function isHubPage() {
        const path = window.location.pathname;
        return path.includes('index.html') || 
               path === '/' || 
               path.endsWith('/') ||
               document.title.toLowerCase().includes('hub');
    }
    
    // Criar o botão
    function createBackButton() {
        // Criar container
        const container = document.createElement('div');
        container.className = 'back-to-hub-btn';
        
        // Criar botão
        const button = document.createElement('a');
        button.href = 'index.html';
        button.className = 'hub-btn';
        button.innerHTML = `
            <i class="fas fa-arrow-left"></i>
            <span>Voltar ao Hub</span>
        `;
        button.title = 'Retornar à página principal';
        
        // Adicionar ao DOM
        container.appendChild(button);
        document.body.appendChild(container);
        
        return button;
    }
    
    // Adicionar efeitos interativos
    function addButtonEffects() {
        const button = document.querySelector('.hub-btn');
        if (!button) return;
        
        // Efeito de clique
        button.addEventListener('click', function(e) {
            // Efeito visual de clique
            this.style.transform = 'scale(0.95)';
            
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
            
            // Adicionar transição suave (opcional)
            if (supportsSmoothTransition()) {
                e.preventDefault();
                document.body.style.opacity = '0.8';
                document.body.style.transition = 'opacity 0.3s ease';
                
                setTimeout(() => {
                    window.location.href = this.href;
                }, 300);
            }
        });
        
        // Efeito de hover com estrelas
        button.addEventListener('mouseenter', function() {
            createHoverStars(this);
        });
        
        // Navegação por teclado
        document.addEventListener('keydown', function(e) {
            // Tecla ESC para voltar ao hub
            if (e.key === 'Escape' && !isInputFocused()) {
                button.click();
            }
        });
        
        // Responsividade dinâmica
        window.addEventListener('resize', updateButtonForMobile);
        updateButtonForMobile(); // Executar uma vez
    }
    
    // Criar efeito de estrelas no hover
    function createHoverStars(button) {
        // Apenas em telas maiores
        if (window.innerWidth < 768) return;
        
        const rect = button.getBoundingClientRect();
        
        for (let i = 0; i < 2; i++) {
            const star = document.createElement('div');
            star.style.cssText = `
                position: fixed;
                width: 4px;
                height: 4px;
                background: #ffd54f;
                border-radius: 50%;
                pointer-events: none;
                z-index: 999;
                top: ${rect.top + rect.height / 2 + (Math.random() * 10 - 5)}px;
                left: ${rect.left - 10}px;
                opacity: 0;
                filter: blur(0.5px);
            `;
            
            document.body.appendChild(star);
            
            // Animação
            star.animate([
                { 
                    transform: 'scale(0) translateX(0)', 
                    opacity: 0 
                },
                { 
                    transform: 'scale(1) translateX(-20px)', 
                    opacity: 0.8 
                },
                { 
                    transform: 'scale(0) translateX(-40px)', 
                    opacity: 0 
                }
            ], {
                duration: 800,
                easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
            }).onfinish = () => star.remove();
        }
    }
    
    // Atualizar botão para mobile
    function updateButtonForMobile() {
        const button = document.querySelector('.hub-btn');
        const span = button?.querySelector('span');
        
        if (!button || !span) return;
        
        if (window.innerWidth <= 480) {
            span.style.display = 'none';
            button.style.padding = '14px';
            button.style.borderRadius = '50%';
            button.style.aspectRatio = '1/1';
        } else {
            span.style.display = 'inline';
            button.style.padding = '14px 26px';
            button.style.borderRadius = '50px';
            button.style.aspectRatio = '';
        }
    }
    
    // Verificar se há foco em campos de input
    function isInputFocused() {
        const active = document.activeElement;
        return active.tagName === 'INPUT' || 
               active.tagName === 'TEXTAREA' || 
               active.tagName === 'SELECT' ||
               active.isContentEditable;
    }
    
    // Verificar suporte a transições suaves
    function supportsSmoothTransition() {
        return 'transition' in document.body.style;
    }
    
    // Adicionar estilos dinâmicos (apenas uma vez)
    if (!document.querySelector('#hub-btn-styles')) {
        const styles = document.createElement('style');
        styles.id = 'hub-btn-styles';
        styles.textContent = `
            /* Animações para o botão */
            @keyframes starTwinkle {
                0%, 100% { opacity: 0.3; transform: scale(1); }
                50% { opacity: 1; transform: scale(1.2); }
            }
            
            /* Estado de carregamento */
            .page-transition {
                animation: fadeOut 0.4s ease forwards;
            }
            
            @keyframes fadeOut {
                to { opacity: 0.7; }
            }
        `;
        document.head.appendChild(styles);
    }
})();