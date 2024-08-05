// const { json } = require("sequelize")

document.addEventListener("DOMContentLoaded", ()=>{

    const body_tabla = document.getElementById('tabla_body')

    const fetchSpends = async ()=>{
        try {
            const URL = 'http://localhost:3030/gastos/'

            const res = await fetch(URL)
            if(!res.ok){
                throw new Error ('Error al traer los datos')
            }
            const datos = await res.json()
            console.log(datos);


            let resultado = 0

            datos.forEach(dato => {
                let tr = document.createElement('tr');
    
                let td_id = document.createElement('td');   
                td_id.textContent = dato.id_gasto;
                tr.appendChild(td_id);
            
                let td_descripcion = document.createElement('td');
                td_descripcion.textContent = dato.descripcion;
                tr.appendChild(td_descripcion);
            
                let td_categoria = document.createElement('td');
                td_categoria.textContent = dato.categoria;
                tr.appendChild(td_categoria);
            
                let td_monto = document.createElement('td');
                    td_monto.textContent = dato.monto.toFixed(2);
                tr.appendChild(td_monto);
            
                //acciones
                let td_button = document.createElement('td');
                let delete_button = document.createElement('button');
                    delete_button.className = 'btn btn-danger'; 
                delete_button.textContent = 'Eliminar';

                delete_button.addEventListener('click', () => {
                    elimina_gasto(dato.id_gasto)
                });
            
                let edit_button = document.createElement('button')
                edit_button.className = 'btn btn-primary'
                edit_button.textContent = 'Editar'
                edit_button.addEventListener('click', ()=>{
                    window.location.href = `./edit.html?id=${dato.id_gasto}` 
                })

                td_button.appendChild(delete_button);
                td_button.appendChild(edit_button);
            
                
                tr.appendChild(td_button);
            
                
                body_tabla.appendChild(tr);

                // suma de los montos
                resultado += dato.monto

            });

            // const caja = document.querySelector('.money-box');
            const monto = document.querySelector('.money-amount');

            monto.textContent = `$${resultado.toFixed(2)}`;        
            

        } catch (error) {
            console.error('Error al ahcer el fetch',error);
        }
    }

    const elimina_gasto = async (id)=>{
        try {
            const URL = `http://localhost:3030/gastos/${id}`

            const delElment = await fetch(URL, {
                method : 'DELETE',
                headers: {'Content-Type' : 'application/json'}
            })
            window.location.reload()
            if(!delElment.ok){
                throw new Error ('Error eliminando')
            }
            alert(`Gasto con id ${id} eliminado correctamentre`)
        } catch (error) {
            console.error('Error eliminando', error);
        }
    }

        // sumatoria de gastos

        const totalGastos = async()=>{
            try {
                const URL = `http://localhost:3030/gastos/`
                const res = await fetch(URL)
                const total = await res.json()
                console.log(total);
            } catch (error) {
                console.error(`Error al traer para la suma ${error}`);
            }
        }

    // FORM QUE ENVIA A LA BASE DE DATOS

    // const suma = async ()=>{
    //     try {
    //         const URL = 'http://localhost:3030/gastos/'
    //         const res = await fetch(URL)
    //         console.log(`Response de la sumatoria`,res);

    //         res.forEach((dato) => 
                
    //             console.log('hoal',dato));

    //     } catch (error) {
            
    //     }
    // }
        
    const form = document.getElementById("agrega_gasto_formulario")

    form.addEventListener("submit", async ()=>{
        try {
            const descripcion = document.getElementById("message-text").value
            const categoria   = document.getElementById("categoria_form").value
            const monto       = document.getElementById("recipient-name").value
        
            const data = {
                descripcion : descripcion,
                categoria   : categoria,
                monto       : monto
            }

            const URL = 'http://localhost:3030/gastos/'
            const res = await fetch(URL, {
                method : "POST",
                headers : {
                    "Content-Type" : "application/json"
                },
                body:JSON.stringify(data)
            })
        } catch (error) {
            console.log('Error enviando formulario', error);
        }
    })
    // suma()
    totalGastos()
    fetchSpends()
})