import mongoose from 'mongoose';

const { DB_HOST, DB } = process.env;

export async function connection () {
  return await mongoose.connect(`${DB_HOST}/${DB}`,
    { useUnifiedTopology: true, useNewUrlParser: true },
    () => console.log(`Connected database ${DB} 🗄`)); //eslint-disable-line no-console
}
