// Variables para la aplicación
let currentCategory = 'people';
let currentPage = 1;
let allData = [];
let filteredData = [];
let hasScrolled = false;

// Mapeo de imágenes por defecto para cada categoría
const defaultImages = {
    people: 'https://via.placeholder.com/150x150/ff4d4d/ffffff?text=👤',
    planets: 'https://via.placeholder.com/150x150/4d4dff/ffffff?text=🪐',
    starships: 'https://via.placeholder.com/150x150/4dff4d/ffffff?text=🚀',
    vehicles: 'https://via.placeholder.com/150x150/ffff4d/ffffff?text=🚗',
    films: 'https://via.placeholder.com/150x150/ff4dff/ffffff?text=🎬',
    species: 'https://via.placeholder.com/150x150/4dffff/ffffff?text=👽'
};

// AQUÍ PUEDES AGREGAR TUS IMÁGENES PERSONALIZADAS
// Formato: 'nombre_exacto_del_item': 'URL_de_tu_imagen'
const customImages = {
    // PERSONAJES - Agrega aquí los nombres exactos como aparecen en SWAPI
    'Luke Skywalker': './images/personajes/luke.png',
    'Leia Organa': './images/personajes/leia.jpg',
    'Han Solo': './images/personajes/Han-solo.jpg',
    'Darth Vader': './images/personajes/Darth-Vader.jpg',
    'Obi-Wan Kenobi': './images/personajes/Obi-Wan.jpg',
    'Yoda': './images/personajes/Yoda.jpg',
    'Chewbacca': './images/personajes/Chewbacca.jpg',
    'C-3PO': './images/personajes/C-3PO.jpg',
    'R2-D2': './images/personajes/luke.png',
    'Anakin Skywalker': './images/personajes/luke.png',
    'Padmé Amidala': './images/personajes/luke.png',
    'Mace Windu': './images/personajes/luke.png',
    'Qui-Gon Jinn': './images/personajes/luke.png',
    'Palpatine': './images/personajes/luke.png',
    'Boba Fett': './images/personajes/luke.png',
    'Lando Calrissian': './images/personajes/luke.png',
    'Jabba Desilijic Tiure': './images/personajes/luke.png',
    'Wedge Antilles': './images/personajes/luke.png',
    'Jango Fett': './images/personajes/luke.png',
    'Count Dooku': './images/personajes/luke.png',

    // PLANETAS
    'Tatooine': './images/planetas/luke.png',
    'Alderaan': './images/planetas/luke.png',
    'Yavin IV': './images/planetas/luke.png',
    'Hoth': 'planets/hoth.jpg',
    'Dagobah': 'planets/dagobah.jpg',
    'Bespin': 'planets/bespin.jpg',
    'Endor': 'planets/endor.jpg',
    'Naboo': 'planets/naboo.jpg',
    'Coruscant': 'planets/coruscant.jpg',
    'Kamino': 'planets/kamino.jpg',
    'Geonosis': 'planets/geonosis.jpg',
    'Utapau': 'planets/utapau.jpg',
    'Mustafar': 'planets/mustafar.jpg',
    'Kashyyyk': 'planets/kashyyyk.jpg',
    'Polis Massa': 'planets/polis-massa.jpg',
    'Mygeeto': 'planets/mygeeto.jpg',
    'Felucia': 'planets/felucia.jpg',
    'Cato Neimoidia': 'planets/cato-neimoidia.jpg',
    'Saleucami': 'planets/saleucami.jpg',

    // NAVES
    'CR90 corvette': './images/naves/luke.png',
    'Star Destroyer': 'starships/star-destroyer.jpg',
    'Sentinel-class landing craft': 'starships/sentinel-landing-craft.jpg',
    'Death Star': 'starships/death-star.jpg',
    'Millennium Falcon': 'starships/millennium-falcon.jpg',
    'Y-wing': 'starships/y-wing.jpg',
    'X-wing': 'starships/x-wing.jpg',
    'TIE Advanced x1': 'starships/tie-advanced.jpg',
    'Executor': 'starships/executor.jpg',
    'Rebel transport': 'starships/rebel-transport.jpg',
    'Slave 1': 'starships/slave-1.jpg',
    'Imperial shuttle': 'starships/imperial-shuttle.jpg',
    'EF76 Nebulon-B escort frigate': 'starships/nebulon-b.jpg',
    'Calamari Cruiser': 'starships/mon-calamari-cruiser.jpg',
    'A-wing': 'starships/a-wing.jpg',
    'B-wing': 'starships/b-wing.jpg',
    'Republic Cruiser': 'starships/republic-cruiser.jpg',
    'Droid control ship': 'starships/droid-control-ship.jpg',
    'Naboo fighter': 'starships/naboo-fighter.jpg',
    'Naboo Royal Starship': 'starships/naboo-royal-starship.jpg',
    'Scimitar': 'starships/scimitar.jpg',

    // VEHÍCULOS
    'Sand Crawler': './images/vehiculos/luke.png',
    'T-16 skyhopper': 'vehicles/t16-skyhopper.jpg',
    'X-34 landspeeder': 'vehicles/x34-landspeeder.jpg',
    'TIE/LN starfighter': 'vehicles/tie-fighter.jpg',
    'Snowspeeder': 'vehicles/snowspeeder.jpg',
    'TIE bomber': 'vehicles/tie-bomber.jpg',
    'AT-AT': 'vehicles/at-at.jpg',
    'AT-ST': 'vehicles/at-st.jpg',
    'Storm IV Twin-Pod cloud car': 'vehicles/cloud-car.jpg',
    'Sail barge': 'vehicles/sail-barge.jpg',
    'Bantha': 'vehicles/bantha.jpg',
    'Speeder bike': 'vehicles/speeder-bike.jpg',
    'Vulture Droid': 'vehicles/vulture-droid.jpg',
    'Multi-Troop Transport': 'vehicles/mtt.jpg',
    'Armored Assault Tank': 'vehicles/aat.jpg',
    'Single Trooper Aerial Platform': 'vehicles/stap.jpg',
    'C-9979 landing craft': 'vehicles/trade-federation-lander.jpg',
    'Tribubble bongo': 'vehicles/gungan-sub.jpg',
    'Sith speeder': 'vehicles/sith-speeder.jpg',

    // PELÍCULAS
    'A New Hope': './images/peliculas/luke.png',
    'The Empire Strikes Back': 'films/episode-5.jpg',
    'Return of the Jedi': 'films/episode-6.jpg',
    'The Phantom Menace': 'films/episode-1.jpg',
    'Attack of the Clones': 'films/episode-2.jpg',
    'Revenge of the Sith': 'films/episode-3.jpg',

    // ESPECIES
    'Human': './images/especies/luke.png',
    'Droid': 'species/droid.jpg',
    'Wookie': 'species/wookie.jpg',
    'Rodian': 'species/rodian.jpg',
    'Hutt': 'species/hutt.jpg',
    'Yoda\'s species': 'species/yoda-species.jpg',
    'Trandoshan': 'species/trandoshan.jpg',
    'Mon Calamari': 'species/mon-calamari.jpg',
    'Ewok': 'species/ewok.jpg',
    'Sullustan': 'species/sullustan.jpg',
    'Neimodian': 'species/neimodian.jpg',
    'Gungan': 'species/gungan.jpg',
    'Toydarian': 'species/toydarian.jpg',
    'Dug': 'species/dug.jpg',
    'Twi\'lek': 'species/twilek.jpg',
    'Aleena': 'species/aleena.jpg',
    'Vulptereen': 'species/vulptereen.jpg',
    'Xexto': 'species/xexto.jpg',
    'Toong': 'species/toong.jpg',
    'Cerean': 'species/cerean.jpg',
    'Nautolan': 'species/nautolan.jpg',
    'Zabrak': 'species/zabrak.jpg',
    'Tholothian': 'species/tholothian.jpg',
    'Iktotchi': 'species/iktotchi.jpg',
    'Quermian': 'species/quermian.jpg',
    'Kel Dor': 'species/kel-dor.jpg',
    'Chagrian': 'species/chagrian.jpg',
    'Geonosian': 'species/geonosian.jpg',
    'Mirialan': 'species/mirialan.jpg',
    'Clawdite': 'species/clawdite.jpg',
    'Besalisk': 'species/besalisk.jpg',
    'Kaminoan': 'species/kaminoan.jpg',
    'Skakoan': 'species/skakoan.jpg',
    'Muun': 'species/muun.jpg',
    'Togruta': 'species/togruta.jpg',
    'Kaleesh': 'species/kaleesh.jpg',
    'Pau\'an': 'species/pauan.jpg'

};

