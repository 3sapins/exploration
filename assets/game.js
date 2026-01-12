// Jeu interactif — Cortés & Moctezuma
// Moteur narratif avec scènes SVG ou images historiques et système de stats.

const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => Array.from(document.querySelectorAll(sel));

// Association images historiques (conquistadors vs codex)
const imageMap = {
  cortes: {
    start: 'assets/img/conquistador_port.svg',
    prep: 'assets/img/conquistador_port.svg',
    mandat: 'assets/img/conquistador_port.svg',
    sea: 'assets/img/conquistador_sea.svg',
    tabasco: 'assets/img/conquistador_tabasco.svg',
    malinche: 'assets/img/conquistador_tabasco.svg',
    tlaxcala: 'assets/img/conquistador_tlaxcala.svg',
    cholula: 'assets/img/conquistador_cholula.svg',
    approche: 'assets/img/conquistador_tenochtitlan.svg',
    rencontre: 'assets/img/conquistador_tenochtitlan.svg',
    hostage: 'assets/img/conquistador_tenochtitlan.svg',
    narvaez: 'assets/img/conquistador_cholula.svg',
    toxcatl: 'assets/img/conquistador_tenochtitlan.svg',
    noche: 'assets/img/conquistador_noche.svg',
    repli: 'assets/img/conquistador_tlaxcala.svg',
    siege: 'assets/img/conquistador_siege.svg',
    fin: 'assets/img/conquistador_siege.svg'
  },
  moctezuma: {
    start: 'assets/img/codex_moctezuma.svg',
    omens: 'https://media.getty.edu/iiif/image/b2f32b20-0a4e-406f-8efb-5d6e328ed5d7/full/pct:16,/0/default.jpg',
    first_reports: 'https://media.getty.edu/iiif/image/c53e64c7-fb4e-4c92-9cd9-6b650608fd5c/full/pct:16,/0/default.jpg',
    cholula_side: 'assets/img/codex_cholula.svg',
    welcome: 'https://media.getty.edu/iiif/image/c53e64c7-fb4e-4c92-9cd9-6b650608fd5c/full/pct:16,/0/default.jpg',
    hostage_side: 'assets/img/codex_hostage.svg',
    toxcatl_side: 'https://media.getty.edu/iiif/image/b2f32b20-0a4e-406f-8efb-5d6e328ed5d7/full/pct:16,/0/default.jpg',
    noche_side: 'https://enl.wired-humanities.org/sites/default/files/styles/large/public/mapaImages/FCBk12Ch23F40v00.png?itok=sYU4JzBj',
    siege_side: 'https://enl.wired-humanities.org/sites/default/files/styles/large/public/mapaImages/FCBk12Ch23F40v00.png?itok=sYU4JzBj',
    fin_side: 'assets/img/codex_siege.svg'
  }
};

// Stats par personnage
const baseStats = {
  cortes: { moral: 5, ressources: 5, alliances: 0, renommee: 1, foi: 3, informations: 0 },
  moctezuma: { autorite: 5, faveur: 4, nobles: 3, informations: 2, pretGuerrier: 3 }
};

let state = {
  character: null,
  stats: {},
  nodeId: null,
  turn: 0,
};

