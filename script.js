/* =========================================================
   WATER SAFE — FINAL INTERACTIVE JAVASCRIPT
   CHE110 • Group 13 • LPU
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =========================================================
     BASIC HELPERS
     ========================================================= */

  const $ = (selector, parent = document) =>
    parent.querySelector(selector);

  const $$ = (selector, parent = document) =>
    [...parent.querySelectorAll(selector)];

  const root = document.documentElement;
  const finePointer = window.matchMedia("(pointer:fine)").matches;
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;


  /* =========================================================
     HEADER + SCROLL PROGRESS
     ========================================================= */

  const header = $("#siteHeader");
  const progressBar = $("#progressBar");

  function updateScrollUI() {

    if (header) {
      header.classList.toggle("scrolled", window.scrollY > 30);
    }

    if (progressBar) {
      const max =
        document.documentElement.scrollHeight - window.innerHeight;

      const progress =
        max > 0 ? (window.scrollY / max) * 100 : 0;

      progressBar.style.width = `${progress}%`;
    }
  }

  window.addEventListener("scroll", updateScrollUI, {
    passive: true
  });

  updateScrollUI();


  /* =========================================================
     MOBILE MENU
     ========================================================= */

  const menuBtn = $("#menuBtn");
  const mobileNav = $("#mobileNav");

  if (menuBtn && mobileNav) {

    menuBtn.addEventListener("click", () => {

      const open = mobileNav.classList.toggle("open");

      menuBtn.setAttribute(
        "aria-expanded",
        String(open)
      );

      menuBtn.textContent = open ? "×" : "☰";
    });

    $$(".mobile-nav a").forEach(link => {

      link.addEventListener("click", () => {

        mobileNav.classList.remove("open");

        menuBtn.textContent = "☰";

        menuBtn.setAttribute(
          "aria-expanded",
          "false"
        );
      });

    });
  }


  /* =========================================================
     SCROLL REVEAL
     ========================================================= */

  const revealObserver = new IntersectionObserver(
    entries => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          entry.target.classList.add("visible");

          revealObserver.unobserve(entry.target);
        }

      });

    },
    {
      threshold: 0.12
    }
  );

  $$(".reveal").forEach(element => {
    revealObserver.observe(element);
  });


  /* =========================================================
     HERO PARALLAX
     ========================================================= */

  const hero = $(".hero");
  const heroCard = $("#heroWaterCard");

  if (
    hero &&
    heroCard &&
    finePointer &&
    !reducedMotion
  ) {

    hero.addEventListener("mousemove", event => {

      const x =
        (event.clientX / window.innerWidth - 0.5) * 12;

      const y =
        (event.clientY / window.innerHeight - 0.5) * 12;

      heroCard.style.transform =
        `translate(${x}px, calc(-50% + ${y}px))`;
    });

    hero.addEventListener("mouseleave", () => {

      heroCard.style.transform =
        "translateY(-50%)";
    });
  }


  /* =========================================================
     UNIVERSAL INFORMATION MODAL
     ========================================================= */

  const modal = document.createElement("div");

  modal.className = "info-modal";

  modal.innerHTML = `
    <div class="info-modal-backdrop" data-modal-close></div>

    <div
      class="info-modal-panel"
      role="dialog"
      aria-modal="true"
      aria-labelledby="infoModalTitle"
    >

      <button
        class="info-modal-close"
        type="button"
        aria-label="Close information"
        data-modal-close
      >
        ×
      </button>

      <div class="info-modal-icon" id="infoModalIcon">
        💧
      </div>

      <span
        class="info-modal-category"
        id="infoModalCategory"
      >
        WATER SAFETY
      </span>

      <h2 id="infoModalTitle">
        Information
      </h2>

      <div
        class="info-modal-body"
        id="infoModalBody"
      ></div>

      <div
        class="info-modal-source"
        id="infoModalSource"
      ></div>

    </div>
  `;

  document.body.appendChild(modal);

  const modalIcon = $("#infoModalIcon", modal);
  const modalCategory = $("#infoModalCategory", modal);
  const modalTitle = $("#infoModalTitle", modal);
  const modalBody = $("#infoModalBody", modal);
  const modalSource = $("#infoModalSource", modal);

  let previousFocus = null;


  function openInfoModal({
    title = "Water Safety",
    category = "INFORMATION",
    icon = "💧",
    content = "",
    source = ""
  }) {

    previousFocus = document.activeElement;

    modalIcon.textContent =
      icon;

    modalCategory.textContent =
      category;

    modalTitle.textContent =
      title;

    modalBody.innerHTML =
      content;

    modalSource.innerHTML =
      source;

    modal.classList.add("open");

    document.body.classList.add(
      "modal-open"
    );

    setTimeout(() => {

      $(".info-modal-close", modal)?.focus();

    }, 50);
  }


  function closeInfoModal() {

    modal.classList.remove("open");

    document.body.classList.remove(
      "modal-open"
    );

    if (
      previousFocus &&
      typeof previousFocus.focus === "function"
    ) {
      previousFocus.focus();
    }
  }


  $$("[data-modal-close]", modal).forEach(
    element => {

      element.addEventListener(
        "click",
        closeInfoModal
      );

    }
  );


  document.addEventListener(
    "keydown",
    event => {

      if (event.key === "Escape") {

        closeInfoModal();

      }

    }
  );


  /* =========================================================
     UNIVERSAL CARD INFORMATION
     ========================================================= */

  const cardInformation = {

    ".hero-water-card": {
      title: "Clean water is more than hydration",
      category: "WATER & HEALTH",
      icon: "💧",
      content: `
        <p>
          Drinking water is essential for life, but safety depends
          on more than simply having access to water.
        </p>

        <p>
          A safe drinking-water system considers the source,
          treatment, distribution, storage and the hygiene practices
          of people using the water.
        </p>

        <div class="modal-highlight">
          <strong>Key idea</strong>
          <span>
            Water safety is a chain. A problem at any stage can
            affect the final drinking-water experience.
          </span>
        </div>
      `
    },

    ".hero-meta span:nth-child(1)": {
      title: "Global water access",
      category: "GLOBAL ACCESS",
      icon: "🌍",
      content: `
        <p>
          Drinking-water access differs greatly between countries,
          communities and households.
        </p>

        <p>
          The WHO/UNICEF Joint Monitoring Programme distinguishes
          between basic access and safely managed drinking water.
        </p>

        <div class="modal-highlight">
          <strong>Safely managed means</strong>
          <span>
            An improved source that is accessible on premises,
            available when needed and free from contamination.
          </span>
        </div>
      `
    },

    ".hero-meta span:nth-child(2)": {
      title: "Water quality",
      category: "WATER QUALITY",
      icon: "🔬",
      content: `
        <p>
          Water quality cannot normally be judged simply by
          looking at the water.
        </p>

        <p>
          Microbial, chemical and physical characteristics may
          require appropriate testing.
        </p>

        <div class="modal-highlight">
          <strong>Remember</strong>
          <span>
            Clear-looking water is not automatically safe water.
          </span>
        </div>
      `
    },

    ".hero-meta span:nth-child(3)": {
      title: "Prevention",
      category: "PREVENTION",
      icon: "🛡️",
      content: `
        <p>
          Prevention includes protecting water sources, maintaining
          infrastructure and practising good hygiene.
        </p>

        <p>
          At the personal level, regularly cleaning reusable bottles,
          washing hands and reporting visibly unsafe water points
          can reduce avoidable hygiene risks.
        </p>
      `
    }

  };


  /* =========================================================
     GLOBAL FACT CARDS
     ========================================================= */

  const factDetails = [
    {
      title: "Safely managed drinking water",
      icon: "🌍",
      content: `
        <p>
          In 2022, about 73% of the world's population used
          safely managed drinking-water services according to WHO.
        </p>

        <p>
          This means billions of people still lacked water that
          met all the conditions of safe management.
        </p>

        <div class="modal-highlight">
          <strong>Definition</strong>
          <span>
            Improved source + accessible + available when needed
            + free from contamination.
          </span>
        </div>
      `
    },

    {
      title: "India's drinking-water progress",
      icon: "🇮🇳",
      content: `
        <p>
          UNICEF India's summary of the latest JMP estimates reports
          safely managed drinking-water coverage of approximately
          76.4% for India in 2024.
        </p>

        <p>
          Access and functionality are different concepts, so water
          infrastructure also needs regular maintenance and monitoring.
        </p>
      `
    },

    {
      title: "The contamination challenge",
      icon: "⚠️",
      content: `
        <p>
          Microbial contamination is one of the greatest risks to
          drinking-water safety.
        </p>

        <p>
          Contaminated water can transmit diseases including
          diarrhoea, cholera, dysentery, hepatitis A, typhoid and polio.
        </p>
      `
    }

  ];


  $$(".fact-card").forEach(
    (card, index) => {

      const detail =
        factDetails[index];

      if (!detail) {
        return;
      }

      card.addEventListener(
        "click",
        () => {

          openInfoModal({
            title: detail.title,
            category: "GLOBAL WATER",
            icon: detail.icon,
            content: detail.content
          });

        }
      );

      card.setAttribute(
        "tabindex",
        "0"
      );

      card.setAttribute(
        "role",
        "button"
      );

      card.addEventListener(
        "keydown",
        event => {

          if (
            event.key === "Enter" ||
            event.key === " "
          ) {

            event.preventDefault();

            card.click();

          }

        }
      );

    }
  );


  /* =========================================================
     GENERIC CARD INFORMATION
     ========================================================= */

  Object.entries(
    cardInformation
  ).forEach(
    ([selector, detail]) => {

      const elements =
        $$(selector);

      elements.forEach(
        element => {

          element.classList.add(
            "is-interactive"
          );

          element.setAttribute(
            "tabindex",
            "0"
          );

          element.setAttribute(
            "role",
            "button"
          );

          element.addEventListener(
            "click",
            event => {

              if (
                event.target.closest("a,button")
              ) {
                return;
              }

              openInfoModal(detail);

            }
          );

          element.addEventListener(
            "keydown",
            event => {

              if (
                event.key === "Enter" ||
                event.key === " "
              ) {

                event.preventDefault();

                element.click();

              }

            }
          );

        }
      );

    }
  );


  /* =========================================================
     GLOBAL WATER EXPLORER
     ========================================================= */

  const regionInfo = {

    india: {
      title: "India",
      icon: "🇮🇳",
      stat: "76.4%",
      label: "safely managed coverage in 2024",
      content: `
        <p>
          India's drinking-water access has expanded significantly,
          while quality, regularity and functionality remain important
          parts of water-safety management.
        </p>

        <div class="modal-highlight">
          <strong>Focus</strong>
          <span>
            Access, reliability, water quality and safe use all matter.
          </span>
        </div>
      `
    },

    asia: {
      title: "Asia",
      icon: "🌏",
      stat: "REGIONAL",
      label: "large and diverse water systems",
      content: `
        <p>
          Asia contains extremely diverse water systems, from
          heavily urbanised regions to remote communities.
        </p>

        <p>
          Water safety challenges therefore vary widely between
          locations.
        </p>
      `
    },

    africa: {
      title: "Africa",
      icon: "🌍",
      stat: "HIGH VARIATION",
      label: "access differs substantially by location",
      content: `
        <p>
          Drinking-water access varies substantially across African
          countries and communities.
        </p>

        <p>
          Infrastructure, climate, geography and water quality can
          all influence access.
        </p>
      `
    },

    europe: {
      title: "Europe",
      icon: "🌍",
      stat: "HIGH COVERAGE",
      label: "generally strong managed services",
      content: `
        <p>
          Many European countries have high levels of safely managed
          drinking-water services, supported by established infrastructure
          and regulation.
        </p>
      `
    },

    northamerica: {
      title: "North America",
      icon: "🌎",
      stat: "HIGH COVERAGE",
      label: "established drinking-water systems",
      content: `
        <p>
          North American drinking-water systems generally have broad
          access to managed services, although local contamination events
          and infrastructure challenges can still occur.
        </p>
      `
    },

    southamerica: {
      title: "South America",
      icon: "🌎",
      stat: "MIXED",
      label: "coverage differs across communities",
      content: `
        <p>
          Water access and quality vary across South American countries,
          cities and rural communities.
        </p>
      `
    },

    oceania: {
      title: "Oceania",
      icon: "🌊",
      stat: "VARIED",
      label: "different conditions across islands and Australia",
      content: `
        <p>
          Oceania includes highly different water systems, from
          large developed networks to small island communities.
        </p>
      `
    }

  };


  $$(".continent").forEach(
    continent => {

      continent.addEventListener(
        "click",
        () => {

          $$(".continent").forEach(
            item => {
              item.classList.remove(
                "active"
              );
            }
          );

          continent.classList.add(
            "active"
          );

          const region =
            continent.dataset.region;

          const detail =
            regionInfo[region];

          if (!detail) {
            return;
          }

          openInfoModal({
            title: detail.title,
            category: "GLOBAL WATER EXPLORER",
            icon: detail.icon,
            content: `
              <div class="explorer-stat">
                <strong>${detail.stat}</strong>
                <span>${detail.label}</span>
              </div>
              ${detail.content}
            `
          });

        }
      );

    }
  );


  /* =========================================================
     WATER SOURCE EXPLORER
     ========================================================= */

  const sourceData = {

    surface: {
      title: "Surface water",
      icon: "🌊",
      description:
        "Rivers, lakes and reservoirs can provide drinking water but may be exposed to microbial and chemical contamination.",
      points: [
        "Requires appropriate treatment before drinking.",
        "Can be affected by runoff and human activity.",
        "Protection of the source is part of water safety."
      ]
    },

    ground: {
      title: "Groundwater",
      icon: "💧",
      description:
        "Groundwater can be naturally protected, but its quality can vary because of geology and contamination entering the ground.",
      points: [
        "May contain naturally occurring minerals.",
        "Can be affected by agricultural or industrial contamination.",
        "Testing helps identify chemical concerns."
      ]
    },

    rain: {
      title: "Rainwater",
      icon: "🌧️",
      description:
        "Rainwater can be collected, but collection surfaces, storage containers and surrounding conditions affect its quality.",
      points: [
        "Collection surfaces should be clean.",
        "Storage containers need regular maintenance.",
        "Treatment may be needed depending on use and quality."
      ]
    },

    reservoir: {
      title: "Reservoir water",
      icon: "🏞️",
      description:
        "Reservoirs store large quantities of water and can be important sources for treated drinking-water systems.",
      points: [
        "Source protection is important.",
        "Water quality can change with environmental conditions.",
        "Treatment and monitoring remain essential."
      ]
    },

    treated: {
      title: "Treated drinking water",
      icon: "🧪",
      description:
        "Treatment systems are designed to reduce contaminants and produce water suitable for its intended use.",
      points: [
        "Treatment should be supported by monitoring.",
        "Distribution and storage also matter.",
        "Safe handling at the point of use is still important."
      ]
    }

  };


  const sourceTabs =
    $$(".source-tab");

  const sourceTitle =
    $("#sourceTitle");

  const sourceDescription =
    $("#sourceDescription");

  const sourcePoints =
    $("#sourcePoints");

  function renderSource(
    key
  ) {

    const data =
      sourceData[key];

    if (!data) {
      return;
    }

    sourceTabs.forEach(
      tab => {

        tab.classList.toggle(
          "active",
          tab.dataset.source === key
        );

      }
    );

    if (sourceTitle) {

      sourceTitle.innerHTML =
        `${data.icon} ${data.title}`;

    }

    if (sourceDescription) {

      sourceDescription.textContent =
        data.description;

    }

    if (sourcePoints) {

      sourcePoints.innerHTML =
        data.points
          .map(
            point =>
              `<li>${point}</li>`
          )
          .join("");

    }

  }


  sourceTabs.forEach(
    tab => {

      tab.addEventListener(
        "click",
        () => {

          renderSource(
            tab.dataset.source
          );

        }
      );

    }
  );


  renderSource(
    sourceTabs[0]?.dataset.source ||
    "surface"
  );


  /* =========================================================
     WATER QUALITY LAB
     ========================================================= */

  const labSamples = {

    treated: {
      title: "Treated water sample",
      status: "REFERENCE SAMPLE",
      description:
        "A simplified example of a treated-water profile. Real drinking-water assessment requires appropriate laboratory or field testing.",
      values: {
        ph: "7.2",
        tds: "180 mg/L",
        turbidity: "0.4 NTU",
        fluoride: "0.6 mg/L",
        nitrate: "18 mg/L"
      },
      notes: [
        "Values are illustrative.",
        "pH is shown as a water-quality parameter, not a complete safety test.",
        "TDS is not itself a health-based safety cutoff."
      ]
    },

    surface: {
      title: "Surface water sample",
      status: "TREATMENT REQUIRED",
      description:
        "This illustrative sample represents water from a surface source before treatment.",
      values: {
        ph: "6.5",
        tds: "320 mg/L",
        turbidity: "8.7 NTU",
        fluoride: "0.4 mg/L",
        nitrate: "27 mg/L"
      },
      notes: [
        "Higher turbidity can indicate suspended particles.",
        "Surface water may require treatment before drinking.",
        "Microbial testing is particularly important."
      ]
    },

    nitrate: {
      title: "Nitrate concern",
      status: "CHEMICAL CONCERN",
      description:
        "This example highlights a nitrate value above the WHO guideline value of 50 mg/L as nitrate ion.",
      values: {
        ph: "7.4",
        tds: "410 mg/L",
        turbidity: "0.8 NTU",
        fluoride: "0.7 mg/L",
        nitrate: "68 mg/L"
      },
      notes: [
        "WHO guideline value for nitrate is 50 mg/L as nitrate ion.",
        "The example is intentionally simplified.",
        "Actual assessment requires representative sampling and testing."
      ]
    },

    fluoride: {
      title: "Fluoride concern",
      status: "CHEMICAL CONCERN",
      description:
        "This example highlights a fluoride value above the WHO guideline value of 1.5 mg/L.",
      values: {
        ph: "7.6",
        tds: "520 mg/L",
        turbidity: "0.6 NTU",
        fluoride: "2.1 mg/L",
        nitrate: "22 mg/L"
      },
      notes: [
        "WHO guideline value for fluoride is 1.5 mg/L.",
        "Excessive fluoride exposure over time can cause fluorosis.",
        "Actual assessment needs proper sampling and laboratory testing."
      ]
    }

  };


  const sampleButtons =
    $$(".sample-btn");

  const labTitle =
    $("#labTitle");

  const labStatus =
    $("#labStatus");

  const labDescription =
    $("#labDescription");

  const labNotes =
    $("#labNotes");


  function renderLab(
    key
  ) {

    const sample =
      labSamples[key];

    if (!sample) {
      return;
    }

    sampleButtons.forEach(
      button => {

        button.classList.toggle(
          "active",
          button.dataset.sample === key
        );

      }
    );

    if (labTitle) {

      labTitle.textContent =
        sample.title;

    }

    if (labStatus) {

      labStatus.textContent =
        sample.status;

    }

    if (labDescription) {

      labDescription.textContent =
        sample.description;

    }

    Object.entries(
      sample.values
    ).forEach(
      ([parameter, value]) => {

        const element =
          $(`[data-value="${parameter}"]`);

        if (element) {

          element.textContent =
            value;

        }

      }
    );


    if (labNotes) {

      labNotes.innerHTML =
        sample.notes
          .map(
            note =>
              `<li>${note}</li>`
          )
          .join("");

    }

  }


  sampleButtons.forEach(
    button => {

      button.addEventListener(
        "click",
        () => {

          renderLab(
            button.dataset.sample
          );

        }
      );

    }
  );


  renderLab(
    sampleButtons[0]?.dataset.sample ||
    "treated"
  );


  /* =========================================================
     LAB PARAMETER INFORMATION
     ========================================================= */

  const parameterInfo = {

    ph: {
      title: "pH",
      icon: "🧪",
      content: `
        <p>
          pH describes how acidic or alkaline water is.
        </p>

        <p>
          It is an important operational and chemical parameter,
          but pH alone cannot prove that water is safe to drink.
        </p>
      `
    },

    tds: {
      title: "Total dissolved solids",
      icon: "💧",
      content: `
        <p>
          TDS is a measure related to dissolved substances in water.
        </p>

        <p>
          It can be useful for characterising water, but it should
          not be treated as a single health-based safety cutoff.
        </p>
      `
    },

    turbidity: {
      title: "Turbidity",
      icon: "🔬",
      content: `
        <p>
          Turbidity describes the cloudiness of water caused by
          suspended particles.
        </p>

        <p>
          Higher turbidity can interfere with treatment and may
          indicate a water-quality problem.
        </p>
      `
    },

    fluoride: {
      title: "Fluoride",
      icon: "⚗️",
      content: `
        <p>
          Fluoride occurs naturally in many water sources.
        </p>

        <p>
          The WHO guideline value for fluoride in drinking water
          is 1.5 mg/L.
        </p>
      `
    },

    nitrate: {
      title: "Nitrate",
      icon: "🌱",
      content: `
        <p>
          Nitrate can enter water through agricultural activity,
          wastewater and other sources.
        </p>

        <p>
          The WHO guideline value is 50 mg/L as nitrate ion.
        </p>
      `
    }

  };


  $$("[data-parameter]").forEach(
    parameter => {

      parameter.addEventListener(
        "click",
        () => {

          const key =
            parameter.dataset.parameter;

          const data =
            parameterInfo[key];

          if (!data) {
            return;
          }

          openInfoModal({
            title: data.title,
            category: "WATER QUALITY PARAMETER",
            icon: data.icon,
            content: data.content
          });

        }
      );

    }
  );


  /* =========================================================
     SPOT THE RISK — SIX CLEAR RISKS
     ========================================================= */

  const riskGameData = {

    "1": {
      title: "Standing water",
      why:
        "Pooled water can create an unhygienic area around a drinking point.",
      action:
        "Keep the area dry and report persistent leaks or drainage problems."
    },

    "2": {
      title: "Dirty bottle",
      why:
        "Residue and moisture can support microbial growth when a reusable bottle is not cleaned regularly.",
      action:
        "Wash the bottle, cap and drinking opening regularly and let them dry properly."
    },

    "3": {
      title: "Tap or nozzle contact",
      why:
        "Touching dispensing surfaces with unclean hands can introduce contamination at the point of use.",
      action:
        "Wash hands before filling and avoid touching the drinking outlet."
    },

    "4": {
      title: "Nearby waste",
      why:
        "Rubbish close to a drinking-water point can create a hygiene and maintenance concern.",
      action:
        "Keep waste away from the water point and report overflowing bins or litter."
    },

    "5": {
      title: "Unclean surroundings",
      why:
        "Dirty surfaces around the filling area can affect hygiene at the point where people collect water.",
      action:
        "Keep the surrounding area clean and report persistent dirt or damage."
    },

    "6": {
      title: "Poor fixture condition",
      why:
        "Damaged or poorly maintained fixtures can contribute to contamination concerns and water loss.",
      action:
        "Report broken, leaking or visibly damaged fixtures for maintenance."
    }

  };


  const hotspots =
    $$(".hotspot");

  const riskScore =
    $("#riskScore");

  const riskMessage =
    $("#riskMessage");

  const riskReset =
    $("#riskReset");

  const riskExplanation =
    $("#riskExplanation");

  const riskExplanationNumber =
    $("#riskExplanationNumber");

  const riskExplanationTitle =
    $("#riskExplanationTitle");

  const riskExplanationWhy =
    $("#riskExplanationWhy");

  const riskExplanationAction =
    $("#riskExplanationAction");


  let foundRisks =
    new Set();


  function showRiskExplanation(
    number
  ) {

    const data =
      riskGameData[number];

    if (!data) {
      return;
    }

    if (riskExplanationNumber) {

      riskExplanationNumber.textContent =
        number;

    }

    if (riskExplanationTitle) {

      riskExplanationTitle.textContent =
        data.title;

    }

    if (riskExplanationWhy) {

      riskExplanationWhy.textContent =
        data.why;

    }

    if (riskExplanationAction) {

      riskExplanationAction.textContent =
        data.action;

    }

    if (riskExplanation) {

      riskExplanation.classList.add(
        "active"
      );

    }

  }


  function updateRiskGame() {

    if (riskScore) {

      riskScore.textContent =
        `${foundRisks.size}/6`;

    }

    if (
      foundRisks.size === 6
    ) {

      if (riskMessage) {

        riskMessage.textContent =
          "You found all 6 water-safety risks!";

      }

    }

    else {

      if (riskMessage) {

        riskMessage.textContent =
          `${6 - foundRisks.size} risks remaining.`;

      }

    }

  }


  hotspots.forEach(
    hotspot => {

      hotspot.addEventListener(
        "click",
        () => {

          const number =
            hotspot.dataset.risk;

          if (!riskGameData[number]) {
            return;
          }

          foundRisks.add(
            number
          );

          hotspot.classList.add(
            "found"
          );

          showRiskExplanation(
            number
          );

          updateRiskGame();

        }
      );

    }
  );


  $$(".risk-guide-item").forEach(
    item => {

      item.addEventListener(
        "click",
        () => {

          const number =
            item.dataset.risk;

          showRiskExplanation(
            number
          );

        }
      );

    }
  );


  if (riskReset) {

    riskReset.addEventListener(
      "click",
      () => {

        foundRisks =
          new Set();

        hotspots.forEach(
          hotspot => {

            hotspot.classList.remove(
              "found"
            );

          }
        );

        showRiskExplanation(
          "1"
        );

        updateRiskGame();

      }
    );

  }


  showRiskExplanation(
    "1"
  );

  updateRiskGame();


  /* =========================================================
     CAMPUS WATER POINT EXPLORER
     ========================================================= */

  const waterPoints =
    $$(".water-point");

  const pointName =
    $("#pointName");

  const pointStatus =
    $("#pointStatus");

  const pointIssue =
    $("#pointIssue");

  const pointAction =
    $("#pointAction");

  const pointNumber =
    $("#pointNumber");


  const waterPointData = {

    W01: {
      name: "Main Academic Block",
      status: "Operational",
      issue: "No current issue reported.",
      action: "Continue routine cleaning and monitoring."
    },

    W02: {
      name: "Library Zone",
      status: "Operational",
      issue: "Bottle-filling area should remain clean.",
      action: "Keep the filling surface dry and clean."
    },

    W03: {
      name: "Hostel Area",
      status: "Check required",
      issue: "Illustrative report: water point needs inspection.",
      action: "Submit a maintenance report for inspection."
    },

    W04: {
      name: "Sports Zone",
      status: "Operational",
      issue: "No current issue reported.",
      action: "Maintain regular cleaning."
    },

    W05: {
      name: "Cafeteria Area",
      status: "Check required",
      issue: "Illustrative report: surrounding hygiene needs attention.",
      action: "Clean the surrounding area and verify the point."
    },

    W06: {
      name: "Science Block",
      status: "Operational",
      issue: "No current issue reported.",
      action: "Continue routine monitoring."
    },

    W07: {
      name: "Residential Zone",
      status: "Operational",
      issue: "No current issue reported.",
      action: "Keep the dispensing area clean."
    },

    W08: {
      name: "Central Zone",
      status: "Check required",
      issue: "Illustrative report: fixture condition should be checked.",
      action: "Report the point for maintenance inspection."
    }

  };


  function selectWaterPoint(
    point
  ) {

    const key =
      point.dataset.point;

    const data =
      waterPointData[key];

    if (!data) {
      return;
    }

    waterPoints.forEach(
      item => {

        item.classList.toggle(
          "active",
          item === point
        );

      }
    );

    if (pointNumber) {

      pointNumber.textContent =
        key.replace(
          "W",
          "W-"
        );

    }

    if (pointName) {

      pointName.textContent =
        data.name;

    }

    if (pointStatus) {

      pointStatus.textContent =
        data.status;

    }

    if (pointIssue) {

      pointIssue.textContent =
        data.issue;

    }

    if (pointAction) {

      pointAction.textContent =
        data.action;

    }

  }


  waterPoints.forEach(
    point => {

      point.addEventListener(
        "click",
        () => {

          selectWaterPoint(
            point
          );

        }
      );

    }
  );


  if (waterPoints[0]) {

    selectWaterPoint(
      waterPoints[0]
    );

  }


  /* =========================================================
     QR REPORTING DEMO
     ========================================================= */

  const reportModal =
    $("#reportModal");

  const reportPoint =
    $("#reportPoint");

  const reportType =
    $("#reportType");

  const reportText =
    $("#reportText");

  const reportSubmit =
    $("#reportSubmit");

  const reportClose =
    $("#reportClose");


  let selectedReportPoint =
    "W01";


  $$(".report-water-point").forEach(
    button => {

      button.addEventListener(
        "click",
        () => {

          selectedReportPoint =
            button.dataset.point ||
            "W01";

          if (reportPoint) {

            reportPoint.textContent =
              selectedReportPoint.replace(
                "W",
                "W-"
              );

          }

          reportModal?.classList.add(
            "open"
          );

        }
      );

    }
  );


  reportClose?.addEventListener(
    "click",
    () => {

      reportModal?.classList.remove(
        "open"
      );

    }
  );


  reportModal?.addEventListener(
    "click",
    event => {

      if (
        event.target ===
        reportModal
      ) {

        reportModal.classList.remove(
          "open"
        );

      }

    }
  );


  reportSubmit?.addEventListener(
    "click",
    () => {

      const type =
        reportType?.value ||
        "Other";

      const text =
        reportText?.value.trim() ||
        "No additional description.";

      const report = {

        point:
          selectedReportPoint,

        issue:
          type,

        description:
          text,

        timestamp:
          new Date().toLocaleString()

      };


      const reports =
        JSON.parse(
          localStorage.getItem(
            "waterSafetyReports"
          ) ||
          "[]"
        );


      reports.push(
        report
      );


      localStorage.setItem(
        "waterSafetyReports",
        JSON.stringify(
          reports
        )
      );


      if (reportText) {

        reportText.value =
          "";

      }


      reportModal?.classList.remove(
        "open"
      );


      showToast(
        `Report saved for ${selectedReportPoint.replace("W", "W-")}.`
      );

    }
  );


  /* =========================================================
     CONTAMINATION → PREVENTION STORY
     ========================================================= */

  const storySteps =
    $$(".story-step");

  const storyVisual =
    $("#storyVisual");

  const storyTitle =
    $("#storyTitle");

  const storyText =
    $("#storyText");

  let currentStory =
    0;


  const storyData = [

    {
      title: "1. Source",
      text:
        "Water begins with a source such as a river, reservoir, groundwater or another supply.",
      visual:
        "SOURCE"
    },

    {
      title: "2. Treatment",
      text:
        "Appropriate treatment can reduce contaminants before water enters the distribution system.",
      visual:
        "TREATMENT"
    },

    {
      title: "3. Distribution",
      text:
        "Pipes, tanks and infrastructure must be maintained to protect water quality.",
      visual:
        "DISTRIBUTION"
    },

    {
      title: "4. Storage",
      text:
        "Unsafe storage or dirty containers can introduce contamination after treatment.",
      visual:
        "STORAGE"
    },

    {
      title: "5. Point of use",
      text:
        "Hands, bottles, taps and surrounding surfaces can influence hygiene at the moment people collect water.",
      visual:
        "POINT OF USE"
    },

    {
      title: "6. Prevention",
      text:
        "Clean habits, maintenance, monitoring and reporting help protect the final drinking-water experience.",
      visual:
        "PREVENTION"
    }

  ];


  function updateStory() {

    if (!storySteps.length) {
      return;
    }

    storySteps.forEach(
      (step, index) => {

        step.classList.toggle(
          "active",
          index === currentStory
        );

      }
    );

    const data =
      storyData[currentStory];

    if (!data) {
      return;
    }

    if (storyTitle) {

      storyTitle.textContent =
        data.title;

    }

    if (storyText) {

      storyText.textContent =
        data.text;

    }

    if (storyVisual) {

      storyVisual.textContent =
        data.visual;

    }

  }


  storySteps.forEach(
    (step, index) => {

      step.addEventListener(
        "click",
        () => {

          currentStory =
            index;

          updateStory();

        }
      );

    }
  );


  /* =========================================================
     HABIT SCORE
     ========================================================= */

  const habitItems =
    $$(".habit-item");

  const habitScore =
    $("#habitScore");

  const habitBar =
    $("#habitBar");

  function updateHabitScore() {

    const checked =
      habitItems.filter(
        item =>
          item.classList.contains(
            "checked"
          )
      ).length;

    const total =
      habitItems.length;

    if (habitScore) {

      habitScore.textContent =
        `${checked}/${total}`;

    }

    if (habitBar) {

      habitBar.style.width =
        `${total ? checked / total * 100 : 0}%`;

    }

  }


  habitItems.forEach(
    item => {

      item.addEventListener(
        "click",
        () => {

          item.classList.toggle(
            "checked"
          );

          updateHabitScore();

        }
      );

    }
  );


  updateHabitScore();


  /* =========================================================
     WATER SAFETY CHALLENGE
     ========================================================= */

  const questions = [

    {
      q:
        "Which condition is part of the WHO/UNICEF definition of safely managed drinking water?",

      options: [

        "Only being clear",

        "Being accessible, available when needed and free from contamination",

        "Having a particular bottle shape",

        "Being stored anywhere"

      ],

      answer: 1,

      feedback:
        "Correct. The WHO/UNICEF JMP definition combines source type, accessibility, availability and quality."

    },


    {
      q:
        "Which is a major drinking-water safety concern?",

      options: [

        "Microbial contamination",

        "The shape of the bottle",

        "The colour of the tap",

        "The size of a water glass"

      ],

      answer: 0,

      feedback:
        "Correct. Microbial contamination is one of the greatest risks to drinking-water safety."

    },


    {
      q:
        "Why should reusable bottles be cleaned regularly?",

      options: [

        "Only to make them look new",

        "To remove residues and reduce hygiene risks",

        "Because water becomes carbonated",

        "It is only necessary once a year"

      ],

      answer: 1,

      feedback:
        "Correct. Cleaning helps remove residues and reduce opportunities for microbial growth."

    },


    {
      q:
        "Which statement about the water-quality lab is correct?",

      options: [

        "One number proves water is completely safe",

        "Clear-looking water is always safe",

        "Real safety assessment needs appropriate testing and risk management",

        "TDS alone determines whether water is safe"

      ],

      answer: 2,

      feedback:
        "Correct. Drinking-water safety is multi-parameter and risk-based."

    },


    {
      q:
        "What is one useful campus technology idea?",

      options: [

        "Hide water points",

        "Use QR codes to identify water points and make reporting easier",

        "Allow only anonymous rumours",

        "Remove maintenance records"

      ],

      answer: 1,

      feedback:
        "Correct. A QR-linked reporting flow can connect a specific water point with a structured issue report."

    }

  ];


  let quizIndex = 0;
  let quizScore = 0;
  let quizAnswered = false;


  const quizQuestion =
    $("#quizQuestion");

  const quizOptions =
    $("#quizOptions");

  const quizCount =
    $("#quizCount");

  const quizProgress =
    $("#quizProgress");

  const quizFeedback =
    $("#quizFeedback");

  const quizNext =
    $("#quizNext");


  function renderQuiz() {

    if (
      !quizQuestion ||
      !quizOptions
    ) {
      return;
    }


    const question =
      questions[quizIndex];


    quizAnswered =
      false;


    if (quizCount) {

      quizCount.textContent =
        `Question ${
          quizIndex + 1
        } / ${
          questions.length
        }`;

    }


    if (quizProgress) {

      quizProgress.style.width =
        `${
          (
            (quizIndex + 1) /
            questions.length
          ) * 100
        }%`;

    }


    quizQuestion.textContent =
      question.q;


    quizOptions.innerHTML =
      "";


    if (quizFeedback) {

      quizFeedback.textContent =
        "";

    }


    if (quizNext) {

      quizNext.disabled =
        true;

      quizNext.classList.remove(
        "enabled"
      );

      quizNext.textContent =
        quizIndex ===
        questions.length - 1
          ? "Finish challenge →"
          : "Next question →";

    }


    question.options.forEach(
      (option, index) => {

        const button =
          document.createElement(
            "button"
          );


        button.className =
          "quiz-option";


        button.type =
          "button";


        button.textContent =
          option;


        button.addEventListener(
          "click",
          () => {

            answerQuiz(
              index,
              button
            );

          }
        );


        quizOptions.appendChild(
          button
        );

      }
    );

  }


  function answerQuiz(
    selectedIndex,
    clickedButton
  ) {

    if (
      quizAnswered
    ) {
      return;
    }


    quizAnswered =
      true;


    const question =
      questions[quizIndex];


    const options =
      $$(".quiz-option");


    options.forEach(
      (button, index) => {

        if (
          index ===
          question.answer
        ) {

          button.classList.add(
            "correct"
          );

        }

      }
    );


    if (
      selectedIndex ===
      question.answer
    ) {

      quizScore++;

      if (quizFeedback) {

        quizFeedback.textContent =
          `✓ ${question.feedback}`;

      }

    }

    else {

      clickedButton.classList.add(
        "wrong"
      );

      if (quizFeedback) {

        quizFeedback.textContent =
          `✕ Not quite. ${question.feedback}`;

      }

    }


    if (quizNext) {

      quizNext.disabled =
        false;

      quizNext.classList.add(
        "enabled"
      );

    }

  }


  function showQuizResult() {

    const percentage =
      Math.round(
        quizScore /
        questions.length *
        100
      );


    if (quizCount) {

      quizCount.textContent =
        "CHALLENGE COMPLETE";

    }


    if (quizQuestion) {

      quizQuestion.textContent =
        percentage >= 80
          ? "🏆 Water Safety Champion!"
          : percentage >= 60
            ? "💧 Strong water-safety awareness!"
            : "🌱 Good start — explore the sections once more!";

    }


    if (quizOptions) {

      quizOptions.innerHTML = `
        <div
          style="
            padding:25px;
            border-radius:15px;
            background:rgba(255,255,255,.06);
            text-align:center;
          "
        >

          <strong
            style="
              font:700 40px Manrope;
              color:#7cecff;
            "
          >
            ${quizScore}/${questions.length}
          </strong>

          <p
            style="
              margin-top:8px;
              color:rgba(255,255,255,.5);
              font-size:12px;
            "
          >
            You scored ${percentage}%.
          </p>

        </div>
      `;

    }


    if (quizFeedback) {

      quizFeedback.textContent =
        "The goal is understanding, not memorising.";

    }


    if (quizNext) {

      quizNext.textContent =
        "Try again →";

      quizNext.disabled =
        false;

      quizNext.classList.add(
        "enabled"
      );


      quizNext.onclick =
        () => {

          quizIndex = 0;

          quizScore = 0;

          quizNext.onclick =
            null;

          renderQuiz();

        };

    }

  }


  if (quizNext) {

    quizNext.addEventListener(
      "click",
      () => {

        if (
          !quizAnswered
        ) {
          return;
        }


        if (
          quizIndex <
          questions.length - 1
        ) {

          quizIndex++;

          renderQuiz();

        }

        else {

          showQuizResult();

        }

      }
    );

  }


  renderQuiz();


  /* =========================================================
     TOAST
     ========================================================= */

  let toastTimer;


  function showToast(
    message
  ) {

    const toast =
      $("#toast");


    if (!toast) {
      return;
    }


    toast.textContent =
      message;


    toast.classList.add(
      "show"
    );


    clearTimeout(
      toastTimer
    );


    toastTimer =
      setTimeout(
        () => {

          toast.classList.remove(
            "show"
          );

        },
        2600
      );

  }


  /* =========================================================
     STORY RESPONSIVENESS
     ========================================================= */

  window.addEventListener(
    "resize",
    () => {

      if (
        storySteps.length
      ) {

        updateStory();

      }

    }
  );


  /* =========================================================
     ACCESSIBILITY
     ========================================================= */

  $$(".water-point").forEach(
    point => {

      point.setAttribute(
        "aria-label",
        `Water point ${
          point.dataset.point ||
          ""
        }, ${
          point.dataset.name ||
          ""
        }`
      );

    }
  );


  $$(".hotspot").forEach(
    hotspot => {

      hotspot.setAttribute(
        "aria-label",
        `Investigate hotspot ${
          hotspot.textContent.trim()
        }`
      );

    }
  );


  if (sourceTabs.length) {

    const sourceTabsContainer =
      $(".source-tabs");

    if (sourceTabsContainer) {

      sourceTabsContainer.setAttribute(
        "role",
        "tablist"
      );

    }

  }


  $$(".source-tab").forEach(
    tab => {

      tab.setAttribute(
        "role",
        "tab"
      );

    }
  );


  /* =========================================================
     YEAR
     ========================================================= */

  const year =
    $("#year");

  if (year) {

    year.textContent =
      new Date().getFullYear();

  }


  /* =========================================================
     DEFAULT INDIA REGION
     ========================================================= */

  const defaultIndia =
    $('.continent[data-region="india"]');


  if (defaultIndia) {

    defaultIndia.classList.add(
      "active"
    );

  }


  /* =========================================================
     FOOTER DISCLAIMER
     ========================================================= */

  const footerNote =
    $(".footer-bottom span:last-child");


  if (footerNote) {

    footerNote.textContent =
      footerNote.textContent.replace(
        "Informations shared in this website are",
        "Information shared on this website is"
      );

  }


  /* =========================================================
     INITIAL STORY STATE
     ========================================================= */

  updateStory();


  /* =========================================================
     FINISHED
     ========================================================= */

  console.log(
    "WaterSafe Campus — Interactive experience loaded successfully."
  );

});