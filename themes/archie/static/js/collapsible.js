let coll = document.getElementsByClassName("collapsible");
let i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("mouseover", function() {
    this.classList.add("active");
    let size = this.children[0].children.length
    let content = this.children[0].children[size-1];
    content.style.maxHeight = content.scrollHeight + "px"
  });

  coll[i].addEventListener("mouseout", function() {
    this.classList.remove("active");
    let size = this.children[0].children.length
    let content = this.children[0].children[size-1];
    content.style.maxHeight = null
  });

}
feather.replace()