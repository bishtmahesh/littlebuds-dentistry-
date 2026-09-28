/* Little Buds — shared components for the inner pages.
   Each page drops in placeholders and this file fills them in, so the header,
   footer, CTA banner and mobile bar are written once and stay identical everywhere:
     <div data-lb="header"></div>  <div data-lb="cta"></div>  <div data-lb="footer"></div>
   Also wires up: dropdowns, mobile menu, scrolled header, one-open-at-a-time FAQs,
   scroll reveals, and the shared form checks (required fields + consent box). */
(function () {
  'use strict';
  document.documentElement.classList.add('js');

  var PHONE = '(804) 601-0469';
  var PHONE_HREF = 'tel:+18046010469';
  var ADDRESS = '5065 Craig Rath Blvd, Midlothian, VA 23112';
  var MAP_HREF = 'https://maps.app.goo.gl/oQsG7p3GRJkrQp8k8';
  var BOOK_HREF = '#contact'; // every inner page has the appointment form (#contact)
  var MAP_EMBED = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2917.2771699011523!2d-77.6387879!3d37.413947400000005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89b17354dce92f1b%3A0x1a5ce08fef0e948d!2sLittle%20Buds%20Pediatric%20Dentistry!5e1!3m2!1sen!2sin!4v1789112672987!5m2!1sen!2sin';

  // One source of truth for the site map: used by the header, mobile menu and footer.
  var ABOUT = [
    { label: 'Our Story', href: '/our-story/' },
    { label: 'Meet Dr. Patel', href: '/meet-dr-patel/' },
    { label: 'Office Tour', href: '/office-tour/' }
  ];
  var SERVICES = [
    { label: 'Preventive Dentistry', href: '/services/preventive-dentistry/' },
    { label: 'Infant Dentistry', href: '/services/infant-dentistry/' },
    { label: 'Restorative Dentistry', href: '/services/restorative-dentistry/' },
    { label: 'Emergency Dentistry', href: '/services/emergency-dentistry/' },
    { label: 'View All Services', href: '/services/' }
  ];
  var NAV = [
    { label: 'Home', href: '/' },
    { label: 'About Us', items: ABOUT },
    { label: 'Services', items: SERVICES },
    { label: 'Insurance', href: '/insurance/' },
    { label: 'Referrals', href: '/referrals/' }
  ];

  var here = location.pathname.replace(/index\.html$/, '');
  if (here.slice(-1) !== '/') here += '/';
  var isHere = function (href) { return href === here; };
  var cur = function (href) { return isHere(href) ? ' aria-current="page"' : ''; };

  var LEAF = '<svg width="34" height="18" viewBox="0 0 46 24" aria-hidden="true"><path d="M2 20 Q10 2 24 6 Q18 20 2 20 Z" fill="#8FA06E"/><path d="M2 20 Q12 8 24 6" stroke="#4B5D3A" stroke-width="1" fill="none"/></svg>';
  var PHONE_ICON = '<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1z"/></svg>';
  var PIN_ICON = '<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z"/></svg>';
  var IG = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>';
  var FB = '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M14 8.5V6.8c0-.8.5-1.3 1.3-1.3H17V2.2h-2.6C11.7 2.2 10.4 3.9 10.4 6.4v2.1H8v3.3h2.4V22H14V11.8h2.7l.4-3.3H14z"/></svg>';

  function header() {
    var desktop = NAV.map(function (n, i) {
      if (!n.items) return '<a href="' + n.href + '"' + cur(n.href) + '>' + n.label + '</a>';
      var active = n.items.some(function (it) { return isHere(it.href); });
      return '<div class="lb-dd' + (active ? ' is-current' : '') + '">' +
        '<button type="button" aria-expanded="false" aria-controls="dd-' + i + '">' + n.label + ' <span class="lb-chev" aria-hidden="true">&#9662;</span></button>' +
        '<div class="lb-dd-panel" id="dd-' + i + '"><div>' +
        n.items.map(function (it) { return '<a href="' + it.href + '"' + cur(it.href) + '>' + it.label + '</a>'; }).join('') +
        '</div></div></div>';
    }).join('');
    var mobile = NAV.map(function (n) {
      if (!n.items) return '<a href="' + n.href + '"' + cur(n.href) + '>' + n.label + '</a>';
      var active = n.items.some(function (it) { return isHere(it.href); });
      return '<details' + (active ? ' open' : '') + '><summary>' + n.label + '</summary>' +
        n.items.map(function (it) { return '<a href="' + it.href + '"' + cur(it.href) + '>' + it.label + '</a>'; }).join('') + '</details>';
    }).join('');
    return '<a class="skip" href="#main">Skip to content</a>' +
      '<div class="lb-topbar"><div class="lb-topbar-in">' +
        '<a href="' + PHONE_HREF + '">' + PHONE_ICON + PHONE + '</a>' +
        '<a class="lb-addr" href="' + MAP_HREF + '" target="_blank" rel="noopener">' + PIN_ICON + ADDRESS + '</a>' +
      '</div></div>' +
      '<header class="lb-header" id="lb-header">' +
        '<div class="lb-nav-row">' +
          '<a class="lb-logo" href="/"><img src="/assets/littlebuds-logo.svg" alt="Little Buds Pediatric Dentistry" width="1770" height="460"></a>' +
          '<nav class="lb-nav" aria-label="Main">' + desktop + '</nav>' +
          '<a class="btn btn-terra lb-nav-cta" href="' + BOOK_HREF + '">Book an appointment</a>' +
          '<button class="lb-burger" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="lb-mobile"><span class="lb-bars" aria-hidden="true"><span></span><span></span><span></span></span></button>' +
        '</div>' +
        '<nav class="lb-mobile" id="lb-mobile" aria-label="Mobile">' + mobile +
          '<a class="btn btn-line" href="' + PHONE_HREF + '">Call ' + PHONE + '</a>' +
          '<a class="btn btn-terra" href="' + BOOK_HREF + '">Book an appointment</a>' +
        '</nav>' +
      '</header>';
  }

  function cta(el) {
    var title = el.getAttribute('data-title') || 'Let’s make their smile shine!';
    var text = el.getAttribute('data-text') || 'Give your child a strong start to lifelong oral health. Book their visit today and let’s create a positive dental experience they’ll feel good about.';
    return '<section class="lb-cta">' +
      '<svg class="wave" viewBox="0 0 1440 70" preserveAspectRatio="none" aria-hidden="true"><path d="M0,0 L1440,0 L1440,26 C1200,64 960,6 720,34 C480,62 240,8 0,40 Z" fill="' + (el.getAttribute('data-above') || '#FBF7EF') + '"/></svg>' +
      '<img class="leaf" src="/assets/leaf-single-sticker.svg" alt="">' +
      '<svg class="tree" viewBox="0 0 80 140" aria-hidden="true"><rect x="36" y="90" width="8" height="50" fill="#fff"/><circle cx="40" cy="80" r="28" fill="#fff"/><circle cx="20" cy="60" r="18" fill="#fff"/><circle cx="60" cy="60" r="18" fill="#fff"/></svg>' +
      '<h2>' + title + '</h2><p>' + text + '</p>' +
      '<div class="btn-row"><a class="btn btn-terra" href="' + BOOK_HREF + '">Book Their Visit</a><a class="btn btn-line" href="' + PHONE_HREF + '">Call ' + PHONE + '</a></div>' +
    '</section>';
  }

  // Appointment request section (same content as the Home V1 contact section)
  function contact() {
    return '<section class="lb-contact" id="contact"><div class="lb-contact-in">' +
      '<div class="reveal">' +
        '<div class="eyebrow"><h2 class="h2">Request an appointment</h2></div>' +
        '<p class="lb-script">Parents, take a moment.</p>' +
        '<form class="lb-form lb-appt" data-lb-form novalidate>' +
          '<div class="field full"><label class="sr-only" for="appt-name">Name</label><input type="text" id="appt-name" name="name" placeholder="Name *" autocomplete="name" required></div>' +
          '<div class="field"><label class="sr-only" for="appt-phone">Phone</label><input type="tel" id="appt-phone" name="phone" placeholder="Phone *" autocomplete="tel" required></div>' +
          '<div class="field"><label class="sr-only" for="appt-email">Email</label><input type="email" id="appt-email" name="email" placeholder="Email" autocomplete="email"></div>' +
          '<div class="field full"><label class="sr-only" for="appt-msg">Message</label><textarea id="appt-msg" name="message" rows="4" placeholder="Message"></textarea></div>' +
          '<label class="consent full"><input type="checkbox" name="consent" required><span>I agree that Little Buds Pediatric Dentistry may contact me by phone, text message, or email about this appointment request. I understand that my information will be kept private and protected as described in the practice’s <a href="#">Notice of Privacy Practices</a>, in line with HIPAA.</span></label>' +
          '<p class="form-error full" role="alert" hidden></p>' +
          '<div class="form-ok full" tabindex="-1" role="status" hidden>Thank you! We’ve received your request and will call you soon to confirm a time.</div>' +
          '<div class="full"><button class="btn btn-terra lb-appt-btn" type="submit">Request Appointment</button></div>' +
        '</form>' +
      '</div>' +
      '<div class="lb-contact-side reveal">' +
        '<div class="lb-map"><iframe src="' + MAP_EMBED + '" title="Map to Little Buds Pediatric Dentistry" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>' +
        '<div class="card lb-info">' +
          '<div><strong>Address</strong><a href="' + MAP_HREF + '" target="_blank" rel="noopener">' + ADDRESS + '</a></div>' +
          '<div><strong>Phone</strong><a href="' + PHONE_HREF + '">' + PHONE + '</a></div>' +
          '<div><strong>Email</strong><a href="mailto:info@littlebudsdental.com">info@littlebudsdental.com</a></div>' +
          '<div><strong>Hours</strong><dl class="lb-hours">' +
            '<dt>Mon</dt><dd>8:30am – 5pm</dd><dt>Tue</dt><dd>By appointment only</dd><dt>Wed</dt><dd>Closed</dd>' +
            '<dt>Thu</dt><dd>8:30am – 5pm</dd><dt>Fri</dt><dd>8:30am – 1:30pm</dd><dt>Sat</dt><dd>By appointment only</dd>' +
          '</dl></div>' +
        '</div>' +
      '</div>' +
    '</div></section>';
  }

  function footer(el) {
    var list = function (items) { return '<ul>' + items.map(function (it) { return '<li><a href="' + it.href + '">' + it.label + '</a></li>'; }).join('') + '</ul>'; };
    var explore = [
      { label: 'Home', href: '/' }, { label: 'Our Story', href: '/our-story/' }, { label: 'Meet Dr. Patel', href: '/meet-dr-patel/' },
      { label: 'Office Tour', href: '/office-tour/' }, { label: 'Insurance', href: '/insurance/' }, { label: 'Blog', href: '/blog/' },
      { label: 'Referrals', href: '/referrals/' }, { label: 'Contact', href: BOOK_HREF }
    ];
    return '<footer class="lb-footer">' +
      '<svg class="wave" viewBox="0 0 1440 60" preserveAspectRatio="none" aria-hidden="true"><path d="M0,0 L1440,0 L1440,20 C1200,50 960,4 720,28 C480,52 240,6 0,32 Z" fill="' + (el.getAttribute('data-above') || '#FBF7EF') + '"/></svg>' +
      '<div class="lb-footer-in">' +
        '<div class="brand"><a class="brand-logo" href="/"><img src="/assets/littlebuds-logo.svg" alt="Little Buds Pediatric Dentistry" width="1770" height="460"></a>' +
        '<p>A calm, kind dental home for growing smiles in Midlothian &amp; Chesterfield County, VA.</p></div>' +
        '<div class="cols">' +
          '<div><h4>Explore</h4>' + list(explore) + '</div>' +
          '<div><h4>Services</h4>' + list(SERVICES.slice(0, -1)) + '</div>' +
          '<div><h4>Contact</h4><ul>' +
            '<li><a href="' + PHONE_HREF + '">' + PHONE + '</a></li>' +
            '<li><a href="mailto:info@littlebudsdental.com">info@littlebudsdental.com</a></li>' +
            '<li><a href="' + MAP_HREF + '" target="_blank" rel="noopener">' + ADDRESS + '</a></li>' +
            '<li class="lb-social"><a href="https://www.instagram.com" target="_blank" rel="noopener" aria-label="Little Buds on Instagram">' + IG + '</a><a href="https://www.facebook.com" target="_blank" rel="noopener" aria-label="Little Buds on Facebook">' + FB + '</a></li>' +
          '</ul></div>' +
        '</div>' +
      '</div>' +
      '<div class="lb-footer-bottom"><span>&copy; 2026 Little Buds Pediatric Dentistry</span><nav aria-label="Legal"><a href="#">Privacy Policy</a><a href="#">Terms &amp; Conditions</a></nav></div>' +
    '</footer>' +
    '<div class="lb-sticky"><a class="book" href="' + BOOK_HREF + '">Book Now</a><a class="call" href="' + PHONE_HREF + '">' + PHONE_ICON + 'Call Now</a></div>';
  }

  // ---- render placeholders ----
  document.querySelectorAll('[data-lb]').forEach(function (el) {
    var kind = el.getAttribute('data-lb');
    var html = kind === 'header' ? header() : kind === 'cta' ? cta(el) : kind === 'contact' ? contact() : kind === 'footer' ? footer(el) : '';
    el.outerHTML = html;
  });

  // ---- header behaviour ----
  var hdr = document.getElementById('lb-header');
  if (hdr) {
    var onScroll = function () { hdr.classList.toggle('is-scrolled', window.scrollY > 42); };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    var dds = hdr.querySelectorAll('.lb-dd');
    var closeAll = function (except) {
      dds.forEach(function (d) { if (d !== except) { d.classList.remove('open'); d.querySelector('button').setAttribute('aria-expanded', 'false'); } });
    };
    var hoverable = window.matchMedia('(hover: hover)').matches;
    dds.forEach(function (d) {
      var btn = d.querySelector('button');
      var timer;
      var open = function () { clearTimeout(timer); closeAll(d); d.classList.add('open'); btn.setAttribute('aria-expanded', 'true'); };
      var close = function () { d.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); };
      btn.addEventListener('click', function () { d.classList.contains('open') ? close() : open(); });
      if (hoverable) {
        d.addEventListener('mouseenter', open);
        d.addEventListener('mouseleave', function () { timer = setTimeout(close, 250); });
      }
      d.addEventListener('keydown', function (e) { if (e.key === 'Escape') { close(); btn.focus(); } });
    });
    document.addEventListener('click', function (e) { if (!hdr.contains(e.target)) closeAll(); });

    var burger = hdr.querySelector('.lb-burger');
    burger.addEventListener('click', function () {
      var on = !hdr.classList.contains('menu-open');
      hdr.classList.toggle('menu-open', on);
      burger.setAttribute('aria-expanded', String(on));
      burger.setAttribute('aria-label', on ? 'Close menu' : 'Open menu');
    });
    hdr.querySelectorAll('.lb-mobile a').forEach(function (a) {
      a.addEventListener('click', function () { hdr.classList.remove('menu-open'); burger.setAttribute('aria-expanded', 'false'); });
    });
  }

  // ---- mobile sticky bar hides while scrolling ----
  var sticky = document.querySelector('.lb-sticky');
  if (sticky) {
    var t;
    window.addEventListener('scroll', function () {
      sticky.classList.add('hide');
      clearTimeout(t);
      t = setTimeout(function () { sticky.classList.remove('hide'); }, 250);
    }, { passive: true });
  }

  // ---- service cards: stack like Home V1 (sticky), and on phones the card behind shrinks + dims ----
  document.querySelectorAll('.lb-svc-stack').forEach(function (stack) {
    var items = [].slice.call(stack.querySelectorAll('.lb-svc'));
    items.forEach(function (it, i) { it.style.top = (96 + i * 14) + 'px'; it.style.zIndex = i + 1; });
    var phone = window.matchMedia('(max-width: 859px)');
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var pairs = items.slice(0, -1).map(function (it, i) {
      var card = it.querySelector('.lb-svc-card');
      var shade = document.createElement('div');
      shade.className = 'shade';
      card.appendChild(shade);
      return { card: card, shade: shade, next: items[i + 1] };
    });
    var ticking = false;
    var update = function () {
      ticking = false;
      var vh = window.innerHeight;
      pairs.forEach(function (p) {
        if (!phone.matches) { p.card.style.transform = ''; p.shade.style.opacity = 0; return; }
        var stickTop = parseFloat(p.next.style.top) || 110;
        var top = p.next.getBoundingClientRect().top;
        var t = Math.min(1, Math.max(0, (vh - top) / (vh - stickTop)));
        p.card.style.transform = 'scale(' + (1 - 0.08 * t).toFixed(4) + ')';
        p.shade.style.opacity = (0.22 * t).toFixed(3);
      });
    };
    var onScroll = function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    update();
  });

  // ---- FAQs: only one open at a time ----
  document.querySelectorAll('.lb-faq').forEach(function (faq) {
    var items = faq.querySelectorAll('details');
    items.forEach(function (d) {
      d.addEventListener('toggle', function () { if (d.open) items.forEach(function (o) { if (o !== d) o.open = false; }); });
    });
  });

  // ---- reveal on scroll (once) ----
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  // ---- shared form checks ----
  // Required inputs, "pick at least one" checkbox groups (data-required-group) and the consent box.
  // There is no form backend yet, so a valid form shows a thank-you message instead of sending.
  document.querySelectorAll('form[data-lb-form]').forEach(function (form) {
    var errorBox = form.querySelector('.form-error');
    var okBox = form.querySelector('.form-ok');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var firstBad = null;
      var mark = function (el, bad) {
        var holder = el.closest('.field, fieldset, .consent') || el;
        holder.classList.toggle('has-error', bad);
        if (el.setAttribute) el.setAttribute('aria-invalid', String(bad));
        if (bad && !firstBad) firstBad = el;
      };
      form.querySelectorAll('input[required]:not([type=checkbox]), textarea[required], select[required]').forEach(function (el) {
        mark(el, !el.value.trim() || !el.checkValidity());
      });
      form.querySelectorAll('[data-required-group]').forEach(function (group) {
        var any = group.querySelector('input:checked');
        mark(group.querySelector('input'), !any);
      });
      form.querySelectorAll('input[type=checkbox][required]').forEach(function (el) { mark(el, !el.checked); });
      if (firstBad) {
        if (errorBox) { errorBox.hidden = false; errorBox.textContent = firstBad.type === 'checkbox' && firstBad.name === 'consent' ? 'Please tick the consent box so our team can contact you.' : 'Please fill in the highlighted fields.'; }
        if (okBox) okBox.hidden = true;
        firstBad.focus();
        return;
      }
      if (errorBox) errorBox.hidden = true;
      if (okBox) { okBox.hidden = false; okBox.focus(); }
      form.reset();
    });
    form.addEventListener('change', function (e) {
      var holder = e.target.closest('.has-error');
      if (holder) holder.classList.remove('has-error');
    });
  });
})();
