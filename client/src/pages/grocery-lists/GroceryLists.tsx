import GroceryCard from "@/components/GroceryCard";

function GroceryLists() {
  return (
    <>
      <h1>Grocery Lists</h1>
      <div className="flex justify-center">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <GroceryCard
            id={0}
            user_id={0}
            name={""}
            created_at={""}
            updated_at={""}
            recipe={""}
          />
          <GroceryCard
            id={0}
            user_id={0}
            name={""}
            created_at={""}
            updated_at={""}
            recipe={""}
          />{" "}
          <GroceryCard
            id={0}
            user_id={0}
            name={""}
            created_at={""}
            updated_at={""}
            recipe={""}
          />
          <GroceryCard
            id={0}
            user_id={0}
            name={""}
            created_at={""}
            updated_at={""}
            recipe={""}
          />
          <GroceryCard
            id={0}
            user_id={0}
            name={""}
            created_at={""}
            updated_at={""}
            recipe={""}
          />
        </div>
      </div>
    </>
  );
}

export default GroceryLists;
