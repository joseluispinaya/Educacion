<%@ Page Title="" Language="C#" MasterPageFile="~/PaginaMas.Master" AutoEventWireup="true" CodeBehind="ActivoDetalles.aspx.cs" Inherits="CapaPresentacion.ActivoDetalles" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="css/switchjo.css" rel="stylesheet">
    <style>
        .align-middlea {
            vertical-align: middle !important;
        }
        #seccimpri {
            width: 100% !important;
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
        @media print {
            .no-print {
                display: none !important;
            }
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
                <div class="col-sm-4">
                    <div class="form-group">
                        <label for="txtComentario">Comentario</label>
                        <textarea class="form-control" readonly="readonly" rows="2" id="txtComentario"></textarea>
                    </div>
                </div>
                <div class="col-sm-4">
                    <div class="text-start" style="font-size: 14px">
                        <p class="m-1"><b>Nro Codigo: </b><span id="lblCodigo"></span></p>
                        <p class="m-1"><b>Cantidad total: </b><span id="lblCantida"></span></p>
                        <p class="m-1"><b>Unidad E: </b><span id="lblUnidad"></span></p>
                        <p class="m-1"><b>Director: </b><span id="lblRespo"></span></p>
                    </div>
                </div>
                <div class="col-sm-4">
                    <div class="text-start" style="font-size: 14px">
                        <p class="m-1"><b>Registrado el: </b><span id="lblFechar"></span></p>
                        <p class="m-1"><b>Estado: </b><span id="lblEstado"></span></p>
                    </div>
                    <div class="form-group mt-2">
                        <button type="button" id="btnReporteAct" class="btn btn-primary btn-sm"><i class="fas fa-print mr-2"></i>Imprimir</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="card shadow mb-4" id="seccimpri">
        <div class="card-header py-3 bg-second-primary">
            <h6 class="m-0 font-weight-bold text-white"><i class="fas fa-address-book mr-3"></i>Detalles de activos</h6>
        </div>
        <div class="card-body" id="cargaloa">
            <div class="row justify-content-center mb-4 no-print">
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
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.3.2/html2canvas.js"></script>
    <script src="jsdev/ActivoDetalles.js" type="text/javascript"></script>
</asp:Content>
