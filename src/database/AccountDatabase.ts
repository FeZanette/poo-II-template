import { TAccountDB } from "../types";
import { BaseDatabase } from "./BaseDatabase";

export class AccountDatabase extends BaseDatabase {
  public static TABLE_ACCOUNTS = "accounts";

  public getAllAccounts = async (): Promise<TAccountDB[]> => {
    const accountsDB: TAccountDB[] = await BaseDatabase.connection(
      AccountDatabase.TABLE_ACCOUNTS
    );
    return accountsDB;
  };

  public findAccountById = async (
    id: string
  ): Promise<TAccountDB | undefined> => {
    const [accountDB]: TAccountDB[] | undefined[] =
      await BaseDatabase.connection(AccountDatabase.TABLE_ACCOUNTS).where({
        id,
      });

    return accountDB;
  };

  public craeteAccount = async (newAccountDB: TAccountDB): Promise<void> => {
    await BaseDatabase.connection(AccountDatabase.TABLE_ACCOUNTS).insert(
      newAccountDB
    );
  };

  public async updateBalanceById(id: string, newBalance: number) {
    await BaseDatabase.connection(AccountDatabase.TABLE_ACCOUNTS)
      .update({ balance: newBalance })
      .where({ id });
  }
}
