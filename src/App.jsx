import { useState, useRef, useEffect } from "react";
import { v4 as uuid } from "uuid";

function App() {
  const [popQuery, setPopQuery] = useState([]);

  function handleNewSuccess(data, success, animated) {
    const id = uuid();
    setPopQuery([
      ...popQuery,
      {
        title: data,
        msg: "This is a success msg",
        id,
        success,
        animated,
      },
    ]);
    setTimeout(() => {
      const itemId = id;
      setPopQuery((prevPopQuery) => {
        return prevPopQuery.map((item) => {
          if (item.id === itemId) {
            return { ...item, animated: true };
          }
          return item;
        });
      });
    }, 500);

    const deleteTo = setTimeout(() => {
      setPopQuery((prev) => prev.filter((item) => item.id !== id));
    }, 8000);
  }

  function Side() {
    return (
      <div className="overflow-hidden h-[90%] w-[300px] absolute top-1/2 right-0 transform -translate-y-1/2  flex flex-col">
        {popQuery.map((item, idx) => (
          <div key={item.id} className=" h-[20%] min-h-[20%]">
            {popQuery[idx] && (
              <Pop
                title={popQuery[idx].title}
                text={popQuery[idx].msg}
                success={popQuery[idx].success}
                arrayIdx={idx}
              />
            )}
          </div>
        ))}
      </div>
    );
  }

  function Pop({ title, text, success, arrayIdx }) {
    function checkAni() {
      if (popQuery[arrayIdx].animated == true) {
        return true;
      } else {
        return false;
      }
    }
    const direction = checkAni();

    const [ani, setAni] = useState(direction);

    useEffect(() => {
      if (popQuery[arrayIdx].animated == false) {
        setAni(true);
      }
    }, []);
    return (
      <div
        className={`p-3 h-full w-full transition-all duration-500   ${
          ani ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
        }`}
      >
        <div
          className={`${
            success === "success" ? "bg-green-300" : "bg-red-300"
          } w-full h-full rounded-3xl p-3 text-white shadow-lg`}
        >
          <h3 className="font-bold">{title}</h3>
          <p>{text}</p>
        </div>
      </div>
    );
  }

  function Content() {
    return (
      <>
        <h1 className="text-5xl">
          CAPA 1: <br></br> APLICACIÓN DE PRUEBA
        </h1>
        <div className="flex flex-col gap-5 mt-20">
          <button
            onClick={() =>
              handleNewSuccess("cambio contraseña", "success", false)
            }
            className="m-5 px-2 py-1 bg-blue-600 text-white w-[200px] rounded-lg"
          >
            Crear notificacion Success Cambio contraseña
          </button>
          <button
            onClick={() => handleNewSuccess("Usuario creado", "success", false)}
            className="m-5 px-2 py-1 bg-blue-600 text-white w-[200px] rounded-lg"
          >
            Crear notificacion Success Usuario creado
          </button>
          <button
            onClick={() =>
              handleNewSuccess("Instruccion añadida", "success", false)
            }
            className="m-5 px-2 py-1 bg-blue-600 text-white w-[200px] rounded-lg"
          >
            Crear notificacion Success Instruccion añadida
          </button>

          <button
            onClick={() => handleNewSuccess("Alert", "alert", false)}
            className="m-5 px-2 py-1 bg-red-600 text-white w-[200px] rounded-lg"
          >
            Crear notificacion Alert
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <div className=" h-screen w-screen relative">
        <Side />
        <Content />
      </div>
    </>
  );
}

export default App;
