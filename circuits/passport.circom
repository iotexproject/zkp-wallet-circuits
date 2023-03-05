pragma circom 2.0.0;

include "../node_modules/circomlib/circuits/poseidon.circom";

template Passport() {
    signal input addr;
    signal input nonce;
    signal input secret;
    signal input op;
    signal output hashes[2];

    component passHasher = Poseidon(1);
    passHasher.inputs[0] <== addr + nonce + secret;

    hashes[0] <== passHasher.out;

    component opHasher = Poseidon(2);
    opHasher.inputs[0] <== passHasher.out;
    opHasher.inputs[1] <== op;

    hashes[1] <== opHasher.out;
}

component main {public [addr, nonce, op]} = Passport();
