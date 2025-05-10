<%@ Page Title="" Language="C#" MasterPageFile="~/PaginaMas.Master" AutoEventWireup="true" CodeBehind="ActivoDetalles.aspx.cs" Inherits="CapaPresentacion.ActivoDetalles" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="css/switchjo.css" rel="stylesheet">
    <style>
        .align-middlea {
            vertical-align: middle !important;
        }

        .cardze {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            border: 1px solid lightgray;
            box-shadow: 2px 2px 8px 4px #d3d3d3d1;
            border-radius: 15px;
            font-family: sans-serif;
            margin: 5px;
        }

        .imageze {
            height: 100px;
            width: 100px;
            margin: 0 auto;
        }

            .imageze .imgre {
                height: 100%;
                width: 100%;
                object-fit: cover;
                border: 2px solid #fff;
            }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" runat="server">
    <div class="card shadow mb-4">
        <div class="card-header py-3 bg-second-primary">
            <h6 class="m-0 font-weight-bold text-white">Detalle General</h6>
        </div>
        <div class="card-body">

            <div class="row" id="loadda">
                <div class="col-sm-8">
                    <div class="text-start" style="font-size: 14px">
                        <p id="lblCodigo" class="m-1">Nom</p>
                        <p id="lblCantida" class="m-1">Dir</p>
                        <p id="lblUnidad" class="m-1">Un</p>
                        <p id="lblRespo" class="m-1">Res</p>
                    </div>
                    <div class="row justify-content-center mb-2">
                        <button type="button" id="btnVerDeta" class="btn btn-success btn-sm mr-3"><i class="fas fa-user-plus"></i> Prueba detalle</button>
                        <button type="button" id="btnInform" class="btn btn-primary btn-sm"><i class="fas fa-tools"></i> Informacion</button>
                    </div>
                </div>
                <div class="col-sm-4">
                    <div class="form-group mb-2">
                        <label for="txtComentario">Comentario</label>
                        <textarea class="form-control" readonly="readonly" rows="2" id="txtComentario"></textarea>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="card shadow mb-4">
        <div class="card-header py-3 bg-second-primary">
            <h6 class="m-0 font-weight-bold text-white"><i class="fas fa-address-book mr-3"></i>Detalles de activos</h6>
        </div>
        <div class="card-body">
            <div class="row justify-content-center mb-4">
                <button type="button" id="btnImprimir" class="btn btn-success btn-sm mr-3"><i class="fas fa-print"></i> Imprimir</button>
                <button type="button" id="btnGenerarQrs" class="btn btn-secondary btn-sm mr-3"><i class="fas fa-qrcode"></i> Generar QR</button>
                <button type="button" id="btnInotro" class="btn btn-primary btn-sm"><i class="fas fa-tools"></i> Alterno</button>
            </div>

            <div class="row gx-4 row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-4 justify-content-start mt-1"
                id="listarqr">
            </div>
        </div>
    </div>

</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="footer" runat="server">
    <script src="jsdev/ActivoDetalles.js" type="text/javascript"></script>
</asp:Content>
