pragma circom 2.0.0;

include "../node_modules/circomlib/circuits/poseidon.circom";

template Passport() {
    signal input addr;
    signal input nonce;
    signal input secret;
    signal output hash;

    component hasher = Poseidon(1);
    hasher.inputs[0] <== addr + nonce + secret;

    hash <== hasher.out;
}

component main {public [addr, nonce]} = Passport();
