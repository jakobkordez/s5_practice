export default function sitemap() {
  const pages = ['', '/priprave', '/izpit-sim'].map((page) => ({
    url: `https://izpit.jkob.cc${page}`,
    lastModified: new Date().toISOString(),
  }));

  return pages;
}
