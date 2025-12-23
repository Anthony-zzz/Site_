/*
 * ARQUIVO JAVASCRIPT PRINCIPAL
 * Adiciona interatividade e efeitos visuais ao site
 * Versão minimalista e formal
 */

/*
 * FUNÇÃO: Document Ready
 * Executa quando o DOM está completamente carregado
 * É o ponto de partida para todos os scripts
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM carregado - Inicializando efeitos...');
    
    // Chama as funções de inicialização
    adicionarEfeitoEstrelas();      // Adiciona estrelas dinâmicas ao fundo
    adicionarInteratividadeCards(); // Adiciona interatividade aos cards
    inicializarEfeitosVisuais();    // Configura efeitos visuais gerais
});

/*
 * FUNÇÃO: adicionarEfeitoEstrelas
 * Cria estrelas dinâmicas que piscam suavemente no fundo
 * Estas são diferentes das estrelas fixas do CSS
 */
function adicionarEfeitoEstrelas() {
    const container = document.querySelector('.container');
    
    // Cria 8 estrelas adicionais para complementar o fundo
    for (let i = 0; i < 8; i++) {
        // Cria um elemento div para representar uma estrela
        const star = document.createElement('div');
        star.classList.add('star-element'); // Classe para estilização CSS
        
        // Configurações de estilo básicas
        star.style.position = 'fixed';     // Fixa na tela, não rola
        star.style.width = '2px';          // Largura pequena
        star.style.height = '2px';         // Altura pequena (forma quadrada)
        star.style.backgroundColor = 'var(--dourado-sutil)'; // Cor dourada
        star.style.borderRadius = '50%';   // Torna circular
        star.style.zIndex = '-1';          // Coloca atrás do conteúdo
        
        // Posicionamento aleatório controlado
        // Usa porcentagem para ser responsivo
        const posX = Math.random() * 90 + 5; // Entre 5% e 95%
        const posY = Math.random() * 90 + 5; // Entre 5% e 95%
        star.style.left = `${posX}%`;      // Posição horizontal
        star.style.top = `${posY}%`;       // Posição vertical
        
        // Configurações visuais
        star.style.opacity = Math.random() * 0.3 + 0.1; // Opacidade entre 0.1 e 0.4
        star.style.boxShadow = `0 0 ${Math.random() * 4 + 2}px var(--dourado-claro)`;
        // Sombra para efeito de brilho, tamanho aleatório entre 2px e 6px
        
        // Adiciona a estrela ao container
        container.appendChild(star);
        
        // Inicia a animação da estrela
        animarEstrela(star);
    }
    
    console.log('Estrelas dinâmicas adicionadas ao fundo');
}

/*
 * FUNÇÃO: animarEstrela
 * Controla a animação de piscar de uma estrela individual
 * @param {HTMLElement} star - Elemento DOM da estrela a animar
 */
function animarEstrela(star) {
    // Começa com a opacidade atual da estrela
    let opacity = parseFloat(star.style.opacity);
    
    // Direção inicial aleatória (aumentando ou diminuindo)
    let direction = Math.random() > 0.5 ? 0.01 : -0.01;
    
    /*
     * FUNÇÃO INTERNA: piscar
     * Função recursiva que controla a animação
     */
    function piscar() {
        // Atualiza a opacidade
        opacity += direction;
        
        // Inverte a direção se atingir os limites
        if (opacity <= 0.1 || opacity >= 0.4) {
            direction *= -1; // Inverte a direção
        }
        
        // Aplica a nova opacidade
        star.style.opacity = opacity;
        
        /*
         * Agenda a próxima execução
         * Usa setTimeout em vez de requestAnimationFrame para:
         * 1. Controle mais preciso do tempo entre piscadas
         * 2. Evitar animações muito rápidas
         * 3. Criar um efeito mais natural e irregular
         */
        setTimeout(piscar, Math.random() * 2000 + 1000); // Entre 1 e 3 segundos
    }
    
    // Inicia a animação
    piscar();
}

/*
 * FUNÇÃO: adicionarInteratividadeCards
 * Adiciona efeitos de hover e clique aos cards de música
 */
function adicionarInteratividadeCards() {
    // Seleciona todos os cards de música
    const cards = document.querySelectorAll('.music-card');
    
    // Aplica efeitos a cada card
    cards.forEach(card => {
        /*
         * EVENTO: mouseenter (quando o mouse entra no card)
         */
        card.addEventListener('mouseenter', function() {
            // Seleciona o ícone dentro deste card
            const icon = this.querySelector('.music-icon');
            
            // Aplica efeitos ao ícone
            icon.style.transform = 'scale(1.1)';       // Aumenta 10%
            icon.style.transition = 'transform 0.3s ease'; // Transição suave
            
            // Aplica sombra mais intensa ao card
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.25)';
        });
        
        /*
         * EVENTO: mouseleave (quando o mouse sai do card)
         */
        card.addEventListener('mouseleave', function() {
            // Seleciona o ícone
            const icon = this.querySelector('.music-icon');
            
            // Retorna o ícone ao tamanho normal
            icon.style.transform = 'scale(1)';
            
            // Retorna a sombra ao estado normal
            this.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.2)';
        });
        
        /*
         * EVENTO: click no link dentro do card
         * Nota: O link já abre em nova aba por causa do target="_blank"
         * Aqui apenas adicionamos um efeito visual de confirmação
         */
        const link = card.querySelector('.music-link');
        link.addEventListener('click', function(e) {
            // Efeito visual de pressionar o botão
            this.style.transform = 'scale(0.95)';
            
            // Retorna ao tamanho normal após 150ms
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            // Log para debug (pode ser substituído por analytics)
            console.log(`Navegando para: ${this.getAttribute('href')}`);
        });
    });
    
    console.log('Interatividade adicionada aos cards');
}

