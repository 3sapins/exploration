// V2 Texte & Quiz — Cortés & Moctezuma
const $ = (sel)=>document.querySelector(sel); const $$=(sel)=>Array.from(document.querySelectorAll(sel));

// Image mapping — REMOTE only (style Renaissance / Codex)
// (no local placeholders; if offline, panel shows neutral background)
const imageMap = {
  cortes: {
    start: 'https://upload.wikimedia.org/wikipedia/commons/8/81/Aztec_Indians_Mexico_Tlaxcalan_Cortez.jpg', // Lienzo (rencontre), style colonial
    prep: 'https://upload.wikimedia.org/wikipedia/commons/8/81/Aztec_Indians_Mexico_Tlaxcalan_Cortez.jpg',
    mandat: 'https://upload.wikimedia.org/wikipedia/commons/2/21/Cortez_%26_La_Malinche.jpg',
    sea: 'https://upload.wikimedia.org/wikipedia/commons/5/51/Carraca_de_finales_del_siglo_XVI.jpg',
    tabasco: 'https://upload.wikimedia.org/wikipedia/commons/5/56/Malinche_Tlaxcala.jpg',
    malinche: 'https://upload.wikimedia.org/wikipedia/commons/5/56/Malinche_Tlaxcala.jpg',
    tlaxcala: 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Guerreros_tlaxcaltecas_junto_a_sus_aliados_espa%C3%B1oles_Lienzo_de_Tlaxcala._Siglo_XVI.jpg',
    cholula: 'https://upload.wikimedia.org/wikipedia/commons/8/8e/Matanza_de_Cholula_-_Lienzo_de_Tlaxcala.jpg',
    approche: 'https://upload.wikimedia.org/wikipedia/commons/8/81/Aztec_Indians_Mexico_Tlaxcalan_Cortez.jpg',
    rencontre: 'https://upload.wikimedia.org/wikipedia/commons/8/81/Aztec_Indians_Mexico_Tlaxcalan_Cortez.jpg',
    hostage: 'https://upload.wikimedia.org/wikipedia/commons/0/0b/Momento_en_el_que_Hern%C3%A1n_Cort%C3%A9s_es_capturado_en_la_batalla_de_Colhuacatonco%2C_en_el_Lienzo_de_Tlaxcala.jpg',
    narvaez: 'https://upload.wikimedia.org/wikipedia/commons/0/0b/Momento_en_el_que_Hern%C3%A1n_Cort%C3%A9s_es_capturado_en_la_batalla_de_Colhuacatonco%2C_en_el_Lienzo_de_Tlaxcala.jpg',
    toxcatl: 'https://upload.wikimedia.org/wikipedia/commons/b/b7/Batalla_en_la_cual_murieron_53_o_66_espa%C3%B1oles%2C_en_el_folio_67r_del_libro_XII.png',
    noche: 'https://upload.wikimedia.org/wikipedia/commons/f/f0/Temalacatitlan_-_batalla_de_Otumba.jpg',
    repli: 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Guerreros_tlaxcaltecas_junto_a_sus_aliados_espa%C3%B1oles_Lienzo_de_Tlaxcala._Siglo_XVI.jpg',
    siege: 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Guerreros_tlaxcaltecas_junto_a_sus_aliados_espa%C3%B1oles_Lienzo_de_Tlaxcala._Siglo_XVI.jpg',
    fin: 'https://upload.wikimedia.org/wikipedia/commons/8/81/Aztec_Indians_Mexico_Tlaxcalan_Cortez.jpg'
  },
  moctezuma: {
    start: 'https://media.getty.edu/iiif/image/b2f32b20-0a4e-406f-8efb-5d6e328ed5d7/full/pct:24,/0/default.jpg', // Codex florentin Book 12 folio 18v (rituels)
    omens: 'https://media.getty.edu/iiif/image/b2f32b20-0a4e-406f-8efb-5d6e328ed5d7/full/pct:24,/0/default.jpg',
    first_reports: 'https://media.getty.edu/iiif/image/c53e64c7-fb4e-4c92-9cd9-6b650608fd5c/full/pct:24,/0/default.jpg',
    cholula_side: 'https://upload.wikimedia.org/wikipedia/commons/8/8e/Matanza_de_Cholula_-_Lienzo_de_Tlaxcala.jpg',
    welcome: 'https://media.getty.edu/iiif/image/c53e64c7-fb4e-4c92-9cd9-6b650608fd5c/full/pct:24,/0/default.jpg',
    hostage_side: 'https://media.getty.edu/iiif/image/c53e64c7-fb4e-4c92-9cd9-6b650608fd5c/full/pct:24,/0/default.jpg',
    toxcatl_side: 'https://media.getty.edu/iiif/image/b2f32b20-0a4e-406f-8efb-5d6e328ed5d7/full/pct:24,/0/default.jpg',
    noche_side: 'https://enl.wired-humanities.org/sites/default/files/styles/large/public/mapaImages/FCBk12Ch23F40v00.png?itok=sYU4JzBj',
    siege_side: 'https://enl.wired-humanities.org/sites/default/files/styles/large/public/mapaImages/FCBk12Ch23F40v00.png?itok=sYU4JzBj',
    fin_side: 'https://media.getty.edu/iiif/image/c53e64c7-fb4e-4c92-9cd9-6b650608fd5c/full/pct:24,/0/default.jpg'
  }
};
const sourceLink = {
  moctezuma: {
    start:'https://florentinecodex.getty.edu/book/12/folio/18v',
    omens:'https://florentinecodex.getty.edu/book/12/folio/18v',
    first_reports:'https://florentinecodex.getty.edu/book/12/folio/32v',
    welcome:'https://florentinecodex.getty.edu/book/12/folio/32v',
    hostage_side:'https://florentinecodex.getty.edu/book/12/folio/32v',
    toxcatl_side:'https://florentinecodex.getty.edu/book/12/folio/18v',
    noche_side:'https://enl.wired-humanities.org/fcbk12ch23',
    siege_side:'https://enl.wired-humanities.org/fcbk12ch23'
  }
};

