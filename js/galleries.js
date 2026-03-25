/*  ============================================
    MERMAID FESTIVAL — PHOTO GALLERIES
    ============================================
    To add a photo:
      1. Drop the image file into the right folder
         (e.g. images/events/festival-parade/)
      2. Add the filename to the list below

    To remove a photo:
      1. Delete the filename from the list below
      2. Optionally delete the image file
    ============================================  */

var GALLERIES = {

  // ---- EVENT PHOTOS (images/events/<folder>/) ----

  "dinosaur-takeover": [
    "dino_1.png",
    "dino_2.png",
    "dino_3.png",
    "dino_4.png",
    "dino_5.png",
    "dino_6.png",
    "dino_7.png",
    "dino_8.png",
    "dino_9.png",
    "dino_10.png"
  ],

  "festival-parade": [
    "parade_1.jpg",
    "parade_2.jpeg"
  ],

  "demolition-derby": [
    "derby_1.jpg",
    "derby_2.jpg",
    "derby_3.jpg"
  ],

  "queen-pageant": [
    "queen_1.png",
    "queen_2.jpg",
    "queen_3.jpg"
  ],

  "hot-air-balloon": [
    "balloon_1.png",
    "balloon_2.png",
    "balloon_3.png"
  ],

  "cutie-parade": [
    "cutie_parade_1.jpg",
    "cutie_parade_2.jpg",
    "cutie_parade_3.jpg",
    "cutie_parade_4.jpg",
    "cutie_parade_5.jpg"
  ],

  "cutie-pageant": [
    "cutie_pageant_1.jpg",
    "cutie_pageant_2.jpg"
  ],

  "carnival-rides": [
    "carnival_1.jpg",
    "carnival_2.jpg",
    "carnival_3.jpg",
    "carnival_4.jpg",
    "carnival_5.jpg",
    "carnival_6.jpg",
    "carnival_7.jpg",
    "carnival_8.jpg",
    "carnival_9.jpg"
  ],

  "tourament-of-champions": [
    "tournament_1.jpg",
    "tournament_2.jpg",
    "tournament_3.jpg",
    "tournament_4.jpg"
  ],

  "coin-hunt": [
    "coin_1.jpg",
    "coin_2.jpg"
  ],

  "power-wheel-race": [
    "powerwheel_1.jpg",
    "powerwheel_2.jpg",
    "powerwheel_3.jpg",
    "powerwheel_4.jpg",
    "powerwheel_5.jpg"
  ],

  "bands": [
    "bands_1.jpg",
    "bands_2.jpg"
  ],

  "laser-tag": [
    "laser_1.jpg",
    "laser_2.jpg"
  ],

  "karaoke": [
    "karaoke_1.png"
  ],

  "bike-giveway": [
    "bike_1.jpg",
    "bike_2.jpg",
    "bike_3.jpg",
    "bike_4.jpg"
  ],

  "strawberry-festival": [
    "strawberry_1.jpg",
    "strawberry_2.jpg",
    "strawberry_3.jpg"
  ],

  "food": [
    "food_1.jpg",
    "food_2.jpg",
    "food_3.jpg",
    "food_4.jpg"
  ],

  // ---- TRADITION PHOTOS (images/tradition/) ----

  "tradition": [
    "tradition_1.png",
    "tradition_2.png",
    "tradition_3.png",
    "tradition_4.png",
    "tradition_5.png",
    "tradition_6.png",
    "tradition_7.png",
    "tradition_8.png",
    "tradition_9.png",
    "tradition_10.png",
    "tradition_11.png",
    "tradition_12.png",
    "tradition_13.png",
    "tradition_14.png",
    "tradition_15.png",
    "tradition_16.png",
    "tradition_17.png",
    "tradition_18.png",
    "tradition_19.png",
    "tradition_20.png",
    "tradition_21.png",
    "tradition_22.png",
    "tradition_23.png",
    "tradition_24.png",
    "tradition_25.png",
    "tradition_26.png",
    "tradition_27.png",
    "tradition_28.png",
    "tradition_29.png",
    "tradition_30.png",
    "tradition_31.png",
    "tradition_32.png"
  ]
};

/* ---- Auto-populate gallery elements ----
   Finds elements with data-gallery-id="folder-name"
   and sets their data-gallery attribute from the lists above.
   This runs immediately so inline scripts can read data-gallery. */
(function() {
  if (typeof GALLERIES === 'undefined') return;
  var els = document.querySelectorAll('[data-gallery-id]');
  for (var i = 0; i < els.length; i++) {
    var el = els[i];
    var id = el.getAttribute('data-gallery-id');
    var files = GALLERIES[id];
    if (!files || files.length === 0) continue;

    var basePath = id === 'tradition'
      ? 'images/tradition/'
      : 'images/events/' + id + '/';

    var paths = [];
    for (var j = 0; j < files.length; j++) {
      paths.push(basePath + files[j]);
    }
    el.setAttribute('data-gallery', paths.join(','));

    var img = el.querySelector('.img-wrapper img');
    if (img) img.src = paths[0];
  }
})();
