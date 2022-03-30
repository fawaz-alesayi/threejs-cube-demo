import "./reset.css";
import "./styles.css";

import {
  BoxGeometry,
  CapsuleGeometry,
  EdgesGeometry,
  LineBasicMaterial,
  LineSegments,
  Mesh,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from "three";

const scene = new Scene();

const cam = new PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);

document.querySelector("#app")?.appendChild(renderer.domElement);

const geometry = new BoxGeometry();
const material = new LineBasicMaterial({
  color: 0x00ff00,
});
const mesh = new Mesh(geometry, material);

const wireframe = createWireFrame();
mesh.add(wireframe);

scene.add(mesh);

cam.position.z = 5;

function createWireFrame() {
  const geometry = new EdgesGeometry(mesh.geometry);
  const material = new LineBasicMaterial({ color: 0xffffff });
  const wireframe = new LineSegments(geometry, material);
  return wireframe;
}

let id: number;

function animate() {
  id = requestAnimationFrame(animate);
  mesh.rotation.x += 0.01;
  mesh.rotation.y += 0.01;
  renderer.render(scene, cam);
}

let toggle = true;

animate();

document.body.onkeyup = (e) => {
  if (e.key === " ") {
    if (toggle) {
      cancelAnimationFrame(id);
    } else {
      animate();
    }
    toggle = !toggle;
  }
};

document.body.onclick = () => {
  if (toggle) {
    cancelAnimationFrame(id);
  } else {
    animate();
  }
  toggle = !toggle;
};