// Stats base (barres visuelles)
const baseStats = {
  cortes:{ moral:5, ressources:5, alliances:0, renommee:1, foi:3, informations:1 },
  moctezuma:{ autorite:5, faveur:4, nobles:3, informations:2, pretGuerrier:3 }
};
let state = { character:null, stats:{}, nodeId:null, turn:0, visited:[], journal:[] };

// Texte enrichi
const story = {
  cortes:{
    start:{title:'Cuba, 1519 — Lancer l’expédition', scene:'port', text:[
      'L’Espagne, sortie de la Reconquista, étend son empire. À Cuba, Hernán Cortés, hidalgo ambitieux, entend parler d’un empire puissant au cœur du continent, riche en or et en tribut.',
      'Les ambitions personnelles se mêlent aux objectifs de la Couronne : conquérir, convertir, s’enrichir. Le gouverneur Velázquez, prudent, veut garder la main sur les expéditions.'
    ], learn:[
      'Les **capitulations** encadrent légalement les expéditions (autorisations de la Couronne).',
      'Tensions **Cortés–Velázquez** : enjeu d’autorité coloniale et de prestige.'
    ], choices:[
      {label:'Armer rapidement 11 navires et 500 hommes', next:'prep', effects:{renommee:+1, ressources:+1}, consequence:[
        'Vous gagnez un avantage stratégique en partant vite, mais vous risquez d’irriter Velázquez.']},
      {label:'Attendre un mandat officiel', next:'mandat', effects:{ressources:+1, renommee:-1}, consequence:[
        'Vous sécurisez la légalité, mais vous perdez du temps et l’initiative.' ]}
    ], teacher:'Motivations économiques, rivalités coloniales, statut légal des expéditions.'},

    prep:{title:'Préparatifs techniques', scene:'port', text:[
      'Carènes, voiles, vivres, chevaux, arquebuses, artillerie : l’inventaire s’allonge. Les interprètes seront cruciaux pour naviguer entre langues et codes culturels.',
      'Le plan de route doit prévoir tempêtes, maladies et mutineries éventuelles.'
    ], learn:[
      'La **logistique** (vivres, soins, réparation) influe directement sur le **moral** et la capacité d’action.',
      'Les **interprètes** (Aguilar, Malintzin) seront stratégiques pour les alliances.'
    ], choices:[
      {label:'Priorité aux armes et à l’artillerie', next:'sea', effects:{ressources:-1, foi:+1}, consequence:['Vous augmentez la puissance de feu, mais pèse sur les vivres.']},
      {label:'Renforcer la logistique (vivres, médecins)', next:'sea', effects:{ressources:+1, moral:+1}, consequence:['Vous améliorez endurance et cohésion de la troupe.']}
    ], teacher:'Navigation et logistique au XVIe siècle.'},

    mandat:{title:'Pressions politiques', scene:'council', text:[
      'Velázquez hésite : reprendre le commandement ou confirmer votre rôle ? La rivalité personnelle se double d’un enjeu juridique.',
      'Partir sans mandat peut déclencher des poursuites ; attendre, c’est risquer d’être doublé.'
    ], learn:['Le **statut** des expéditions détermine la reconnaissance des prises et des tributs.'],
    choices:[
      {label:'Partir sans attendre', next:'sea', effects:{renommee:+1, alliances:-1}, consequence:['Initiative forte, mais isolement politique possible.']},
      {label:'Rester et négocier', next:'prep', effects:{ressources:+1, renommee:-1}, consequence:['Sécurité juridique, mais lenteur et perte d’avantage.']}
    ], teacher:'Capitulations et tensions locales.'},

    sea:{title:'Traversée de l’Atlantique', scene:'sea', text:[
      'La mer est capricieuse : vivres en baisse, tempêtes, fatigue. Les escales aux îles permettent de réparer, mais coûtent du temps et des ressources.',
      'La discipline à bord est essentielle : prévenir la mutinerie et maintenir le cap.'
    ], learn:['La **traversée** conditionne les premiers contacts et la capacité d’action à l’arrivée.'],
    choices:[
      {label:'Débarquer et fortifier un camp', next:'coast', effects:{ressources:+1, moral:+1}, consequence:['Base solide, meilleure protection, mais progression plus lente.']},
      {label:'Reconnaissance vers l’intérieur', next:'tabasco', effects:{informations:+1, ressources:-1}, consequence:['Vous gagnez des infos, mais vous vous exposez.']}
    ], teacher:'Routage maritime et risques.'},

    tabasco:{title:'Potonchán — Rencontre maya', scene:'coast', text:[
      'À Potonchán (Tabasco), les échanges sont âpres. Des interprètes peuvent changer l’issue : Jerónimo de Aguilar (maya/espagnol) et Malintzin (nahuatl/maya/espagnol).',
      'Le choix entre force et diplomatie aura des répercussions sur les alliances futures.'
    ], learn:['Les **alliances indigènes** sont déterminantes dans la suite de la conquête.'],
    choices:[
      {label:'Négocier et accepter des interprètes', next:'malinche', effects:{alliances:+1, informations:+1}, consequence:['Ponts linguistiques et diplomatiques ouverts.']},
      {label:'Imposer par la force', next:'malinche', effects:{moral:-1, renommee:-1}, consequence:['Gain immédiat de ressources, mais réputation dégradée.']}
    ], teacher:'Interprètes et médiations culturelles.'},

    malinche:{title:'Malintzin, clé linguistique', scene:'codex', text:[
      'Malintzin devient médiatrice cruciale : traductions, explications des codes, contacts politiques. Elle oriente des négociations et évite des quiproquos mortels.',
      'Son rôle, souvent réduit à la “traduction”, est en réalité stratégique.'
    ], learn:['La **médiation** linguistique et culturelle influe sur les **alliances** et l’issue des conflits.'],
    choices:[
      {label:'Respecter son rôle stratégique', next:'tlaxcala', effects:{alliances:+1, informations:+1}, consequence:['Alliances facilitées, meilleure compréhension des forces en présence.']},
      {label:'La cantonner aux traductions', next:'tlaxcala', effects:{}, consequence:['Rôle limité, vous perdez en finesse diplomatique.']}
    ], teacher:'Langues et pouvoir.'},

    tlaxcala:{title:'Vers Tlaxcala — Alliances', scene:'council', text:[
      'Après des combats, Tlaxcala devient un allié contre les Mexicas. Les motivations tlaxcalteques mêlent rivalités régionales et opportunités politiques.',
      'Une alliance équilibrée renforce la légitimité et l’effectif.'
    ], learn:['Sans **alliés indigènes**, la progression espagnole serait quasi impossible.'],
    choices:[
      {label:'Alliance égalitaire', next:'cholula', effects:{alliances:+2}, consequence:['Confiance accrue, appui durable.']},
      {label:'Exiger tribut et combattants', next:'cholula', effects:{alliances:+1, renommee:-1}, consequence:['Appui plus contraint, risque de ressentiment.']}
    ], teacher:'Diplomatie mésoaméricaine.'},

    cholula:{title:'Cholula — Rumeurs de piège', scene:'battle', text:[
      'Des rumeurs annoncent une embuscade. L’histoire garde la trace de versions contradictoires sur ce qui s’y est joué.',
      'Frapper préventivement peut terroriser, négocier peut éviter le massacre.'
    ], learn:['Cholula reste un **épisode controversé** (sources espagnoles vs nahuas).'],
    choices:[
      {label:'Frappe préventive', next:'approche', effects:{renommee:-1, alliances:-1}, consequence:['Peur inspirée, mais réputation entachée et alliés refroidis.']},
      {label:'Désarmer par négociation', next:'approche', effects:{alliances:+1}, consequence:['Crédibilité diplomatique renforcée.']}
    ], teacher:'Controverses sur Cholula.'},

    approche:{title:'Approche de Tenochtitlán', scene:'tenochtitlan', text:[
      'Les chaussées sur le lac, les marchés, les temples : la capitale stupéfie les compagnons. La richesse et l’organisation témoignent d’un pouvoir central puissant.',
      'La manière d’entrer conditionnera les réactions mexicas.'
    ], learn:['Tenochtitlán : **urbanisme lacustre**, économie complexe, symboles de pouvoir.'],
    choices:[
      {label:'Cérémonial et présents', next:'rencontre', effects:{alliances:+1}, consequence:['Respect des codes, tension réduite.']},
      {label:'Afficher artillerie et puissance', next:'rencontre', effects:{renommee:+1, alliances:-1}, consequence:['Dissuasion, mais arrogance perçue.']}
    ], teacher:'Urbanisme et économie.'},

    rencontre:{title:'Rencontre avec Moctezuma II', scene:'codex', text:[
      'Échanges de paroles et de cadeaux, mais incompréhensions : interprétations des signes, symboles de pouvoir, protocoles divergents.',
      'Le choix entre patience et coercition aura des effets durables.'
    ], learn:['Rencontres interculturelles : **codes** et **symboles** peuvent créer des quiproquos.'],
    choices:[
      {label:'Diplomatie et patience', next:'hostage', effects:{alliances:+1}, consequence:['Dialogue prolongé, tensions ajournées.']},
      {label:'Prendre Moctezuma en otage', next:'hostage', effects:{renommee:+1, alliances:-2}, consequence:['Contrôle immédiat, mais hostilité accrue.']}
    ], teacher:'Rituel et confrontation des codes.'},

    hostage:{title:'Gouverner par procuration', scene:'council', text:[
      'Moctezuma sous surveillance : les nobles mexicas s’indignent, les rites sont restreints. Gouverner sans légitimité locale fragilise l’ordre.',
      'Faut-il ménager les rituels ou imposer des interdits ?'
    ], learn:['La **légitimité** ne se décrète pas : elle se négocie avec les autorités locales.'],
    choices:[
      {label:'Respecter les rituels', next:'narvaez', effects:{alliances:+1}, consequence:['Tensions apaisées, coopération partielle.']},
      {label:'Interdits sévères', next:'narvaez', effects:{renommee:-1, alliances:-1}, consequence:['Révolte probable, image dégradée.']}
    ], teacher:'Colonialité et autorités locales.'},

    narvaez:{title:'Arrivée de Narváez', scene:'battle', text:[
      'Velázquez envoie Narváez vous arrêter. La rivalité hispano-hispanique fragilise votre position : faut-il négocier ou vaincre ?'
    ], learn:['Les **conflits internes** minent la capacité d’action de l’expédition.'],
    choices:[
      {label:'Négocier et intégrer ses troupes', next:'toxcatl', effects:{ressources:+2, moral:+1}, consequence:['Effectifs renforcés, cohésion accrue.']},
      {label:'Le vaincre de nuit', next:'toxcatl', effects:{renommee:+1, ressources:+1}, consequence:['Victoire rapide, mais rancœurs durables.']}
    ], teacher:'Conflits intra-espagnols.'},

    toxcatl:{title:'Fête de Tóxcatl — Émeute', scene:'battle', text:[
      'Une intervention contre les célébrations déclenche des violences. Les versions divergent sur les responsabilités et la chronologie.',
      'Réprimer accroît la haine ; négocier demande du temps et de la confiance.'
    ], learn:['**Tóxcatl** est un déclencheur majeur de la **Noche Triste**.'],
    choices:[
      {label:'Calmer et négocier', next:'noche', effects:{alliances:+1}, consequence:['Tension réduite, fenêtre de dialogue.']},
      {label:'Réprimer et se retrancher', next:'noche', effects:{renommee:-1, moral:-1}, consequence:['Escalade de violence, pertes humaines.']}
    ], teacher:'Déclencheurs de la Noche Triste.'},

    noche:{title:'Noche Triste — Retraite ou percée', scene:'battle', text:[
      'Sous la pluie, tentative de sortie par les chaussées : panique, charges, pertes lourdes. Dilemme : l’or ou les vies.'
    ], learn:['La **logistique** et le **moral** pèsent sur le succès d’une retraite.'],
    choices:[
      {label:'Alléger l’or, sauver des vies', next:'repli', effects:{ressources:-2, moral:+1}, consequence:['Colonne plus mobile, pertes réduites.']},
      {label:'Conserver l’or, risquer des pertes', next:'repli', effects:{moral:-1}, consequence:['Charge lourde, vulnérabilité accrue.']}
    ], teacher:'Dilemmes logistiques et moraux.'},

    repli:{title:'Vers Tlaxcala — Reconstituer', scene:'council', text:[
      'Les alliés tlaxcalteques demeurent essentiels. Projet : construire des brigantins et contrôler le lac, couper les ponts.'
    ], learn:['La **maîtrise du lac** change l’équilibre tactique.'],
    choices:[
      {label:'Assembler les brigantins', next:'siege', effects:{alliances:+1, ressources:+1}, consequence:['Mobilité sur le lac, avantage tactique.']},
      {label:'Chercher plus d’alliés', next:'siege', effects:{alliances:+2}, consequence:['Réseau élargi, légitimité accrue.']}
    ], teacher:'Géostratégie lacustre.'},

    siege:{title:'Siège de Tenochtitlán', scene:'tenochtitlan', text:[
      'Quartier par quartier, famine et maladies frappent. Les brigantins coupent les approvisionnements. Les redditions se négocient, mais la souffrance est massive.'
    ], learn:['Les **redditions** et **alliances** conditionnent la fin du siège.'],
    choices:[
      {label:'Promettre clémence', next:'fin', effects:{alliances:+1, renommee:+1}, consequence:['Capitulations plus nombreuses, mémoire moins infamante.']},
      {label:'Approche implacable', next:'fin', effects:{renommee:+1, alliances:-2}, consequence:['Victoire rapide, mémoire de la violence.']}
    ], teacher:'Sièges et redditions.'},

    fin:{title:'Fin — Chute et conséquences', scene:'codex', text:[
      'La ville tombe. Les alliances indigènes ont été décisives. Les conséquences humaines sont immenses : pertes, déplacements, transformations culturelles.'
    ], learn:['La **mémoire** de la conquête se construit à partir de **sources multiples** (espagnoles et nahuas).'],
    choices:[
      {label:'Rejouer', next:'start', effects:{}},
      {label:'Voir le bilan', next:'ending_cortes', effects:{}}
    ], teacher:'Bilan critique et voix multiples.'}
  },

  moctezuma:{
    start:{title:'Tenochtitlán — Avant l’arrivée (1519)', scene:'tenochtitlan', text:[
      'Moctezuma Xocoyotzin gouverne un empire structuré par tributs, rites et hiérarchies. Le pouvoir central s’appuie sur les marchés, les prêtres et la noblesse.',
      'L’arrivée d’étrangers bouscule les repères cosmologiques et politiques.'
    ], learn:['Le **tribut** et le **rituel** légitiment l’autorité du Huey Tlatoani.'],
    choices:[
      {label:'Renforcer tributs et ordre', next:'omens', effects:{autorite:+1, nobles:+1}, consequence:['Autorité réaffirmée, mais tensions sociales.']},
      {label:'Apaiser par des réformes', next:'omens', effects:{faveur:+1}, consequence:['Soutien populaire accru, mais image de fermeté amoindrie.']}
    ], teacher:'Organisation politique et sociale.'},

    omens:{title:'Présages et rumeurs', scene:'codex', text:[
      'Comètes, flammes au temple, rumeurs d’êtres venus de l’est. Dans la cosmologie mexica, ces signes peuvent annoncer la colère des dieux ou un changement d’ère.',
      'Moctezuma doit rassurer le peuple et la noblesse.'
    ], learn:['Les **présages** influencent la **décision politique** dans les sociétés nahuas.'],
    choices:[
      {label:'Consulter prêtres et sages', next:'first_reports', effects:{faveur:+1}, consequence:['Légitimité religieuse renforcée.']},
      {label:'Ignorer les présages', next:'first_reports', effects:{nobles:-1}, consequence:['Panique contenue, mais autorité spirituelle fragilisée.']}
    ], teacher:'Rôle du symbolique et du religieux.'},

    first_reports:{title:'Premiers rapports', scene:'coast', text:[
      'Des messagers décrivent des hommes aux peaux claires, montés sur des bêtes inconnues (chevaux), armés de “tonnerre” (armes à feu).',
      'Faut-il accueillir avec présents pour observer, ou préparer la résistance ?'
    ], learn:['La **diplomatie indirecte** (cadeaux, observation) permet d’évaluer l’adversaire.'],
    choices:[
      {label:'Envoyer des cadeaux et observer', next:'cholula_side', effects:{informations:+1, faveur:+1}, consequence:['Reconnaissance prudente, protocole respecté.']},
      {label:'Préparer la résistance', next:'cholula_side', effects:{pretGuerrier:+1, nobles:+1}, consequence:['Posture ferme, mobilisation accrue.']}
    ], teacher:'Diplomatie indirecte.'},

    cholula_side:{title:'Cholula — Tensions', scene:'council', text:[
      'Faut-il tendre un piège à Cholula ou éviter l’affrontement pour préserver le prestige ? Les avis divergent parmi nobles et prêtres.',
      'Un piège compromet le protocole ; l’éviter sauvegarde l’image, mais peut laisser l’initiative aux étrangers.'
    ], learn:['Le **prestige** et l’**image** sont des ressources politiques.'],
    choices:[
      {label:'Éviter l’embuscade', next:'welcome', effects:{autorite:+1}, consequence:['Protocole préservé, image stable.']},
      {label:'Autoriser une embuscade', next:'welcome', effects:{pretGuerrier:+1, faveur:-1}, consequence:['Posture guerrière, mais atteinte au prestige rituel.']}
    ], teacher:'Relations interurbaines.'},

    welcome:{title:'Accueil de Cortés', scene:'codex', text:[
      'Présents et paroles choisies. Le protocole mexica rencontre des usages étrangers ; les symboles ne sont pas lus de la même manière.',
      'L’hospitalité peut canaliser la tension ; la distance préserve la sécurité.'
    ], learn:['Les **codes d’accueil** structurent les relations diplomatiques.'],
    choices:[
      {label:'Hospitalité rituelle', next:'hostage_side', effects:{faveur:+1}, consequence:['Tension réduite, protocole respecté.']},
      {label:'Distance et prudence', next:'hostage_side', effects:{informations:+1}, consequence:['Observation accrue, sécurité renforcée.']}
    ], teacher:'Rituels et diplomatie.'},

    hostage_side:{title:'Être « invité » sous contrainte', scene:'council', text:[
      'Les étrangers restreignent les rites. La noblesse exige une riposte. Moctezuma doit arbitrer entre apaisement et action rapide.',
      'Apaiser limite l’embrasement ; encourager l’action renforce la préparation guerrière.'
    ], learn:['**Autorité** en crise : arbitrer entre autorités religieuses, nobles et sécurité.'],
    choices:[
      {label:'Apaiser pour éviter l’embrasement', next:'toxcatl_side', effects:{autorite:-1, nobles:-1}, consequence:['Tensions internes, mais violence contenue.']},
      {label:'Encourager une action rapide', next:'toxcatl_side', effects:{pretGuerrier:+1}, consequence:['Mobilisation militaire, risque d’escalade.']}
    ], teacher:'Dilemmes d’autorité.'},

    toxcatl_side:{title:'Tóxcatl — Coup et émeute', scene:'battle', text:[
      'Une attaque contre les danseurs déclenche une insurrection. Les responsabilités restent débattues selon les sources.',
      'Médiation : préserver des vies et des rites. Laisser agir : reprendre l’initiative militaire.'
    ], learn:['Déclencheur majeur de la **Noche Triste**.'],
    choices:[
      {label:'Tenter la médiation', next:'noche_side', effects:{autorite:-1, faveur:+1}, consequence:['Dialogue fragile, temps gagné.']},
      {label:'Laisser les guerriers agir', next:'noche_side', effects:{pretGuerrier:+1, informations:-1}, consequence:['Capacité de riposte, mais moins d’informations.']}
    ], teacher:'Déclencheurs de la Noche Triste.'},

    noche_side:{title:'Noche Triste — Piéger la retraite', scene:'battle', text:[
      'Les chaussées s’ouvrent, les canoës harcèlent sous la pluie. Les étrangers, encombrés, subissent de lourdes pertes.',
      'Faut-il couper les ponts et harceler, ou laisser sortir pour éviter un massacre au cœur de la ville ?'
    ], learn:['**Géostratégie** lacustre : couper ponts et voies, harceler sur l’eau.'],
    choices:[
      {label:'Couper les ponts et harceler', next:'siege_side', effects:{pretGuerrier:+1}, consequence:['Pertes infligées, isolement de l’ennemi.']},
      {label:'Laisser sortir pour éviter massacre', next:'siege_side', effects:{faveur:+1, autorite:-1}, consequence:['Moins de morts en ville, mais image de faiblesse.']}
    ], teacher:'Stratégies défensives.'},

    siege_side:{title:'Après la retraite — Le siège', scene:'tenochtitlan', text:[
      'La maladie frappe, la famine approche. Cuitláhuac puis Cuauhtémoc prennent le commandement. Défenses mobiles sur canaux, résistance prolongée.',
      'Le coût humain est immense ; la résilience se manifeste dans l’organisation de la défense.'
    ], learn:['**Résilience** mexica : tactiques sur canaux, redistribution des rôles.'],
    choices:[
      {label:'Défense mobile et canaux', next:'fin_side', effects:{pretGuerrier:+1, informations:+1}, consequence:['Harceler, éviter l’encerclement.']},
      {label:'Résistance jusqu’au bout', next:'fin_side', effects:{autorite:+1}, consequence:['Refus de capituler, coût humain élevé.']}
    ], teacher:'Systèmes de défense lacustres.'},

    fin_side:{title:'Fin — Chute et survivances', scene:'codex', text:[
      'La capitale tombe. Savoirs, langues et traditions survivent et se transforment : syncrétismes, continuités nahuas, recompositions politiques.'
    ], learn:['La **culture** ne disparaît pas : elle se **transforme** et se **transmet**.'],
    choices:[
      {label:'Rejouer', next:'start', effects:{}},
      {label:'Voir le bilan', next:'ending_moc', effects:{}}
    ], teacher:'Persistance culturelle.'}
  }
};

