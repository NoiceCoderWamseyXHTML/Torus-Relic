import * as THREE from "https://unpkg.com/three@0.128.0/build/three.module.js";
        let scene, camera, renderer, relic;

        function init() {
            scene = new THREE.Scene();

            camera = new THREE.PerspectiveCamera(
                75,
                window.innerWidth / window.innerHeight,
                0.1,
                1000
            );
            camera.position.set(0, 2.5, 6.5);
            camera.lookAt(0, 0, 0);

            renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setClearColor(0x0a0f1e);
            document.body.appendChild(renderer.domElement);

            createRelic();

            window.addEventListener('resize', onResize);
            animate();
        }

        function createRelic() {
            relic = new THREE.Group();

            const torusRadius = 2.5;
            const tubeRadius = 0.8;
            const radialSegments = 20;
            const tubularSegments = 40;

            const torusGeometry = new THREE.TorusGeometry(
                torusRadius, 
                tubeRadius, 
                radialSegments, 
                tubularSegments
            );

            // Dense wireframe mesh pattern
            const wireframeMaterial = new THREE.MeshBasicMaterial({
                color: 0x00ddff,
                wireframe: true,
                transparent: true,
                opacity: 0.7
            });

            const wireframe = new THREE.Mesh(torusGeometry, wireframeMaterial);
            relic.add(wireframe);

            const edges = new THREE.EdgesGeometry(torusGeometry);
            const edgeMaterial = new THREE.LineBasicMaterial({
                color: 0x00ffff,
                transparent: true,
                opacity: 0.9
            });
            const edgeLines = new THREE.LineSegments(edges, edgeMaterial);
            relic.add(edgeLines);

            const pointLight = new THREE.PointLight(0x00aaff, 3, 30);
            pointLight.position.set(0, 0, 0);
            relic.add(pointLight);

            const ambientLight = new THREE.AmbientLight(0x002244, 0.4);
            scene.add(ambientLight);

            scene.add(relic);
        }

        function animate() {
            requestAnimationFrame(animate);

            const time = Date.now() * 0.001;

            if (relic) {
                relic.rotation.y += 0.003;
            }

            renderer.render(scene, camera);
        }

        function onResize() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }

        init();
