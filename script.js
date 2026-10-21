  document.documentElement.classList.add('js-ready');

  // Glow CTA button
  const glowCta = document.getElementById('glowCta');
  if (glowCta) {
    document.addEventListener('pointermove', (e) => {
      glowCta.style.setProperty('--x', e.clientX.toFixed(2));
      glowCta.style.setProperty('--y', e.clientY.toFixed(2));
      glowCta.style.setProperty('--xp', (e.clientX / window.innerWidth).toFixed(2));
      glowCta.style.setProperty('--yp', (e.clientY / window.innerHeight).toFixed(2));
    });
  }

  // Custom cursor — pointer devices only
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    const cursor = document.getElementById('cursor');
    const ring = document.getElementById('cursorRing');

    let mx = 0, my = 0, rx = 0, ry = 0;

    document.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      cursor.style.left = mx + 'px';
      cursor.style.top = my + 'px';
    });

    function animateRing() {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      ring.style.left = rx + 'px';
      ring.style.top = ry + 'px';
      requestAnimationFrame(animateRing);
    }
    animateRing();

    document.querySelectorAll('a, button, input, textarea, .product-card, .problem-item').forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.style.width = '20px';
        cursor.style.height = '20px';
        ring.style.width = '60px';
        ring.style.height = '60px';
        ring.style.opacity = '0.4';
      });
      el.addEventListener('mouseleave', () => {
        cursor.style.width = '12px';
        cursor.style.height = '12px';
        ring.style.width = '36px';
        ring.style.height = '36px';
        ring.style.opacity = '1';
      });
    });
  }

  // FAQ accordion
  document.querySelectorAll('.faq-item').forEach(item => {
    const toggle = () => {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => {
        i.classList.remove('open');
        i.setAttribute('aria-expanded', 'false');
      });
      if (!isOpen) {
        item.classList.add('open');
        item.setAttribute('aria-expanded', 'true');
      }
    };
    item.addEventListener('click', toggle);
    item.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
    });
  });


  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.problem-item, .product-card, .sim-card, .info-item').forEach(el => {
    observer.observe(el);
  });

  // Gooey sector tabs
  (function () {
    const wrapper = document.querySelector('.sector-tabs-wrapper');
    const blob = document.querySelector('.sector-tab-blob');
    const tabs = document.querySelectorAll('.sector-tab');
    const panels = document.querySelectorAll('.sector-panel');
    if (!wrapper || !blob || !tabs.length) return;

    function moveBlob(tab) {
      const wr = wrapper.getBoundingClientRect();
      const tr = tab.getBoundingClientRect();
      blob.style.top    = (tr.top  - wr.top)  + 'px';
      blob.style.left   = (tr.left - wr.left) + 'px';
      blob.style.width  = tr.width  + 'px';
      blob.style.height = tr.height + 'px';
    }

    function activateTab(tab) {
      tabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
        t.tabIndex = -1;
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      tab.tabIndex = 0;
      moveBlob(tab);
      const sector = tab.dataset.sector;
      panels.forEach(p => p.classList.toggle('active', p.dataset.sector === sector));
    }

    tabs.forEach(tab => {
      tab.addEventListener('click', () => activateTab(tab));
      tab.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); activateTab(tab); }
      });
    });

    // Init — defer one frame so layout is painted before measuring
    requestAnimationFrame(() => {
      activateTab(tabs[0]);
      blob.classList.add('ready');
    });

    // Reposition blob on resize
    window.addEventListener('resize', () => {
      const active = wrapper.querySelector('.sector-tab.active');
      if (active) moveBlob(active);
    });
  }());

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
