import * as THREE from "three";
import { textureLoader } from "./common";
import { filesRoot } from "../../../paths";

const entrancePanelBannerTexture = await textureLoader.loadAsync(`${filesRoot}res/backgrounds/logo-black.jpg`);

export const EntrancePanelMaterial = new THREE.MeshBasicMaterial({
    map: entrancePanelBannerTexture,
    side: THREE.DoubleSide,
    color: "white",
});
