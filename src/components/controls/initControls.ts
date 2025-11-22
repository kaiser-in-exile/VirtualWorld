import { type Player } from "../common/Player";

const HUD = {
    time: document.querySelector<HTMLDivElement>("#time")!,
    location: document.querySelector<HTMLDivElement>("#location")!,
    modal: {
        container: document.querySelector<HTMLDivElement>("#modal")!,
        content: document.querySelector<HTMLDivElement>("#modal-content")!,
        closeButtom: document.querySelector<HTMLDivElement>("#modal-close-button")!,
    },
    controls: {
        w: document.querySelector<HTMLButtonElement>("#w")!,
        a: document.querySelector<HTMLButtonElement>("#a")!,
        s: document.querySelector<HTMLButtonElement>("#s")!,
        d: document.querySelector<HTMLButtonElement>("#d")!,
    },
};


// binds listeners from screen buttons to the player
export function bindControlsToPlayer(player: Player) {
    // Register on screen HUD controls
    ['mousedown', 'touchstart'].forEach(e => {
      HUD.controls.w.addEventListener(e, (_) => { player.motion.forward = true; player.animationState = 'accelerating'; });
      HUD.controls.a.addEventListener(e, (_) => { player.motion.left = true; });
      HUD.controls.s.addEventListener(e, (_) => { player.motion.reverse = true; player.animationState = 'decelerating'; });
      HUD.controls.d.addEventListener(e, (_) => { player.motion.right = true; });
    });
    
    ['mouseup', 'touchend'].forEach(e => {
      HUD.controls.w.addEventListener(e, (_) => { player.motion.forward = false; player.animationState = 'idle'; });
      HUD.controls.a.addEventListener(e, (_) => { player.motion.left = false; });
      HUD.controls.s.addEventListener(e, (_) => { player.motion.reverse = false; player.animationState = 'idle'; });
      HUD.controls.d.addEventListener(e, (_) => { player.motion.right = false; });
    });
}