import THREE from 'three';
import fraise from './img/text.jpg';
import threeOrbitControls from 'three-orbit-controls';

const OrbitControls = threeOrbitControls(THREE);

// import fraise from './img/fraise.jpg';
// const material = new THREE.MeshLambertMaterial({
//   map: new THREE.TextureLoader().load(fraise),
//   side: THREE.DoubleSide
// });

const blender = {

  camera: new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000),
  renderer: new THREE.WebGLRenderer(),
  scene: new THREE.Scene(),

  init() {
    // THREE.ImageUtils.crossOrigin = '';
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.camera.position.z = 5;

    const loader = new THREE.JSONLoader();

    const ambient = new THREE.AmbientLight(0xFFFFFF);
    this.scene.add(ambient);

    const light1 = new THREE.PointLight(0xFFFFFF, 10, 5);
    light1.position.set(5, 5, 1);
    this.scene.add(light1);
    this.scene.add(new THREE.PointLightHelper(light1, 1));

    loader.load('./blender.json', (geometry) => {
    // create a new material
      const material = new THREE.MeshLambertMaterial({
        map: new THREE.TextureLoader().load(fraise),
        side: THREE.DoubleSide
      });

      // create a mesh with models geometry and material
      const mesh = new THREE.Mesh(
        geometry,
        material // new THREE.MeshLambertMaterial({ color: 0xF7CAC9, side: THREE.DoubleSide})
      );
      this.scene.add(mesh);

      document.body.appendChild(this.renderer.domElement);

      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
      this.controls.enableDamping = true;
      this.controls.dampingFactor = 0.25;
      this.controls.enableZoom = true;

      this.animate();
    });
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

module.exports = blender;
