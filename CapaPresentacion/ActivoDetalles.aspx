<%@ Page Title="" Language="C#" MasterPageFile="~/PaginaMas.Master" AutoEventWireup="true" CodeBehind="ActivoDetalles.aspx.cs" Inherits="CapaPresentacion.ActivoDetalles" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <style>
        .align-middlea {
            vertical-align: middle !important;
        }

        .switches {
            position: relative;
            display: inline-block;
            width: 60px;
            height: 34px;
        }

            /* Hide default HTML checkbox */
            .switches input {
                opacity: 0;
                width: 0;
                height: 0;
            }

        /* The slider */
        .slidera {
            position: absolute;
            cursor: pointer;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: #ccc;
            -webkit-transition: .4s;
            transition: .4s;
        }

            .slidera:before {
                position: absolute;
                content: "";
                height: 26px;
                width: 26px;
                left: 4px;
                bottom: 4px;
                background-color: white;
                -webkit-transition: .4s;
                transition: .4s;
            }

        input:checked + .slidera {
            background-color: green;
        }

        input:focus + .slidera {
            box-shadow: 0 0 1px #2196F3;
        }

        input:checked + .slidera:before {
            -webkit-transform: translateX(26px);
            -ms-transform: translateX(26px);
            transform: translateX(26px);
        }

        /* Rounded sliders */
        .slidera.round {
            border-radius: 34px;
        }

            .slidera.round:before {
                border-radius: 50%;
            }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" runat="server">
    <div class="card shadow mb-4">
        <div class="card-header py-3 bg-second-primary">
            <h6 class="m-0 font-weight-bold text-white">Datos del Negocio</h6>
        </div>
        <div class="card-body">

            <div class="row" id="loadda">
                <div class="col-sm-8">
                    <div class="text-start" style="font-size: 14px">
                        <p id="lblCodigo" class="m-1">Nom</p>
                        <p id="lblCantida" class="m-1">Dir</p>
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
        <h6 class="m-0 font-weight-bold text-white">Detalle de activos</h6>
    </div>
    <div class="card-body">
        <div class="row justify-content-center mb-4">
            <button type="button" id="btnImprimir" class="btn btn-success btn-sm mr-3"><i class="fas fa-print"></i> Imprimir QR</button>
            <button type="button" id="btnInotro" class="btn btn-primary btn-sm"><i class="fas fa-tools"></i> Alterno</button>
        </div>

        <div class="row">
            <div class="col-sm-12">
                <table class="table table-striped table-sm" id="tbDeActivos" cellspacing="0" style="width: 100%">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>QR</th>
                            <th>Activo</th>
                            <th>Marca</th>
                            <th>Nro Serie</th>
                            <th>Detalle</th>
                            <th>Accion</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>

</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="footer" runat="server">
    <script src="jsdev/ActivoDetalles.js" type="text/javascript"></script>
</asp:Content>