// Scènes visuelles (SVG) — fallback inspiré des codex
function sceneSVG(key) {
  switch (key) {
    case 'port':
      return `<svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
        <rect width="400" height="200" fill="#e3eef5"/>
        <rect y="130" width="400" height="70" fill="#7ec8e3"/>
        <path d="M20 150 Q80 120 140 150 T260 150 T380 150" fill="#6b4f3a"/>
        <rect x="60" y="60" width="70" height="40" fill="#c9a07b" stroke="#6b4f3a"/>
        <line x1="95" y1="60" x2="95" y2="30" stroke="#6b4f3a" stroke-width="4"/>
        <polygon points="95,30 80,45 110,45" fill="#6b4f3a"/>
        <text x="12" y="22" fill="#2b2b2b" font-size="14">Port de départ</text>
      </svg>`;
    case 'sea':
      return `<svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
        <rect width="400" height="200" fill="#cdeffd"/>
        <path d="M0 150 Q50 130 100 150 T200 150 T300 150 T400 150" fill="#4aa3c0"/>
        <polygon points="220,120 260,130 240,150" fill="#6b4f3a"/>
        <rect x="235" y="110" width="10" height="20" fill="#3d2c20"/>
        <line x1="240" y1="110" x2="240" y2="90" stroke="#3d2c20" stroke-width="3"/>
        <polygon points="240,90 230,100 250,100" fill="#3d2c20"/>
        <text x="12" y="22" fill="#2b2b2b" font-size="14">Traversée océanique</text>
      </svg>`;
    case 'coast':
      return `<svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
        <rect width="400" height="200" fill="#fff3c4"/>
        <rect y="150" width="400" height="50" fill="#4aa3c0"/>
        <path d="M0 150 C80 100 140 100 200 150" fill="#e0c38c"/>
        <text x="12" y="22" fill="#2b2b2b" font-size="14">Côtes du golfe</text>
      </svg>`;
    case 'tenochtitlan':
      return `<svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
        <rect width="400" height="200" fill="#eaf7f0"/>
        <rect x="0" y="160" width="400" height="40" fill="#7ec8e3"/>
        <polygon points="200,60 240,120 160,120" fill="#d9b08c" stroke="#6b4f3a"/>
        <rect x="185" y="80" width="30" height="25" fill="#b5651d"/>
        <line x1="160" y1="120" x2="240" y2="120" stroke="#6b4f3a" stroke-width="3"/>
        <text x="12" y="22" fill="#2b2b2b" font-size="14">Tenochtitlán</text>
      </svg>`;
    case 'codex':
      return `<svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
        <rect width="400" height="200" fill="#f6efe2"/>
        <rect x="40" y="40" width="320" height="120" fill="#fff9ec" stroke="#b5651d" stroke-width="4"/>
        <circle cx="120" cy="100" r="26" fill="#b22222"/>
        <path d="M200 80 h100 v40 h-100 z" fill="#2a9d8f"/>
        <text x="52" y="60" fill="#6b4f3a" font-size="14">Style codex</text>
      </svg>`;
    case 'battle':
      return `<svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
        <rect width="400" height="200" fill="#ffe9e6"/>
        <line x1="40" y1="160" x2="360" y2="160" stroke="#6b4f3a" stroke-width="4"/>
        <polygon points="80,140 100,120 120,140" fill="#3d2c20"/>
        <polygon points="280,140 300,120 320,140" fill="#b22222"/>
        <text x="12" y="22" fill="#2b2b2b" font-size="14">Affrontements</text>
      </svg>`;
    case 'council':
      return `<svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
        <rect width="400" height="200" fill="#eef6ff"/>
        <rect x="80" y="60" width="240" height="80" fill="#fff" stroke="#6b4f3a"/>
        <circle cx="120" cy="100" r="14" fill="#b22222"/>
        <circle cx="200" cy="100" r="14" fill="#2a9d8f"/>
        <circle cx="280" cy="100" r="14" fill="#b5651d"/>
        <text x="12" y="22" fill="#2b2b2b" font-size="14">Conseil</text>
      </svg>`;
    default:
      return `<svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg"><rect width="400" height="200" fill="#eee"/></svg>`;
  }
}

function renderSceneArt(sceneKey) {
  const container = document.getElementById('art');
  container.innerHTML = '';
  const imgSrc = imageMap[state.character]?.[state.nodeId];
  if (imgSrc) {
    const img = new Image();
    img.alt = sceneKey + ' (illustration)';
    img.style.maxWidth = '100%';
    img.style.borderRadius = '10px';
    img.onload = () => { container.appendChild(img); };
    img.onerror = () => { container.innerHTML = sceneSVG(sceneKey); };
    img.src = imgSrc;
  } else {
    container.innerHTML = sceneSVG(sceneKey);
  }
}

