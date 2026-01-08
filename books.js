// Dados para o carrossel (com descrição completa)
const carouselItems = [
    {
        id: 1,
        title: "Assim Falou Zaratustra",
        author: "Friedrich Nietzsche",
        description: "Uma das obras mais importantes de Nietzsche, que apresenta sua filosofia através da figura de Zaratustra. O livro explora temas como a morte de Deus, o super-homem, a vontade de poder e o eterno retorno. Uma obra filosófica profunda que desafia os valores tradicionais e propõe uma nova maneira de viver.",
        image: "https://cdn.awsli.com.br/600x1000/2515/2515191/produto/237547442b8dd4f9f75.jpg"
    },
    {
        id: 2,
        title: "Your Name",
        author: "Makoto Shinkai",
        description: "Baseado no famoso anime, este livro conta a história de Mitsuha e Taki, dois adolescentes que misteriosamente começam a trocar de corpo. Uma narrativa emocionante sobre amor, destino e conexões que transcendem o tempo e espaço, explorando temas de identidade e memória de forma poética e tocante.",
        image: "https://m.media-amazon.com/images/S/pv-target-images/03a7f194edd0c32d7e72b0f87e2f96319246b63650aaf091fce661cd654e24ae.jpg"
    },
    {
        id: 3,
        title: "O Príncipe",
        author: "Nicolau Maquiavel",
        description: "Clássico da filosofia política escrito no século XVI, oferecendo conselhos práticos sobre como governar e manter o poder. Maquiavel discute temas como virtude, fortuna, moralidade política e a relação entre governantes e súditos, sendo uma obra fundamental para entender a ciência política moderna.",
        image: "https://m.media-amazon.com/images/I/71pZvw3oOdS._UF1000,1000_QL80_.jpg"
    }
];

// Dados para os cards (sem category, price, stars)
const bookCards = [
    {
        id: 1,
        title: "Verity",
        author: "Colleen Hoover",
        description: "Um romance psicológico intenso sobre uma escritora que descobre os segredos obscuros de um autor famoso.",
        image: "https://m.media-amazon.com/images/I/51-W6g-qd7L._SL500_.jpg"
    },
    {
        id: 2,
        title: "Six of Crows",
        author: "Leigh Bardugo",
        description: "Uma aventura de fantasia sombria com um grupo de criminosos tentando um assalto impossível.",
        image: "https://m.media-amazon.com/images/I/91tK5sU9oOL.jpg"
    },
    {
        id: 3,
        title: "Dom Casmurro",
        author: "Machado de Assis",
        description: "Clássico da literatura brasileira que explora ciúme, traição e a natureza da verdade.",
        image: "https://m.media-amazon.com/images/I/61x1ZHomWUL._AC_UF1000,1000_QL80_.jpg"
    },
    {
        id: 4,
        title: "Senhora",
        author: "José de Alencar",
        description: "Romance brasileiro que aborda questões sociais, casamento por interesse e emancipação feminina.",
        image: "https://m.media-amazon.com/images/I/711tJRe6LML.jpg"
    },
    {
        id: 5,
        title: "A Sutil Arte de Ligar o F*da-se",
        author: "Mark Manson",
        description: "Um livro sobre como lidar com as adversidades da vida de forma mais saudável e realista.",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_yiQddZSwNcY7K0aWVAIyoSKRneKJSeZxrg&s"
    },
    {
        id: 6,
        title: "Percy Jackson e o Ladrão de Raios",
        author: "Rick Riordan",
        description: "Primeiro livro da série que mistura mitologia grega com aventuras contemporâneas.",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0ikkp7NiRDtPzUd8ArvowH-nPtAQLMqfcjg&s"
    },
    {
        id: 7,
        title: "A Arte da guerra",
        author: "Sun Tzu",
        description: "Os ensinamentos de A Arte da Guerra de Sun Tzu focam na estratégia, autoconhecimento e flexibilidade para vencer conflitos, destacando que vencer sem lutar é a suprema habilidade, através do planejamento detalhado, conhecimento do inimigo e de si mesmo, e a importância do timing e da dissimulação, aplicando-se a guerras, negócios e vida pessoal.",
        image: "https://m.media-amazon.com/images/I/71FMCr5Z9rL.jpg"
    }
];

// Variáveis globais
let currentSlide = 0;
let carouselInterval;

// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    // Criar estrelas de fundo
    createStars();
    
    // Inicializar carrossel
    initCarousel();
    
    // Inicializar cards
    initCards();
    
    // Configurar navegação suave
    setupSmoothScroll();
    
    // Configurar eventos do carrossel
    setupCarouselEvents();
});

// Criar estrelas animadas
function createStars() {
    const starsContainer = document.getElementById('stars-container');
    if (!starsContainer) return;
    
    const starCount = 150;
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        
        // Tamanho aleatório
        const size = Math.random() * 3 + 1;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        
        // Posição aleatória
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        
        // Opacidade aleatória
        star.style.opacity = Math.random() * 0.7 + 0.3;
        
        // Duração da animação aleatória
        const duration = Math.random() * 5 + 3;
        star.style.animationDuration = `${duration}s`;
        
        // Atraso aleatório
        const delay = Math.random() * 5;
        star.style.animationDelay = `${delay}s`;
        
        starsContainer.appendChild(star);
    }
}

