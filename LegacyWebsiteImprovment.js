(function () {
  const TARGET_PREFIX = "https://www.thelegacyalliance.org/custom/";
  const EXCLUDED_PAGES_CSV = "https://www.thelegacyalliance.org/custom/99522";
  const EXCLUDED_PAGES = EXCLUDED_PAGES_CSV.split(",").map(u => u.trim()).filter(Boolean);
  const here = window.location.href;

  if (!here.startsWith(TARGET_PREFIX) || EXCLUDED_PAGES.some(u => here.startsWith(u))) {
    console.log("Script exited: not target or excluded page.");
    return;
  }

  function processCheckboxes(root = document) {
    const checkboxes = root.querySelectorAll('input[type="checkbox"][disabled]:not([data-processed])');
    checkboxes.forEach(cb => {
      cb.setAttribute("data-processed", "true");
      const titleText = cb.getAttribute("title");
      cb.disabled = false;

      if (titleText && titleText.trim() !== "") {
        cb.dataset.originalChecked = cb.checked;
        cb.style.opacity = "0.5";
        cb.style.cursor = "not-allowed";
        cb.addEventListener("click", function (evt) {
          evt.preventDefault();
          this.checked = this.dataset.originalChecked === "true";
          alert(titleText);
        });
      } else {
        cb.style.opacity = "0.5";
        cb.style.cursor = "not-allowed";
        cb.disabled = true;
      }
    });
  }

  function boot() {
    processCheckboxes();

    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
          if (node.nodeType === 1) {
            processCheckboxes(node); // catch any new element
          }
        });
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "style"
        ) {
          processCheckboxes(mutation.target); // if element became visible
        }
      });
    });

    const target = document.body || document.documentElement;
    observer.observe(target, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["style"],
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot, { once: true });
  } else {
    boot();
  }
})();