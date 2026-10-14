import { defineAstroPaperConfig } from "./src/types/config";

export default defineAstroPaperConfig({
  site: {
    url: "https://emanuelceballos.github.io/",
    title: "Emanuel Ceballos",
    description: "Engineering notes, talks and anonymized case studies from a CTO building products in Argentina.",
    author: "Emanuel Ceballos",
    profile: "https://github.com/emanuelceballos",
    ogImage: "default-og.jpg",
    lang: "en",
    timezone: "America/Argentina/Cordoba",
    dir: "ltr",
    // Cookieless analytics (GoatCounter).
    goatcounter: "emanuel-ceballos",
  },
  posts: {
    perPage: 4,
    perIndex: 4,
    scheduledPostMargin: 15 * 60 * 1000,
  },
  features: {
    lightAndDarkMode: true,
    dynamicOgImage: true,
    showArchives: true,
    showBackButton: true,
    editPost: { enabled: false },
    search: "pagefind",
  },
  socials: [
    { name: "github", url: "https://github.com/emanuelceballos" },
    { name: "linkedin", url: "https://www.linkedin.com/in/eceballostorres/" },
  ],
  shareLinks: [
    { name: "whatsapp", url: "https://wa.me/?text=" },
    { name: "x",        url: "https://x.com/intent/post?url=" },
    { name: "telegram", url: "https://t.me/share/url?url=" },
    { name: "mail",     url: "mailto:?subject=See%20this%20post&body=" },
  ],
});