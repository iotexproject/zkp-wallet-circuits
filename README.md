Account Abstraction Circom
==========================

## Compile circuit

```
circom circuits/passport.circom --r1cs --wasm --sym --c
```

## Show circuit infomation

```
snarkjs info -r passport.r1cs
snarkjs r1cs print passport.r1cs passport.sym
```

## Calculate witness

```
# snarkjs calculatewitness --wasm ./passport_js/passport.wasm --input input.json
node ./passport_js/generate_witness.js ./passport_js/passport.wasm input.json witness.wtns
```

## Trusted setup (Groth16)

```
# Powers of Tau
snarkjs powersoftau new bn128 12 pot12_0000.ptau -v
snarkjs powersoftau contribute pot12_0000.ptau pot12_0001.ptau --name="First contribution" -v

# Phase 2
snarkjs powersoftau prepare phase2 pot12_0001.ptau pot12_final.ptau -v
snarkjs groth16 setup passport.r1cs pot12_final.ptau passport_0000.zkey
snarkjs zkey contribute passport_0000.zkey passport_0001.zkey --name="1st Contributor Name" -v

# Export verfication key
snarkjs zkey export verificationkey passport_0001.zkey verification_key.json
```

## Proof

### Off-chain

```
# Generate proof
snarkjs groth16 prove passport_0001.zkey witness.wtns proof.json public.json

# Verify proof
snarkjs groth16 verify verification_key.json public.json proof.json
```

### Contract

```
snarkjs zkey export solidityverifier passport_0001.zkey verifier.sol
```
