<%@ Page Title="" Language="C#" MasterPageFile="~/PaginaMas.Master" AutoEventWireup="true" CodeBehind="ActivosRegistro.aspx.cs" Inherits="CapaPresentacion.ActivosRegistro" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" runat="server">

    <div class="row" id="overlayc">
    
    <div class="col-sm-4">

        <div class="row">
            <div class="col-sm-12">
                <div class="card shadow mb-4">
                    <div class="card-header py-3 bg-second-primary">
                        <h6 class="m-0 font-weight-bold text-white">Detalle</h6>
                    </div>
                    <div class="card-body">
                        <div class="input-group input-group-sm">
                            <div class="input-group-prepend">
                              <label class="input-group-text" for="cboUnidadEduc">Unidad</label>
                            </div>
                            <select class="custom-select" id="cboUnidadEduc">
                              <option value="1">Walter Alpire</option>
                              <option value="2">Elim II</option>
                            </select>
                          </div>

                          <div class="form-group mb-3">
                            <label for="txtComentario">Comentario</label>
                            <textarea class="form-control" rows="2" id="txtComentario"></textarea>
                        </div>

                        <div class="input-group input-group-sm mb-3">
                            <div class="input-group-prepend">
                              <span class="input-group-text" id="inputGroupTotal">Cantidad Total</span>
                            </div>
                            <input type="text" class="form-control text-right" aria-label="Small" aria-describedby="inputGroupTotal" id="txtTotal" disabled>
                        </div>

                        <div class="form-group mb-0">
                            <button class="btn btn-success btn-sm btn-block" type="button" id="btnTerminarRegi">Registrar</button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
        
    </div>

    <div class="col-sm-8">
        <div class="row">
            <div class="col-sm-12">
                <div class="card shadow mb-4">
                    <div class="card-header py-3 bg-second-primary">
                        <h6 class="m-0 font-weight-bold text-white">Detalle Activos</h6>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-sm-6">
                                <div class="input-group input-group-sm">
                                    <div class="input-group-prepend">
                                      <label class="input-group-text" for="cboTipoArti">Articulo</label>
                                    </div>
                                    <select class="custom-select" id="cboTipoArti">
                                      <option value="1">Computadora</option>
                                      <option value="2">Laptop</option>
                                      <option value="3">Proyectora</option>
                                      <option value="4">Monitor</option>
                                    </select>
                                  </div>

                                  <div class="form-group">
                                    <label for="txtMarca">Marca</label>
                                    <input type="text" class="form-control form-control-sm input-validar" id="txtMarca" name="Marca">
                                </div>

                                <div class="form-group">
                                    <label for="txtSerie">Nro Serie</label>
                                    <input type="text" class="form-control form-control-sm input-validar" id="txtSerie" name="Nro Serie">
                                </div>

                            </div>
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label for="txtDetalleA">Detalle</label>
                                    <textarea class="form-control" rows="4" id="txtDetalleA"></textarea>
                                </div>
                                <div class="form-group text-center">
                                    <button type="button" class="btn btn-success btn-sm" id="btnAgrgarA">
                                        <i class="fas fa-check-circle"></i> Agregar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</div>

    <div class="card shadow mb-4">
    <div class="card-header py-3 bg-second-primary">
        <h6 class="m-0 font-weight-bold text-white">Lista para Registrar</h6>
    </div>
    <div class="card-body">
        <div class="row">
            <div class="col-sm-12">
                <table class="table table-striped table-sm" id="tbActivos" cellspacing="0" style="width: 100%">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Activo</th>
                            <th>Marca</th>
                            <th>Nro Serie</th>
                            <th>Detalle</th>
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
    <script src="jsdev/ActivosRegistro.js" type="text/javascript"></script>
</asp:Content>
