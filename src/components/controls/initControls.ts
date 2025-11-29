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
    ["mousedown", "touchstart"].forEach((eventName) => {
        HUD.controls.w.addEventListener(
            eventName,
            (ev) => {
                ev.preventDefault();
                ev.stopPropagation();
                player.motion.forward = true;
                player.animationState = "accelerating";
            },
            { passive: false }
        );
        HUD.controls.a.addEventListener(
            eventName,
            (ev) => {
                ev.preventDefault();
                ev.stopPropagation();
                player.motion.left = true;
            },
            { passive: false }
        );
        HUD.controls.s.addEventListener(
            eventName,
            (ev) => {
                ev.preventDefault();
                ev.stopPropagation();
                player.motion.reverse = true;
                player.animationState = "decelerating";
            },
            { passive: false }
        );
        HUD.controls.d.addEventListener(
            eventName,
            (ev) => {
                ev.preventDefault();
                ev.stopPropagation();
                player.motion.right = true;
            },
            { passive: false }
        );
    });

    ["mouseup", "touchend"].forEach((eventName) => {
        HUD.controls.w.addEventListener(
            eventName,
            (ev) => {
                ev.preventDefault();
                ev.stopPropagation();
                player.motion.forward = false;
                player.animationState = "idle";
            },
            { passive: false }
        );
        HUD.controls.a.addEventListener(
            eventName,
            (ev) => {
                ev.preventDefault();
                ev.stopPropagation();
                player.motion.left = false;
            },
            { passive: false }
        );
        HUD.controls.s.addEventListener(
            eventName,
            (ev) => {
                ev.preventDefault();
                ev.stopPropagation();
                player.motion.reverse = false;
                player.animationState = "idle";
            },
            { passive: false }
        );
        HUD.controls.d.addEventListener(
            eventName,
            (ev) => {
                ev.preventDefault();
                ev.stopPropagation();
                player.motion.right = false;
            },
            { passive: false }
        );
    });
}