// Données narratives
const story = {
  cortes: {
    start: { title: 'Cuba, 1519 — Lancer l’expédition', scene: 'port', text: [
        "Vous êtes Hernán Cortés, figure montante installée à Cuba. Des rumeurs d’un riche empire au continent éveillent les ambitions.",
        "Votre décision du jour déterminera l’ampleur de l’expédition."],
      choices: [
        { label: 'Armer rapidement 11 navires et 500 hommes', next: 'prep', effects: { ressources: +2, renommee: +1 } },
        { label: 'Attendre un mandat plus clair du gouverneur Velázquez', next: 'mandat', effects: { ressources: +1, renommee: -1 } },
      ], teacher: 'Objectifs : motivations économiques, rivalités coloniales, statut légal des expéditions.' },

    prep: { title: 'Préparatifs techniques', scene: 'port', text: [
        "Carènes, voiles, vivres, chevaux, arquebuses, pièces d’artillerie : l’inventaire s’allonge.",
        "Il faut des interprètes, des pilotes, et un plan de route."],
      choices: [
        { label: 'Priorité aux armes et à l’artillerie', next: 'sea', effects: { ressources: -1, foi: +1 } },
        { label: 'Renforcer la logistique (vivres, médecins)', next: 'sea', effects: { ressources: +1, moral: +1 } },
      ], teacher: 'Techniques de navigation et logistique au XVIe siècle.' },

    mandat: { title: 'Pressions politiques', scene: 'council', text: [
        "Le gouverneur Velázquez hésite et pourrait reprendre le commandement.",
        "Faut-il partir malgré tout ?"],
      choices: [
        { label: 'Partir sans attendre', next: 'sea', effects: { renommee: +1, alliances: -1 } },
        { label: 'Rester et négocier', next: 'prep', effects: { renommee: -1, ressources: +1 } },
      ], teacher: 'Statut juridique des capitulations et tensions locales.' },

    sea: { title: 'Traversée de l’Atlantique', scene: 'sea', text: [
        "La mer est capricieuse, les vivres s’épuisent, des tempêtes frappent.",
        "Vous atteignez la côte du golfe après escales aux îles."],
      choices: [
        { label: 'Débarquer prudemment et établir un camp fortifié', next: 'coast', effects: { ressources: +1, moral: +1 } },
        { label: 'Reconnaissance rapide vers l’intérieur', next: 'tabasco', effects: { informations: +1, ressources: -1 } },
      ], teacher: 'Routage maritime et risques.' },

    tabasco: { title: 'Potonchán — Rencontre maya', scene: 'coast', text: [
        "Résistance locale, échanges, et une figure clé : Malintzin (La Malinche).",
        "Un choix s’impose."],
      choices: [
        { label: 'Négocier et accepter des interprètes', next: 'malinche', effects: { alliances: +1 } },
        { label: 'Imposer par la force', next: 'malinche', effects: { moral: -1, renommee: -1 } },
      ], teacher: 'Rôle des interprètes et médiations culturelles.' },

    malinche: { title: 'Malintzin, clé linguistique', scene: 'codex', text: [
        "Grâce à Jerónimo de Aguilar et Malintzin, un pont linguistique se crée entre maya, nahuatl et espagnol."],
      choices: [
        { label: 'Respecter son rôle stratégique', next: 'tlaxcala', effects: { alliances: +1, informations: +1 } },
        { label: 'La cantonner aux traductions', next: 'tlaxcala', effects: { informations: +0 } },
      ], teacher: 'Langues et pouvoir.' },

    tlaxcala: { title: 'Vers Tlaxcala — Alliances', scene: 'council', text: [
        "Après des combats, Tlaxcala devient un allié crucial contre les Mexicas."],
      choices: [
        { label: 'Sceller une alliance égalitaire', next: 'cholula', effects: { alliances: +2 } },
        { label: 'Exiger des combattants et du tribut', next: 'cholula', effects: { alliances: +1, renommee: -1 } },
      ], teacher: 'Diplomatie inter-polities mésoaméricaines.' },

    cholula: { title: 'Cholula — Rumeurs de piège', scene: 'battle', text: [
        "On parle d’une embuscade. Réagir ?"],
      choices: [
        { label: 'Frapper préventivement', next: 'approche', effects: { renommee: -1, alliances: -1 } },
        { label: 'Désarmer l’embuscade par négociation', next: 'approche', effects: { alliances: +1 } },
      ], teacher: 'Controverses sur Cholula.' },

    approche: { title: 'Approche de Tenochtitlán', scene: 'tenochtitlan', text: [
        "Chaussées, temples, marchés : la capitale émerveille les compagnons."],
      choices: [
        { label: 'Entrer avec cérémonial et présents', next: 'rencontre', effects: { alliances: +1 } },
        { label: 'Afficher puissance et artillerie', next: 'rencontre', effects: { renommee: +1, alliances: -1 } },
      ], teacher: 'Urbanisme lacustre et économie.' },

    rencontre: { title: 'Rencontre avec Moctezuma II', scene: 'codex', text: [
        "Échanges de paroles et de cadeaux. La tension est palpable."],
      choices: [
        { label: 'Diplomatie et patience', next: 'hostage', effects: { alliances: +1 } },
        { label: 'Prendre Moctezuma en otage', next: 'hostage', effects: { renommee: +1, alliances: -2 } },
      ], teacher: 'Rituel et confrontation des codes.' },

    hostage: { title: 'Gouverner par procuration', scene: 'council', text: [
        "Moctezuma sous surveillance, tensions montantes parmi les nobles mexicas."],
      choices: [
        { label: 'Respecter les rituels pour apaiser', next: 'narvaez', effects: { alliances: +1 } },
        { label: 'Imposer des interdits sévères', next: 'narvaez', effects: { renommee: -1, alliances: -1 } },
      ], teacher: 'Colonialité et autorités locales.' },

    narvaez: { title: 'Arrivée de Narváez', scene: 'battle', text: [
        "Velázquez envoie Narváez vous arrêter. Double front : interne et externe."],
      choices: [
        { label: 'Négocier et intégrer ses troupes', next: 'toxcatl', effects: { ressources: +2, moral: +1 } },
        { label: 'Le vaincre de nuit', next: 'toxcatl', effects: { renommee: +1, ressources: +1 } },
      ], teacher: 'Conflits intra-espagnols.' },

    toxcatl: { title: 'Fête de Tóxcatl — Émeute', scene: 'battle', text: [
        "Une intervention contre les célébrations provoque une explosion de violences."],
      choices: [
        { label: 'Calmer et négocier', next: 'noche', effects: { alliances: +1 } },
        { label: 'Réprimer et se retrancher', next: 'noche', effects: { renommee: -1, moral: -1 } },
      ], teacher: 'Déclencheurs de la Noche Triste.' },

    noche: { title: 'Noche Triste — Retraite ou percée', scene: 'battle', text: [
        "Sous la pluie, la colonne tente la sortie par les chaussées."],
      choices: [
        { label: 'Alléger le trésor pour sauver des vies', next: 'repli', effects: { ressources: -2, moral: +1 } },
        { label: 'Conserver l’or, risquer des pertes', next: 'repli', effects: { ressources: 0, moral: -1 } },
      ], teacher: 'Dilemmes logistiques et moraux.' },

    repli: { title: 'Vers Tlaxcala — Reconstituer', scene: 'council', text: [
        "Des alliés restent fidèles. Le plan : revenir par le lac avec des brigantins."],
      choices: [
        { label: 'Assembler les brigantins et couper les ponts', next: 'siege', effects: { alliances: +1, ressources: +1 } },
        { label: 'Chercher plus d’alliés (Texcoco, Chalco)', next: 'siege', effects: { alliances: +2 } },
      ], teacher: 'Géostratégie lacustre.' },

    siege: { title: 'Siège de Tenochtitlán', scene: 'tenochtitlan', text: [
        "Quartiers par quartiers, la famine, les maladies, et l’avance des brigantins."],
      choices: [
        { label: 'Promettre clémence aux quartiers qui se rendent', next: 'fin', effects: { alliances: +1, renommee: +1 } },
        { label: 'Approche implacable', next: 'fin', effects: { renommee: +1, alliances: -2 } },
      ], teacher: 'Sièges et redditions.' },

    fin: { title: 'Fin — Chute et conséquences', scene: 'codex', text: [
        "La ville tombe. Les alliances indigènes ont joué un rôle majeur. Les conséquences humaines sont immenses."],
      choices: [
        { label: 'Rejouer le parcours', next: 'start', effects: {} },
        { label: 'Voir le bilan', next: 'ending_cortes', effects: {} }
      ], teacher: 'Bilan critique et voix multiples.' }
  },

  moctezuma: {
    start: { title: 'Tenochtitlán — Avant l’arrivée', scene: 'tenochtitlan', text: [
        "Vous êtes Moctezuma Xocoyotzin, Huey Tlatoani de l’empire mexica.",
        "Tributs, rituels, noblesse et prêtres structurent la cité."],
      choices: [
        { label: 'Renforcer les tributs et l’ordre', next: 'omens', effects: { autorite: +1, nobles: +1 } },
        { label: 'Apaiser par des réformes', next: 'omens', effects: { autorite: +0, faveur: +1 } },
      ], teacher: 'Organisation politique et sociale.' },

    omens: { title: 'Présages et rumeurs', scene: 'codex', text: [
        "Comètes, flammes au temple, êtres inconnus sur la mer : des signes inquiètent le peuple."],
      choices: [
        { label: 'Consulter prêtres et sages', next: 'first_reports', effects: { faveur: +1 } },
        { label: 'Ignorer les présages', next: 'first_reports', effects: { nobles: -1 } },
      ], teacher: 'Rôle du symbolique et du religieux.' },

    first_reports: { title: 'Premiers rapports', scene: 'coast', text: [
        "Des messagers parlent d’hommes aux peaux claires, montés sur des bêtes inconnues, armés de tonnerre."],
      choices: [
        { label: 'Envoyer des cadeaux et observer', next: 'cholula_side', effects: { informations: +1, faveur: +1 } },
        { label: 'Préparer la résistance', next: 'cholula_side', effects: { pretGuerrier: +1, nobles: +1 } },
      ], teacher: 'Diplomatie indirecte.' },

    cholula_side: { title: 'Cholula — Tensions', scene: 'council', text: [
        "Alliés et rivaux attendent une ligne claire : faut-il tendre un piège ou éviter l’affrontement ?"],
      choices: [
        { label: 'Éviter l’embuscade pour préserver le prestige', next: 'welcome', effects: { autorite: +1 } },
        { label: 'Autoriser une embuscade', next: 'welcome', effects: { pretGuerrier: +1, faveur: -1 } },
      ], teacher: 'Complexité des relations interurbaines.' },

    welcome: { title: 'Accueil de Cortés', scene: 'codex', text: [
        "Vous offrez présents et paroles choisies. Le protocole est déstabilisé par les usages étrangers."],
      choices: [
        { label: 'Hospitalité rituelle', next: 'hostage_side', effects: { faveur: +1 } },
        { label: 'Distance et prudence', next: 'hostage_side', effects: { informations: +1 } },
      ], teacher: 'Rituels et diplomatie.' },

    hostage_side: { title: 'Être « invité » sous contrainte', scene: 'council', text: [
        "Les Espagnols restreignent les rites. La noblesse gronde et exige une riposte."],
      choices: [
        { label: 'Apaiser pour éviter l’embrasement', next: 'toxcatl_side', effects: { autorite: -1, nobles: -1 } },
        { label: 'Encourager une action rapide', next: 'toxcatl_side', effects: { pretGuerrier: +1 } },
      ], teacher: 'Dilemmes d’autorité.' },

    toxcatl_side: { title: 'Fête de Tóxcatl — Coup et émeute', scene: 'battle', text: [
        "Une attaque contre les danseurs déclenche une insurrection."],
      choices: [
        { label: 'Tenter la médiation', next: 'noche_side', effects: { autorite: -1, faveur: +1 } },
        { label: 'Laisser les guerriers agir', next: 'noche_side', effects: { pretGuerrier: +1, informations: -1 } },
      ], teacher: 'Déclencheurs de la Noche Triste.' },

    noche_side: { title: 'Noche Triste — Piéger la retraite', scene: 'battle', text: [
        "Les chaussées s’ouvrent, les canoës encerclent. La pluie brouille la vue."],
      choices: [
        { label: 'Couper les ponts et harceler', next: 'siege_side', effects: { pretGuerrier: +1 } },
        { label: 'Laisser sortir pour éviter massacre', next: 'siege_side', effects: { faveur: +1, autorite: -1 } },
      ], teacher: 'Stratégies défensives.' },

    siege_side: { title: 'Après la retraite — Le siège', scene: 'tenochtitlan', text: [
        "La maladie frappe, la famine approche. Cuitláhuac puis Cuauhtémoc prennent le commandement."],
      choices: [
        { label: 'Défense mobile et canaux', next: 'fin_side', effects: { pretGuerrier: +1, informations: +1 } },
        { label: 'Résistance jusqu’au bout', next: 'fin_side', effects: { autorite: +1 } },
      ], teacher: 'Systèmes de défense lacustres.' },

    fin_side: { title: 'Fin — Chute et survivances', scene: 'codex', text: [
        "La capitale tombe. Les savoirs, langues et traditions survivent et se transforment."],
      choices: [
        { label: 'Rejouer le parcours', next: 'start', effects: {} },
        { label: 'Voir le bilan', next: 'ending_moc', effects: {} }
      ], teacher: 'Persistance culturelle, syncrétismes.' }
  }
};

