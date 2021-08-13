const chars =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()".split(
    ""
  );
function updateChar(el, char) {
  el.innerHTML = char;
}
function getRandomChar() {
  const retval = chars[Math.floor(Math.random() * chars.length - 1)];
  if (!retval) {
    return getRandomChar();
  }
  return retval;
}
window.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const cracker = document.querySelector(".cracker");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const password = form.querySelector("input").value;

    cracker.innerHTML = password
      .split("")
      .map((char) => `<span class="char">*</span>`)
      .join("");
    const charElements = document.querySelectorAll(".char");

    for (let i = 0; i < password.length; i++) {
      let cur = getRandomChar();
      while (cur !== password[i]) {
        let copy = cur;
        cur = getRandomChar();
        setTimeout(() => {
          charElements[i].innerHTML = copy;
          for (let j = 0; j < 100000000; j++) {}
        }, 0);
      }
      if (cur === password[i]) {
        setTimeout(() => {
          charElements[i].innerHTML = password[i];
          charElements[i].classList.add("success");
        }, 0);
      }
    }
    form.classList.add("hide");
    cracker.classList.remove("hide");
  });
});
