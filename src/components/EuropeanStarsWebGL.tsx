'use client';

import { useRef, useEffect, useCallback } from 'react';
import * as THREE from 'three';

const EU_GOLD = 0xffd700;
const EU_GOLD_HEX = new THREE.Color(EU_GOLD);
const STAR_COUNT = 12; // EU flag: 12 stars in a circle
const RADIUS = 1.4;
const STAR_POINT_UP = true; // EU: one point always upward

function createStarShape(outerRadius = 0.08, innerRadius = 0.04, points = 5): THREE.Shape {
  const shape = new THREE.Shape();
  const step = Math.PI / points;
  for (let i = 0; i < points * 2; i++) {
    const r = i % 2 === 0 ? outerRadius : innerRadius;
    const a = i * step - Math.PI / 2; // -90° so one point is up
    const x = Math.cos(a) * r;
    const y = Math.sin(a) * r;
    if (i === 0) shape.moveTo(x, y);
    else shape.lineTo(x, y);
  }
  shape.closePath();
  return shape;
}

export default function EuropeanStarsWebGL() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    stars: THREE.Group;
    particles: THREE.Points;
    frameId: number;
  } | null>(null);

  const init = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;
    if (width === 0 || height === 0) return;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 10);
    camera.position.z = 3.2;
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.85;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    // EU circle of 12 stars (one point up)
    const starShape = createStarShape(0.055, 0.028, 5);
    const starGeom = new THREE.ShapeGeometry(starShape);
    const starMat = new THREE.MeshBasicMaterial({
      color: EU_GOLD_HEX,
      transparent: true,
      opacity: 0.92,
      side: THREE.DoubleSide,
    });

    const stars = new THREE.Group();
    for (let i = 0; i < STAR_COUNT; i++) {
      const angle = (i / STAR_COUNT) * Math.PI * 2 - Math.PI / 2;
      const mesh = new THREE.Mesh(starGeom.clone(), starMat.clone());
      mesh.position.x = Math.cos(angle) * RADIUS;
      mesh.position.y = Math.sin(angle) * RADIUS;
      mesh.rotation.z = -angle;
      mesh.scale.setScalar(1);
      stars.add(mesh);
    }
    stars.rotation.z = 0;
    scene.add(stars);

    // Soft glow behind the circle (ring)
    const ringGeom = new THREE.RingGeometry(RADIUS * 0.92, RADIUS * 1.08, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: EU_GOLD_HEX,
      transparent: true,
      opacity: 0.12,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    const ring = new THREE.Mesh(ringGeom, ringMat);
    ring.rotation.x = Math.PI / 2;
    scene.add(ring);

    // Particle field (European stars dust)
    const particleCount = 320;
    const pos = new Float32Array(particleCount * 3);
    const rand = () => (Math.random() - 0.5) * 2.5;
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = rand();
      pos[i * 3 + 1] = rand();
      pos[i * 3 + 2] = rand() * 0.5;
    }
    const particleGeom = new THREE.BufferGeometry();
    particleGeom.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const particleMat = new THREE.PointsMaterial({
      color: EU_GOLD_HEX,
      size: 0.018,
      transparent: true,
      opacity: 0.35,
      sizeAttenuation: true,
      depthWrite: false,
    });
    const particles = new THREE.Points(particleGeom, particleMat);
    scene.add(particles);

    sceneRef.current = { scene, camera, renderer, stars, particles, frameId: 0 };
  }, []);

  useEffect(() => {
    init();

    let animationRunning = true;
    const startTime = Date.now() * 0.001;

    const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const animate = () => {
      if (!animationRunning || !sceneRef.current) return;
      const { scene, camera, renderer, stars, particles } = sceneRef.current;
      const t = Date.now() * 0.001 - startTime;
      const rate = prefersReducedMotion ? 0 : 1;

      stars.rotation.z = t * 0.08 * rate;
      particles.rotation.y = t * 0.03 * rate;
      particles.rotation.x = (Math.sin(t * 0.05) * 0.1) * rate;

      renderer.render(scene, camera);
      sceneRef.current.frameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      const container = containerRef.current;
      if (!container || !sceneRef.current) return;
      const { camera, renderer } = sceneRef.current;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      animationRunning = false;
      window.removeEventListener('resize', handleResize);
      if (sceneRef.current?.frameId) cancelAnimationFrame(sceneRef.current.frameId);
      if (sceneRef.current?.renderer?.domElement?.parentNode) {
        sceneRef.current.renderer.domElement.parentNode.removeChild(sceneRef.current.renderer.domElement);
      }
      sceneRef.current?.renderer.dispose();
      sceneRef.current = null;
    };
  }, [init]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full"
      aria-hidden
      style={{ minHeight: '100%' }}
    />
  );
}
