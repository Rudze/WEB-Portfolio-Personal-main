'use strict';

/**
 * Lightweight i18n.
 *
 * English is the source language and lives directly in the HTML.
 * Elements opt in with:
 *   data-i18n="key"          → innerHTML
 *   data-i18n-aria="key"     → aria-label
 *   data-i18n-alt="key"      → alt
 *
 * English strings are captured from the DOM on load, so only the French
 * dictionary has to be maintained below.
 */

const I18N = (() => {

  const STORAGE_KEY = 'lang';
  const LANGS = ['en', 'fr'];

  const fr = {
    "meta.title": "Portfolio Rudy",
    "sidebar.role": "Ingénieur systèmes",
    "sidebar.showContacts": "Voir les contacts",
    "sidebar.mail": "Mail",
    "sidebar.birthday": "Anniversaire",
    "sidebar.birthdate": "17 Août 2001",
    "sidebar.location": "Localisation",
    "nav.about": "À propos",
    "nav.resume": "CV",
    "about.hello": "Salut, moi c’est Rudy 👋",
    "about.avatarAlt": "Rudy en train de travailler sur son Mac",
    "about.age": "Âge :",
    "about.years": "ans",
    "about.location": "Localisation :",
    "about.nationality": "Nationalité :",
    "about.french": "Française",
    "about.linux.title": "🔧 Administrateur système Linux 🐧",
    "about.linux.p1": "Administrateur système spécialisé Linux, orienté exploitation, fiabilité et performance des environnements systèmes.",
    "about.linux.p2": "Formé en ingénierie système au CESI.",
    "about.linux.p3": "Plus de détails disponibles sur la page CV.",
    "about.it.title": "💻 Informatique & infrastructures",
    "about.it.p1": "Passionné par l’informatique et les technologies open source, je conçois et maintiens des infrastructures robustes et efficaces.",
    "about.it.p2": "J’aime transformer des besoins techniques en solutions concrètes.",
    "about.sport.title": "🏋️ Discipline & sport",
    "about.sport.p1": "Je pratique la <a href=\"https://fr.wikipedia.org/wiki/Force_athl%C3%A9tique\" class=\"inline-link\" target=\"_blank\">force athlétique</a>, à bon niveau, un sport qui renforce rigueur, constance et dépassement de soi.",
    "about.community.title": "🌐 Communauté & projets",
    "about.community.p1": "J’anime une communauté Discord autour de projets techniques et de serveurs que je développe et administre.",
    "about.community.p2": "<a href=\"https://discord.gg/6ffyCYq3Ea\" class=\"inline-link\" target=\"_blank\">Rejoindre le serveur Discord</a>",
    "about.contact.p1": "Un projet ou une question ? <a href=\"mailto:rudy@galaxynetwork.fr\" class=\"inline-link\">Contactez-moi</a>.",
    "resume.education": "Formation",
    "resume.experience": "Expérience",
    "resume.skills": "Compétences techniques",
    "edu1.title": "Manager en Infrastructures et Cybersécurité des SI en alternance",
    "edu2.title": "Administrateur Systèmes et Réseaux en alternance",
    "edu3.title": "Services Informatiques aux Organisations",
    "edu4.title": "Métiers de l’ÉLectricité et de ses Environnements Connectés",
    "tl.profile.workstudy": "<ion-icon name=\"person\" class=\"icon-resume\"></ion-icon> Profil : Étudiant en alternance",
    "tl.profile.student": "<ion-icon name=\"person\" class=\"icon-resume\"></ion-icon> Profil : Étudiant",
    "tl.program.master": "<ion-icon name=\"document\" class=\"icon-resume\"></ion-icon> Programme : Master Professionnels (bac+5)",
    "tl.program.bachelor": "<ion-icon name=\"document\" class=\"icon-resume\"></ion-icon> Programme : Bachelor (bac+3)",
    "tl.program.bts": "<ion-icon name=\"document\" class=\"icon-resume\"></ion-icon> Programme : BTS SIO (option : SISR)",
    "tl.program.bacpro": "<ion-icon name=\"document\" class=\"icon-resume\"></ion-icon> Programme : BAC PRO MELEC (option : SN)",
    "tl.level.5": "<ion-icon name=\"star\" class=\"icon-resume\"></ion-icon> Niveau : BAC +5",
    "tl.level.3": "<ion-icon name=\"star\" class=\"icon-resume\"></ion-icon> Niveau : BAC +3",
    "tl.level.2": "<ion-icon name=\"star\" class=\"icon-resume\"></ion-icon> Niveau : BAC +2",
    "tl.level.0": "<ion-icon name=\"star\" class=\"icon-resume\"></ion-icon> Niveau : BAC",
    "tl.duration.1": "<ion-icon name=\"time\" class=\"icon-resume\"></ion-icon> Durée : 1 an",
    "tl.duration.2": "<ion-icon name=\"time\" class=\"icon-resume\"></ion-icon> Durée : 2 ans",
    "tl.duration.3": "<ion-icon name=\"time\" class=\"icon-resume\"></ion-icon> Durée : 3 ans",
    "tl.school.cesi": "<ion-icon name=\"pin\" class=\"icon-resume\"></ion-icon> Ecole : Campus CESI Le Mans",
    "tl.school.stcharles": "<ion-icon name=\"pin\" class=\"icon-resume\"></ion-icon> Ecole : Campus Saint charles sainte croix Le Mans",
    "tl.school.vadepied": "<ion-icon name=\"pin\" class=\"icon-resume\"></ion-icon> Ecole : Lycée Raoul Vadepied Evron",
    "exp.sarrel.title": "Stage Sarrel",
    "exp.sarrel.dates": "2020 — 2021 et 2021 - 2022",
    "exp.dri.role": "<ion-icon name=\"briefcase\" class=\"icon-resume\"></ion-icon> Poste : Alternant administrateur systèmes",
    "exp.fpee.role": "<ion-icon name=\"briefcase\" class=\"icon-resume\"></ion-icon> Poste : Alternant support informatique",
    "exp.sarrel.role": "<ion-icon name=\"briefcase\" class=\"icon-resume\"></ion-icon> Poste : Stagiaire support informatique",
    "exp.missions": "<ion-icon name=\"extension-puzzle\" class=\"icon-resume\"></ion-icon> Missions",
    "exp.dri.1": "- Déploiement d’infrastructures redondantes et hautement disponibles multi-sites (PRA et PCA).",
    "exp.dri.2": "- Amélioration des outils, des processus internes et optimisation des coûts (supervision, alerting).",
    "exp.dri.3": "- Référent technique et chef de projet : NETPRESTATION, KOGOIA ...",
    "exp.dri.4": "- Développement et gestion d’infrastructures automatisées via GitLab en utilisant des outils de gestion de configuration (Puppet | Ansible).",
    "exp.dri.5": "- Support : assistance technique auprès des clients, en résolvant les incidents N1.",
    "exp.dri.6": "- Exploitation : Anticipe et résout les problèmes techniques d'exploitation en apportant des solutions efficaces",
    "exp.fpee.1": "- Répondre aux demandes des utilisateurs via téléphone, e-mail, chat ou ticket.",
    "exp.fpee.2": "- Diagnostiquer et résoudre les problèmes techniques liés aux logiciels, matériels, ou réseaux.",
    "exp.fpee.3": "- Accompagner les utilisateurs dans l'installation et la configuration de nouveaux équipements (ordinateurs, imprimantes, téléphones).",
    "exp.fpee.4": "- Identifier, analyser et résoudre les incidents techniques dans les délais impartis.",
    "exp.fpee.5": "- Créer et gérer les comptes utilisateurs (e-mails, Active Directory, logiciels internes).",
    "exp.fpee.6": "- Configurer et appliquer les droits d'accès selon les politiques de l'entreprise.",
    "exp.fpee.7": "- Aider à la connexion aux réseaux internes et à distance (VPN, Wi-Fi, Ethernet).",
    "exp.fpee.8": "- Suivre l’inventaire du matériel informatique (PC, téléphones, imprimantes, etc.).",
    "exp.sarrel.1": "- Assistance et réparation informatique bas niveau (laptop, desktop, smartphone, imprimante, etc..)",
    "pd.status.dev": "En développement",
    "pd.highlights": "Points forts",
    "pd.stack": "Technologies",
    "pd.github": "Voir sur GitHub",
    "pd.docs": "Documentation",
    "pd.website": "Visiter le site",
    "pm.close": "Fermer",
    "pm.prev": "Précédent",
    "pm.next": "Suivant",
    "pd.noname.desc": "Le jeu vidéo que je développe actuellement : un jeu bac à sable en 3D, réalisé avec Godot. Il n’a pas encore de nom, d’où « No Name ».",
    "pd.noname.f1": "Gameplay bac à sable en 3D",
    "pd.noname.f2": "Développé avec le moteur Godot",
    "pd.noname.f3": "En cours de développement actif",
    "pd.gameserverkit.desc": "Une base de serveur réutilisable pour les jeux multijoueurs : une API HTTP pour les comptes et la liste des serveurs, et un serveur de jeu WebSocket en temps réel. Développée en Python avec PostgreSQL, pensée pour des clients Godot 4 mais utilisable avec n’importe quel moteur.",
    "pd.gameserverkit.f1": "Comptes avec connexion JWT, mots de passe bcrypt et limitation des requêtes",
    "pd.gameserverkit.f2": "Liste des serveurs : chaque serveur signale sa charge et les joueurs rejoignent le moins chargé",
    "pd.gameserverkit.f3": "Chat, déplacements et zones en temps réel via WebSocket",
    "pd.gameserverkit.f4": "Inventaire en grille avec rotation, piles, équipement, sacs et coffres",
    "pd.gameserverkit.f5": "Piloté par les données : un nouveau jeu, ce sont juste de nouvelles données JSON, avec le même code",
    "pd.daytime.desc": "Un plugin Unreal Engine 5 qui affiche à l’écran le jour et l’heure du jeu en temps réel, entièrement synchronisé avec le plugin Day Sequence d’Epic Games pour les cycles jour / nuit.",
    "pd.daytime.f1": "Widget jour et heure en temps réel",
    "pd.daytime.f2": "Synchronisé avec le plugin Day Sequence d’Epic",
    "pd.daytime.f3": "Formats d’heure personnalisables et localisation",
    "pd.daytime.f4": "Fonctionne dans l’éditeur et en jeu",
    "pd.daytime.f5": "Interface entièrement personnalisable (police, couleur, disposition)",
    "pd.inventory.desc": "Un système d’inventaire très évolutif pour Unreal Engine 5 : créez une grille d’inventaire fonctionnelle en quelques clics, avec des objets sur une seule case ou multi-cases façon Tetris.",
    "pd.inventory.f1": "Inventaires en quelques clics (grille, UI et logique)",
    "pd.inventory.f2": "Objets simple case et multi-cases",
    "pd.inventory.f3": "Objets configurables : taille, icône, empilement…",
    "pd.inventory.f4": "UI prête à l’emploi avec glisser-déposer optionnel",
    "pd.inventory.f5": "À attacher au joueur, à un coffre, un marchand ou n’importe quel acteur",
    "pd.linux.desc": "Un portfolio inspiré des terminaux Linux et des interfaces « hacker », pour une expérience immersive qui ressemble à une console interactive.",
    "pd.linux.f1": "Design inspiré du terminal Linux",
    "pd.linux.f2": "Animations et transitions fluides",
    "pd.linux.f3": "Sections de portfolio interactives",
    "pd.linux.f4": "Responsive sur ordinateur et mobile",
    "pd.minecraft.desc": "Un serveur Minecraft que je déploie et administre pour ma communauté.",
    "skills.gamedev": "Développement de jeux",
    "skills.systems.text": "Le socle : installer, sécuriser et exploiter des serveurs, physiques ou virtuels.",
    "skills.devops.text": "Infrastructure as code, conteneurs, pipelines CI/CD et scripts pour tout automatiser.",
    "skills.network.text": "Répartition de charge, cache, pare-feu et accès sécurisé aux services.",
    "skills.monitoring.text": "Détecter les problèmes avant les utilisateurs, et toujours garder une solution de retour.",
    "skills.databases.text": "Installer, exploiter et sauvegarder des bases relationnelles et orientées documents.",
    "skills.gamedev.text": "Créer des jeux et du contenu 3D, mon terrain de jeu créatif.",
    "skills.tools.text": "Les outils du quotidien, de l’annuaire au ticketing jusqu’à l’éditeur de code.",
    "st.hint": "Clique sur un dossier pour l’explorer",
    "st.status": "{n} éléments · {total} au total",
    "gh.title": "Activité GitHub",
    "gh.loading": "Chargement des contributions…",
    "gh.less": "Moins",
    "gh.more": "Plus",
    "gh.total": "{n} contributions sur les 12 derniers mois",
    "gh.cell": "{n} contribution(s) le {date}",
    "gh.error": "Impossible de charger les contributions pour le moment.",
    "skills.systems": "Systèmes & Virtualisation",
    "skills.devops": "DevOps & Automatisation",
    "skills.network": "Réseaux, Web & Sécurité",
    "skills.monitoring": "Supervision, Monitoring & Sauvegarde",
    "skills.databases": "Bases de données",
    "skills.tools": "Outils & Environnements",
    "filter.all": "Tous",
    "filter.website": "Site web",
    "filter.games": "Jeux",
    "proj.linux": "Portfolio console Linux",
    "proj.minecraft": "Serveur Minecraft - NewHorizon",
    "proj.cat.games": "Jeux",
    "proj.cat.website": "Site Web",
    "filter.select": "Sélectionner une catégorie",
  };

  const en = {};
  const dictionaries = { en, fr };
  let current = 'en';

  // capture the English source strings from the page
  const capture = () => {
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      en[el.dataset.i18n] ??= el.innerHTML.trim();
    });
    document.querySelectorAll('[data-i18n-aria]').forEach((el) => {
      en[el.dataset.i18nAria] ??= el.getAttribute('aria-label');
    });
    document.querySelectorAll('[data-i18n-alt]').forEach((el) => {
      en[el.dataset.i18nAlt] ??= el.getAttribute('alt');
    });
  };

  const lookup = (key) => dictionaries[current][key] ?? en[key];

  const apply = (lang) => {
    if (!LANGS.includes(lang)) lang = 'en';
    current = lang;

    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const value = lookup(el.dataset.i18n);
      if (value != null && el.innerHTML.trim() !== value) el.innerHTML = value;
    });
    document.querySelectorAll('[data-i18n-aria]').forEach((el) => {
      const value = lookup(el.dataset.i18nAria);
      if (value != null) el.setAttribute('aria-label', value);
    });
    document.querySelectorAll('[data-i18n-alt]').forEach((el) => {
      const value = lookup(el.dataset.i18nAlt);
      if (value != null) el.setAttribute('alt', value);
    });

    document.querySelectorAll('[data-lang]').forEach((btn) => {
      btn.setAttribute('aria-pressed', btn.dataset.lang === lang);
    });

    document.documentElement.lang = lang;
    document.documentElement.classList.remove('i18n-pending');
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}

    document.dispatchEvent(new CustomEvent('langchange', { detail: { lang } }));
  };

  const init = () => {
    capture();

    let saved = 'en';
    try { saved = localStorage.getItem(STORAGE_KEY) || 'en'; } catch (e) {}
    apply(saved);

    document.querySelectorAll('[data-lang]').forEach((btn) => {
      btn.addEventListener('click', () => apply(btn.dataset.lang));
    });
  };

  // strings built from JavaScript: the English text is passed as fallback
  const t = (key, fallback, vars = {}) => {
    const text = (current === 'fr' && fr[key]) || fallback;
    return text.replace(/\{(\w+)\}/g, (_, name) => vars[name] ?? '');
  };

  return { init, apply, t, get lang() { return current; } };
})();

I18N.init();
