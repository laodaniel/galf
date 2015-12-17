import THREE from 'three';
import threeOrbitControls from 'three-orbit-controls';
import fraise from './img/fraise.jpg';
const OrbitControls = threeOrbitControls(THREE);

const visualizer = {
  mouseX: 0,
  mouseY: 0,
  windowHalfX: window.innerWidth / 2,
  windowHalfY: window.innerHeight / 2,
  scene: new THREE.Scene(),
  camera: new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000),
  renderer: new THREE.WebGLRenderer(),

  init() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    // const material = new THREE.MeshLambertMaterial({ color: 0xF7CAC9 });

    const material = new THREE.MeshLambertMaterial({
      map: new THREE.TextureLoader().load(fraise),
      side: THREE.DoubleSide
    });

    const ambient = new THREE.AmbientLight(0x666666);
    this.scene.add(ambient);

    const light1 = new THREE.PointLight(0xFFFFFF, 10, 8);
    light1.position.set(5, 5, 1);
    this.scene.add(light1);
    this.scene.add(new THREE.PointLightHelper(light1, 1));

    const cube = new THREE.Mesh(geometry, material);
    this.scene.add(cube);
    this.camera.position.z = 2;

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.25;
    this.controls.enableZoom = false;

    document.body.appendChild(this.renderer.domElement);
    this.animate();
  },

  render() {
    this.renderer.render(this.scene, this.camera);
  },

  animate() {
    requestAnimationFrame(this.animate.bind(this));
    this.controls.update();
    this.render();
  }

};

module.exports = visualizer;
