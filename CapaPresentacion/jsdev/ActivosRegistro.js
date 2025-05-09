
let tablaActivos;
let DetalleActili = [];

$(document).ready(function () {
    cargarTiposActivos();
    cargarUnidadesEducativas();
})

function cargarTiposActivos() {
    $("#cboTipoArti").html("");

    $.ajax({
        type: "POST",
        url: "ActivosRegistro.aspx/ListaTiposActi",
        data: {},
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        },
        success: function (response) {
            if (response.d.Estado) {
                $.each(response.d.Data, function (i, row) {
                    if (row.Activo === true) {
                        $("<option>").attr({ "value": row.IdTipoAct }).text(row.Nombre).appendTo("#cboTipoArti");
                    }

                })
            } else {
                swal("Mensaje", response.d.Mensaje, "warning");
            }

        }
    });
}

function cargarUnidadesEducativas() {
    $("#cboUnidadEduc").html("");

    $.ajax({
        type: "POST",
        url: "ActivosRegistro.aspx/ListaUnidadesEducativas",
        data: {},
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        },
        success: function (response) {
            if (response.d.Estado) {
                $.each(response.d.Data, function (i, row) {
                    if (row.Activo === true) {
                        $("<option>").attr({ "value": row.IdUnidadEdu }).text(row.Nombre).appendTo("#cboUnidadEduc");
                    }

                })
            } else {
                swal("Mensaje", response.d.Mensaje, "warning");
            }

        }
    });
}