// Calcul des bilans et fins dynamiques
function computeEnding(character, stats) {
  if (character === 'cortes') {
    const alliances = stats.alliances || 0;
    const renommee = stats.renommee || 0;
    const moral = stats.moral || 0;
    let title = 'Bilan de l’expédition de Cortés';
    let lines = [];
    if (alliances >= 3) lines.push('Les alliances indigènes ont été décisives : Tlaxcala, Texcoco et d’autres ont pesé sur l’issue.');
    else lines.push('L’isolement a coûté cher : sans alliés, la progression fut meurtrière et précaire.');
    if (renommee >= 3) lines.push('La renommée espagnole croît, mais la mémoire de la violence s’impose durablement.');
    if (moral <= 2) lines.push('Les pertes humaines ont été lourdes, particulièrement lors de la Noche Triste.');
    return { title, lines };
  } else {
    const autorite = stats.autorite || 0;
    const faveur = stats.faveur || 0;
    const pret = stats.pretGuerrier || 0;
    let title = 'Bilan du règne de Moctezuma et de la chute';
    let lines = [];
    if (autorite >= 5) lines.push('L’autorité centrale est restée forte, mais mise à l’épreuve par des crises inédites.');
    else lines.push('Les divisions internes ont fragilisé la réponse face aux étrangers.');
    if (faveur >= 5) lines.push('Les rituels et présages ont guidé des choix, parfois apaisants, parfois paralysants.');
    if (pret >= 4) lines.push('Les guerriers ont combattu avec ingéniosité sur les chaussées et les canaux.');
    return { title, lines };
  }
}