/*
 * FUNÇÃO: inicializarEfeitosVisuais
 * Configura efeitos visuais gerais da página
 */
function inicializarEfeitosVisuais() {
    /*
     * EFEITO 1: Gradiente de fundo adicional
     * Cria uma camada de gradiente sobre o fundo para profundidade
     */
    const body = document.querySelector('body');
    const gradientOverlay = document.createElement('div');
    
    // Configurações do gradiente
    gradientOverlay.style.position = 'fixed';
    gradientOverlay.style.top = '0';
    gradientOverlay.style.left = '0';
    gradientOverlay.style.width = '100%';
    gradientOverlay.style.height = '100%';
    gradientOverlay.style.background = 'radial-gradient(ellipse at top, rgba(26, 58, 95, 0.4) 0%, rgba(10, 25, 49, 0.8) 70%)';
    // Gradiente radial que vai de mais claro no topo para mais escuro
    gradientOverlay.style.zIndex = '-2'; // Atrás de tudo, mas à frente do body::before
    gradientOverlay.style.pointerEvents = 'none'; // Não interfere com cliques
    
    // Adiciona ao body
    body.appendChild(gradientOverlay);
    
    /*
     * EFEITO 2: Transição de entrada
     * Faz o conteúdo aparecer suavemente ao carregar
     */
    const container = document.querySelector('.container');
    container.style.opacity = '0'; // Começa invisível
    container.style.transition = 'opacity 0.5s ease'; // Transição de 0.5s
    
    // Após 100ms, torna visível (permite que o DOM seja processado primeiro)
    setTimeout(() => {
        container.style.opacity = '1';
    }, 100);
    
    /*
     * EFEITO 3: Header responsivo ao scroll
     * Reduz o tamanho do header quando o usuário rola a página
     */
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        const scrollPosition = window.scrollY; // Quantos pixels foram rolados
        
        // Se rolou mais que 50px, reduz o header
        if (scrollPosition > 50) {
            header.style.paddingTop = '30px';
            header.style.paddingBottom = '20px';
            header.style.transition = 'padding 0.3s ease'; // Transição suave
        } else {
            // Se está no topo, tamanho normal
            header.style.paddingTop = '60px';
            header.style.paddingBottom = '30px';
        }
    });
    
    console.log('Efeitos visuais inicializados');
}

/*
 * ADICIONA ESTILOS CSS DINÂMICOS
 * Cria e adiciona uma tag style ao head com animações customizadas
 */
const style = document.createElement('style');
style.textContent = `
    /* 
     * Classe para as estrelas dinâmicas criadas pelo JavaScript
     */
    .star-element {
        /*
         * Animação: subtle-pulse
         * Duração: 4 segundos
         * Repetição: infinita
         * Direção: alternada (vai e volta)
         */
        animation: subtle-pulse 4s infinite alternate;
    }
    
    /* 
     * DEFINIÇÃO DA ANIMAÇÃO
     * Controla como as estrelas "pulsam" suavemente
     */
    @keyframes subtle-pulse {
        0% {
            opacity: 0.1;    /* Quase transparente */
            transform: scale(1); /* Tamanho normal */
        }
        100% {
            opacity: 0.4;    /* Mais visível */
            transform: scale(1.2); /* Um pouco maior */
        }
    }
`;

// Adiciona os estilos ao head do documento
document.head.appendChild(style);
console.log('Estilos dinâmicos adicionados');

/*
 * FUNÇÕES ADICIONAIS QUE PODEM SER IMPLEMENTADAS FUTURAMENTE:
 * 
 * 1. toggleTheme() - Alternar entre modo claro/escuro
 * 2. loadMoreGenres() - Carregar mais gêneros musicais via AJAX
 * 3. playAudioPreview() - Tocar prévia de áudio ao passar o mouse
 * 4. saveUserPreference() - Salvar preferência do usuário no localStorage
 * 5. addGenre() - Permitir ao usuário adicionar novo gênero
 * 6. shareOnSocialMedia() - Compartilhar o site em redes sociais
 */

/*
 * EXEMPLO DE FUNÇÃO PARA FUTURO DESENVOLVIMENTO:
 * 
 * function toggleTheme() {
 *     const body = document.body;
 *     const currentTheme = body.getAttribute('data-theme');
 *     
 *     if (currentTheme === 'dark') {
 *         body.setAttribute('data-theme', 'light');
 *         localStorage.setItem('theme', 'light');
 *     } else {
 *         body.setAttribute('data-theme', 'dark');
 *         localStorage.setItem('theme', 'dark');
 *     }
 * }
 */

console.log('Aplicação inicializada com sucesso!');
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