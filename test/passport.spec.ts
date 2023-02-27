import { expect } from 'chai';
import 'mocha';

import { keccak256, hexlify, toUtf8Bytes, concat  } from "ethers";
import { prove } from './prover';

describe('passport', function () {
    describe('prover', function () {
        const admin = '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266';
        const owner = '0x70997970c51812dc3a010c7d01b50e0d17dc79c8';
        const passord = 'coolnopass';

        it('init root passportHash', async () => {
            const passport = BigInt(keccak256(
                concat([admin, hexlify(toUtf8Bytes(passord))])
            ));
            const {publicSignals} = await prove(
                BigInt(0),
                BigInt(0),
                passport
            );

            expect(publicSignals[0]).to.equal('18086203821292616651857228495614128781144820748367460115956901068133066908012');
        });

        it('prove by who know secret', async () => {
            let passport = BigInt(keccak256(
                concat([admin, hexlify(toUtf8Bytes(passord))])
            ));
            passport = passport - BigInt(owner) - BigInt(10);
            const {publicSignals} = await prove(
                BigInt(owner),
                BigInt(10),
                passport
            );
            expect(publicSignals[0])
                .to.equal('18086203821292616651857228495614128781144820748367460115956901068133066908012');
            expect(publicSignals[1]).to.equal(BigInt(owner).toString());
            expect(publicSignals[2]).to.equal('10');
        })
    });
});