// Rendu des stats
function renderStats() {
  const hud = $('#hud');
  const statsDiv = $('#stats');
  statsDiv.innerHTML = '';
  const s = state.stats;
  const entries = Object.entries(s);
  entries.forEach(([k,v]) => {
    const el = document.createElement('div');
    el.className = 'stat';
    el.textContent = `${k.replace(/_/g,' ')} : ${v}`;
    statsDiv.appendChild(el);
  });
  hud.classList.remove('hidden');
}

function setNode(nodeKey) {
  // Endings if any (special key independent of story data)
  if (nodeKey && nodeKey.startsWith('ending_')) {
    const end = computeEnding(state.character, state.stats);
    const endPanel = document.getElementById('endings');
    endPanel.innerHTML = `<h2>${end.title}</h2>` + end.lines.map(l => `<p>${l}</p>`).join('');
    endPanel.classList.remove('hidden');
    return;
  }

  const charStory = story[state.character];
  const node = charStory[nodeKey];
  if (!node) return;
  state.nodeId = nodeKey;
  state.turn += 1;

  // HUD
  $('#chapter-title').textContent = node.title;
  $('#turn-count').textContent = `Tour ${state.turn}`;

  // Scene art (prefer images; fallback to SVG)
  renderSceneArt(node.scene);

  // Narrative
  const narrative = $('#narrative');
  narrative.innerHTML = '';
  node.text.forEach(p => {
    const el = document.createElement('p');
    el.textContent = p;
    narrative.appendChild(el);
  });

  // Choices
  const choices = $('#choices');
  choices.innerHTML = '';
  node.choices.forEach((c, i) => {
    const btn = document.createElement('button');
    btn.textContent = c.label;
    btn.className = i % 2 ? 'secondary' : '';
    btn.addEventListener('click', () => {
      // Apply effects
      Object.entries(c.effects || {}).forEach(([k, delta]) => {
        if (state.stats[k] == null) state.stats[k] = 0;
        state.stats[k] += delta;
      });
      renderStats();
      setNode(c.next);
      saveState();
    });
    choices.appendChild(btn);
  });

  // Teacher note
  const note = $('#teacher-note');
  note.textContent = node.teacher || '';
  note.classList.toggle('hidden', !node.teacher);

  // Hide endings panel during normal nodes
  $('#endings').classList.add('hidden');
  $('#endings').innerHTML = '';
}

