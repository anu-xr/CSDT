var e={version:"0.1.0"};window.document.addEventListener("CSDT-check",function(){var n=new CustomEvent("CSDT-check-response",{detail:e});window.parent.document.dispatchEvent(n)}),window.document.addEventListener("CSDT-check-response",function(e){console.log("CSDT check successful: "+e.detail)});
//# sourceMappingURL=csdt.js.map
