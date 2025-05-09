
var table;
var tabledos;
let opcion = false;
let detalleActLiss = [];

function CargarDatosActivo() {

    var request = {
        IdActivo: 1
    };

    $.ajax({
        type: "POST",
        url: "ActivoDetalles.aspx/DetalleActivoFullNuevo",
        data: JSON.stringify(request),
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        beforeSend: function () {
            $("#loadda").LoadingOverlay("show");
        },
        success: function (response) {
            $("#loadda").LoadingOverlay("hide");
            if (response.d.Estado) {
                var activo = response.d.Data;
                detalleActLiss = activo.ListaDetalleActivos;
                cargarTable();
                cargarTabledos();
                //console.log(activo); 

                var canti = activo.CantidadTotal;
                var unidad = canti > 1 ? "Uds" : "Ud";
                $("#lblCodigo").text("Codigo Activo: " + activo.Codigo);
                $("#lblCantida").text("Cantidad total: " + canti + " " + unidad);
                $("#lblUnidad").text("UE: " + activo.RefUnidaEducativa.Nombre);
                $("#lblRespo").text("Resp: " + activo.RefUnidaEducativa.Responsable);
                $("#txtComentario").val(activo.Comentario);

            } else {
                swal("Mensaje", response.d.Mensaje, "warning");
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            $("#loadda").LoadingOverlay("hide");
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        }
    });
}

function cargarTabledos() {

    if ($.fn.DataTable.isDataTable("#tbDeActivosdo")) {
        $("#tbDeActivosdo").DataTable().destroy();
        $('#tbDeActivosdo tbody').empty();
    }

    // Inicializar DataTable con los datos de detalleActLista
    tabledos = $("#tbDeActivosdo").DataTable({
        responsive: true,
        data: detalleActLiss, // Usar la lista de detalles local
        columns: [
            { data: "IdDetalleActivo", visible: false, searchable: false },
            {
                data: "ImageQr",
                className: "align-middlea",
                render: function (data) {
                    return `<img style="height:40px" src=${data} class="rounded mx-auto d-block"/>`;
                },
                orderable: false,
                searchable: false,
                width: "50px"
            },
            { data: "NombreArticulo", className: "align-middlea" },
            { data: "Marca", className: "align-middlea" },
            { data: "NroSerie", className: "align-middlea" },
            { data: "DetalleInfo", className: "align-middlea" },
            {
                data: "Activo",
                className: "align-middlea",
                render: function (data, type, row, meta) {
                    const id = `flipswitch-${meta.row}`; // Para que cada ID sea único
                    return `
                        <div class="flipswitch">
                            <input type="checkbox" id="${id}" class="flipswitch-cb" name="flipswitch"
                                ${data ? 'checked' : ''}>
                            <label for="${id}" class="flipswitch-label">
                                <div class="flipswitch-inner"></div>
                                <div class="flipswitch-switch"></div>
                            </label>
                        </div>
                    `;
                }
            }
        ],
        order: [[0, "desc"]],
        dom: "rt",
        language: {
            url: "https://cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json"
        }
    });
}

$("#tbDeActivosdo tbody").on("change", ".flipswitch-cb", function () {
    // Obtener el estado del checkbox (1 si está checked, 0 si no lo está)
    var estatus = $(this).prop('checked') ? 1 : 0;
    var textoProgreso = estatus ? "Activar" : "Desactivar";

    let filaSeleccionada;
    var checkbox = $(this);

    // Verificar si la fila seleccionada es una fila 'child' de una fila expandida
    if ($(this).closest("tr").hasClass("child")) {
        filaSeleccionada = $(this).closest("tr").prev();
    } else {
        filaSeleccionada = $(this).closest("tr");
    }

    const model = tabledos.row(filaSeleccionada).data();

    swal("Mensaje", "Texto: " + textoProgreso + "\nMarca: " + model.Marca, "success");
});

function cargarTable() {

    if ($.fn.DataTable.isDataTable("#tbDeActivos")) {
        $("#tbDeActivos").DataTable().destroy();
        $('#tbDeActivos tbody').empty();
    }

    // Inicializar DataTable con los datos de detalleActLista
    table = $("#tbDeActivos").DataTable({
        responsive: true,
        data: detalleActLiss, // Usar la lista de detalles local
        columns: [
            { data: "IdDetalleActivo", visible: false, searchable: false },
            {
                data: "ImageQr",
                className: "align-middlea",
                render: function (data) {
                    return `<img style="height:40px" src=${data} class="rounded mx-auto d-block"/>`;
                },
                orderable: false,
                searchable: false,
                width: "50px"
            },
            { data: "NombreArticulo", className: "align-middlea" },
            { data: "Marca", className: "align-middlea" },
            { data: "NroSerie", className: "align-middlea" },
            { data: "DetalleInfo", className: "align-middlea" },
            {
                data: "Activo",
                className: "align-middlea",
                render: function (data) {
                    return '<label class="switches">' +
                        '<input type="checkbox" class="switchera" ' + (data ? 'checked' : '') + ' data-onstyle="success" data-offstyle="danger" data-toggle="toggle" data-on="Activo" data-off="No Activo">' +
                        '<span class="slidera round"></span>' +
                        '</label>';
                }
            }
        ],
        order: [[0, "desc"]],
        dom: "rt",
        language: {
            url: "https://cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json"
        }
    });
}

// Evento change para los checkbox con clase .switcher
$("#tbDeActivos tbody").on("change", ".switchera", function () {
    // Obtener el estado del checkbox (1 si está checked, 0 si no lo está)
    var estatus = $(this).prop('checked') == true ? 1 : 0;
    var textoProgreso = estatus ? "Activar" : "Desactivar";
    let filaSeleccionada;

    var checkbox = $(this);



    // Verificar si la fila seleccionada es una fila 'child' de una fila expandida
    if ($(this).closest("tr").hasClass("child")) {
        filaSeleccionada = $(this).closest("tr").prev();
    } else {
        filaSeleccionada = $(this).closest("tr");
    }

    const model = table.row(filaSeleccionada).data();

    swal("Mensaje", "Texto: " + textoProgreso + "\nMarca: " + model.Marca, "success");

});

$('#btnVerDeta').on('click', function () {

    CargarDatosActivo();
})