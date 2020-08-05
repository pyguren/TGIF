/ / //////////////////////////////////////////////////////////////////////////////////////////////////////
// ///////////Se crea funcion para tomar el Json desde internet sin descargarlo y asignarle la info a la 
// //////////variable data. Obtencion de response de function fetch/////////////////////////////////////


function datos_tr() {
    fetch("https://api.propublica.org/congress/v1/113/house/members.json", {
            headers: {
                "X-API-Key": "cXoTamEdUJPPtf8JIluMvmkN1YmidwlDfKWYRNVq"
            },
        })
        .then(function (response) {
            return response.json();
        })
        .then(function (json) {
            data = json;
            console.log(data);
            // dataNueva(data);
            console.log('CORRE BIEN');
            a.json = data.results[0].members;
            a.z = data.results[0].members;
        })
        .catch(function (error) {
            console.log('ERROR');
        });
};
datos_tr();

///////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////Creo funcion dataNueva la cual se encargara de ingresar json alojado en variable/////
/////////////////////////////data y mostrarlo en la tabla////////////////////////////////////////////

var a = new Vue({
    el: '#tablasVue2',
    data: {
        json: [],
        z: [],
    },
});


///////////////////////////////////////////////////////////////////


function filtrarEstado() {
    var estado = Array.from(document.querySelector('select[name=dropdown-estados]')).filter(opt => opt.selected).map(opt => opt.value)
    var filtradosPorEstado = [];
    for (var i = 0; i < miembros.length; i++) {
        if (estado.includes(miembros[i].state)) {
            filtradosPorEstado.push(miembros[i]);
        }
    }
    console.log(filtradosPorEstado);
    crearLista(filtradosPorEstado);
}

///////////////////////////////////////////////////////////////////

function crearLista(filtrados) {

    var aux = '';
    for (var i = 0; i < filtrados.length; i++) {

        if (filtrados[i].middle_name == null) {
            aux += '<tr>' +

                '<td class="nombre">' + '<a href= " ' + filtrados[i].url + '" target="_blank">' + filtrados[i].first_name + ' ' + filtrados[i].last_name + '</a>' + '</td>' +
                '<td class="partido">' + filtrados[i].party + '</td>' +
                '<td class="estado">' + filtrados[i].state + '</td>' +
                '<td class="antiguedad">' + filtrados[i].seniority + '</td>' +
                '<td class="votos con partido">' + filtrados[i].votes_with_party_pct + '%' + '</td>' +

                '</tr>';

        } else {

            aux += '<tr>' +

                '<td class="nombre">' + '<a href = "' + filtrados[i].url + ' " target= "_blank">' + filtrados[i].first_name + ' ' + filtrados[i].middle_name + ' ' + filtrados[i].last_name + '</a>' + '</td>' +
                '<td class="partido">' + filtrados[i].party + '</td>' +
                '<td class="estado">' + filtrados[i].state + '</td>' +
                '<td class="antiguedad">' + filtrados[i].seniority + '</td>' +
                '<td class="votos con partido">' + filtrados[i].votes_with_party_pct + '%' + '</td>' +

                '</tr>';
        }
    }

    console.log(aux)

}

///////////////////////////////////////////////////////////////////

function filtrar() {
    let miembros = a.z
    let partido = Array.from(document.querySelectorAll('input[type=checkbox]:checked')).map(elt => elt.value)
    let estado = document.getElementById("dropdown-State").value

    let filtrados = []
    for (let i = 0; i < miembros.length; i++) {
        if (partido.includes(miembros[i].party) && (estado == miembros[i].state || estado == "All")) {
            filtrados.push(miembros[i])
        }
    }
    a.json = filtrados;
    console.log(filtrados);

}