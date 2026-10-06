// Baselarte — English / Brazilian Portuguese.
// Classic (non-module) script so it runs right after the markup is parsed,
// before main.js and usually before first paint.
//
// Markup hooks:
//   data-i18n="key"                 → element innerHTML (strings may contain <em>)
//   data-i18n-attr="attr:key;..."   → element attributes
//   data-lang-toggle                → button that flips between the two languages
//   data-set-lang="en|pt-BR"        → button that picks a specific language

(function () {
  var STRINGS = {
    en: {
      "meta.title": "Baselarte — Software Engineering & Creative Technology",
      "meta.description": "Baselarte is a software engineering and creative technology company. Quietly building precise systems, interfaces and infrastructure.",
      "meta.locale": "en_US",

      "skip": "Skip to content",
      "nav.label": "Main",
      "nav.about": "About",
      "nav.practice": "Practice",
      "nav.principles": "Principles",
      "lang.short": "PT",
      "lang.switch": "Ver em português",

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
      "principles.cite": "IBM internal training presentation, 1979",
      "principles.body": "We build tools that help people decide, not tools that decide for them. Automation should sharpen judgment, never replace it.",

      "status.title": "Something is being built",
      "status.body": "Inquiries by introduction only.",

      "footer.company": "Company",
      "footer.language": "Language",
      "footer.index": "Index",
      "footer.time": "Local time",
      "mode.day": "day",
      "mode.night": "night"
    },

    "pt-BR": {
      "meta.title": "Baselarte — Engenharia de Software e Tecnologia Criativa",
      "meta.description": "A Baselarte é uma empresa de engenharia de software e tecnologia criativa. Construindo, em silêncio, sistemas, interfaces e infraestrutura precisos.",
      "meta.locale": "pt_BR",

      "skip": "Pular para o conteúdo",
      "nav.label": "Principal",
      "nav.about": "Sobre",
      "nav.practice": "Prática",
      "nav.principles": "Princípios",
      "lang.short": "EN",
      "lang.switch": "View in English",

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
      "principles.cite": "Apresentação interna de treinamento da IBM, 1979",
      "principles.body": "Construímos ferramentas que ajudam pessoas a decidir, não ferramentas que decidem por elas. A automação deve afiar o julgamento, nunca substituí-lo.",

      "status.title": "Algo está sendo construído",
      "status.body": "Contatos apenas por indicação.",

      "footer.company": "Empresa",
      "footer.language": "Idioma",
      "footer.index": "Índice",
      "footer.time": "Hora local",
      "mode.day": "dia",
      "mode.night": "noite"
    }
  };

  var root = document.documentElement;

  function current() {
    return root.lang === "pt-BR" ? "pt-BR" : "en";
  }

  function t(key) {
    var table = STRINGS[current()];
    return key in table ? table[key] : STRINGS.en[key];
  }

  function setMeta(selector, value) {
    var el = document.querySelector(selector);
    if (el) el.setAttribute("content", value);
  }

  function apply() {
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      el.innerHTML = t(el.getAttribute("data-i18n"));
    });

    document.querySelectorAll("[data-i18n-attr]").forEach(function (el) {
      el.getAttribute("data-i18n-attr").split(";").forEach(function (pair) {
        var parts = pair.split(":");
        el.setAttribute(parts[0].trim(), t(parts[1].trim()));
      });
    });

    document.querySelectorAll("[data-set-lang]").forEach(function (el) {
      el.setAttribute("aria-pressed", String(el.getAttribute("data-set-lang") === current()));
    });

    document.title = t("meta.title");
    setMeta('meta[name="description"]', t("meta.description"));
    setMeta('meta[property="og:locale"]', t("meta.locale"));
    setMeta('meta[property="og:locale:alternate"]', current() === "en" ? "pt_BR" : "en_US");
  }

  async function setLang(lang) {
    if (lang === current()) return;

    // main.js may provide a cross-fade; the switch works without it.
    if (window.__fadeOut) await window.__fadeOut();

    root.lang = lang;
    try { localStorage.setItem("lang", lang); } catch (e) {}
    apply();

    if (window.__fadeIn) window.__fadeIn();
  }

  document.querySelectorAll("[data-lang-toggle]").forEach(function (el) {
    el.addEventListener("click", function () {
      setLang(current() === "en" ? "pt-BR" : "en");
    });
  });

  document.querySelectorAll("[data-set-lang]").forEach(function (el) {
    el.addEventListener("click", function () {
      setLang(el.getAttribute("data-set-lang"));
    });
  });

  window.i18n = { t: t, apply: apply, current: current, setLang: setLang };

  if (current() !== "en") apply();
})();
