import { generateSalt, hashPassword } from 'common/helpers';
import { connectToDBServer } from 'core/servers';
import { envConstants } from 'core/constants';
import { getHomeContext } from 'dals/home/home.context';
import { getUserContext } from 'dals/user/user.context';
import { db } from 'dals/mock-data';

export const run = async () => {
  await connectToDBServer(envConstants.MONGODB_URI);

  for (const user of db.users) {
    const salt = await generateSalt();
    const hashedPassword = await hashPassword(user.password, salt);
    await getUserContext().insertOne({
      ...user,
      password: hashedPassword,
      salt,
    });
  };

  await getHomeContext().insertMany(db.homes);
};