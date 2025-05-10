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
        .imageze {
            height: 100px;
            width: 100px;
            /*background: #8e44ad;
            padding: 3px;
            border-radius: 50%;*/
            margin: 0 auto;
        }

            .imageze .imgre {
                height: 100%;
                width: 100%;
                /*border-radius: 50%;*/
                object-fit: cover;
                border: 2px solid #fff;
            }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" runat="server">
    <div class="row justify-content-center mb-2">
        <button type="button" id="btnAdd" class="btn btn-success btn-sm mr-3"><i class="fas fa-home"></i> Nuevo Registro</button>
        <button type="button" id="btnDetallee" class="btn btn-primary btn-sm"><i class="fas fa-tools"></i> Informacion</button>
    </div>

    <div class="card shadow mb-4">
    <div class="card-header py-3 bg-second-primary">
        <h6 class="m-0 font-weight-bold text-white"><i class="fas fa-address-book"></i> UNIDADES EDUCATIVAS REGISTRADOS</h6>
    </div>
    <div class="card-body" id="loadUnd">
        <div class="row gx-4 row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-4 justify-content-start mt-1" id="listaUn">
            <div class="col mb-3">
                <div class="cardze h-100">
                    <div class="text-center"  style="padding-top: 10px;">
                        <div class="imageze">
                            <img class="imgre" src="imgqr/soloqr.jpg" alt="Foto usuario">
                        </div>
                    </div>
                    <div class="card-body" style="padding: 0.2rem 1.25rem;">
                        <div class="text-start" style="font-size:14px">
                            <p class="m-1">Nombre de unidad 1</p>
                            <p class="m-1">Direccion de un</p>
                            <p class="m-1">Responsable Responsable Responsable Responsable Responsable</p>
                        </div>
                    </div>
                    <div class="card-footer text-center">
                        <a href="#" class="btn btn-sm btn-secondary"><i class="fas fa-pencil-alt"></i>Editar</a>
                        <button class="btn btn-sm btn-primary"><i class="fas fa-trash-alt"></i>Eliminar</button>
                    </div>
                </div>
            </div>
            <div class="col mb-3">
                <div class="cardze h-100">
                    <div class="text-center" style="padding-top: 20px;">
                        <i class="fas fa-school" style="font-size: 50px"></i>
                    </div>
                    <div class="card-body">
                        <div class="text-start" style="font-size: 14px">
                            <p class="m-1">Nombre de unidad 2</p>
                            <p class="m-1">Direccion de un</p>
                            <p class="m-1">Responsable</p>
                        </div>
                    </div>
                    <div class="card-footer text-center">
                        <a href="#" class="btn btn-sm btn-secondary"><i class="fas fa-pencil-alt"></i> Editar</a>
                        <button class="btn btn-sm btn-primary"><i class="fas fa-trash-alt"></i> Eliminar</button>
                    </div>
                </div>
            </div>
            <div class="col mb-3">
                <div class="cardze h-100">
                    <div class="text-center" style="padding-top: 20px;">
                        <i class="fas fa-school" style="font-size: 50px"></i>
                    </div>
                    <div class="card-body">
                        <div class="text-start" style="font-size: 14px">
                            <p class="m-1">Nombre de unidad 3</p>
                            <p class="m-1">Direccion de un</p>
                            <p class="m-1">Responsable</p>
                        </div>
                    </div>
                    <div class="card-footer text-center">
                        <a href="#" class="btn btn-sm btn-secondary"><i class="fas fa-pencil-alt"></i> Editar</a>
                        <button class="btn btn-sm btn-primary"><i class="fas fa-trash-alt"></i> Eliminar</button>
                    </div>
                </div>
            </div>
            <div class="col mb-3">
                <div class="cardze h-100">
                    <div class="text-center" style="padding-top: 20px;">
                        <i class="fas fa-school" style="font-size: 50px"></i>
                    </div>
                    <div class="card-body">
                        <div class="text-start" style="font-size: 14px">
                            <p class="m-1">Nombre de unidad 3</p>
                            <p class="m-1">Direccion de un</p>
                            <p class="m-1">Responsable</p>
                        </div>
                    </div>
                    <div class="card-footer text-center">
                        <a href="#" class="btn btn-sm btn-secondary"><i class="fas fa-pencil-alt"></i>Editar</a>
                        <button class="btn btn-sm btn-primary"><i class="fas fa-trash-alt"></i>Eliminar</button>
                    </div>
                </div>
            </div>
            <div class="col mb-3">
                <div class="cardze h-100">
                    <div class="text-center" style="padding-top: 20px;">
                        <i class="fas fa-school" style="font-size: 50px"></i>
                    </div>
                    <div class="card-body">
                        <div class="text-start" style="font-size: 14px">
                            <p class="m-1">Nombre de unidad 3</p>
                            <p class="m-1">Direccion de un</p>
                            <p class="m-1">Responsable</p>
                        </div>
                    </div>
                    <div class="card-footer text-center">
                        <a href="#" class="btn btn-sm btn-secondary"><i class="fas fa-pencil-alt"></i>Editar</a>
                        <button class="btn btn-sm btn-primary"><i class="fas fa-trash-alt"></i>Eliminar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="footer" runat="server">
</asp:Content>
