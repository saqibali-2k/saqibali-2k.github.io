let coll = document.getElementsByClassName("collapsible");
let i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    if (this.classList.contains("active")) {
      this.innerHTML="More<i data-feather=\"corner-right-up\"></i>"
    } else {
      this.innerHTML="More<i data-feather=\"corner-right-down\"></i>"
    }

    let card = this.parentElement.parentElement
    card.classList.toggle("active")
    let content = this.nextElementSibling
    if (content.style.maxHeight) {
      content.style.maxHeight = null
    } else {
      content.style.maxHeight = content.scrollHeight + "px"
    }
    feather.replace()
  });
}