// Inicialización
document.addEventListener('DOMContentLoaded', function () {
    setupIntroAnimation();
    setupScrollIndicator();
    createStars();
    document.getElementById('continue-btn').addEventListener('click', startApplication);

    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            setCategory(this.dataset.category);
        });
    });

    document.getElementById('searchInput').addEventListener('input', searchItems);
});

function setupScrollIndicator() {
    // Ocultar el indicador cuando se hace scroll
    window.addEventListener('scroll', function () {
        if (!hasScrolled && window.scrollY > 50) {
            hasScrolled = true;
            const indicator = document.getElementById('scroll-indicator');
            indicator.classList.add('hidden');
        }
    });

    // También ocultar cuando se detecta cualquier movimiento de scroll
    window.addEventListener('wheel', function () {
        if (!hasScrolled) {
            hasScrolled = true;
            const indicator = document.getElementById('scroll-indicator');
            indicator.classList.add('hidden');
        }
    });

    // Para dispositivos táctiles
    window.addEventListener('touchstart', function () {
        if (!hasScrolled) {
            hasScrolled = true;
            const indicator = document.getElementById('scroll-indicator');
            indicator.classList.add('hidden');
        }
    });
}

function setupIntroAnimation() {
    gsap.registerPlugin(ScrollTrigger);

    ScrollTrigger.create({
        trigger: "body",
        start: "50% top",
        end: "bottom bottom",
        onEnter: showContinueButton,
        onEnterBack: showContinueButton,
    });

    gsap.timeline({
        scrollTrigger: {
            scrub: 1,
            trigger: "body",
            start: "top top",
            end: "bottom bottom",
        }
    })
        .to("#hero-key", { duration: 1, scale: 1 })
        .to("#logo-mask", { maskSize: "clamp(50vh, 25%, 30vh)" }, 0.15)
        .to("#hero-key", { opacity: 0, duration: 0.3 }, 0.4);
}

