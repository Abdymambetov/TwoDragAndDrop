
import { createStore } from 'redux';


const initialState = {
  boards: [
    {id: 1, title: 'Столы', items: [{id: 1,  title: 'Стол на 6 человек'}, {id: 2, title: 'Стол на 4 человек'}, {id: 3, title: 'Стол на 2 человек'}]},
    {id: 2, title: 'Доска', items: []},
    
  ],
  currentBoard: null,
  currentItem: null
};


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_CURRENT_BOARD':
      return { ...state, currentBoard: action.payload };
    case 'SET_CURRENT_ITEM':
      return { ...state, currentItem: action.payload };
    case 'MOVE_ITEM':
      const { currentBoard, currentItem, targetBoard, targetItem } = action.payload;
      const newBoards = state.boards.map((board) => {
        if (board.id === currentBoard.id) {
          const newItems = board.items.filter((item) => item.id !== currentItem.id);
          return { ...board, items: newItems };
        }
        if (board.id === targetBoard.id) {
          const dropIndex = board.items.findIndex((item) => item.id === targetItem.id);
          const newItems = [...board.items.slice(0, dropIndex + 1), currentItem, ...board.items.slice(dropIndex + 1)];
          return { ...board, items: newItems };
        }
        return board;
      });
      return { ...state, boards: newBoards };
    case 'ADD_ITEM':
      const { boardId, newItem } = action.payload;
      const updatedBoards = state.boards.map((board) => {
        if (board.id === boardId) {
          const newItems = [...board.items, newItem];
          return { ...board, items: newItems };
        }
        return board;
      });
      return { ...state, boards: updatedBoards };
    default:
      return state;
  }
};


const store = createStore(reducer);

export default store;
