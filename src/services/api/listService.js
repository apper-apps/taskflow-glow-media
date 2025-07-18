import listData from "@/services/mockData/lists.json";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

let lists = [...listData];

export const listService = {
  async getAll() {
    await delay(250);
    return [...lists];
  },

  async getById(id) {
    await delay(200);
    const list = lists.find(list => list.Id === id);
    if (!list) throw new Error("List not found");
    return { ...list };
  },

  async create(listData) {
    await delay(400);
    const newList = {
      ...listData,
      Id: Math.max(...lists.map(l => l.Id)) + 1,
      taskCount: 0,
      order: lists.length,
    };
    lists.push(newList);
    return { ...newList };
  },

  async update(id, updates) {
    await delay(300);
    const index = lists.findIndex(list => list.Id === id);
    if (index === -1) throw new Error("List not found");
    
    lists[index] = { ...lists[index], ...updates };
    return { ...lists[index] };
  },

  async delete(id) {
    await delay(250);
    const index = lists.findIndex(list => list.Id === id);
    if (index === -1) throw new Error("List not found");
    
    lists.splice(index, 1);
    return true;
  },
};