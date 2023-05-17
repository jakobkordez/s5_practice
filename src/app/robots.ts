export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: "https://izpit.jkob.cc/sitemap.xml",
    host: "https://izpit.jkob.cc",
  };
}
