// Scales every page proportionally on screens wider than the 1140px design
// width, so wide screens show the 1140px layout, just larger. Below 1140px
// nothing changes.
//
// CSS zoom also inflates vw/vh units by the zoom factor in engines that
// implement standardized zoom (Chrome 128+, Firefox 126+). Pages divide
// their viewport units by --vz, which is measured here so it stays correct
// in engines that don't inflate them.
(function () {
  var DESIGN_WIDTH = 1140;
  var root = document.documentElement;

  function measureViewportInflation(zoom) {
    if (zoom === 1) return 1;
    var probe = document.createElement('div');
    probe.style.cssText = 'position:absolute;left:0;top:0;width:100vw;height:0;visibility:hidden;pointer-events:none;';
    root.appendChild(probe);
    var ratio = probe.offsetWidth * zoom / window.innerWidth;
    root.removeChild(probe);
    return Math.abs(ratio - zoom) < Math.abs(ratio - 1) ? zoom : 1;
  }

  function apply() {
    var zoom = Math.max(1, window.innerWidth / DESIGN_WIDTH);
    if (zoom > 1) root.style.zoom = String(zoom);
    else root.style.removeProperty('zoom');
    root.style.setProperty('--vz', String(measureViewportInflation(zoom)));
  }

  apply();
  window.addEventListener('resize', apply);
})();
