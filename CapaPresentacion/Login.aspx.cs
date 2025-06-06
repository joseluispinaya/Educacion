﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using CapaEntidad;
using CapaNegocio;
using System.Web.Services;

namespace CapaPresentacion
{
	public partial class Login : System.Web.UI.Page
	{
		protected void Page_Load(object sender, EventArgs e)
		{
            Response.AppendHeader("Cache-Control", "no-store");
        }

        [WebMethod]
        public static Respuesta<EUsuario> Logeo(string Usuario, string Clave)
        {
            try
            {
                var tokenSesion = Guid.NewGuid().ToString();
                var obj = NUsuario.GetInstance().LoginUsuario(Usuario, Clave, tokenSesion);

                // Si el usuario no existe o las credenciales son incorrectas
                if (obj?.Data == null)
                {
                    return new Respuesta<EUsuario>
                    {
                        Estado = false,
                        Mensaje = "Credenciales incorrectas o usuario no encontrado"
                    };
                }

                // Obtener el token almacenado en la base de datos
                var tokenDbResponse = NUsuario.GetInstance().ObtenerToken(obj.Data.IdUsuario);

                return new Respuesta<EUsuario>
                {
                    Estado = tokenDbResponse.Estado, // Usa el estado real de la consulta del token
                    Data = obj.Data,
                    Valor = tokenDbResponse.Estado ? tokenDbResponse.Valor : "", // Evita devolver un token inválido
                    Mensaje = tokenDbResponse.Estado ? "Inicio de sesión exitoso" : "No se pudo obtener el token"
                };
            }
            catch (Exception ex)
            {
                return new Respuesta<EUsuario>
                {
                    Estado = false,
                    Valor = "",
                    Mensaje = "Ocurrió un error: " + ex.Message
                };
            }
        }

        [WebMethod]
        public static Respuesta<bool> ActualizarClave(int IdUser, string ClaveActual, string ClaveNueva)
        {
            try
            {
                if (IdUser <= 0)
                {
                    return new Respuesta<bool> { Estado = false, Mensaje = "Ocurrio un error intente mas tarde" };
                }

                Respuesta<List<EUsuario>> Lista = NUsuario.GetInstance().ListaUsuarios();
                var listaUsuarios = Lista.Data;
                var item = listaUsuarios.FirstOrDefault(x => x.IdUsuario == IdUser);

                if (item == null)
                {
                    return new Respuesta<bool> { Estado = false, Mensaje = "Usuario no encontrado" };
                }

                string claveBd = item.Clave;

                if (ClaveActual != claveBd)
                {
                    return new Respuesta<bool> { Estado = false, Mensaje = "La Clave Actual es Incorrecta" };
                }

                Respuesta<bool> respuesta = NUsuario.GetInstance().ActualizarClave(IdUser, ClaveNueva);

                return respuesta;

            }
            catch (Exception ex)
            {
                return new Respuesta<bool> { Estado = false, Mensaje = "Ocurrió un error: " + ex.Message };
            }
        }
    }
}