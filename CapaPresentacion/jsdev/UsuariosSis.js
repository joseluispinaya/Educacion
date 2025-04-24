
$(document).ready(function () {
    cargarDatos();
});

function cargarDatos() {
    $.ajax({
        type: "POST",
        url: "UsuariosSis.aspx/ListaUsuarios",
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
                                <div class="card-body p-4">
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
                                        <a class="col-5 btn btn-sm btn-outline-primary mt-auto" href="#" onclick="verDetalle(${usuario.IdUsuario})"><i class="fas fa-pencil-alt"></i></a>
                                        <a class="col-5 btn btn-sm btn-outline-danger mt-auto" href="#" onclick="eliminarUsua(${usuario.IdUsuario})"><i class="fas fa-trash-alt"></i></a>
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

function verDetalle(IdUsuario) {
    console.log("Ver detalle con ID: " + IdUsuario);
    //mi logica
}

function eliminarUsua(IdUsuario) {
    console.log("Eliminar a ID: " + IdUsuario);
    //mi logica
}

function mostrarImagenSeleccionada(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#imgUsuarioMx').attr('src', e.target.result);
        }

        reader.readAsDataURL(input.files[0]);
    } else {
        $('#imgUsuarioMx').attr('src', "Imagenes/imgjo.jpg");
    }
}

$('#txtFoto').change(function () {
    mostrarImagenSeleccionada(this);
});

$('#btnAdd').on('click', function () {

    $("#modalData").modal("show");
});