function showContinueButton() {
    const btn = document.getElementById('continue-btn');
    btn.classList.remove('hidden');
    btn.classList.add('show');
}

function startApplication() {
    document.getElementById('logo-mask').style.display = 'none';
    document.getElementById('continue-btn').style.display = 'none';
    document.getElementById('scroll-indicator').style.display = 'none';

    document.body.style.height = 'auto';
    document.body.style.overflow = 'auto';
    document.documentElement.style.height = 'auto';

    const appContainer = document.getElementById('appContainer');
    appContainer.style.display = 'block';
    // Agregar clase para activar la nueva animación de estrellas
    appContainer.classList.add('active');
    gsap.from(appContainer, { opacity: 0, y: 50, duration: 1 });

    window.scrollTo(0, 0);
    loadData(currentCategory);
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
}

function createStars() {
    const starsContainer = document.getElementById('stars');
    for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.width = Math.random() * 3 + 1 + 'px';
        star.style.height = star.style.width;
        star.style.animationDelay = Math.random() * 2 + 's';
        starsContainer.appendChild(star);
    }
}

function setCategory(category) {
    currentCategory = category;
    currentPage = 1;
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    loadData(category);
}

async function loadData(category, page = 1) {
    document.getElementById('loading').style.display = 'block';
    document.getElementById('resultsGrid').innerHTML = '';
    try {
        const response = await fetch(`https://swapi.py4e.com/api/${category}/?page=${page}`);
        const data = await response.json();
        allData = data.results;
        filteredData = [...allData];
        displayResults(filteredData);
        createPagination(data, page);
        document.getElementById('loading').style.display = 'none';
    } catch (error) {
        console.error('Error cargando datos:', error);
        document.getElementById('loading').innerHTML = 'Error cargando datos de la galaxia 😞';
    }
}

function displayResults(data) {
    const grid = document.getElementById('resultsGrid');
    grid.innerHTML = '';

    // Filtrar los datos para incluir solo los elementos que tienen imágenes personalizadas
    const filteredItems = data.filter(item => {
        const itemName = item.name || item.title;
        return customImages.hasOwnProperty(itemName);
    });

    if (filteredItems.length === 0) {
        grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #ff9999;">No se encontraron resultados con imágenes disponibles</p>';
        return;
    }

    filteredItems.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = generateCardContent(item, currentCategory);

        // Agregar evento de click para voltear la carta
        card.addEventListener('click', function () {
            this.classList.toggle('flipped');
        });

        grid.appendChild(card);
    });
}

function getImageForItem(item, category) {
    const itemName = item.name || item.title;

    // Buscar imagen personalizada primero
    if (customImages[itemName]) {
        return customImages[itemName];
    }

    // Usar imagen por defecto de la categoría
    return defaultImages[category] || defaultImages.people;
}

function getCategoryEmoji(category) {
    const emojis = {
        people: '👤',
        planets: '🪐',
        starships: '🚀',
        vehicles: '🚗',
        films: '🎬',
        species: '👽'
    };
    return emojis[category] || '⭐';
}

function getCategoryName(category) {
    const names = {
        people: 'Personaje',
        planets: 'Planeta',
        starships: 'Nave',
        vehicles: 'Vehículo',
        films: 'Película',
        species: 'Especie'
    };
    return names[category] || 'Elemento';
}

