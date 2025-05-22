import { updateExpiredTodos } from "./todo.service";

// This function is intended to be run as a cron job to update expired todos
export const runExpiredTodosUpdate = async () => {
  console.log("Running expired todos update 123");
  try {
    const updatedCount = await updateExpiredTodos();
    console.log(`Updated ${updatedCount} expired todos`);
    return updatedCount;
  } catch (error) {
    console.error("Error updating expired todos:", error);
    throw error;
  }
};
