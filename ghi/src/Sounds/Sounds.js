import summon from "./summon.wav"
import destroy from "./destroyed.wav"
import draw from "./draw.wav"
import shuffle from "./shuffle.wav"
import special from "./specialsummon.wav"
import gain from "./gainlp.wav"
import activate from "./activate.wav"
import set from "./set.wav"
import equip from "./equip.wav"


export function gainSound() {
    const audio = new Audio(gain);
    audio.volume = 0.05
    audio.play()
}

export function summonSound() {
    const audio = new Audio(summon);
    audio.volume = 0.05
    audio.play()
}

export function drawSound() {
    const audio = new Audio(draw);
    audio.volume = 0.05
    audio.play()
}

export function shuffleSound() {
    const audio = new Audio(shuffle);
    audio.volume = 0.05
    audio.play()
}

export function destroySound() {
    const audio = new Audio(destroy);
    audio.volume = 0.05
    audio.play()
}

export function specialSound() {
    const audio = new Audio(special);
    audio.volume = 0.05
    audio.play()
}

export function activateSound() {
    const audio = new Audio(activate);
    audio.volume = 0.05
    audio.play()
}
