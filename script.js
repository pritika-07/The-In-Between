
const filterButtons = document.querySelectorAll(".filter-button");
const postCards = document.querySelectorAll(".post-card");
const postSearch = document.getElementById("post-search");
const emptyState = document.getElementById("empty-state");

const menuToggle = document.getElementById("menu-toggle");
const mainNav = document.getElementById("main-nav");

const articleDialog = document.getElementById("article-dialog");
const dialogClose = document.getElementById("dialog-close");
const dialogCategory = document.getElementById("dialog-category");
const dialogTitle = document.getElementById("dialog-title");
const dialogMeta = document.getElementById("dialog-meta");
const dialogBody = document.getElementById("dialog-body");

const newsletterForm = document.getElementById("newsletter-form");
const newsletterMessage = document.getElementById("newsletter-message");

let activeCategory = "all";

// Demo article content.
// Replace these with your own writing when expanding the blog.
const articles = {
  featured: {
    category: "THE JOURNAL",
    title: "On being a work in progress",
    meta: "OCTOBER 18, 2026 · 5 MIN READ",
    paragraphs: [
      "Maybe becoming isn't a grand, cinematic moment. Maybe it is quieter than that.",
      "Maybe it is the small decision to keep showing up, even when the picture is still a little blurry. To try something new, to change your mind, to begin again without making a whole announcement about it.",
      "We spend so much time waiting to feel ready. Ready to start, ready to be seen, ready to know exactly where we are going. But life keeps happening in the meantime.",
      "And perhaps the in-between is not a waiting room after all. Perhaps it is where the most important parts of us are taking shape."
    ]
  },

  starting: {
    category: "THE JOURNAL",
    title: "The art of starting before you're ready",
    meta: "THE JOURNAL · 4 MIN READ",
    paragraphs: [
      "There is a particular kind of courage in beginning something while still feeling a little unsure.",
      "The first version might be awkward. The first attempt might not look anything like the picture in your head. But a beginning gives an idea somewhere to go.",
      "Maybe we don't need a perfect plan. Maybe we just need a first page, a first line, or ten minutes of trying."
    ]
  },

  books: {
    category: "MARGINALIA",
    title: "Books that feel like finding a new room in yourself",
    meta: "MARGINALIA · 6 MIN READ",
    paragraphs: [
      "Some books feel less like entering a new world and more like discovering a room that has always been inside you.",
      "A sentence can give shape to something you had felt but never quite known how to name. A character can make an unfamiliar feeling seem suddenly understandable.",
      "Those are the stories I want to keep close: the ones that leave a little more space inside us than they found."
    ]
  },

  little: {
    category: "LITTLE THINGS, LATELY",
    title: "A collection of ordinary magic",
    meta: "LITTLE THINGS, LATELY · 3 MIN READ",
    paragraphs: [
      "A few things I want to remember lately: sunlight finding its way across a desk, a song arriving at exactly the right moment, and conversations that make time feel softer.",
      "Not every lovely thing needs to become a milestone. Some things can simply be lovely.",
      "Maybe keeping track of them is its own kind of gratitude."
    ]
  },

  timeline: {
    category: "THE JOURNAL",
    title: "A gentle reminder that your timeline is yours",
    meta: "THE JOURNAL · 5 MIN READ",
    paragraphs: [
      "It is easy to look sideways and wonder if everyone else received a map that somehow missed you.",
      "But people are learning different things, carrying different things, and moving through different seasons. There is no universal calendar for becoming who you want to be.",
      "You are allowed to take your time and still take your dreams seriously."
    ]
  },

  passages: {
    category: "MARGINALIA",
    title: "The passages that stay with us",
    meta: "MARGINALIA · 4 MIN READ",
    paragraphs: [
      "Sometimes a book ends, but a particular thought keeps following you around.",
      "It shows up while you're walking somewhere, doing something ordinary, or trying to explain a feeling. The words have become part of the way you see.",
      "That is one of my favorite things about reading: the story ends, but the conversation doesn't."
    ]
  },

  playlist: {
    category: "LITTLE THINGS, LATELY",
    title: "Currently collecting songs for slow mornings",
    meta: "LITTLE THINGS, LATELY · 2 MIN READ",
    paragraphs: [
      "A tiny soundtrack for mornings that don't need to rush into anything.",
      "A few songs, a warm drink, and the rare feeling that the day can unfold at its own pace.",
      "No grand productivity plan. Just a softer beginning."
    ]
  }
};

// Filter articles by category and search query
function filterPosts() {
  const query = postSearch.value.trim().toLowerCase();
  let visibleCount = 0;

  postCards.forEach((card) => {
    const category = card.dataset.category;
    const title = card.dataset.title;
    const text = card.textContent.toLowerCase();

    const matchesCategory =
      activeCategory === "all" || category === activeCategory;

    const matchesSearch =
      title.includes(query) || text.includes(query);

    const shouldShow = matchesCategory && matchesSearch;

    card.hidden = !shouldShow;

    if (shouldShow) {
      visibleCount++;
    }
  });

  emptyState.hidden = visibleCount !== 0;
}

// Category filter buttons
filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((item) => item.classList.remove("active"));

    button.classList.add("active");
    activeCategory = button.dataset.filter;

    filterPosts();
  });
});

// Search posts
postSearch.addEventListener("input", filterPosts);

// Mobile navigation
menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");

  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Close navigation" : "Open navigation"
  );
});

// Close mobile menu after choosing a section
mainNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
  });
});

// Open article preview dialog
document.querySelectorAll("[data-article]").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();

    const articleKey = link.dataset.article;
    const article = articles[articleKey];

    if (!article) {
      return;
    }

    dialogCategory.textContent = article.category;
    dialogTitle.textContent = article.title;
    dialogMeta.textContent = article.meta;

    dialogBody.replaceChildren();

    article.paragraphs.forEach((paragraphText) => {
      const paragraph = document.createElement("p");
      paragraph.textContent = paragraphText;
      dialogBody.appendChild(paragraph);
    });

    articleDialog.showModal();
  });
});

// Close article dialog
dialogClose.addEventListener("click", () => {
  articleDialog.close();
});

// Close dialog by clicking outside the panel
articleDialog.addEventListener("click", (event) => {
  if (event.target === articleDialog) {
    articleDialog.close();
  }
});

// Newsletter form demo
newsletterForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const emailInput = document.getElementById("newsletter-email");

  if (!emailInput.checkValidity()) {
    emailInput.reportValidity();
    return;
  }

  newsletterMessage.textContent =
    "You're on the demo list! No email has been stored or sent.";

  newsletterForm.reset();
});
