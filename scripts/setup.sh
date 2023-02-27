#!/bin/sh
set -e

snarkjs powersoftau new bn128 12 pot12_0000.ptau
snarkjs powersoftau contribute pot12_0000.ptau pot12_0001.ptau --name="First contribution" -e="$(openssl rand -base64 20)"
snarkjs powersoftau prepare phase2 pot12_0001.ptau pot12_final.ptau
snarkjs groth16 setup passport.r1cs pot12_final.ptau passport_0000.zkey
snarkjs zkey contribute passport_0000.zkey passport_0001.zkey --name="Second contribution" -e="$(openssl rand -base64 20)"
snarkjs zkey export verificationkey passport_0001.zkey verification_key.json
rm -rf *.ptau