// Fins dynamiques
function computeEnding(character, stats){
  if(character==='cortes'){
    const {alliances=0, renommee=0, moral=0}=stats; const lines=[]; const title='Bilan — Cortés';
    lines.push(alliances>=3? 'Alliances indigènes décisives (Tlaxcala, Texcoco…) — effet structurant sur l’issue.' : 'Isolement coûteux : progression meurtrière et précaire.');
    lines.push(renommee>=3? 'Renommée espagnole accrue, mais mémoire durable de la violence.' : 'Renommée limitée, dépendance accrue aux alliés.');
    if(moral<=2) lines.push('Pertes humaines lourdes, particulièrement lors de la Noche Triste.');
    return {title, lines};
  } else {
    const {autorite=0, faveur=0, pretGuerrier=0}=stats; const lines=[]; const title='Bilan — Moctezuma';
    lines.push(autorite>=5? 'Autorité centrale forte mais éprouvée par des crises inédites.' : 'Divisions internes qui fragilisent la réponse.');
    lines.push(faveur>=5? 'Rituels et présages ont guidé des choix, parfois apaisants, parfois paralysants.' : 'Le rituel n’a pas suffi à stabiliser la cité.');
    if(pretGuerrier>=4) lines.push('Guerriers ingénieux sur chaussées et canaux (harcèlement, défense mobile).');
    return {title, lines};
  }
}

