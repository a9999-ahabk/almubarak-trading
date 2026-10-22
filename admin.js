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

function saveConfig(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function fillForm(config) {
  Object.entries(config).forEach(([key, value]) => {
    const input = document.getElementById(key);
    if (input) input.value = value;
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("configForm");
  const status = document.getElementById("status");
  const resetBtn = document.getElementById("resetConfig");

  const config = getConfig();
  fillForm(config);

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const newConfig = Object.fromEntries(formData.entries());

    saveConfig(newConfig);
    status.textContent = "تم حفظ البيانات بنجاح. يمكنك الآن معاينة الموقع.";
  });

  resetBtn.addEventListener("click", () => {
    saveConfig(defaultConfig);
    fillForm(defaultConfig);
    status.textContent = "تمت إعادة التهيئة إلى القيم الافتراضية.";
  });
});
