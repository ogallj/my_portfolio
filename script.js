const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('globe-container').appendChild(renderer.domElement);

// Create a sphere (the globe)
const geometry = new THREE.SphereGeometry(5, 50, 50);
const material = new THREE.MeshStandardMaterial({ 
  color: 0x0077be, 
  wireframe: true 
});
const globe = new THREE.Mesh(geometry, material);
scene.add(globe);

// Add a light
const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(10, 10, 10);
scene.add(light);

camera.position.z = 15;

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  globe.rotation.y += 0.01; // Rotate the globe
  renderer.render(scene, camera);
}

animate();

// Handle window resizing
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

// 3D Tilt Effect for Panels
document.querySelectorAll('.panel').forEach((panel) => {
    panel.addEventListener('mousemove', (e) => {
      const rect = panel.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
  
      panel.style.transform = `rotateY(${x / 20}deg) rotateX(${y / -20}deg)`;
    });
  
    panel.addEventListener('mouseleave', () => {
      panel.style.transform = 'rotateY(0deg) rotateX(0deg)';
    });
  });
  
  // Particles Background
  const canvas = document.getElementById('particles-bg');
  const ctx = canvas.getContext('2d');
  
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  const particles = [];
  
  class Particle {
    constructor(x, y, radius, speedX, speedY) {
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.speedX = speedX;
      this.speedY = speedY;
    }
  
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.fill();
      ctx.closePath();
    }
  
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
  
      if (this.x - this.radius < 0 || this.x + this.radius > canvas.width) {
        this.speedX *= -1;
      }
  
      if (this.y - this.radius < 0 || this.y + this.radius > canvas.height) {
        this.speedY *= -1;
      }
    }
  }
  
  function initParticles() {
    for (let i = 0; i < 100; i++) {
      const radius = Math.random() * 3;
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const speedX = (Math.random() - 0.5) * 2;
      const speedY = (Math.random() - 0.5) * 2;
  
      particles.push(new Particle(x, y, radius, speedX, speedY));
    }
  }
  
  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((particle) => {
      particle.update();
      particle.draw();
    });
  
    requestAnimationFrame(animateParticles);
  }
  
  initParticles();
  animateParticles();
  
  // Resize canvas on window resize
  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    particles.length = 0;
    initParticles();
  });
  
  // Skill hover interaction
const skills = document.querySelectorAll('.skill');
const skillDescription = document.querySelector('.skill-description p');

skills.forEach((skill) => {
  skill.addEventListener('mouseover', () => {
    const skillName = skill.getAttribute('data-skill');
    skillDescription.textContent = `Skill: ${skillName}`;
  });

  skill.addEventListener('mouseleave', () => {
    skillDescription.textContent = 'Hover over a skill to see details.';
  });
});

  
  