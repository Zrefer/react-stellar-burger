const changeBun = (state, action) => {
  const newItemsCount = {
    ...state.itemsCount,
  };
  if (state.currentBun) newItemsCount[state.currentBun._id] = 0;
  newItemsCount[action.payload._id] = 1;

  return {
    ...state,
    currentBun: action.payload,
    itemsCount: newItemsCount,
  };
};

const addIngredient = (state, action) => {
  const { item, uid } = action.payload;
  const ingredient = { ...item, uid };

  const ingredientCount = state.itemsCount[ingredient._id];
  return {
    ...state,
    items: [...state.items, ingredient],
    itemsCount: {
      ...state.itemsCount,
      [ingredient._id]: ingredientCount ? ingredientCount + 1 : 1,
    },
  };
};

const removeIngredient = (state, action) => {
  return {
    ...state,
    items: state.items.filter((item) => item.uid !== action.payload.uid),
    itemsCount: {
      ...state.itemsCount,
      [action.payload._id]: state.itemsCount[action.payload._id] - 1,
    },
  };
};

const reorderIngredients = (state, action) => {
  const { dragUid, hoverUid } = action.payload;
  const dragIndex = state.items.findIndex((item) => item.uid === dragUid);
  const hoverIndex = state.items.findIndex((item) => item.uid === hoverUid);
  const ingredient = state.items.splice(dragIndex, 1)[0];
  state.items.splice(hoverIndex, 0, ingredient);
};

const reducers = {
  changeBun,
  addIngredient,
  removeIngredient,
  reorderIngredients,
};
export default reducers;