// Quiz (intégré en fin de parcours)
const quizzes = {
  cortes:[
    {q:'Pourquoi Cortés veut-il partir rapidement de Cuba en 1519 ?', opts:['Pour respecter les délais imposés par la Couronne','Pour devancer les rivaux et saisir l’opportunité d’un empire riche','Parce que Velázquez le lui ordonne'], ans:1},
    {q:'Quel rôle joue Malintzin (La Malinche) ?', opts:['Capitaine des brigantins','Médiatrice linguistique et culturelle stratégique','Gouverneur de Veracruz'], ans:1},
    {q:'Qu’est-ce qui déclenche la Noche Triste ?', opts:['Une tempête sur le lac','Les tensions liées à Tóxcatl et l’hostilité grandissante','La famine dans Tlaxcala'], ans:1},
    {q:'Sans alliés indigènes (Tlaxcala, etc.), la conquête :', opts:['Aurait été facile','Aurait été très compromise','Aurait été identique'], ans:1}
  ],
  moctezuma:[
    {q:'Les présages (comètes, flammes, rumeurs) :', opts:['N’ont aucune importance politique','Influencent la décision et le rituel','Garantissent la victoire mexica'], ans:1},
    {q:'À Cholula, éviter l’embuscade :', opts:['Préserve le prestige rituel','Affaiblit l’autorité automatiquement','Assure la capitulation immédiate des étrangers'], ans:0},
    {q:'Pendant la Noche Triste, couper les ponts :', opts:['N’a aucun effet','Permet de harceler et isoler l’ennemi','Renforce les approvisionnements des étrangers'], ans:1},
    {q:'Après la chute, les cultures nahuas :', opts:['Disparaissent complètement','Se transforment et se transmettent (syncrétismes)','Restent strictement identiques'], ans:1}
  ]
};

