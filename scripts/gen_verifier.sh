#!/bin/sh
set -e

snarkjs zkey export solidityverifier passport_0001.zkey ./Verifier.sol
sed -i -e 's/pragma solidity \^0.6.11/pragma solidity \^0.8.0/g' ./Verifier.sol
rm -f Verifier.sol-e
