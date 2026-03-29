(function() {

  /* ── Detect base path (same logic as nav.js) ─────────────────────────────
     Works for both GitHub Pages subfolders and custom domains.             */
  var pathParts = location.pathname.split('/');
  pathParts.pop();
  var basePath = pathParts.join('/') + '/';

  function href(page) {
    return basePath + page;
  }

  var html =
    '<footer class="site-footer">' +
      '<div class="footer-grid">' +

        '<div class="footer-brand">' +
          '<div class="logo-text">AWM @ UBC</div>' +
          '<div class="logo-text para">' +
            '<p>The Association for Women in Mathematics at UBC fosters community, mentorship, and opportunity for women in mathematics.</p>' +
          '</div>' +
        '</div>' +

        '<div class="footer-col">' +
          '<h4>Navigate</h4>' +
          '<ul>' +
            '<li><a href="' + href('index.html')      + '">Home</a></li>' +
            '<li><a href="' + href('about.html')      + '">About</a></li>' +
            '<li><a href="' + href('team.html')       + '">Team</a></li>' +
            '<li><a href="' + href('events.html')     + '">Events</a></li>' +
            '<li><a href="' + href('mentorship.html') + '">Mentorship</a></li>' +
          '</ul>' +
        '</div>' +

        '<div class="footer-col">' +
          '<h4>More</h4>' +
          '<ul>' +
            '<li><a href="' + href('membership.html') + '">Get Involved</a></li>' +
            '<li><a href="' + href('resources.html')  + '">Resources</a></li>' +
            '<li><a href="' + href('partners.html')   + '">Partners</a></li>' +
            '<li><a href="' + href('faq.html')        + '">FAQ</a></li>' +
            '<li><a href="' + href('contact.html')    + '">Contact</a></li>' +
          '</ul>' +
        '</div>' +

        '<div class="footer-col">' +
          '<h4>Connect</h4>' +
          '<div class="social-links">' +
            '<a href="#" title="Instagram">Instagram</a>' +
            '<a href="mailto:awm@ubc.ca" title="Email">Email</a>' +
          '</div>' +
          '<p style="margin-top: 14px;">awm@ubc.ca<br>UBC Vancouver Campus</p>' +
        '</div>' +

      '</div>' +
      '<div class="footer-bottom">' +
        '<p>© 2026 Association for Women in Mathematics at UBC. All rights reserved.</p>' +
      '</div>' +
    '</footer>';

  document.getElementById('footer-placeholder').innerHTML = html;

})();