// Rendu des stats (barres)
function renderBars(){
  const statsDiv = $('#stats'); statsDiv.innerHTML='';
  const s = state.stats; const entries = Object.entries(s);
  entries.forEach(([k,v])=>{
    const wrap = document.createElement('div'); wrap.className='stat';
    const h4 = document.createElement('h4'); h4.textContent = k.replace(/_/g,' ');
    const bar = document.createElement('div'); bar.className='bar';
    const span = document.createElement('span'); span.style.width = `${Math.max(0,Math.min(6,v))/6*100}%`;
    bar.appendChild(span); wrap.appendChild(h4); wrap.appendChild(bar); statsDiv.appendChild(wrap);
  });
}

function showFeedback(effects, consequence){
  const f = $('#feedback'); if(!effects||Object.keys(effects).length===0){ f.classList.add('hidden'); return; }
  const lines = Object.entries(effects).map(([k,delta])=>{ const arrow = delta>0? '↑' : (delta<0? '↓' : '→'); return `${k.replace(/_/g,' ')} ${arrow} ${delta>0? '+'+delta: delta}`; });
  const extra = consequence && consequence.length? ' — ' + consequence.join(' ') : '';
  f.textContent = 'Conséquence : ' + lines.join(' · ') + extra;
  f.classList.remove('hidden');
}

