import React, {Fragment , useState, useEffect} from 'react';
import Formulario from './componentes/Formulario';
import ListaCitas from './componentes/ListaCitas'

function App() {

  //Citas LocalStorage
  let citasIniciales = localStorage.getItem('citas');
  if(!citasIniciales){
    citasIniciales = [];
  }

  // Arreglos de citas
  const [citas, setCitas] = useState(JSON.parse(citasIniciales));

  //funcion que tome las citas actuale y agregue la nueva
  const crearCita = cita => {
    setCitas([
      ...citas,
      cita
    ]);
  }

  // Useffect para realizar ciertas operaciones cuando el state cambia
 useEffect(() => {
  let citasIniciales = localStorage.getItem('citas');
   if(citasIniciales){
     localStorage.setItem('citas', JSON.stringify(citas))
   }else{
     localStorage.setItem('citas', JSON.stringify([]))
   }
 }, [citas])

  // funcion de eliminar una cita

  const eliminarCita = id => {
    const nuevasCitas = citas.filter(cita => cita.id !== id)
    setCitas(nuevasCitas)
  }

  // Mensaje Condicinal
  const titulo = citas.length === 0 ? "Agrega una Nueva Cita" : "Administra tus Citas";

  return (
   <Fragment>
     <h1>Administrador de Pacientes</h1>

    <div className="container">
      <div className="row">
        <div className="one-half column">
        <Formulario 
          crearCita = {crearCita}
         />
        </div>
        <div className="one-half column">
         <h2>{titulo}</h2>
          { citas.map(cita => (
            <ListaCitas 
            key={cita.id}
            cita={cita}
            eliminarCita = {eliminarCita}
             />
          ))}
        </div>
      </div>
    </div>
   </Fragment>
  );
}

export default App;
