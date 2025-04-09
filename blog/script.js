fetch('blog-list.json')
  .then(res => res.json())
  .then(data => {
    const grid = document.getElementById('blogGrid');
    const buttons = document.querySelectorAll('.filter-btn');
    let currentTag = 'all';

    function renderBlogs(tag) {
      grid.innerHTML = '';
      const filtered = tag === 'all' ? data : data.filter(b => b.tag === tag);
      filtered.forEach(blog => {
        const card = document.createElement('div');
        card.className = 'blog-card';
        card.setAttribute('data-aos', 'fade-up');
        card.innerHTML = `
          <img src="${blog.image}" alt="${blog.title}">
          <div class="content">
            <h3>${blog.title}</h3>
            <p>${blog.description}</p>
            <a href="${blog.url}">Read More</a>
          </div>`;
        grid.appendChild(card);
      });
    }

    renderBlogs(currentTag);
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentTag = btn.dataset.tag;
        renderBlogs(currentTag);
      });
    });
  });