function renderImage(sceneKey){
  const container = $('#art'); const credits = $('#credits'); container.innerHTML=''; credits.classList.add('hidden'); credits.innerHTML='';
  const src = imageMap[state.character]?.[state.nodeId];
  if(src){
    const img = new Image(); img.alt = sceneKey + ' (illustration historique)'; img.onload=()=>{ container.appendChild(img); }; img.onerror=()=>{
      container.innerHTML = `<div style="padding:2rem; color:#555">Illustration non chargée — mode texte.</div>`;
    }; img.src = src;
    const link = sourceLink[state.character]?.[state.nodeId];
    if(link){ credits.innerHTML = `<span>Voir le folio / source.</span> <button class="link" id="btn-open-source">Ouvrir</button>`; credits.classList.remove('hidden'); setTimeout(()=>{ const b=$('#btn-open-source'); if(b) b.onclick=()=>window.open(link,'_blank'); },0); }
  } else {
    container.innerHTML = `<div style="padding:2rem; color:#555">Mode texte (aucun visuel requis).</div>`;
  }
}

function renderMinimap(){
  const mm = $('#minimap'); mm.innerHTML=''; const nodesDiv = document.createElement('div'); nodesDiv.className='nodes';
  const seq = state.character==='cortes'? ['start','prep','mandat','sea','tabasco','malinche','tlaxcala','cholula','approche','rencontre','hostage','narvaez','toxcatl','noche','repli','siege','fin']
                                       : ['start','omens','first_reports','cholula_side','welcome','hostage_side','toxcatl_side','noche_side','siege_side','fin_side'];
  seq.forEach(id=>{ const n = document.createElement('span'); n.className='node'; n.textContent=id.replace(/_/g,' ');
    if(state.nodeId===id) n.classList.add('current'); if(state.visited.includes(id)) n.classList.add('visited');
    n.title = 'Aller à ' + n.textContent; n.onclick = ()=>{ if(state.visited.includes(id)) setNode(id); };
    nodesDiv.appendChild(n);
  }); mm.appendChild(nodesDiv);
}

