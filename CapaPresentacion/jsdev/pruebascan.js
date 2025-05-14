
let html5QrCode = null;
let camaraPredeterminada = null;

$(document).ready(function () {
    // Obtener y almacenar la primera cámara disponible
    Html5Qrcode.getCameras().then(function (camaras) {
        if (camaras && camaras.length) {
            camaraPredeterminada = camaras[0].id; // usar la primera cámara
        }
    }).catch(function (err) {
        console.error("Error al obtener cámaras: ", err);
    });
});

// Iniciar el escaneo al presionar el botón
$(document).on('click', '#btnIniciarCa', function () {
    if (!camaraPredeterminada) {
        swal("Advertencia", "No se encontró ninguna cámara disponible.", "warning");
        return;
    }

    $('#imagenReferencial').hide();

    if (html5QrCode && html5QrCode._isScanning) {
        html5QrCode.stop().then(() => {
            html5QrCode.clear();
            iniciarEscaneo(camaraPredeterminada);
        }).catch(err => {
            console.error("Error al detener cámara anterior:", err);
            iniciarEscaneo(camaraPredeterminada);
        });
    } else {
        iniciarEscaneo(camaraPredeterminada);
    }
});

function iniciarEscaneo(camaraId) {
    html5QrCode = new Html5Qrcode("reader");
    html5QrCode.start(
        camaraId,
        { fps: 10, qrbox: { width: 250, height: 250 } },
        lecturaCorrecta,
        errorLectura
    ).catch((err) => {
        console.error("Error al iniciar escaneo:", err);
        swal("Error", "No se pudo acceder a la cámara.", "error");
    });
}

function lecturaCorrecta(decodedText, decodedResult) {
    console.log("QR leído:", decodedText);

    html5QrCode.stop().then(() => {
        html5QrCode.clear();

        console.log("Lector detenido y limpiado después de lectura exitosa.");

        // Mostrar imagen referencial
        $('#imagenReferencial').show();

        // Limpiar el área del lector
        $('#reader').empty();

        // Cargar info del QR
        CargarInfoActivod(decodedText);
    }).catch((err) => {
        console.error("Error al detener después de lectura:", err);
    });
}

function errorLectura(errorMessage) {
    // Puedes ignorarlo o mostrarlo si deseas
    console.warn("Error al leer:", errorMessage);
}

$(document).on('click', '#btnDetenerCa', function () {
    if (html5QrCode) {
        html5QrCode.stop().then(() => {
            html5QrCode.clear();
            console.log("Cámara detenida y limpiada.");
            $('#imagenReferencial').show();
            $('#reader').empty(); // Limpia el lector
        }).catch((err) => {
            console.error("Error al detener cámara:", err);
        });
    }
});

function CargarInfoActivod(codAlterno) {

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