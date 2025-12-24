/*
 * ARRAY COM TODAS AS INDICAÇÕES DE FILMES
 * Baseado no seu HTML original
 */
const movieIndications = [
    {
        title: "12 Homens E Uma Sentença",
        description: "Seguindo o encerramento do caso do julgamento do assassinato cometido por um adolescente, os membros do júri devem chegar a um consenso sobre qual será o veredito.",
        year: "1997",
        genre: "Thriller/Ficção policial",
        duration: "1h 57m",
        recommendedBy: "Anthony",
        icon: "fas fa-gavel",
        image: "https://m.media-amazon.com/images/M/MV5BODNmNTFjODgtYzJhOC00ZGYyLWE4NzctZmMxZWM4NjhmY2JhXkEyXkFqcGc@._V1_.jpg",
        curiosity: "O filme foi baseado em uma peça de teatro de 1954 e foi rodado em apenas 21 dias, quase inteiramente em um único cenário."
    },
    {
        title: "Interestelar",
        description: "Equipe de exploradores viaja através de um buraco de minhoca para salvar a humanidade.",
        year: "2014",
        genre: "Ficção científica/Aventura",
        duration: "2h 49m",
        recommendedBy: "Anthony",
        icon: "fas fa-rocket",
        image: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        curiosity: "Para as cenas no planeta de água, a equipe construiu um tanque gigante com 1,2 milhão de litros de água e usou máquinas para criar ondas de 6 metros."
    },
    {
        title: "Casablanca",
        description: "Durante a Segunda Guerra, um exilado norte-americano encontra refúgio na cidade de Casablanca, no Marrocos, e passa a administrar uma casa noturna.",
        year: "1942",
        genre: "Romance/Guerra",
        duration: "1h 42m",
        recommendedBy: "Anthony",
        icon: "fas fa-plane",
        image: "https://upload.wikimedia.org/wikipedia/commons/b/b3/CasablancaPoster-Gold.jpg",
        curiosity: "A famosa frase 'Play it again, Sam' nunca é realmente dita no filme. O que Ingrid Bergman diz é: 'Play it, Sam. Play \"As Time Goes By\".'"
    },
    {
        title: "O iluminado",
        description: "The Shining(O iluminado) é um filme de terror psicológico de 1980 produzido e dirigido por Stanley Kubrick e co-escrito com a romancista Diane Johnson.",
        year: "1980",
        genre: "Terror/Mistério",
        duration: "2h 23m",
        recommendedBy: "Anthony",
        icon: "fas fa-ghost",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReS5Od6ststjILRf7itNPxZF1TWcLW7knRnQ&s",
        curiosity: "Shelley Duvall teve que repetir a cena do porrete 127 vezes, um recorde no Guinness Book para o maior número de takes de uma única cena."
    },
    {
        title: "I Want Eat Your Pancreas",
        description: "Um estudante do ensino médio descobre que uma de suas colegas de classe, Sakura Yamauchi, sofre de uma doença terminal. Este segredo une os dois, enquanto ela vive seus últimos momentos.",
        year: "2018",
        genre: "Romance/Drama",
        duration: "1h 48m",
        recommendedBy: "Anthony",
        icon: "fas fa-heart",
        image: "https://imusic.b-cdn.net/images/item/original/946/5022366605946.jpg?movie-2020-i-want-to-eat-your-pancreas-dvd&class=scaled&v=1739865941",
        curiosity: "O título peculiar vem de uma crença japonesa antiga de que comer o órgão doente de alguém pode curar sua própria doença similar."
    },
    {
        title: "Cinema Paradiso",
        description: "Um cineasta relembra sua infância em uma pequena cidade italiana.",
        year: "1988",
        genre: "Drama/Melodrama",
        duration: "2h 35m",
        recommendedBy: "Anthony",
        icon: "fas fa-film",
        image: "https://m.media-amazon.com/images/S/pv-target-images/c0bdf564fc4291d78c966b2ad5ecba2ba0cf592203a8e56ebbbfb3bbd96faae8.jpg",
        curiosity: "A versão estendida de 173 minutos, lançada em 2002, foi o corte original planejado pelo diretor, mas os distribuidores forçaram um corte mais curto para o lançamento original."
    }
];

