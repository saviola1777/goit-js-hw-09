!function(){var t=document.querySelector("button[data-start]"),e=document.querySelector("button[data-stop]"),r=document.querySelector("body");t.addEventListener("click",(function(e){n=setInterval((function(){return r.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16))}),1e3),e.currentTarget&&t.setAttribute("disabled","disabled")})),e.addEventListener("click",(function(e){clearInterval(n),t.removeAttribute("disabled","disabled")}));var n=null}();
//# sourceMappingURL=01-color-switcher.8579fb63.js.map