function startGame(character) {
  state.character = character;
  state.stats = JSON.parse(JSON.stringify(baseStats[character]));
  state.turn = 0;
  $('#character-select').classList.add('hidden');
  $('#story').classList.remove('hidden');
  renderStats();
  setNode('start');
  saveState();
}

function resetGame() {
  state = { character: null, stats: {}, nodeId: null, turn: 0 };
  localStorage.removeItem('conquista_state');
  $('#character-select').classList.remove('hidden');
  $('#story').classList.add('hidden');
  $('#hud').classList.add('hidden');
}

function saveState() {
  localStorage.setItem('conquista_state', JSON.stringify(state));
}
function restoreState() {
  const s = localStorage.getItem('conquista_state');
  if (!s) return false;
  try {
    state = JSON.parse(s);
    $('#character-select').classList.add('hidden');
    $('#story').classList.remove('hidden');
    renderStats();
    setNode(state.nodeId || 'start');
    return true;
  } catch {}
  return false;
}

// UI wiring
function initUI() {
  // Scenes in character cards
  $('#scene-cortes').innerHTML = sceneSVG('port');
  $('#scene-moctezuma').innerHTML = sceneSVG('tenochtitlan');

  $$('#character-select .char-card').forEach(btn => {
    btn.addEventListener('click', () => startGame(btn.dataset.char));
  });

  $('#btn-reset').addEventListener('click', resetGame);

  const dlgSources = $('#dlg-sources');
  $('#btn-sources').addEventListener('click', () => dlgSources.showModal());
  $('#close-sources').addEventListener('click', () => dlgSources.close());

  const dlgGloss = $('#dlg-glossary');
  $('#btn-glossary').addEventListener('click', () => dlgGloss.showModal());
  $('#close-glossary').addEventListener('click', () => dlgGloss.close());
}

window.addEventListener('DOMContentLoaded', () => {
  initUI();
  if (!restoreState()) {
    // stay on selection
  }
});
