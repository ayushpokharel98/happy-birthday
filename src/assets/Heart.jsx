import { tsParticles } from "https://cdn.jsdelivr.net/npm/@tsparticles/engine@3.0.3/+esm";
import { loadAll } from "https://cdn.jsdelivr.net/npm/@tsparticles/all@3.0.3/+esm";

const Heart = () => {
    async function loadParticles(options) {
        await loadAll(tsParticles);
        await tsParticles.load({ id: "tsparticles", options });
    }

    const emitterRate = {
        delay: 0.1,
        quantity: 2
    };

    const options = {
        particles: {
            opacity: { value: 1 },
            size: { value: { min: 16, max: 20 } },
            move: {
                enable: true,
                gravity: { enable: true },
                speed: 15,
                outModes: { default: "destroy", top: "none" }
            },
            rotate: {
                value: { min: 0, max: 360 },
                direction: "random",
                move: true,
                animation: { enable: true, speed: 60 }
            },
            tilt: {
                direction: "random",
                enable: true,
                move: true,
                value: { min: 0, max: 360 },
                animation: { enable: true, speed: 60 }
            },
            roll: {
                darken: { enable: true, value: 30 },
                enlighten: { enable: true, value: 30 },
                enable: true,
                mode: "both",
                speed: { min: 15, max: 25 }
            },
            wobble: {
                distance: 30,
                enable: true,
                move: true,
                speed: { min: -15, max: 15 }
            }
        },
        background: {
            color: "transparent"
        },
        emitters: [
            {
                position: { x: 50, y: 0 },
                rate: emitterRate,
                particles: {
                    move: { direction: "middle" },
                    shape: {
                        type: "emoji",
                        options: {
                            emoji: { value: "♥️" }
                        }
                    }
                }
            }
        ]
    };

    loadParticles(options);
};

Heart.stop = () => {
    const instances = tsParticles.dom();
    instances.forEach(instance => instance.stop());
};

export default Heart;
