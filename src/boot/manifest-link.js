/* The web-app manifest is left out on iPhone/iPad: there Safari takes the Home Screen app's start link from the manifest when the page loads,
   which drops the progress in the link (?p=…). Without it, Add to Home Screen saves the page as it is now (name, icon and full screen come
   from the apple- tags below). Android and desktop still get the manifest for Install app. */
(function(){var ios=/iPhone|iPad|iPod/.test(navigator.userAgent)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1);
  if(!ios)document.write('<link rel="manifest" href="manifest.webmanifest?v=2">')})();
