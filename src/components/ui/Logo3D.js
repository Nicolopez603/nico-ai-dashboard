'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export default function Logo3D() {
  const containerRef = useRef();
  const sceneRef = useRef();
  const rendererRef = useRef();

  useEffect(() => {
    if (!containerRef.current) return;

    // Configuración básica
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true 
    });
    renderer.setSize(64, 64);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);

    // Guardamos una referencia al renderer
    rendererRef.current = renderer;

    // Controles
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    controls.enablePan = false;

    // Crear la llave 3D
    const keyShape = new THREE.Shape();
    // Cabeza de la llave (círculo)
    keyShape.absarc(0, 0, 0.8, 0, Math.PI * 2);
    // Tallo de la llave
    keyShape.moveTo(0.3, 0);
    keyShape.lineTo(0.3, -2);
    keyShape.lineTo(-0.3, -2);
    keyShape.lineTo(-0.3, 0);

    // Dientes de la llave
    const teeth = [
      { x: 0.3, y: -1.2 },
      { x: 0.5, y: -1.4 },
      { x: 0.3, y: -1.6 },
      { x: 0.5, y: -1.8 }
    ];

    teeth.forEach(({ x, y }) => {
      keyShape.lineTo(x, y);
    });

    const extrudeSettings = {
      depth: 0.2,
      bevelEnabled: true,
      bevelThickness: 0.1,
      bevelSize: 0.1,
      bevelSegments: 3
    };

    const geometry = new THREE.ExtrudeGeometry(keyShape, extrudeSettings);
    const material = new THREE.MeshPhysicalMaterial({
      color: 0x4f46e5,
      metalness: 0.9,
      roughness: 0.2,
      clearcoat: 0.8,
      clearcoatRoughness: 0.2
    });

    const key = new THREE.Mesh(geometry, material);
    scene.add(key);

    // Luces
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
    scene.add(ambientLight);

    // Animación
    function animate() {
      requestAnimationFrame(animate);
      if (key) {
        key.rotation.y += 0.01;
      }
      renderer.render(scene, camera);
    }
    animate();

    // Limpieza al desmontar
    return () => {
      if (rendererRef.current) {
        rendererRef.current.dispose();
        containerRef.current?.removeChild(rendererRef.current.domElement);
      }
      // Limpiar la escena
      if (sceneRef.current) {
        sceneRef.current.traverse((object) => {
          if (object.geometry) object.geometry.dispose();
          if (object.material) {
            if (Array.isArray(object.material)) {
              object.material.forEach(material => material.dispose());
            } else {
              object.material.dispose();
            }
          }
        });
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="w-16 h-16 cursor-pointer"
      title="Interactive 3D Key"
    />
  );
} 