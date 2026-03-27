/**
 * nav.js — Dynamically builds and injects the site-wide navigation bar.
 * Runs as an IIFE so variables don't leak into global scope.
 *
 * Desktop layout:  [LOGO]  Home  About  Events  Team  [More ▾]
 *                           ↑ 4 primary links always visible ↑
 *                  "More ▾" opens a dropdown with the remaining links.
 *
 * Mobile layout:   [LOGO]  [☰ hamburger]
 *                  Hamburger opens a full dropdown with ALL links.
 */
(function () {

    /* ── 1. Figure out which page is currently open ──────────────────────────
       Grabs the filename from the URL (e.g. "about.html").
       Falls back to "index.html" when visiting the root "/".               */
    var currentPage = location.pathname.split('/').pop() || 'index.html';
  
    /* ── 2. Primary links — always visible on desktop ────────────────────────
       These four sit directly in the nav bar at all screen sizes ≥ 861 px. */
    var primaryItems = [
      { href: 'index.html',  label: 'Home'   },
      { href: 'about.html',  label: 'About'  },
      { href: 'events.html', label: 'Events' },
      { href: 'team.html',   label: 'Team'   },
    ];
  
    /* ── 3. Overflow links — hidden behind the "More ▾" dropdown ────────────
       On mobile these also appear inside the hamburger panel.               */
    var overflowItems = [
      { href: 'mentorship.html', label: 'Mentorship'  },
      { href: 'membership.html', label: 'Get Involved' },
      { href: 'resources.html',  label: 'Resources'   },
      { href: 'partners.html',   label: 'Partners'    },
      { href: 'contact.html',    label: 'Contact'     },
      { href: 'faq.html',        label: 'FAQ'         },
    ];
  
    /* ── 4. Helper: build a single <li> string ───────────────────────────────
       Marks the current page with the "active" CSS class.
       Gives "Get Involved" the "nav-cta" class for its pink pill style.    */
    function buildLi(item) {
      var active = item.href === currentPage ? 'active' : '';
      var cta    = item.href === 'membership.html' ? 'nav-cta' : '';
      var cls    = [cta].filter(Boolean).join(' ');
      return (
        '<li' + (cls ? ' class="' + cls + '"' : '') + '>' +
          '<a href="' + item.href + '"' + (active ? ' class="' + active + '"' : '') + '>' +
            item.label +
          '</a>' +
        '</li>'
      );
    }
  
    /* ── 5. Build the four primary <li> elements ────────────────────────── */
    var primaryLinks = primaryItems.map(buildLi).join('');
  
    /* ── 6. Build the overflow <li> elements (inside "More" dropdown) ────── */
    var overflowLinks = overflowItems.map(buildLi).join('');
  
    /* ── 7. Build ALL links for the mobile hamburger panel ──────────────────
       Mobile needs every link in one place since the primary bar is hidden. */
    var allMobileLinks = primaryItems.concat(overflowItems).map(buildLi).join('');
  
    /* ── 8. Logo markup ──────────────────────────────────────────────────────
       Uses an <img> tag pointing to logo.png (place your image file there).
       Falls back gracefully — if logo.png is missing the alt text still
       identifies the site. The entire element links back to index.html.    */
    var logoHTML =
      '<a class="nav-logo" href="index.html" aria-label="AWM at UBC — Home">' +
        '<img src="images/LogoLightMode.png" alt="AWM at UBC logo" class="nav-logo-img" />' +
        '<span class="nav-logo-text">AWM @ UBC</span>' +
      '</a>';


  
    /* ── 9. Assemble the complete <nav> HTML ─────────────────────────────────
       Structure:
         <nav.site-nav>
           <div.nav-inner>
             <a.nav-logo>              ← logo image → home page
             <ul.nav-links#navLinks>   ← 4 primary links (desktop only)
               …primary <li>s…
               <li.nav-more>           ← "More ▾" button + its dropdown
                 <button#moreBtn>
                 <ul.more-dropdown#moreDropdown>
                   …overflow <li>s…
                 </ul>
               </li>
             </ul>
             <button.nav-toggle#navToggle>  ← hamburger (mobile only)
             <div.nav-mobile-panel#mobilePanel>  ← full-link panel (mobile)
           </div>
         </nav>                                                               */
    var html =
      '<nav class="site-nav">' +
        '<div class="nav-inner">' +
  
          /* ── Logo ── */
          logoHTML +
  
          /* ── Desktop link bar (primary links + More button) ── */
          '<ul class="nav-links" id="navLinks">' +
            primaryLinks +
  
            /* "More ▾" list item — contains the dropdown as a child */
            '<li class="nav-more" id="navMoreItem">' +
              /* The button itself — clicking toggles the dropdown */
              '<button class="nav-more-btn" id="moreBtn" aria-haspopup="true" aria-expanded="false">' +
                'More ' +
                /* Small chevron icon built from CSS border trick via a <span> */
                '<span class="more-chevron" aria-hidden="true"></span>' +
              '</button>' +
  
              /* Dropdown panel that appears below "More ▾" */
              '<ul class="more-dropdown" id="moreDropdown" aria-hidden="true">' +
                overflowLinks +
              '</ul>' +
            '</li>' +
  
          '</ul>' +
  
          /* ── Mobile hamburger button (hidden on desktop via CSS) ── */
          '<button class="nav-toggle" id="navToggle" aria-label="Toggle navigation" aria-expanded="false">' +
            '<span></span>' + /* top bar    */
            '<span></span>' + /* middle bar */
            '<span></span>' + /* bottom bar */
          '</button>' +
  
          /* ── Mobile full-link panel (slides down when hamburger clicked) ── */
          '<div class="nav-mobile-panel" id="mobilePanel" aria-hidden="true">' +
            '<ul>' + allMobileLinks + '</ul>' +
          '</div>' +
  
        '</div>' +
      '</nav>';
  
    /* ── 10. Inject the nav HTML into the placeholder ───────────────────── */
    document.getElementById('nav-placeholder').innerHTML = html;
  
    /* ── 11. "More ▾" dropdown toggle (desktop) ─────────────────────────────
       Clicking the More button opens/closes the overflow dropdown.          */
    var moreBtn      = document.getElementById('moreBtn');
    var moreDropdown = document.getElementById('moreDropdown');
  
    moreBtn.addEventListener('click', function (e) {
      e.stopPropagation(); // prevent the document click-outside handler firing
      var isOpen = moreDropdown.classList.toggle('open');
      moreBtn.classList.toggle('open', isOpen);
      moreBtn.setAttribute('aria-expanded', isOpen);
      moreDropdown.setAttribute('aria-hidden', !isOpen);
    });
  
    /* ── 12. Mobile hamburger toggle ─────────────────────────────────────────
       Shows/hides the full-link panel and animates the bars → ✕.           */
    var navToggle   = document.getElementById('navToggle');
    var mobilePanel = document.getElementById('mobilePanel');
  
    navToggle.addEventListener('click', function (e) {
      e.stopPropagation();
      var isOpen = mobilePanel.classList.toggle('open');
      navToggle.classList.toggle('open', isOpen);
      navToggle.setAttribute('aria-expanded', isOpen);
      mobilePanel.setAttribute('aria-hidden', !isOpen);
    });
  
    /* ── 13. Close all open panels when clicking outside the nav ─────────── */
    document.addEventListener('click', function (e) {
      if (e.target.closest('.site-nav')) return; // click was inside nav — ignore
  
      /* Close the "More" dropdown */
      if (moreDropdown.classList.contains('open')) {
        moreDropdown.classList.remove('open');
        moreBtn.classList.remove('open');
        moreBtn.setAttribute('aria-expanded', 'false');
        moreDropdown.setAttribute('aria-hidden', 'true');
      }
  
      /* Close the mobile panel */
      if (mobilePanel.classList.contains('open')) {
        mobilePanel.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        mobilePanel.setAttribute('aria-hidden', 'true');
      }
    });
  
  })();