import THREE from 'three';
import threeOrbitControls from 'three-orbit-controls';

const OrbitControls = threeOrbitControls(THREE);

const visualizer = {
  mouseX: 0,
  mouseY: 0,
  windowHalfX: window.innerWidth / 2,
  windowHalfY: window.innerHeight / 2,
  scene: new THREE.Scene(),
  camera: new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000),
  renderer: new THREE.WebGLRenderer({ antialias: true }),
  primaryColor: 0xF6B1C3,
  init() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.shadowMap.enabled = true;
    this.renderer.gammaInput = true;
    this.renderer.gammaOutput = true;

    const ambient = new THREE.AmbientLight(0x111111);
    this.scene.add(ambient);

    this.room();
    this.lamps();
    this.coffeeTable();
    this.couch();
    this.textSticker();

    this.camera.position.z = 150;

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.enableZoom = true;
    this.controls.maxPolarAngle = 0.9 * Math.PI / 2;

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
  },

  room() {
    // ground
    let material = new THREE.MeshPhongMaterial({ color: 0xFFFFFF, emissive: 0x888888 });
    let geometry = new THREE.PlaneBufferGeometry(600, 400);
    let mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0, -125, 0);
    mesh.rotation.x = - Math.PI / 2;
    this.scene.add(mesh);

    // front wall
    material = new THREE.MeshPhongMaterial({ color: 0xFFFFFF, emissive: 0x888888 });
    geometry = new THREE.PlaneBufferGeometry(600, 250);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0, 0, -200);
    this.scene.add(mesh);

    // right wall
    material = new THREE.MeshPhongMaterial({ emissive: this.primaryColor });
    geometry = new THREE.PlaneBufferGeometry(400, 250);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(300, 0, 0);
    mesh.rotation.y = - Math.PI / 2;
    this.scene.add(mesh);

    // left wall
    material = new THREE.MeshPhongMaterial({ color: 0xFFFFFF, emissive: 0x888888 });
    geometry = new THREE.PlaneBufferGeometry(400, 250);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(-300, 0, 0);
    mesh.rotation.y = Math.PI / 2;
    this.scene.add(mesh);

    // behind wall
    material = new THREE.MeshPhongMaterial({ color: 0xFFFFFF, emissive: 0x888888 });
    geometry = new THREE.PlaneBufferGeometry(600, 250);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0, 0, 200);
    mesh.rotation.y = Math.PI;
    this.scene.add(mesh);
  },

  lamps() {
    const posX = 80;
    const posY = 0;
    // Pendant lamp
    let light = new THREE.PointLight(0xFFFFFF, 1, 300);
    light.position.set(posX, posY - 10, 0);
    this.scene.add(light);
    this.scene.add(new THREE.PointLightHelper(light, 1));

    const arcShape = new THREE.Shape();
    arcShape.absarc(posX, posY, 30, 0, Math.PI * 2, 0, false);
    const holePath = new THREE.Path();
    holePath.absarc(posX, posY, 28, 0, Math.PI * 2, true);
    arcShape.holes.push(holePath);
    let geometry = new THREE.ExtrudeGeometry(arcShape, {
      amount: 25,
      steps: 1,
      bevelEnabled: false,
      curveSegments: 8
    });
    geometry.rotateX(Math.PI / 2);
    let material = new THREE.MeshPhongMaterial({ color: 0xFFFFFF, side: THREE.DoubleSide, emissive: 0xDDDDDD });
    let mesh = new THREE.Mesh(geometry, material);
    this.scene.add(mesh);

    material = new THREE.LineBasicMaterial({ color: 0xFFFFFF, linewidth: 2 });
    geometry = new THREE.Geometry();
    geometry.vertices.push(
      new THREE.Vector3(posX, posY + 125, 0),
      new THREE.Vector3(posX, posY - 10, 0)
    );
    let line = new THREE.Line(geometry, material);
    this.scene.add(line);

    // Floor lamp
    const floorLamp = new THREE.Object3D();
    light = new THREE.PointLight(0xFFFFFF, 0.5, 150);
    floorLamp.add(light);

    geometry = new THREE.CylinderGeometry(10, 20, 20, 32, 1, true);
    material = new THREE.MeshPhongMaterial({ color: 0xFFFFFF, side: THREE.DoubleSide, emissive: 0xDDDDDD });
    mesh = new THREE.Mesh(geometry, material);
    floorLamp.add(mesh);

    material = new THREE.LineBasicMaterial({ color: 0xFFFFFF, linewidth: 5 });
    geometry = new THREE.Geometry();
    geometry.vertices.push(
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, -100, 0)
    );
    line = new THREE.Line(geometry, material);
    floorLamp.add(line);

    geometry = new THREE.CircleGeometry(20, 32);
    material = new THREE.MeshPhongMaterial({ color: 0xFFFFFF, emissive: 0xFFFFFF });
    mesh = new THREE.Mesh(geometry, material);
    mesh.rotateX(- Math.PI / 2);
    mesh.position.set(0, -100, 0);
    floorLamp.add(mesh);

    floorLamp.position.set(-240, -24, -145);

    this.scene.add(floorLamp);
  },

  coffeeTable() {
    const material = new THREE.MeshLambertMaterial({ color: 0xFFFFFF, emissive: 0x888888 });
    const posX = 80;
    const posY = -90;

    let geometry = new THREE.BoxGeometry(100, 5, 120);
    geometry.translate(posX + 0, posY - 11, 0);
    let mesh = new THREE.Mesh(geometry, material);
    this.scene.add(mesh);

    geometry = new THREE.BoxGeometry(80, 5, 90);
    geometry.translate(posX + 0, posY - 16, 0);
    mesh = new THREE.Mesh(geometry, material);
    this.scene.add(mesh);

    geometry = new THREE.BoxGeometry(100, 5, 120);
    geometry.translate(posX + 0, posY - 21, 0);
    mesh = new THREE.Mesh(geometry, material);
    this.scene.add(mesh);
  },

  couch() {
    const couch = new THREE.Object3D();
    let material = new THREE.MeshLambertMaterial({ color: 0xFFFFFF, emissive: 0x888888 });

    // plinth
    let shape = new THREE.Shape();
    shape.moveTo(0, -40);
    shape.lineTo(80, -40);
    shape.lineTo(80, 250);
    shape.lineTo(-85, 250);
    shape.lineTo(-85, 170);
    shape.lineTo(0, 170);
    shape.lineTo(0, - 40);
    let geometry = new THREE.ExtrudeGeometry(shape, { amount: 10,
      bevelEnabled: true, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 });
    let mesh = new THREE.Mesh(geometry, material);
    geometry.translate(0, 0, -10);
    geometry.rotateX(- Math.PI / 2);
    couch.add(mesh);

    // left bench
    shape = new THREE.Shape();
    shape.moveTo(-80, 250);
    shape.lineTo(80, 250);
    shape.lineTo(80, 170);
    shape.lineTo(-80, 170);
    shape.lineTo(-80, 250);
    geometry = new THREE.ExtrudeGeometry(shape, { amount: 15,
      bevelEnabled: true, bevelSegments: 2, steps: 2, bevelSize: 10, bevelThickness: 1 });
    geometry.rotateX(- Math.PI / 2);
    mesh = new THREE.Mesh(geometry, material);
    couch.add(mesh);

    // middle bench
    shape = new THREE.Shape();
    shape.moveTo(0, 170);
    shape.lineTo(80, 170);
    shape.lineTo(80, 90);
    shape.lineTo(0, 90);
    shape.lineTo(0, 170);
    geometry = new THREE.ExtrudeGeometry(shape, { amount: 15,
      bevelEnabled: true, bevelSegments: 2, steps: 2, bevelSize: 10, bevelThickness: 1 });
    geometry.rotateX(- Math.PI / 2);
    mesh = new THREE.Mesh(geometry, material);
    couch.add(mesh);

    // right bench
    shape = new THREE.Shape();
    shape.moveTo(0, 69.5);
    shape.lineTo(80, 69.5);
    shape.lineTo(80, -15);
    shape.lineTo(0, -15);
    shape.lineTo(0, 69.5);
    geometry = new THREE.ExtrudeGeometry(shape, { amount: 15,
      bevelEnabled: true, bevelSegments: 2, steps: 2, bevelSize: 10, bevelThickness: 1 });
    geometry.rotateX(- Math.PI / 2);
    mesh = new THREE.Mesh(geometry, material);
    couch.add(mesh);

    // backrest
    shape = new THREE.Shape();
    shape.moveTo(80, 215);
    shape.lineTo(80, -10);
    shape.lineTo(70, -10);
    shape.lineTo(70, 215);
    geometry = new THREE.ExtrudeGeometry(shape, { amount: 45,
      bevelEnabled: true, bevelSegments: 2, steps: 2, bevelSize: 10, bevelThickness: 10 });
    geometry.rotateX(- Math.PI / 2);
    mesh = new THREE.Mesh(geometry, material);
    couch.add(mesh);

    // right armrest
    shape = new THREE.Shape();
    shape.moveTo(0, -30);
    shape.lineTo(80, -30);
    shape.lineTo(80, -35);
    shape.lineTo(0, -35);
    geometry = new THREE.ExtrudeGeometry(shape, { amount: 30,
      bevelEnabled: true, bevelSegments: 2, steps: 2, bevelSize: 10, bevelThickness: 1 });
    geometry.rotateX(- Math.PI / 2);
    mesh = new THREE.Mesh(geometry, material);
    couch.add(mesh);

    // left armrest
    shape = new THREE.Shape();
    shape.moveTo(0, 240);
    shape.lineTo(80, 240);
    shape.lineTo(80, 235);
    shape.lineTo(0, 235);
    geometry = new THREE.ExtrudeGeometry(shape, { amount: 30,
      bevelEnabled: true, bevelSegments: 2, steps: 2, bevelSize: 10, bevelThickness: 1 });
    geometry.rotateX(- Math.PI / 2);
    mesh = new THREE.Mesh(geometry, material);
    couch.add(mesh);

    // right cushion
    material = new THREE.MeshLambertMaterial({ color: this.primaryColor, emissive: 0x888888 });
    shape = new THREE.Shape();
    shape.moveTo(35, 40);
    shape.lineTo(0, 40);
    shape.lineTo(0, 30);
    shape.lineTo(35, 30);
    geometry = new THREE.ExtrudeGeometry(shape, { amount: 1,
      bevelEnabled: true, bevelSegments: 20, steps: 2, bevelSize: 10, bevelThickness: 10 });
    geometry.translate(0, 0, -18);
    mesh = new THREE.Mesh(geometry, material);
    mesh.rotateY(Math.PI / 2.5);
    mesh.rotateX(Math.PI / 2.5);
    couch.add(mesh);

    // left cushion
    shape = new THREE.Shape();
    shape.moveTo(35, 40);
    shape.lineTo(0, 40);
    shape.lineTo(0, 30);
    shape.lineTo(35, 30);
    geometry = new THREE.ExtrudeGeometry(shape, { amount: 1, curveSegments: 12,
      bevelEnabled: true, bevelSegments: 400, steps: 2, bevelSize: 10, bevelThickness: 10 });
    mesh = new THREE.Mesh(geometry, material);
    geometry.rotateY(- Math.PI / 4);
    mesh.position.set(20, -5, -210);
    couch.add(mesh);

    couch.translateX(220);
    couch.translateY(-120);
    couch.translateZ(50);
    this.scene.add(couch);
  },

  textSticker() {
    const posX = -190;
    const posY = 30;
    const posZ = -200;
    this.addTextGeometry('LES REGLES DE LA MAISON', 8, 'bold', 0.01, posX, posY + 50, posZ);
    this.addTextGeometry('TOUJOURS DIRE QUE L\'ON S\'AIME', 7, 'normal', 0.01, posX, posY + 40, posZ);
    this.addTextGeometry('PARDONNER MEME SI C\'EST DUR', 6.6, 'bold', 0.01, posX, posY + 30, posZ);
    this.addTextGeometry('NE PAS PARLER LA BOUCHE PLEINE', 6.75, 'normal', 0.01, posX, posY + 20, posZ);
    this.addTextGeometry('ETRE POLI ET RESPECTER LES AUTRES', 6.2, 'normal', 0.01, posX, posY + 10, posZ);
    this.addTextGeometry('RESTER TOUJOURS POSITIF MALGRE TOUT', 5.6, 'normal', 0.01, posX, posY, posZ);
    this.addTextGeometry('GARDER LA TETE HAUTE', 9, 'bold', 0.01, posX, posY - 12, posZ);
    this.addTextGeometry('FAIRE DU MIEUX QUE L\'ON PEUT', 7.3, 'normal', 0.01, posX, posY - 22, posZ);
    this.addTextGeometry('PRENDRE SOIN DE SA FAMILLE ET DE SES AMIS', 4.95, 'normal', 0.01, posX, posY - 30, posZ);
    this.addTextGeometry('PROFITER DE LA VIE', 10.45, 'bold', 0.01, posX, posY - 44, posZ);
    this.addTextGeometry('SORTIR ET S\'AMUSER EN FAMILLE', 7, 'normal', 0.01, posX, posY - 54, posZ);
    this.addTextGeometry('FAIRE CE QUE L\'ON AIME', 8.6, 'bold', 0.01, posX, posY - 65, posZ);
    this.addTextGeometry('ECOUTER DE LA MUSIQUE ET DANSER', 6.3, 'normal', 0.01, posX, posY - 74, posZ);
    this.addTextGeometry('CHANTER FAUX MAIS CHANTER QUAND MEME', 5.25, 'normal', 0.01, posX, posY - 82, posZ);
    this.addTextGeometry('ETRE CREATIF ET SE DEBROUILLER SEUL', 5.9, 'normal', 0.01, posX, posY - 90, posZ);
    this.addTextGeometry('SAVOIR DEMANDER DE L\'AIDE DE TEMPS EN TEMPS', 4.65, 'normal', 0.01, posX, posY - 98, posZ);
    this.addTextGeometry('RIRE ET SOURIRE SANS COMPTER', 6.45, 'bold', 0.01, posX, posY - 108, posZ);
    this.addTextGeometry('SE FAIRE DES BISOUS ET DES CALINS', 6.3, 'normal', 0.01, posX, posY - 116, posZ);
  },

  addTextGeometry(text, textSize, textWeight, textHeight, posX, posY, posZ) {
    const material = new THREE.MeshPhongMaterial({ color: 0x000000 });
    const geometry = new THREE.TextGeometry(text, {
      size: textSize,
      height: textHeight,
      curveSegments: 12,
      font: 'verdana',
      weight: textWeight
    });
    geometry.translate(posX, posY, posZ);
    const textMesh = new THREE.Mesh(geometry, material);
    this.scene.add(textMesh);
  }
};

module.exports = visualizer;
