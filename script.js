const STORAGE_KEY = "almubarakConfig";

const defaultConfig = {
  companyName: "المبارك",
  brandSubtitle: "للتجارة العامة وخدمات الاستثمار",
  fullName: "شركة المبارك للتجارة العامة وخدمات الاستثمار",
  heroTitle: "بوابتك الشاملة",
  heroSubtitleSpan: "للبيع والشراء",
  heroDescription: "منصة المبارك المتكاملة لكل أنواع التجارة العامة — نوفّر لك أقساماً متخصصة للسيارات، العقارات، السلع العامة، والخدمات الاستثمارية، في سوق رقمي آمن يربط بين البائعين والمشترين بكل سهولة.",
  aboutText: "شركة متخصصة في تسهيل عمليات البيع والشراء بين الأفراد والجهات، عبر منصة واحدة تجمع العقارات والسيارات والسلع العامة والفرص الاستثمارية. نعمل كحلقة وصل موثوقة بين البائع والمشتري، مع التزام واضح بالشفافية وسرعة التواصل في كل خطوة.",
  whatsappNumber: "96550000000",
  phoneNumber: "+965 5000 0000",
  whatsappMessage: "السلام عليكم، أرغب بالاستفسار عن خدماتكم.",
  footerBrandText: "شركة المبارك للتجارة العامة وخدمات الاستثمار<br>بوابتك الشاملة للبيع والشراء.",
  ogUrl: "https://اسم-حسابك.github.io/almubarak-trading/",
  canonicalUrl: "https://اسم-حسابك.github.io/almubarak-trading/",
  ogImage: "og-image.svg"
};

function getConfig() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return defaultConfig;
  try {
    return { ...defaultConfig, ...JSON.parse(saved) };
  } catch {
    return defaultConfig;
  }
}

function setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}

function setHtml(id, value) {
  const el = document.getElementById(id);
  if (el) el.innerHTML = value;
}

function buildWhatsAppLink(number, message = "السلام عليكم، أرغب بالاستفسار.") {
  const encoded = encodeURIComponent(message || "السلام عليكم، أرغب بالاستفسار.");
  return `https://wa.me/${number}?text=${encoded}`;
}

function applyConfig() {
  const config = getConfig();

  setText("brandName", config.companyName);
  setText("brandSubtitle", config.brandSubtitle);
  setText("companyNameFull", config.fullName);
  setText("footerYearText", config.fullName);
  setText("heroTitle", config.heroTitle);
  setText("heroSubtitleSpan", config.heroSubtitleSpan);
  setText("heroDescription", config.heroDescription);
  setText("aboutText", config.aboutText);
  setHtml("footerBrandText", config.footerBrandText);

  const phoneLink = document.getElementById("phoneLink");
  if (phoneLink) {
    phoneLink.textContent = config.phoneNumber;
    phoneLink.href = `tel:${config.phoneNumber.replace(/\s+/g, "")}`;
  }

  const directCallLink = document.getElementById("callDirect");
  if (directCallLink) {
    directCallLink.href = `tel:${config.phoneNumber.replace(/\s+/g, "")}`;
    directCallLink.textContent = "أو اتصل بنا مباشرة";
  }

  document.querySelectorAll("[data-wa-msg]").forEach((el) => {
    const msg = el.dataset.waMsg || config.whatsappMessage;
    el.setAttribute("href", buildWhatsAppLink(config.whatsappNumber, msg));
    el.setAttribute("target", "_blank");
    el.setAttribute("rel", "noopener noreferrer");
  });

  const waFloating = document.querySelector(".floating-wa");
  if (waFloating) {
    waFloating.href = buildWhatsAppLink(config.whatsappNumber, config.whatsappMessage);
  }

  const headerWa = document.querySelector(".header-wa");
  if (headerWa) {
    headerWa.href = buildWhatsAppLink(config.whatsappNumber, config.whatsappMessage);
  }

  const titleTag = document.querySelector("title");
  if (titleTag) {
    titleTag.textContent = config.fullName;
  }

  const metaUrl = document.querySelector('meta[property="og:url"]');
  if (metaUrl) metaUrl.setAttribute("content", config.ogUrl);

  const canonicalLink = document.querySelector('link[rel="canonical"]');
  if (canonicalLink) canonicalLink.setAttribute("href", config.canonicalUrl);

  const ogImage = document.querySelector('meta[property="og:image"]');
  if (ogImage) ogImage.setAttribute("content", config.ogImage);

  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute("content", config.fullName);

  const ogDescription = document.querySelector('meta[property="og:description"]');
  if (ogDescription) ogDescription.setAttribute("content", config.aboutText);

  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) metaDescription.setAttribute("content", config.aboutText);

  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

document.addEventListener("DOMContentLoaded", () => {
  applyConfig();

  const header = document.getElementById("siteHeader");
  const onScroll = () => {
    if (window.scrollY > 12 && header) header.classList.add("scrolled");
    else if (header) header.classList.remove("scrolled");
  };
  if (header) {
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  const navToggle = document.getElementById("navToggle");
  const mainNav = document.getElementById("mainNav");
  if (navToggle && mainNav) {
    navToggle.addEventListener("click", () => {
      const isOpen = mainNav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    mainNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mainNav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  const sellForm = document.getElementById("sellForm");
  const formNote = document.getElementById("formNote");
  if (sellForm) {
    sellForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const itemType = sellForm.itemType.value.trim();
      const name = sellForm.sellerName.value.trim();
      const phone = sellForm.sellerPhone.value.trim();
      const desc = sellForm.sellerDesc.value.trim();

      if (!itemType || !name || !phone || !desc) {
        formNote.textContent = "الرجاء تعبئة جميع الحقول قبل الإرسال.";
        return;
      }

      const phoneDigits = phone.replace(/[^\d]/g, "");
      if (phoneDigits.length < 7) {
        formNote.textContent = "الرجاء إدخال رقم تواصل صحيح.";
        return;
      }

      const config = getConfig();

      const message =
        `طلب عرض سلعة للبيع — ${config.fullName}\n` +
        `النوع: ${itemType}\n` +
        `الاسم: ${name}\n` +
        `رقم التواصل: ${phone}\n` +
        `الوصف: ${desc}`;

      window.open(buildWhatsAppLink(config.whatsappNumber, message), "_blank", "noopener");
      sellForm.reset();
      formNote.textContent = "";
    });
  }

  const revealTargets = document.querySelectorAll(".offer-card, .sell-copy, .sell-form, .about-inner, .trust-item");
  revealTargets.forEach((el) => el.classList.add("reveal"));

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealTargets.forEach((el) => observer.observe(el));
  } else {
    revealTargets.forEach((el) => el.classList.add("is-visible"));
  }
});
