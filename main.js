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
    'Leia Organa': './images/personajes/Leia.jpg',
    'Han Solo': './images/personajes/Han-solo.jpg',
    'Darth Vader': './images/personajes/Darth-Vader.jpg',
    'Obi-Wan Kenobi': './images/personajes/Obi-Wan.jpg',
    'Yoda': './images/personajes/Yoda.jpg',
    'Chewbacca': './images/personajes/Chewbacca.jpg',
    'C-3PO': './images/personajes/C-3PO.jpg',
    'R2-D2': './images/personajes/R2-D2.jpg',
    'Anakin Skywalker': './images/personajes/Anakin-Skywalker.jpg',
    'Padmé Amidala': './images/personajes/Padme-Amidala.jpg',
    'Mace Windu': './images/personajes/Mace-Windu.jpg',
    'Qui-Gon Jinn': './images/personajes/qui-gon-jinn.jpg',
    'Palpatine': './images/personajes/Palpatine.jpg',
    'Boba Fett': './images/personajes/Boba-Fett.jpg',
    'Lando Calrissian': './images/personajes/Lando-carissian.jpg',
    'Jabba Desilijic Tiure': './images/personajes/Jabba-Desilijic.jpg',
    'Wedge Antilles': './images/personajes/Wedge-Antilles.jpg',
    'Jango Fett': './images/personajes/Jango-fett.jpg',
    'Count Dooku': './images/personajes/Count-Dooku.png',

    // PLANETAS
    'Tatooine': './images/planetas/Tatooine.jpg',
    'Alderaan': './images/planetas/Alderaan.jpg',
    'Yavin IV': './images/planetas/Yavin-IV.png',
    'Hoth': './images/planetas/Hoth.jpg',
    'Dagobah': './images/planetas/Dagobah.jpg',
    'Bespin': './images/planetas/Bespin.jpg',
    'Endor': './images/planetas/Endor.jpg',
    'Naboo': './images/planetas/Naboo.jpg',
    'Coruscant': './images/planetas/Coruscant.jpg',
    'Kamino': './images/planetas/Kamino.jpg',
    'Geonosis': './images/planetas/Geonosis.jpg',
    'Utapau': './images/planetas/Utapau.png',
    'Mustafar': './images/planetas/Mustafar.jpg',
    'Kashyyyk': './images/planetas/Kashyyyk.jpg',
    'Polis Massa': './images/planetas/Polis-Massa.jpg',
    'Mygeeto': './images/planetas/Mygeeto.jpg',
    'Felucia': './images/planetas/Felucia.jpg',
    'Cato Neimoidia': './images/planetas/Cato-Neimoidia.jpg',
    'Saleucami': './images/planetas/Saleucami.jpg',

    // NAVES
    'CR90 corvette': './images/naves/CR90-Corvette.jpg',
    'Star Destroyer': './images/naves/Star-Destroyer.jpg',
    'Sentinel-class landing craft': './images/naves/Sentinel-Class.jpg',
    'Death Star': './images/naves/Death-star.jpg',
    'Millennium Falcon': './images/naves/Millennium-Falcon.jpg',
    'Y-wing': './images/naves/Y-wing.jpg',
    'X-wing': './images/naves/X-wing.jpg',
    'TIE Advanced x1': './images/naves/TIE-Advanced.jpg',
    'Executor': './images/naves/Executor.jpg',
    'Rebel transport': './images/naves/Rebel-transport.jpg',
    'Slave 1': './images/naves/Slave-1.jpg',
    'Imperial shuttle': './images/naves/Imperial-Shuttle.jpg',
    'EF76 Nebulon-B escort frigate': './images/naves/EF76-Nebulon.jpg',
    'Calamari Cruiser': './images/naves/Calamari-Cruiser.jpg',
    'A-wing': './images/naves/A-wing.png',
    'B-wing': './images/naves/B-wing.jpg',
    'Republic Cruiser': './images/naves/Republic-Cruiser.jpg',
    'Droid control ship': './images/naves/Droid-control-ship.png',
    'Naboo fighter': './images/naves/Naboo-Fighter.jpg',
    'Naboo Royal Starship': './images/naves/Naboo-Royal-Starship.jpg',
    'Scimitar': './images/naves/Scimitar.jpg',

    // VEHÍCULOS
    'Sand Crawler': './images/vehiculos/Sand-Crawler.png',
    'T-16 skyhopper': './images/vehiculos/T-16-Skyhopper.jpg',
    'X-34 landspeeder': './images/vehiculos/X-34.jpg',
    'TIE/LN starfighter': './images/vehiculos/TIE-LN.jpg',
    'Snowspeeder': './images/vehiculos/Snowspeeder.jpg',
    'TIE bomber': './images/vehiculos/TIE-bomber.jpg',
    'AT-AT': './images/vehiculos/AT-AT.jpg',
    'AT-ST': './images/vehiculos/AT-ST.jpg',
    'Storm IV Twin-Pod cloud car': './images/vehiculos/Storm-IV-Twin.jpg',
    'Sail barge': './images/vehiculos/Sail-barge.png',
    'Bantha': './images/vehiculos/Bantha.jpg',
    'Speeder bike': './images/vehiculos/Speeder-bike.jpg',
    'Vulture Droid': './images/vehiculos/Vulture-droid.jpeg',
    'Multi-Troop Transport': './images/vehiculos/TIE-bomber.jpg',
    'Armored Assault Tank': './images/vehiculos/Armored-assault.jpg',
    'Single Trooper Aerial Platform': './images/vehiculos/Single-trooper.png',
    'C-9979 landing craft': './images/vehiculos/C9979.webp',
    'Tribubble bongo': './images/vehiculos/Tribubble-bongo.jpg',
    'Sith speeder': './images/vehiculos/Sith-speeder.jpg',

    // PELÍCULAS
    'A New Hope': './images/peliculas/NEW-HOPE.jpg',
    'The Empire Strikes Back': './images/peliculas/THE-EMPIRE-BACK.jpg',
    'Return of the Jedi': './images/peliculas/RETURN-OF-THE-JEDI.jpg',
    'The Phantom Menace': './images/peliculas/THE-PANTHOM-MENACE.jpg',
    'Attack of the Clones': './images/peliculas/ATTACK-OF-THE-CLONES.webp',
    'Revenge of the Sith': './images/peliculas/REVENGE-OF-THE-SITH.jpg',

    // ESPECIES
    'Human': './images/especies/HUMAN.jpg',
    'Droid': './images/especies/DROID.webp',
    'Wookie': './images/especies/WOOKIE.png',
    'Rodian': './images/especies/RODIAN.jpg',
    'Hutt': './images/especies/HUTT.jpg',
    'Yoda\'s species': './images/especies/YODA.webp',
    'Trandoshan': './images/especies/TRANDOSHAN.jpg',
    'Mon Calamari': './images/especies/MON-CALAMARI.jpg',
    'Ewok': './images/especies/EWOK.jpg',
    'Sullustan': './images/especies/SULLUSTAN.png',
    'Neimodian': './images/especies/NEIMODIAN.jpg',
    'Gungan': './images/especies/GUNGAN.jpg',
    'Toydarian': './images/especies/TOYDARIAN.jpg',
    'Dug': './images/especies/DUG.jpg',
    'Twi\'lek': './images/especies/TWI-LEK.webp',
    'Aleena': './images/especies/ALEENA.webp',
    'Vulptereen': './images/especies/Vulptereen.png',
    'Xexto': './images/especies/XEXTO.jpg',
    'Toong': './images/especies/TOONG.jpg',
    'Cerean': './images/especies/CEREAN.jpg',
    'Nautolan': './images/especies/NAUTOLAN.jpg',
    'Zabrak': './images/especies/ZABRAK.jpg',
    'Tholothian': './images/especies/tholothian.jpg',
    'Iktotchi': './images/especies/IKTOTCHI.jpg',
    'Quermian': './images/especies/QUERMIAN.jpg',
    'Kel Dor': './images/especies/KEL-DOR.jpg',
    'Chagrian': './images/especies/CHAGRIAN.jpg',
    'Geonosian': './images/especies/GEONOSIAN.jpg',
    'Mirialan': './images/especies/MIRIALAN.jpg',
    'Clawdite': './images/especies/CLAWDITE.jpg',
    'Besalisk': './images/especies/BESALISK.jpg',
    'Kaminoan': './images/especies/KAMINOAN.jpg',
    'Skakoan': './images/especies/SKAKOAN.jpg',
    'Muun': './images/especies/MUUN.png',
    'Togruta': './images/especies/TOGRUTA.avif',
    'Kaleesh': './images/especies/KALEESH.jpg',
    'Pau\'an': './images/especies/PAU-AN.jpg'

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
        document.getElementById('loading').innerHTML = 'Error cargando datos de la galaxia';
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
        people: '',
        planets: '',
        starships: '',
        vehicles: '',
        films: '',
        species: ''
    };
    return emojis[category] || '';
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