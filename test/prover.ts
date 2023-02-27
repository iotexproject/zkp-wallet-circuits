import * as snarkjs from "snarkjs";

export async function prove(addr, nonce, secret) {
    return await snarkjs.groth16.fullProve({
        addr: addr.toString(),
        nonce: nonce.toString(),
        secret: secret.toString()
    }, "./passport_js/passport.wasm", "./passport_0001.zkey");
}
