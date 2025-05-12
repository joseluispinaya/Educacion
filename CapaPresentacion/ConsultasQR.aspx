<%@ Page Title="" Language="C#" MasterPageFile="~/PaginaMas.Master" AutoEventWireup="true" CodeBehind="ConsultasQR.aspx.cs" Inherits="CapaPresentacion.ConsultasQR" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" runat="server">
    <div class="row">
        <div class="col-sm-4">
            <div class="row">
                <div class="col-sm-12">
                    <div class="card shadow mb-4">
                        <div class="card-header bg-second-primary">
                            <h6 class="m-0 font-weight-bold text-white"><i class="fas fa-qrcode mr-2"></i>Iniciar Scaner</h6>
                        </div>
                        <div class="card-body">
                            <ul class="nav nav-tabs nav-justified" role="tablist">
                                <li class="nav-item">
                                    <a class="nav-link active" id="profile-tab-2" data-toggle="tab" href="#profile-2" role="tab"
                                        aria-controls="profile-2" aria-selected="true">
                                        <span class="d-block d-sm-none"><i class="fa fa-user"></i></span>
                                        <span class="d-none d-sm-block">Camara</span>
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" id="home-tab-2" data-toggle="tab" href="#home-2" role="tab" aria-controls="home-2"
                                        aria-selected="false">
                                        <span class="d-block d-sm-none"><i class="fa fa-home"></i></span>
                                        <span class="d-none d-sm-block">Imagen</span>
                                    </a>
                                </li>
                            </ul>
                            <div class="tab-content bg-light">
                                <div class="tab-pane fade show active" id="profile-2" role="tabpanel" aria-labelledby="profile-tab-2">
                                    <div style="padding: 0.5rem;">
                                        <img src="imgqr/qrbcode.jpeg" class="img-fluid mt-3" alt="" id="imagenReferencial">
                                        <div id="reader" width="600px"></div>
                                        <div class="mt-2 w-full">
                                            <select class="form-control form-control-sm" id="listaCamaras">
                                            </select>
                                            <button type="button" id="btnDetenerCa" class="btn btn-danger w-100 mt-2">Detener camara</button>
                                        </div>
                                    </div>
                                </div>
                                <div class="tab-pane fade" id="home-2" role="tabpanel" aria-labelledby="home-tab-2">
                                    <div style="padding: 0.5rem;">
                                        <div id="reader-file" width="w-100" height="600px" class="mt-2"></div>
                                        <input type="file" id="qr-input-file" class="form-control mt-2" accept="image/*">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-sm-8">
            <div class="row">
                <div class="col-sm-12">
                    <div class="card shadow mb-4" id="loaddae">
                        <div class="card-header bg-second-primary">
                            <h6 class="m-0 font-weight-bold text-white"><i class="fas fa-file-code mr-2"></i>Informacion del Activo</h6>
                        </div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-sm-6">
                                    <div class="text-start" style="font-size: 14px">
                                        <p class="m-1"><b>Unidad E: </b><span id="lblUnidad"></span></p>
                                        <p class="m-1"><b>Director: </b><span id="lblRespo"></span></p>
                                        <p class="m-1"><b>Activo: </b><span id="lblActivo"></span></p>
                                        <p class="m-1"><b>Marca: </b><span id="lblMarca"></span></p>
                                        <p class="m-1"><b>Nro Serie: </b><span id="lblNroSerie"></span></p>
                                    </div>
                                </div>
                                <div class="col-sm-6">
                                    <div class="text-start" style="font-size: 14px">
                                        <p class="m-1"><b>Estado: </b><span id="lblEstado"></span></p>
                                        <p class="m-1"><b>Registrado el: </b><span id="lblFechar"></span></p>
                                        <p class="m-1"><b>Detalle: </b><span id="lblDetalles"></span></p>
                                    </div>
                                    <div class="form-group mt-2">
                                        <button type="button" id="btnReporteDetac" class="btn btn-success btn-sm"><i class="fas fa-print mr-2"></i>Imprimir</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="footer" runat="server">
    <script src="vendor/plugins/scanapp.min.js"></script>
    <script src="jsdev/ConsultasQR.js" type="text/javascript"></script>
</asp:Content>
