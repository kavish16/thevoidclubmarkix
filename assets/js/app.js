document.fonts.ready.then(() => {
  tsParticles.load("particles-js", {
    particles: {
      number: { value: 25 },
      color: { value: "#FFFFFF" }, // Bright white
      shape: {
        type: "char",
        options: {
          char: {
            value: [
              "function()", 
              "console.log()", 
              "let i = 0;", 
              "<div></div>", 
              "const x = 10;", 
              "return true;", 
              "import React", 
              "if (x > y)", 
              "for(let j=0)", 
              "=> arrow fn"
            ],
            font: "Pixelify Sans",
            style: "normal",
            weight: "200",
          }
        }
      },
      opacity: { value: 0.6, random: true },
      size: { value: 14, random: true },
      move: {
        enable: true,
        speed: 3,
        direction: "none", // free/random movement
        random: false,
        straight: false,
        out_mode: "bounce"
      }
    },
    interactivity: {
      events: {
        onhover: { enable: true, mode: "repulse" },
        onclick: { enable: true, mode: "push" }
      },
      modes: {
        repulse: { distance: 100, duration: 0.4 },
        push: { quantity: 2 }
      }
    },
    retina_detect: true
  });
});
document.getElementById("background-video").playbackRate = 1;