function pruebaEncrip() {

    var request = {
        IdItem: $("#cboUnidadEduc").val(),
        Descripcion: $("#txtMarca").val()
    }

    $.ajax({
        type: "POST",
        url: "ActivosRegistro.aspx/Pruebas",
        data: JSON.stringify(request),
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        beforeSend: function () {
            $("#overlayc").LoadingOverlay("show");
        },
        success: function (response) {
            $("#overlayc").LoadingOverlay("hide");
            if (response.d.Estado) {

                $("#txtDetalleA").val(response.d.Valor);
                $("#txtComentario").val(response.d.Mensaje);

                swal("Mensaje", "Exito", "success");

            } else {
                swal("Mensaje", response.d.Mensaje, "warning");
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            $("#overlayc").LoadingOverlay("hide");
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        }
    });
}


$('#btnAgrgarA').on('click', function () {

    const inputs = $("input.input-validar").serializeArray();
    const inputs_sin_valor = inputs.filter((item) => item.value.trim() == "")

    if (inputs_sin_valor.length > 0) {
        const mensaje = `Debe completar el campo : "${inputs_sin_valor[0].name}"`;
        toastr.warning("", mensaje)
        $(`input[name="${inputs_sin_valor[0].name}"]`).focus()
        return;
    }


    if ($("#txtDetalleA").val().trim() === "") {
        toastr.warning("", "Debe completar el campo Detalle");
        $("#txtDetalleA").focus();
        return;
    }

    let tipoId = $("#cboTipoArti").val();
    let tipoNombre = $("#cboTipoArti option:selected").text();

    // Contar cuántos artículos del mismo tipo ya hay
    let contador = DetalleActili.filter(x => x.IdTipoAct === tipoId).length + 1;

    // Formatear el número con ceros a la izquierda (001, 002, etc.)
    let numeroFormateado = String(contador).padStart(3, '0');

    // Concatenar nombre con número
    let nombreConcatenado = `${tipoNombre} ${numeroFormateado}`;

    let activoFormado = {
        IdTipoAct: tipoId,
        NombreArticulo: nombreConcatenado,
        Marca: $("#txtMarca").val(),
        NroSerie: $("#txtSerie").val(),
        DetalleInfo: $("#txtDetalleA").val()
    };

    DetalleActili.push(activoFormado);

    $("#txtMarca").val("");
    $("#txtSerie").val("");
    $("#txtDetalleA").val("");
    //mostrar_enTabla();
    inicializarTablaActivos();

});

//cpu core i5 con disco duro de 500 gb y memoria ram de 8 gb sin monitor y maus
function inicializarTablaActivos() {
    if ($.fn.DataTable.isDataTable("#tbActivos")) {
        $("#tbActivos").DataTable().destroy();
        $("#tbActivos tbody").empty();
    }

    tablaActivos = $("#tbActivos").DataTable({
        responsive: true,
        data: DetalleActili,
        columns: [
            {
                defaultContent: '<button class="btn btn-danger btn-eliminar btn-sm"><i class="fas fa-trash-alt"></i></button>',
                orderable: false,
                searchable: false,
                width: "40px"
            },
            { data: "NombreArticulo" },
            { data: "Marca" },
            { data: "NroSerie" },
            { data: "DetalleInfo" }
        ],
        dom: "rt",
        language: {
            url: "https://cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json"
        }
    });

    $("#txtTotal").val(DetalleActili.length); // Actualiza total
}

$("#tbActivos tbody").on("click", ".btn-eliminar", function (e) {
    e.preventDefault();
    let filaSeleccionada;

    if ($(this).closest("tr").hasClass("child")) {
        filaSeleccionada = $(this).closest("tr").prev();
    } else {
        filaSeleccionada = $(this).closest("tr");
    }

    const data = tablaActivos.row(filaSeleccionada).data();

    // Buscar el índice del objeto en DetalleActili para eliminarlo
    const index = DetalleActili.findIndex(x =>
        x.IdTipoAct === data.IdTipoAct &&
        x.NombreArticulo === data.NombreArticulo &&
        x.Marca === data.Marca &&
        x.NroSerie === data.NroSerie &&
        x.DetalleInfo === data.DetalleInfo
    );

    if (index !== -1) {
        DetalleActili.splice(index, 1);
        inicializarTablaActivos(); // Vuelve a cargar la tabla con datos actualizados
    }
});

function mostrar_enTabla() {

    $("#tbActivos tbody").html("");

    DetalleActili.forEach((item, index) => {

        $("#tbActivos tbody").append(
            $("<tr>").append(
                $("<td>").append(
                    $("<button>")
                        .addClass("btn btn-danger btn-eliminar btn-sm")
                        .attr("data-index", index) // Agregar índice para identificar el elemento
                        .append(
                            $("<i>").addClass("fas fa-trash-alt")
                        )
                ),
                $("<td>").text(item.NombreArticulo),
                $("<td>").text(item.Marca),
                $("<td>").text(item.NroSerie),
                $("<td>").text(item.DetalleInfo)
            )
        );
    });

    $("#txtTotal").val(DetalleActili.length); // Actualiza total

}


//$("#tbActivos").on("click", ".btn-eliminar", function () {
//    const index = $(this).data("index");
//    console.log(index);

//    DetalleActili.splice(index, 1);

//    mostrar_enTabla();
//});

function registrarActivo() {
    // Crear la estructura del request y asignar detalleActLiss a RequestList
    var request = {
        eActivo: {
            IdUnidadEdu: $("#cboUnidadEduc").val(),
            Comentario: $("#txtComentario").val(),
            CantidadTotal: parseInt($("#txtTotal").val())
        },
        RequestList: DetalleActili  // Asignamos directamente la lista aquí parseInt($("#txtTotal").val())
    };

    $.ajax({
        type: "POST",
        url: "ActivosRegistro.aspx/GuardarActivo",
        data: JSON.stringify(request),
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        beforeSend: function () {
            $("#overlayc").LoadingOverlay("show");
        },
        success: function (response) {
            $("#overlayc").LoadingOverlay("hide");
            //console.log(response.d);
            if (response.d.Estado) {
                DetalleActili = [];
                inicializarTablaActivos();
                $("#txtComentario").val("");

                var idActivo = response.d.Valor;
                swal("Mensaje", response.d.Mensaje + "\nValor Id: " + idActivo, "success");

                //swal("Mensaje", response.d.Mensaje, "success");
            } else {
                swal("Mensaje", response.d.Mensaje, "warning");
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            $("#overlayc").LoadingOverlay("hide");
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        },
        complete: function () {
            // Rehabilitar el botón después de que la llamada AJAX se complete (éxito o error)
            $('#btnTerminarRegi').prop('disabled', false);
        }
    });
}

$('#btnTerminarRegi').on('click', function () {

    $('#btnTerminarRegi').prop('disabled', true);

    if (DetalleActili.length < 1) {
        swal("Mensaje", "Debe agregar como minimo un activo", "warning");
        $('#btnTerminarRegi').prop('disabled', false);
        return;
    }

    if ($("#txtComentario").val().trim() === "") {
        toastr.warning("", "Debe completar el campo Comentario");
        $("#txtComentario").focus();
        $('#btnTerminarRegi').prop('disabled', false);
        return;
    }

    registrarActivo();
});



$('#btnAgrgarAsss').on('click', function () {
    var textoSelect = $("#cboUnidadEduc option:selected").text();
    var valorSelect = $("#cboUnidadEduc").val();

    swal("Mensaje", "Texto: " + textoSelect + "\nValor: " + valorSelect, "success");
});