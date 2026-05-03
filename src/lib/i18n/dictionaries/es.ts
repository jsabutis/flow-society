import type en from "./en";

type Dictionary = typeof en;

const es: Dictionary = {
  header: {
    nav: {
      tours: "Experiencias",
      bikes: "E-Bikes",
      calendar: "Calendario",
      stories: "Diario",
      about: "Nosotros",
      howItWorks: "C\u00F3mo funciona",
      tripPrep: "Prep\u00E1rate",
    },
    bookTour: "\u00DAnete al flow",
    openMenu: "Abrir men\u00FA",
    closeMenu: "Cerrar men\u00FA",
    languageLabel: "Idioma",
    changeLanguage: "Cambiar idioma",
    needHelp: "\u00BFNecesitas ayuda para elegir?",
  },
  footer: {
    partnersHeading: "Alianzas estrat\u00E9gicas",
    tagline:
      "Experiencias en e-bike, brunch y after ride lounge en el Bosque La Primavera, Jalisco. Curamos rodadas peque\u00F1as adaptadas por nivel para una comunidad que cuida los senderos tanto como cuida la rodada.",
    adventuresHeading: "Experiencias",
    allTours: "Todas las experiencias",
    calendar: "Calendario",
    bikeFleet: "Flota de e-bikes",
    stories: "Diario",
    contactHeading: "Contacto",
    getInTouch: "Escr\u00EDbenos",
    copyright: "Flow Society MX \u00B7 Bosque La Primavera, Jalisco",
    resourcesHeading: "Recursos",
    linkHowItWorks: "C\u00F3mo funciona",
    linkTripPrep: "Prep\u00E1rate",
    linkGlossary: "Glosario",
    linkRideFit: "Tu nivel de ruta",
  },
  hero: {
    eyebrow: "Flow Society MX \u00B7 Bosque La Primavera",
    title: "Brunch. Ride. Comunidad.",
    description:
      "Experiencias premium en e-bike por el bosque volc\u00E1nico de La Primavera \u2014 grupos peque\u00F1os, rutas adaptadas por nivel y un after ride lounge para quedarse.",
    exploreTours: "Ver experiencias",
    findMyTrip: "Encuentra tu rodada",
    ratingFormat: "{avg} ({count} rese\u00F1as)",
    reviewsGrowing: "Comunidad nueva \u2014 rese\u00F1as creciendo",
    imbaTrained: "Riders experimentados como gu\u00EDas",
    smallGroups: "Grupos peque\u00F1os \u00B7 cupo limitado",
    freeCancel: "Cancelaci\u00F3n gratis hasta 30 d\u00EDas antes",
    spotsLeft: "Quedan {n} lugares",
    open: "abierto",
  },
  home: {
    featured: {
      eyebrow: "Experiencias destacadas",
      title: "Cinco formas de unirte al flow",
      description:
        "Desde una rodada-brunch para principiantes en La Primavera hasta una experiencia de campamento de dos d\u00EDas bajo los pinos \u2014 cada salida est\u00E1 cuidada, adaptada por nivel y construida alrededor de la gente, la comida y el sendero.",
    },
    whyUs: {
      eyebrow: "Por qu\u00E9 Flow Society",
      title: "Construido alrededor de la rodada, la comida y la comunidad.",
      description:
        "Creamos experiencias de mtb acompa\u00F1ando el buen uso de las pistas y la seguridad de los visitantes. No se trata solo de recorrer una ruta, sino de vivir un momento en un formato cuidado y personalizado.",
      items: [
        {
          title: "Rutas adaptadas por nivel",
          body: "Principiante, intermedio o pareja h\u00EDbrida \u2014 ajustamos la ruta al grupo, no al rev\u00E9s. Dos horas de rodada personalizada, dialed para las personas presentes.",
        },
        {
          title: "Brunch + Ride + Lounge",
          body: "Comida real antes y despu\u00E9s. El After Ride Lounge es la otra mitad de la experiencia: bebidas fr\u00EDas, m\u00FAsica, conversaci\u00F3n y el acuerdo t\u00E1cito de que nadie tiene prisa por irse.",
        },
        {
          title: "Grupos peque\u00F1os, siempre",
          body: "Cupo limitado, curaci\u00F3n intencional. Riders experimentados como gu\u00EDas, trail tips para todos, fotos durante la rodada \u2014 t\u00FA ruedas, nosotros nos hacemos cargo del resto.",
        },
        {
          title: "Cultura de sendero, no solo rodada",
          body: "Parte de cada reserva regresa a los senderos. Ayudamos al cuidado de La Primavera y construimos una comunidad multidisciplinaria alrededor del ciclismo \u2014 impulsando la e-bike como herramienta de turismo y conservaci\u00F3n en los bosques de M\u00E9xico.",
        },
      ],
    },
    founder: {
      eyebrow: "La visi\u00F3n",
      role: "Fundadores \u00B7 Flow Society MX",
      name: "Una comunidad multidisciplinaria alrededor del ciclismo.",
      body1:
        "Flow Society naci\u00F3 con una idea simple: una experiencia en e-bike en el Bosque La Primavera que se sienta cercana, aut\u00E9ntica y diferente. No solo una ruta \u2014 un momento, en grupo peque\u00F1o, donde cada detalle cuenta.",
      body2:
        "De ah\u00ED creci\u00F3 una visi\u00F3n m\u00E1s grande: construir una comunidad multidisciplinaria alrededor del ciclismo, impulsar el uso de la e-bike como herramienta de turismo en los bosques del pa\u00EDs y contribuir al desarrollo y cuidado de los trails que hacen posibles estas experiencias.",
      quote:
        "No se trata solo de recorrer una ruta, sino de vivir un momento en un formato cuidado y personalizado.",
    },
    stories: {
      eyebrow: "Diario de campo",
      title: "Desde el bosque",
      allStories: "Todas las entradas \u2192",
      readMinutes: "{n} min de lectura",
    },
    testimonials: {
      eyebrow: "De la comunidad",
      title: "Historias del lounge",
    },
    newsletter: {
      eyebrow: "Mantente en el flow",
      title: "Cartas desde el bosque, una vez por temporada.",
      description:
        "Nuevas experiencias, eventos para miembros, fotos de las rodadas y las pr\u00F3ximas fechas del After Ride Lounge. Sin spam, sin ventas agresivas.",
    },
    calendarStrip: {
      eyebrow: "Pr\u00F3ximas rodadas",
      title: "Las siguientes seis fechas",
      viewAll: "Ver calendario completo \u2192",
      empty: "No hay rodadas pr\u00F3ximas. Vuelve pronto.",
    },
    destinations: {
      eyebrow: "D\u00F3nde rodamos",
      title: "Bosque La Primavera, Jalisco",
      description:
        "30,500 hect\u00E1reas de bosque de pino-encino dentro de una caldera volc\u00E1nica de 95,000 a\u00F1os, a 30 minutos del centro de Guadalajara. El bosque es nuestro sendero de casa y nuestro proyecto \u2014 lo rodamos, lo cuidamos y lo compartimos con cuidado.",
    },
  },
  newsletterForm: {
    submit: "Suscribirme",
    sending: "Enviando\u2026",
    success: "\u00A1Listo \u2014 gracias! Atento a tu bandeja para la pr\u00F3xima rodada.",
    emailLabel: "Correo electr\u00F3nico",
    emailPlaceholder: "tu@ejemplo.com",
    invalidEmail: "Ingresa un correo v\u00E1lido.",
  },
  tourCard: {
    fillingFast: "Llen\u00E1ndose r\u00E1pido",
    reviewOne: "rese\u00F1a",
    reviewMany: "rese\u00F1as",
    dayOne: "d\u00EDa",
    dayMany: "d\u00EDas",
    fromPrice: "desde {price}",
  },
  bikeCard: {
    perDay: "{price}/d\u00EDa",
  },
  whatsapp: {
    prefill: "Hola \u2014 me interesa una experiencia de Flow Society.",
    aria: "Chatear por WhatsApp",
  },
  about: {
    metaTitle: "Nosotros",
    metaDescription:
      "Flow Society crea experiencias en e-bike y cultura de sendero en el Bosque La Primavera, Jalisco \u2014 brunch, ride y comunidad multidisciplinaria alrededor del ciclismo.",
    eyebrow: "Sobre Flow Society",
    title: "Brunch, ride, comunidad.",
    intro:
      "Creamos experiencias de MTB y e-bike que combinan la ruta correcta con el grupo correcto \u2014 y un after ride lounge a la altura de la rodada. Cuidado, personalizado y construido alrededor de los senderos del Bosque La Primavera.",
    teamHeading: "El equipo",
    teamBody1:
      "Riders experimentados como gu\u00EDas, un equipo peque\u00F1o de operaciones que conoce La Primavera de memoria, y una comunidad de miembros que tratan al bosque como parte de la familia. Biling\u00FCe donde importa, certificado donde corresponde y rodando todo el a\u00F1o.",
    teamBody2:
      "Nuestros mec\u00E1nicos mantienen cada e-bike con bater\u00EDa completa y servicio antes de cada rodada. Reparamos lo que se rompe, reemplazamos lo que se desgasta, y nunca salimos a una rodada con una bici que nosotros mismos no quisi\u00E9ramos llevar.",
    cards: [
      {
        eyebrow: "Cuidado del sendero",
        title: "Devolvemos al bosque",
        body: "Cada reserva y cada membres\u00EDa contribuyen al mantenimiento y cuidado de los senderos de La Primavera \u2014 los riders que los usan son los que los mantienen vivos.",
      },
      {
        eyebrow: "Grupos peque\u00F1os e intencionales",
        title: "Cupo limitado",
        body: "Cupo limitado por dise\u00F1o. La ruta, el brunch, el lounge \u2014 todo funciona porque el grupo es lo suficientemente peque\u00F1o como para cuidar cada detalle.",
      },
      {
        eyebrow: "Premium y local",
        title: "Comida local, energ\u00EDa local",
        body: "Brunch, snacks, bebidas, el after ride lounge \u2014 todo viene de gente que conocemos en Jalisco. Sin cadenas, sin atajos, sin compromisos.",
      },
    ],
  },
  contact: {
    metaTitle: "Contacto",
    metaDescription: "Contacta al equipo de Flow Society en Jalisco.",
    eyebrow: "Escr\u00EDbenos",
    title: "Hola desde La Primavera.",
    intro:
      "Para experiencias, membres\u00EDas, rodadas privadas o solo saludar. WhatsApp es lo m\u00E1s r\u00E1pido \u2014 normalmente respondemos en un par de horas.",
    emailHeading: "Correo",
    phoneHeading: "Tel\u00E9fono",
    whatsappHeading: "WhatsApp",
  },
  bikes: {
    metaTitle: "La flota de e-bikes",
    metaDescription:
      "Renta de e-bikes premium \u2014 Specialized, Trek, Giant \u2014 con bater\u00EDa completa y afinadas para los senderos del Bosque La Primavera.",
    eyebrow: "La flota de e-bikes",
    title: "E-bikes premium, bater\u00EDa completa, listas para rodar.",
    intro:
      "Cada bici se revisa y se sirve antes de cada rodada. Suspensi\u00F3n afinada, bater\u00EDa al 100%, casco incluido. T\u00FA pones la pierna \u2014 nosotros la bici.",
  },
  calendar: {
    metaTitle: "Calendario",
    metaDescription: "Todas las pr\u00F3ximas rodadas y experiencias de Flow Society.",
    eyebrow: "Calendario de rodadas",
    title: "Cada rodada, cada fecha.",
    intro:
      "Las fechas agotadas o en espera est\u00E1n tachadas \u2014 lo que aparece en verde sigue reservable. Los miembros ven primero las fechas prioritarias.",
    dayOne: "d\u00EDa",
    dayMany: "d\u00EDas",
    statusOpen: "Abierto",
    statusFilling: "Llen\u00E1ndose",
    statusSoldOut: "Agotado",
  },
  tours: {
    metaTitle: "Todas las experiencias",
    metaDescription:
      "Rodadas-brunch en e-bike, parejas h\u00EDbridas, membres\u00EDa, master class y la experiencia de campamento de dos d\u00EDas \u2014 todas en el Bosque La Primavera, Jalisco.",
    eyebrow: "Todas las experiencias",
    title: "Elige tu experiencia.",
    intro:
      "Desde una rodada-brunch para principiantes hasta un campamento de dos d\u00EDas bajo los pinos \u2014 cada experiencia de Flow Society est\u00E1 cuidada, adaptada por nivel y construida alrededor de grupos peque\u00F1os, comida real y el after ride lounge.",
    filters: {
      length: "Duraci\u00F3n",
      any: "Cualquiera",
      oneDay: "Medio d\u00EDa",
      twoThreeDays: "D\u00EDa completo / membres\u00EDa",
      fourPlusDays: "Campamento multi-d\u00EDa",
      level: "Nivel",
      beginner: "Principiante",
      intermediate: "Intermedio",
      advanced: "H\u00EDbrido / pareja",
      bike: "Bici",
      analogMtb: "MTB",
      emtb: "E-MTB",
      regionLabel: "Regi\u00F3n contiene",
      regionPlaceholder: "ej. Primavera",
      apply: "Aplicar",
      reset: "Limpiar",
    },
    empty: "Ninguna experiencia coincide con esos filtros.",
    clearFilters: "Quitar filtros",
  },
  findMyTrip: {
    title: "Encuentra tu rodada",
    closeLabel: "Cerrar di\u00E1logo",
    stepLabel: "Paso {current} de {total}",
    step1Title: "\u00BFCu\u00E1nto quieres rodar?",
    step2Title: "\u00BFCu\u00E1l es tu nivel?",
    step3Title: "\u00BFTraes tu e-bike o rentas la nuestra?",
    daysOptions: {
      oneDay: "Brunch + ride medio d\u00EDa",
      twoThreeDays: "D\u00EDa completo o membres\u00EDa",
      fourPlusDays: "Campamento de dos d\u00EDas",
    },
    levelOptions: {
      beginnerMixed: "Principiante / grupo mixto",
      intermediate: "Intermedio",
      advanced: "H\u00EDbrido / pareja",
    },
    bikeOptions: {
      either: "Cualquiera est\u00E1 bien",
      analogMtb: "Traigo mi propia e-bike",
      emtb: "Rento una de Flow Society",
    },
    cancel: "Cancelar",
    back: "Atr\u00E1s",
    next: "Siguiente",
    seeMatching: "Ver experiencias que encajan",
  },
  stories: {
    metaTitle: "Diario",
    metaDescription:
      "Notas de campo del equipo de Flow Society \u2014 el bosque, las bicis, la comida, la comunidad.",
    eyebrow: "Diario de campo",
    title: "Notas desde el bosque.",
    intro:
      "Historias de La Primavera y m\u00E1s all\u00E1 \u2014 los senderos que rodamos, la gente con la que rodamos, la comida despu\u00E9s y la cultura de sendero que sostiene todo lo dem\u00E1s.",
    latestBadge: "\u00DAltima",
    by: "Por {author}",
    readMinutes: "{n} min de lectura",
    readTheStory: "Leer la entrada",
    moreFromTrail: "M\u00E1s del bosque",
    storiesCount: "{n} entradas",
  },
  storyDetail: {
    allStories: "Todas las entradas",
    by: "Por {author}",
    readMinutes: "{n} min de lectura",
    rideItYourself: "R\u00F3dalo t\u00FA mismo",
    viewTourDates: "Ver experiencia y fechas",
    keepReading: "Sigue leyendo",
    allStoriesLink: "Todas las entradas",
    notFound: "Entrada no encontrada",
  },
  tourDetail: {
    bookThisTour: "Reservar esta experiencia",
    statDifficulty: "Nivel",
    statFitness: "Esfuerzo",
    statFitnessSub: "Adaptado al grupo \u2014 no corremos",
    statGroupSize: "Tama\u00F1o del grupo",
    statUpTo: "Hasta {n}",
    statDriveFromGdl: "Manejo desde GDL",
    statFrom: "Desde",
    statPerRider: "/ rider",
    driveHours: "{n} h",
    driveMinutes: "{n} min",
    highlights: "Incluye",
    dayByDay: "C\u00F3mo va",
    climbingMetres: "{n} m de ascenso",
    pricingTitle: "Precio",
    pricingBody:
      "El precio publicado es por rider en MXN. Var\u00EDa si traes tu propia e-bike o si rentas una de las nuestras. Membres\u00EDas y reservas privadas se cotizan por mensaje. Confirmamos a mano en un par de horas.",
    pricingBodyNoCharge: "Sin cargo hasta que confirmemos por mensaje.",
    includedTitle: "Incluye",
    notIncludedTitle: "Requisitos del rider",
    reviewsEyebrow: "Rese\u00F1as",
    reviewsTitle: "De la comunidad",
    reviewOne: "rese\u00F1a",
    reviewMany: "rese\u00F1as",
    pickDateEyebrow: "Elige una fecha",
    pickDateTitle: "\u00BFCu\u00E1ndo quieres rodar?",
    pickDateBody:
      "Desde {price} por rider \u00B7 Cancelaci\u00F3n gratis hasta 30 d\u00EDas antes \u00B7 Confirmamos por WhatsApp \u00B7 Las fechas agotadas o en espera est\u00E1n tachadas.",
    pickDateBodyNote:
      "Despu\u00E9s de elegir fecha confirmamos por WhatsApp en un par de horas y te ayudamos con la elecci\u00F3n de e-bike si quieres rentar una de las nuestras. Sin cargo hasta que apruebes.",
    difficultyOf3: "{n} de 3 de dificultad de sendero",
    fitnessOf5: "{n} de 5 de esfuerzo",
  },
  bikeDetail: {
    backToFleet: "Volver a la flota",
    specRearTravel: "Recorrido trasero",
    specWheels: "Ruedas",
    specWheelsMullet: "Mullet (29 / 27.5)",
    specSuspension: "Suspensi\u00F3n",
    specDrivetrain: "Transmisi\u00F3n",
    specBrakes: "Frenos",
    specTires: "Llantas",
    specSizesAvail: "Tallas disponibles",
    specRiderHeight: "Altura del rider",
    specRiderHeightUnit: "cm",
    specTravelUnit: "mm",
    dailyRateLabel: "Por rodada",
    perDay: "/ rodada",
    pickATour: "Elegir una experiencia",
    relatedTripsTitle: "Experiencias que usan esta bici",
    relatedTripsBody:
      "Experiencias donde esta e-bike es parte de la flota de renta incluida.",
  },
  booking: {
    metaTitle: "Reservar",
    backTo: "Volver a {tourName}",
    bookTitle: "Reservar {tourName}",
    bookIntro: "Unas preguntas r\u00E1pidas. Confirmamos por WhatsApp en un par de horas.",
    stepperAria: "Pasos de la reserva",
    phaseIntros: [
      "Elige la fecha y los datos de quien reserva. As\u00ED verificamos disponibilidad real antes de fijar nada.",
      "Los datos de cada rider ajustan la bici y nos ayudan a planificar el ritmo del grupo.",
      "Punto de encuentro, alimentaci\u00F3n y contacto de emergencia para un d\u00EDa sin fricciones. Luego revisas y env\u00EDas.",
    ],
    whyWeAsk: {
      departure:
        "Solo apartamos cupos contra una salida real; tachar fechas evita double booking.",
      leadContact:
        "Enviamos la confirmaci\u00F3n y avisos del d\u00EDa a estos datos.",
      riders:
        "Altura y peso para la suspensi\u00F3n; el nivel de experiencia define la variante de ruta.",
      bikes:
        "Reservamos talla y accesorios antes de que llegues para arrancar a tiempo.",
      pickup:
        "Los gu\u00EDas te encuentran donde realmente est\u00E1s \u2014 hotel, trailhead o terminal.",
      emergency:
        "Requisito en salidas guiadas al aire libre; solo los contactamos si hay una emergencia seria.",
    },
    reviewWhatNext:
      "Al enviar, revisamos cupos y te escribimos en pocas horas con la confirmaci\u00F3n y dudas abiertas. A\u00FAn puedes ajustar riders o equipo antes de pagar. No cobramos hasta que apruebes expresamente.",
    formProgress: {
      phase0: "Fecha y titular",
      phase1: "Riders y bicis",
      phase2: "Log\u00EDstica y env\u00EDo",
    },
    phases: {
      dateParty: "Fecha y grupo",
      ridersGear: "Riders y equipo",
      logisticsReview: "Log\u00EDstica y revisi\u00F3n",
    },
    savedBanner: "Tu progreso est\u00E1 guardado en este navegador \u2014 puedes refrescar y continuar.",
    estimateTap: "Estimado \u00B7 toca para detalles",
    close: "Cerrar",
    back: "Atr\u00E1s",
    next: "Siguiente",
    holdSpot: "Reservar mi lugar \u2014 sin cargo a\u00FAn",
    holdSpotSub: "Confirmamos por WhatsApp en un par de horas",
    sending: "Enviando\u2026",
    trustFreeCancel: "Cancelaci\u00F3n gratis hasta 30 d\u00EDas",
    trustHandConfirmed: "Confirmado por WhatsApp",
    trustNoCharge: "Sin cargo hasta que apruebes",
    dateStep: {
      title: "Elige tu fecha",
      intro: "Las fechas agotadas o en espera est\u00E1n tachadas y no pueden seleccionarse.",
    },
    basicsStep: {
      title: "Datos del viaje",
      intro: "Solo el responsable de la reserva \u2014 a\u00F1ades a los dem\u00E1s riders en el siguiente paso.",
      yourName: "Tu nombre",
      email: "Correo electr\u00F3nico",
      phone: "Tel\u00E9fono (con c\u00F3digo de pa\u00EDs)",
      partySize: "N\u00FAmero de riders (1\u2013{max})",
      whatsapp: "Este n\u00FAmero funciona en WhatsApp",
    },
    ridersStep: {
      title: "Cu\u00E9ntanos sobre tus riders",
      intro:
        "Altura y peso nos ayudan a preconfigurar la e-bike. El nivel nos ayuda a elegir las variantes de sendero correctas.",
      riderLabel: "Rider {n}",
      name: "Nombre",
      experience: "Nivel de experiencia",
      experiencePlaceholder: "Elige uno",
      heightCm: "Altura (cm)",
      weightKg: "Peso (kg)",
      beginner: "Principiante",
      intermediate: "Intermedio",
      advanced: "Avanzado",
      expert: "Experto",
    },
    equipmentStep: {
      title: "E-bikes y accesorios",
      intro:
        "El casco es obligatorio y se incluye gratis si no traes el tuyo. Si traes tu propia e-bike, lleg\u00E1 con bater\u00EDa completa.",
      bikeLabel: "E-bike",
      frameSizeLabel: "Talla de cuadro",
      pickBike: "Elige una e-bike",
      bringingOwn: "Traigo mi propia e-bike",
      recommendSize: "Rec\u00F3miendame la talla",
      accessoriesLabel: "Renta de accesorios",
      accessories: {
        helmet: "Casco (gratis \u00B7 obligatorio)",
        gloves: "Guantes",
        kneePads: "Rodilleras (recomendadas)",
        elbowPads: "Coderas",
        hydrationPack: "Mochila de hidrataci\u00F3n",
        mtbShoes: "Zapatillas MTB",
        goPro: "Soporte GoPro",
      },
    },
    logisticsStep: {
      title: "Unos \u00FAltimos datos",
      intro:
        "D\u00F3nde nos vemos, necesidades del brunch y un contacto de emergencia. No contactaremos a tu emergencia a menos que sea necesario.",
      pickupLabel: "\u00BFD\u00F3nde nos vemos?",
      pickupHelp: "Por defecto el trailhead de La Primavera \u2014 d\u00EDnos si prefieres que te recojamos en Guadalajara.",
      pickupPlaceholder: "La Primavera \u00B7 entrada principal",
      dietaryLabel: "Brunch \u2014 restricciones dietarias o alergias (opcional)",
      dietaryPlaceholder: "Vegetariano, sin gluten, alergia al cacahuate\u2026",
      spanishHelp: "Me gustar\u00EDa un gu\u00EDa hablante de espa\u00F1ol para el lounge y check-ins",
      emergencyName: "Nombre del contacto de emergencia",
      emergencyPhone: "Tel\u00E9fono del contacto de emergencia",
      hearAbout: "\u00BFC\u00F3mo supiste de nosotros? (opcional)",
      hearAboutOptions: ["B\u00FAsqueda", "Instagram", "Recomendaci\u00F3n", "WhatsApp", "Amigo", "Otro"],
      notesLabel: "\u00BFAlgo m\u00E1s que debamos saber? (opcional)",
      notesPlaceholder:
        "Lesiones previas, objetivos de rodada, m\u00FAsica preferida en el lounge\u2026",
      whyPickups:
        "Necesitamos un punto exacto (trailhead o hotel) para coordinar al equipo y evitar retrasos.",
      whyEmergency:
        "Los gu\u00EDas outdoor usan esto solo en emergencias serias, nunca para marketing.",
    },
    reviewStep: {
      title: "Revisa y env\u00EDa",
      intro: "Confirmamos por WhatsApp en un par de horas. Sin cargo a\u00FAn.",
      whatNextTitle: "Qu\u00E9 sigue despu\u00E9s del env\u00EDo",
      blockTourDate: "Experiencia y fecha",
      blockLeadContact: "Contacto principal",
      blockRiders: "Riders",
      blockLogistics: "Log\u00EDstica",
      riderLabel: "Rider {n}: {name}",
      riderNoName: "\u2014",
      bringingOwn: "Trae su propia e-bike",
      addOns: "Extras:",
      pickup: "Recogida: {v}",
      dietary: "Dieta: {v}",
      spanishGuide: "Gu\u00EDa en espa\u00F1ol preferido",
      emergency: "Emergencia: {name} \u00B7 {phone}",
      notes: "Notas: {v}",
      riderCount: "{n} rider",
      riderCountMany: "{n} riders",
    },
    summary: {
      heading: "Tu reserva",
      noDate: "Sin fecha seleccionada",
      tourLine: "Experiencia \u00D7 {n}",
      bikeRentals: "Renta de e-bikes",
      accessories: "Accesorios",
      estimatedTotal: "Total estimado",
      disclaimer:
        "Solo estimado \u2014 en MXN. Confirmamos el precio exacto por WhatsApp en un par de horas. Sin cargo hasta que apruebes.",
    },
  },
  confirmation: {
    eyebrow: "Solicitud recibida",
    title: "\u00A1Gracias, {firstName}!",
    body: "Tenemos tu solicitud para {tourName} el {dates} para {n} {riderWord}.",
    riderOne: "rider",
    riderMany: "riders",
    body2:
      "Te escribiremos por WhatsApp al n\u00FAmero que diste (o por correo a {email}) en un par de horas para confirmar. Sin cargo hasta que apruebes.",
    reference: "Referencia: {id}",
    browseMoreTours: "Ver m\u00E1s experiencias",
    backHome: "Inicio",
  },
  compare: {
    metaTitle: "Comparar experiencias",
    metaDescription:
      "Comparativa lado a lado de las experiencias de Flow Society \u2014 duraci\u00F3n, nivel, precio y inclusiones.",
    eyebrow: "Mesa de decisi\u00F3n",
    title: "Comparar experiencias",
    intro:
      "Los precios son por rider para la experiencia publicada \u2014 en MXN. Membres\u00EDas y reservas privadas se cotizan por mensaje.",
    tooFew:
      "Elige al menos dos experiencias en la p\u00E1gina de experiencias y haz clic en Comparar.",
    tooFewLink: "p\u00E1gina de experiencias",
    tooFewClickLabel: "Comparar",
    colTour: "Experiencia",
    colRegion: "Regi\u00F3n",
    colDays: "Duraci\u00F3n",
    colDifficulty: "Nivel",
    colBikeTypes: "Tipo de bici",
    colMaxGroup: "M\u00E1x. grupo",
    colDriveFromGdl: "Manejo desde GDL",
    colFromUsd: "Desde (MXN / rider)",
    backToAllTours: "\u2190 Volver a todas las experiencias",
    driveHours: "{n} h",
    driveMinutes: "{n} min",
  },
  notFound: {
    code: "404",
    title: "Fuera del sendero.",
    body: "No encontramos lo que buscas.",
    backHome: "Inicio",
    browseTours: "Ver experiencias",
  },
  credits: {
    metaTitle: "Cr\u00E9ditos",
    metaDescription: "Cr\u00E9ditos fotogr\u00E1ficos y agradecimientos.",
    eyebrow: "Cr\u00E9ditos",
    title: "Fotos y agradecimientos",
    photoBody:
      "Parte de la fotograf\u00EDa de este sitio proviene de colaboradores en Unsplash bajo la Licencia Unsplash (uso comercial y no comercial gratuito), mientras reemplazamos estos marcadores con fotograf\u00EDa original de nuestras rodadas.",
    unsplashLink: "Unsplash",
    unsplashLicense: "Licencia Unsplash",
    replacingNote:
      "Estamos reemplazando activamente estos marcadores con fotograf\u00EDa original de las rodadas de Flow Society.",
    openSourceTitle: "C\u00F3digo abierto",
  },
  tourFaq: {
    eyebrow: "FAQ",
    title: "Preguntas frecuentes \u2014 {tourName}",
    items: [
      {
        q: "\u00BFQu\u00E9 nivel necesito para rodar?",
        a: "Cada experiencia de Flow Society tiene un nivel publicado. La ruta se ajusta al grupo, pero una experiencia previa b\u00E1sica ayuda a que todos disfruten la rodada. Si no est\u00E1s seguro, escr\u00EDbenos \u2014 te recomendamos la experiencia adecuada.",
      },
      {
        q: "\u00BFPuedo traer mi propia e-bike?",
        a: "S\u00ED \u2014 la mayor\u00EDa de los miembros lo hace. Lleg\u00E1 con bater\u00EDa completa. Si no tienes e-bike, puedes rentar una de las nuestras y el precio incluye una bici totalmente afinada.",
      },
      {
        q: "\u00BFCu\u00E1l es la pol\u00EDtica de cancelaci\u00F3n?",
        a: "Cancelaci\u00F3n gratuita hasta 30 d\u00EDas antes de la experiencia. Dentro de los 30 d\u00EDas trabajamos primero contigo en reprogramar; los reembolsos son caso a caso.",
      },
      {
        q: "\u00BFQu\u00E9 pasa si el clima cambia?",
        a: "Ajustamos rutas y horarios ante tormentas. En d\u00EDas raros posponemos \u2014 tu seguridad y la del sendero van primero.",
      },
      {
        q: "\u00BFQu\u00E9 se requiere para rodar?",
        a: "Casco (obligatorio \u2014 incluido gratis si no traes el tuyo), guantes, rodilleras recomendadas, una e-bike en buen estado con bater\u00EDa completa y experiencia previa b\u00E1sica.",
      },
      {
        q: "\u00BFC\u00F3mo funciona la membres\u00EDa?",
        a: "Los miembros tienen una master class y tres rides al mes, acceso prioritario a fechas de eventos, y descuentos en reservas privadas y la experiencia de campamento. Escr\u00EDbenos para precios actuales.",
      },
    ],
  },
  tourRecommendedBikes: {
    title: "E-bikes para esta experiencia",
    body: "La flota que mantenemos afinada y con bater\u00EDa completa para La Primavera \u2014 consulta especificaciones y precios por rodada en cada bici.",
    viewFullFleet: "Ver flota completa",
  },
  tourMobileBar: {
    from: "Desde",
    perRider: "/ rider",
    next: "Pr\u00F3xima: {label}",
    checkDates: "Ver fechas",
  },
  ux: {
    skipToMain: "Saltar al contenido principal",
    breadcrumbAria: "Migas de pan",
    breadcrumbHome: "Inicio",
    breadcrumbTours: "Experiencias",
    breadcrumbStories: "Diario",
    breadcrumbBikes: "E-Bikes",
    breadcrumbBook: "Reservar",
    breadcrumbCompare: "Comparar",
    breadcrumbGlossary: "Glosario",
    breadcrumbHowItWorks: "C\u00F3mo funciona",
    breadcrumbTripPrep: "Prep\u00E1rate",
    breadcrumbRideFit: "Tu nivel de ruta",
    howItWorks: {
      metaTitle: "C\u00F3mo funciona",
      metaDescription:
        "De elegir una experiencia a rodar en el bosque: qu\u00E9 esperar al reservar con Flow Society.",
      h1: "C\u00F3mo se arma una salida Flow Society",
      intro:
        "Dise\u00F1amos este recorrido para que siempre sepas en qu\u00E9 etapa est\u00E1s: explorar, apartar, confirmar, prepararte y rodar. Sin sorpresas ni pasos opacos.",
      steps: [
        {
          title: "1. Explora experiencias",
          body: "Lee niveles, duraci\u00F3n, notas de brunch y lounge, y fechas. Usa comparar o escr\u00EDbenos si dudas entre dos opciones.",
        },
        {
          title: "2. Solicita una fecha",
          body: "Env\u00EDa el formulario con riders, bicis y log\u00EDstica. Eso crea una solicitud de cupo mientras verificamos disponibilidad.",
        },
        {
          title: "3. Confirmaci\u00F3n en WhatsApp",
          body: "Respondemos con s\u00ED/no claro, dudas abiertas y precio final en pesos mexicanos. Puedes ajustar riders o recogida antes de pagar.",
        },
        {
          title: "4. Prep\u00E1rate con intenci\u00F3n",
          body: "Usa Prep\u00E1rate para maleta, bater\u00EDa, alimentaci\u00F3n y tiempos de traslado. Pide ayuda con aeropuerto o movilidad con tiempo.",
        },
        {
          title: "5. Rueda y lounge",
          body: "Llega listo, casco puesto, bater\u00EDa llena en rentas. Despu\u00E9s del rodaje, el After Ride Lounge es parte de la experiencia \u2014 deja un poco m\u00E1s de tiempo.",
        },
      ],
      supportTitle: "\u00BFAtascado en alg\u00FAn paso?",
      supportBody:
        "Escr\u00EDbenos por WhatsApp con tus fechas y nivel \u2014 te orientamos a la experiencia correcta sin presi\u00F3n de venta.",
      supportCta: "Contacto",
    },
    tripPrep: {
      metaTitle: "Prep\u00E1rate para la rodada",
      metaDescription:
        "Lista pr\u00E1ctica antes de tu experiencia en e-bike: equipo, bater\u00EDa, comida y tiempos de viaje.",
      h1: "Centro de preparaci\u00F3n",
      intro:
        "\u00Dasalo como un acuerdo simple contigo y con el sendero: menos sorpresas, m\u00E1s diversi\u00F3n, d\u00EDa m\u00E1s seguro para todos.",
      sections: [
        {
          title: "Antes de viajar",
          items: [
            "Comparte llegada de vuelo o bus si necesitas ventana de recogida \u2014 incluye terminal y retrasos que ya conozcas.",
            "Guarda nuestro WhatsApp y activa notificaciones el d\u00EDa de la rodada.",
            "Si no est\u00E1s acostumbrado a altitud (1.500 m+), hidr\u00E1tate m\u00E1s y duerme bien la noche anterior.",
          ],
        },
        {
          title: "Bici y bater\u00EDa",
          items: [
            "Rentas: llega con tiempo para revisar ajuste; la bater\u00EDa debe mostrarse llena al entregar.",
            "E-bike propia: carga completa, revisa l\u00EDmites de par, neum\u00E1ticos para suelo mixto de bosque.",
            "Si usas clip, trae los pedales que realmente usamos; tenemos interfaces comunes pero no todos los zapatos.",
          ],
        },
        {
          title: "Ropa y seguridad",
          items: [
            "Casco obligatorio \u2014 tenemos uno gratis si no traes.",
            "Capas para variaciones de 10\u201325 \u00B0C; chubasquero ligero para sombra vs sol en el bosque.",
            "Zapato cerrado con buen agarre; sin sandalias en sendero.",
          ],
        },
        {
          title: "Comida y brunch",
          items: [
            "Indica alergias con claridad \u2014 cocinamos estilo familiar para el grupo.",
            "Desayuno ligero si el brunch es media ma\u00F1ana; evita quedarte sin energ\u00EDa en la primera subida.",
          ],
        },
      ],
      glossaryLink: "Ver el glosario",
      rideFitLink: "\u00BFInseguro de tu nivel?",
    },
    glossary: {
      metaTitle: "Glosario de sendero y e-bike",
      metaDescription:
        "Definiciones claras de t\u00E9rminos que usamos en rutas, p\u00E1ginas de equipo y reservas.",
      h1: "Glosario de sendero y e-bike",
      intro:
        "Palabras compartidas = briefings m\u00E1s seguros. Pregunta al gu\u00EDa si algo no cuadra \u2014 preferimos dudas a suposiciones.",
      terms: [
        {
          term: "Singletrack",
          definition:
            "Sendero angosto para una bici a la vez. Adelantar requiere comunicaci\u00F3n y paciencia.",
        },
        {
          term: "Sendero de flow",
          definition:
            "Segmentos que llevan velocidad con rollers y peraltes \u2014 menos pedaleo, m\u00E1s ritmo.",
        },
        {
          term: "T\u00E9cnico (tramo)",
          definition:
            "Tramos cortos con roca, ra\u00EDces o curvas cerradas donde la l\u00EDnea y el frenado importan m\u00E1s.",
        },
        {
          term: "Desnivel / ganancia",
          definition:
            "Metros que pedaleas cuesta arriba en un tramo. M\u00E1s desnivel en La Primavera suele implicar m\u00E1s cambio de temperatura.",
        },
        {
          term: "E-MTB / e-bike",
          definition:
            "Mountain bike con asistencia al pedaleo \u2014 sigues pedaleando; el motor ayuda en subidas y aceleraciones.",
        },
        {
          term: "Autonom\u00EDa de bater\u00EDa",
          definition:
            "Distancia con asistencia antes de recargar. El modo tour y el peso del rider cambian mucho el n\u00FAmero.",
        },
        {
          term: "Tija telesc\u00F3pica",
          definition:
            "Tija que baja en bajadas y sube al pedalear \u2014 conviene practicarla antes de lo t\u00E9cnico.",
        },
        {
          term: "Pedales autom\u00E1ticos",
          definition:
            "Zapatos con calas que enganchan al pedal \u2014 m\u00E1s eficientes pero m\u00E1s dif\u00edciles de poner el pie si eres nuevo.",
        },
        {
          term: "Shuttle",
          definition:
            "El veh\u00EDculo sube un tramo para que enfoques el descenso o enlaces \u2014 anunciamos tiempos con claridad.",
        },
        {
          term: "Ruta adaptada al nivel",
          definition:
            "La misma experiencia, ajustada al ritmo m\u00E1s c\u00F3modo del grupo y con desv\u00EDos de tramos ese d\u00EDa.",
        },
      ],
    },
    rideFit: {
      metaTitle: "Encuentra tu nivel de rodaje",
      metaDescription:
        "Gu\u00EDa honesta a los niveles Flow Society \u2014 l\u00EEela antes de reservar con expectativas distintas.",
      h1: "Encuentra tu nivel de rodaje",
      intro:
        "Elige la fila que describe tu \u00FAltimo mes en bici, no tus aspiraciones. Los gu\u00EDas ajustan dentro de un rango, pero todos van m\u00E1s seguros cuando el rango encaja.",
      columns: {
        beginner: "Principiante",
        intermediate: "Intermedio",
        advanced: "Avanzado / d\u00EDas largos",
      },
      rows: [
        {
          label: "Rodaje reciente",
          beginner:
            "Algunas salidas al mes en tierra o gravel, a\u00FAn ganando confianza en curvas sueltas.",
          intermediate:
            "Salidas semanales; c\u00F3modo en trails azules y tramos cortos con coaching.",
          advanced:
            "Rodaje t\u00E9cnico habitual; d\u00EDas largos de subida son normales para ti.",
        },
        {
          label: "Condici\u00F3n en sendero",
          beginner: "1\u20132 horas ya se sienten una salida completa; los descansos son bienvenidos.",
          intermediate:
            "D\u00EDas de 3\u20134 horas con pausas; gestiona bien la subida sostenida con asistencia.",
          advanced:
            "D\u00EDas largos seguidos; gestiona comida y ritmo por tu cuenta.",
        },
        {
          label: "Actitud",
          beginner: "Curioso, acepta caminar tramos cortos, quiere instrucciones claras.",
          intermediate: "Abierto a desaf\u00EDo ligero; avisa cuando se cansa a tiempo.",
          advanced: "Consciente del riesgo; ayuda a riders m\u00E1s nuevos en el grupo.",
        },
      ],
      notSureTitle: "\u00BFEntre dos niveles?",
      notSureBody:
        "Reserva la experiencia del nivel inferior y escr\u00EDbenos \u2014 a menudo podemos a\u00F1adir tramos opcionales sin cambiar la dificultad anunciada para todos.",
      contactCta: "WhatsApp",
      bookCta: "Ver experiencias",
    },
  },
};

export default es;