function generateCardContent(item, category) {
    const itemName = item.name || item.title;
    const imageUrl = getImageForItem(item, category);
    const categoryEmoji = getCategoryEmoji(category);
    const categoryName = getCategoryName(category);

    const backContent = generateBackContent(item, category);

    return `
                <div class="card-inner">
                    <div class="card-front">
                        <img src="${imageUrl}" alt="${itemName}" class="card-image" 
                             onerror="this.src='${defaultImages[category]}'">
                        <div class="card-title">${itemName}</div>
                        <div class="card-category">${categoryEmoji} ${categoryName}</div>
                        <div class="flip-hint">Click para más info</div>
                    </div>
                    <div class="card-back">
                        <div class="card-title">${itemName}</div>
                        <div class="card-info">${backContent}</div>
                    </div>
                </div>
            `;
}

function generateBackContent(item, category) {
    switch (category) {
        case 'people':
            return `<strong>Altura:</strong> ${item.height} cm<br>
                            <strong>Peso:</strong> ${item.mass} kg<br>
                            <strong>Color de pelo:</strong> ${item.hair_color}<br>
                            <strong>Color de piel:</strong> ${item.skin_color}<br>
                            <strong>Color de ojos:</strong> ${item.eye_color}<br>
                            <strong>Año de nacimiento:</strong> ${item.birth_year}<br>
                            <strong>Género:</strong> ${item.gender}`;
        case 'planets':
            return `<strong>Rotación:</strong> ${item.rotation_period} h<br>
                            <strong>Órbita:</strong> ${item.orbital_period} días<br>
                            <strong>Diámetro:</strong> ${item.diameter} km<br>
                            <strong>Clima:</strong> ${item.climate}<br>
                            <strong>Gravedad:</strong> ${item.gravity}<br>
                            <strong>Terreno:</strong> ${item.terrain}<br>
                            <strong>Población:</strong> ${item.population}`;
        case 'films':
            return `<strong>Episodio:</strong> ${item.episode_id}<br>
                            <strong>Director:</strong> ${item.director}<br>
                            <strong>Productor:</strong> ${item.producer}<br>
                            <strong>Lanzamiento:</strong> ${item.release_date}<br>
                            <strong>Descripción:</strong> ${item.opening_crawl.substring(0, 200)}...`;
        case 'starships':
        case 'vehicles':
            return `<strong>Modelo:</strong> ${item.model}<br>
                            <strong>Fabricante:</strong> ${item.manufacturer}<br>
                            <strong>Costo:</strong> ${item.cost_in_credits} créditos<br>
                            <strong>Longitud:</strong> ${item.length} m<br>
                            <strong>Velocidad:</strong> ${item.max_atmosphering_speed}<br>
                            <strong>Tripulación:</strong> ${item.crew}<br>
                            <strong>Pasajeros:</strong> ${item.passengers}`;
        case 'species':
            return `<strong>Clasificación:</strong> ${item.classification}<br>
                            <strong>Designación:</strong> ${item.designation}<br>
                            <strong>Altura promedio:</strong> ${item.average_height} cm<br>
                            <strong>Colores de piel:</strong> ${item.skin_colors}<br>
                            <strong>Esperanza de vida:</strong> ${item.average_lifespan} años<br>
                            <strong>Lenguaje:</strong> ${item.language}`;
        default:
            return `<strong>Información:</strong> Datos disponibles para ${item.name || item.title}`;
    }
}

function createPagination(data, currentPageNum) {
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';

    if (data.previous) {
        const prevBtn = document.createElement('button');
        prevBtn.className = 'page-btn';
        prevBtn.textContent = '← Anterior';
        prevBtn.onclick = () => loadData(currentCategory, currentPageNum - 1);
        pagination.appendChild(prevBtn);
    }

    const pageInfo = document.createElement('span');
    pageInfo.style.color = '#ff4d4d';
    pageInfo.style.padding = '8px 15px';
    pageInfo.textContent = `Página ${currentPageNum}`;
    pagination.appendChild(pageInfo);

    if (data.next) {
        const nextBtn = document.createElement('button');
        nextBtn.className = 'page-btn';
        nextBtn.textContent = 'Siguiente →';
        nextBtn.onclick = () => loadData(currentCategory, currentPageNum + 1);
        pagination.appendChild(nextBtn);
    }
}

function searchItems() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();

    // Primero filtramos por elementos que tienen imágenes personalizadas
    const itemsWithImages = allData.filter(item => {
        const itemName = item.name || item.title;
        return customImages.hasOwnProperty(itemName);
    });

    // Luego aplicamos el filtro de búsqueda
    filteredData = searchTerm === '' ? itemsWithImages :
        itemsWithImages.filter(item => (item.name || item.title).toLowerCase().includes(searchTerm));

    displayResults(filteredData);
}