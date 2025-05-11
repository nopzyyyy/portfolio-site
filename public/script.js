
document.addEventListener("DOMContentLoaded", () => {
  fetch("/images").then(res => res.json()).then(images => {
    const gallery = document.getElementById("gallery");
    images.forEach(img => {
      const image = document.createElement("img");
      image.src = img;
      gallery.appendChild(image);
    });

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll("img").forEach(img => {
      observer.observe(img);
    });
  });

  fetch("/profile").then(res => res.json()).then(data => {
    document.getElementById("name").innerText = data.name;
    document.getElementById("email").innerText = data.email;
    document.getElementById("bio").innerText = data.bio;
  });
});
