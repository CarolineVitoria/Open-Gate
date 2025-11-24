import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Unique,
} from 'typeorm';

import { User } from 'src/users/entities/user.entity';
import { Company } from 'src/company/entities/company.entity';

@Entity('user_company')
@Unique(['user', 'company'])
export class UserCompany {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.userCompanies, { eager: true })
  user: User;

  @ManyToOne(() => Company, (company) => company.userCompanies, { eager: true })
  company: Company;

  @Column({ default: 'member' })
  role: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
