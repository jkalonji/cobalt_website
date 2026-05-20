# Cobalt Website — Document de Spécifications

**URL production** : [cobaltgroupe.xyz](https://cobaltgroupe.xyz)
**Dépôt** : [github.com/jkalonji/cobalt_website](https://github.com/jkalonji/cobalt_website)
**Dernière mise à jour** : 2026-05-18

---

## 1. Présentation

Cobalt est une société proposant des **solutions IA sur mesure pour les PME**. Son site web est la principale vitrine commerciale et le canal d'acquisition de leads.

**Positionnement** : Automatiser les tâches répétitives pour rendre du temps aux équipes.

**Tagline actuelle** : *"Vos tâches répétitives ont une date d'expiration."*

---

## 2. Objectifs business

| Priorité | Objectif | Mécanisme actuel |
|---|---|---|
| 1 | **Générer des leads** | Bouton CTA → Calendly (échange de 30 min gratuit) |
| 2 | **Crédibiliser la marque** | Design premium, stats sectorielles sourcées, processus en 5 étapes |
| 3 | **Montrer le savoir-faire** | Chatbot Groq (à venir) |

---

## 3. Cibles

### Personas principaux

| Persona | Profil | Déclencheur |
|---|---|---|
| **Dirigeant PME** | CEO/gérant, 10–200 employés | Coûts opérationnels qui grimpent, croissance bloquée par les process manuels |
| **Responsable opérations** | COO, office manager, responsable admin | Équipe surchargée de tâches sans valeur ajoutée |

### Secteurs cibles

- Médical (cabinets, cliniques)
- Restauration
- Immobilier
- Salons de coiffure / beauté
- Juridique (cabinets d'avocats)
- PME généralistes

### Zone géographique

France (référencement local prioritaire).

---

## 4. Architecture technique actuelle

### Stack

| Couche | Technologie |
|---|---|
| HTML | HTML5 sémantique + JSON-LD (Schema.org) |
| CSS | CSS3 vanilla, entièrement inline dans `index.html` |
| JavaScript | Vanilla JS, entièrement inline dans `index.html` |
| Fonts | Google Fonts — DM Serif Display, DM Mono |
| Icônes | Bootstrap Icons v1.11.3 (CDN) |
| Booking | Calendly (iframe embed) |
| Hébergement | GitHub Pages + domaine custom |
| CI/CD | GitHub Actions (`deploy.yml`) — push sur `main` → deploy automatique |

### Structure des fichiers

```
Website/
├── index.html          # Tout le site (HTML + CSS ~1 300 lignes + JS ~333 lignes)
├── og-image.svg        # Image Open Graph
└── .github/
    └── workflows/
        └── deploy.yml  # Déploiement GitHub Pages
```

### Contraintes actuelles

- **Maintenabilité** : tout dans un seul fichier HTML de ~2 000 lignes → difficile à faire évoluer proprement.
- **Pas de build system** : aucun bundler, pas de npm. Toute modification se fait directement dans `index.html`.
- **Pas de backend** : site 100 % statique. Les intégrations dynamiques passent par des iframes ou des scripts tiers.

---

## 5. Structure du site (one-page)

### Navigation

```
Header : Logo  |  [Premier échange gratuit →]
Sections : Hero → Problème → Solution → Impact → Produits → FAQ → Contact
```

### Sections détail

#### Hero (`#hero`)
- Eyebrow : "Solutions sur mesure pour entreprises"
- Titre : "Vos tâches répétitives ont une date d'expiration"
- Sous-titre : présentation de Cobalt
- CTA principal : "Premier échange gratuit →"

#### Problème
3 points de douleur en grille :
1. **Temps gaspillé** — heures perdues sur des tâches sans valeur
2. **Erreurs humaines** — la répétition crée de la fatigue et des erreurs coûteuses
3. **Croissance bloquée** — les process manuels empêchent de scaler

#### Solution (`#solution`)
Timeline orbitale interactive — 5 étapes :
1. Audit offert
2. Solution sur mesure
3. Déploiement (2 semaines pour clé en main)
4. Résultats dès le 1er mois
5. Amélioration continue

#### Impact
- **4 statistiques générales** (sourcées) :
  - ×4 productivité
  - −30 % coûts service client
  - −85 % erreurs humaines
  - ×3,7 ROI moyen sur 18 mois
- **6 onglets sectoriels** (tabs avec effet "gooey") : Médical, Restauration, Immobilier, Salon, Juridique, PME — chacun avec 2 stats spécifiques

#### Produits
3 cartes :
| Produit | Description |
|---|---|
| **Agent Vocal IA** 🎙️ | Standard téléphonique IA, disponible 24/7 |
| **Automatisation Interne** ⚙️ | Plannings, emails, tâches admin automatisés |
| **Présence Digitale** 🌐 | Site web + outils IA intégrés |

#### FAQ (`#faq`)
5 questions — accordion single-open :
1. Qu'est-ce que Cobalt et à qui s'adresse-t-il ?
2. Comment fonctionne un agent vocal IA ?
3. Combien de temps pour déployer ?
4. Quelles tâches peut-on automatiser ?
5. Combien coûte un audit ?

#### Contact (`#contact`)
Iframe Calendly — "échange-de-30mn" — thème dark custom (fond #060810, texte #e8eef8, accent #4488ff).

---

## 6. Design system

### Couleurs (variables CSS)

| Variable | Valeur | Usage |
|---|---|---|
| `--ink` | `#060810` | Fond principal |
| `--cream` | `#e8eef8` | Texte principal |
| `--warm` | `#c8d4ec` | Texte secondaire |
| `--cobalt` | `#0047ab` | Bleu Cobalt (brand) |
| `--cobalt-light` | `#4488ff` | Accent bleu vif |
| `--sky` | `#7eb8f7` | Bleu clair |
| `--steel` | `#1a3a6e` | Bleu sombre |
| `--text-muted` | `#5a6a8a` | Texte atténué |
| `--card-bg` | `rgba(68,136,255,0.04)` | Fond carte subtil |

### Typographie

| Rôle | Police | Poids |
|---|---|---|
| Titres | DM Serif Display | Regular, Italic |
| Corps / UI | DM Mono | 300, 400, 500 |

### Atmosphère visuelle
- Thème sombre (dark mode permanent)
- 3 orbes de dégradés animés en fond + grille de lignes + grain de bruit
- Curseur personnalisé (desktop)
- Bouton glow qui réagit à la position de la souris

### Responsive
Un seul breakpoint : **768 px**
- Mobile : grille 1 colonne, padding réduit, pas de curseur custom, timeline orbitale remplacée par liste verticale

---

## 7. Fonctionnalités interactives existantes

| Fonctionnalité | Implémentation |
|---|---|
| Curseur custom | Vanilla JS + CSS, desktop uniquement |
| Bouton glow | CSS custom properties dynamiques via `mousemove` |
| Timeline orbitale | `requestAnimationFrame`, rotation auto + clic |
| Tabs sectoriels "gooey" | SVG filter (feGaussianBlur + feColorMatrix) |
| Accordion FAQ | Max-height transition, icône rotate |
| Scroll animations | `IntersectionObserver` — fade-in + translate |
| SEO / Schema | JSON-LD (Organization, WebSite, FAQPage) |
| Open Graph | Meta tags + `og-image.svg` |

---

## 8. Évolutions planifiées

### 8.1 Chatbot Groq (priorité haute)

**Objectif double** :
1. **Démo produit** — montrer concrètement la vitesse d'inférence de Groq (< 100 ms), preuve directe du savoir-faire Cobalt en IA.
2. **Assistant qualifiant** — répondre aux questions sur Cobalt, ses offres, orienter vers Calendly si le visiteur est prêt.

**Comportement attendu** :
- Non-invasif : ne s'ouvre pas automatiquement, bouton discret (coin bas-droit ou section dédiée)
- Ultra-rapide : stream de la réponse visible dès les premières dizaines de ms
- Connaît Cobalt : contexte système avec les informations sur l'entreprise, les offres, le processus
- CTA intégré : si le visiteur semble intéressé, propose un lien direct vers Calendly
- Thème cohérent avec le site (dark, police DM Mono)

**Stack envisagée** :
- Inférence : [Groq API](https://groq.com) (streaming)
- Modèle : à définir (llama-3-70b-8192 ou mixtral-8x7b recommandé pour la vitesse)
- Frontend : composant JS vanilla ou module léger (pas de framework)
- Clé API : variable d'environnement côté client (proxy recommandé pour production)

**Points d'attention** :
- Site 100 % statique → la clé Groq serait exposée côté client. Envisager un proxy (Cloudflare Worker, Netlify Function) pour masquer la clé en prod.
- Limiter la longueur des réponses pour maintenir la sensation de vitesse.

---

### 8.2 SEO & GEO (Generative Engine Optimization)

**Objectif** : être visible dans les résultats classiques ET dans les réponses générées par les IA.

#### SEO classique

- [ ] Audit des balises `<title>`, `<meta description>` par section
- [ ] Optimisation des slugs d'ancres (`#hero`, `#solution`, etc.)
- [ ] Enrichissement du JSON-LD existant (LocalBusiness, Service, Product)
- [ ] Core Web Vitals : LCP, CLS, FID — vérifier via PageSpeed Insights
- [ ] Sitemap XML + robots.txt

#### Référencement local

- [ ] Fiche Google Business Profile (si pas encore créée)
- [ ] Données structurées `LocalBusiness` avec adresse, zone de service
- [ ] NAP cohérent (Name, Address, Phone) sur le site et les annuaires

#### GEO (AI Overviews, Perplexity, ChatGPT Search)

Pour être cité par les IA génératives, le contenu doit être :
- **Factuel et sourcé** : les stats du site ont déjà des sources → les rendre plus explicites (balises `<cite>`, attribut `data-source`)
- **Structuré sémantiquement** : enrichir le JSON-LD, utiliser `speakable` pour indiquer les passages clés à reprendre
- **Cité ailleurs** : backlinks de qualité, mentions sur des annuaires IA / tech
- [ ] Ajouter une page ou section "À propos" factuelle (date de création, localisation, équipe)
- [ ] Envisager un blog ou page "Ressources" avec du contenu éducatif (fort signal GEO)
- [ ] Tester la visibilité sur Perplexity avec des requêtes cibles

---

## 9. Critères de succès

| Objectif | Métrique | Cible |
|---|---|---|
| Leads | Réservations Calendly / mois | À définir |
| SEO | Position Google sur requêtes cibles | Top 10 sur 3 requêtes prioritaires |
| GEO | Citations dans AI Overviews / Perplexity | Visible sur ≥ 2 requêtes cibles |
| Performance | Score PageSpeed mobile | ≥ 85 |
| Chatbot | Taux d'engagement (sessions avec ≥ 1 message) | À définir après lancement |

---

## 10. Backlog priorisé

| # | Tâche | Priorité | Complexité |
|---|---|---|---|
| 1 | Audit SEO technique + Core Web Vitals | Haute | Faible |
| 2 | Enrichissement JSON-LD (LocalBusiness, speakable) | Haute | Faible |
| 3 | Google Business Profile | Haute | Faible |
| 4 | Sitemap XML + robots.txt | Moyenne | Faible |
| 5 | Refactoring HTML → structure modulaire | Moyenne | Haute |
| 6 | Page / section blog ou ressources (GEO) | Moyenne | Haute |
| 7 | Image OG en PNG (1200×630) pour Facebook/WhatsApp | Moyenne | Faible |
| 8 | Proxy Cloudflare Worker pour clé Groq | Basse | Faible |
| 9 | Chatbot Groq (proxy + UI) | Basse | Moyenne |

---

*Document généré à partir de l'analyse du code source et des informations fournies par le propriétaire.*
