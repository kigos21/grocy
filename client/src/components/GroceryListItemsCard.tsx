import { GroceryList, GroceryListItem } from "@/types";

function GroceryListItemsCard({ grocery_list_items }: GroceryList) {
  const categoryEmojis: Record<string, string> = {
    produce: "🥦",
    "meat & seafood": "🍖",
    "dairy & eggs": "🥚",
    "baking goods": "🧁",
    "grains pasta & rice": "🍚",
    "condiments & spices": "🧂",
    frozen: "❄️",
    "snacks & sweets": "🍬",
    beverages: "🥤",
    "canned & jarred": "🥫",
    others: "📦",
  };

  const categoryOrder = [
    "baking goods",
    "beverages",
    "canned & jarred",
    "condiments & spices",
    "dairy & eggs",
    "frozen",
    "grains pasta & rice",
    "meat & seafood",
    "produce",
    "snacks & sweets",
    "others",
  ];

  // Group items by category
  const groupedItems = grocery_list_items.reduce(
    (acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      acc[item.category].push(item);
      return acc;
    },
    {} as Record<string, GroceryListItem[]>,
  );

  const sortedGroupedItems = Object.entries(groupedItems).sort(
    ([categoryA], [categoryB]) => {
      const indexA = categoryOrder.indexOf(categoryA);
      const indexB = categoryOrder.indexOf(categoryB);

      if (indexA === -1 && indexB === -1) {
        // If both categories are not in the custom order, sort alphabetically
        return categoryA.localeCompare(categoryB);
      }

      if (indexA === -1) return 1; // If categoryA is not in order, move it later
      if (indexB === -1) return -1; // If categoryB is not in order, move it later

      return indexA - indexB; // Sort according to the defined custom order
    },
  );

  return (
    <div className="overflow-hidden rounded-md border md:col-span-4">
      <div className="flex flex-col gap-4 px-4 py-4 pt-3">
        {sortedGroupedItems.map(([category, items]) => (
          <div key={category} className="mb-4">
            <h3 className="flex gap-2 text-lg font-bold capitalize">
              <span>{categoryEmojis[category] || "❓"}</span>
              {category}
            </h3>
            <ul className="text-muted">
              {items.map((item) => (
                <li key={item.id} className="pl-1">
                  {/* <Checkbox /> */}
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="h-4 w-4" />
                    {item.quantity}
                    {["g", "kg", "mL", "L"].includes(item.unit) ? "" : " "}
                    {item.unit} <span className="capitalize">{item.name}</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GroceryListItemsCard;
