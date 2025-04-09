document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("blogListContainer");
  const filterButtons = document.querySelectorAll(".filter");

  fetch("blog-list.json")
    .then(res => res.json())
    .then(blogs => {
      window.blogs = blogs;
      renderBlogs(blogs);
    });

  function renderBlogs(blogs) {
    container.innerHTML = "";
    blogs.forEach(blog => {
      const card = document.createElement("div");
      card.className = "blog-card";
      card.innerHTML = `
        <img src="${blog.image}" alt="${blog.title}" />
        <div class="blog-title">${blog.title}</div>
        <div class="blog-desc">${blog.description}</div>
        <a class="read-more" href="${blog.url}">Read More</a>
      `;
      container.appendChild(card);
    });
  }

  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      document.querySelector(".filter.active").classList.remove("active");
      button.classList.add("active");
      const tag = button.dataset.tag;
      if (tag === "all") {
        renderBlogs(window.blogs);
      } else {
        renderBlogs(window.blogs.filter(b => b.tag === tag));
      }
    });
  });
});
