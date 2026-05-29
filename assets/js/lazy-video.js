(function () {
  const video = document.querySelector('.konfig-video');
  if (!video) return;

  function loadVideo() {
    video.querySelectorAll('source[data-src]').forEach(s => {
      s.src = s.dataset.src;
      s.removeAttribute('data-src');
    });
    video.load();
    video.play().catch(() => {});
  }

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        loadVideo();
        observer.disconnect();
      }
    }, { threshold: 0.1 });
    observer.observe(video);
  } else {
    loadVideo();
  }
})();
