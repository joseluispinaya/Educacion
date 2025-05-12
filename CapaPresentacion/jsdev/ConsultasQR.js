
let html5QrCode = null;

$(document).ready(function () {
    Html5Qrcode.getCameras().then(function (camaras) {
        //console.log(camaras);
        if (camaras && camaras.length) {
            let html = `<option value="" selected>Seleccione una cámara</option>`;

            camaras.forEach(function (camara) {
                html += `<option value="${camara.id}">${camara.label}</option>`;
            });

            $('#listaCamaras').html(html);
        }
    }).catch(function (err) {
        console.error("Error al obtener cámaras: ", err);
    });
});

function CargarInfoActivo(codAlterno) {

    var request = {
        CodAlterno: codAlterno
    };

    $.ajax({
        type: "POST",
        url: "ConsultasQR.aspx/DetalleActivoInfo",
        data: JSON.stringify(request),
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        beforeSend: function () {
            $("#loaddae").LoadingOverlay("show");
        },
        success: function (response) {
            $("#loaddae").LoadingOverlay("hide");
            if (response.d.Estado) {
                var activo = response.d.Data;

                $("#lblUnidad").text(activo.Nombre);
                $("#lblRespo").text(activo.Responsable);
                $("#lblActivo").text(activo.NombreArticulo);
                $("#lblMarca").text(activo.Marca);
                $("#lblNroSerie").text(activo.NroSerie);
                $("#lblDetalles").text(activo.DetalleInfo);

                $("#lblFechar").text(activo.FechaRegistro);

                var estado = activo.Activo ? 'El Activo esta Habilitado' : 'El Activo esta Suspendido';

                $("#lblEstado").text(estado);

            } else {
                swal("Mensaje", response.d.Mensaje, "warning");
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            $("#loaddae").LoadingOverlay("hide");
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        }
    });
}

$(document).on('change', '#listaCamaras', function () {
    const idCamaraSeleccionada = this.value;
    console.log("Cámara seleccionada:", idCamaraSeleccionada);

    if (!idCamaraSeleccionada) return;

    // Ocultamos la imagen
    $('#imagenReferencial').hide();

    // Si ya hay una instancia anterior, la limpiamos
    if (html5QrCode) {
        html5QrCode.stop().then(() => {
            html5QrCode.clear();
            iniciarEscaneo(idCamaraSeleccionada);
        }).catch(err => {
            console.error("Error al detener cámara anterior:", err);
            iniciarEscaneo(idCamaraSeleccionada);
        });
    } else {
        iniciarEscaneo(idCamaraSeleccionada);
    }

});

// Función para iniciar el escaneo
function iniciarEscaneo(camaraId) {
    html5QrCode = new Html5Qrcode("reader");
    html5QrCode.start(
        camaraId,
        {
            fps: 10,
            qrbox: { width: 250, height: 250 }
        },
        lecturaCorrecta,
        errorLectura
    ).catch((err) => {
        console.error("Error al iniciar escaneo:", err);
    });
}

// Función cuando QR es leído correctamente
function lecturaCorrecta(decodedText, decodedResult) {
    console.log("QR leído:", decodedText);

    // Detener automáticamente el lector después de leer un QR
    html5QrCode.stop().then(() => {
        html5QrCode.clear();
        console.log("Lector detenido después de lectura exitosa.");
        $('#imagenReferencial').show(); // Opcional: mostrar imagen otra vez
    }).catch((err) => {
        console.error("Error al detener después de lectura:", err);
    });

    swal("Mensaje", decodedText, "warning");
    // Aquí puedes hacer algo con decodedText, por ejemplo:
    // enviar a backend, mostrar en pantalla, redirigir, etc.
    // Aquí puedes manejar el contenido del QR
}

// Función para manejar errores de lectura
function errorLectura(errorMessage) {
    // Puedes mostrarlo en consola si quieres depurar
    // console.warn("Error de lectura:", errorMessage);
}

// Botón para detener la cámara
$(document).on('click', '#btnDetenerCa', function () {
    if (html5QrCode) {
        html5QrCode.stop().then(() => {
            html5QrCode.clear();
            console.log("Cámara detenida.");
            $('#imagenReferencial').show(); // Mostramos nuevamente la imagen
        }).catch((err) => {
            console.error("Error al detener cámara:", err);
        });
    }
});

const html5QrCode2 = new Html5Qrcode("reader-file");

$('#qr-input-file').on('change', function (e) {
    const files = e.target.files;

    if (!files || files.length === 0) return;

    const imageFile = files[0];

    $('#reader-file').show(); // Mostrar lector antes de escanear

    html5QrCode2.scanFile(imageFile, true)
        .then(lecturaCorrectados)
        .catch(function (err) {
            console.error("Error al escanear archivo:", err);
            alert("No se pudo leer el QR de la imagen.");
        });
});

// Esta función debe estar definida en tu código
function lecturaCorrectados(decodedText, decodedResult) {
    console.log("QR leído:", decodedText);

    // Opcional: mostrar resultado en pantalla
    //alert("QR leído: " + decodedText);
    //swal("Mensaje", decodedText, "warning");


    // Ocultar lector visual y limpiar input file
    $('#reader-file').hide();
    $('#qr-input-file').val('');

    CargarInfoActivo(decodedText);
}