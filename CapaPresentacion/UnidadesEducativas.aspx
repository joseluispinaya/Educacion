<%@ Page Title="" Language="C#" MasterPageFile="~/PaginaMas.Master" AutoEventWireup="true" CodeBehind="UnidadesEducativas.aspx.cs" Inherits="CapaPresentacion.UnidadesEducativas" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="css/switchjo.css" rel="stylesheet">
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
  <button type="button" id="btnAddNuevoUn" class="btn btn-success btn-sm mr-3"><i class="fas fa-school"></i> Nuevo
    registro</button>
  <button type="button" id="btnReporteUni" class="btn btn-primary btn-sm"><i class="fas fa-file-pdf"></i> Reporte</button>
</div>

<div class="card shadow mb-4">
  <div class="card-header bg-second-primary">
    <h6 class="m-0 font-weight-bold text-white"><i class="fas fa-address-book"></i> UNIDADES EDUCATIVAS REGISTRADAS</h6>
  </div>
  <div class="card-body" id="loaddet">
    <div class="row gx-4 row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-4 justify-content-start mt-2" id="listarUni">

    </div>
  </div>
</div>

<div class="modal fade" id="modalDataUni" tabindex="-1" role="dialog" aria-hidden="true" data-backdrop="static">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h6 id="myTitulope">Detalle Accion</h6>
        <button class="close" type="button" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">×</span>
        </button>
      </div>
      <div class="modal-body">
        <input type="hidden" value="0" id="txtIdUnidad">
        <div class="row">
          <div class="col-sm-12">
            <div class="form-row">
              <div class="form-group col-sm-6">
                <label for="txtNombre">Nombre Unidad</label>
                <input type="text" class="form-control form-control-sm input-validar" id="txtNombre" name="Nombre Unidad">
              </div>
              <div class="form-group col-sm-6">
                <label for="txtResponsable">Responsable</label>
                <input type="text" class="form-control form-control-sm input-validar" id="txtResponsable" name="Responsable">
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-sm-6">
                <label for="txtCelular">Celular</label>
                <input type="text" class="form-control form-control-sm input-validar" id="txtCelular" name="Celular">
              </div>
              <div class="form-group col-sm-6">
                <label for="txtUbicacion">Ubicacion</label>
                <input type="text" class="form-control form-control-sm input-validar" id="txtUbicacion" name="Ubicacion">
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-sm-6">
                <label for="cboEstado">Estado</label>
                <select class="form-control form-control-sm" id="cboEstado">
                  <option value="1">Activo</option>
                  <option value="0">No Activo</option>
                </select>
              </div>
              <div class="form-group col-sm-6">
                <label for="cboArea">Seleccione Area</label>
                <select class="form-control form-control-sm" id="cboArea">
                </select>
              </div>
            </div>
          </div>

        </div>
      </div>
      <div class="modal-footer">
        <button id="btnGuardarCambiosUn" class="btn btn-primary btn-sm" type="button">Guardar</button>
        <button class="btn btn-danger btn-sm" type="button" data-dismiss="modal">Cancelar</button>
      </div>
    </div>
  </div>
</div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="footer" runat="server">
    <script src="jsdev/UnidadesEducativas.js" type="text/javascript"></script>
</asp:Content>
