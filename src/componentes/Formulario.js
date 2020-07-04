import React, { Fragment , useState} from 'react';
import uuid from 'uuid/v4';
import PropTypes from 'prop-types';



const Formulario = ({crearCita}) => {

    // Creando los estados
    const [cita, setCita] = useState({
        mascota:'',
        propietario:'',
        fecha: '',
        hora: '',
        sintomas:''
    });

    const [error, setError] = useState(false);


    //Creando la funcion change
    const handleChange = (e) => {
        setCita({
            ...cita,
            [e.target.name]:e.target.value
        })
    }

    // Extraer lo valores de los campos
    const { mascota, propietario, fecha, hora, sintomas} = cita

    const submitCita = e => {
        e.preventDefault();
       
        //VALIDAR CITA
        if(mascota.trim() === '' || propietario.trim() === '' || fecha.trim() === '' || hora.trim() === '' || sintomas.trim() === ''){
            

            setTimeout(() => {
                setError(true);

                setTimeout(() => {
                    setError(false);
                },3000)
            },50)
            return;
        }

        //ASIGNAR UN ID
        cita.id = uuid();

        // CREAR LA CITA
        crearCita(cita);

        // REINICIAR EL FORM
        setCita({
            mascota:'',
            propietario:'',
            fecha: '',
            hora: '',
            sintomas:''
        })
    }

    return ( 
        <Fragment>
            <h2>Crear Cita</h2>

            { error ? <p className="alerta-error">Todos los campos son obligatorios</p> : null }
            
            <form
              onSubmit ={submitCita}
            >
                <label>Nombre Mascota: </label>
                <input
                    type="text"
                    name="mascota"
                    className="u-full-width"
                    placeholder="Nombre Mascota"
                    onChange={handleChange}
                    value={mascota}
                />

                <label>Nombre Dueño: </label>
                <input
                    type="text"
                    name="propietario"
                    className="u-full-width"
                    placeholder="Nombre Dueño"
                    onChange={handleChange}
                    value={propietario}
                />

                <label>Fecha: </label>
                <input
                    type="date"
                    name="fecha"
                    className="u-full-width"
                    onChange={handleChange}
                    value={fecha}
                />

                <label>Fecha: </label>
                <input
                    type="time"
                    name="hora"
                    className="u-full-width"
                    onChange={handleChange}
                    value={hora}
                />

                <label>Sistomas: </label>
                <textarea 
                    className="u-full-width"
                    name="sintomas"
                    onChange={handleChange}
                    value={sintomas}
                >
                </textarea>

                <button
                    type="submit"
                    className="u-full-width button-primary"
                >
                    Agregar Cita
                </button>

            </form>
        </Fragment>
     );
}

Formulario.propTypes = {
    crearCita: PropTypes.func.isRequired
}
 
export default Formulario;