// ----- Simulated Live World Population -----
function updatePopulation() {
    const refTimePopulation =
      new Date("2025-02-21T00:00:00Z").getTime() / 1000;
    const currentTime = Date.now() / 1000;
    const elapsed = currentTime - refTimePopulation;
    const growthRatePop = 2.22; // people per second
    const simulatedPopulation = Math.floor(
      8206619924 + elapsed * growthRatePop
    );
    document.getElementById("population-stat").innerHTML =
      "<strong>Population:</strong> " +
      simulatedPopulation.toLocaleString();
  }
  updatePopulation();
  setInterval(updatePopulation, 1000);

  // ----- Fixed Earth Age and Distance from Sun -----
  document.getElementById("earth-age").textContent = "4.54 billion years";
  document.getElementById("distance-sun").textContent = "149.60";

  // ----- Side Menu and Pop-Out Toggling -----
  const aboutEarthBtn = document.getElementById("about-earth-btn");
  const quoteBtn = document.getElementById("quote-btn");
  const voyagerStatsBtn = document.getElementById("voyager-stats-btn");
  const fullscreenBtn = document.getElementById("fullscreen-btn");
  const playMusicBtn = document.getElementById("play-music-btn");
  const aboutEarthSection = document.getElementById("about-earth-section");
  const fullQuoteSection = document.getElementById("full-quote-section");
  const voyagerPopout = document.getElementById("voyager-popout");

  aboutEarthBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    aboutEarthSection.classList.toggle("open");
    fullQuoteSection.classList.remove("open");
    voyagerPopout.style.display = "none";
  });
  quoteBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    fullQuoteSection.classList.toggle("open");
    aboutEarthSection.classList.remove("open");
    voyagerPopout.style.display = "none";
  });
  voyagerStatsBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    voyagerPopout.style.display = "block";
    aboutEarthSection.classList.remove("open");
    fullQuoteSection.classList.remove("open");
  });
  document.addEventListener("click", (e) => {
    if (
      !aboutEarthSection.contains(e.target) &&
      e.target !== aboutEarthBtn
    ) {
      aboutEarthSection.classList.remove("open");
    }
    if (!fullQuoteSection.contains(e.target) && e.target !== quoteBtn) {
      fullQuoteSection.classList.remove("open");
    }
    if (!voyagerPopout.contains(e.target) && e.target !== voyagerStatsBtn) {
      voyagerPopout.style.display = "none";
    }
  });

  // ----- Pop-Out Tab Functionality -----
  const closeBtn = voyagerPopout.querySelector(".close");
  const tabLinks = voyagerPopout.querySelectorAll(".tab-link");
  const tabContents = voyagerPopout.querySelectorAll(".tab-content");

  closeBtn.addEventListener("click", () => {
    voyagerPopout.style.display = "none";
  });

  tabLinks.forEach((link) => {
    link.addEventListener("click", () => {
      tabLinks.forEach((l) => l.classList.remove("active"));
      link.classList.add("active");
      tabContents.forEach((content) => content.classList.remove("active"));
      const tabId = link.getAttribute("data-tab");
      document.getElementById(tabId).classList.add("active");
    });
  });

  voyagerPopout.addEventListener("click", (e) => {
    if (e.target === voyagerPopout) {
      voyagerPopout.style.display = "none";
    }
  });

  // ----- Simulate Live Stats for Voyager 1 (Miles and Kilometers) -----
  const startTime = new Date("2025-02-21T00:00:00Z").getTime() / 1000;
  const initialDistanceKm = 24380000000; // 24.38 billion km on Feb 21, 2025
  const speedKmPerSec = 17; // 17 km/s

  function updateVoyagerStats() {
    const currentTime = Date.now() / 1000;
    const elapsedSeconds = currentTime - startTime;
    const distanceKm = initialDistanceKm + speedKmPerSec * elapsedSeconds;
    const distanceMiles = distanceKm * 0.621371;
    document.getElementById(
      "voyager-distance-miles"
    ).textContent = `${Math.floor(distanceMiles).toLocaleString()} miles`;
    document.getElementById(
      "voyager-distance-km"
    ).textContent = `${Math.floor(distanceKm).toLocaleString()} km`;
  }
  updateVoyagerStats();
  setInterval(updateVoyagerStats, 1000);

  // ----- Fullscreen Functionality -----
  fullscreenBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    const paleBlueDot = document.getElementById("pale-blue-dot");
    if (paleBlueDot.requestFullscreen) {
      paleBlueDot.requestFullscreen();
    } else if (paleBlueDot.mozRequestFullScreen) {
      paleBlueDot.mozRequestFullScreen();
    } else if (paleBlueDot.webkitRequestFullscreen) {
      paleBlueDot.webkitRequestFullscreen();
    } else if (paleBlueDot.msRequestFullscreen) {
      paleBlueDot.msRequestFullscreen();
    }
  });

  // ----- Play/Pause Music -----
  const audio = document.getElementById("music-audio");
  let musicPlaying = true;

  playMusicBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (musicPlaying) {
      audio.pause();
      playMusicBtn.textContent = "Play Music";
    } else {
      audio.play().catch((error) => {
        console.error("Audio playback failed:", error);
      });
      playMusicBtn.textContent = "Pause Music";
    }
    musicPlaying = !musicPlaying;
  });

  audio.addEventListener("error", (e) => {
    console.error("Audio error:", e);
    playMusicBtn.textContent = "Music Unavailable";
    playMusicBtn.disabled = true;
  });