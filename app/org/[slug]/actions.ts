'use server';

import { db } from "@/db";
import { CreateEntryType, entriesTable } from "@/db/schema";

export const createEntry = async (payload: CreateEntryType) => {
  const [result] = await db.insert(entriesTable).values(payload).returning({
    id: entriesTable.id
  });
  
  return result.id;
};
