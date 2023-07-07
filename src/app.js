function App() {
  const [activity, setActivity] = React.useState('');
  const [edit, setEdit] = React.useState({});
  const [todos, setTodos] = React.useState([]);
  const [message, setMessage] = React.useState('');
  
  function generateId() {
    return Date.now()
  }

  function saveTodoHandler(event) {
    event.preventDefault();

    if (!activity) {
      return setMessage('Isi dulu nama aktifitasnya!')
    }

    setMessage('');

    if (edit.id) {
      const updatedTodo = {
        ...edit,
        activity,
      };

      const editTodoIndex = todos.findIndex((todo) => {
        return todo.id == edit.id;
      });

      const updatedTodos = [...todos];
      updatedTodos[editTodoIndex] = updatedTodo;
      
      setTodos(updatedTodos);

      return cancelEditHandler();
    }

  setTodos([...todos,
    {
      id: generateId(),
      activity,
      done: false,
    },
  ]);
  setActivity('');
  }

  function removeTodoHandler(todoId) {
    const filteredTodos = todos.filter((todo) => {
      return todo.id != todoId;
    });

    setTodos(filteredTodos);
    if (edit.id) cancelEditHandler();
  }

  function editTodoHandler(todo) {
    setActivity(todo.activity);
    setEdit(todo);
  }
  function cancelEditHandler() {
    setEdit({});
    setActivity('');
  }
  function doneTodoHandler(todo) {
    const updatedTodo = {
      ...todo,
      done: todo.done ? false : true,
    };

    const editTodoIndex = todos.findIndex((currentTodo) => {
      return currentTodo.id == todo.id;
    });

    const updatedTodos = [...todos];
    updatedTodos[editTodoIndex] = updatedTodo;

    setTodos(updatedTodos);
  }

  return (
    <>
  <h1 className="m-5 text-4xl font-bold text-white ">Todos.</h1>
  <form className="flex mb-2 justify-center w-full" onSubmit={saveTodoHandler}>
    {/* Form input dan tombol submit */}
    <div className="flex flex-col items-center">
      <div className="relative">
        <input
          className="px-3 py-2 shadow rounded-l-md text-sm placeholder-text-slate-400 focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-sky-500"
          type="text"
          placeholder="Nama aktifitas"
          value={activity}
          onChange={(event) => {
            setActivity(event.target.value);
          }}
        />
        <button
          className="px-3 py-2 text-sm bg-blue-500 text-slate-100 shadow font-semibold rounded-r-md hover:bg-blue-600 hover:text-white"
          type="submit"
        >
          {edit.id ? 'Simpan' : 'Tambah'}
        </button>
        {edit.id && (
          <button
            className="px-3 py-2 text-sm bg-gray-500 ml-2 text-slate-100 shadow font-semibold rounded-md hover:bg-gray-600 hover:text-white"
            onClick={cancelEditHandler}
          >
            Batal
          </button>
        )}
      </div>
      {message && (
        <span className="text-red-600 text-sm mt-3 font-semibold">{message}</span>
      )}
    </div>
  </form>
  {todos.length > 0 ? (
    <ul className="bg-slate-100 h-1/3 w-[320px] rounded-md shadow block mt-4 mx-auto divide-y divide-gray-300">
      {todos.map((todo) => {
        return (
          <li key={todo.id} className="p-4 flex justify-between items-center"> {/* Tambahkan items-center */}
            <div className="flex items-center"> {/* Tambahkan items-center */}
              <input
                type="checkbox"
                checked={todo.done}
                onChange={doneTodoHandler.bind(this, todo)}
                className="mr-2 h-4 w-4 text-sky-500 rounded focus:ring-1 focus:ring-sky-500 focus:outline-none"
              />
              <span className={`flex-grow ${todo.done ? 'line-through opacity-80' : ''}`}>
                {todo.activity}
              </span>
            </div>
            <div>
              <button
                className="px-2 py-1 text-sm bg-green-600 text-slate-100 shadow font-semibold rounded ml-2 hover:bg-green-700 hover:text-white"
                onClick={editTodoHandler.bind(this, todo)}
              >
                Edit
              </button>
              <button
                className="px-2 py-1 text-sm bg-red-600 text-slate-100 shadow font-semibold rounded ml-2 hover:bg-red-700 hover:text-white"
                onClick={removeTodoHandler.bind(this, todo.id)}
              >
                Hapus
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  ) : (
    <p className="text-center mt-4">
      <i className="text-slate-700 text-sm opacity-80">Tidak ada Todo untuk saat ini</i>
    </p>
  )}
</>
  );
}

ReactDOM.render(<App />, root);