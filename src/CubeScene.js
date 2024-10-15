import React, { useRef, useEffect } from 'react.js'
import * as THREE from 'three.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

useEffect(() => {
  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableZoom = false // Disable zoom for better UX
  controls.update()
}, [])

const CubeScene = () => {
  const mountRef = useRef(null)

  useEffect(() => {
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    )
    const renderer = new THREE.WebGLRenderer()
    renderer.setSize(window.innerWidth, window.innerHeight)
    mountRef.current.appendChild(renderer.domElement)

    const geometry = new THREE.BoxGeometry(1, 1, 1)
    const textureLoader = new THREE.TextureLoader()
    const materials = [
      new THREE.MeshBasicMaterial({
        map: textureLoader.load('/textures/front.png'),
      }), // Front face
      new THREE.MeshBasicMaterial({
        map: textureLoader.load('/textures/back.png'),
      }), // Back face
      new THREE.MeshBasicMaterial({
        map: textureLoader.load('/textures/top.png'),
      }), // Top face
      new THREE.MeshBasicMaterial({
        map: textureLoader.load('/textures/bottom.png'),
      }), // Bottom face
      new THREE.MeshBasicMaterial({
        map: textureLoader.load('/textures/left.png'),
      }), // Left face
      new THREE.MeshBasicMaterial({
        map: textureLoader.load('/textures/right.png'),
      }), // Right face
    ]

    const cube = new THREE.Mesh(geometry, materials)

    scene.add(cube)

    camera.position.z = 5

    const animate = function () {
      requestAnimationFrame(animate)
      cube.rotation.x += 0.01
      cube.rotation.y += 0.01
      renderer.render(scene, camera)
    }

    animate()

    return () => {
      mountRef.current.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={mountRef}></div>
}

export default CubeScene
