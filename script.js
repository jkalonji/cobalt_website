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

    document.querySelectorAll('a, button, input, textarea, .product-card, .problem-item, .stat').forEach(el => {
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

  document.querySelectorAll('.problem-item, .stat, .product-card, .sim-card, .info-item').forEach(el => {
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

  // ── ORBITAL TIMELINE ──────────────────────────────────────────
  const ORBITAL_DATA = [
    {
      id: 0,
      icon: '📋',
      title: 'Audit offert',
      desc: 'On identifie ensemble vos tâches chronophages et les frictions dans vos processus. Gratuit, sans engagement.',
      relatedIds: [1]
    },
    {
      id: 1,
      icon: '⚙️',
      title: 'Solution sur mesure',
      desc: 'On conçoit une solution IA adaptée à votre métier, votre vocabulaire et vos outils existants.',
      relatedIds: [0, 2]
    },
    {
      id: 2,
      icon: '🚀',
      title: 'Déploiement',
      desc: 'Opérationnel en 2 semaines pour les solutions clé en main. Tests rigoureux avant mise en production.',
      relatedIds: [1, 3]
    },
    {
      id: 3,
      icon: '📈',
      title: 'Résultats',
      desc: 'Des indicateurs concrets dès le premier mois : temps économisé, erreurs évitées, satisfaction client.',
      relatedIds: [2, 4]
    },
    {
      id: 4,
      icon: '🔄',
      title: 'Amélioration continue',
      desc: 'Diagnostics réguliers pour faire évoluer la solution avec vous. L\'IA s\'affine à mesure que votre activité grandit.',
      relatedIds: [3, 0]
    }
  ];

  (function initOrbital() {
    if (!window.matchMedia('(min-width: 769px)').matches) return;
    const container = document.getElementById('orbitalTimeline');
    const nodesContainer = document.getElementById('orbitalNodes');
    if (!container || !nodesContainer) return;

    const RADIUS = 190;
    let angle = 0;
    let autoRotate = true;
    let activeId = null;
    let rafId = null;
    const nodeEls = {};

    // Créer les nœuds
    ORBITAL_DATA.forEach((item) => {
      const wrap = document.createElement('div');
      wrap.style.position = 'absolute';
      wrap.style.left = '50%';
      wrap.style.top = '50%';

      const node = document.createElement('div');
      node.className = 'orbital-node';
      node.dataset.id = item.id;
      node.innerHTML = item.icon;
      node.title = item.title;
      node.setAttribute('tabindex', '0');
      node.setAttribute('role', 'button');
      node.setAttribute('aria-pressed', 'false');

      const label = document.createElement('div');
      label.className = 'orbital-node-label';
      label.textContent = item.title;
      node.appendChild(label);

      node.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleNode(item.id);
      });
      node.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleNode(item.id); }
      });

      wrap.appendChild(node);
      nodesContainer.appendChild(wrap);
      nodeEls[item.id] = { wrap, node };
    });

    const cardTemplate = document.getElementById('cardTemplate');

    const orbitalCenter = container.querySelector('.orbital-center');

    function toggleNode(id) {
      if (activeId === id) {
        // Fermer
        closeAll();
        autoRotate = true;
        activeId = null;
        orbitalCenter.classList.remove('hidden');
      } else {
        closeAll();
        activeId = id;
        autoRotate = false;
        orbitalCenter.classList.add('hidden');

        const el = nodeEls[id];
        el.node.classList.add('active');
        el.node.setAttribute('aria-pressed', 'true');

        // Pulser les nœuds liés
        const item = ORBITAL_DATA.find(d => d.id === id);
        item.relatedIds.forEach(rid => {
          nodeEls[rid]?.node.classList.add('pulsing');
        });

        // Carte détail — template + textContent (no XSS)
        const card = cardTemplate.content.cloneNode(true).firstElementChild;
        card.querySelector('.orbital-card-title').textContent = item.title;
        card.querySelector('.orbital-card-desc').textContent = item.desc;
        el.node.appendChild(card);

        // Centrer sur le nœud actif
        const targetAngle = (id / ORBITAL_DATA.length) * 360;
        angle = (270 - targetAngle + 360) % 360;
        updatePositions();
      }
    }

    function closeAll() {
      ORBITAL_DATA.forEach(item => {
        const el = nodeEls[item.id];
        if (!el) return;
        el.node.classList.remove('active', 'pulsing');
        el.node.setAttribute('aria-pressed', 'false');
        const card = el.node.querySelector('.orbital-card');
        if (card) card.remove();
      });
    }

    // Clic hors nœud → reset
    container.addEventListener('click', () => {
      if (activeId !== null) {
        closeAll();
        autoRotate = true;
        activeId = null;
        orbitalCenter.classList.remove('hidden');
      }
    });

    function updatePositions() {
      ORBITAL_DATA.forEach((item, idx) => {
        const el = nodeEls[item.id];
        if (!el) return;
        const theta = ((idx / ORBITAL_DATA.length) * 360 + angle) % 360;
        const rad = (theta * Math.PI) / 180;
        const x = RADIUS * Math.cos(rad);
        const y = RADIUS * Math.sin(rad);
        const opacity = Math.max(0.35, Math.min(1, 0.35 + 0.65 * ((1 + Math.sin(rad)) / 2)));
        const zIndex = Math.round(50 + 50 * Math.cos(rad));

        el.wrap.style.transform = `translate(calc(${x}px - 50%), calc(${y}px - 50%))`;
        if (activeId !== item.id) {
          el.node.style.opacity = opacity;
          el.node.style.zIndex = zIndex;
        } else {
          el.node.style.opacity = 1;
          el.node.style.zIndex = 200;
        }
      });
    }

    function tick() {
      if (autoRotate) {
        angle = (angle + 0.25) % 360;
        updatePositions();
      }
      rafId = requestAnimationFrame(tick);
    }

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) cancelAnimationFrame(rafId);
      else rafId = requestAnimationFrame(tick);
    });

    updatePositions();
    tick();
  })();

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
