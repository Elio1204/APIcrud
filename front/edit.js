document.addEventListener('DOMContentLoaded', ()=>{
    const formEdit = document.getElementById('formEdit')

    const urlParams   = new URLSearchParams(window.location.search)
    const idUrl       = urlParams.get('id')

    console.log(idUrl);


    const traeGasto = async (idUrl)=>{
        try{
            const URL = `http://localhost:3030/gastos/${idUrl}`
            const res = await fetch(URL)
            const muestra = await res.json()

            console.log(muestra);

            document.getElementById("descrip_actualizacion").value = muestra.descripcion
            document.getElementById("categoria").value = muestra.categoria
            document.getElementById("monto").value = muestra.monto
        }catch(error){
            console.log('Errpr al traer')
        }
    }
    
    if(traeGasto){
        traeGasto(idUrl)
    }


    formEdit.addEventListener('submit', async (e)=>{
        e.preventDefault()

        
    const gastoActulizado = {
        descripcion : document.getElementById('descrip_actualizacion').value,
        categoria : document.getElementById('categoria').value,
        monto : document.getElementById('monto').value,
    }

    try {
        const URL = `http://localhost:3030/gastos/${idUrl}`
        const res = await fetch(URL,{
            method: 'PUT',
            headers : {
                'Content-Type' : 'application/json'
            },
            body:JSON.stringify(gastoActulizado)
        })

        setTimeout(()=>{
            window.location.href = 'index.html'
        },2000)
    } catch (error) {
        
    }

    })
})
