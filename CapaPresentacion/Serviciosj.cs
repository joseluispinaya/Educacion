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

        public string UploadPhotoA(MemoryStream stream, string folder)
        {
            string rutaa = "";

            try
            {
                stream.Position = 0;

                var guid = Guid.NewGuid().ToString();
                var file = $"{guid}.jpg";

                var fullPath = $"{folder}{file}";
                var path = Path.Combine(HttpContext.Current.Server.MapPath(folder), file);

                // Guardar la imagen en el sistema de archivos
                File.WriteAllBytes(path, stream.ToArray());

                // Verificar si el archivo fue guardado correctamente
                if (File.Exists(path))
                {
                    rutaa = fullPath;
                }
            }
            catch (IOException)
            {
                // Registrar el error en un logger si es necesario
                // Logger.LogError(ioEx.Message);
                rutaa = "";  // Asegura que devuelva una cadena vacía en caso de error de E/S
            }
            catch (Exception)
            {
                // Registrar el error pero continuar el flujo
                // Puedes usar un logger si es necesario
                // Logger.LogError(ex.Message);
                rutaa = "";  // Asegura que devuelva una cadena vacía en caso de error
            }
            return rutaa;
        }
    }
}