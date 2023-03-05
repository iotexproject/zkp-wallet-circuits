import { expect } from 'chai';
import 'mocha';

import { keccak256, hexlify, toUtf8Bytes, concat } from "ethers";
import { prove } from './prover';

describe('passport', function () {
    describe('prover', function () {
        const admin = '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266';
        const owner = '0x70997970C51812dc3A010C7d01b50e0d17dc79C8';
        const nonce = BigInt(1000);
        const op = BigInt('0x512bf1a99955c11c61f50cb96b80e1a2886f86a09754ff31a17201367790247c');
        const password = 'coolnopass';

        it('init root passportHash', async () => {
            const passport = BigInt(keccak256(
                concat([admin, hexlify(toUtf8Bytes(password))])
            ));
            const {publicSignals} = await prove(
                BigInt(0),
                BigInt(0),
                BigInt(0),
                passport
            );

            expect(publicSignals[0]).to.equal('18086203821292616651857228495614128781144820748367460115956901068133066908012');
        });

        it('prove by who know secret', async () => {
            let passport = BigInt(keccak256(
                concat([admin, hexlify(toUtf8Bytes(password))])
            ));
            passport = passport - nonce - BigInt(owner);
            const {publicSignals} = await prove(
                BigInt(owner),
                nonce,
                op,
                passport
            );

            console.log(publicSignals)

            expect(publicSignals[0])
                .to.equal('18086203821292616651857228495614128781144820748367460115956901068133066908012');
            expect(publicSignals[2]).to.equal(BigInt(owner).toString());
            expect(publicSignals[3]).to.equal(nonce.toString());
            expect(publicSignals[4]).to.equal(BigInt(op).toString());
        })
    });
});
