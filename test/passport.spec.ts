import { expect } from 'chai';
import 'mocha';

import { keccak256, hexlify, toUtf8Bytes, concat } from "ethers";
import { prove } from './prover';

describe('passport', function () {
    describe('prover', function () {
        const namehash = '0xf6d3ecccb81efea56e3945e1a515ab39167f363e82ecfc8cd01799bd3f55e472';
        const nonce = BigInt(1000);
        const op = BigInt('0x512bf1a99955c11c61f50cb96b80e1a2886f86a09754ff31a17201367790247c');
        const password = 'coolnopass';

        it('init root passportHash', async () => {
            const passport = BigInt(keccak256(
                concat([namehash, hexlify(toUtf8Bytes(password))])
            ));
            const {publicSignals} = await prove(
                BigInt(0),
                BigInt(0),
                passport
            );

            expect(publicSignals[0]).to.equal('9602585794169804669169095132496581942289261574407800176697417431260330978843');
        });

        it('prove by who know secret', async () => {
            let passport = BigInt(keccak256(
                concat([namehash, hexlify(toUtf8Bytes(password))])
            ));
            passport = passport - nonce;
            const {publicSignals} = await prove(
                nonce,
                op,
                passport
            );

            console.log(publicSignals)

            expect(publicSignals[0])
                .to.equal('9602585794169804669169095132496581942289261574407800176697417431260330978843');
            expect(publicSignals[2]).to.equal(nonce.toString());
            expect(publicSignals[3]).to.equal(BigInt(op).toString());
        })
    });
});
