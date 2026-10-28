// Leavenworth Winter Guide — prototype interactions
// Progressive enhancement: every page works without JavaScript.
// This file only adds the mobile nav toggle, filter chips, search,
// and the FAQ accordion.

// --- Mobile nav toggle ---
const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');

if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!isOpen));
    siteNav.classList.toggle('is-open', !isOpen);
  });
}

// --- Filter chips + search (directory pages) ---
const chips = Array.from(document.querySelectorAll('.chip'));
const cards = Array.from(document.querySelectorAll('.listing-card'));
const searchInput = document.querySelector('.search-input');
const noResults = document.querySelector('.no-results');

function updateVisible() {
  if (cards.length === 0) return;

  const activeChip = chips.find((chip) => chip.classList.contains('is-active'));
  const tag = activeChip ? activeChip.dataset.filter : 'all';
  const query = searchInput ? searchInput.value.trim().toLowerCase() : '';
  let visibleCount = 0;

  cards.forEach((card) => {
    const tags = (card.dataset.tags || '').split(',');
    const text = [
      card.querySelector('h3')?.textContent,
      card.querySelector('.listing-desc')?.textContent,
      card.dataset.tags,
    ]
      .join(' ')
      .toLowerCase();

    const matchesTag = tag === 'all' || tags.includes(tag);
    const matchesQuery = query === '' || text.includes(query);
    const show = matchesTag && matchesQuery;

    card.hidden = !show;
    if (show) visibleCount++;
  });

  if (noResults) noResults.hidden = visibleCount !== 0;
}

chips.forEach((chip) => {
  chip.addEventListener('click', () => {
    chips.forEach((c) => c.classList.remove('is-active'));
    chip.classList.add('is-active');
    updateVisible();
  });
});

if (searchInput) {
  searchInput.addEventListener('input', updateVisible);
}

// --- FAQ accordion ---
document.querySelectorAll('.faq-question').forEach((button) => {
  button.addEventListener('click', () => {
    const expanded = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', String(!expanded));
    const panel = document.getElementById(button.getAttribute('aria-controls'));
    if (panel) panel.hidden = expanded;
  });
});
