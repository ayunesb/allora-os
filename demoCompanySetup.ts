import { CompanySetup } from './CompanySetup';
import { Company } from './Company';
import { User } from './User';
import { Database } from './Database';

export class DemoCompanySetup extends CompanySetup {
  private company: Company;
  private user: User;
  private database: Database;

  constructor(company: Company, user: User, database: Database) {
    super();
    this.company = company;
    this.user = user;
    this.database = database;
  }

  public async setup(): Promise<{ success: boolean; error?: string }> {
    try {
      await this.database.connect();
      await this.company.create();
      await this.user.create();
      return { success: true };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }
}