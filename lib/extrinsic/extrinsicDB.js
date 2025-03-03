const { QueryTypes } = require('sequelize');
const { normalizeSubstrateAddress } = require('../../utils/utils');

async function save({
  extrinsic,
  sequelize,
  fields = [
    'block_number',
    'extrinsic_index',
    'is_signed',
    'signer',
    'signer_normalized',
    'section',
    'method',
    'args',
    'hash',
    'success',
    'amount',
    'fee',
    'timestamp',
    'block_index',
    'to_owner',
    'to_owner_normalized',
  ],
  transaction,
}) {
  const values = fields.map((item) => `:${item}`).join(',');
  const updateFields = fields.map((item) => `${item} = :${item}`).join(',');

  await sequelize.query(
    `
      INSERT INTO extrinsic (${fields.join(',')}) VALUES(${values})
      ON CONFLICT ON CONSTRAINT extrinsic_pkey
      DO UPDATE SET ${updateFields};
    `,
    {
      type: QueryTypes.INSERT,
      logging: false,
      replacements: {
        ...extrinsic,
        signer_normalized: extrinsic.signer
          ? normalizeSubstrateAddress(extrinsic.signer)
          : null,
        to_owner_normalized: extrinsic.to_owner
          ? normalizeSubstrateAddress(extrinsic.to_owner)
          : null,
      },
      transaction,
    }
  );
}

module.exports = Object.freeze({
  save,
});
