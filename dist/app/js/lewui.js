
/*

LEWITCH

AUTHOR = {
    Sean
    Google Gemini
}

INFORMATION = {
    Imports needed:
        Tailwindcss
        google Fonts

    alternative:
        lewimportslib (lewitch imports library)
}

*/

class SBBtn extends HTMLElement {
  get label() {
    return this.getAttribute("label") || "";
  }

  get icon() {
    return this.getAttribute("icon") || "";
  }

  connectedCallback() {
    // We add a data-target attribute to the actual button so the tab logic can find it easily
    const target = this.label.toLowerCase();
    
    this.innerHTML = `
      <button data-target="${target}" class="sbbtn flex items-center gap-3 w-full px-4 py-3 hover:bg-[#303030] transition text-left text-gray-300 hover:text-white rounded-md">
        <span class="material-symbols-outlined">${this.icon}</span>
        <span class="capitalize text-sm font-medium">${this.label}</span>
      </button>
    `;
  }
}

class SideBar extends HTMLElement {
  connectedCallback() {
    // 1. Force the sidebar to be FIXED. 
    // This takes it out of the document flow so the main content can slide up.
    this.classList.add(
        "fixed",        // Stick to screen
        "top-0",        // Top edge
        "left-0",       // Left edge
        "h-screen",     // Full height
        "bg-[#141414]", 
        "border-r",     // Add a subtle border
        "border-[#333]",
        "z-50"          // Ensure it stays on top
    );
    
    const width = this.getAttribute("_width") || "w-[20vw]";
    if (width) this.classList.add(width.replace(" ", ""));
  }
}

class AlignX extends HTMLElement {
  connectedCallback() {
    this.classList.add(
        "flex",
        "flex-col",
        "w-full",
        "h-full", 
        "px-2",
        "gap-1",
        "pt-4"
    );
  }
}

class Seperator extends HTMLElement {
    connectedCallback() {
        this.classList.add("block", "w-full", "px-4", "py-4");
        this.innerHTML = `
            <div class="w-full h-[1px] bg-[#333]"></div>
        `;
    }
}

customElements.define("sb-seperator", Seperator);
customElements.define("align-x", AlignX);
customElements.define("sb-btn", SBBtn);
customElements.define("side-bar", SideBar);