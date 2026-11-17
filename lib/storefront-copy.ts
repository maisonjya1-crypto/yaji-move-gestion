// Textes d'accueil par défaut de la boutique (modifiables dans le logiciel → Boutique).
// Les anciens textes par défaut, trop longs, sont remplacés automatiquement s'ils n'ont
// jamais été personnalisés.
type Lang = "fr" | "ar" | "en";

export const HERO_DEFAULTS: Record<Lang, { title: string; text: string }> = {
  fr: { title: "Yallah, aji move.", text: "Raquettes, balles et accessoires de padel. Livrés partout au Maroc, payés à la réception." },
  ar: { title: "يلا، أجي تحرك.", text: "مضارب وكرات وإكسسوارات البادل. توصيل إلى جميع أنحاء المغرب والدفع عند الاستلام." },
  en: { title: "Yallah, aji move.", text: "Padel rackets, balls and gear. Delivered across Morocco, paid on delivery." },
};

const LEGACY_DEFAULTS: Record<Lang, { title: string; text: string }> = {
  fr: { title: "Les pièces que vous aimez, simplement livrées chez vous.", text: "Choisissez vos articles, validez votre commande en ligne et payez à la livraison. Notre équipe vous contacte ensuite pour confirmer." },
  ar: { title: "قطع أنيقة تحبها، تصل إليك بكل بساطة.", text: "اختر منتجاتك وأرسل طلبك عبر الموقع. سيتواصل معك فريقنا لتأكيد الطلب قبل التجهيز، والدفع عند الاستلام." },
  en: { title: "Pieces you love, delivered simply to your door.", text: "Choose your items and place your order online. Our team will contact you to confirm it before preparation, with cash on delivery." },
};

export function heroCopy(stored: string | null | undefined, lang: Lang, field: "title" | "text") {
  const value = stored?.trim() || "";
  if (!value || value === LEGACY_DEFAULTS[lang][field]) return HERO_DEFAULTS[lang][field];
  return value;
}

// « À propos de nous » : texte par défaut dans le ton de la marque (direct, sportif, phrases brèves).
// À personnaliser dans le logiciel → Boutique → Identité → À propos de nous.
export const ABOUT_DEFAULTS: Record<Lang, { title: string; text: string }> = {
  fr: {
    title: "Bouge. Joue. Recommence.",
    text: "YAJI MOVE, c'est une marque de sport née au Maroc, avec une idée simple : donner envie de bouger. On commence par le padel, avec du matériel choisi pour bien jouer et un style qui te ressemble, sur le terrain comme en dehors.\n\nNotre équipe confirme chaque commande par téléphone avant l'envoi. Nous livrons partout au Maroc et tu paies à la réception.",
  },
  ar: {
    title: "تحرك. العب. عاود.",
    text: "ياجي موف علامة رياضية مغربية بفكرة بسيطة: نعطيك الرغبة في الحركة. نبدأ بالبادل، بمعدات مختارة لتلعب مزيان وبستايل يشبهك داخل الملعب وخارجه.\n\nيؤكد فريقنا كل طلب عبر الهاتف قبل الإرسال. نوصل إلى جميع أنحاء المغرب والدفع عند الاستلام.",
  },
  en: {
    title: "Move. Play. Repeat.",
    text: "YAJI MOVE is a sports brand born in Morocco with one simple idea: make you want to move. We start with padel, with gear chosen to play well and a style that fits you, on court and off.\n\nOur team confirms every order by phone before shipping. We deliver across Morocco and you pay on delivery.",
  },
};

export function aboutCopy(stored: string | null | undefined, lang: Lang, field: "title" | "text") {
  return stored?.trim() || ABOUT_DEFAULTS[lang][field];
}

// Livraison : partout au Maroc, PAS gratuite. Tout ancien texte annonçant la gratuité
// (valeur par défaut ou saisie) est remplacé par ces textes, dans les 3 langues.
export const DELIVERY_DEFAULTS: Record<Lang, { announcement: string; shippingNote: string }> = {
  fr: { announcement: "Livraison partout au Maroc · paiement à la livraison", shippingNote: "Livraison partout au Maroc. Les frais de livraison vous sont confirmés par notre équipe avant l’envoi." },
  ar: { announcement: "التوصيل إلى جميع أنحاء المغرب · الدفع عند الاستلام", shippingNote: "التوصيل إلى جميع أنحاء المغرب. يؤكد لك فريقنا مصاريف التوصيل قبل الإرسال." },
  en: { announcement: "Delivery across Morocco · pay on delivery", shippingNote: "Delivery across Morocco. Our team confirms the delivery fee before shipping." },
};

const FREE_DELIVERY_CLAIM = /gratuit|مجان|free\s+(?:delivery|shipping)/i;

export function deliveryCopy(stored: string | null | undefined, lang: Lang, field: "announcement" | "shippingNote") {
  const value = stored?.trim() || "";
  if (!value || FREE_DELIVERY_CLAIM.test(value)) return DELIVERY_DEFAULTS[lang][field];
  return value;
}
