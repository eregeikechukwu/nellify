'use client';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { clamp, lerp } from '@/lib/utils';

const VERT = /* glsl */ `
uniform float uTime; uniform float uMorph; uniform vec2 uMouse; uniform float uAspect; uniform float uSize; uniform float uPixel;
attribute vec3 aTorus; attribute float aRand;
varying float vMix; varying float vAlpha;
void main() {
  vec3 p = mix(position, aTorus, uMorph);
  float n = sin(p.x * 1.6 + uTime * 0.6) + sin(p.y * 1.9 + uTime * 0.5) + sin(p.z * 1.7 + uTime * 0.7);
  p += normalize(p) * n * 0.12;
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  vec4 clip = projectionMatrix * mv;
  vec2 ndc = clip.xy / clip.w;
  vec2 d = (ndc - uMouse) * vec2(uAspect, 1.0);
  float push = smoothstep(0.45, 0.0, length(d));
  mv.xy += normalize(d + 0.0001) * push * 0.55;
  gl_Position = projectionMatrix * mv;
  gl_PointSize = uSize * uPixel * (1.0 / -mv.z) * (0.55 + aRand * 0.9);
  vMix = 0.5 + 0.5 * sin(p.y * 0.8 + uTime * 0.25 + aRand * 3.0);
  vAlpha = 0.35 + 0.65 * aRand;
}`;
const FRAG = /* glsl */ `
varying float vMix; varying float vAlpha;
void main() {
  float d = length(gl_PointCoord - 0.5);
  if (d > 0.5) discard;
  float a = smoothstep(0.5, 0.0, d);
  vec3 amber = vec3(0.96, 0.65, 0.14);
  vec3 blue = vec3(0.24, 0.48, 1.0);
  gl_FragColor = vec4(mix(amber, blue, vMix), a * vAlpha);
}`;

/**
 * One persistent canvas for the whole site: a particle cloud that morphs from a sphere to a torus
 * as you scroll, reacts to the cursor, and dims after the hero.
 */
export default function Scene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const mobile = window.innerWidth < 800;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false, powerPreference: 'high-performance' });
    } catch {
      return; // WebGL unavailable: the CSS gradient fallback stays visible.
    }
    const pixel = Math.min(window.devicePixelRatio || 1, 1.5);
    renderer.setPixelRatio(pixel);
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 50);
    camera.position.z = 8;

    // Geometry: same particle count mapped onto a sphere (position) and a torus (aTorus).
    const count = mobile ? 3200 : 14000;
    const sphere = new Float32Array(count * 3);
    const torus = new Float32Array(count * 3);
    const rand = new Float32Array(count);
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const th = golden * i;
      sphere.set([Math.cos(th) * r * 2.1, y * 2.1, Math.sin(th) * r * 2.1], i * 3);
      const u = Math.random() * Math.PI * 2, v = Math.random() * Math.PI * 2;
      const R = 2.0, rr = 0.75;
      torus.set([(R + rr * Math.cos(v)) * Math.cos(u), rr * Math.sin(v), (R + rr * Math.cos(v)) * Math.sin(u)], i * 3);
      rand[i] = Math.random();
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(sphere, 3));
    geo.setAttribute('aTorus', new THREE.BufferAttribute(torus, 3));
    geo.setAttribute('aRand', new THREE.BufferAttribute(rand, 1));

    const uniforms = {
      uTime: { value: 0 }, uMorph: { value: 0 }, uMouse: { value: new THREE.Vector2(10, 10) },
      uAspect: { value: 1 }, uSize: { value: mobile ? 26 : 30 }, uPixel: { value: pixel },
    };
    const mat = new THREE.ShaderMaterial({ vertexShader: VERT, fragmentShader: FRAG, uniforms, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending });
    const points = new THREE.Points(geo, mat);
    const group = new THREE.Group();
    group.add(points);
    scene.add(group);

    const mouse = { x: 10, y: 10, tx: 10, ty: 10 };
    const onMove = (e: PointerEvent) => { mouse.tx = (e.clientX / window.innerWidth) * 2 - 1; mouse.ty = -((e.clientY / window.innerHeight) * 2 - 1); };
    const onLeave = () => { mouse.tx = 10; mouse.ty = 10; };

    const resize = () => {
      const w = window.innerWidth, h = window.innerHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h; camera.updateProjectionMatrix();
      uniforms.uAspect.value = w / h;
    };
    resize();

    let raf = 0, running = true;
    const clock = new THREE.Clock();
    let morph = 0, fade = 1, px = 0, py = 0, sc = 1;

    const frame = () => {
      const t = clock.getElapsedTime();
      const vh = window.innerHeight;
      const y = window.scrollY;
      // Scroll drives: morph (sphere -> torus -> sphere), dimming after the hero, drift to centre.
      const targetMorph = Math.pow(Math.sin((y / (vh * 2.2)) * Math.PI * 0.5), 2);
      morph = lerp(morph, targetMorph, 0.06);
      const heroPct = clamp(y / (vh * 0.9), 0, 1);
      fade = lerp(fade, 1 - heroPct * 0.72, 0.1);
      const wide = window.innerWidth >= 900;
      px = lerp(px, wide ? 1.9 * (1 - heroPct) : 0, 0.06);
      // On phones the headline fills the screen, so park the cloud in the empty space above it.
      py = lerp(py, wide ? 0 : 1.9 * (1 - heroPct), 0.06);
      sc = lerp(sc, (mobile ? 0.7 : 1) * (1 - heroPct * 0.25), 0.06);

      mouse.x = lerp(mouse.x, mouse.tx, 0.12); mouse.y = lerp(mouse.y, mouse.ty, 0.12);
      uniforms.uMouse.value.set(mouse.x, mouse.y);
      uniforms.uTime.value = t;
      uniforms.uMorph.value = morph;
      group.position.set(px, py, 0); group.scale.setScalar(sc);
      group.rotation.y = t * 0.08 + y * 0.0006;
      group.rotation.x = Math.sin(t * 0.15) * 0.15 + y * 0.0002;
      canvas.style.opacity = String(fade * (wide ? 1 : 0.75));
      renderer.render(scene, camera);
      if (running && !reduced) raf = requestAnimationFrame(frame);
    };

    const onVisibility = () => {
      if (document.hidden) { running = false; cancelAnimationFrame(raf); }
      else if (!running && !reduced) { running = true; clock.getDelta(); raf = requestAnimationFrame(frame); }
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);
    window.addEventListener('resize', resize);
    document.addEventListener('visibilitychange', onVisibility);
    frame(); // reduced motion: one static frame, re-rendered only on resize

    return () => {
      running = false; cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVisibility);
      geo.dispose(); mat.dispose(); renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }} />;
}
