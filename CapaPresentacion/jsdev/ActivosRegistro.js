

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

$('#btnTerminarRegi').on('click', function () {
    pruebaEncrip();
});

$('#btnAgrgarA').on('click', function () {
    var textoSelect = $("#cboUnidadEduc option:selected").text();
    var valorSelect = $("#cboUnidadEduc").val();

    swal("Mensaje", "Texto: " + textoSelect + "\nValor: " + valorSelect, "success");
});