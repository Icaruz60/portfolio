export type Lang = "en" | "de";

export const T = {
  en: {
    // Hero
    role: "I make Stuff happen. I make things Work. Fast. Good.",
    heroStats: [
      "Software Engineer",
      "Full-Stack Dev",
      "Mobile Dev",
      "Game Dev",
    ] as string[],
    about: "About",
    blurb:
      "More than a Programmer. I design intuitively, develop efficiently and ship securely. I dont just clock in. I take pride in what I create and make sure it represents me well.",
    downloadResume: "Download Resume",
    resumeShort: "Resume",
    resumeUrl: "/Resume.pdf",
    scrollHint: "Jump to technologies",

    // Navigation
    navProfile: "Profile",
    navTech: "Technologies",
    navExperience: "Experience",
    navEducation: "Education",
    navProjects: "Projects",
    navContact: "Contact",

    // Section hints
    techHint: "All the Stuff I know",
    experienceHint: "All the places I have made an impact at",
    educationHint: "Knowledge from all around the globe",
    projectsHint: "See what I made. First Hand.",
    contactHint: "lets make a connection!",

    // Education panel
    pastDestinations: "Past Destinations",
    currentDestination: "Current Destination",
    futureDestination: "Future Destination",
    exploringJobmarket: "Exploring the Jobmarket",

    // Contact
    directLine: "Direct Line",
    likeWhatYouSee: "Like what you see?",
    emailCTA: "Shoot me an email and we'll kick off in hours, not weeks.",
    sendEmail: "Send Email",
    alsoFindMe: "Also find me here",
    tagAlongText:
      "Dont need to directly reach me but still wanna tag along? Here are the places to do that",
    openTo: "Open to Job offers, advisory, and playful side collaborations.",
    visit: "Visit",

    // Picker
    pickerLabel: "Choose your language",

    // Experience — indexed to match CONFIG.experience order
    experience: [
      {
        role: "Full Stack Software Developer Intern",
        summary:
          "6-month internship with intensive and complex backend and frontend work",
        highlights: [
          "Single-handedly built a standalone microservice that takes in a unified payload and builds digital wallet passes for Apple, Google, and Samsung Wallet. Designed and engineered the solution, translation process, and generalized payload structure",
          "As part of a team, created the backend and frontend for a pass/credential creation and distribution service",
          "Azure, .NET, React, C#, Domain-Driven Design, CQRS Pattern, Collaborative Programming, Following Business Standards",
        ],
      },
      {
        role: "Lead Game Developer Intern",
        summary: "Developed 3 Mobile Games for a Startup called PlayXScape",
        highlights: [
          "Built out 3 different 2D Unity Mobile Games with focus on Performance and platform-friendliness",
          "Unity, Unity2D, C#, Blender, Aseprite, Audacity",
        ],
      },
      {
        role: "Software Engineer, Startup Founder",
        summary:
          "The name under which I design, develop, market and publish various Software Solutions. Projects include: Ascend, GAP, TempoChores and much more to come!",
        highlights: [
          "2 Apps published in the App store soon",
          "React Native, Expo, Flutter, C#, SQL, Supabase, Apple, Android, Deployment, Marketing",
        ],
      },
      {
        role: "Full-Stack Developer Intern",
        summary:
          "I was able to gain an insight into this amazing Company and learn many things about Software Engineering and the Industry itself.",
        highlights: [
          "Made an intro Website and built a News Website 3 times using 3 different technologies",
          "HTML, CSS, JS, React, C#",
        ],
      },
    ],

    // Projects — indexed to match CONFIG.projects order
    projects: [
      {
        title: "Courtside Oracle — NBA Game Prediction Engine",
        description:
          "Built an end-to-end NBA prediction system from scratch: custom player ELO ratings across 7 skill dimensions, an XGBoost classifier trained on 14,108 games across 11 seasons, and a fully automated daily pipeline that fetches schedules, generates predictions, and self-evaluates once results are final. Achieved 67.5% accuracy on a held-out test set of 2,116 games. Each prediction comes with SHAP explainability so you can see exactly which factors drove the call.",
      },
      {
        title: "Ascend — Social Media for Productivity",
        description:
          "Ascend is a phone app fighting the doomscrolling epidemic. Instead of mindless scrolling, it rewards productivity and strengthens real friendships. You can share meaningful progress, level up together, and actually do something with your time.",
      },
      {
        title: "IMASS Wolke — Legacy Science, Modernized",
        description:
          "Led a 5-person team building a cloud platform that containerizes legacy Fortran science models and makes them accessible via a modern web UI so that no manual environment setup is needed for researchers anymore. Built a visual Workflow Builder letting scientists chain model inputs and outputs without writing a single line of code. Contributed to securing $1.2M in federal funding for ARA from the US Congress.",
      },
      {
        title:
          "Wallet Pass Generator — Industry used Pass Generation Microservice",
        description:
          "Engineered a standalone microservice that abstracts the fundamentally different formats of Apple Wallet, Google Wallet, and Samsung Wallet into a single unified input. Handles complete pass generation and cryptographic signing for all three platforms via Azure Functions. Went as sole engineer from architecture and design to containerized deployment on Microsoft Azure.",
      },
      {
        title: "Wolf of AI Street — Trading with LSTM",
        description:
          "Built a custom dataset from 5 years of hourly EUR/USD OHLC data fused with GDELT news sentiment, including a custom relevance scoring system for article weighting across 33,000+ aligned time-series points. Trained an LSTM through three iterative architectures: directional prediction, confidence-driven forecasting, and a full trading bot. each generation was improved based on the previous model's results.",
      },
      {
        title: "TempoChores — Timed Cleaning",
        description:
          "Chores are a chore. They're time-consuming, monotone, and easy to put off. TempoChores fixes that: Tell it how much time you have and which chores are due, and it builds the optimal schedule for you automatically. Timing your tasks makes them feel shorter. Leaderboards and levels coming soon.",
      },
      {
        title: "MenuMate — Interactive Restaurant Menus",
        description:
          "A web app that modernizes the dining experience. Smart filters and an improved rating system replace walls of text, so you actually find what you want to eat.",
      },
      {
        title: "Courtside Oracle — NBA Game Prediction Engine",
        description:
          "Built an end-to-end NBA prediction system from scratch: custom player ELO ratings across 7 skill categories, an XGBoost classifier trained on 14,108 games across 11 seasons, and a fully automated daily pipeline that fetches schedules, generates predictions, and self-evaluates once results are final. Achieved 67.5% accuracy on a held-out test set of 2,116 games. Each prediction comes with SHAP explainability so you can see exactly which factors drove the call.",
      },
    ],
  },

  de: {
    // Hero
    role: "Ich bringe Dinge zum Laufen. Ich mache Sachen möglich. Schnell. Gut.",
    heroStats: [
      "Software Engineer",
      "Full-Stack Dev",
      "Mobile Dev",
      "Game Dev",
    ] as string[],
    about: "Über mich",
    blurb:
      "Mehr als ein Programmierer. Ich designe intuitiv, entwickle effizient und liefere sicher. Ich mache nicht einfach Dienst nach Vorschrift. Ich bin stolz auf das was ich baue und stelle sicher, dass es mich gut repräsentiert.",
    downloadResume: "Lebenslauf herunterladen",
    resumeShort: "Lebenslauf",
    resumeUrl: "/Lebenslauf.pdf",
    scrollHint: "Zu Technologien springen",

    // Navigation
    navProfile: "Profil",
    navTech: "Technologien",
    navExperience: "Erfahrung",
    navEducation: "Ausbildung",
    navProjects: "Projekte",
    navContact: "Kontakt",

    // Section hints
    techHint: "Alles was ich drauf habe",
    experienceHint: "Überall wo ich etwas bewegt habe",
    educationHint: "Wissen aus aller Welt",
    projectsHint: "Sieh selbst was ich gebaut habe.",
    contactHint: "Lass uns in Kontakt treten!",

    // Education panel
    pastDestinations: "Vergangene Stationen",
    currentDestination: "Aktuelle Station",
    futureDestination: "Nächste Station",
    exploringJobmarket: "Auf Jobsuche",

    // Contact
    directLine: "Direktkontakt",
    likeWhatYouSee: "Gefällt dir was du siehst?",
    emailCTA:
      "Schreib mir eine Mail und wir verbinden uns. In Stunden, nicht Wochen.",
    sendEmail: "E-Mail senden",
    alsoFindMe: "Auch hier zu finden",
    tagAlongText:
      "Kein direkter Kontakt nötig aber trotzdem dabei bleiben? Hier geht das.",
    openTo: "Offen für Jobangebote, Beratung und kreative Nebenprojekte.",
    visit: "Besuchen",

    // Picker
    pickerLabel: "Sprache wählen",

    // Experience
    experience: [
      {
        role: "Full Stack Software Developer Intern",
        summary:
          "6-monatiges Praktikum mit intensiver und komplexer Backend- und Frontend-Arbeit",
        highlights: [
          "Habe eigenständig einen Microservice entwickelt, der eine einheitliche Payload entgegennimmt und digitale Wallet-Passes für Apple, Google und Samsung Wallet erstellt. Lösung, Übersetzungsprozess und generalisierte Payload-Struktur selbst konzipiert und umgesetzt",
          "Im Team Backend und Frontend eines Pass- und Credential-Erstellungs- und Verteilungsdienstes entwickelt",
          "Azure, .NET, React, C#, Domain-Driven Design, CQRS Pattern, Collaborative Programming, Following Business Standards",
        ],
      },
      {
        role: "Lead Game Developer Intern",
        summary: "3 Handy Spiele für das Startup PlayXScape entwickelt",
        highlights: [
          "3 verschiedene 2D Unity Handy Spiele mit Fokus auf Performance und Plattformfreundlichkeit gebaut",
          "Unity, Unity2D, C#, Blender, Aseprite, Audacity",
        ],
      },
      {
        role: "Software Engineer, Startup-Gründer",
        summary:
          "Der Name unter dem ich verschiedene Softwarelösungen designe, entwickle, vermarkte und veröffentliche. Projekte: Ascend, GAP, TempoChores und vieles mehr!",
        highlights: [
          "2 Apps bald im App Store veröffentlicht",
          "React Native, Expo, Flutter, C#, SQL, Supabase, Apple, Android, Deployment, Marketing",
        ],
      },
      {
        role: "Full-Stack Entwickler Praktikant",
        summary:
          "Ich konnte einen Einblick in dieses tolle Unternehmen gewinnen und viel über Software Engineering und die Branche lernen.",
        highlights: [
          "Eine Intro-Website gebaut und eine Nachrichtenplattform dreimal mit drei verschiedenen Technologien neu aufgebaut",
          "HTML, CSS, JS, React, C#",
        ],
      },
    ],

    // Projects
    projects: [
      {
        title: "Courtside Oracle — NBA Spielvorhersage-Engine",
        description:
          "Ein vollständiges NBA-Vorhersagesystem von Grund auf entwickelt: Eigene Spieler-ELO-Bewertungen in 7 Skill-kategorien, ein XGBoost-Klassifikator trainiert auf 14.108 Spielen über 11 Saisons und eine vollautomatisierte tägliche Pipeline, die Spielpläne abruft, Vorhersagen erstellt und sich selbst auswertet sobald Ergebnisse feststehen. 67,5% Genauigkeit auf einem separaten Testset von 2.116 Spielen. Jede Vorhersage enthält SHAP-Erklärbarkeit — du siehst genau welche Faktoren die Entscheidung beeinflusst haben.",
      },
      {
        title: "Ascend — Social Media für Produktivität",
        description:
          "Ascend ist eine App gegen das Doomscrolling-Problem. Statt sinnlosem Scrollen belohnt sie Produktivität und stärkt echte Freundschaften. Teile echte Fortschritte, levele gemeinsam auf und tu endlich was mit deiner Zeit.",
      },
      {
        title: "IMASS Wolke — Veraltete Wissenschaft, modernisiert",
        description:
          "Teamleiter eines 5-köpfigen Teams beim Bau einer Cloud-Plattform, die Legacy-Fortran-Wissenschaftsmodelle containerisiert und über eine moderne Web-UI einfach zugänglich macht. Kein manuelles Environment-Setup mehr für Forscher. Dazu noch ein visueller Workflow-Builder, mit dem Wissenschaftler Modell-Ein- und Ausgaben verketten können ohne eine Zeile Code zu schreiben. Mitgewirkt an der Sicherung von 1,2 Mio. USD Bundesförderung für ARA durch den US-Kongress.",
      },
      {
        title:
          "Wallet Pass Generator — Industrie genutzter Pass-Generierungs-Microservice",
        description:
          "Einen eigenständigen Microservice entwickelt, der die grundlegend unterschiedlichen Formate von Apple Wallet, Google Wallet und Samsung Wallet in einer einzigen Eingabeschnittstelle abstrahiert. Vollständige Pass-Generierung und kryptografische Signierung für alle drei Plattformen via Azure Functions. Alleiniger Ingenieur von der Architektur bis zum containerisierten Deployment auf Microsoft Azure.",
      },
      {
        title: "Wolf of AI Street — LSTM Trading-bot",
        description:
          "Einen eigenen Datensatz aus 5 Jahren stündlicher EUR/USD OHLC-Daten kombiniert mit GDELT-Nachrichtensentimentdaten aufgebaut. Mit eigenem Relevanz-Scoring über mehr als 33.000 ausgerichtete Zeitreihenpunkte. Ein LSTM über drei iterative Architekturen trainiert: Richtungsvorhersage, konfidenzgesteuerte Vorhersage und ein Trading-Bot. Jede Generation wurde verbessert auf Basis der vorherigen Ergebnisse.",
      },
      {
        title: "TempoChores — Zeitgesteuertes Putzen",
        description:
          "Hausarbeit ist eine Qual. Zeitraubend, monoton und leicht aufzuschieben. TempoChores löst das. Sag der App wie viel Zeit du hast und welche Aufgaben anstehen, und sie erstellt automatisch den optimalen Plan. Aufgaben zu timen lässt sie kürzer wirken. Ranglisten und Level kommen bald.",
      },
      {
        title: "MenuMate — Interaktive Restaurantmenüs",
        description:
          "Eine Web-App, die das Restauranterlebnis modernisiert. Smarte Filter und ein verbessertes Bewertungssystem ersetze Menüs voller Text, damit du wirklich findest was du essen willst.",
      },
    ],
  },
};

export type Translations = typeof T.en;
