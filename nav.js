/**
 * nav.js — Dynamically builds and injects the site-wide navigation bar.
 * Fixed for GitHub Pages deployment under a subfolder (e.g. /AWM-Website-/)
 */
(function () {

  /* ── 1. Detect the base path ─────────────────────────────────────────────
     On GitHub Pages the site lives at /AWM-Website-/ not /.
     We grab everything up to and including that folder so all links
     resolve correctly whether the site is at a custom domain (/) or
     a GitHub Pages subfolder (/AWM-Website-/).

     Examples:
       https://ramnik2003.github.io/AWM-Website-/about.html  → base = /AWM-Website-/
       https://awmubc.com/about.html                          → base = /
  */
  var basePath = '/AWM-UBC/';

  /* ── 2. Current page filename for active-link highlighting ──────────────*/
  var currentPage = location.pathname.split('/').pop() || 'index.html';

  /* ── 3. Primary nav links ───────────────────────────────────────────────*/
  var primaryItems = [
    { href: 'index.html',  label: 'Home'   },
    { href: 'about.html',  label: 'About'  },
    { href: 'events.html', label: 'Events' },
    { href: 'team.html',   label: 'Team'   },
  ];

  /* ── 4. Overflow links (under "More ▾") ─────────────────────────────────*/
  var overflowItems = [
    { href: 'mentorship.html', label: 'Mentorship'   },
    { href: 'membership.html', label: 'Get Involved' },
    { href: 'resources.html',  label: 'Resources'    },
    { href: 'partners.html',   label: 'Partners'     },
    { href: 'contact.html',    label: 'Contact'      },
    { href: 'faq.html',        label: 'FAQ'          },
  ];

  /* ── 5. Helper: build a <li> ─────────────────────────────────────────────
     Prepends basePath to every href so links always resolve from the
     correct root regardless of which subfolder the site is deployed in.   */
  function buildLi(item) {
    var active = item.href === currentPage ? 'active' : '';
    var cta    = item.href === 'membership.html' ? 'nav-cta' : '';
    var cls    = [cta].filter(Boolean).join(' ');
    var fullHref = basePath + item.href;
    return (
      '<li' + (cls ? ' class="' + cls + '"' : '') + '>' +
        '<a href="' + fullHref + '"' + (active ? ' class="' + active + '"' : '') + '>' +
          item.label +
        '</a>' +
      '</li>'
    );
  }

  var primaryLinks   = primaryItems.map(buildLi).join('');
  var overflowLinks  = overflowItems.map(buildLi).join('');
  var allMobileLinks = primaryItems.concat(overflowItems).map(buildLi).join('');

  /* ── 6. Logo — also uses basePath ────────────────────────────────────────*/
  var logoHTML =
    '<a class="nav-logo" href="' + basePath + 'index.html" aria-label="AWM at UBC — Home">' +
      '<img src="' + basePath + 'images/LogoLightMode.png" alt="AWM at UBC logo" class="nav-logo-img" />' +
      '<span class="nav-logo-text">AWM @ UBC</span>' +
    '</a>';

  /* ── 7. Assemble full nav HTML ───────────────────────────────────────────*/
  var html =
    '<nav class="site-nav">' +
      '<div class="nav-inner">' +

        logoHTML +

        '<ul class="nav-links" id="navLinks">' +
          primaryLinks +
          '<li class="nav-more" id="navMoreItem">' +
            '<button class="nav-more-btn" id="moreBtn" aria-haspopup="true" aria-expanded="false">' +
              'More ' +
              '<span class="more-chevron" aria-hidden="true"></span>' +
            '</button>' +
            '<ul class="more-dropdown" id="moreDropdown" aria-hidden="true">' +
              overflowLinks +
            '</ul>' +
          '</li>' +
        '</ul>' +

        '<button class="nav-toggle" id="navToggle" aria-label="Toggle navigation" aria-expanded="false">' +
          '<span></span>' +
          '<span></span>' +
          '<span></span>' +
        '</button>' +

        '<div class="nav-mobile-panel" id="mobilePanel" aria-hidden="true">' +
          '<ul>' + allMobileLinks + '</ul>' +
        '</div>' +

      '</div>' +
    '</nav>';

  /* ── 8. Inject ───────────────────────────────────────────────────────────*/
  document.getElementById('nav-placeholder').innerHTML = html;

  /* ── 9. "More ▾" dropdown toggle ────────────────────────────────────────*/
  var moreBtn      = document.getElementById('moreBtn');
  var moreDropdown = document.getElementById('moreDropdown');

  moreBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    var isOpen = moreDropdown.classList.toggle('open');
    moreBtn.classList.toggle('open', isOpen);
    moreBtn.setAttribute('aria-expanded', isOpen);
    moreDropdown.setAttribute('aria-hidden', !isOpen);
  });

  /* ── 10. Mobile hamburger toggle ─────────────────────────────────────────*/
  var navToggle   = document.getElementById('navToggle');
  var mobilePanel = document.getElementById('mobilePanel');

  navToggle.addEventListener('click', function (e) {
    e.stopPropagation();
    var isOpen = mobilePanel.classList.toggle('open');
    navToggle.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-expanded', isOpen);
    mobilePanel.setAttribute('aria-hidden', !isOpen);
  });

  /* ── 11. Close panels on outside click ───────────────────────────────────*/
  document.addEventListener('click', function (e) {
    if (e.target.closest('.site-nav')) return;

    if (moreDropdown.classList.contains('open')) {
      moreDropdown.classList.remove('open');
      moreBtn.classList.remove('open');
      moreBtn.setAttribute('aria-expanded', 'false');
      moreDropdown.setAttribute('aria-hidden', 'true');
    }

    if (mobilePanel.classList.contains('open')) {
      mobilePanel.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      mobilePanel.setAttribute('aria-hidden', 'true');
    }
  });

})();
