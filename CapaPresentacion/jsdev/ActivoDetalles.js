
//var table;
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
                listaDetalleActivos();
                //cargarTabledos();
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

function listaDetalleActivos() {
    $("#listarqr").empty();

    detalleActLiss.forEach(function (activodetalle, index) {
        const isChecked = activodetalle.Activo ? 'checked' : '';
        const switchId = `flipswitch-${index}`;

        const cardHtml = `
            <div class="col mb-3">
                <div class="cardze h-100">
                    <div class="text-center" style="padding-top: 10px;">
                        <div class="imageze">
                            <img class="imgre" src="${activodetalle.ImageQr}" alt="Foto usuario">
                        </div>
                    </div>
                    <div class="card-body" style="padding: 0.2rem 1.25rem;">
                        <div class="text-start" style="font-size:14px">
                            <p class="m-1"><b>Activo: </b>${activodetalle.NombreArticulo}</p>
                            <p class="m-1"><b>Nro Serie: </b>${activodetalle.NroSerie}</p>
                            <p class="m-1"><b>Detalle: </b>${activodetalle.DetalleInfo}</p>
                        </div>
                    </div>
                    <div class="card-footer">
                        <div class="row">
                            <div class="col-sm-8">
                                <p class="m-0" style="font-size: 12px"><b>Cambiar: </b>Estado</p>
                                <div class="flipswitch">
                                    <input type="checkbox" id="${switchId}" class="flipswitch-cb" data-index="${index}" ${isChecked}>
                                    <label for="${switchId}" class="flipswitch-label">
                                        <div class="flipswitch-inner"></div>
                                        <div class="flipswitch-switch"></div>
                                    </label>
                                </div>
                            </div>
                            <div class="col-sm-4 text-center">
                                <a href="#" class="btn btn-sm btn-secondary btn-editar"
                                data-activodetalle='${encodeURIComponent(JSON.stringify(activodetalle))}'>
                                <i class="fas fa-pencil-alt"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;

        $("#listarqr").append(cardHtml);
    });
}

$("#listarqr").on("change", ".flipswitch-cb", function () {
    const estatus = $(this).prop("checked") ? 1 : 0;
    const textoProgreso = estatus ? "Activar" : "Desactivar";
    const index = $(this).data("index");
    const model = detalleActLiss[index];
    console.log(model);

    const estadoOriginal = model.Activo;

    swal({
        title: "Mensaje de Confirmación",
        text: `¿Está seguro de ${textoProgreso} el Detalle Activo?`,
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: "Sí, Aceptar",
        cancelButtonText: "No, Cancelar",
        closeOnConfirm: false,
        closeOnCancel: true
    },
        function (respuesta) {
        if (respuesta) {
            $(".showSweetAlert").LoadingOverlay("show");
            var request = {
                IdDetalleActivo: model.IdDetalleActivo,
                Estado: (estatus == 1 ? true : false)
            };
            $.ajax({
                type: "POST",
                url: "ActivoDetalles.aspx/CambiaEstadoDetalleActivo",
                data: JSON.stringify(request),
                contentType: 'application/json; charset=utf-8',
                dataType: "json",
                error: function (xhr, ajaxOptions, thrownError) {
                    $(".showSweetAlert").LoadingOverlay("hide");
                    console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
                },
                success: function (response) {
                    $(".showSweetAlert").LoadingOverlay("hide");
                    if (response.d.Estado) {
                        CargarDatosActivo();
                        swal("Mensaje", response.d.Mensaje, "success");
                    } else {
                        swal("Mensaje", response.d.Mensaje, "error");
                    }

                }
            });
        } else {
            // Si el usuario cancela, revertir el estado del checkbox
            $(`#flipswitch-${index}`).prop('checked', estadoOriginal);
        }

    });
});

$(document).on("click", ".btn-editar", function (e) {
    e.preventDefault();

    var activodetalleStr = decodeURIComponent($(this).attr("data-activodetalle"));
    //var activodetalleStr = $(this).attr("data-activodetalle");
    var detalle = JSON.parse(activodetalleStr);

    if (!detalle || !detalle.IdDetalleActivo) {
        console.warn("Objeto detalle inválido", detalle);
        return;
    }
    console.log(detalle);
    //resto de mi logica
});

function registerDataQrDetalle() {
    // Crear la estructura del request y asignar detalleActLiss a RequestList
    var request = {
        RequestList: detalleActLiss  // Asignamos directamente la lista aquí
    };

    $.ajax({
        type: "POST",
        url: "ActivoDetalles.aspx/GenerarQr",
        data: JSON.stringify(request),
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        beforeSend: function () {
            $("#cargaloa").LoadingOverlay("show");
        },
        success: function (response) {
            $("#cargaloa").LoadingOverlay("hide");
            //console.log(response.d);
            if (response.d.Estado) {
                CargarDatosActivo();
                swal("Mensaje", response.d.Mensaje, "success");
            } else {
                swal("Mensaje", response.d.Mensaje, "warning");
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            $("#cargaloa").LoadingOverlay("hide");
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        }
    });
}

$('#btnGenerarQrs').on('click', function () {
    if (detalleActLiss.length < 1) {
        swal("Mensaje", "No existe una lista de activos", "warning");
        return;
    }

    // Validación: Si existe algún valor en "RutaQR", deshabilitar el botón
    const hasRutaQR = detalleActLiss.some(item => item.RutaQR && item.RutaQR.trim() !== "");

    if (hasRutaQR) {
        swal("Mensaje", "La lista de Detalle Activo ya cuenta con QR", "warning");
        return;
    }

    registerDataQrDetalle();
});

$('#btnVerDeta').on('click', function () {

    CargarDatosActivo();
})