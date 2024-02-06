import { TUserDB } from "../types";
import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase {
  public static TABLE_USERS = "users";

  public findUsers = async (q: string | undefined): Promise<TUserDB[]> => {
    let usersDB;

    if (q) {
      const result: TUserDB[] = await BaseDatabase.connection(
        UserDatabase.TABLE_USERS
      ).where("name", "LIKE", `%${q}%`);
      usersDB = result;
    } else {
      const result: TUserDB[] = await BaseDatabase.connection(
        UserDatabase.TABLE_USERS
      );
      usersDB = result;
    }

    return usersDB;
  };

  public findUserById = async (id: string): Promise<TUserDB | undefined> => {
    const [userDBExists]: TUserDB[] | undefined[] =
      await BaseDatabase.connection(UserDatabase.TABLE_USERS).where({ id });

    return userDBExists;
  };

  public craeteUser = async (newUserDB: TUserDB): Promise<void> => {
    await BaseDatabase.connection(UserDatabase.TABLE_USERS).insert(newUserDB);
  };
}
