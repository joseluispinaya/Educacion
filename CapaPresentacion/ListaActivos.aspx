<%@ Page Title="" Language="C#" MasterPageFile="~/PaginaMas.Master" AutoEventWireup="true" CodeBehind="ListaActivos.aspx.cs" Inherits="CapaPresentacion.ListaActivos" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <style>
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
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" runat="server">
    <div class="row justify-content-center mb-2">
        <button type="button" id="btnNuevoR" class="btn btn-success btn-sm mr-3"><i class="fas fa-home mr-2"></i>Nuevo Registro</button>
        <button type="button" id="btnReporteA" class="btn btn-primary btn-sm"><i class="fas fa-print mr-2"></i>Imprimir</button>
    </div>

    <div class="card shadow mb-4" id="cloader">
        <div class="card-header py-3 bg-second-primary">
            <h6 class="m-0 font-weight-bold text-white"><i class="fas fa-address-book mr-3"></i>LISTA DE ACTIVOS REGISTRADOS</h6>
        </div>
        <div class="card-body">
            <div class="row gx-4 row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-4 justify-content-start mt-1"
                id="listarAct">
            </div>
        </div>
    </div>

</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="footer" runat="server">
    <script src="jsdev/ListaActivos.js" type="text/javascript"></script>
</asp:Content>
