import * as snarkjs from "snarkjs";

export async function prove(nonce, op, secret) {
    return await snarkjs.groth16.fullProve({
        nonce: nonce.toString(),
        op: op.toString(),
        secret: secret.toString()
    }, `${__dirname}/../passport_js/passport.wasm`, `${__dirname}/../passport_0001.zkey`);
}