// Inicializar carrossel
function initCarousel() {
    const carouselInner = document.querySelector('.carousel-inner');
    const indicatorsContainer = document.querySelector('.carousel-indicators');
    
    if (!carouselInner || !indicatorsContainer) return;
    
    // Limpar conteúdo existente
    carouselInner.innerHTML = '';
    indicatorsContainer.innerHTML = '';
    
    // Criar itens do carrossel
    carouselItems.forEach((item, index) => {
        // Criar elemento do item
        const itemElement = document.createElement('div');
        itemElement.classList.add('carousel-item');
        if (index === 0) itemElement.classList.add('active');
        
        // Definir conteúdo do item (com descrição completa)
        itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.title}">
            <h3>${item.title}</h3>
            <p class="author">${item.author}</p>
            <p class="description">${item.description}</p>
        `;
        
        carouselInner.appendChild(itemElement);
        
        // Criar indicador
        const indicator = document.createElement('div');
        indicator.classList.add('indicator');
        if (index === 0) indicator.classList.add('active');
        indicator.dataset.index = index;
        indicator.addEventListener('click', () => goToSlide(index));
        
        indicatorsContainer.appendChild(indicator);
    });
    
    // Inicializar o slide atual
    currentSlide = 0;
}

// Inicializar cards
function initCards() {
    const cardsContainer = document.querySelector('.cards-container');
    if (!cardsContainer) return;
    
    // Limpar conteúdo existente
    cardsContainer.innerHTML = '';
    
    // Criar cards
    bookCards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        
        cardElement.innerHTML = `
            <div class="card-img">
                <img src="${card.image}" alt="${card.title}">
            </div>
            <div class="card-content">
                <h3>${card.title}</h3>
                <p class="card-author">${card.author}</p>
                <p class="card-description">${card.description}</p>
            </div>
        `;
        
        // Adicionar animação de entrada
        cardElement.style.animationDelay = `${Math.random() * 0.5}s`;
        
        cardsContainer.appendChild(cardElement);
    });
}

// Configurar navegação suave
function setupSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav a, .footer-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Se for um link âncora
            if (href.startsWith('#')) {
                e.preventDefault();
                
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                    
                    // Atualizar navegação ativa
                    updateActiveNavLink(href);
                }
            }
        });
    });
}

// Atualizar link de navegação ativo
function updateActiveNavLink(href) {
    const navLinks = document.querySelectorAll('.nav a');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === href) {
            link.classList.add('active');
        }
    });
}

// Configurar eventos do carrossel
function setupCarouselEvents() {
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            goToSlide(currentSlide - 1);
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            goToSlide(currentSlide + 1);
        });
    }
    
    // Navegação por teclado
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            goToSlide(currentSlide - 1);
        } else if (e.key === 'ArrowRight') {
            goToSlide(currentSlide + 1);
        }
    });
    
    // Auto-play do carrossel
    startCarouselAutoPlay();
}

// Iniciar auto-play do carrossel
function startCarouselAutoPlay() {
    if (carouselInterval) {
        clearInterval(carouselInterval);
    }
    
    carouselInterval = setInterval(() => {
        goToSlide(currentSlide + 1);
    }, 5000);
    
    // Pausar auto-play quando o mouse estiver sobre o carrossel
    const carousel = document.querySelector('.carousel');
    if (carousel) {
        // Remover event listeners antigos para evitar duplicação
        carousel.removeEventListener('mouseenter', pauseCarousel);
        carousel.removeEventListener('mouseleave', resumeCarousel);
        
        // Adicionar novos event listeners
        carousel.addEventListener('mouseenter', pauseCarousel);
        carousel.addEventListener('mouseleave', resumeCarousel);
    }
}

// Funções auxiliares para pausar e retomar o carrossel
function pauseCarousel() {
    if (carouselInterval) {
        clearInterval(carouselInterval);
    }
}

function resumeCarousel() {
    startCarouselAutoPlay();
}

// Ir para slide específico
function goToSlide(slideIndex) {
    const slides = document.querySelectorAll('.carousel-item');
    const indicators = document.querySelectorAll('.indicator');
    const carouselInner = document.querySelector('.carousel-inner');
    
    // Verificar se existem slides
    if (slides.length === 0) return;
    
    // Ajustar índice se estiver fora dos limites
    if (slideIndex < 0) {
        slideIndex = slides.length - 1;
    } else if (slideIndex >= slides.length) {
        slideIndex = 0;
    }
    
    // Atualizar slide atual
    currentSlide = slideIndex;
    
    // Mover carrossel
    if (carouselInner) {
        carouselInner.style.transform = `translateX(-${slideIndex * 100}%)`;
        carouselInner.style.transition = 'transform 0.5s ease-in-out';
    }
    
    // Atualizar indicadores
    slides.forEach((slide, index) => {
        if (index === slideIndex) {
            slide.classList.add('active');
        } else {
            slide.classList.remove('active');
        }
    });
    
    indicators.forEach((indicator, index) => {
        if (index === slideIndex) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });
    
    // Reiniciar auto-play
    startCarouselAutoPlay();

}
// BOTÃO VOLTAR AO HUB - Versão simplificada
(function() {
    'use strict';
    
    document.addEventListener('DOMContentLoaded', function() {
        // Não criar botão na página do hub
        if (window.location.pathname.includes('index.html') || 
            window.location.pathname === '/' || 
            window.location.pathname.endsWith('/')) {
            return;
        }
        
        // Criar botão
        const container = document.createElement('div');
        container.className = 'back-to-hub-btn';
        
        const button = document.createElement('a');
        button.href = 'index.html';
        button.className = 'hub-btn';
        button.innerHTML = `
            <i class="fas fa-arrow-left"></i>
            <span>Voltar ao Hub</span>
        `;
        button.title = 'Retornar à página principal';
        
        container.appendChild(button);
        document.body.appendChild(container);
        
        console.log('Botão "Voltar ao Hub" adicionado');
    });
})();

