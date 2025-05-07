
var table;
let opcion = false;
let detalleActLiss = [];

function CargarDatosActivo() {

    $.ajax({
        type: "POST",
        url: "ActivoDetalles.aspx/DetalleActivoFull",
        data: {},
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

                //console.log(activo);

                var canti = activo.CantidadTotal;
                var unidad = canti > 1 ? "Uds" : "Ud";
                $("#lblCodigo").text("Codigo Activo: " + activo.Codigo);
                $("#lblCantida").text("Cantidad total: " +canti + " " + unidad);
                $("#txtComentario").val(activo.Comentario);

            } else {
                swal("oops!", "No se encontro el Activo", "warning")
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            $("#loadda").LoadingOverlay("hide");
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        }
    });
}

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