﻿
var table;

const MODELO_BASE = {
    IdUsuario: 0,
    IdRol: 0,
    Nombres: "",
    Apellidos: "",
    Correo: "",
    Clave: "",
    Celular: "",
    Activo: true,
    ImageFull: ""
}

$(document).ready(function () {
    cargarRoles();
    listaUsuarios();
})


function cargarRoles() {
    $("#cboRol").html("");

    $.ajax({
        type: "POST",
        url: "UsuariosSis.aspx/ObtenerRol",
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
                        $("<option>").attr({ "value": row.IdRol }).text(row.Descripcion).appendTo("#cboRol");
                    }

                })
            } else {
                swal("Mensaje", response.d.Mensaje, "warning");
            }

        }
    });
}

function listaUsuarios() {
    $.ajax({
        type: "POST",
        url: "UsuariosSis.aspx/ObtenerUsuarios",
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
                $("#listar").empty();

                // Recorremos la lista y generamos el HTML
                datos.forEach(function (usuario) {
                    var cardHtml = `
                        <div class="col mb-5">
                            <div class="card h-100">
                                <div class="card-body" style="padding: 0.7rem 1rem;">
                                    <div class="d-flex justify-content-center mb-3">
                                        <div class="imageze">
                                            <img class="imgre" src="${usuario.ImageFull}" alt="Foto usuario">
                                        </div>
                                    </div>
                                    <div class="text-start" style="font-size:14px">
                                        <p class="m-1"><b>Nombre: </b>${usuario.Nombres}</p>
                                        <p class="m-1"><b>Apellido: </b>${usuario.Apellidos}</p>
                                        <p class="m-1"><b>Correo: </b>${usuario.Correo}</p>
                                    </div>
                                </div>
                                <div class="card-footer bg-transparent">
                                    <div class="row justify-content-between">
                                        <a href="#" class="col-5 btn btn-sm btn-outline-primary mt-auto btn-editar" 
                                        data-usuario='${JSON.stringify(usuario)}'>
                                        <i class="fas fa-pencil-alt"></i>
                                        </a>
                                        <a href="#" class="col-5 btn btn-sm btn-outline-danger mt-auto" 
                                        onclick="eliminarUsua(${usuario.IdUsuario})">
                                        <i class="fas fa-trash-alt"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>`;


                    // Agregamos al contenedor
                    $("#listar").append(cardHtml);
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

function mostrarImagenSeleccionada(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#imgUsuarioMx').attr('src', e.target.result);
        }

        reader.readAsDataURL(input.files[0]);
    } else {
        $('#imgUsuarioMx').attr('src', "Imagenes/sinfoto.png");
    }
}

$('#txtFoto').change(function () {
    mostrarImagenSeleccionada(this);
});

function mostrarModal(modelo, cboEstadoDeshabilitado = true) {
    // Verificar si modelo es null
    modelo = modelo ?? MODELO_BASE;

    $("#txtIdUsuario").val(modelo.IdUsuario);
    $("#cboRol").val(modelo.IdRol == 0 ? $("#cboRol option:first").val() : modelo.IdRol);
    $("#txtNombre").val(modelo.Nombres);
    $("#txtapellido").val(modelo.Apellidos);
    $("#txtCorreo").val(modelo.Correo);
    $("#txtClave").val(modelo.Clave);
    $("#txtCelular").val(modelo.Celular);
    $("#cboEstado").val(modelo.Activo == true ? 1 : 0);
    $("#imgUsuarioMx").attr("src", modelo.ImageFull == "" ? "Imagenes/sinfoto.png" : modelo.ImageFull);

    $("#cboEstado").prop("disabled", cboEstadoDeshabilitado);
    //$("#txtClave").prop("disabled", !cboEstadoDeshabilitado);

    // Oculta o muestra el grupo entero
    $("#grupoClave").toggle(cboEstadoDeshabilitado);

    $("#txtFoto").val("");

    if (cboEstadoDeshabilitado) {
        $("#myTitulop").text("Nuevo Registro");
    } else {
        $("#myTitulop").text("Editar Usuario");
    }

    $("#modalData").modal("show");
}

$(document).on("click", ".btn-editar", function (e) {
    e.preventDefault();

    var usuarioStr = $(this).attr("data-usuario");
    var usuario = JSON.parse(usuarioStr);

    if (!usuario || !usuario.IdUsuario) {
        swal("Mensaje", "Objeto detalle inválido", "warning");
        return;
    }

    mostrarModal(usuario, false);
    //verEditar(usuario);
});

function eliminarUsua(IdUsuario) {
    swal("Mensaje", "Eliminar a ID: " + IdUsuario, "warning")
    //mi logica
}

$('#btnAddNuevo').on('click', function () {
    mostrarModal(null, true);
    //$("#modalData").modal("show");
})


function sendDataToServerUsr(request) {
    $.ajax({
        type: "POST",
        url: "UsuariosSis.aspx/GuardarUsua",
        data: JSON.stringify(request),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {
            $(".modal-content").LoadingOverlay("show");
        },
        success: function (response) {
            $(".modal-content").LoadingOverlay("hide");
            if (response.d.Estado) {
                listaUsuarios();
                $('#modalData').modal('hide');
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
            $('#btnGuardarCambios').prop('disabled', false);
        }
    });
}

function registerDataUser() {
    var fileInput = document.getElementById('txtFoto');
    var file = fileInput.files[0];

    const modelo = structuredClone(MODELO_BASE);
    modelo["IdUsuario"] = parseInt($("#txtIdUsuario").val());
    modelo["IdRol"] = $("#cboRol").val();
    modelo["Nombres"] = $("#txtNombre").val().trim();
    modelo["Apellidos"] = $("#txtapellido").val().trim();
    modelo["Correo"] = $("#txtCorreo").val().trim();
    modelo["Clave"] = $("#txtClave").val().trim();
    modelo["Celular"] = $("#txtCelular").val().trim();

    if (file) {

        var maxSize = 2 * 1024 * 1024; // 2 MB en bytes
        if (file.size > maxSize) {
            swal("Mensaje", "La imagen seleccionada es demasiado grande max 1.5 Mb.", "warning");
            // Rehabilitar el botón si hay un error de validación
            $('#btnGuardarCambios').prop('disabled', false);
            return;
        }

        var reader = new FileReader();

        reader.onload = function (e) {
            var arrayBuffer = e.target.result;
            var bytes = new Uint8Array(arrayBuffer);

            var request = {
                oUsuario: modelo,
                imageBytes: Array.from(bytes)
            };

            sendDataToServerUsr(request);
        };

        reader.readAsArrayBuffer(file);
    } else {
        // Si no se selecciona ningún archivo, envía un valor nulo o vacío para imageBytes
        var request = {
            oUsuario: modelo,
            imageBytes: null // o cualquier otro valor que indique que no se envió ningún archivo
        };

        sendDataToServerUsr(request);
    }
}

function sendDataToServerEditU(request) {
    $.ajax({
        type: "POST",
        url: "UsuariosSis.aspx/EditarUsuario",
        data: JSON.stringify(request),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {
            $(".modal-content").LoadingOverlay("show");
        },
        success: function (response) {
            $(".modal-content").LoadingOverlay("hide");
            if (response.d.Estado) {
                listaUsuarios();
                $('#modalData').modal('hide');
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
            $('#btnGuardarCambios').prop('disabled', false);
        }
    });
}

function editarDataAjaxU() {
    var fileInput = document.getElementById('txtFoto');
    var file = fileInput.files[0];

    const modelo = structuredClone(MODELO_BASE);
    modelo["IdUsuario"] = parseInt($("#txtIdUsuario").val());
    modelo["IdRol"] = $("#cboRol").val();
    modelo["Nombres"] = $("#txtNombre").val().trim();
    modelo["Apellidos"] = $("#txtapellido").val().trim();
    modelo["Correo"] = $("#txtCorreo").val().trim();
    modelo["Clave"] = $("#txtClave").val().trim();
    modelo["Celular"] = $("#txtCelular").val().trim();
    modelo["Activo"] = ($("#cboEstado").val() == "1" ? true : false);

    if (file) {

        var maxSize = 2 * 1024 * 1024; // 2 MB en bytes
        if (file.size > maxSize) {
            swal("Mensaje", "La imagen seleccionada es demasiado grande max 1.5 Mb.", "warning");
            // Rehabilitar el botón si hay un error de validación
            $('#btnGuardarCambios').prop('disabled', false);
            return;
        }

        var reader = new FileReader();

        reader.onload = function (e) {
            var arrayBuffer = e.target.result;
            var bytes = new Uint8Array(arrayBuffer);

            var request = {
                oUsuario: modelo,
                imageBytes: Array.from(bytes)
            };

            sendDataToServerEditU(request);
        };

        reader.readAsArrayBuffer(file);
    } else {
        // Si no se selecciona ningún archivo, envía un valor nulo o vacío para imageBytes
        var request = {
            oUsuario: modelo,
            imageBytes: null // o cualquier otro valor que indique que no se envió ningún archivo
        };

        sendDataToServerEditU(request);
    }
}

$('#btnGuardarCambios').on('click', function () {

    // Deshabilitar el botón para evitar múltiples envíos
    $('#btnGuardarCambios').prop('disabled', true);

    const inputs = $("input.input-validar").serializeArray();
    const inputs_sin_valor = inputs.filter((item) => item.value.trim() == "")

    if (inputs_sin_valor.length > 0) {
        const mensaje = `Debe completar el campo : "${inputs_sin_valor[0].name}"`;
        toastr.warning("", mensaje)
        $(`input[name="${inputs_sin_valor[0].name}"]`).focus()

        // Rehabilitar el botón si hay campos vacíos
        $('#btnGuardarCambios').prop('disabled', false);
        return;
    }

    //$('#btnGuardarCambios').prop('disabled', true);

    if (parseInt($("#txtIdUsuario").val()) === 0) {
        registerDataUser();
    } else {
        editarDataAjaxU();
    }
})

function ObtenerFecha() {
    const d = new Date();
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const day = d.getDate().toString().padStart(2, '0');
    return `${day}/${month}/${d.getFullYear()}`;
}

function ReporteUsua(dataUsuarios) {
    var props = {
        outputType: jsPDFInvoiceTemplate.OutputType.Save,
        returnJsPDFDocObject: true,
        fileName: "Reporte_Usuarios_2025",
        orientationLandscape: false,
        //compress: true,
        logo: {
            src: "../Imagenes/reporteedu.png",
            type: 'PNG', //optional, when src= data:uri (nodejs case)
            width: 53.33, //aspect ratio = width/height
            height: 26.66,
            margin: {
                top: 0, //negative or positive num, from the current position
                left: 0 //negative or positive num, from the current position
            }
        },
        business: {
            name: "Unidad Educacion",
            address: "Barrio la cruz nro 328",
            phone: "+591 73999726",
            email: "unidad municipal",
            email_1: "educacion@gmail.com",
            website: "www.gamr.com",
        },
        contact: {
            label: "Reporte de Usuarios:",
            name: "Registrados",
            address: "Departamento de sistemas",
            phone: "Soporte tecnico",
            email: "soporte_gamr@gmail.com",
            otherInfo: "Codigo interno /0002",
        },
        invoice: {
            label: "Nro #: ",
            num: "- R0002",
            invDate: ObtenerFecha(),
            invGenDate: ObtenerFecha(),
            headerBorder: false,
            tableBodyBorder: false,
            header: ["Nombres", "Rol", "Correo", "Celular"],
            table: dataUsuarios.map((item) => [
                item.FullName,
                item.Rol.Descripcion,
                item.Correo,
                item.Celular
            ]),
            invTotalLabel: "Total Reg:",
            invTotal: dataUsuarios.length.toString(),
            invCurrency: "REG",
            invDescLabel: "Gracias por usar nuestro sistema",
            invDesc: "Reporte interno de uso solo para el gobierno autonomo municipal de Riberalta",
        },
        footer: {
            text: "Este es un documento generado automáticamente.",
        },
        pageEnable: true,
        pageLabel: "Page ",
    };

    var pdfObject = jsPDFInvoiceTemplate.default(props);
    console.log(pdfObject);
}

function cargarDetalleUsuairos() {

    $.ajax({
        type: "POST",
        url: "UsuariosSis.aspx/ObtenerUsuarios",
        data: {},
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        success: function (response) {
            if (response.d.Estado) {
                var detalle = response.d.Data;
                ReporteUsua(detalle)
                //swal("Mensaje", response.d.Mensaje, "success");

            } else {
                swal("Mensaje", response.d.Mensaje, "warning");
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        }
    });
}

$('#btnReporte').on('click', function () {
    cargarDetalleUsuairos();
})