function addJournalEntry(nodeTitle, choiceLabel){ const entry = `${state.turn}. ${nodeTitle} → choix : ${choiceLabel}`; state.journal.push(entry); saveState(); }
function renderJournal(){ const panel = $('#journal-panel'); const list = $('#journal-list'); list.innerHTML=''; state.journal.forEach(line=>{ const li=document.createElement('li'); li.textContent=line; list.appendChild(li); }); }
function downloadJournal(){ const blob = new Blob([state.journal.join('\n')], {type:'text/plain'}); const url = URL.createObjectURL(blob); const a=document.createElement('a'); a.href=url; a.download='journal_conquista.txt'; a.click(); setTimeout(()=>URL.revokeObjectURL(url),5000); }

function renderLearn(node){ const box = $('#learn'); if(node.learn && node.learn.length){ box.innerHTML = `<h4>À retenir</h4>` + node.learn.map(l=>`<p>• ${l}</p>`).join(''); box.classList.remove('hidden'); } else { box.classList.add('hidden'); box.innerHTML=''; } }
function renderHUD(node){ $('#chapter-title').textContent = node.title; $('#turn-count').textContent = `Tour ${state.turn}`; renderBars(); }

function setNode(nodeKey){
  if(nodeKey && nodeKey.startsWith('ending_')){
    const end=computeEnding(state.character,state.stats); const endPanel=$('#endings');
    endPanel.innerHTML = `<h2>${end.title}</h2>` + end.lines.map(l=>`<p>${l}</p>`).join(''); endPanel.classList.remove('hidden');
    renderQuiz(state.character); return;
  }
  const charStory = story[state.character]; const node = charStory[nodeKey]; if(!node) return;
  state.nodeId = nodeKey; if(!state.visited.includes(nodeKey)) state.visited.push(nodeKey); state.turn += 1;
  $('#character-select').classList.add('hidden'); $('#hud').classList.remove('hidden'); $('#story').classList.remove('hidden'); $('#quiz').classList.add('hidden'); $('#endings').classList.add('hidden');
  renderHUD(node); renderImage(node.scene); renderMinimap(); renderLearn(node);
  const narrative = $('#narrative'); narrative.innerHTML=''; node.text.forEach(p=>{ const el=document.createElement('p'); el.textContent=p; narrative.appendChild(el); });
  const choices = $('#choices'); choices.innerHTML=''; node.choices.forEach((c,i)=>{ const btn=document.createElement('button'); btn.textContent=c.label; btn.className=i%2?'secondary':'';
    btn.onclick = ()=>{ Object.entries(c.effects||{}).forEach(([k,delta])=>{ if(state.stats[k]==null) state.stats[k]=0; state.stats[k]+=delta; });
      showFeedback(c.effects, c.consequence); renderBars(); addJournalEntry(node.title, c.label); setNode(c.next); saveState(); };
    choices.appendChild(btn); });
  const note = $('#teacher-note'); note.textContent = node.teacher||''; note.classList.toggle('hidden', !node.teacher);
}

