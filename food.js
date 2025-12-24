/*
 * ARRAY COM TODAS AS INDICAÇÕES DE COMIDAS
 * Baseado no seu HTML original
 */
const foodIndications = [
    {
        title: "Sorvete de Flocos",
        description: "Sorvetinho bom demais.",
        type: "Sobremesa",
        difficulty: "Fácil",
        time: "Imediato",
        recommendedBy: "Anthony",
        icon: "fas fa-ice-cream",
        image: "https://www.sabornamesa.com.br/media/k2/items/cache/7f23dcfbe64e4348bd21e29b1ec76fb1_XL.jpg",
        tags: ["Cremoso"]
    },
    {
        title: "Pizza Strogonoff",
        description: "molho da carne, queijo mussarela, a carne ensopada, o requeijão, orégano e, por último, a batata palha.",
        type: "Prato Principal",
        difficulty: "Médio",
        time: "1h",
        recommendedBy: "Anthony",
        icon: "fas fa-pizza-slice",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0RVN6Q8uWlatJzGGzagsJs6H-6wCOsoT2hA&s",
        tags: ["Caseira"]
    },
    {
        title: "Arroz com linguiça e bacon",
        description: "Arrozinho bom, confia.",
        type: "Prato Principal",
        difficulty: "Fácil",
        time: "40min",
        recommendedBy: "Anthony",
        icon: "fas fa-bowl-rice",
        image: "https://acarnequeomundoprefere.com.br/uploads/media/image/frimesa-receita-arroz-com-linguica-frescal-horizontal-alta.jpg",
        tags: ["Caseira"]
    },
    {
        title: "Frango à parmegiana",
        description: "Frango à parmegiana ou frango à parmegiana é um prato que consiste em peito de frango empanado coberto com molho de tomate e mussarela, parmesão ou provolone.",
        type: "Prato Principal",
        difficulty: "Médio",
        time: "50min",
        recommendedBy: "Anthony",
        icon: "fas fa-drumstick-bite",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIEXQTxOKh3f40SCdNL5Gtel_KhtJ4hnc1lw&s",
        tags: ["Caseira", "Carne"]
    },
    {
        title: "Brownie",
        description: "Brownie é uma sobremesa de chocolate típico da culinária dos Estados Unidos e pode considerar-se um bolo feito num tabuleiro para bolos e partido em pequenos quadrados.",
        type: "Sobremesa",
        difficulty: "Fácil",
        time: "30min",
        recommendedBy: "Anthony",
        icon: "fas fa-cookie-bite",
        image: "https://static.itdg.com.br/images/360-240/9e621f4e0b36756979fda3f87f8279a5/340593-original.jpg",
        tags: ["Cremoso"]
    },
    {
        title: "Pudim",
        description: "Pudim é a denominação genérica de dois tipos de alimentos. Saber qual desses dois alimentos é considerado pudim varia entre diversas regiões geográficas.",
        type: "Sobremesa",
        difficulty: "Médio",
        time: "1h 30min",
        recommendedBy: "Anthony",
        icon: "fas fa-custard",
        image: "https://static.itdg.com.br/images/360-240/3a4ad9def4cfa845063f443b85d2a463/245042-363669-original.jpg",
        tags: ["Cremoso"]
    }
];

document.addEventListener('DOMContentLoaded', function() {
    console.log('Página de comidas carregada');
    
    // Carrega as comidas
    loadFoods();
    
    // Inicializa botão hub
    initHubButton();
    
    // Efeitos simples
    initEffects();
});

function loadFoods() {
    const grid = document.querySelector('.comidas-grid');
    if (!grid) {
        console.error('Grid de comidas não encontrado');
        return;
    }
    
    grid.innerHTML = '';
    
    foodIndications.forEach(food => {
        const card = createFoodCard(food);
        grid.appendChild(card);
    });
    
    console.log(`${foodIndications.length} comidas carregadas`);
}

