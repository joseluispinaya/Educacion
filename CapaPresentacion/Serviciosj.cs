using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MessagingToolkit.QRCode.Codec;
using System.IO;

namespace CapaPresentacion
{
	public class Serviciosj
	{
        #region "PATRON SINGLETON"
        public static Serviciosj _instancia = null;

        private Serviciosj()
        {

        }

        public static Serviciosj GetInstance()
        {
            if (_instancia == null)
            {
                _instancia = new Serviciosj();
            }
            return _instancia;
        }
        #endregion

        public string GenerarQrActivo(string contenido)
        {
            string rutaFinal = "";

            try
            {
                // Crear el QR a partir del contenido
                QRCodeEncoder encoder = new QRCodeEncoder
                {
                    QRCodeScale = 10
                };

                using (System.Drawing.Bitmap img = encoder.Encode(contenido))
                {
                    // Generar un nombre único para el archivo
                    string fileName = $"{Guid.NewGuid()}.jpg";
                    string folder = HttpContext.Current.Server.MapPath("/imgqr/");
                    string fullPath = Path.Combine(folder, fileName);

                    // Crear la carpeta si no existe
                    if (!Directory.Exists(folder))
                    {
                        Directory.CreateDirectory(folder);
                    }

                    // Guardar la imagen en un archivo
                    using (MemoryStream ms = new MemoryStream())
                    {
                        img.Save(ms, System.Drawing.Imaging.ImageFormat.Jpeg);
                        File.WriteAllBytes(fullPath, ms.ToArray());
                    }
                    // Verificar si el archivo fue guardado correctamente
                    if (File.Exists(fullPath))
                    {
                        rutaFinal = $"/imgqr/{fileName}";
                    }

                }
            }
            catch (IOException)
            {
                rutaFinal = "";
            }
            catch (Exception)
            {
                rutaFinal = "";
            }

            return rutaFinal;
        }
    }
}