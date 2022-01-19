import { Column, Entity, Index } from 'typeorm';

@Index('extrinsic_args_idx', ['args'], {})
@Index('extrinsic_pkey', ['blockNumber', 'extrinsicIndex'], { unique: true })
@Index('extrinsic_method_idx', ['method'], {})
@Index('extrinsic_section_idx', ['section'], {})
@Index('extrinsic_signer_idx', ['signer'], {})
@Entity('extrinsic', { schema: 'public' })
export class Extrinsic {
  @Column('bigint', { primary: true, name: 'block_number' })
  blockNumber: string;

  @Column('integer', { primary: true, name: 'extrinsic_index' })
  extrinsicIndex: number;

  @Column('boolean', { name: 'is_signed' })
  isSigned: boolean;

  @Column('text', { name: 'signer', nullable: true })
  signer: string | null;

  @Column('text', { name: 'section' })
  section: string;

  @Column('text', { name: 'method' })
  method: string;

  @Column('text', { name: 'args' })
  args: string;

  @Column('text', { name: 'hash' })
  hash: string;

  @Column('text', { name: 'doc' })
  doc: string;

  @Column('boolean', { name: 'success' })
  success: boolean;

  @Column('bigint', { name: 'timestamp', nullable: true })
  timestamp: string | null;

  @Column('text', { name: 'amount', nullable: true })
  amount: string | null;

  @Column('text', { name: 'fee', nullable: true })
  fee: string | null;
}
