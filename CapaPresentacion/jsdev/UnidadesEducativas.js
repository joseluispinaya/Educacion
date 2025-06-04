
const MODELO_BASE = {
    IdUnidadEdu: 0,
    Nombre: "",
    Responsable: "",
    Celular: "",
    Direccion: "",
    IdArea: 0,
    Activo: true
}

$(document).ready(function () {
    cargarAreas();
    listaUnidadesEduc();
})

function cargarAreas() {
    $("#cboArea").html("");

    $.ajax({
        type: "POST",
        url: "UnidadesEducativas.aspx/ListaAreas",
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
                        $("<option>").attr({ "value": row.IdArea }).text(row.Descripcion).appendTo("#cboArea");
                    }

                })
            } else {
                swal("Mensaje", response.d.Mensaje, "warning");
            }

        }
    });
}

function listaUnidadesEduc() {
    $.ajax({
        type: "POST",
        url: "UnidadesEducativas.aspx/ObtenerUnidadesEdu",
        data: {},
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        beforeSend: function () {
            $("#loaddet").LoadingOverlay("show");
        },
        success: function (response) {
            $("#loaddet").LoadingOverlay("hide");

            if (response.d.Estado) {
                var datos = response.d.Data;

                // Limpiamos el contenedor por si hay datos previos
                $("#listarUni").empty();

                // Recorremos la lista y generamos el HTML
                datos.forEach(function (unidaded) {
                    var cardHtml = `
                        <div class="col mb-3">
                            <div class="cardze h-100">
                                <div class="text-center" style="padding-top: 10px;">
                                    <i class="fas fa-school" style="font-size: 50px"></i>
                                </div>
                                <div class="card-body" style="padding: 0.2rem 1.25rem;">
                                    <div class="text-start" style="font-size:14px">
                                        <p class="m-1"><b>U.E.: </b>${unidaded.Nombre}</p>
                                        <p class="m-1"><b>Resp: </b>${unidaded.Responsable}</p>
                                        <p class="m-1"><b>Contacto: </b>${unidaded.Celular}</p>
                                    </div>
                                </div>
                                <div class="card-footer text-center" style="padding: 0.8rem 1.25rem;">
                                    <a href="#" class="btn btn-sm btn-primary btn-editar mr-3" 
                                    data-unidaded='${encodeURIComponent(JSON.stringify(unidaded))}'>
                                    <i class="fas fa-pencil-alt"></i> Editar
                                    </a>
                                    <a href="#" class="btn btn-sm btn-success" 
                                    onclick="event.preventDefault(); verDetallea(${unidaded.IdUnidadEdu})">
                                    <i class="fas fa-eye"></i> Detalle
                                    </a>
                                </div>
                            </div>
                        </div>`;


                    // Agregamos al contenedor
                    $("#listarUni").append(cardHtml);
                });

            } else {
                swal("Mensaje", response.d.Mensaje, "warning");
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            $("#loaddet").LoadingOverlay("hide");
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        }
    });
}

function mostrarModal(modelo, cboEstadoDeshabilitado = true) {
    // Verificar si modelo es null
    modelo = modelo ?? MODELO_BASE;

    $("#txtIdUnidad").val(modelo.IdUnidadEdu);
    $("#txtNombre").val(modelo.Nombre);
    $("#txtResponsable").val(modelo.Responsable);
    $("#txtCelular").val(modelo.Celular);
    $("#txtUbicacion").val(modelo.Direccion);
    $("#cboArea").val(modelo.IdArea == 0 ? $("#cboArea option:first").val() : modelo.IdArea);
    $("#cboEstado").val(modelo.Activo == true ? 1 : 0);

    $("#cboEstado").prop("disabled", cboEstadoDeshabilitado);

    if (cboEstadoDeshabilitado) {
        $("#myTitulope").text("Nuevo Registro");
    } else {
        $("#myTitulope").text("Editar Unidad educativa");
    }

    $("#modalDataUni").modal("show");
}

$(document).on("click", ".btn-editar", function (e) {
    e.preventDefault();

    var unidaddetalleStr = decodeURIComponent($(this).attr("data-unidaded"));
    var detalle = JSON.parse(unidaddetalleStr);

    if (!detalle || !detalle.IdUnidadEdu) {
        console.warn("Objeto detalle inválido", detalle);
        swal("Mensaje", "Ocurrio un problema intente mas tarde", "warning")
        return;
    }
    mostrarModal(detalle, false);

});

function verDetallea(IdUnidadEdu) {
    //var url = 'ActivoDetalles.aspx?id=' + IdInmobiliaria;
    swal("Mensaje", "El Id es: " + IdUnidadEdu, "success")
    //window.location.href = url;
}

$('#btnAddNuevoUn').on('click', function () {
    mostrarModal(null, true);
    //$("#modalData").modal("show");
})

function registrarUnidadEd() {

    const modelo = structuredClone(MODELO_BASE);
    modelo["IdUnidadEdu"] = parseInt($("#txtIdUnidad").val());
    modelo["Nombre"] = $("#txtNombre").val().trim();
    modelo["Responsable"] = $("#txtResponsable").val().trim();
    modelo["Celular"] = $("#txtCelular").val().trim();
    modelo["Direccion"] = $("#txtUbicacion").val().trim();
    modelo["IdArea"] = $("#cboArea").val();
    modelo["Activo"] = ($("#cboEstado").val() == "1" ? true : false);

    var request = {
        oUnidad: modelo
    };

    $.ajax({
        type: "POST",
        url: "UnidadesEducativas.aspx/Guardar",
        data: JSON.stringify(request),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {
            $(".modal-content").LoadingOverlay("show");
        },
        success: function (response) {
            $(".modal-content").LoadingOverlay("hide");
            if (response.d.Estado) {
                listaUnidadesEduc();
                $('#modalDataUni').modal('hide');
                swal("Mensaje", response.d.Mensaje, "success");
            } else {
                swal("Mensaje", response.d.Mensaje, "warning");
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            $(".modal-content").LoadingOverlay("hide");
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        },
        complete: function () {
            // Rehabilitar el botón después de que la llamada AJAX se complete (éxito o error)
            $('#btnGuardarCambiosUn').prop('disabled', false);
        }
    });
}

function editarUnidadEd() {

    const modelo = structuredClone(MODELO_BASE);
    modelo["IdUnidadEdu"] = parseInt($("#txtIdUnidad").val());
    modelo["Nombre"] = $("#txtNombre").val().trim();
    modelo["Responsable"] = $("#txtResponsable").val().trim();
    modelo["Celular"] = $("#txtCelular").val().trim();
    modelo["Direccion"] = $("#txtUbicacion").val().trim();
    modelo["IdArea"] = $("#cboArea").val();
    modelo["Activo"] = ($("#cboEstado").val() == "1" ? true : false);

    var request = {
        oUnidad: modelo
    };

    $.ajax({
        type: "POST",
        url: "UnidadesEducativas.aspx/Editar",
        data: JSON.stringify(request),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {
            $(".modal-content").LoadingOverlay("show");
        },
        success: function (response) {
            $(".modal-content").LoadingOverlay("hide");
            if (response.d.Estado) {
                listaUnidadesEduc();
                $('#modalDataUni').modal('hide');
                swal("Mensaje", response.d.Mensaje, "success");
            } else {
                swal("Mensaje", response.d.Mensaje, "warning");
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            $(".modal-content").LoadingOverlay("hide");
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        },
        complete: function () {
            // Rehabilitar el botón después de que la llamada AJAX se complete (éxito o error)
            $('#btnGuardarCambiosUn').prop('disabled', false);
        }
    });
}

$('#btnGuardarCambiosUn').on('click', function () {

    // Deshabilitar el botón para evitar múltiples envíos
    $('#btnGuardarCambiosUn').prop('disabled', true);

    const inputs = $("input.input-validar").serializeArray();
    const inputs_sin_valor = inputs.filter((item) => item.value.trim() == "")

    if (inputs_sin_valor.length > 0) {
        const mensaje = `Debe completar el campo : "${inputs_sin_valor[0].name}"`;
        toastr.warning("", mensaje)
        $(`input[name="${inputs_sin_valor[0].name}"]`).focus()

        // Rehabilitar el botón si hay campos vacíos
        $('#btnGuardarCambiosUn').prop('disabled', false);
        return;
    }

    if (parseInt($("#txtIdUnidad").val()) === 0) {
        registrarUnidadEd();
    } else {
        editarUnidadEd();
    }
})