function renderQuiz(character){
  const quizPanel = $('#quiz'); const form = $('#quiz-form'); const res = $('#quiz-result'); form.innerHTML=''; res.classList.add('hidden'); res.innerHTML='';
  const qs = quizzes[character]; qs.forEach((q,i)=>{ const wrap = document.createElement('div'); wrap.className='q'; const h4=document.createElement('h4'); h4.textContent = `Q${i+1}. ${q.q}`; wrap.appendChild(h4); const opts=document.createElement('div'); opts.className='opts';
    q.opts.forEach((opt,idx)=>{ const id=`q_${i}_${idx}`; const lab=document.createElement('label'); lab.htmlFor=id; const radio=document.createElement('input'); radio.type='radio'; radio.name=`q_${i}`; radio.id=id; radio.value=idx; lab.appendChild(radio); lab.appendChild(document.createTextNode(' '+opt)); opts.appendChild(lab); });
    wrap.appendChild(opts); form.appendChild(wrap); });
  quizPanel.classList.remove('hidden');
  $('#btn-submit-quiz').onclick = ()=>{ let score=0; let total=qs.length; qs.forEach((q,i)=>{ const sel = form.querySelector(`input[name="q_${i}"]:checked`); if(sel && Number(sel.value)===q.ans) score+=1; }); res.textContent = `Score : ${score} / ${total}`; res.classList.remove('hidden'); };
  $('#btn-replay').onclick = ()=>{ resetGame(); };
}

function startGame(character){ state.character=character; state.stats=JSON.parse(JSON.stringify(baseStats[character])); state.turn=0; state.visited=[]; state.journal=[]; renderBars(); setNode('start'); saveState(); }
function resetGame(){ state={character:null, stats:{}, nodeId:null, turn:0, visited:[], journal:[]}; localStorage.removeItem('conquista_v2_textquiz_state'); location.reload(); }
function saveState(){ localStorage.setItem('conquista_v2_textquiz_state', JSON.stringify(state)); }
function restoreState(){ const s=localStorage.getItem('conquista_v2_textquiz_state'); if(!s) return false; try{ state=JSON.parse(s); return true; }catch{ return false; } }

function initUI(){
  $$('#character-select .char-card').forEach(btn=> btn.onclick=()=> startGame(btn.dataset.char));
  $('#btn-reset').onclick = resetGame; $('#btn-sources').onclick=()=> $('#dlg-sources').showModal(); $('#close-sources').onclick=()=> $('#dlg-sources').close();
  $('#btn-glossary').onclick=()=> $('#dlg-glossary').showModal(); $('#close-glossary').onclick=()=> $('#dlg-glossary').close();
  $('#btn-journal').onclick=()=>{ renderJournal(); $('#journal-panel').classList.toggle('hidden'); };
  $('#btn-download-journal').onclick = downloadJournal;
}

window.addEventListener('DOMContentLoaded', ()=>{ initUI(); if(restoreState() && state.character){ $('#character-select').classList.add('hidden'); $('#hud').classList.remove('hidden'); $('#story').classList.remove('hidden'); renderBars(); renderMinimap(); setNode(state.nodeId||'start'); } });