function createFoodCard(food) {
    const card = document.createElement('div');
    card.className = 'food-card';
    
    const tagsHTML = food.tags.map(tag => `<span class="food-tag">${tag}</span>`).join('');
    
    card.innerHTML = `
        <div class="food-header">
            <div class="food-imagem">
                <div class="imagem" style="background-image: url('${food.image}');"></div>
            </div>
            <div class="food-icon">
                <i class="${food.icon}"></i>
            </div>
        </div>
        <div class="food-content">
            <h3>${food.title}</h3>
            <div class="food-meta">
                <span class="food-type"><i class="fas fa-utensil-spoon"></i> ${food.type}</span>
                <span class="food-difficulty"><i class="fas fa-signal"></i> ${food.difficulty}</span>
                <span class="food-time"><i class="far fa-clock"></i> ${food.time}</span>
            </div>
            <p class="food-description">${food.description}</p>
            <div class="food-recommendation">
                <i class="fas fa-user-circle"></i>
                <span>Recomendado por: <strong>${food.recommendedBy}</strong></span>
            </div>
            ${food.tags.length ? `<div class="food-tags">${tagsHTML}</div>` : ''}
            <div class="food-actions">
                <button class="try-btn">
                    <i class="fas fa-check"></i> Já experimentei
                </button>
                <button class="info-btn">
                    <i class="fas fa-info-circle"></i> Mais detalhes
                </button>
            </div>
        </div>
    `;
    
    // Adiciona eventos
    const tryBtn = card.querySelector('.try-btn');
    const infoBtn = card.querySelector('.info-btn');
    
    if (tryBtn) {
        tryBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            markAsTried(card, this);
        });
    }
    
    if (infoBtn) {
        infoBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleDetails(card, this);
        });
    }
    
    return card;
}

function markAsTried(card, button) {
    const isTried = card.classList.toggle('tried');
    
    if (isTried) {
        button.innerHTML = '<i class="fas fa-check-circle"></i> Já provei!';
        button.style.backgroundColor = '#e67e22';
        button.style.color = 'white';
        card.style.borderLeft = '4px solid #e67e22';
    } else {
        button.innerHTML = '<i class="fas fa-check"></i> Já experimentei';
        button.style.backgroundColor = '';
        button.style.color = '';
        card.style.borderLeft = 'none';
    }
}

function toggleDetails(card, button) {
    const details = card.querySelector('.extra-details');
    
    if (details) {
        details.remove();
        button.innerHTML = '<i class="fas fa-info-circle"></i> Mais detalhes';
    } else {
        // Encontra o título da comida para buscar dicas específicas
        const foodTitle = card.querySelector('h3').textContent;
        const food = foodIndications.find(f => f.title === foodTitle);
        
        const extra = document.createElement('div');
        extra.className = 'extra-details';
        
        // Dicas específicas baseadas no tipo de comida
        let tips = '';
        if (food.type === 'Sobremesa') {
            tips = `
                <li>Melhor servida gelada</li>
                <li>Perfeita para ocasiões especiais</li>
                <li>Combina bem comigo</li>
            `;
        } else if (food.type === 'Prato Principal') {
            tips = `
                <li>Ideal para o almoço ou jantar</li>
                <li>Serve 2-3 pessoas</li>
                <li>Acompanha bem com uma salada</li>
                <li>E posso te acompanhar na refeição</li>
            `;
        } else {
            tips = `
                <li>Ótima opção para lanches</li>
                <li>Fácil de preparar</li>
                <li>Versátil e prática</li>
            `;
        }
        
        extra.innerHTML = `
            <div class="details-content">
                <p><strong>Dicas de preparo:</strong></p>
                <ul>
                    ${tips}
                </ul>
                <p><strong>Dificuldade:</strong> ${food.difficulty}</p>
                <p><strong>Tempo estimado:</strong> ${food.time}</p>
            </div>
        `;
        
        // Insere antes dos botões de ação
        const actions = card.querySelector('.food-actions');
        card.querySelector('.food-content').insertBefore(extra, actions);
        
        button.innerHTML = '<i class="fas fa-times-circle"></i> Fechar detalhes';
    }
}

function initHubButton() {
    if (window.location.pathname.includes('index.html') || window.location.pathname === '/') return;
    
    const buttonHTML = `
        <div class="back-to-hub-btn">
            <a href="index.html" class="hub-btn">
                <i class="fas fa-arrow-left"></i>
                <span>Voltar ao Hub</span>
            </a>
        </div>
    `;
    
    document.body.insertAdjacentHTML('afterbegin', buttonHTML);
}

function initEffects() {
    // Transição suave de entrada
    const container = document.querySelector('.container');
    if (container) {
        container.style.opacity = '0';
        container.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            container.style.opacity = '1';
        }, 100);
    }
    
    // Anima cards
    setTimeout(() => {
        const cards = document.querySelectorAll('.food-card');
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100 + (index * 100));
        });
    }, 200);
}
