import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [boards, setBoards] = useState([
    {id: 1, title: 'Столы', items: [{id: 1,  title: 'Стол на 6 человек'}, {id: 2, title: 'Стол на 4 человек'}, {id: 3, title: 'Стол на 2 человек'}]},
    {id: 2, title: 'Доска', items: []},
  ])
  const [currentBoard, setCurrentBoard] = useState(null)
  const [currentItem, setCurrentItem] = useState(null)
  

  const dragOverHadler = (e) => {
    e.preventDefault()
    if(e.target.className == 'item'){
      e.target.style.boxShadow = '0 2px 3px gray'
    }
  }

  const dragLeaveHandler =(e) => {
    e.target.style.boxShadow = 'none'
  }

  const dragEndHandler =(e) => {
    e.target.style.boxShadow = 'none'
  }
  const dragStartHandler =(e, board, item) => {
    setCurrentBoard(board)
    setCurrentItem(item)
  }

  const dropHandler =(e, board, item) => {
    e.preventDefault()
    const currentIndex = currentBoard.items.indexOf(currentItem)
    currentBoard.items.splice(currentIndex, 1) 
    const dropIndex = board.items.indexOf(item)
    board.items.splice(dropIndex + 1, 0, currentItem)
    setBoards(boards.map(b => {
        if (b.id === board.id) {
        return board
        }
        if (b.id === currentBoard.id) {
        return currentBoard
        }
        return b
    }))
    e.target.style.boxShadow = 'none'
  }

  const dropCardHandler = (e, board) => {
    board.items.push(currentItem)
    const currentIndex = currentBoard.items.indexOf(currentItem)
    currentBoard.items.splice(currentIndex, 1) 
    setBoards(boards.map(b => {
      if (b.id === board.id) {
      return board
      }
      if (b.id === currentBoard.id) {
      return currentBoard
      }
      return b
  }))
  e.target.style.boxShadow = 'none'
  }
  return (
    <div className="app">
      {boards.map(board => 
        <div 
        className='board'
        onDragOver={(e) => dragOverHadler(e)}
        onDrop={(e) => dropCardHandler(e, board)}
        >
          <div className='board_title'>{board.title}</div>
          {board.items.map(item => 
            <div 
              onDragOver={(e) => dragOverHadler(e)}
              onDragLeave={e => dragLeaveHandler(e)}
              onDragStart={(e) => dragStartHandler(e, board, item)}
              onDragEnd={(e) => dragEndHandler(e)}
              onDrop={(e) => dropHandler(e, board, item)}
              draggable={true}
              className='item'
            >{item?.title}
            </div>
      )}
      </div>
      )}
    </div>
  );
}

export default App;



// import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';

// const App = () => {
//   const boards = useSelector((state) => state.boards);
//   const currentBoard = useSelector((state) => state.currentBoard);
//   const currentItem = useSelector((state) => state.currentItem);
//   const dispatch = useDispatch();

//   const dragOverHandler = (e) => {
//     e.preventDefault();
//     if (e.target.className === 'item') {
//       e.target.style.boxShadow = '0 2px 3px gray';
//     }
//   };

//   const dragLeaveHandler = (e) => {
//     e.target.style.boxShadow = 'none';
//   };

//   const dragEndHandler = (e) => {
//     e.target.style.boxShadow = 'none';
//   };

//   const dragStartHandler = (e, board, item) => {
//     dispatch({ type: 'SET_CURRENT_BOARD', payload: board });
//     dispatch({ type: 'SET_CURRENT_ITEM', payload: item });
//   };

//   const dropHandler = (e, board, item) => {
//     e.preventDefault();
//     dispatch({ type: 'MOVE_ITEM', payload: { currentBoard, currentItem, targetBoard: board, targetItem: item } });
//     e.target.style.boxShadow = 'none';
//   };

//   const dropCardHandler = (e, board) => {
//     dispatch({ type: 'ADD_ITEM', payload: { boardId: board.id, newItem: currentItem } });
//     e.target.style.boxShadow = 'none';
//   };

//   return (
//     <div className="app">
//       {boards.map((board) => (
//         <div
//           key={board.id}
//           className="board"
//           onDragOver={(e) => dragOverHandler(e)}
//           onDrop={(e) => dropCardHandler(e, board)}
//         >
//           <div className="board_title">{board.title}</div>
//           {board.items.map((item) => (
//             <div
//               key={item.id}
//               onDragOver={(e) => dragOverHandler(e)}
//               onDragLeave={(e) => dragLeaveHandler(e)}
//               onDragStart={(e) => dragStartHandler(e, board, item)}
//               onDragEnd={(e) => dragEndHandler(e)}
//               onDrop={(e) => dropHandler(e, board, item)}
//               draggable
//               className="item"
//             >
//               {item.title}
//             </div>
//           ))}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default App;