document.addEventListener('DOMContentLoaded', function() {
    console.log('Página de filmes carregada');
    
    // Carrega os filmes
    loadMovies();
    
    // Inicializa botão hub
    initHubButton();
    
    // Efeitos simples
    initEffects();
});

function loadMovies() {
    const grid = document.querySelector('.filmes-grid');
    if (!grid) {
        console.error('Grid de filmes não encontrado');
        return;
    }
    
    grid.innerHTML = '';
    
    movieIndications.forEach(movie => {
        const card = createMovieCard(movie);
        grid.appendChild(card);
    });
    
    console.log(`${movieIndications.length} filmes carregados`);
}

function createMovieCard(movie) {
    const card = document.createElement('div');
    card.className = 'movie-card';
    
    card.innerHTML = `
        <div class="movie-header">
            <div class="movie-capa">
                <div class="capa-img" style="background-image: url('${movie.image}');"></div>
            </div>
            <div class="movie-icon">
                <i class="${movie.icon}"></i>
            </div>
        </div>
        <div class="movie-content">
            <h3>${movie.title}</h3>
            <div class="movie-meta">
                <span class="movie-year"><i class="fas fa-calendar-alt"></i> ${movie.year}</span>
                <span class="movie-genre"><i class="fas fa-tag"></i> ${movie.genre}</span>
                <span class="movie-duration"><i class="fas fa-clock"></i> ${movie.duration}</span>
            </div>
            <p class="movie-description">${movie.description}</p>
            <div class="movie-recommendation">
                <i class="fas fa-user-circle"></i>
                <span>Recomendado por: <strong>${movie.recommendedBy}</strong></span>
            </div>
            <div class="movie-actions">
                <button class="watch-btn">
                    <i class="fas fa-eye"></i> Marcar como visto
                </button>
            </div>
        </div>
    `;
    
    // Adiciona eventos
    const watchBtn = card.querySelector('.watch-btn');
    
    if (watchBtn) {
        watchBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            markAsWatched(card, this);
        });
    }
    
    // Click no card para detalhes
    card.addEventListener('click', function(e) {
        if (!e.target.classList.contains('watch-btn')) {
            toggleMovieDetails(card);
        }
    });
    
    return card;
}

function markAsWatched(card, button) {
    const isWatched = card.classList.toggle('watched');
    
    if (isWatched) {
        button.innerHTML = '<i class="fas fa-check-circle"></i> Já assisti!';
        button.style.backgroundColor = '#27ae60';
        button.style.color = 'white';
        card.style.borderLeft = '4px solid #27ae60';
    } else {
        button.innerHTML = '<i class="fas fa-eye"></i> Marcar como visto';
        button.style.backgroundColor = '';
        button.style.color = '';
        card.style.borderLeft = 'none';
    }
}

function toggleMovieDetails(card) {
    const details = card.querySelector('.movie-details');
    
    if (details) {
        details.remove();
    } else {
        // Encontra o título do filme para buscar a curiosidade
        const movieTitle = card.querySelector('h3').textContent;
        const movie = movieIndications.find(m => m.title === movieTitle);
        
        const extra = document.createElement('div');
        extra.className = 'movie-details';
        
        // Informações adicionais baseadas no gênero
        let additionalInfo = '';
        if (movie.genre.includes('Drama') || movie.genre.includes('Romance')) {
            additionalInfo = '<p><strong>Indicado para:</strong> Assistir com companhia</p>';
        } else if (movie.genre.includes('Terror') || movie.genre.includes('Mistério')) {
            additionalInfo = '<p><strong>Indicado para:</strong> Assistir à noite</p>';
        } else {
            additionalInfo = '<p><strong>Indicado para:</strong> Qualquer momento</p>';
        }
        
        extra.innerHTML = `
            <div class="details-content">
                <p><strong>Curiosidade:</strong></p>
                <p>${movie.curiosity || 'Este filme é considerado um clássico do cinema.'}</p>
                ${additionalInfo}
                <p><strong>Duração:</strong> ${movie.duration}</p>
                <p><strong>Ano:</strong> ${movie.year}</p>
            </div>
        `;
        
        // Insere antes dos botões de ação
        const actions = card.querySelector('.movie-actions');
        card.querySelector('.movie-content').insertBefore(extra, actions);
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
        const cards = document.querySelectorAll('.movie-card');
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
