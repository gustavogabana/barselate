// Baselarte — English / Brazilian Portuguese.
// Classic (non-module) script at the end of <body>, so it runs right after the
// markup is parsed and before main.js. Depends on window.siteBoot (boot.js).
//
// Markup hooks:
//   data-i18n="key"                          → element innerHTML (strings may contain <em>)
//   data-i18n-attributes="attribute:key;..." → element attributes (e.g. meta content, aria-label)
//   data-language-toggle                     → button that flips between the two languages
//   data-language-option="en|pt-BR"          → button that picks a specific language

(() => {
  const TRANSLATIONS = {
    en: {
      "meta.title": "Baselarte — Software Engineering & Creative Technology",
      "meta.description": "Baselarte is a software engineering and creative technology company. Quietly building precise systems, interfaces and infrastructure.",
      "meta.locale": "en_US",
      "meta.localeAlternate": "pt_BR",

      "skipLink": "Skip to content",
      "nav.label": "Main",
      "nav.about": "About",
      "nav.practice": "Practice",
      "nav.principles": "Principles",
      "languageToggle.label": "PT",
      "languageToggle.description": "Ver em português",

      "hero.title": "Software engineering, built with <em>quiet precision.</em>",
      "hero.lede": "Baselarte is a software engineering and creative technology company. We build systems, interfaces and infrastructure that are <em>simple on the surface</em> and rigorous underneath.",

      "about.title": "Simplicity is a discipline",
      "about.body": "Most software fails slowly, under the weight of what it never needed. We start from fundamentals, build only what is necessary, and then make it excellent. Clarity over abstraction. Fundamentals over fashion.",

      "practice.title": "What we work on",
      "practice.intro": "Four areas, in no particular hurry.",
      "practice.engineering": "<em>Engineering.</em> Software that is correct first, fast second and clever only when it must be. Clear boundaries, honest abstractions, code meant to be read.",
      "practice.infrastructure": "<em>Infrastructure.</em> Cloud, storage and delivery treated as craft: observable, reproducible and cheap to keep alive.",
      "practice.interfaces": "<em>Interfaces.</em> Calm, legible, fast. Fewer screens, better words, motion with a purpose.",
      "practice.creative": "<em>Creative technology.</em> Experiments, tools and small instruments that make an idea tangible before it becomes a product.",

      "principles.title": "Accountability stays human",
      "principles.quote": "A computer can never be held accountable, therefore a computer must never make a management decision.",
      "principles.citation": "IBM internal training presentation, 1979",
      "principles.body": "We build tools that help people decide, not tools that decide for them. Automation should sharpen judgment, never replace it.",

      "status.title": "Something is being built",
      "status.body": "Inquiries by introduction only.",

      "footer.company": "Company",
      "footer.language": "Language",
      "footer.index": "Index",
      "footer.localTime": "Local time",
      "dayPeriod.day": "day",
      "dayPeriod.night": "night",

      "notFound.metaTitle": "Not found — Baselarte",
      "notFound.title": "Nothing <em>here, yet.</em>",
      "notFound.backHome": "Back to baselarte.com"
    },

    "pt-BR": {
      "meta.title": "Baselarte — Engenharia de Software e Tecnologia Criativa",
      "meta.description": "A Baselarte é uma empresa de engenharia de software e tecnologia criativa. Construindo, em silêncio, sistemas, interfaces e infraestrutura precisos.",
      "meta.locale": "pt_BR",
      "meta.localeAlternate": "en_US",

      "skipLink": "Pular para o conteúdo",
      "nav.label": "Principal",
      "nav.about": "Sobre",
      "nav.practice": "Prática",
      "nav.principles": "Princípios",
      "languageToggle.label": "EN",
      "languageToggle.description": "View in English",

      "hero.title": "Engenharia de software, feita com <em>precisão silenciosa.</em>",
      "hero.lede": "A Baselarte é uma empresa de engenharia de software e tecnologia criativa. Construímos sistemas, interfaces e infraestrutura <em>simples na superfície</em> e rigorosos por dentro.",

      "about.title": "Simplicidade é disciplina",
      "about.body": "A maior parte dos softwares falha devagar, sob o peso do que nunca precisou ter. Partimos dos fundamentos, construímos apenas o necessário e, então, o tornamos excelente. Clareza acima da abstração. Fundamentos acima da moda.",

      "practice.title": "No que trabalhamos",
      "practice.intro": "Quatro frentes, sem pressa alguma.",
      "practice.engineering": "<em>Engenharia.</em> Software correto primeiro, rápido depois e engenhoso só quando necessário. Limites claros, abstrações honestas, código feito para ser lido.",
      "practice.infrastructure": "<em>Infraestrutura.</em> Nuvem, armazenamento e entrega tratados como ofício: observáveis, reproduzíveis e baratos de manter.",
      "practice.interfaces": "<em>Interfaces.</em> Calmas, legíveis, rápidas. Menos telas, palavras melhores, movimento com propósito.",
      "practice.creative": "<em>Tecnologia criativa.</em> Experimentos, ferramentas e pequenos instrumentos que tornam uma ideia tangível antes de ela virar produto.",

      "principles.title": "A responsabilidade continua humana",
      "principles.quote": "Um computador nunca pode ser responsabilizado; portanto, um computador nunca deve tomar uma decisão de gestão.",
      "principles.citation": "Apresentação interna de treinamento da IBM, 1979",
      "principles.body": "Construímos ferramentas que ajudam pessoas a decidir, não ferramentas que decidem por elas. A automação deve afiar o julgamento, nunca substituí-lo.",

      "status.title": "Algo está sendo construído",
      "status.body": "Contatos apenas por indicação.",

      "footer.company": "Empresa",
      "footer.language": "Idioma",
      "footer.index": "Índice",
      "footer.localTime": "Hora local",
      "dayPeriod.day": "dia",
      "dayPeriod.night": "noite",

      "notFound.metaTitle": "Página não encontrada — Baselarte",
      "notFound.title": "Nada <em>aqui, ainda.</em>",
      "notFound.backHome": "Voltar para baselarte.com"
    }
  };

  const documentRoot = document.documentElement;
  const { DEFAULT_LANGUAGE, storeLanguage } = window.siteBoot;

  function currentLanguage() {
    return documentRoot.lang in TRANSLATIONS ? documentRoot.lang : DEFAULT_LANGUAGE;
  }

  function translate(key) {
    const activeTranslations = TRANSLATIONS[currentLanguage()];
    return key in activeTranslations ? activeTranslations[key] : TRANSLATIONS[DEFAULT_LANGUAGE][key];
  }

  function applyTranslations() {
    document.querySelectorAll("[data-i18n]").forEach((element) => {
      element.innerHTML = translate(element.dataset.i18n);
    });

    document.querySelectorAll("[data-i18n-attributes]").forEach((element) => {
      element.dataset.i18nAttributes.split(";").forEach((attributeMapping) => {
        const [attributeName, translationKey] = attributeMapping.split(":").map((part) => part.trim());
        element.setAttribute(attributeName, translate(translationKey));
      });
    });

    document.querySelectorAll("[data-language-option]").forEach((optionButton) => {
      const isActive = optionButton.dataset.languageOption === currentLanguage();
      optionButton.setAttribute("aria-pressed", String(isActive));
    });
  }

  async function setLanguage(language) {
    if (language === currentLanguage()) return;

    // main.js may register a cross-fade; switching works without it.
    const transition = window.languageTransition;
    if (transition) await transition.fadeOut();

    documentRoot.lang = language;
    storeLanguage(language);
    applyTranslations();

    if (transition) transition.fadeIn();
  }

  document.querySelectorAll("[data-language-toggle]").forEach((toggleButton) => {
    toggleButton.addEventListener("click", () => {
      setLanguage(currentLanguage() === "en" ? "pt-BR" : "en");
    });
  });

  document.querySelectorAll("[data-language-option]").forEach((optionButton) => {
    optionButton.addEventListener("click", () => {
      setLanguage(optionButton.dataset.languageOption);
    });
  });

  window.i18n = { translate, applyTranslations, currentLanguage, setLanguage };

  // The markup ships in English; this switches it to the detected language and
  // marks the active option in the footer.
  applyTranslations();
})();
