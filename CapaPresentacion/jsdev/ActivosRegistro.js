

let DetalleActili = [];

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
    mostrar_enTabla();

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

// Evento para eliminar una fila
$("#tbActivos").on("click", ".btn-eliminar", function () {
    // Obtener el índice del elemento desde el atributo data-index
    const index = $(this).data("index");
    console.log(index);

    // Eliminar el elemento de DetalleActili
    DetalleActili.splice(index, 1);

    // Actualizar la tabla y el total
    mostrar_enTabla();
});

$('#btnTerminarRegi').on('click', function () {

    $('#btnTerminarRegi').prop('disabled', true);

    if (DetalleActili.length < 1) {
        swal("Mensaje", "Debe agregar como minimo un activo", "warning");
        $('#btnTerminarRegi').prop('disabled', false);
    } else {
        swal("Mensaje", "Registro Exitoso", "success");
        $('#btnTerminarRegi').prop('disabled', false);
    }

    //pruebaEncrip();
});



$('#btnAgrgarAsss').on('click', function () {
    var textoSelect = $("#cboUnidadEduc option:selected").text();
    var valorSelect = $("#cboUnidadEduc").val();

    swal("Mensaje", "Texto: " + textoSelect + "\nValor: " + valorSelect, "success");
});