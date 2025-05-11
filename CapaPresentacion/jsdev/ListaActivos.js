
$(document).ready(function () {
    listaActivos();
})

function listaActivos() {
    $.ajax({
        type: "POST",
        url: "ListaActivos.aspx/ObtenerListaActivos",
        data: {},
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        beforeSend: function () {
            $("#cloader").LoadingOverlay("show");
        },
        success: function (response) {
            $("#cloader").LoadingOverlay("hide");

            if (response.d.Estado) {
                var datos = response.d.Data;

                // Limpiamos el contenedor por si hay datos previos
                $("#listarAct").empty();

                // Recorremos la lista y generamos el HTML
                datos.forEach(function (uactivo) {
                    var cardHtml = `
                        <div class="col mb-3">
                            <div class="cardze h-100">
                                <div class="text-center" style="padding-top: 10px;">
                                    <i class="fas fa-laptop" style="font-size: 50px"></i>
                                </div>
                                <div class="card-body" style="padding: 0.2rem 1.25rem;">
                                    <div class="text-start" style="font-size:14px">
                                        <p class="m-1"><b>Codigo: </b>${uactivo.Codigo}</p>
                                        <p class="m-1"><b>UE: </b>${uactivo.RefUnidaEducativa.Nombre}</p>
                                        <p class="m-1"><b>Cantidad: </b>${uactivo.CantidadTotal}</p>
                                    </div>
                                </div>
                                <div class="card-footer text-center">
                                    <a href="#" class="btn btn-sm btn-primary btn-editar mr-3" 
                                    data-uactivo='${encodeURIComponent(JSON.stringify(uactivo))}'>
                                    <i class="fas fa-pencil-alt"></i>
                                    </a>
                                    <a href="#" class="btn btn-sm btn-success" 
                                    onclick="event.preventDefault(); verDetallea(${uactivo.IdActivo})">
                                    <i class="fas fa-eye"></i>
                                    </a>
                                </div>
                            </div>
                        </div>`;


                    // Agregamos al contenedor
                    $("#listarAct").append(cardHtml);
                });

            } else {
                swal("Mensaje", response.d.Mensaje, "warning");
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            $("#cloader").LoadingOverlay("hide");
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        }
    });
}

$(document).on("click", ".btn-editar", function (e) {
    e.preventDefault();

    var activodetalleStr = decodeURIComponent($(this).attr("data-uactivo"));
    var detalle = JSON.parse(activodetalleStr);

    if (!detalle || !detalle.IdActivo) {
        console.warn("Objeto detalle inválido", detalle);
        swal("Mensaje", "Ocurrio un problema intente mas tarde", "warning")
        return;
    }
    console.log(detalle);
});

function verDetallea(IdActivo) {
    var url = 'ActivoDetalles.aspx?id=' + IdActivo;
    //swal("Mensaje", "La ruta es: " + url, "success")
    window.location.href = url;
}